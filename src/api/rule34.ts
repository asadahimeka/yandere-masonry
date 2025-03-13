import { getImageSize, showMsg } from '@/utils'
import i18n from '@/utils/i18n'

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
    const id = postView?.match(/id=(\d+)/)?.[1]
    const { width, height } = await getImageSize(imgSrc)
    const tags = img?.title.split(/\s+/).filter(Boolean)
    const isVideo = /mp4|animated|video/i.test(img?.title || '')
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
  return Promise.all(results)
}

export async function addFavoriteRule34(id: string) {
  const response = await fetch(`https://rule34.xxx/public/addfav.php?id=${id}`)
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
