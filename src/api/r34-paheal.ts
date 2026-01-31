import { parse } from 'date-fns'

export function isR34PahealPage() {
  return location.hostname == 'rule34.paheal.net' && location.pathname != '/'
}

export function isR34PahealHome() {
  return location.hostname == 'rule34.paheal.net' && location.pathname == '/'
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
    const fileExt = el.getAttribute('data-ext')
    const tags = el.getAttribute('data-tags')?.split(/\s/).filter(Boolean) || []
    const img = el.querySelector('img')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, width, height] = img?.title.match(/\s+(\d+)x(\d+)[,\s]+/) || []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, size] = img?.title.match(/\s+\d+x\d+\s+\/\/\s+([\w\.]+)/) || []
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
      fileDownloadName: `Rule34.Paheal ${id} ${tags.join(' ')}.${fileExt}`,
      fileDownloadText: `${width}×${height} [${size}] ${fileExt?.toUpperCase()}`,
      rating: 'e',
      createdAt: date && parse(`${date} +00`, 'MMMM do, yyyy; HH:mm x', new Date()),
    } as any
  })
  return results
}

export const r34paheal = {
  is: isR34PahealPage,
  posts: fetchR34PahealPosts,
}
