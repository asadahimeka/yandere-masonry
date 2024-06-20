import { parse } from 'date-fns'

export function isEshuushuuPage() {
  return location.hostname == 'e-shuushuu.net'
}

export async function fetchEshuushuuPosts(page: number) {
  const url = new URL('https://e-shuushuu.net')
  url.searchParams.set('page', page.toString())
  const htmlResp = await fetch(url.href)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('#content .image_thread')].map(el => {
    const id = el.getAttribute('id')?.slice(1)
    const fileUrl = el.querySelector<HTMLAnchorElement>('.thumb_image')?.href
    const fileExt = fileUrl?.split('.').pop()
    const tags = [...el.querySelectorAll<HTMLElement>('.quicktag')]
      .map(e => e.innerText.replace(/[\t\n]/g, '')).join('').split('"').filter(e => e.trim()).map(e => e.replace(/\s/g, '_'))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, width, height] = el.querySelector<HTMLElement>('.meta dl dd:nth-child(8)')?.innerText.match(/(\d+)x(\d+)/) || []
    const date = el.querySelector<HTMLElement>('.meta dl dd:nth-child(4)')?.innerText
    return {
      id,
      postView: el.querySelector<HTMLAnchorElement>('.title a')?.href,
      previewUrl: el.querySelector<HTMLImageElement>('.thumb_image img')?.src,
      fileUrl,
      tags,
      width: Number(width),
      height: Number(height),
      aspectRatio: Number(width) / Number(height),
      fileExt,
      fileDownloadName: `e-shuushuu ${id} ${tags.join(' ')}.${fileExt}`,
      fileDownloadText: `${width}×${height} [${el.querySelector<HTMLElement>('.meta dl dd:nth-child(6)')?.innerText.replace(/[\t\n]/g, '')}] ${fileExt?.toUpperCase()}`,
      rating: '',
      createdAt: date && parse(date, 'MMMM do, yyyy h:mm a', new Date()),
    } as any
  })
  return results
}
