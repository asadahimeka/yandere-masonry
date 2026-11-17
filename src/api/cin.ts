import type { Post } from '@himeka/booru'
import type { MultiImageAdapter, MultiImageDetail, PostImage } from './multi-image'

const ORIGIN = 'https://cin.wtf'

/**
 * 站内搜索走独立接口，**页码必须放路径**（`?page=` 被忽略，会返回同一页）。
 * 响应 CORS 只放行 `https://cin.wtf`，页面内直接 fetch 可用。
 * 支持 `类型:"值"` 语法：`category:"doujinshi"`、`language:"chinese"`。
 */
const SEARCH_API = 'https://same.yui.pw/api/v6/search'

/** 封面缺尺寸时的兜底比例（站点封面普遍 250×350 上下） */
const FALLBACK_WIDTH = 250
const FALLBACK_HEIGHT = 350

export function isCin() {
  return /(^|\.)cin\.wtf$/.test(location.hostname)
}

/**
 * 详情页形如 `/v/697881`，SSR 的 `__NEXT_DATA__` 一次给出全部页。
 * `/g/{id}` 是同数据但不出图的分支、`/search` 是客户端空壳，都不接管。
 */
const DETAIL_PATH = /^\/v\/(\d+)\/?$/

export function isCinDetail() {
  return isCin() && DETAIL_PATH.test(location.pathname)
}

/**
 * 首页 `/` 与站内搜索页 `/search` 都是列表；后者进站时会被 `src/prepare.ts` 的
 * `normalizeCinSearchUrl` 翻成 `/?tags=`，所以两个路径都要算列表页。
 */
export function isCinList() {
  return isCin() && (/^\/$/.test(location.pathname) || /^\/search\/?$/.test(location.pathname))
}

/**
 * 搜索框候选：站点没有分类页，只能以查询语法的形式提供。
 * 这些词整串透传给接口，不做分词，含空格的 `category:"artist cg"` 才能成立。
 *
 * 前四条是排序入口（见 `SORTS`）：选中后列表直接切成日榜 / 周榜 / 总榜 / 最新。
 */
export const cinPresetTags = [
  'sort:popular-today',
  'sort:popular-weekly',
  'sort:popular',
  'sort:date',
  'category:"doujinshi"',
  'category:"manga"',
  'category:"artist cg"',
  'language:"chinese"',
  'language:"english"',
]

/* ---------------------------------- 数据形状 --------------------------------- */

interface CinImageRef {
  t?: string
  w?: number
  h?: number
}

interface CinTitle {
  english?: string
  japanese?: string
  pretty?: string
}

interface CinTag {
  type?: string
  name?: string
  count?: number
}

interface CinListItem {
  id?: number | string
  media_id?: number | string
  title?: CinTitle
  lang?: string
  cover?: CinImageRef
  num_pages?: number
  pages_string?: string
}

interface CinDetailData extends CinListItem {
  images?: {
    cover?: CinImageRef
    thumbnail?: CinImageRef
    pages?: CinImageRef[]
  }
  tags?: CinTag[]
  num_favorites?: number
  upload_date?: string
}

/* ----------------------------------- 解析 ---------------------------------- */

/**
 * Next.js 的 SSR 数据块，详情页的整帖对象都在这里。
 */
function readNextData<T>(html: string): T | null {
  const raw = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)?.[1]
  if (!raw) return null
  try {
    return ((JSON.parse(raw) as any)?.props?.pageProps?.data ?? null) as T | null
  } catch {
    return null
  }
}

/** `pretty` 最干净，其次英文、日文 */
function pickTitle(title?: CinTitle): string {
  return title?.pretty?.trim() || title?.english?.trim() || title?.japanese?.trim() || ''
}

/**
 * 页数。
 *
 * 搜索结果里有少量条目的 `num_pages` 是 0（新上传未处理），此时 `pages_string`
 * （每页一个格式字母）也一起为空，只能当未知处理，不硬凑成 1。
 */
function mediaCountOf(item: CinListItem): number {
  return item.num_pages || item.pages_string?.length || 0
}

function toPost(item: CinListItem): Post | null {
  const cover = item.cover
  if (!item.id || !cover?.t) return null

  const width = cover.w || FALLBACK_WIDTH
  const height = cover.h || FALLBACK_HEIGHT
  const title = pickTitle(item.title)
  const mediaCount = mediaCountOf(item)

  return {
    id: String(item.id),
    postView: `${ORIGIN}/v/${item.id}`,
    previewUrl: cover.t,
    fileUrl: '',
    tags: [],
    rating: 'e',
    mediaCount,
    // Vue 2 不会追踪观察后新增的属性，images 必须在对象进 store 前就存在，
    // 否则详情回填时赋值不触发渲染，多图缩略条永远不会显示
    images: [],
    width,
    height,
    aspectRatio: width / height,
    createdAt: null,
    title,
    fileExt: 'webp',
    // 末尾不能是 `.数字` 形式，否则 downloadFile 的 /\.\w+$/ 会误判为已有扩展名
    fileDownloadName: `${title || 'cin'} cin${item.id}`.slice(0, 90),
    fileDownloadText: mediaCount > 1 ? `${mediaCount}P [webp]` : '[webp]',
  } as any
}

/* ---------------------------------- 列表页 --------------------------------- */

/**
 * 列表**不能**用站点的首页 feed（`/api/v6/home/{page}`）。
 *
 * 浏览器实测（点站内自己的 Load More）：第 1 页是 `popular(5) + all(25)`，
 * 点一次取 `home/2`、再点取 `home/3`… 第 1~4 页各能追加 25 条新卡，
 * 但 `home/5` 起返回的内容与 `home/4` **逐条相同**，去重后的卡片数卡在 105 不动 ——
 * 站点自己的「加载更多」到第 4 页就死了。SSR 的 `/?page=N` 更差：
 * `?page=2` 只前进 22 条（与第 1 页重叠 3 条），`?page=3` 直接回落到第 1 页。
 *
 * 站内搜索接口可以当全集列表用，URL 形如 `/search/{query}/{page}/{sort}`，
 * 空查询用 `-` 占位（站点自己的 JS 里就是 `query.trim() || "-"`），
 * 实测翻页严格按 25 条推进、能一路走到末页（第 26510 页只剩 4 条，id 4…1），
 * 所以无查询词时也走它，约 66 万条。
 *
 * `sort` 只认四个值：`date`（最新，`num_pages` 26510）、`popular`（总榜）、
 * `popular-today` / `popular-weekly`（都只有 20 页 / 500 条上限）；
 * 其余写法（`popular-monthly`、`views`、`random`…）会静默回落成 `popular`。
 * 默认取 `date`，与首页的「最新」语义一致；其余三种由搜索框的 `sort:` 语法切换。
 */
const WILDCARD_QUERY = '-'

/** 接口认的排序，顺序即搜索框候选里的展示顺序 */
const SORTS = ['date', 'popular-today', 'popular-weekly', 'popular'] as const
type CinSort = typeof SORTS[number]

/** 翻页默认排序：站内首页的「最新」 */
const DEFAULT_SORT: CinSort = 'date'

/**
 * 搜索框里的排序开关，形如 `sort:popular-today`。
 * 解析时从查询串里摘掉，**不能**透传给接口 —— 否则会被当成一个标签去过滤，结果为空。
 */
const SORT_TOKEN = /(?:^|\s)sort:([a-z-]+)(?=\s|$)/i

/**
 * 每次注入变一次，用来绕开 Cloudflare 的 4h 页面缓存（`Cache-Control: max-age=14400`）。
 *
 * 不绕会出事：缓存是**按 URL** 存的，第 1 页常被 HIT 成几小时前的快照，
 * 而第 2 页是 MISS 的实时数据 —— 实测出现过第 1 页 `697683…697659`、
 * 第 2 页 `697937…697913`，中间 254 条直接跳过，且列表顺序倒挂。
 * 带上这个参数后三页实测严格相接：697960→697936 / 697937→697913 / 697912→697888。
 */
const CACHE_BUST = Date.now().toString(36)

/**
 * 把搜索串拆成「过滤词 + 排序」。
 *
 * `sort:` 写错值（或站点将来改了枚举）时静默退回 `date`，只摘掉这一段、其余照常过滤。
 */
function parseTags(tags: string | null): { query: string; sort: CinSort } {
  const raw = (tags ?? '').trim()
  const hit = raw.match(SORT_TOKEN)
  if (!hit) return { query: raw || WILDCARD_QUERY, sort: DEFAULT_SORT }

  const value = hit[1].toLowerCase()
  const sort = (SORTS as readonly string[]).includes(value) ? value as CinSort : DEFAULT_SORT
  const query = raw.replace(SORT_TOKEN, ' ').trim()
  return { query: query || WILDCARD_QUERY, sort }
}

async function fetchSearch(page: number, query: string, sort: CinSort): Promise<Post[]> {
  // 查询串整体编码，`category:"artist cg"` 里的空格与引号都要原样送到服务端
  const url = `${SEARCH_API}/${encodeURIComponent(query)}/${page}/${sort}?cb=${CACHE_BUST}`
  const resp = await fetch(url)
  if (!resp.ok) return []

  const json = await resp.json() as { result?: CinListItem[] }
  return (json.result ?? []).flatMap(item => {
    const post = toPost(item)
    return post ? [post] : []
  })
}

async function fetchPosts(page: number, tags: string | null): Promise<Post[]> {
  const { query, sort } = parseTags(tags)
  return fetchSearch(page, query, sort)
}

/* ---------------------------------- 详情页 --------------------------------- */

interface DetailCache {
  key: string
  data: CinDetailData
}

let detailCache: DetailCache | null = null

async function loadDetail(id: string): Promise<CinDetailData | null> {
  const key = `${ORIGIN}/v/${id}`
  if (detailCache?.key === key) return detailCache.data

  const resp = await fetch(key)
  if (!resp.ok) return null

  const data = readNextData<CinDetailData>(await resp.text())
  if (!data) return null

  detailCache = { key, data }
  return data
}

async function fetchDetail(id: string): Promise<MultiImageDetail> {
  const data = await loadDetail(id)
  if (!data) return {}

  const pages = data.images?.pages ?? []
  const images: PostImage[] = pages
    .filter(page => !!page.t)
    .map(page => ({
      fileUrl: page.t as string,
      // 图床没有逐页缩略图（`/t/{mediaId}/{n}.webp` 不存在，`?w=` 也被忽略），
      // 只能拿原图当预览：单页约 150KB，30 页的帖在打开弹窗时会拉 4MB 量级
      previewUrl: page.t as string,
      width: page.w || 0,
      height: page.h || 0,
    }))

  return {
    fileUrl: images[0]?.fileUrl ?? null,
    tags: (data.tags ?? [])
      .map(tag => tag.name?.trim())
      .filter((name): name is string => !!name),
    source: `${ORIGIN}/v/${id}`,
    images,
    title: pickTitle(data.title),
  }
}

/* --------------------------------- 适配器导出 -------------------------------- */

export const cin: MultiImageAdapter = {
  // 派发是按 host 判定的（列表与详情共用同一条目），列表态另由 isCinList 区分
  is: isCin,
  posts: fetchPosts,
  detail: fetchDetail,
}
