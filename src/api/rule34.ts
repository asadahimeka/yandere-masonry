export function isRule34FavPage() {
  return /rule34\.xxx\/index\.php\?page\=favorites\&s\=view/.test(location.href)
}

export async function fetchRule34Favorites(page: number) {
  const url = new URL(location.href)
  url.searchParams.set('pid', `${(page - 1) * 50}`)
  const htmlResp = await fetch(url.href)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('#content .thumb')].map(async el => {
    const img = el.querySelector('img')
    const imgSrc = img?.src || ''
    const postView = el.querySelector('a')?.href
    const { width, height } = await getImageSize(imgSrc)
    return {
      id: postView?.match(/id=(\d+)/)?.[1],
      postView,
      previewUrl: imgSrc,
      sampleUrl: imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)/i, '$1samples$2sample_$3'),
      fileUrl: imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.jpeg'),
      tags: img?.title.split(/\s+/),
      width,
      height,
      aspectRatio: width / height,
      fileExt: 'jpg',
      rating: '',
    } as any
  })
  return Promise.all(results)
}

function getImageSize(url: string) {
  return new Promise<{ width: number; height: number }>(resolve => {
    if (!url) {
      resolve({ width: 0, height: 0 })
      return
    }
    const image = new Image()
    image.onload = () => { resolve({ width: image.width, height: image.height }) }
    image.onerror = () => { resolve({ width: 0, height: 0 }) }
    image.src = url
  })
}
