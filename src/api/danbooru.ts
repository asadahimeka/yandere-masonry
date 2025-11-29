import type { Post } from '@himeka/booru'
import { showMsg } from '@/utils'
import i18n from '@/utils/i18n'

export function isDanbooruPage() {
  return location.hostname == 'danbooru.donmai.us'
}

const isCNLang = i18n.locale.includes('zh')
const tagSortOrder = ['artist', 'copyright', 'character', 'general']
export function getDanbooruTagDetail(image: Post) {
// @ts-expect-error data protected
  const { data, tags } = image
  const tagMap: Record<string, [any, string, string[]]> = {
    artist: [i18n.t('Ym0HIEu9Q80qXB31LuC6c'), '#FB8C00', data.tag_string_artist.split(/\s+/)],
    copyright: [i18n.t('juT6gwLOg5r1h2vFpFf6P'), '#AB47BC', data.tag_string_copyright.split(/\s+/)],
    character: [i18n.t('aonlPAu9kEkkwNvQg0DBk'), '#66BB6A', data.tag_string_character.split(/\s+/)],
  }
  return {
    voted: false,
    tags: tags.map(tag => {
      const tagCN = isCNLang && window.__tagsCN?.[tag.replace(/_/g, ' ')]
      const typedTag = { type: '', text: '', color: '' }
      for (const [key, val] of Object.entries(tagMap)) {
        if (val[2].includes(tag)) {
          typedTag.type = key
          typedTag.text = val[0]
          typedTag.color = val[1]
          break
        }
      }
      const tagText = [
        typedTag.text && `[ ${typedTag.text} ] `,
        tag,
        tagCN && ` [ ${tagCN} ]`,
      ].filter(Boolean).join('')
      return {
        tag,
        tagText,
        color: typedTag.color || '#8F77B5',
        type: typedTag.type || 'general',
      }
    }).sort((a, b) => {
      return tagSortOrder.indexOf(a.type) - tagSortOrder.indexOf(b.type)
    }),
  }
}

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
  if (result.includes('toggleClass("fav-buttons-true")')) {
    showMsg({ msg: i18n.t('ctWGhVvqB2k_1TX2iY0l2').toString() })
    return true
  } else {
    showMsg({ msg: `${i18n.t('MWVfUiW8egLWq7MgV-wzc')}: ${result}`, type: 'error' })
    return false
  }
}
