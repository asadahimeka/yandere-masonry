import type { Post } from '@himeka/booru'
import type { MultiImageAdapter, MultiImageDetail, PostImage } from './multi-image'

const getOrigin = () => location.origin

/**
 * 列表缩略图是主题切好的 600×315 横裁（`srcset` 里还有 310×163 一档），
 * 卡片按这个比例摆，与站点自己的版式一致。
 */
const THUMB_WIDTH = 600
const THUMB_HEIGHT = 315

export function isMisskon() {
  return location.hostname === 'misskon.com'
}

/**
 * 帖子形如 `/121778-haivia-...-155-photos/`，站内分页再加 `/2/`。
 * 其余路径（首页、`/page/N`、`/tag/x`、`/?s=`）都是列表。
 */
const POST_PATH_RE = /^\/\d+-[^/]+(?:\/\d+)?\/?$/

export function isMisskonPost() {
  return isMisskon() && POST_PATH_RE.test(location.pathname)
}

export function isMisskonList() {
  return isMisskon() && !POST_PATH_RE.test(location.pathname)
}

/**
 * 列表地址。
 *
 * WordPress 的翻页是路径 `/page/N/`；搜索词放 `?s=`，两者能叠加
 * （`/page/2/?s=xxx`）。分类与 tag 页沿用当前路径，只替换页码段。
 */
function listUrl(page: number, tags: string | null) {
  const url = new URL(location.href)
  url.searchParams.delete('page')
  url.searchParams.delete('tags')

  let pathname = url.pathname.replace(/\/page\/\d+\/?$/, '/')
  const word = (tags ?? '').trim()
  if (word) {
    url.searchParams.set('s', word)
    // 搜索一律从首页进，避免把 tag 页的路径带进搜索结果
    pathname = '/'
  }

  if (page > 1) {
    pathname = `${pathname.endsWith('/') ? pathname : `${pathname}/`}page/${page}/`
  }

  url.pathname = pathname
  return url.href
}

/** 标题里的 `(155 photos)` 就是站点声明的张数 */
function countFromTitle(title: string) {
  return Number(/\((\d+)\s*photos?\)/i.exec(title)?.[1] ?? 0)
}

function parseCards(doc: Document): Post[] {
  return [...doc.querySelectorAll<HTMLElement>('article.item-list')].flatMap(article => {
    const link = article.querySelector<HTMLAnchorElement>('.post-thumbnail a[href]')
      || article.querySelector<HTMLAnchorElement>('h2.post-box-title a[href]')
    const href = link?.getAttribute('href') ?? ''
    const id = href.match(/\/(\d+)-/)?.[1]
    if (!id) return []

    const img = article.querySelector<HTMLImageElement>('.post-thumbnail img')
    const previewUrl = img?.getAttribute('data-src')
      || img?.getAttribute('data-srcset')?.split(',')[0]?.trim().split(/\s+/)[0]
      || ''
    if (!/^https?:/.test(previewUrl)) return []

    const title = article.querySelector('h2.post-box-title a')?.textContent?.trim() ?? ''
    const tags = [...article.querySelectorAll('.post-cats a')]
      .map(tag => tag.textContent?.trim() ?? '')
      .filter(Boolean)

    return [{
      id,
      postView: href,
      previewUrl,
      // 图集地址只有 REST 正文里有，列表阶段留空由 detail() 补齐
      fileUrl: '',
      tags,
      rating: 'e',
      mediaCount: countFromTitle(title),
      // Vue 2 不追踪观察后新增的属性，多图字段必须在列表阶段就存在
      images: [],
      width: THUMB_WIDTH,
      height: THUMB_HEIGHT,
      aspectRatio: THUMB_WIDTH / THUMB_HEIGHT,
      createdAt: null,
      title,
      fileExt: 'webp',
      // 末尾不能是 `.数字` 形式，否则 downloadFile 的 /\.\w+$/ 会误判为已有扩展名
      fileDownloadName: `misskon ${id} ${title.replace(/\s*\(\d+\s*photos?\)\s*$/i, '')}`.slice(0, 90),
      fileDownloadText: '[webp]',
    } as any]
  })
}

async function fetchPosts(page: number, tags: string | null): Promise<Post[]> {
  const resp = await fetch(listUrl(page, tags))
  if (!resp.ok) return []
  return parseCards(new DOMParser().parseFromString(await resp.text(), 'text/html'))
}

/* ---------------------------------- 详情页 --------------------------------- */

/** 正文信息栏里写着 `Dimensions: 2560×3840`，整套图同一尺寸 */
function sizeOf(html: string) {
  const match = /Dimensions:<\/strong>\s*(\d+)\s*(?:&#215;|×|x)\s*(\d+)/i.exec(html)
  return {
    width: Number(match?.[1]) || 2000,
    height: Number(match?.[2]) || 3000,
  }
}

let detailCache: { id: string; data: MultiImageDetail } | null = null

/**
 * 一篇图集。
 *
 * 详情页把图切成 3 页、每页只给一部分，而 REST 的 `content.rendered` 一次
 * 返回全部页的内容 —— 实测 24 张全在里面（站点声明 44 张，其余在下载包里）。
 */
async function fetchDetail(id: string): Promise<MultiImageDetail> {
  if (detailCache?.id === id) return detailCache.data

  const resp = await fetch(`${getOrigin()}/wp-json/wp/v2/posts/${id}?_fields=id,title,content,link,date`)
  if (!resp.ok) return {}
  const post = await resp.json()
  if (!post?.content) return {}

  const html: string = post.content.rendered ?? ''
  const { width, height } = sizeOf(html)

  const doc = new DOMParser().parseFromString(html, 'text/html')
  const seen = new Set<string>()
  const images: PostImage[] = []
  for (const img of doc.querySelectorAll<HTMLImageElement>('img')) {
    const src = img.getAttribute('src') || img.getAttribute('data-src') || ''
    // 正文里只有图，但仍要挡掉站点自己的 logo 之类
    if (!/^https?:\/\/[^/]*misskon\.com\//i.test(src) || seen.has(src)) continue
    seen.add(src)
    images.push({ fileUrl: src, previewUrl: src, width, height })
  }

  const data: MultiImageDetail = images.length
    ? {
        fileUrl: images[0].fileUrl,
        // 标签已在列表阶段拿到（`.post-cats`），这里不覆盖
        source: post.link || `${getOrigin()}/${id}/`,
        images,
        title: new DOMParser().parseFromString(post.title?.rendered ?? '', 'text/html').body.textContent?.trim() ?? '',
      }
    : {}

  detailCache = { id, data }
  return data
}

/* --------------------------------- 适配器导出 -------------------------------- */

export const misskon: MultiImageAdapter = {
  is: isMisskonList,
  posts: fetchPosts,
  detail: fetchDetail,
}
