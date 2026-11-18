import type { Post } from '@himeka/booru'
import type { MultiImageDetail } from './multi-image'
import { getImageSize } from '@/utils'

const ORIGIN = 'https://gsbooru.org'

export function isGsbooru() {
  return location.hostname === 'gsbooru.org'
}

/**
 * 只接管 `/posts` 列表。
 *
 * 单帖 `/posts/view/{id}`、标签 `/tags`、百科 `/wiki`、论坛 `/forums`、`/account`
 * 等必须原样留给站点；`/` 是落地页，没有帖子网格，也不接管。
 * 形态与 `src/prepare.ts` 的列表守卫一致。
 */
const LIST_PATH_RE = /^\/posts\/?$/

export function isGsbooruList() {
  return isGsbooru() && LIST_PATH_RE.test(location.pathname)
}

/**
 * 站点没有任何宽高字段，卡片 `img` 也没有 `width`/`height` 属性，
 * 瀑布流的比例只能靠预载预览图量 `naturalWidth`。预览是长边 250 的 webp、
 * 单张约 10KB，20 张 ≈ 190KB，且与瀑布流显示的 URL 完全相同，缓存命中后不额外花钱。
 */
const FALLBACK_WIDTH = 250
const FALLBACK_HEIGHT = 250

function listUrl(page: number, tags: string | null) {
  const word = (tags ?? '').trim()
  const query: string[] = []
  // 站点多标签用 `+`（AND），`?tags=` 里不能直接塞 `+`（会被当成字面量），逐个编码后再拼
  if (word) query.push(`tags=${word.split(/\s+/).map(encodeURIComponent).join('+')}`)
  if (page > 1) query.push(`page=${page}`)
  return `${ORIGIN}/posts${query.length ? `?${query.join('&')}` : ''}`
}

/** 卡片 `img.title` 的尾巴是 `score: N rating: xxx`，标签本身用空格分隔 */
const RATING_MAP: Record<string, string> = {
  general: 'g',
  sensitive: 's',
  questionable: 'q',
  explicit: 'e',
}

function parseTitle(title: string) {
  const raw = title.trim()
  const rating = RATING_MAP[/(?:^|\s)rating:\s*(\w+)\s*$/i.exec(raw)?.[1]?.toLowerCase() ?? ''] ?? 'e'
  const tags = raw
    .replace(/\s*score:\s*-?\d+(\s+rating:\s*\w+)?\s*$/i, '')
    .replace(/\s*rating:\s*\w+\s*$/i, '')
    .split(/\s+/)
    .filter(Boolean)
  return { tags, rating }
}

async function fetchPosts(page: number, tags: string | null): Promise<Post[]> {
  const resp = await fetch(listUrl(page, tags))
  if (!resp.ok) return []
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')

  // 同一个帖子在页面上只有一个 `a[href*="/posts/view/"]`，但保险起见按 id 去重
  const seen = new Set<string>()
  const cards = [...doc.querySelectorAll<HTMLAnchorElement>('article.post_item a[href*="/posts/view/"]')]
    .filter(a => {
      const id = a.getAttribute('href')?.match(/\/posts\/view\/(\d+)/)?.[1]
      if (!id || seen.has(id)) return false
      seen.add(id)
      return true
    })

  const posts = await Promise.all(cards.map(async card => {
    const id = card.getAttribute('href')?.match(/\/posts\/view\/(\d+)/)?.[1] ?? ''
    const img = card.querySelector<HTMLImageElement>('img.post_preview')
    const src = img?.getAttribute('src') ?? ''
    if (!id || !src) return null

    const previewUrl = new URL(src, ORIGIN).href
    const { width, height } = await getImageSize(previewUrl)
    const { tags: postTags, rating } = parseTitle(img?.getAttribute('title') ?? '')

    return {
      id,
      postView: `${ORIGIN}/posts/view/${id}`,
      previewUrl,
      // 原图与采样图地址在单帖页的 JSON-LD / og:image 里，详情阶段补齐
      fileUrl: '',
      tags: postTags,
      width: width || FALLBACK_WIDTH,
      height: height || FALLBACK_HEIGHT,
      aspectRatio: (width || FALLBACK_WIDTH) / (height || FALLBACK_HEIGHT),
      // 预览是 webp，原图是 png/jpg/webp 不定，等详情页确认真实扩展名
      fileExt: 'webp',
      rating,
      // 末尾不能是 `.数字` 形式，否则 downloadFile 的 /\.\w+$/ 会误判为已有扩展名
      fileDownloadName: `gsbooru ${id}`,
      fileDownloadText: '[orig]',
    } as any
  }))

  return posts.filter(Boolean) as Post[]
}

/* ---------------------------------- 单帖页 --------------------------------- */

interface ImageObjectLd {
  contentUrl?: string
  width?: number
  height?: number
  keywords?: string
}

/** 单帖页的 JSON-LD `ImageObject` 就是权威数据：原图、真实宽高、全部标签 */
function readImageLd(doc: Document): ImageObjectLd | null {
  for (const script of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(script.textContent ?? '')
      if (data?.['@type'] === 'ImageObject') return data
    } catch {
      // 站点偶尔会塞进无法解析的块，跳过继续找下一个
    }
  }
  return null
}

let detailCache: { id: string; data: MultiImageDetail } | null = null

async function fetchDetail(id: string): Promise<MultiImageDetail> {
  if (detailCache?.id === id) return detailCache.data

  const resp = await fetch(`${ORIGIN}/posts/view/${id}`)
  if (!resp.ok) return {}
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')

  const ld = readImageLd(doc)
  const sampleUrl = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || null
  const tags = ld?.keywords
    ? ld.keywords.split(',').map(tag => tag.trim()).filter(Boolean)
    // JSON-LD 缺失时退回页面上的标签链接（分类混在一起，但至少不缺）
    : [...doc.querySelectorAll<HTMLAnchorElement>('a[href^="/posts?tags="]')]
        .map(a => a.textContent?.trim() ?? '')
        .filter(Boolean)

  // 原出处（多为 pixiv）写在信息栏 `Source:` 那一行
  const sourceRow = [...doc.querySelectorAll('strong')]
    .find(el => el.textContent?.trim() === 'Source:')
    ?.parentElement
  const source = sourceRow?.querySelector<HTMLAnchorElement>('a')?.href || null

  const data: MultiImageDetail = {
    fileUrl: ld?.contentUrl ?? null,
    sampleUrl,
    tags,
    source,
    // 列表阶段只能量到预览图（长边 250）的尺寸，真实宽高在这里回填给卡片
    width: ld?.width || undefined,
    height: ld?.height || undefined,
  }
  detailCache = { id, data }
  return data
}

/* --------------------------------- 适配器导出 -------------------------------- */

export const gsbooru = {
  is: isGsbooruList,
  posts: fetchPosts,
  detail: fetchDetail,
}
