import type { Post } from '@himeka/booru'
import type { MultiImageAdapter, MultiImageDetail, PostImage, SiteAdapter } from './multi-image'
import { settings } from '@/store'

const ORIGIN = 'https://www.hentaiclub.net'
const CHUNK_SIZE = 30

/** 列表封面就是原图，1440×2160（0.667） */
const WIDTH = 1440
const HEIGHT = 2160

export function isHentaiclub() {
  return /(^|\.)hentaiclub\.net$/.test(location.hostname)
}

/** 文章页 `/r15/71554.html` 与 `/r18/71473.html` */
const ARTICLE_PATH = /^\/(?:r15|r18)\/(\d+)\.html$/

export function isHentaiclubArticle() {
  return isHentaiclub() && ARTICLE_PATH.test(location.pathname)
}

export function isHentaiclubList() {
  return isHentaiclub() && !ARTICLE_PATH.test(location.pathname)
}

/* --------------------------------- 分类与预设 -------------------------------- */

interface SortEntry {
  label: string
  path: string
  aliases: string[]
}

/**
 * 站点的列表入口：
 * - 首页 `/`，翻页 `/page/N/`
 * - 分区 `/sort/r15.html`、`/sort/r18.html`，翻页是 `/sort/r15.html/N/`（页码在 .html 之后）
 * - 标签 `/tag/{名字}/`
 */
const SORTS: SortEntry[] = [
  { label: '全部', path: '/', aliases: ['all', 'home'] },
  { label: 'R-15', path: '/sort/r15.html', aliases: ['r15', '15'] },
  { label: 'R-18', path: '/sort/r18.html', aliases: ['r18', '18'] },
]

export const hentaiclubPresetTags = SORTS.map(e => e.label)

function sortOf(token: string): SortEntry | null {
  const term = token.trim().toLowerCase()
  if (!term) return null
  return SORTS.find(e => term === e.label.toLowerCase() || e.aliases.includes(term)) ?? null
}

/**
 * 整串都是分区分词时取最后一个（搜索框选词是追加语义，连点会拼成「全部 R-18」），
 * 否则整串当搜索词。和 everia 一样，分区页不接受 `?s=`，两者无法叠加。
 */
function resolveSort(tags?: string | null): SortEntry | null {
  const tokens = (tags ?? '').trim().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return null
  const hits = tokens.map(sortOf)
  if (hits.includes(null)) return null
  return hits[hits.length - 1] ?? null
}

/* ---------------------------------- 列表页 --------------------------------- */

/** 首页翻页 `/page/N/`，分区翻页 `/sort/r15.html/N/`（页码在 .html 之后，第 1 页不带斜杠） */
function listUrl(page: number, sort?: SortEntry | null) {
  if (sort) {
    if (sort.path === '/') return `${ORIGIN}${page > 1 ? `/page/${page}/` : '/'}`
    return `${ORIGIN}${sort.path}${page > 1 ? `/${page}/` : ''}`
  }
  // 无筛选：沿用当前路径（可能是 /sort/r18.html/2/ 或 /page/3/）
  const base = location.pathname.replace(/\/(?:\d+)\/?$/, '/')
  if (base === '/' || location.pathname.startsWith('/page/')) {
    return `${ORIGIN}${page > 1 ? `/page/${page}/` : '/'}`
  }
  const trimmed = base.replace(/\/$/, '')
  return `${ORIGIN}${trimmed}${page > 1 ? `/${page}/` : ''}`
}

function parseCount(text?: string | null) {
  return Number(text?.match(/\[(\d+)P\]/i)?.[1] ?? 0) || 1
}

async function fetchListPosts(page: number, tags?: string | null): Promise<Post[]> {
  const tokens = (tags ?? '').trim().split(/\s+/).filter(Boolean)
  const sort = resolveSort(tags)

  // 搜索只有 POST，且站点不返回翻页链接（实测 POST /page/2/ 仍是同一批 24 条），
  // 所以搜索结果只给第一页，之后的翻页直接判空让瀑布流停下
  if (tokens.length > 0 && !sort) {
    if (page > 1) return []
    const body = new URLSearchParams({ s: tokens.join(' ') })
    const resp = await fetch(`${ORIGIN}/`, { method: 'POST', body })
    if (!resp.ok) return []
    return parseCards(new DOMParser().parseFromString(await resp.text(), 'text/html'))
  }

  const resp = await fetch(listUrl(page, sort))
  if (!resp.ok) return []
  return parseCards(new DOMParser().parseFromString(await resp.text(), 'text/html'))
}

function parseCards(doc: Document): Post[] {
  return Array.from(doc.querySelectorAll<HTMLElement>('.item')).flatMap(card => {
    const href = card.querySelector<HTMLAnchorElement>('a.item-link[href]')?.getAttribute('href') ?? ''
    const img = card.querySelector<HTMLImageElement>('img.item-img')
    const previewUrl = img?.getAttribute('data-original') || img?.getAttribute('data-src') || img?.getAttribute('src') || ''
    if (!href || !previewUrl) return []

    const id = href.match(/\/(\d+)\.html$/)?.[1] ?? href

    return [{
      id,
      postView: href,
      previewUrl,
      fileUrl: '',
      tags: [],
      rating: 'e',
      // Vue 2 不追踪观察后新增的属性，多图字段必须在列表阶段就存在
      mediaCount: parseCount(card.querySelector('.item-num')?.textContent),
      images: [],
      width: WIDTH,
      height: HEIGHT,
      aspectRatio: WIDTH / HEIGHT,
      createdAt: null,
      title: card.querySelector('.item-link-text')?.textContent?.trim() ?? '',
      fileExt: 'webp',
      fileDownloadName: `hentaiclub ${id} ${WIDTH}x${HEIGHT}`,
      fileDownloadText: `${WIDTH}×${HEIGHT} [webp]`,
    } as any]
  })
}

/* --------------------------------- 文章页 --------------------------------- */

interface ArticleData {
  postId: string
  title: string
  images: PostImage[]
}

let articleCache: ArticleData | null = null
let articleCacheKey = ''

function articleId() {
  return location.pathname.match(ARTICLE_PATH)?.[1] ?? ''
}

/**
 * 一篇文章的全部图片。
 *
 * 详情页把整篇的图内联在一个 HTML 里（实测 11 张与 148 张都只有 84KB），
 * 一次请求即可；图床 cdn.sshs.rip 没有任何尺寸变体，所以每张 260KB 起。
 */
async function loadArticle(): Promise<ArticleData | null> {
  const key = location.pathname
  if (articleCache && articleCacheKey === key) return articleCache

  const postId = articleId()
  if (!postId) return null

  const resp = await fetch(`${ORIGIN}${location.pathname}`)
  if (!resp.ok) return null
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')

  const images: PostImage[] = Array.from(doc.querySelectorAll<HTMLImageElement>('img.post-item-img'))
    .map(el => el.getAttribute('data-original') || el.getAttribute('data-src') || '')
    .filter(Boolean)
    .map(src => ({ fileUrl: src, previewUrl: src, width: WIDTH, height: HEIGHT }))

  articleCache = {
    postId,
    // 详情页没有 h1，标题只在 <title> 里，格式是「标题 - 绅士会所」
    title: doc.querySelector('h1')?.textContent?.trim()
      || doc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.trim()
      || doc.querySelector('title')?.textContent?.replace(/\s*-\s*绅士会所\s*$/, '').trim()
      || '',
    images,
  }
  articleCacheKey = key
  return articleCache
}

/**
 * 把整篇的图当作瀑布流条目喂出去。
 *
 * 不做多图缩略条：图床没有缩略图，148 张 × 260KB ≈ 38MB，
 * 正是 everia 踩过的坑；这里让文章页自己变成瀑布流（列表卡片新标签打开）。
 */
async function fetchArticlePosts(page: number): Promise<Post[]> {
  const data = await loadArticle()
  if (!data || data.images.length === 0) return []

  // 虚拟布局是 93vh 内部滚动，页面级触底不触发，只能一次给全
  const chunk = settings.masonryLayout === 'virtual' ? data.images.length : CHUNK_SIZE
  const start = (page - 1) * chunk
  if (start >= data.images.length) return []

  return data.images.slice(start, start + chunk).map((img, offset) => {
    const index = start + offset
    return {
      id: `${data.postId}-${index}`,
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
      fileExt: 'webp',
      fileDownloadName: `hentaiclub ${data.postId} ${index + 1} ${img.width}x${img.height}`,
      fileDownloadText: `${img.width}×${img.height} [webp]`,
    } as any
  })
}

async function fetchArticleDetail(id: string): Promise<MultiImageDetail> {
  const data = await loadArticle()
  const index = Number(id.split('-').pop())
  const img = data?.images[index]
  if (!data || !img) return {}

  // 刻意不回传 images：连续浏览交给瀑布流，回传会复活 148 张的缩略条
  return { fileUrl: img.fileUrl, title: data.title, tags: [] }
}

/* --------------------------------- 适配器导出 -------------------------------- */

interface HentaiclubActions {
  list: SiteAdapter
  post: MultiImageAdapter
}

/**
 * 同一 host 的两个视图，靠路径互斥：
 * - `list`：首页 / 分区 / 标签页，24 条一页
 * - `post`：文章页，把整篇图当作瀑布流条目逐块喂出去
 */
export const hentaiclub: HentaiclubActions = {
  list: {
    is: isHentaiclubList,
    posts: fetchListPosts,
  },
  post: {
    is: isHentaiclubArticle,
    posts: fetchArticlePosts,
    detail: fetchArticleDetail,
  },
}
