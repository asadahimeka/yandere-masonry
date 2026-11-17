import type { Post } from '@himeka/booru'
import type { SiteAdapter } from './multi-image'

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
 * **只做列表**：图集的全量原图地址在每张图的看图页里，且带当天过期的 `verify` 签名，
 * 一个 200 页的本子要 200 次请求才能拼齐；缩略图只有 300×400，放进详情弹窗反而看不清。
 * 因此卡片点击后由「打开原帖」进站点自己的阅读器。
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
      // 没有详情数据，封面就是弹窗里能给的唯一一张
      fileUrl: previewUrl,
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

/* --------------------------------- 适配器导出 -------------------------------- */

export const wnacg: SiteAdapter = {
  is: isWnacgList,
  posts: fetchPosts,
}
