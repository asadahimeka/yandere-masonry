import type { Post } from '@himeka/booru'
import type { MultiImageAdapter, MultiImageDetail, PostImage } from './multi-image'

/**
 * 站点用 `location.origin` 而不是写死域名：REST 响应没有 `Access-Control-Allow-Origin`，
 * 从 `www.` 变体访问时跨域会直接被浏览器拦掉，必须与当前页同源。
 */
const getOrigin = () => location.origin

/** 站点一页 30 条（与主题自己的列表一致） */
const PER_PAGE = 30
const DEFAULT_WIDTH = 1000
const DEFAULT_HEIGHT = 1500

export function isShaonvzhi() {
  return /(^|\.)shaonvzhi\.top$/.test(location.hostname)
}

/**
 * 分类表（`/wp-json/wp/v2/categories` 实测）。
 *
 * 站点自己的列表页是服务端渲染第一页 + AJAX 追加，`/page/2` 回来还是第一页，
 * 没法按页抓；REST 的 `categories=` / `search=` 都能正常翻页，所以分类走参数。
 */
const CATEGORIES = [
  { id: 4, slug: 'cosplay', name: 'COSPLAY' },
  { id: 5, slug: 'free_cosplay', name: '免费COS' },
  { id: 2, slug: 'shaonvxiezhen', name: '少女写真' },
  { id: 3, slug: 'shaonvheji', name: '少女合集' },
  { id: 1, slug: 'all_photo', name: '全部图集' },
] as const

/** 搜索框预设：既能当分类跳，也能当搜索词（分类名会命中上面的表） */
export const shaonvzhiPresetTags = CATEGORIES.map(item => item.name)

const CATEGORY_SLUGS = new Set<string>(CATEGORIES.map(item => item.slug))

/**
 * 只接管列表型路径：首页 `/`、分类页 `/cosplay`、以及它们的 `/page/N`。
 * 帖子是纯数字路径 `/17656`，用户页 `/users/1`、`/gold` 等也留给站点自己。
 */
const LIST_PATH_RE = new RegExp(`^/(?:|page/\\d+|(?:${[...CATEGORY_SLUGS].join('|')})(?:/page/\\d+)?)/?$`)

export function isShaonvzhiList() {
  return isShaonvzhi() && LIST_PATH_RE.test(location.pathname)
}

/** 当前路径上的分类（`/free_cosplay`），拿不到就是全站 */
function pathCategoryId(): number | null {
  const slug = location.pathname.split('/').filter(Boolean)[0]
  if (!slug || slug === 'page') return null
  return CATEGORIES.find(item => item.slug === slug)?.id ?? null
}

/** 分类名 / slug / 中文名都能命中，方便预设词和手输 */
function categoryIdOf(token: string): number | null {
  const term = token.trim().toLowerCase()
  if (!term) return null
  const hit = CATEGORIES.find(item => term === item.slug || term === item.name.toLowerCase())
  return hit?.id ?? null
}

function listUrl(page: number, tags: string | null) {
  const params = new URLSearchParams({
    per_page: String(PER_PAGE),
    page: String(page),
    _fields: 'id,link,title,date,categories,featured_media',
  })

  const word = (tags ?? '').trim()
  const categoryId = categoryIdOf(word)
  if (categoryId) params.set('categories', String(categoryId))
  else if (word) params.set('search', word)
  else {
    const fromPath = pathCategoryId()
    if (fromPath) params.set('categories', String(fromPath))
  }

  return `${getOrigin()}/wp-json/wp/v2/posts?${params}`
}

/**
 * 封面单独批量取。
 *
 * `_embed=1` 会连正文一起把响应撑到 500KB+，而 `_fields` 与 `_embed` 互斥
 * （带 `_fields` 时 `_embedded` 会被裁掉），所以拆成两次：列表只要元数据，
 * 封面用 `media?include=` 一次拿全。
 */
async function coverUrls(ids: number[]) {
  const map = new Map<number, string>()
  const unique = [...new Set(ids.filter(Boolean))]
  if (unique.length === 0) return map

  const resp = await fetch(`${getOrigin()}/wp-json/wp/v2/media?include=${unique.join(',')}&per_page=100&_fields=id,source_url`)
  if (!resp.ok) return map
  const rows = await resp.json() as { id: number; source_url?: string }[]
  if (!Array.isArray(rows)) return map
  for (const row of rows) {
    if (row.source_url) map.set(row.id, row.source_url)
  }
  return map
}

function htmlToText(html: string) {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent?.trim() ?? ''
}

/** 微博图床换档：`mw2000` 是长边 2000 的压缩档，列表要的是 `mw690` 这一档 */
function resizeImage(url: string, kind: 'mw690' | 'original') {
  return url.replace(/(\/\/[a-z0-9]+\.sinaimg\.cn)\/[a-z0-9]+\//i, `$1/${kind}/`)
}

/** 少数老帖（免费图集）没有特色图，只能回原帖里捞第一张 */
const coverCache = new Map<string, string>()
/** `featured_media` 为 0 的帖子按 post id 兜底，不能塞进按附件 id 索引的表里 */
const fallbackCovers = new Map<string, string>()

async function coverFromPost(id: string): Promise<string> {
  const cached = coverCache.get(id)
  if (cached) return cached

  const resp = await fetch(`${getOrigin()}/${id}`)
  if (!resp.ok) return ''
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')
  const img = doc.querySelector<HTMLImageElement>('.entry-content .hig-item img, .entry-content img')
  const raw = img?.getAttribute('data-src') || img?.getAttribute('src') || ''
  const url = /^https?:/.test(raw) ? resizeImage(raw, 'mw690') : ''
  if (url) coverCache.set(id, url)
  return url
}

/** 并发上限内逐个补齐封面，缺特色图的比例很低（实测 150 条里 1 条） */
async function fillMissingCovers(rows: any[], covers: Map<number, string>) {
  const missing = rows.filter(row => !covers.get(row.featured_media))
  const limit = 4
  for (let i = 0; i < missing.length; i += limit) {
    const batch = missing.slice(i, i + limit)
    const urls = await Promise.all(batch.map(row => coverFromPost(String(row.id))))
    batch.forEach((row, index) => {
      if (urls[index]) fallbackCovers.set(String(row.id), urls[index])
    })
  }
}

/** 标题里带 `[41P]` / `[37P/1V]` / `[55P]`，把 P 数当图片数（V 是视频，不计） */
function countFromTitle(title: string) {
  const matches = [...title.matchAll(/(\d+)\s*P/gi)]
  if (matches.length === 0) return 0
  return matches.reduce((sum, m) => sum + Number(m[1]), 0)
}

function parseCards(rows: any[], covers: Map<number, string>): Post[] {
  return rows.flatMap(row => {
    const id = String(row.id)
    // 特色图在响应里是附件 id，`featured_media` 为 0 的帖子用回帖里捞到的第一张填进去
    const previewUrl = covers.get(row.featured_media) || fallbackCovers.get(id) || ''
    if (!previewUrl) return []

    const title = htmlToText(row.title?.rendered ?? '')
    const mediaCount = countFromTitle(title)

    return [{
      id,
      postView: row.link || `${getOrigin()}/${id}`,
      previewUrl,
      // 封面就是列表阶段能拿到的唯一一张，详情弹窗兜底显示它
      fileUrl: previewUrl,
      tags: [],
      rating: 'e',
      mediaCount,
      // Vue 2 不追踪观察后新增的属性，多图字段必须在列表阶段就存在
      images: [],
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      aspectRatio: DEFAULT_WIDTH / DEFAULT_HEIGHT,
      createdAt: row.date ? new Date(row.date) : null,
      title,
      fileExt: 'jpg',
      // 末尾不能是 `.数字` 形式，否则 downloadFile 的 /\.\w+$/ 会误判为已有扩展名
      fileDownloadName: `shaonvzhi ${id} ${title.replace(/\s+/g, ' ')}`.slice(0, 90),
      fileDownloadText: '[jpg]',
    } as any]
  })
}

async function fetchPosts(page: number, tags: string | null): Promise<Post[]> {
  const resp = await fetch(listUrl(page, tags))
  if (!resp.ok) return []

  const rows = await resp.json()
  if (!Array.isArray(rows) || rows.length === 0) return []

  const covers = await coverUrls(rows.map(row => row.featured_media).filter(Boolean))
  await fillMissingCovers(rows, covers)
  return parseCards(rows, covers)
}

/* ---------------------------------- 详情页 --------------------------------- */

let detailCache: { id: string; data: MultiImageDetail } | null = null

/**
 * 一篇图集公开的图片。
 *
 * 站点把图集放在 `horizontal-image-gallery` 插件里，正文用 `.hig-item img`；
 * 付费/登录限制的帖子只放 3~6 张预览，图集本体要登录后才由前端再拉，
 * 这里如实返回能看到的那些（0 张时返回空对象，弹窗继续显示列表封面）。
 */
async function fetchDetail(id: string): Promise<MultiImageDetail> {
  if (detailCache?.id === id) return detailCache.data

  const resp = await fetch(`${getOrigin()}/${id}`)
  if (!resp.ok) return {}

  const html = await resp.text()
  const doc = new DOMParser().parseFromString(html, 'text/html')

  const seen = new Set<string>()
  const images: PostImage[] = []
  for (const img of doc.querySelectorAll<HTMLImageElement>('.entry-content img, .hig-item img')) {
    const raw = img.getAttribute('data-src') || img.getAttribute('src') || ''
    if (!/^https?:/.test(raw)) continue
    const fileUrl = resizeImage(raw, 'original')
    if (seen.has(fileUrl)) continue
    seen.add(fileUrl)
    images.push({ fileUrl, previewUrl: fileUrl, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
  }

  // 关键词就是站点的标签（`COSPLAY,在线图集,雨波_HaneAme`）
  const keywords = doc.querySelector<HTMLMetaElement>('meta[name="keywords"]')?.content ?? ''
  const tags = keywords.split(',').map(tag => tag.trim()).filter(Boolean)

  const title = doc.title.replace(/\s*-\s*少女志\s*$/, '').trim()

  const data: MultiImageDetail = images.length
    ? { fileUrl: images[0].fileUrl, tags, source: `${getOrigin()}/${id}`, images, title }
    // 没有公开图：不覆盖 fileUrl，弹窗继续用列表封面
    : { tags, source: `${getOrigin()}/${id}`, title }

  detailCache = { id, data }
  return data
}

/* --------------------------------- 适配器导出 -------------------------------- */

export const shaonvzhi: MultiImageAdapter = {
  is: isShaonvzhiList,
  posts: fetchPosts,
  detail: fetchDetail,
}
