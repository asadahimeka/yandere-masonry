import type { Post } from '@himeka/booru'

export interface PostImage {
  fileUrl: string
  previewUrl: string
  width: number
  height: number
}

export interface MultiImagePost extends Post {
  images?: PostImage[]
  title?: string
  mediaCount?: number
}

export interface DetailResult {
  fileUrl?: string | null
  sampleUrl?: string | null
  tags?: string[]
  source?: string | null
  images?: PostImage[]
  title?: string
}

interface SiteConfig {
  host: string
  pageSize: number
  listUrl: (page: number, size: number) => string
  detailUrl: (id: string) => string
  cardSelector: string
  linkSelector: string
  mediaSelector: string
  titleSelector: string
  badgeSelector: string
  dateSelector?: string
  rating: string
  thumb: (url: string) => string
  sourceStrategy: 'note' | 'club'
}

const noteConfig: SiteConfig = {
  host: '16knote.com',
  pageSize: 90,
  listUrl: (page, size) => `https://16knote.com/?p=${page}&size=${size}`,
  detailUrl: id => `https://16knote.com/post/${id}/`,
  cardSelector: '.waterfall-item',
  linkSelector: 'a.waterfall-card',
  mediaSelector: '.post-media-list > figure.post-media',
  titleSelector: 'h1.post-title',
  badgeSelector: '.waterfall-tag',
  dateSelector: '.waterfall-meta > div:nth-child(2)',
  rating: 's',
  thumb: url => {
    const photon = url.replace('https://img.16knote.com/', 'https://i3.wp.com/img.16knote.com/')
    return `${photon}${url.includes('?') ? '&' : '?'}w=400`
  },
  sourceStrategy: 'note',
}

const clubConfig: SiteConfig = {
  host: '16k.club',
  pageSize: 30,
  listUrl: (page, size) => `https://16k.club/?p=${page}&size=${size}`,
  detailUrl: id => `https://16k.club/post/${id}/`,
  cardSelector: '.grid-item',
  linkSelector: 'a[href^="/post/"]',
  mediaSelector: 'div.text-center[style*="margin-bottom:0.5rem"]',
  titleSelector: 'h1',
  badgeSelector: '.badge.text-bg-dark',
  rating: 'e',
  thumb: url => url,
  sourceStrategy: 'club',
}

function idFromHref(href: string) {
  return href.match(/(\d+)\/?$/)?.[1] ?? ''
}

function toNumber(value: string | null | undefined) {
  return Number(value ?? 0)
}

function parseDate(text?: string | null): Date | null {
  if (!text) return null
  const match = text.trim().match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/)
  if (!match) return null
  return new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    Number(match[4]),
    Number(match[5]),
    Number(match[6]),
  )
}

function hashAfter(href: string | null | undefined, marker: string) {
  if (!href) return ''
  const index = href.indexOf(marker)
  return index >= 0 ? href.slice(index + marker.length) : ''
}

function decodeBase64Url(value: string): string | null {
  try {
    let base64 = value.replace(/-/g, '+').replace(/_/g, '/')
    const padding = base64.length % 4
    if (padding) base64 += '='.repeat(4 - padding)
    return decodeURIComponent(atob(base64))
  } catch {
    return null
  }
}

function parseSource(doc: Document, config: SiteConfig): string | null {
  if (config.sourceStrategy === 'club') {
    const plain = hashAfter(doc.querySelector('a#proxy')?.getAttribute('href'), '#')
    if (plain) return plain
  }
  const sourceHref = doc.querySelector('a#source')?.getAttribute('href')
  const encoded = hashAfter(sourceHref, '#/') || hashAfter(sourceHref, '#')
  return encoded ? decodeBase64Url(encoded) : null
}

async function fetchPosts(config: SiteConfig, page: number, tags: string | null): Promise<Post[]> {
  void tags
  const resp = await fetch(config.listUrl(page, config.pageSize))
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')
  const cards = Array.from(doc.querySelectorAll(config.cardSelector))
  return cards.map(card => {
    const link = card.querySelector(config.linkSelector)
    const id = idFromHref(link?.getAttribute('href') ?? '')
    const postView = config.detailUrl(id)

    const img = card.querySelector('img')
    const direct = img?.getAttribute('data-src') || img?.getAttribute('src') || ''
    const previewUrl = config.thumb(direct)
    const width = toNumber(img?.getAttribute('width'))
    const height = toNumber(img?.getAttribute('height'))

    const badge = card.querySelector(config.badgeSelector)?.textContent?.trim() ?? ''
    const mediaCount = /^\d+$/.test(badge) ? Number(badge) : 1
    const isVideo = badge.toLowerCase() === 'mp4'

    const title = card.querySelector(config.titleSelector)?.textContent?.trim() ?? ''
    const createdAt = config.dateSelector
      ? parseDate(card.querySelector(config.dateSelector)?.textContent)
      : null

    return {
      id,
      postView,
      previewUrl,
      fileUrl: '',
      tags: [],
      rating: config.rating,
      mediaCount,
      // Vue 2 不会追踪观察后新增的属性，images 必须在对象进入 store 前就存在，
      // 否则详情回填时赋值不会触发渲染，多图缩略图条将永远不显示
      images: [],
      width,
      height,
      aspectRatio: width / height,
      createdAt,
      title,
      // 列表页靠 fileExt 显示 mp4 角标；原图后缀在详情页回填后才知道
      fileExt: isVideo ? 'mp4' : 'jpg',
      // 末尾不能是 .数字 形式，否则 downloadFile 的 /\.\w+$/ 会误判为已有扩展名而不补后缀
      fileDownloadName: `${config.host} ${id} ${width}x${height}`,
      fileDownloadText: `${width}×${height} [${isVideo ? 'mp4' : 'jpg'}]`,
    } as any
  }) as Post[]
}

async function fetchDetail(config: SiteConfig, id: string): Promise<DetailResult> {
  const resp = await fetch(config.detailUrl(id))
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')
  const media = Array.from(doc.querySelectorAll(config.mediaSelector))

  const images: PostImage[] = media.map(el => {
    const video = el.querySelector('video')
    if (video) {
      const source = el.querySelector('source[src]')?.getAttribute('src') || video.getAttribute('src') || ''
      return {
        fileUrl: source,
        previewUrl: video.getAttribute('poster') ?? '',
        width: toNumber(video.getAttribute('width')),
        height: toNumber(video.getAttribute('height')),
      }
    }

    const img = el.querySelector('img')
    const fileUrl = img?.getAttribute('data-src') || img?.getAttribute('src') || ''
    return {
      fileUrl,
      previewUrl: config.thumb(fileUrl),
      width: toNumber(img?.getAttribute('width')),
      height: toNumber(img?.getAttribute('height')),
    }
  })

  return {
    fileUrl: images[0]?.fileUrl ?? null,
    tags: [],
    source: parseSource(doc, config),
    images,
    title: doc.querySelector(config.titleSelector)?.textContent?.trim() ?? '',
  }
}

function createAdapter(config: SiteConfig) {
  return {
    is: () => location.hostname === config.host,
    posts: (page: number, tags: string | null) => fetchPosts(config, page, tags),
    detail: (id: string) => fetchDetail(config, id),
  }
}

export const sixteenKNote = createAdapter(noteConfig)
export const sixteenKClub = createAdapter(clubConfig)

export function getPostImages(post?: Post | null): PostImage[] {
  return (post as MultiImagePost | undefined | null)?.images ?? []
}

export function getMediaCount(post?: Post | null): number {
  const typed = post as MultiImagePost | undefined | null
  if (!typed) return 0
  if (typeof typed.mediaCount === 'number') return typed.mediaCount
  return typed.images?.length ?? 0
}

export function getPostTitle(post?: Post | null): string {
  return (post as MultiImagePost | undefined | null)?.title ?? ''
}
