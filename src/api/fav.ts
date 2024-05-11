import { addPostToFavorites as addFavoriteMoebooru } from './moebooru'
import { addFavoriteRule34 } from './rule34'
import { addFavoriteGelbooru } from './gelbooru'
import { showMsg } from '@/utils'
import i18n from '@/utils/i18n'

export async function addFavoriteDanbooru(id: string) {
  const response = await fetch(`https://danbooru.donmai.us/favorites?post_id=${id}`, {
    method: 'POST',
    headers: { 'x-csrf-token': sessionStorage.getItem('csrf-token') ?? '' },
  })
  if (!response.ok) {
    showMsg({ msg: `${i18n.t('MWVfUiW8egLWq7MgV-wzc')}: ${response.status}`, type: 'error' })
    return false
  }
  const result = await response.text()
  if (result.includes('You have favorited this post')) {
    showMsg({ msg: i18n.t('ctWGhVvqB2k_1TX2iY0l2').toString() })
    return true
  } else {
    showMsg({ msg: `${i18n.t('MWVfUiW8egLWq7MgV-wzc')}: ${result}`, type: 'error' })
    return false
  }
}

const favActions: Record<string, (id: string) => Promise<boolean>> = {
  'yande.re': addFavoriteMoebooru,
  'konachan.com': addFavoriteMoebooru,
  'konachan.net': addFavoriteMoebooru,
  'danbooru.donmai.us': addFavoriteDanbooru,
  'gelbooru.com': addFavoriteGelbooru,
  'rule34.xxx': addFavoriteRule34,
}

export const isFavBtnShow = Object.keys(favActions).includes(location.hostname)
export const addPostToFavorites = favActions[location.hostname] || (() => {})
