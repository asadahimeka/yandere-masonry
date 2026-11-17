import type { Post } from '@himeka/booru'
import type { MultiImageAdapter, MultiImageDetail, PostImage } from './multi-image'

const ORIGIN = 'https://nanairo.co'

/**
 * 写真集详情图统一 1700×2560。
 *
 * 实测 730 / 731 / 753 三册的前 4 张全部是同一尺寸（竖构图 0.664），
 * 列表卡片只有 400×400 的方形裁切图、拿不到原始比例，所以这里按定值声明，
 * 让瀑布流的卡片比例与灯箱里的实际图片一致。
 */
const IMAGE_WIDTH = 1700
const IMAGE_HEIGHT = 2560

export function isNanairo() {
  return /(^|\.)nanairo\.co$/.test(location.hostname)
}

/**
 * 站点的路数：
 * - `/ja/photos`（可带 `?text=` `?page=`）是写真集列表，**只有它**接管
 * - `/ja/photos/{id}` 是单册详情页
 * - 其余 `/ja`、`/ja/videos`、`/ja/casts/*` 等是站点自己的视频/演员页，一律不碰
 */
const LIST_PATH = /^\/ja\/photos\/?$/
const DETAIL_PATH = /^\/ja\/photos\/(\d+)\/?$/

export function isNanairoList() {
  return isNanairo() && LIST_PATH.test(location.pathname)
}

export function isNanairoDetail() {
  return isNanairo() && DETAIL_PATH.test(location.pathname)
}

/**
 * 站内搜索就是列表页的 `?text=`，与 `?page=` 可叠加
 * （站点自己的翻页链接形如 `/ja/photos?page=2&text=Ao`）。
 */
function listUrl(page: number, tags: string | null) {
  const url = new URL(`${ORIGIN}/ja/photos`)
  const word = (tags ?? '').trim()
  if (word) url.searchParams.set('text', word)
  if (page > 1) url.searchParams.set('page', String(page))
  return url.href
}

/** 站点给的是 `//d30tjfgbbtn4lr.cloudfront.net/...`，统一补成 https */
function absUrl(src?: string | null) {
  const url = (src ?? '').trim()
  if (!url) return ''
  if (url.startsWith('//')) return `https:${url}`
  if (url.startsWith('/')) return `${ORIGIN}${url}`
  return url
}

/** 封面写在行内样式的 `background-image` 里，而不是 `src` */
function cssUrl(style?: string | null) {
  return /url\(\s*['"]?([^'")]+)['"]?\s*\)/.exec(style ?? '')?.[1] ?? ''
}

function parseCards(doc: Document): Post[] {
  // 侧栏的分类卡片也是 `.nn-card`，只有带 `a.thumbnail[href^="/ja/photos/"]` 的才是写真集
  return Array.from(doc.querySelectorAll<HTMLElement>('.nn-card-list .nn-card.with-thumbnail')).flatMap(card => {
    const link = card.querySelector<HTMLAnchorElement>('a.thumbnail[href*="/ja/photos/"]')
    const id = link?.getAttribute('href')?.match(/\/ja\/photos\/(\d+)/)?.[1]
    const previewUrl = absUrl(cssUrl(link?.getAttribute('style')))
    if (!id || !previewUrl) return []

    const title = card.querySelector('h4.subject a')?.textContent?.trim() ?? ''

    return [{
      id,
      postView: `${ORIGIN}/ja/photos/${id}`,
      previewUrl,
      // 原图地址只在详情页里，列表阶段不知情；fileUrl 留空由 detail() 补齐
      fileUrl: '',
      tags: [],
      rating: 'e',
      // 页数只有详情页才知道，列表卡片上站点自己也只给一个图片角标
      mediaCount: 0,
      // Vue 2 不追踪观察后新增的属性，多图字段必须在列表阶段就存在
      images: [],
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      aspectRatio: IMAGE_WIDTH / IMAGE_HEIGHT,
      createdAt: null,
      title,
      fileExt: 'jpeg',
      // 末尾不能是 `.数字` 形式，否则 downloadFile 的 /\.\w+$/ 会误判为已有扩展名
      fileDownloadName: `nanairo ${id} ${title.replace(/^nanairo\s*-\s*/, '')}`.slice(0, 90),
      fileDownloadText: '[jpeg]',
    } as any]
  })
}

async function fetchPosts(page: number, tags: string | null): Promise<Post[]> {
  const resp = await fetch(listUrl(page, tags))
  if (!resp.ok) return []
  return parseCards(new DOMParser().parseFromString(await resp.text(), 'text/html'))
}

/* ---------------------------------- 详情页 --------------------------------- */

interface AlbumDetail {
  key: string
  data: MultiImageDetail
}

let albumCache: AlbumDetail | null = null

/**
 * 一册的全部图片。
 *
 * 详情页是 Rails 的 SSR HTML，`div.image-tile` 里每张 `img.image-tile-item` 的 `src`
 * 就是原图（单张 0.8~1MB），一次请求即可，不需要翻页。
 * 图床的 `fill/400/400` 缩略图签名是**按张下发**的，详情页只给了 `store/` 原图签名，
 * 自己拼缩略图地址会 403，所以缩略条也只能用原图（靠 `loading="lazy"` 控制开销）。
 */
async function loadAlbum(id: string): Promise<MultiImageDetail | null> {
  const key = `${ORIGIN}/ja/photos/${id}`
  if (albumCache?.key === key) return albumCache.data

  const resp = await fetch(key)
  if (!resp.ok) return null
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')

  const images: PostImage[] = Array.from(doc.querySelectorAll<HTMLImageElement>('img.image-tile-item'))
    .map(img => absUrl(img.getAttribute('src')))
    .filter(Boolean)
    .map(fileUrl => ({ fileUrl, previewUrl: fileUrl, width: IMAGE_WIDTH, height: IMAGE_HEIGHT }))

  // 演员名在详情页左侧的演员卡里（`a[href^="/ja/casts/"]` 的 h4），标题本身也含这个名字
  const cast = doc.querySelector<HTMLAnchorElement>('a[href^="/ja/casts/"] h4.subject')?.textContent?.trim() ?? ''
  const title = doc.querySelector('h1.subject')?.textContent?.trim()
    || doc.querySelector('title')?.textContent?.replace(/\s*\|\s*無料エロ動画nanairo\s*$/, '').trim()
    || ''

  const data: MultiImageDetail = {
    fileUrl: images[0]?.fileUrl ?? null,
    // 站点没有标签体系，只有演员；名称可直接当搜索词用（站内是子串匹配）
    tags: cast ? [cast] : [],
    source: key,
    images,
    title,
  }

  albumCache = { key, data }
  return data
}

async function fetchDetail(id: string): Promise<MultiImageDetail> {
  return (await loadAlbum(id)) ?? {}
}

/* --------------------------------- 适配器导出 -------------------------------- */

export const nanairo: MultiImageAdapter = {
  is: isNanairoList,
  posts: fetchPosts,
  detail: fetchDetail,
}
