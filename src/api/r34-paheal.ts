import { parse } from 'date-fns'

export function isR34PahealPage() {
  return location.hostname == 'rule34.paheal.net' && location.pathname != '/'
}

export function isR34PahealHome() {
  return location.hostname == 'rule34.paheal.net' && location.pathname == '/'
}

const MIME_EXT_MAP: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
}

// 站点缩略图不再提供 data-ext，只能从 data-mime 或 img title 的 "WxH // size // ext" 段推断
function resolveFileExt(el: Element, title?: string) {
  const mime = el.getAttribute('data-mime')?.toLowerCase()
  const fromMime = mime ? MIME_EXT_MAP[mime] : undefined
  if (fromMime) {
    return fromMime
  }
  const fromTitle = title?.match(/\s+\d+x\d+(?:,\s*[\d.]+s)?\s+\/\/\s+[\w.]+\s+\/\/\s+([\w]+)/)?.[1]
  return fromTitle ? fromTitle.toLowerCase() : ''
}

// 站点标题里的时间戳为 ISO 格式，老格式（"MMMM do, yyyy; HH:mm"）仅作兜底
function parseCreatedAt(raw: string) {
  const iso = new Date(raw)
  if (!Number.isNaN(iso.getTime())) {
    return iso
  }
  return parse(`${raw} +00`, 'MMMM do, yyyy; HH:mm x', new Date())
}

export async function fetchR34PahealPosts(page: number, tags: string | null) {
  document.onclick = function () {}
  document.onmouseup = function () {}
  ;(document as any).onclick_copy = function () {}
  ;(unsafeWindow as any).show_pop = function () {}
  ;(unsafeWindow as any).open = function (url: string) {
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.rel = 'noreferrer'
    a.click()
  }
  const url = `https://rule34.paheal.net/post/list${tags ? `/${tags}` : ''}/${page}`
  const htmlResp = await fetch(url)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('.shm-image-list .shm-thumb.thumb')].map(el => {
    const id = el.getAttribute('data-post-id')
    const tags = el.getAttribute('data-tags')?.split(/\s/).filter(Boolean) || []
    const img = el.querySelector('img')
    const fileExt = resolveFileExt(el, img?.title)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, width, height] = img?.title.match(/\s+(\d+)x(\d+)[,\s]+/) || []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, size] = img?.title.match(/\s+\d+x\d+(?:,\s*[\d.]+s)?\s+\/\/\s+([\w\.]+)/) || []
    const date = img?.title.split('\n').pop()

    return {
      id,
      postView: el.querySelector<HTMLAnchorElement>('.shm-thumb-link')?.href,
      previewUrl: img?.src,
      fileUrl: el.querySelector<HTMLAnchorElement>('.shm-thumb-link + br + a')?.href,
      tags,
      width: Number(width),
      height: Number(height),
      aspectRatio: Number(width) / Number(height),
      fileExt,
      fileDownloadName: `Rule34.Paheal ${id} ${tags.join(' ')}${fileExt ? `.${fileExt}` : ''}`,
      fileDownloadText: `${width}×${height} [${size}] ${fileExt?.toUpperCase()}`,
      rating: 'e',
      createdAt: date ? parseCreatedAt(date) : undefined,
    } as any
  })
  return results
}

export const r34paheal = {
  is: isR34PahealPage,
  posts: fetchR34PahealPosts,
}
