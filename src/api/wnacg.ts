import type { Post } from '@himeka/booru'
import type { MultiImageAdapter, MultiImageDetail, PostImage } from './multi-image'

const ORIGIN = 'https://www.wnacg.com'

/** 列表封面是 300×400 的 `t4.qy0.ru/data/t/` 缩略图，没有更大的公开档位 */
const THUMB_WIDTH = 300
const THUMB_HEIGHT = 400

export function isWnacg() {
  return /(^|\.)wnacg\.com$/.test(location.hostname)
}

/**
 * 站点结构：
 * - `/albums.html`、`/albums-index-page-N.html`、`/albums-index-cate-N.html` 是列表
 * - `/search/index.php?q=` 是搜索，翻页用 `&p=`
 * - `/photos-index-aid-N.html` 是图集页，`/photos-view-id-N.html` 是看图页（一页一张原图）
 *
 * 详情不走 HTML：全量原图地址在阅读器的数据接口里（见 `fetchDetail`），
 * 图集页与看图页本身仍留给站点。
 */
export function isWnacgList() {
  if (!isWnacg()) return false
  const { pathname } = location
  if (pathname === '/' || pathname === '/albums.html') return true
  if (/^\/albums-index-(?:page-\d+|cate-\d+(?:-page-\d+)?)\.html$/.test(pathname)) return true
  return pathname.startsWith('/search')
}

function listUrl(page: number, tags: string | null) {
  const word = (tags ?? '').trim()
  if (word) {
    const suffix = page > 1 ? `&p=${page}` : ''
    return `${ORIGIN}/search/index.php?q=${encodeURIComponent(word)}${suffix}`
  }

  // 首页没有分页参数，只能走 `/albums-index-page-N.html`（`/albums.html` 就是第 1 页）
  if (location.pathname === '/' || location.pathname === '/albums.html') {
    return page > 1 ? `${ORIGIN}/albums-index-page-${page}.html` : `${ORIGIN}/albums.html`
  }

  const url = new URL(location.href)
  url.searchParams.delete('tags')
  url.searchParams.set('page', String(page))
  return url.href
}

function parseCards(doc: Document): Post[] {
  const seen = new Set<string>()
  return [...doc.querySelectorAll<HTMLElement>('li.gallary_item')].flatMap(item => {
    const link = item.querySelector<HTMLAnchorElement>('a[href*="/photos-index-aid-"]')
    const href = link?.getAttribute('href') ?? ''
    const id = href.match(/photos-index-aid-(\d+)\.html/)?.[1]
    if (!id || seen.has(id)) return []
    seen.add(id)

    const img = item.querySelector<HTMLImageElement>('img')
    const src = img?.getAttribute('src') ?? ''
    // 站点给的是协议相对地址 `//t4.qy0.ru/...`，统一补成 https
    const previewUrl = src.startsWith('//') ? `https:${src}` : src
    if (!previewUrl) return []

    const title = item.querySelector('.title a')?.textContent?.trim() ?? img?.getAttribute('alt')?.trim() ?? ''
    const mediaCount = Number(/(\d+)\s*張圖片/.exec(item.querySelector('.info_col')?.textContent ?? '')?.[1] ?? 0)

    return [{
      id,
      postView: href.startsWith('http') ? href : `${ORIGIN}${href}`,
      previewUrl,
      fileUrl: '',
      tags: [],
      rating: 'e',
      mediaCount,
      images: [],
      width: THUMB_WIDTH,
      height: THUMB_HEIGHT,
      aspectRatio: THUMB_WIDTH / THUMB_HEIGHT,
      createdAt: null,
      title,
      fileExt: 'jpg',
      // 末尾不能是 `.数字` 形式，否则 downloadFile 的 /\.\w+$/ 会误判为已有扩展名
      fileDownloadName: `wnacg ${id} ${title}`.slice(0, 90),
      fileDownloadText: '[jpg]',
    } as any]
  })
}

async function fetchPosts(page: number, tags: string | null): Promise<Post[]> {
  const resp = await fetch(listUrl(page, tags))
  if (!resp.ok) return []
  return parseCards(new DOMParser().parseFromString(await resp.text(), 'text/html'))
}

/* ---------------------------------- 详情页 --------------------------------- */

let detailCache: { id: string; data: MultiImageDetail } | null = null

/**
 * 阅读器的数据接口 `/photos-item-aid-{id}.html` 是一段 JS，`mReader.initData({...})`
 * 一次给全整个图集的原图地址（带当天过期的 `verify` 签名，正好随详情打开时现取现用）
 * 与每张的 `[宽, 高]`。之前以为原图只散在看图页里，一次要 200 个请求 —— 推翻。
 *
 * 站点自己拼的 JSON 不规范（数组带尾逗号），解析前要清掉；多章节本子该接口只含
 * 当前章节，但站点里章节本极少，先不处理。
 */
async function fetchDetail(id: string): Promise<MultiImageDetail> {
  if (detailCache?.id === id) return detailCache.data

  const origin = location.origin
  const [itemResp, albumResp] = await Promise.all([
    fetch(`${origin}/photos-item-aid-${id}.html`),
    // 标签只在图集页的 `a.tagshow` 里，数据接口不含
    fetch(`${origin}/photos-index-aid-${id}.html`),
  ])
  if (!itemResp.ok) return {}
  const text = await itemResp.text()
  const raw = /mReader\.initData\((\{[\s\S]*?\})\);/.exec(text)?.[1]
  if (!raw) return {}

  let item: { page_url?: string[]; page_size?: number[][] }
  try {
    item = JSON.parse(raw.replace(/,(\s*[\]}])/g, '$1'))
  } catch {
    return {}
  }

  const urls = item.page_url ?? []
  const sizes = item.page_size ?? []
  const images: PostImage[] = urls.flatMap((url, index) => {
    // 接口给的是 http://，图床 https 直连可用且无防盗链（实测 200），统一升级
    const fileUrl = url.replace(/^http:\/\//, 'https://')
    if (!/^https:\/\//.test(fileUrl)) return []
    const [width = 800, height = 1200] = sizes[index] ?? []
    return [{ fileUrl, previewUrl: fileUrl, width, height }]
  })
  if (!images.length) return {}

  const data: MultiImageDetail = {
    fileUrl: images[0].fileUrl,
    images,
    tags: albumResp.ok
      ? [...new DOMParser().parseFromString(await albumResp.text(), 'text/html')
          .querySelectorAll<HTMLAnchorElement>('a.tagshow')]
          .map(a => a.textContent?.trim() ?? '')
          .filter(Boolean)
      : undefined,
  }
  detailCache = { id, data }
  return data
}

/* --------------------------------- 适配器导出 -------------------------------- */

export const wnacg: MultiImageAdapter = {
  is: isWnacgList,
  posts: fetchPosts,
  detail: fetchDetail,
}
