import type { MultiImageDetail } from './multi-image'

const ORIGIN = 'https://wallhaven.cc'

/** 会渲染缩略图网格的路径；首页 `/` 视作 latest（首页本身是落地页，没有网格） */
const LIST_PATH_RE = /^\/(?:|latest|hot|toplist|random|search)\/?$/

export function isWallhaven() {
  return /^(?:www\.)?wallhaven\.cc$/.test(location.hostname)
}

/**
 * 只接管列表型页面。
 *
 * `/w/{id}`（单图页）、`/user/*`、`/settings`、`/collections` 等都不接管，
 * 否则自动挂载会把整页替换成空瀑布流。`prepare.ts` 的详情页守卫同步依赖
 * 这里的 `LIST_PATH_RE` 形态。
 */
export function isWallhavenList() {
  return isWallhaven() && LIST_PATH_RE.test(location.pathname)
}

/** 搜索框预设：整串命中时切到对应分区，其余按标签搜索 */
export const wallhavenPresetTags = ['latest', 'hot', 'toplist', 'random']

const SECTION_WORDS = new Set(wallhavenPresetTags)

/** 缩略图三档：small 300×200 / lg 432×243 / orig 长边 300，只有 orig 保留原始比例 */
function thumbUrl(id: string, kind: 'lg' | 'orig' | 'small') {
  return `https://th.wallhaven.cc/${kind}/${id.slice(0, 2)}/${id}.jpg`
}

/**
 * 原图地址可由 id 直接推出：`full/{id 前两位}/wallhaven-{id}.{ext}`。
 *
 * 因此列表阶段就能给出可下载的 fileUrl，详情弹窗不需要再发请求。
 */
function originalUrl(id: string, ext: string) {
  return `https://w.wallhaven.cc/full/${id.slice(0, 2)}/wallhaven-${id}.${ext}`
}

function listUrl(page: number, tags: string | null) {
  const word = tags?.trim().toLowerCase()
  if (word && SECTION_WORDS.has(word)) {
    // random 没有页码概念，带上 page 只会白白污染地址
    return word === 'random' ? `${ORIGIN}/random` : `${ORIGIN}/${word}?page=${page}`
  }
  if (word) {
    // 站点搜索：空格分词用 + 连接（+ 即 AND）；`-tag`、`@user`、`ratio:16x9` 等原生语法直接透传
    const q = word.split(/\s+/).map(encodeURIComponent).join('+')
    return `${ORIGIN}/search?q=${q}&page=${page}`
  }
  // 没有搜索词时沿用当前列表地址，只替换页码（`/` 落地页换成 latest）
  const url = new URL(location.href)
  url.searchParams.delete('page')
  if (url.pathname === '/') url.pathname = '/latest'
  url.searchParams.set('page', page.toString())
  return url.href
}

function parseCard(el: Element) {
  const id = el.getAttribute('data-wallpaper-id')
  if (!id) return null

  const res = /(\d+)\s*x\s*(\d+)/.exec(el.querySelector('.wall-res')?.textContent || '')
  if (!res) return null
  const width = Number(res[1])
  const height = Number(res[2])
  if (!width || !height) return null

  const cls = el.className
  const rating = /thumb-nsfw/.test(cls) ? 'e' : /thumb-sketchy/.test(cls) ? 'q' : 's'
  // `.png` 角标存在即 PNG，否则一律 jpg（与站点自身判断一致）
  const fileExt = el.querySelector('.png') ? 'png' : 'jpg'

  // lg 是 16:9 裁切，只对 16:9 的图用；其余比例用 orig，否则瀑布流里会被拉变形
  const isWidescreen = Math.abs(width / height - 16 / 9) < 0.01
  const previewUrl = thumbUrl(id, isWidescreen ? 'lg' : 'orig')

  const postView = el.querySelector<HTMLAnchorElement>('a.preview')?.href || `${ORIGIN}/w/${id}`

  return {
    id,
    postView,
    previewUrl,
    sampleUrl: originalUrl(id, fileExt),
    fileUrl: originalUrl(id, fileExt),
    // 列表页不携带标签：站点把标签放在 /wallpaper/tags/{id} 的按需接口里，
    // 每条都取意味着每页多 24 个请求。真实标签在打开详情弹窗时由 detail() 补齐。
    tags: [],
    width,
    height,
    aspectRatio: width / height,
    fileExt,
    fileDownloadName: `wallhaven-${id}`,
    rating,
    score: 0,
  } as any
}

export async function fetchWallhavenPosts(page: number, tags: string | null) {
  const resp = await fetch(listUrl(page, tags))
  if (!resp.ok) return []
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')

  return [...doc.querySelectorAll('#thumbs figure[data-wallpaper-id]')]
    .map(parseCard)
    .filter(Boolean)
}

/**
 * 只在打开详情弹窗时调用一次，补真实标签。
 *
 * 列表阶段不取标签是刻意的：站点标签要走 `/wallpaper/tags/{id}`，每页 24 条
 * 就是 24 个额外请求，只为填充悬浮框里的标签条并不划算。
 */
async function fetchWallhavenDetail(id: string): Promise<MultiImageDetail> {
  const resp = await fetch(`${ORIGIN}/w/${id}`)
  if (!resp.ok) return {}
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')

  const tags = [...doc.querySelectorAll('#tags li a.tagname')]
    .map(a => (a.textContent || '').trim())
    .filter(Boolean)

  // 详情页的 src 是权威原图地址，比列表里拼出来的更可靠（万一扩展名判断失误）
  const img = doc.querySelector<HTMLImageElement>('#wallpaper')
  const fileUrl = img?.getAttribute('src') || null

  return { tags, fileUrl, sampleUrl: fileUrl }
}

export const wallhaven = {
  is: isWallhavenList,
  posts: fetchWallhavenPosts,
  detail: fetchWallhavenDetail,
}
