import type { Post } from '@himeka/booru'
import type { MultiImageAdapter, MultiImageDetail, PostImage } from './multi-image'
import { settings } from '@/store'

const ORIGIN = 'https://en.huamaobizhi.com'
/** 界面语言，站点靠这个参数切换文案；不影响图片本身 */
const LANG = 'lang=zh-CN'
const CHUNK_SIZE = 30

/** 站点只提供两档公开尺寸：280h（187×280）与 1000w680h（453×680，等比缩到高 680） */
const THUMB_SEGMENT = '/280h/'
const PREVIEW_SEGMENT = '/1000w680h/'

export function isHuamao() {
  return /(^|\.)huamaobizhi\.com$/.test(location.hostname)
}

/** 合集详情页 `/mix/688` */
const MIX_PATH = /^\/mix\/(\d+)\/?$/

export function isHuamaoMix() {
  return isHuamao() && MIX_PATH.test(location.pathname)
}

export function isHuamaoList() {
  return isHuamao() && !MIX_PATH.test(location.pathname)
}

function toAbsolute(url: string) {
  try {
    return new URL(url, ORIGIN).href
  } catch {
    return ''
  }
}

/* --------------------------------- 排序与预设 -------------------------------- */

interface OrderEntry {
  label: string
  orderBy: number
  aliases: string[]
}

/**
 * 站点的合集列表 `/mixs/` 靠 `order_by` 排序，没有分类目录；
 * 标签是自由打的一千多个 tag，硬编码会失效，所以预设放排序，tag 走搜索框。
 */
const ORDERS: OrderEntry[] = [
  { label: '最新', orderBy: 0, aliases: ['new', 'latest', 'date'] },
  { label: '最多浏览', orderBy: 1, aliases: ['views', 'view'] },
  { label: '最多下载', orderBy: 2, aliases: ['downloads', 'download'] },
  { label: '最多收藏', orderBy: 3, aliases: ['favs', 'fav'] },
  { label: '最大体积', orderBy: 4, aliases: ['size', 'big'] },
]

export const huamaoPresetTags = ORDERS.map(e => e.label)

function orderOf(token: string): OrderEntry | null {
  const term = token.trim().toLowerCase()
  if (!term) return null
  return ORDERS.find(e => term === e.label.toLowerCase() || e.aliases.includes(term)) ?? null
}

/** 整串都是排序词时取最后一个（搜索框选词是追加语义），否则当 tag 搜索词 */
function resolveOrder(tags?: string | null): OrderEntry | null {
  const tokens = (tags ?? '').trim().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return null
  const hits = tokens.map(orderOf)
  if (hits.includes(null)) return null
  return hits[hits.length - 1] ?? null
}

/* ---------------------------------- 列表页 --------------------------------- */

/** 合集列表：`/mixs/?page=N&order_by=X`，24 条一页 */
function listUrl(page: number, tags?: string | null) {
  const order = resolveOrder(tags)
  const keyword = order ? '' : (tags ?? '').trim()
  const params = new URLSearchParams()

  if (page > 1) params.set('page', String(page))
  if (keyword) params.set('search_tag', keyword)
  if (order) params.set('order_by', String(order.orderBy))

  const query = [params.toString(), LANG].filter(Boolean).join('&')
  return `${ORIGIN}/mixs/?${query}`
}

/** `6.12 浏览 / 1.19 下载 / 108 图片 / 1454.26 兆` → 108 */
function parseCount(text?: string | null) {
  return Number(text?.match(/(\d+)\s*图片/)?.[1] ?? 0)
}

/** `v-lazy:background-image="'https://...'"` → `https://...` */
function lazyUrl(el?: Element | null) {
  if (!el) return ''
  const raw = el.getAttribute('v-lazy:background-image')
    || el.getAttribute('v-lazy')
    || el.getAttribute('data-src')
    || ''
  return raw.replace(/^['"]|['"]$/g, '')
}

async function fetchListPosts(page: number, tags?: string | null): Promise<Post[]> {
  const resp = await fetch(listUrl(page, tags))
  if (!resp.ok) return []
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')

  return Array.from(doc.querySelectorAll<HTMLElement>('.mixs-card')).flatMap(card => {
    const href = card.querySelector<HTMLAnchorElement>('a.mixs-card-main[href]')?.getAttribute('href') ?? ''
    const raw = lazyUrl(card.querySelector('.mixs-card-preview .mixs-card-img'))
    if (!href || !raw) return []

    const id = href.match(/\/mix\/(\d+)/)?.[1] ?? href
    const intro = card.querySelector('.mixs-card-introduce')?.textContent ?? ''

    return [{
      id,
      postView: toAbsolute(href),
      previewUrl: toAbsolute(raw),
      fileUrl: '',
      tags: [],
      rating: 'e',
      // Vue 2 不追踪观察后新增的属性，多图字段必须在列表阶段就存在
      mediaCount: parseCount(intro),
      images: [],
      // 预览图恒为 280h（187×280）
      width: 187,
      height: 280,
      aspectRatio: 187 / 280,
      createdAt: null,
      title: card.querySelector('.mixs-card-name span')?.textContent?.trim() ?? '',
      fileExt: 'jpg',
      fileDownloadName: `huamao ${id} 187x280`,
      fileDownloadText: '187×280 [jpg]',
    } as any]
  })
}

/* --------------------------------- 详情页 --------------------------------- */

interface MixData {
  mixId: string
  title: string
  images: PostImage[]
}

let mixCache: MixData | null = null
let mixCacheKey = ''

function mixId() {
  return location.pathname.match(MIX_PATH)?.[1] ?? ''
}

/** 合集详情页带一套筛选参数，缺了 order_by / purity 会被站点重置 */
function mixPageUrl(id: string, page: number) {
  return `${ORIGIN}/mix/${id}?page=${page}&order_by=2&purity=2&${LANG}`
}

/** `UmekoJ三岛丽奈 6336×9504` → 6336×9504 */
function sizeFromTitle(title?: string | null) {
  const m = title?.match(/(\d{3,5})[×x](\d{3,5})/)
  if (!m) return null
  const width = Number(m[1])
  const height = Number(m[2])
  return width > 0 && height > 0 ? { width, height } : null
}

function parseMixPage(doc: Document): PostImage[] {
  return Array.from(doc.querySelectorAll<HTMLAnchorElement>('a.preview[href*="/details/"]')).flatMap(a => {
    const thumb = lazyUrl(a.querySelector('img'))
    if (!thumb) return []

    const fileUrl = thumb.replace(THUMB_SEGMENT, PREVIEW_SEGMENT)
    const size = sizeFromTitle(a.getAttribute('title')) ?? { width: 453, height: 680 }

    return [{
      fileUrl,
      previewUrl: thumb,
      width: size.width,
      height: size.height,
    }]
  })
}

function maxPageOf(doc: Document) {
  const pages = Array.from(doc.querySelectorAll<HTMLAnchorElement>('.pagination a[href*="page="]'))
    .map(a => Number(new URL(a.href, ORIGIN).searchParams.get('page')))
    .filter(n => Number.isFinite(n) && n > 0)
  return Math.max(1, ...pages)
}

/**
 * 一个合集的全部图片。
 *
 * 站点按 40 张一页切开（108 张 = 3 页），页数写在 pagination 里，
 * 只能逐页抓；好在每页只有 52KB，三页约 150KB。
 *
 * 原图要登录（`/download/{id}` 302 到 colorpuss.com/login），公开的最大档是
 * `1000w680h`（58KB），所以这里的主图取那一档，属于「只看图、不下原图」的取舍。
 */
async function loadMix(id: string): Promise<MixData | null> {
  if (mixCache && mixCacheKey === id) return mixCache
  if (!id) return null

  const firstResp = await fetch(mixPageUrl(id, 1))
  if (!firstResp.ok) return null
  const firstDoc = new DOMParser().parseFromString(await firstResp.text(), 'text/html')

  const images = parseMixPage(firstDoc)
  const totalPages = maxPageOf(firstDoc)

  const rest = await Promise.all(
    Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) =>
      fetch(mixPageUrl(id, i + 2))
        .then(r => (r.ok ? r.text() : ''))
        .then(html => (html ? parseMixPage(new DOMParser().parseFromString(html, 'text/html')) : [])),
    ),
  )

  const seen = new Set<string>()
  const all = [...images, ...rest.flat()].filter(img => {
    if (seen.has(img.previewUrl)) return false
    seen.add(img.previewUrl)
    return true
  })

  mixCache = {
    mixId: id,
    title: firstDoc.querySelector('.mixs-card-name, h1, title')?.textContent?.trim() ?? '',
    images: all,
  }
  mixCacheKey = id
  return mixCache
}

/**
 * 直接访问 `/mix/{id}` 时把它当成瀑布流喂出去。
 *
 * 主路径其实是列表页弹层（`list.detail` 一次把整组合集塞进缩略条），
 * 但用户也可能手输地址进来，返回空会是一片空白。
 */
async function fetchMixPosts(page: number): Promise<Post[]> {
  const data = await loadMix(mixId())
  if (!data || data.images.length === 0) return []

  const chunk = settings.masonryLayout === 'virtual' ? data.images.length : CHUNK_SIZE
  const start = (page - 1) * chunk
  if (start >= data.images.length) return []

  return data.images.slice(start, start + chunk).map((img, offset) => {
    const index = start + offset
    return {
      id: `${data.mixId}-${index}`,
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
      title: data.title,
      fileExt: 'jpg',
      fileDownloadName: `huamao ${data.mixId} ${index + 1} ${img.width}x${img.height}`,
      fileDownloadText: `${img.width}×${img.height} [jpg]`,
    } as any
  })
}

async function fetchMixDetail(id: string): Promise<MultiImageDetail> {
  // 弹层传的是合集 id；瀑布流模式下是 `${id}-${index}`，要剥掉后缀
  const data = await loadMix(id.replace(/-\d+$/, '') || mixId())
  if (!data) return {}
  return {
    fileUrl: data.images[0]?.fileUrl ?? null,
    tags: [],
    images: data.images,
    title: data.title,
  }
}

/* --------------------------------- 适配器导出 -------------------------------- */

interface HuamaoActions {
  list: MultiImageAdapter
  mix: MultiImageAdapter
}

export const huamao: HuamaoActions = {
  list: {
    is: isHuamaoList,
    posts: fetchListPosts,
    detail: fetchMixDetail,
  },
  mix: {
    is: isHuamaoMix,
    posts: fetchMixPosts,
    detail: fetchMixDetail,
  },
}
