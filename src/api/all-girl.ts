import { getImageSize } from '@/utils'

export function isAllGirlPage() {
  return location.hostname == 'allgirl.booru.org'
}

export async function fetchAllGirlPosts(page: number, tags: string | null) {
  const url = new URL('https://allgirl.booru.org/index.php')
  url.searchParams.set('page', 'post')
  url.searchParams.set('s', 'list')
  url.searchParams.set('pid', `${(page - 1) * 20}`)
  tags && url.searchParams.set('tags', tags)
  const htmlResp = await fetch(url.href)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('.content .thumb')].map(async el => {
    const a = el.querySelector('a')
    const img = el.querySelector('img')
    const id = a!.getAttribute('id')?.slice(1)

    const previewUrl = img!.src
    const { width, height } = await getImageSize(previewUrl)
    const tags = img!.title.split(/\s/).filter(Boolean)

    return {
      id,
      postView: a!.href,
      previewUrl,
      fileUrl: '',
      tags,
      width: Number(width),
      height: Number(height),
      aspectRatio: Number(width) / Number(height),
      fileExt: 'jpg',
      fileDownloadName: `allgirl ${id} ${tags.join(' ')}`,
      rating: img!.title.includes('rating:Safe') ? 's' : 'e',
    } as any
  })
  return Promise.all(results)
}

export async function getAllGirlDetail(id: string) {
  const resp = await fetch(`https://allgirl.booru.org/index.php?page=post&s=view&id=${id}`)
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')
  return {
    fileUrl: doc.querySelector<HTMLImageElement>('#image')?.src,
  }
}

export const allgirl = {
  is: isAllGirlPage,
  posts: fetchAllGirlPosts,
  detail: getAllGirlDetail,
}
