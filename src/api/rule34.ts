import store from '@/store'
import { getImageSize, showMsg } from '@/utils'
import i18n from '@/utils/i18n'

export function isRule34FavPage() {
  return /rule34\.xxx\/index\.php\?page\=favorites\&s\=view/.test(location.href)
}

export function isRule34Firefox() {
  return location.hostname == 'rule34.xxx' && (navigator.userAgent.includes('Firefox') || !store.settings.credentialQuery)
}

export async function fetchRule34Posts(page: number, tags: string | null) {
  const url = new URL('https://rule34.xxx/index.php')
  url.searchParams.set('page', 'post')
  url.searchParams.set('s', 'list')
  url.searchParams.set('pid', `${(page - 1) * 42}`)
  tags && url.searchParams.set('tags', tags)
  const htmlResp = await fetch(url.href, { credentials: 'include' })
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('#content .image-list .thumb')].map(async el => {
    const id = el.id
    const img = el.querySelector('img')
    const imgSrc = img?.src || ''
    const postView = el.querySelector('a')?.href
    const { width, height } = await getImageSize(imgSrc)
    const tags = img?.title.split(/\s+/).filter(Boolean)
    const isVideo = ['mp4', 'video'].some(e => tags?.includes(e))
    const videoUrl = imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.mp4').replace('https://wimg.', 'https://ahri2mp4.')

    if (el.querySelector('.blacklist-img')) {
      return null
    }

    return {
      id,
      postView,
      previewUrl: imgSrc,
      sampleUrl: isVideo ? videoUrl : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)/i, '$1samples$2sample_$3'),
      fileUrl: isVideo ? videoUrl : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.jpeg'),
      tags,
      width: width * 10,
      height: height * 10,
      aspectRatio: width / height,
      fileExt: isVideo ? 'mp4' : 'jpg',
      fileDownloadName: `rule34_xxx_${id}`,
      rating: '',
    } as any
  })
  const posts = await Promise.all(results)
  return posts.filter(Boolean)
}

export async function fetchRule34Favorites(page: number) {
  const url = new URL(location.href)
  url.searchParams.set('pid', `${(page - 1) * 50}`)
  const htmlResp = await fetch(url.href)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('#content .image-list .thumb')].map(async el => {
    const img = el.querySelector('img')
    const imgSrc = img?.src || ''
    const postView = el.querySelector('a')?.href
    const id = postView?.match(/id=(\d+)/)?.[1]
    const { width, height } = await getImageSize(imgSrc)
    const tags = img?.title.split(/\s+/).filter(Boolean)
    const isVideo = ['mp4', 'animated', 'video'].some(e => tags?.includes(e))
    const videoUrl = imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.mp4').replace('https://wimg.', 'https://ahri2mp4.')

    return {
      id,
      postView,
      previewUrl: imgSrc,
      sampleUrl: isVideo ? videoUrl : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)/i, '$1samples$2sample_$3'),
      fileUrl: isVideo ? videoUrl : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, '$1images$2$3.jpeg'),
      tags,
      width: width * 10,
      height: height * 10,
      aspectRatio: width / height,
      fileExt: isVideo ? 'mp4' : 'jpg',
      fileDownloadName: `rule34_xxx_${id}`,
      rating: '',
    } as any
  })
  const list = await Promise.all(results)
  // @ts-expect-error __isR34Fav
  list.__isR34Fav = true
  return list
}

export async function addFavoriteRule34(id: string) {
  const _id = id.match(/(\d+)/)?.[1] || id
  const response = await fetch(`https://rule34.xxx/public/addfav.php?id=${_id}`)
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
