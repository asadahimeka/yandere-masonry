const ORIGIN = 'https://chan.sankakucomplex.com'

export function isSankakuComplexPage() {
  return location.hostname == 'chan.sankakucomplex.com'
}

const state: {
  base: string
  nextUrl?: string | null
  nextPage: number
} = {
  base: `${ORIGIN}/cn/posts?auto_page=t`,
  nextUrl: null,
  nextPage: 0,
}
const ratingMap: Record<string, string> = {
  'G': 's',
  'R15+': 'q',
  'R18+': 'e',
}

// 站点已改为 Turbo 渲染，列表内容放在 turbo-stream 的 <template> 里。
// template 的内容不属于文档树，querySelectorAll 查不到，需要单独下钻。
function queryAllDeep(root: ParentNode, selector: string) {
  const found = [...root.querySelectorAll(selector)] as Element[]
  for (const template of [...root.querySelectorAll('template')]) {
    found.push(...queryAllDeep(template.content, selector))
  }
  return found
}

function resolveUrl(url?: string | null) {
  if (!url) return ''
  try {
    return new URL(url, ORIGIN).href
  } catch {
    return url
  }
}

// 翻页改为 turbo-frame 的 src，旧版的 div[next-page-url] 作为兜底保留
function getNextPageUrl(doc: Document) {
  const frame = queryAllDeep(doc, 'turbo-frame[src]')
    .find(e => (e.getAttribute('src') || '').includes('auto_page=t'))
  const src = frame?.getAttribute('src')
  if (src) return src
  return doc.querySelector<HTMLElement>('body > div[next-page-url]')?.getAttribute('next-page-url') || null
}

export async function fetchSankakuComplexPosts(page: number, tags: string | null) {
  const w = unsafeWindow as any
  if (w.$) w.$.ajax = () => {}
  if (w.jQuery) w.jQuery.ajax = () => {}
  if (page == 1) {
    state.nextUrl = null
    state.nextPage = 0
    document.documentElement.scrollTop = 0
  }
  // 只有逐页下拉时才沿用站点的 next 游标，跳页则从首页地址重新算
  const useNext = !!state.nextUrl && state.nextPage == page
  const url = new URL(useNext ? resolveUrl(state.nextUrl) : state.base)
  url.searchParams.set('auto_page', 't')
  url.searchParams.set('page', `${page}`)
  if (tags && !url.searchParams.has('tags')) url.searchParams.set('tags', tags)
  const htmlResp = await fetch(url.href)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  state.nextUrl = getNextPageUrl(doc)
  state.nextPage = state.nextUrl
    ? Number(new URL(resolveUrl(state.nextUrl), ORIGIN).searchParams.get('page')) || page + 1
    : 0
  const seen = new Set<string>()
  const results = queryAllDeep(doc, '.post-preview').filter(el => {
    const id = el.getAttribute('data-id')
    if (!id || seen.has(id)) return false
    seen.add(id)
    return true
  }).map(el => {
    const id = el.getAttribute('data-id')
    const img = el.querySelector('img')
    const tagsText = img?.getAttribute('data-auto_page') || ''
    const tagsArr = tagsText.split(/\s/) || []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, width, height] = tagsText.match(/Size:(\d+)x(\d+)/) || []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, ratingText] = tagsText.match(/Rating:(\S+)/) || []
    return {
      id,
      postView: resolveUrl(el.querySelector('a')?.getAttribute('href')),
      previewUrl: resolveUrl(img?.getAttribute('src')),
      fileUrl: '',
      tags: tagsArr,
      width: Number(width),
      height: Number(height),
      aspectRatio: Number(width) / Number(height),
      fileExt: el.querySelector('.animated_details') ? 'mp4' : 'jpg',
      fileDownloadName: `sankaku-complex ${id} ${tagsArr.join(' ')}`,
      fileDownloadText: `${width}×${height}`,
      rating: ratingMap[ratingText] || ratingText,
    } as any
  })
  return results
}

export async function getSankakuComplexDetail(id: string) {
  const url = new URL(`${ORIGIN}/cn/posts/${id}`)
  const htmlResp = await fetch(url.href)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const imgSrc = doc.querySelector<HTMLImageElement>('#post-content img')?.src
  const fileUrl = doc.querySelector<HTMLAnchorElement>('#post-content a')?.href
  const videoSrc = doc.querySelector<HTMLMediaElement>('#post-content video')?.src
  const result = {
    sampleUrl: imgSrc,
    fileUrl: fileUrl || imgSrc || videoSrc,
  }
  // 详情页同样是 Turbo 渲染，旧结构取不到时退回官方 API
  if (result.sampleUrl || result.fileUrl) return result
  const resp = await fetch(`https://sankakuapi.com/posts/${id}/fu?lang=${navigator.language || 'zh-CN'}`, {
    headers: {
      'api-version': '2',
      'client-type': 'non-premium',
      'platform': 'web-app',
      'priority': 'u=1, i',
    },
  })
  const json = await resp.json()
  return {
    sampleUrl: json?.data?.sample_url,
    fileUrl: json?.data?.file_url || json?.data?.fallback_url,
  }
}
