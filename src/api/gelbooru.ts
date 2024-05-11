import { getImageSize, showMsg } from '@/utils'
import i18n from '@/utils/i18n'

export function isGelbooruFavPage() {
  return /gelbooru\.com\/index\.php\?page\=favorites\&s\=view/.test(location.href)
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
