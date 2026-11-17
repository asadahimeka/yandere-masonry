import type { Post } from '@himeka/booru'
import type { MultiImageAdapter, MultiImageDetail, PostImage } from './multi-image'

const SITE = 'https://dimtown.com'
/**
 * 站点自己的 JSON 接口（正文图集不在详情页 HTML 里）。
 * CORS 只放行 `Origin: https://dimtown.com`，所以只能在 dimtown.com 上调用。
 */
const API = 'https://data.dimapi.com/wp-json/dimtown/v1'
const PER_PAGE = 30

export function isDimtown() {
  return location.hostname === 'dimtown.com'
}

/**
 * 分类表（`/dimtown/v1/categories` 实测）。
 *
 * 站点分类页是 `/pixiv-illustration`、`/cosplay` 这种 slug，接口认的是数字 id，
 * 这里维护一份映射：既能当路径白名单（只有这些 slug 才算列表页），
 * 也能让搜索框的预设词直接命中分类。
 */
const CATEGORIES = [
  { id: 238, slug: 'pixiv-illustration', name: 'P站美图' },
  { id: 32, slug: 'pixiv-painter', name: 'P站画师' },
  { id: 25, slug: 'acg-wallpaper', name: '手机壁纸' },
  { id: 23, slug: 'pc-wallpaper', name: '电脑壁纸' },
  { id: 780, slug: 'illustration', name: '插画' },
  { id: 4126, slug: 'role-illustration', name: '角色特辑' },
  { id: 3723, slug: 'vip-illustration', name: '精选插画' },
  { id: 8, slug: 'cosplay', name: 'COSPLAY' },
  { id: 965, slug: 'lolita', name: 'LOLITA' },
  { id: 964, slug: 'jk', name: 'JK' },
  { id: 966, slug: 'hanfu', name: '汉服' },
  { id: 2827, slug: 'vipcos', name: 'COS精选' },
  { id: 650, slug: 'comictx', name: '动漫头像' },
  { id: 649, slug: 'lolitx', name: '女生头像' },
  { id: 648, slug: 'mantx', name: '男生头像' },
  { id: 651, slug: 'loverstx', name: '情侣头像' },
  { id: 777, slug: 'shouban', name: '手办' },
] as const

/** 搜索框预设：分类名进接口会被翻成 `category=`，别的词走 `search=` */
export const dimtownPresetTags = ['P站美图', 'COSPLAY', '手机壁纸', '电脑壁纸', 'JK', 'LOLITA', '汉服', '手办']

const SLUGS = new Set<string>(CATEGORIES.map(item => item.slug))

/** 帖子是 `/162115.html`，另有 `/user.html`、`/search` 等站点页，一律不接管 */
const LIST_PATH_RE = new RegExp(`^/(?:|page/\\d+|(?:${[...SLUGS].join('|')})(?:/page/\\d+)?)/?$`)

export function isDimtownList() {
  return isDimtown() && LIST_PATH_RE.test(location.pathname)
}

function pathCategoryId(): number | null {
  const slug = location.pathname.split('/').filter(Boolean)[0]
  if (!slug || slug === 'page') return null
  return CATEGORIES.find(item => item.slug === slug)?.id ?? null
}

function categoryIdOf(token: string): number | null {
  const term = token.trim().toLowerCase()
  if (!term) return null
  const hit = CATEGORIES.find(item => term === item.slug || term === item.name.toLowerCase())
  return hit?.id ?? null
}

function listUrl(page: number, tags: string | null) {
  const params = new URLSearchParams({ page: String(page), per_page: String(PER_PAGE) })

  const word = (tags ?? '').trim()
  const categoryId = categoryIdOf(word)
  if (categoryId) params.set('category', String(categoryId))
  else if (word) params.set('search', word)
  else {
    const fromPath = pathCategoryId()
    if (fromPath) params.set('category', String(fromPath))
  }

  return `${API}/posts?${params}`
}

function parseCards(items: any[]): Post[] {
  return items.flatMap(item => {
    const previewUrl = item.featured_media?.preview_url || item.featured_media?.url || ''
    if (!previewUrl) return []

    const width = Number(item.featured_media?.width) || 680
    const height = Number(item.featured_media?.height) || 891
    const id = String(item.id)
    const title = item.title ?? ''
    const categories = (item.terms?.categories ?? []).map((term: any) => term.name).filter(Boolean)

    return [{
      id,
      postView: item.url || `${SITE}/${id}.html`,
      previewUrl,
      // 图集地址只有详情接口知道，列表阶段留空由 detail() 补齐
      fileUrl: '',
      tags: categories,
      rating: 'e',
      mediaCount: Number(item.gallery?.image_count) || 0,
      // Vue 2 不追踪观察后新增的属性，多图字段必须在列表阶段就存在
      images: [],
      width,
      height,
      aspectRatio: width / height,
      createdAt: item.published_at ? new Date(item.published_at) : null,
      title,
      fileExt: 'webp',
      // 末尾不能是 `.数字` 形式，否则 downloadFile 的 /\.\w+$/ 会误判为已有扩展名
      fileDownloadName: `dimtown ${id} ${title}`.slice(0, 90),
      fileDownloadText: '[webp]',
    } as any]
  })
}

async function fetchPosts(page: number, tags: string | null): Promise<Post[]> {
  const resp = await fetch(listUrl(page, tags))
  if (!resp.ok) return []
  const body = await resp.json()
  const items = body?.data
  if (!Array.isArray(items) || items.length === 0) return []
  return parseCards(items)
}

/* ---------------------------------- 详情页 --------------------------------- */

let detailCache: { id: string; data: MultiImageDetail } | null = null

/**
 * 一篇图集。
 *
 * 详情页 HTML 只渲染首屏几张，真正的全量在 `/posts/{id}` 的 `galleries[].images[]`，
 * 每项自带 `preview_url` 与真实宽高。`has_hd` 的原图要积分下载，这里只用预览档。
 */
async function fetchDetail(id: string): Promise<MultiImageDetail> {
  if (detailCache?.id === id) return detailCache.data

  const resp = await fetch(`${API}/posts/${id}`)
  if (!resp.ok) return {}
  const body = await resp.json()
  const post = body?.data
  if (!post) return {}

  const images: PostImage[] = (post.galleries ?? []).flatMap((gallery: any) =>
    (gallery.images ?? []).map((image: any) => ({
      fileUrl: image.preview_url,
      previewUrl: image.preview_url,
      width: Number(image.width) || 950,
      height: Number(image.height) || 1400,
    })),
  ).filter((image: PostImage) => !!image.fileUrl)

  const tags = [
    ...(post.terms?.categories ?? []).map((term: any) => term.name),
    ...(post.terms?.tags ?? []).map((term: any) => term.name),
  ].filter(Boolean)

  const data: MultiImageDetail = images.length
    ? {
        fileUrl: images[0].fileUrl,
        tags,
        source: post.url || `${SITE}/${id}.html`,
        images,
        title: post.title ?? '',
      }
    : { tags, source: post.url || `${SITE}/${id}.html`, title: post.title ?? '' }

  detailCache = { id, data }
  return data
}

/* --------------------------------- 适配器导出 -------------------------------- */

export const dimtown: MultiImageAdapter = {
  is: isDimtownList,
  posts: fetchPosts,
  detail: fetchDetail,
}
