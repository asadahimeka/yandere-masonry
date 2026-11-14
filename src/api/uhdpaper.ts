import { getImageSize } from '@/utils'

const ORIGIN = 'https://www.uhdpaper.com'

export function isUhdpaperPage() {
  return location.hostname === 'uhdpaper.com' || location.hostname.endsWith('.uhdpaper.com')
}

// uhdpaper 的列表页没有 page 参数，翻页靠 ?updated-max=... 游标，这里自己记住下一页地址
let nextPageHref: string | null = null
let seenIds = new Set<string>()
let started = false
// 列表页只能拿到按逗号拆散的词，真正的标签（短语）要回详情页取
const postHrefById = new Map<string, string>()

// 站点自己的搜索地址：空格用 + 连接，并带上 i=0
export function uhdpaperSearchUrl(tags: string) {
  const q = tags.trim().split(/\s+/).map(encodeURIComponent).join('+')
  return `${ORIGIN}/search?q=${q}&by-date=true&i=0`
}

// 缩略图地址去掉 -thumb 后缀就是原图地址，服务端会 301 到实际文件
function thumbToOriginal(url: string) {
  return url.split(/[?#]/)[0].replace(/-thumb\.(jpe?g|png|webp)$/i, '')
}

async function parseCard(el: Element) {
  const a = el.querySelector<HTMLAnchorElement>('a[href]')
  const img = el.querySelector<HTMLImageElement>('img[src]')
  if (!a?.href || !img) return null

  const id = new URL(a.href, ORIGIN).pathname.split('/').pop()?.replace(/\.html?$/, '') || ''
  if (!id || seenIds.has(id)) return null

  // 站点把标签放在缩略图外层链接的 aria-label 里，形如 "Anime, Girl, 4K, Wallpaper, #7685t"
  const tags = [...new Set(
    (a.getAttribute('aria-label') || '')
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag && !tag.startsWith('#') && !/^wallpaper$/i.test(tag)),
  )]

  const previewUrl = new URL(img.getAttribute('src') || '', ORIGIN).href
  const fileUrl = thumbToOriginal(previewUrl)
  if (!fileUrl) return null

  seenIds.add(id)
  postHrefById.set(id, a.href)

  // 列表页不给尺寸，只能用缩略图量比例；量不到就按 16:9 兜底
  let { width, height } = await getImageSize(previewUrl)
  if (!width || !height) {
    width = 16
    height = 9
  }

  return {
    id,
    postView: a.href,
    previewUrl,
    // 详情页默认显示 sampleUrl，用站点的 2K 变体，别把缩略图放大糊一屏
    sampleUrl: `${fileUrl}-pc-2k.jpg`,
    fileUrl,
    tags,
    width,
    height,
    aspectRatio: width / height,
    fileExt: 'jpg',
    fileDownloadName: `uhdpaper ${id}.jpg`,
    rating: 's',
  } as any
}

export async function fetchUhdpaperPosts(page: number, tags: string | null) {
  if (!started || page <= 1) {
    started = true
    seenIds = new Set()
    const url = new URL(location.href)
    url.searchParams.delete('page')
    nextPageHref = tags ? uhdpaperSearchUrl(tags) : url.href
  }
  if (!nextPageHref) return []

  const resp = await fetch(nextPageHref)
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')

  const pager = doc.querySelector<HTMLAnchorElement>('a.blog-pager-older-link')
  nextPageHref = pager?.getAttribute('href') ? new URL(pager.getAttribute('href')!, ORIGIN).href : null

  const cards = [...doc.querySelectorAll('article.post-outer-container')]
  const results = await Promise.all(cards.map(el => parseCard(el)))
  return results.filter(Boolean)
}

// 详情页隐藏块 <div id="post_tmp"> 里放着站点自己的元数据：
// <h2>Anime Girls, Tongue Out, Nun, Tattoo, 4K, #7310j</h2>、<a> 来源、<img> 原图
export async function fetchUhdpaperDetail(id: string) {
  const href = postHrefById.get(id)
  if (!href) return {}
  const resp = await fetch(href)
  if (!resp.ok) return {}
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')
  const meta = doc.querySelector('#post_tmp')
  if (!meta) return {}

  const tags = [...new Set(
    (meta.querySelector('h2')?.textContent || '')
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag && !tag.startsWith('#') && !/^wallpaper$/i.test(tag)),
  )]
  const source = meta.querySelector('a')?.getAttribute('href') || ''

  return { tags, source }
}

export const uhdpaper = {
  is: isUhdpaperPage,
  posts: fetchUhdpaperPosts,
  detail: fetchUhdpaperDetail,
}
