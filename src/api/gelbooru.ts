import store from '@/store'
import { getImageSize, showMsg } from '@/utils'
import i18n from '@/utils/i18n'

export function isGelbooruFavPage() {
  return /gelbooru\.com\/index\.php\?page\=favorites\&s\=view/.test(location.href)
}

export function isGelbooruPage() {
  return /gelbooru\.com\/index\.php\?page\=post\&s\=list/.test(location.href) && !store.settings.credentialQuery
}

export async function fetchGelbooruPosts(page: number) {
  const url = new URL(location.href)
  url.searchParams.set('pid', `${(page - 1) * 42}`)
  const htmlResp = await fetch(url.href)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('.thumbnail-container .thumbnail-preview')].map(async el => {
    const img = el.querySelector('img')
    const imgSrc = img?.src || ''
    const postView = el.querySelector('a')?.href
    const id = postView?.match(/id=(\d+)/)?.[1]
    const { width, height } = await getImageSize(imgSrc)
    const tags = img?.title.split(/\s+/).filter(Boolean)
    const isGif = ['animated_gif', 'gif'].some(e => tags?.includes(e))
    const isVideo = ['mp4', 'video'].some(e => tags?.includes(e))
    let rating = img?.title?.match(/rating:(\w)\w+/)?.[1]
    if (rating == 'g') rating = 's'

    return {
      id,
      postView,
      previewUrl: imgSrc,
      sampleUrl: isVideo
        ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.mp4')
        : isGif
          ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.gif')
          : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)/i, '$1samples$2sample_$3'),
      fileUrl: isVideo
        ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.webm')
        : isGif
          ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.gif')
          : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.jpg'),
      tags,
      width: width * 10,
      height: height * 10,
      aspectRatio: width / height,
      fileExt: isVideo ? 'webm' : isGif ? 'gif' : 'jpg',
      fileDownloadName: `gelbooru_${id}`,
      rating: rating || '',
    } as any
  })
  return Promise.all(results)
}

export async function fetchGelbooruFavorites(page: number) {
  const url = new URL(location.href)
  url.searchParams.set('pid', `${(page - 1) * 50}`)
  const htmlResp = await fetch(url.href)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('.thumb')].map(async el => {
    const img = el.querySelector('img')
    const imgSrc = img?.src || ''
    const postView = el.querySelector('a')?.href
    const id = postView?.match(/id=(\d+)/)?.[1]
    const { width, height } = await getImageSize(imgSrc)
    const tags = img?.title.split(/\s+/).filter(Boolean)
    const isGif = ['animated_gif', 'gif'].some(e => tags?.includes(e))
    const isVideo = ['mp4', 'video'].some(e => tags?.includes(e))
    let rating = img?.title?.match(/rating:(\w)\w+/)?.[1]
    if (rating == 'g') rating = 's'

    return {
      id,
      postView,
      previewUrl: imgSrc,
      sampleUrl: isVideo
        ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.mp4')
        : isGif
          ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.gif')
          : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)/i, '$1samples$2sample_$3'),
      fileUrl: isVideo
        ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.webm')
        : isGif
          ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.gif')
          : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.jpg'),
      tags,
      width: width * 10,
      height: height * 10,
      aspectRatio: width / height,
      fileExt: isVideo ? 'webm' : isGif ? 'gif' : 'jpg',
      fileDownloadName: `gelbooru_${id}`,
      rating: rating || '',
    } as any
  })
  return Promise.all(results)
}

export async function addFavoriteGelbooru(id: string) {
  const response = await fetch(`https://gelbooru.com/public/addfav.php?id=${id}`)
  if (!response.ok) {
    showMsg({ msg: `${i18n.t('MWVfUiW8egLWq7MgV-wzc')}: ${response.status}`, type: 'error' })
    return false
  }
  const result = await response.text()
  if (result == '3') {
    showMsg({ msg: i18n.t('ctWGhVvqB2k_1TX2iY0l2').toString() })
    return true
  } else {
    showMsg({ msg: `${i18n.t('MWVfUiW8egLWq7MgV-wzc')}: ${result}`, type: 'error' })
    return false
  }
}
