import type { Post } from '@himeka/booru'
import type { MultiImageAdapter, MultiImageDetail, PostImage } from './multi-image'
import { settings } from '@/store'

const ORIGIN = 'https://hentai-cosplay-xxx.com'
const CHUNK_SIZE = 30

/** 原图恒为 1280×1707；列表 p=160x200、正文 p=700 都是同一比例的等比缩图 */
const WIDTH = 1280
const HEIGHT = 1707

/**
 * 站点有 zh / ja / fr / de / ru / ko / es 七个语言子域，结构完全一致，
 * 用后缀匹配一次性覆盖；主域也在内。
 */
export function isHentaiCosplay() {
  return /(^|\.)hentai-cosplay-xxx\.com$/.test(location.hostname)
}

/** 图片详情页 `/image/{slug}/`，slug 可能带中文转义 */
const ARTICLE_PATH = /^\/image\/([^/]+)\/?$/

export function isHentaiCosplayArticle() {
  return isHentaiCosplay() && ARTICLE_PATH.test(location.pathname)
}

export function isHentaiCosplayList() {
  return isHentaiCosplay() && !ARTICLE_PATH.test(location.pathname)
}

function toAbsolute(url: string) {
  try {
    return new URL(url, ORIGIN).href
  } catch {
    return ''
  }
}

/* --------------------------------- 榜单与预设 -------------------------------- */

interface RankEntry {
  label: string
  path: string
  aliases: string[]
}

/**
 * 站点的列表入口都是固定路径，没有查询参数：
 * `/search/` 是 New Images（32 条/页），其余是各榜单。
 * 首页 TOP 是固定 80 块且不可翻页，所以默认列表走 `/search/`。
 */
const RANKS: RankEntry[] = [
  { label: '最新', path: '/search/', aliases: ['new', 'latest'] },
  { label: '最近浏览', path: '/recently/', aliases: ['recent', 'recently'] },
  { label: '排行', path: '/ranking/', aliases: ['rank', 'ranking'] },
  { label: '下载榜', path: '/ranking-download/', aliases: ['download', 'dl'] },
  { label: '喜欢榜', path: '/ranking-like/', aliases: ['like', 'likes'] },
  { label: '收藏榜', path: '/ranking-bookmark/', aliases: ['bookmark', 'fav'] },
]

/** 搜索框候选：站点没有标签体系，这里放六个列表入口 */
export const hentaiCosplayPresetTags = RANKS.map(e => e.label)

function rankPathOf(token: string): string | null {
  const term = token.trim().toLowerCase()
  if (!term) return null
  const hit = RANKS.find(e => term === e.label.toLowerCase() || e.aliases.includes(term))
  return hit?.path ?? null
}

/**
 * 搜索框里的词 → 列表路径，`null` 表示按关键词搜索。
 *
 * 与 everia 同样的两件约束：
 * - 搜索框选词是追加语义（`selectTag`），连点两个榜单会拼成「最新 排行」，
 *   所以整串都是榜单词时取最后一个；
 * - 榜单路径不接受 `?s=`，掺了别的词就整体当关键词。
 */
function resolveRankPath(tags?: string | null): string | null {
  const tokens = (tags ?? '').trim().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return null
  const paths = tokens.map(rankPathOf)
  if (paths.includes(null)) return null
  return paths[paths.length - 1] ?? null
}

/* ---------------------------------- 列表页 --------------------------------- */

/**
 * 列表地址。
 *
 * 翻页一律是「基路径 + page/N/」：`/search/page/2/`、`/search/tag/cosplay/page/2/`、
 * `/search/keyword/Byoru/page/2/` 均实测有效。站点不认 `?page=`。
 */
function listUrl(page: number, tags?: string | null) {
  const suffix = page > 1 ? `page/${page}/` : ''

  const rankPath = resolveRankPath(tags)
  if (rankPath) return `${ORIGIN}${rankPath}${suffix}`

  const keyword = (tags ?? '').trim()
  if (keyword) return `${ORIGIN}/search/keyword/${encodeURIComponent(keyword)}/${suffix}`

  // 无筛选：沿用当前路径（可能是手工进来的 /search/tag/xxx/），但首页要换成 /search/
  const path = location.pathname.replace(/\/page\/\d+\/?$/, '/')
  const base = path === '/' ? '/search/' : path
  return `${ORIGIN}${base.replace(/\/$/, '')}/${suffix}`
}

function buildListPost(opts: {
  id: string
  href: string
  previewUrl: string
  title: string
  createdAt: Date | null
}) {
  const { id, href, previewUrl, title, createdAt } = opts
  const ext = previewUrl.match(/\.(\w+)(?:\?|$)/)?.[1] ?? 'webp'
  return {
    id,
    postView: href,
    previewUrl,
    fileUrl: '',
    tags: [],
    rating: 'e',
    // Vue 2 不追踪观察后新增的属性，多图字段必须在列表阶段就存在
    images: [],
    width: WIDTH,
    height: HEIGHT,
    aspectRatio: WIDTH / HEIGHT,
    createdAt,
    title,
    fileExt: ext,
    fileDownloadName: `hentai-cosplay-xxx ${id} ${WIDTH}x${HEIGHT}`,
    fileDownloadText: `${WIDTH}×${HEIGHT} [${ext}]`,
  } as any
}

/** `2026/11/16` → Date */
function parseDate(text?: string | null) {
  const m = text?.trim().match(/(\d{4})\/(\d{2})\/(\d{2})/)
  if (!m) return null
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
}

async function fetchListPosts(page: number, tags?: string | null): Promise<Post[]> {
  const resp = await fetch(listUrl(page, tags))
  if (!resp.ok) return []
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')

  return Array.from(doc.querySelectorAll('.image-list-item')).flatMap(card => {
    const href = card.querySelector<HTMLAnchorElement>('a[href^="/image/"]')?.getAttribute('href') ?? ''
    const img = card.querySelector<HTMLImageElement>('img')
    const raw = toAbsolute(img?.getAttribute('data-src') || img?.getAttribute('src') || '')
    if (!href || !raw) return []

    // 列表给的是 p=160x200（149×200，卡片上明显发虚），换成 p=700（700×933）
    const previewUrl = raw.replace(/\/p=[^/]+\//, '/p=700/')
    const slug = href.match(/^\/image\/([^/]+)\/?$/)?.[1] ?? href

    return [buildListPost({
      // 详情页只能靠 slug 定位（/image/{slug}/），卡片上没有独立的数字 id，
      // 图片目录里的数字虽然稳定，但拼不出详情地址
      id: slug,
      href: toAbsolute(href),
      previewUrl,
      title: card.querySelector('.image-list-item-title')?.textContent?.trim() ?? '',
      createdAt: parseDate(card.querySelector('.image-list-item-regist-date')?.textContent),
    })]
  })
}

/* --------------------------------- 详情页 --------------------------------- */

/** 详情页的 slug，`/image/vinnegal-and-alina-becker-fern-and-frieren/` → 第一段 */
function articleSlug() {
  const m = location.pathname.match(ARTICLE_PATH)
  if (!m) return ''
  try {
    return decodeURIComponent(m[1])
  } catch {
    return m[1]
  }
}

/** 把原图地址换成站点提供的缩图档位（`p=700` 700×933 / `p=160x200` 149×200） */
function thumbOf(url: string, size: string) {
  const withSize = url.replace(/\/p=[^/]+\//, `/${size}/`)
  if (withSize !== url) return withSize
  // 原图没有 p= 段，插在文件名前
  return url.replace(/\/([^/]+)$/, `/${size}/$1`)
}

const imageCache = new Map<string, { images: PostImage[]; title: string; tags: string[] }>()

/**
 * 一篇文章的全部图片。
 *
 * 详情页把整组图直接写在 HTML 里：每个 `a[data-modal-gallery-image-item]` 的
 * href 就是原图（1280×1707），内部 img 是 p=700 的缩图。
 * 缩略条只有 56×56，用 p=160x200（6.5KB）即可，整组 54 张 ≈ 350KB。
 */
async function loadImages(slug: string) {
  const cached = imageCache.get(slug)
  if (cached) return cached

  const empty = { images: [] as PostImage[], title: '', tags: [] as string[] }
  const resp = await fetch(`${ORIGIN}/image/${encodeURIComponent(slug)}/`)
  if (!resp.ok) return empty

  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')
  const seen = new Set<string>()
  const images: PostImage[] = []

  for (const anchor of Array.from(doc.querySelectorAll<HTMLAnchorElement>('a[data-modal-gallery-image-item][href]'))) {
    const fileUrl = toAbsolute(anchor.getAttribute('href') ?? '')
    if (!fileUrl || seen.has(fileUrl)) continue
    seen.add(fileUrl)

    images.push({
      fileUrl,
      previewUrl: thumbOf(fileUrl, 'p=160x200'),
      width: WIDTH,
      height: HEIGHT,
    })
  }

  const title = doc.querySelector('#title h2')?.textContent?.trim()
    || doc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim()
    || doc.querySelector('title')?.textContent?.trim()
    || ''

  // 只取正文标签区；页面底部的标签云有上百个链接，混进来会把详情面板撑爆
  const tags = Array.from(new Set(
    Array.from(doc.querySelectorAll<HTMLAnchorElement>('#detail_tag a[href*="/search/tag/"]'))
      .map(a => a.textContent?.trim() ?? '')
      .filter(Boolean),
  ))

  const result = { images, title, tags }
  imageCache.set(slug, result)
  return result
}

async function fetchDetail(id: string): Promise<MultiImageDetail> {
  // 列表传进来的是 slug；瀑布流模式下是 `${slug}-${index}`，要剥掉后缀
  const slug = id.replace(/-\d+$/, '') || articleSlug()
  const { images, title, tags } = await loadImages(slug)
  if (images.length === 0) return {}

  return {
    fileUrl: images[0].fileUrl,
    tags,
    images,
    title,
  }
}

/**
 * 直接访问 `/image/{slug}/` 时把整组图当成瀑布流喂出去。
 *
 * 主路径是列表页弹层（`detail` 一次把整组塞进缩略条），这里只是防止
 * 手输地址进来时 `replaceDocument` 之后一片空白。
 */
async function fetchArticlePosts(page: number): Promise<Post[]> {
  const slug = articleSlug()
  const { images, title } = await loadImages(slug)
  if (images.length === 0) return []

  const chunk = settings.masonryLayout === 'virtual' ? images.length : CHUNK_SIZE
  const start = (page - 1) * chunk
  if (start >= images.length) return []

  return images.slice(start, start + chunk).map((img, offset) => {
    const index = start + offset
    return {
      id: `${slug}-${index}`,
      postView: img.fileUrl,
      previewUrl: img.fileUrl,
      fileUrl: img.fileUrl,
      tags: [],
      rating: 'e',
      mediaCount: 1,
      images: [],
      width: img.width,
      height: img.height,
      aspectRatio: img.width / img.height,
      createdAt: null,
      title,
      fileExt: img.fileUrl.match(/\.(\w+)(?:\?|$)/)?.[1] ?? 'webp',
      fileDownloadName: `hentai-cosplay-xxx ${slug} ${index + 1} ${img.width}x${img.height}`,
      fileDownloadText: `${img.width}×${img.height} [${img.fileUrl.match(/\.(\w+)(?:\?|$)/)?.[1] ?? 'webp'}]`,
    } as any
  })
}

async function fetchPosts(page: number, tags?: string | null): Promise<Post[]> {
  if (isHentaiCosplayArticle()) return fetchArticlePosts(page)
  return fetchListPosts(page, tags)
}

/* --------------------------------- 适配器导出 -------------------------------- */

export const hentaiCosplay: MultiImageAdapter = {
  is: isHentaiCosplay,
  posts: fetchPosts,
  detail: fetchDetail,
}
