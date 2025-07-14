import { addPostToFavorites as addFavoriteMoebooru } from './moebooru'
import { addFavoriteDanbooru } from './danbooru'
import { addFavoriteGelbooru } from './gelbooru'
import { addFavoriteRule34 } from './rule34'

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
