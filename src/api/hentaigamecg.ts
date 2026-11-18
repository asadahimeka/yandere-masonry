import type { Post } from '@himeka/booru'
import type { MultiImageAdapter, MultiImageDetail, PostImage } from './multi-image'

const ORIGIN = 'https://hentaigamecg.com'

/**
 * 站点自己的卡片就是 3:2 裁切（`style.css`：`.card img { aspect-ratio: 3/2; object-fit: cover }`），
 * 列表 HTML 里的 `width=400 height=267` 也是同一个比例，卡片量不到真实尺寸，
 * 直接沿用站点自己的版式。
 */
const THUMB_WIDTH = 400
const THUMB_HEIGHT = 267

export function isHentaiGameCg() {
  return location.hostname === 'hentaigamecg.com'
}

/**
 * 只接管总列表：`/` 与 `/page/N/`。
 *
 * 相册 `/{slug}/`、相册分页 `/{slug}/page/N/`、单图 `/{slug}/{name}/` 都留给站点 ——
 * 相册页每页只有 24 张缩略图，站点自己的翻页比接管成一个瀑布流更好用。
 */
const LIST_PATH_RE = /^\/(?:page\/\d+\/?)?$/

export function isHentaiGameCgList() {
  return isHentaiGameCg() && LIST_PATH_RE.test(location.pathname)
}

function listUrl(page: number) {
  return page > 1 ? `${ORIGIN}/page/${page}/` : `${ORIGIN}/`
}

/** 卡片 `a.card` → 相册；`id` 就是 slug，详情拿它拼相册地址 */
function parseCards(doc: Document): Post[] {
  const seen = new Set<string>()
  return [...doc.querySelectorAll<HTMLAnchorElement>('.grid a.card[href]')].flatMap(card => {
    const href = card.getAttribute('href') ?? ''
    const id = new URL(href, ORIGIN).pathname.replace(/\//g, '')
    const img = card.querySelector<HTMLImageElement>('img')
    const previewUrl = img?.getAttribute('src') ?? ''
    // 相册 slug 是单段路径；带斜杠的多段地址是单图页，不进列表
    if (!id || id.includes('/') || seen.has(id)) return []
    if (!/^https?:\/\//.test(previewUrl)) return []
    seen.add(id)

    // `h2.card-title` 是英文标题，`img alt` 是原文标题，后者更短但常常是罗马字
    const title = card.querySelector('.card-title')?.textContent?.trim()
      || img?.getAttribute('alt')?.trim()
      || id

    return [{
      id,
      postView: `${ORIGIN}/${id}/`,
      previewUrl,
      // 原图地址由详情阶段的缩略图推导，列表阶段留空
      fileUrl: '',
      tags: [],
      rating: 'e',
      // 相册张数只有相册页的 `Page 1 of N` 才知道，列表阶段留 0
      mediaCount: 0,
      // Vue 2 不追踪观察后新增的属性，多图字段必须在列表阶段就存在
      images: [],
      width: THUMB_WIDTH,
      height: THUMB_HEIGHT,
      aspectRatio: THUMB_WIDTH / THUMB_HEIGHT,
      createdAt: null,
      title,
      fileExt: 'avif',
      // 末尾不能是 `.数字` 形式，否则 downloadFile 的 /\.\w+$/ 会误判为已有扩展名
      fileDownloadName: `hentaigamecg ${id} ${title}`.slice(0, 90),
      fileDownloadText: '[avif]',
    } as any]
  })
}

async function fetchPosts(page: number): Promise<Post[]> {
  const resp = await fetch(listUrl(page))
  if (!resp.ok) return []
  return parseCards(new DOMParser().parseFromString(await resp.text(), 'text/html'))
}

/* ---------------------------------- 详情页 --------------------------------- */

/**
 * 相册页的缩略图是 `img1th.hentaigamecg.com/{slug}/{name}_400.avif`，
 * 原图是 `img1.hentaigamecg.com/{slug}/{name}.avif` —— 换图床 + 去掉档位后缀即可。
 * 站点只提供 AVIF，`_800` 也同一套命名，但缩略条用 400 就够，少一半体积。
 */
function toFileUrl(previewUrl: string) {
  return previewUrl
    .replace(/^https?:\/\/img1th\./i, 'https://img1.')
    .replace(/_\d+(\.avif)$/i, '$1')
}

function parseAlbumImages(doc: Document): PostImage[] {
  const images: PostImage[] = []
  for (const card of doc.querySelectorAll<HTMLAnchorElement>('.grid a.card[href]')) {
    const previewUrl = card.querySelector<HTMLImageElement>('img')?.getAttribute('src') ?? ''
    if (!/^https?:\/\/img1th\./i.test(previewUrl)) continue
    const fileUrl = toFileUrl(previewUrl)
    if (!/\.avif$/i.test(fileUrl)) continue
    // 真实宽高只能读 AVIF 头或等图加载，这里先留 0，由详情组件在图片 load 后补
    images.push({ fileUrl, previewUrl, width: 0, height: 0 })
  }
  return images
}

interface AlbumPage {
  images: PostImage[]
  /** 该相册总页数（`Page 1 of N`），拿不到时按 1 算 */
  total: number
  /** 相册标题（`h1`），只在第 1 页取到 */
  title: string
}

async function fetchAlbumPage(slug: string, page: number): Promise<AlbumPage> {
  const url = page > 1 ? `${ORIGIN}/${slug}/page/${page}/` : `${ORIGIN}/${slug}/`
  const resp = await fetch(url)
  if (!resp.ok) return { images: [], total: 1, title: '' }
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')
  const total = Number(/Page\s+\d+\s+of\s+(\d+)/i.exec(doc.querySelector('.nav-bar')?.textContent ?? '')?.[1] ?? 1)
  return {
    images: parseAlbumImages(doc),
    total: total || 1,
    title: page === 1 ? doc.querySelector('h1')?.textContent?.trim() ?? '' : '',
  }
}

/** 并发跑固定数量的任务：站点单相册最多 73 页，全串行要等十几秒 */
async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let cursor = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await fn(items[index])
    }
  })
  await Promise.all(workers)
  return results
}

/** 实测最大 73 页（1752 张），留一点余量；再大基本是解析出错，别把站点刷爆 */
const MAX_PAGES = 120

let detailCache: { id: string; data: MultiImageDetail } | null = null

/**
 * 一个相册。
 *
 * 站点是纯静态 Hugo，没有清单接口，张数只能靠相册页的 `Page 1 of N` 得知，
 * 再把剩下的页并发拉全（典型 5–25 页，实测最大 73 页），不是截断只要第一页。
 */
async function fetchDetail(id: string): Promise<MultiImageDetail> {
  if (detailCache?.id === id) return detailCache.data

  const first = await fetchAlbumPage(id, 1)
  if (!first.images.length) return {}

  const total = Math.min(first.total, MAX_PAGES)
  const rest = total > 1
    ? await mapLimit(
      Array.from({ length: total - 1 }, (_, i) => i + 2),
      5,
      page => fetchAlbumPage(id, page),
    )
    : []

  const seen = new Set<string>()
  const images: PostImage[] = []
  for (const img of [first, ...rest].flatMap(page => page.images)) {
    if (seen.has(img.fileUrl)) continue
    seen.add(img.fileUrl)
    images.push(img)
  }
  if (!images.length) return {}

  const data: MultiImageDetail = {
    fileUrl: images[0].fileUrl,
    images,
    source: `${ORIGIN}/${id}/`,
    title: first.title || undefined,
  }
  detailCache = { id, data }
  return data
}

/* --------------------------------- 适配器导出 -------------------------------- */

export const hentaigamecg: MultiImageAdapter = {
  is: isHentaiGameCgList,
  posts: fetchPosts,
  detail: fetchDetail,
}
