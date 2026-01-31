import { getImageSize } from '@/utils'

export function isKusowankaPage() {
  return location.hostname == 'kusowanka.com'
}

export async function fetchKusowankaPosts(page: number, tags: string | null) {
  const url = new URL(`https://kusowanka.com${tags ? `/tag/${tags}/` : ''}`)
  url.searchParams.set('page', `${page}`)
  const htmlResp = await fetch(url.href)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('.box_thumbs .box_thumb')].map(async el => {
    const a = el.querySelector('a')
    const img = el.querySelector<HTMLElement>('[data-bg]')
    const id = a!.href.match(/(\d+)/)?.[1]

    const previewUrl = img!.getAttribute('data-bg')
    const { width, height } = await getImageSize(previewUrl!)

    return {
      id,
      postView: a!.href,
      previewUrl,
      fileUrl: '',
      tags: [],
      width: Number(width),
      height: Number(height),
      aspectRatio: Number(width) / Number(height),
      fileExt: 'jpg',
      fileDownloadName: `kusowanka_${id}`,
      rating: '',
    } as any
  })
  return Promise.all(results)
}

export async function getKusowankaDetail(id: string) {
  const resp = await fetch(`https://kusowanka.com/post/${id}/`)
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')
  return {
    fileUrl: doc.querySelector<HTMLImageElement>('.post_image img')?.getAttribute('data-src'),
    tags: [
      ...[...doc.querySelectorAll<HTMLElement>('.parodies_list a')].map(e => e.innerText),
      ...[...doc.querySelectorAll<HTMLElement>('.characters_list a')].map(e => e.innerText),
      ...[...doc.querySelectorAll<HTMLElement>('.artists_list a')].map(e => e.innerText),
      ...[...doc.querySelectorAll<HTMLElement>('.metadatas_list a')].map(e => e.innerText),
      ...[...doc.querySelectorAll<HTMLElement>('.tags_list a')].map(e => e.innerText),
    ],
  }
}

export const kusowanka = {
  is: isKusowankaPage,
  posts: fetchKusowankaPosts,
  detail: getKusowankaDetail,
}
