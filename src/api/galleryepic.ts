import type { Post } from '@himeka/booru'
import type { MultiImageAdapter, MultiImageDetail, PostImage } from './multi-image'

const ORIGIN = 'https://galleryepic.com'
const IMAGE_ORIGIN = 'https://static.galleryepic.xyz/image'

/**
 * 图床没有尺寸档位（`?w=`/`?size=` 全部被忽略，也没有 `/original`），
 * 拿到的就是长边 800~1200 的衍生图；页面里统一用 `aspect-3/4` 呈现，
 * 这里按竖构图 800×1200 声明比例，横图由 `object-fit` 裁切。
 */
const IMAGE_WIDTH = 800
const IMAGE_HEIGHT = 1200

export function isGalleryEpic() {
  return /(^|\.)galleryepic\.com$/.test(location.hostname)
}

/**
 * 站点是 Next.js App Router，列表是**路径分页**：`/zh` 等于第 1 页，
 * `/zh/cosplays/{page}` 是后续页（`?page=` 无效）。
 *
 * 只接管中文列表：`/zh/cosplay/{id}`（详情）、`/zh/coser/*`、`/zh/parody/*`、
 * `/zh/albums/*` 以及 `/en` 等其他语言版本一律留给站点自己 ——
 * 这站的其他语言页面链接形态不同，接管过来只会得到空列表。
 */
const LIST_PATH_RE = /^\/zh(?:\/cosplays\/(\d+))?\/?$/

export function isGalleryEpicList() {
  return isGalleryEpic() && LIST_PATH_RE.test(location.pathname)
}

function listUrl(page: number) {
  return `${ORIGIN}/zh/cosplays/${page}`
}

function imageUrl(uuid: string) {
  return `${IMAGE_ORIGIN}/${uuid}`
}

/**
 * 从 RSC flight 载荷里取出 `"cosplay":{...}` 对象。
 *
 * 这站没有 `__NEXT_DATA__`，数据在 `<script>self.__next_f.push([1,"..."])</script>`
 * 里，每个 chunk 的第二个元素都是合法的 JSON 字符串字面量，`JSON.parse` 后拼接即可。
 * 拼接结果不是合法 JSON（含 `$undefined` / `$L44` 之类的引用标记），
 * 因此只按 `"cosplay":{` 定位并做括号配平，把单个对象切出来再解析。
 */
function flightText(html: string) {
  const parts: string[] = []
  const re = /<script>self\.__next_f\.push\(([\s\S]*?)\)<\/script>/g
  for (let match = re.exec(html); match; match = re.exec(html)) {
    try {
      const args = JSON.parse(match[1]) as unknown[]
      if (typeof args[1] === 'string') parts.push(args[1])
    } catch {
      // 个别 chunk 里是 `$undefined` 之类的非 JSON 引用，跳过即可
    }
  }
  return parts.join('')
}

/** 按 `"key":{` 定位并配平括号，返回第一个 `images` 非空的对象 */
function flightObjects(text: string, key: string) {
  const objects: any[] = []
  const needle = `"${key}":{`
  let from = 0
  for (;;) {
    const at = text.indexOf(needle, from)
    if (at < 0) return objects
    const start = at + needle.length - 1
    let depth = 0
    let inString = false
    let escaped = false
    let end = -1
    for (let i = start; i < text.length; i++) {
      const ch = text[i]
      if (inString) {
        if (escaped) escaped = false
        else if (ch === '\\') escaped = true
        else if (ch === '"') inString = false
        continue
      }
      if (ch === '"') inString = true
      else if (ch === '{') depth++
      else if (ch === '}' && --depth === 0) {
        end = i + 1
        break
      }
    }
    if (end < 0) return objects
    try {
      objects.push(JSON.parse(text.slice(start, end)))
    } catch {
      // 单个对象解析失败不影响后面的对象
    }
    from = end
  }
}

interface Cosplay {
  id: number
  cover?: string | null
  photo?: number | null
  selfie?: number | null
  video?: number | null
  gif?: number | null
  images?: string[]
  charactersAndCosers?: {
    coser?: { name?: string } | null
    character?: { character?: string; parody?: { parody?: string } | null } | null
  }[]
}

function names(cosplay: Cosplay) {
  const cosers = new Set<string>()
  const characters = new Set<string>()
  const parodies = new Set<string>()
  for (const item of cosplay.charactersAndCosers ?? []) {
    const coser = item.coser?.name?.trim()
    const character = item.character?.character?.trim()
    const parody = item.character?.parody?.parody?.trim()
    if (coser) cosers.add(coser)
    if (character) characters.add(character)
    if (parody) parodies.add(parody)
  }
  return { cosers: [...cosers], characters: [...characters], parodies: [...parodies] }
}

/** 卡片角标形如 `39P / 27S`：P 是正片、S 是自拍，两者都在 `images` 里 */
function parseCount(text: string) {
  const photo = Number(/(\d+)\s*P/.exec(text)?.[1] ?? 0)
  const selfie = Number(/(\d+)\s*S/.exec(text)?.[1] ?? 0)
  return photo + selfie
}

function parseCards(doc: Document): Post[] {
  return [...doc.querySelectorAll<HTMLAnchorElement>('a.space-y-3[href*="/zh/cosplay/"]')].flatMap(link => {
    const id = link.getAttribute('href')?.match(/\/zh\/cosplay\/(\d+)/)?.[1]
    const uuid = link.querySelector<HTMLImageElement>('img[src*="/image/"]')
      ?.getAttribute('src')?.split('/image/')[1]
    if (!id || !uuid) return []

    const container = link.parentElement
    const coser = container?.querySelector('a[href*="/zh/coser/"] h3')?.textContent?.trim() ?? ''
    const character = link.querySelector('h3')?.textContent?.trim() ?? ''
    const parody = link.querySelector('p.text-xs')?.textContent?.trim() ?? ''
    const mediaCount = parseCount(link.querySelector('p.absolute')?.textContent ?? '')
    const title = [coser && `${coser} cosplay`, character, parody && `(${parody})`].filter(Boolean).join(' ')

    return [{
      id,
      postView: `${ORIGIN}/zh/cosplay/${id}`,
      previewUrl: imageUrl(uuid),
      // 原图地址只在详情页的 flight 里（同一张 cover 也在 images 里），列表阶段留空由 detail() 补齐
      fileUrl: '',
      tags: [],
      rating: 'e',
      mediaCount,
      // Vue 2 不追踪观察后新增的属性，多图字段必须在列表阶段就存在
      images: [],
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      aspectRatio: IMAGE_WIDTH / IMAGE_HEIGHT,
      createdAt: null,
      title,
      fileExt: 'jpg',
      // 末尾不能是 `.数字` 形式，否则 downloadFile 的 /\.\w+$/ 会误判为已有扩展名
      fileDownloadName: `galleryepic ${id} ${character || coser}`.slice(0, 90),
      fileDownloadText: '[jpg]',
    } as any]
  })
}

async function fetchPosts(page: number): Promise<Post[]> {
  const resp = await fetch(listUrl(page))
  if (!resp.ok) return []
  return parseCards(new DOMParser().parseFromString(await resp.text(), 'text/html'))
}

/* ---------------------------------- 详情页 --------------------------------- */

let detailCache: { id: string; data: MultiImageDetail } | null = null

async function fetchDetail(id: string): Promise<MultiImageDetail> {
  if (detailCache?.id === id) return detailCache.data

  const resp = await fetch(`${ORIGIN}/zh/cosplay/${id}`)
  if (!resp.ok) return {}

  const cosplay = flightObjects(flightText(await resp.text()), 'cosplay')
    .find(item => Array.isArray(item.images) && item.images.length) as Cosplay | undefined
  if (!cosplay) return {}

  const images: PostImage[] = cosplay.images!.map(uuid => ({
    fileUrl: imageUrl(uuid),
    previewUrl: imageUrl(uuid),
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  }))

  const { cosers, characters, parodies } = names(cosplay)
  const title = [cosers[0] && `${cosers[0]} cosplay`, characters[0], parodies[0] && `(${parodies[0]})`]
    .filter(Boolean)
    .join(' ')

  const data: MultiImageDetail = {
    fileUrl: images[0]?.fileUrl ?? null,
    // 站点没有标签体系，只把 coser / 角色 / 作品名当标签展示（tagSearch 已关，点了不会跳）
    tags: [...cosers, ...characters, ...parodies],
    source: `${ORIGIN}/zh/cosplay/${id}`,
    images,
    title,
  }

  detailCache = { id, data }
  return data
}

/* --------------------------------- 适配器导出 -------------------------------- */

export const galleryepic: MultiImageAdapter = {
  is: isGalleryEpicList,
  posts: fetchPosts,
  detail: fetchDetail,
}
