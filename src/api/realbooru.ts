import { getImageSize } from '@/utils'

export function isRealbooruPage() {
  return location.hostname == 'realbooru.com'
}

export async function fetchRealbooruPosts(page: number, tags: string | null) {
  const url = new URL('https://realbooru.com/index.php')
  url.searchParams.set('page', 'post')
  url.searchParams.set('s', 'list')
  url.searchParams.set('pid', `${(page - 1) * 42}`)
  tags && url.searchParams.set('tags', tags)
  const htmlResp = await fetch(url.href)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('.content .thumb')].map(async el => {
    const a = el.querySelector('a')
    const img = el.querySelector('img')
    const id = a!.getAttribute('id')?.slice(1)

    const previewUrl = img!.src
    const { width, height } = await getImageSize(previewUrl)
    const tags = img!.title.split(/,\s+/).filter(Boolean)
    const isGif = tags.includes('gif')
    const isVideo = img?.style.border.includes('rgb(0, 0, 255)') || img?.style.border.includes('#0000ff')
    const replaceSampleExt = isGif ? '$1images$2$3.gif' : isVideo ? '$1images$2$3.webm' : '$1samples$2sample_$3.jpg'
    const replaceFileExt = isGif ? '$1images$2$3.gif' : isVideo ? '$1images$2$3.mp4' : '$1images$2$3.jpeg'

    return {
      id,
      postView: a!.href,
      previewUrl,
      sampleUrl: previewUrl.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg$/i, replaceSampleExt),
      fileUrl: previewUrl.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, replaceFileExt),
      tags,
      width: Number(width) * 10,
      height: Number(height) * 10,
      aspectRatio: Number(width) / Number(height),
      fileExt: isGif ? 'gif' : isVideo ? 'mp4' : 'jpg',
      fileDownloadName: `realbooru_${id}`,
      rating: 'e',
    } as any
  })
  return Promise.all(results)
}

export const realbooru = {
  is: isRealbooruPage,
  posts: fetchRealbooruPosts,
}
