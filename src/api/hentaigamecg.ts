import type { Post } from '@himeka/booru'
import type { MultiImageAdapter, MultiImageDetail } from './multi-image'
import { getImageSize } from '@/utils'
import { settings } from '@/store'

const ORIGIN = 'https://hentaigamecg.com'
const THUMB_ORIGIN = 'https://img1th.hentaigamecg.com'
const FILE_ORIGIN = 'https://img1.hentaigamecg.com'

/**
 * 站点自己的卡片就是 3:2 裁切（`style.css`：`.card img { aspect-ratio: 3/2; object-fit: cover }`），
 * HTML 里的 `width=400 height=267` 是写死的假值，量不到尺寸时用它兜底。
 */
const THUMB_WIDTH = 400
const THUMB_HEIGHT = 267

/** 虚拟布局没有触底加载，一次给全最多要并发拉 73 页（十几秒），只给前 5 页 */
const VIRTUAL_PAGES = 5
/** 单相册实测最大 73 页（1752 张），留一点余量；再大基本是解析出错，别把站点刷爆 */
const MAX_PAGES = 120

export function isHentaiGameCg() {
  return location.hostname === 'hentaigamecg.com'
}

/** 总列表：`/`（等价于 `/page/1/`）与 `/page/N/` */
const LIST_PATH_RE = /^\/(?:page\/\d+\/?)?$/

/**
 * 相册：`/{slug}/` 与 `/{slug}/page/N/`。
 *
 * 单图页 `/{slug}/{name}/` 是两段路径，第二段不是 `page`，不匹配；`[^/.]+` 顺带排掉
 * `/favicon.ico`、`/site.webmanifest`、`/index.xml` 这类静态文件（相册 slug 不含点）。
 */
const ALBUM_PATH_RE = /^\/[^/.]+\/(?:page\/\d+\/?)?$/

export function isHentaiGameCgList() {
  return isHentaiGameCg() && LIST_PATH_RE.test(location.pathname)
}

export function isHentaiGameCgAlbum() {
  return isHentaiGameCg() && ALBUM_PATH_RE.test(location.pathname)
}

/* -------------------------------- 相册页解析 -------------------------------- */

interface AlbumItem {
  /** 相册里的文件名（`001`、`0001-cover`），同一相册内唯一 */
  name: string
  previewUrl: string
  fileUrl: string
}

interface AlbumPage {
  title: string
  /** 站点自己算的总页数（`Page 1 of N`），拿不到时按 1 算 */
  total: number
  items: AlbumItem[]
}

const EMPTY_PAGE: AlbumPage = { title: '', total: 1, items: [] }

function albumUrl(slug: string, page: number) {
  return page > 1 ? `${ORIGIN}/${slug}/page/${page}/` : `${ORIGIN}/${slug}/`
}

/**
 * 相册第 N 页（站点自己的 24 张/页）。
 *
 * 缩略图是 `img1th/{slug}/{name}_400.avif`，原图是 `img1/{slug}/{name}.avif` ——
 * 换图床 + 去掉 `_400` 档位后缀即可，站点只提供 AVIF。
 */
async function fetchAlbumPage(slug: string, page: number): Promise<AlbumPage> {
  const resp = await fetch(albumUrl(slug, page))
  if (!resp.ok) return EMPTY_PAGE
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')

  const navText = doc.querySelector('.nav-bar')?.textContent ?? ''
  const total = Number(/Page\s+\d+\s+of\s+(\d+)/i.exec(navText)?.[1] ?? 1) || 1
  const title = doc.querySelector('h1')?.textContent?.trim() ?? ''

  const seen = new Set<string>()
  const items: AlbumItem[] = []
  for (const card of doc.querySelectorAll<HTMLAnchorElement>('.grid a.card[href]')) {
    // 卡片指向单图页 `/{slug}/{name}/`，取第二段当文件名
    const name = new URL(card.getAttribute('href') ?? '', ORIGIN).pathname.split('/').filter(Boolean)[1] ?? ''
    if (!name || name === 'page' || seen.has(name)) continue
    seen.add(name)
    const thumb = card.querySelector<HTMLImageElement>('img')?.getAttribute('src') ?? ''
    items.push({
      name,
      previewUrl: /^https?:\/\//.test(thumb) ? thumb : `${THUMB_ORIGIN}/${slug}/${name}_400.avif`,
      fileUrl: `${FILE_ORIGIN}/${slug}/${name}.avif`,
    })
  }

  return { title, total, items }
}

/** 并发跑固定数量的任务：虚拟布局下一次要拉好几页，全串行会很明显地卡 */
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

function albumSlug() {
  const segment = location.pathname.split('/').filter(Boolean)[0] ?? ''
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

/* ---------------------------------- 总列表 --------------------------------- */

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
      // 封面原图只有进相册页才知道，列表阶段留空，由详情补齐（供快速下载用）
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
      fileDownloadName: `hentaigamecg ${id}`,
      fileDownloadText: '[avif]',
    } as any]
  })
}

async function fetchPosts(page: number): Promise<Post[]> {
  const resp = await fetch(listUrl(page))
  if (!resp.ok) return []
  return parseCards(new DOMParser().parseFromString(await resp.text(), 'text/html'))
}

/**
 * 列表卡片的详情：相册封面那一张。
 *
 * 站点列表只给缩略图，原图地址得进相册页才有；只取第 1 页（12KB），
 * 顺便让卡片上的「快速下载」能拿到地址 —— 否则点了没反应。
 */
async function fetchCoverDetail(slug: string): Promise<MultiImageDetail> {
  const first = await fetchAlbumPage(slug, 1)
  const item = first.items[0]
  if (!item) return {}
  return {
    fileUrl: item.fileUrl,
    source: `${ORIGIN}/${slug}/`,
    title: first.title || undefined,
  }
}

/* --------------------------------- 相册页 ---------------------------------- */

/**
 * 相册页铺成瀑布流（everia 文章页的同款形态）：一张图一条记录。
 *
 * 站点每页 24 张，翻页靠路径 `/{slug}/page/N/`，所以滚动追加时正好一次一页，
 * 不必像多图弹窗那样把 73 页全并发拉完再一次性甩出来。
 */
function toAlbumPosts(slug: string, albumTitle: string, pages: AlbumPage[]) {
  return pages.flatMap(page =>
    page.items.map(item => ({
      id: `${slug}:${item.name}`,
      postView: `${ORIGIN}/${slug}/${item.name}/`,
      previewUrl: item.previewUrl,
      fileUrl: item.fileUrl,
      tags: [],
      rating: 'e',
      // 一张图一条记录，不再有多图概念（弹窗里也就不会有 1740 张的缩略条）
      mediaCount: 1,
      images: [],
      width: THUMB_WIDTH,
      height: THUMB_HEIGHT,
      aspectRatio: THUMB_WIDTH / THUMB_HEIGHT,
      createdAt: null,
      title: albumTitle,
      fileExt: 'avif',
      fileDownloadName: `hentaigamecg ${slug} ${item.name}`,
      fileDownloadText: '[avif]',
    } as any)),
  )
}

/**
 * 站点所有 HTML 里的宽高都是假值（列表 400×267、单图页写死 1200×800），
 * 瀑布流比例只能靠缩略图量：缩略图是原图的等比缩放（实测 400×250 / 400×208
 * 对应 700×438 / 1920×1000），且与瀑布流显示的 URL 相同，缓存命中后不额外花钱。
 */
async function measure(items: Post[]) {
  await Promise.all(items.map(async post => {
    const previewUrl = (post as Post & { previewUrl?: string }).previewUrl
    if (!previewUrl) return
    const { width, height } = await getImageSize(previewUrl)
    if (!width || !height) return
    const typed = post as Post & { width: number; height: number; aspectRatio: number }
    typed.width = width
    typed.height = height
    typed.aspectRatio = width / height
  }))
  return items
}

async function fetchAlbumPosts(page: number): Promise<Post[]> {
  const slug = albumSlug()
  if (!slug) return []

  if (settings.masonryLayout === 'virtual') {
    // 虚拟布局是 93vh 的内部滚动，页面级触底事件不会触发，只能一次给全 ——
    // 但整本最多 73 页，全量并发要十几秒，这里只给前 5 页，够填满可视区
    if (page > 1) return []
    const first = await fetchAlbumPage(slug, 1)
    const total = Math.min(first.total, MAX_PAGES, VIRTUAL_PAGES)
    const rest = total > 1
      ? await mapLimit(
        Array.from({ length: total - 1 }, (_, i) => i + 2),
        5,
        no => fetchAlbumPage(slug, no).catch(() => EMPTY_PAGE),
      )
      : []
    return measure(toAlbumPosts(slug, first.title, [first, ...rest]))
  }

  const data = await fetchAlbumPage(slug, page)
  if (!data.items.length) return []
  return measure(toAlbumPosts(slug, data.title, [data]))
}

/**
 * 相册页单张图的详情。
 *
 * 刻意不回传 `images`：整本的连续浏览交给瀑布流本身，
 * 一旦回传，PostDetail 就会给这本 1740 张的相册渲染缩略条，正是要避开的瓶颈。
 */
async function fetchAlbumDetail(id: string): Promise<MultiImageDetail> {
  const [slug, name] = id.split(':')
  if (!slug || !name) return {}
  return {
    fileUrl: `${FILE_ORIGIN}/${slug}/${name}.avif`,
    source: `${ORIGIN}/${slug}/`,
  }
}

/* --------------------------------- 适配器导出 -------------------------------- */

interface HentaiGameCgActions {
  list: MultiImageAdapter
  album: MultiImageAdapter
}

/**
 * 同一 host 的两个视图，靠路径互斥（`is()` 不会同时为真）：
 * - `list`：总列表 `/`、`/page/N/`，24 个相册卡片一页
 * - `album`：相册页 `/{slug}/`，把相册铺成瀑布流，站点 24 张/页自然成为滚动步长
 *
 * 单图页 `/{slug}/{name}/` 两边都不接管，留给站点自己的看图器。
 */
export const hentaigamecg: HentaiGameCgActions = {
  list: {
    is: isHentaiGameCgList,
    posts: fetchPosts,
    detail: fetchCoverDetail,
  },
  album: {
    is: isHentaiGameCgAlbum,
    posts: fetchAlbumPosts,
    detail: fetchAlbumDetail,
  },
}
