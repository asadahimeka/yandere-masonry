import { getImageSize } from '@/utils'

const ORIGIN = 'https://www.uhdpaper.com'

export function isUhdpaperPage() {
  return location.hostname === 'uhdpaper.com' || location.hostname.endsWith('.uhdpaper.com')
}

// uhdpaper 的列表页没有 page 参数，翻页靠 ?updated-max=... 游标，这里自己记住下一页地址
let nextPageHref: string | null = null
let seenIds = new Set<string>()
let started = false

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

  const previewUrl = new URL(img.getAttribute('src') || '', ORIGIN).href
  const fileUrl = thumbToOriginal(previewUrl)
  if (!fileUrl) return null

  seenIds.add(id)

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
    tags: [] as string[],
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

export const uhdpaper = {
  is: isUhdpaperPage,
  posts: fetchUhdpaperPosts,
}
