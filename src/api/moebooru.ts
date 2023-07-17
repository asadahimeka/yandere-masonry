import { Post, SearchResults, forSite } from '@himeka/booru'
import { formatDate, showMsg } from '../utils'
import i18n from '@/utils/i18n'

function getYandereUserId() {
  const match = document.cookie.match(/user_id=(\d+)/)
  return match?.[1]
}

function getKonachanUsername() {
  const match = document.cookie.match(/login=(\w+)/)
  return match?.[1]
}

let _moebooruUserName: string | null | undefined
export async function getUsername() {
  try {
    if (_moebooruUserName) return _moebooruUserName
    if (location.href.includes('konachan')) {
      _moebooruUserName = getKonachanUsername()
      return _moebooruUserName
    }
    const username = localStorage.getItem('__username')
    _moebooruUserName = username
    if (username) return username
    const id = getYandereUserId()
    if (!id) return ''
    const response = await fetch(`/user.json?id=${id}`)
    const result = await response.json()
    const { name } = result[0] as Record<string, string>
    localStorage.setItem('__username', name)
    return name
  } catch (error) {
    console.log('getUsername error:', error)
    return ''
  }
}

export async function checkPostIsVoted(id: string) {
  try {
    if (!id) return false
    const username = await getUsername()
    if (!username) return false
    const response = await fetch(`/favorite/list_users.json?id=${id}`)
    const result = await response.json()
    const users: string[] = result.favorited_users.split(',')
    return users.includes(username)
  } catch (error) {
    console.log('checkPostIsVoted error:', error)
    return false
  }
}

export interface PostDetail {
  voted?: boolean
  tags?: {
    tag: string
    tagText: string
    color: string
    type: string
  }[]
}

const tagInfoMap: Record<string, any[]> = {
  circle: [i18n.t('ZtQHZx-pEjmu_o3dQD1fc'), '#00bbbbcc'],
  artist: [i18n.t('Ym0HIEu9Q80qXB31LuC6c'), '#FFB11Bf1'],
  copyright: [i18n.t('juT6gwLOg5r1h2vFpFf6P'), '#C1328Ede'],
  character: [i18n.t('aonlPAu9kEkkwNvQg0DBk'), '#00aa00cc'],
  general: ['', '#E87A90cc'],
  faults: ['', '#AB3B3Ada'],
}
// const tagSortOrder = ['circle', 'artist', 'copyright', 'character', 'general']
const isCNLang = i18n.locale.includes('zh')
export async function getPostDetail(id: string): Promise<PostDetail | false> {
  try {
    if (!id) return false
    const response = await fetch(`/post.json?api_version=2&tags=id:${id}&include_tags=1&include_votes=1`)
    const result = await response.json()
    return {
      voted: result.votes[id] == 3,
      tags: Object.entries<string>(result.tags).map(([tag, type]) => {
        const tagCN = window.__tagsCN?.[tag]
        const typeText = tagInfoMap[type]?.[0]
        const tagText = [
          typeText && `[ ${typeText} ] `,
          tag,
          isCNLang && tagCN && ` [ ${tagCN} ]`,
        ].filter(Boolean).join('')
        return {
          tag,
          type,
          tagText,
          color: tagInfoMap[type]?.[1] || tagInfoMap.general[1],
        }
      })/* .sort((a, b) => {
        return tagSortOrder.indexOf(a.type) - tagSortOrder.indexOf(b.type)
      }) */,
    }
  } catch (error) {
    console.log('getPostDetail error:', error)
    return false
  }
}

export async function addPostToFavorites(id: string) {
  const form = new FormData()
  form.append('id', id)
  form.append('score', '3')
  const response = await fetch('/post/vote.json', {
    method: 'POST',
    headers: { 'x-csrf-token': sessionStorage.getItem('csrf-token') ?? '' },
    body: form,
  })
  if (!response.ok) {
    showMsg({ msg: `${i18n.t('MWVfUiW8egLWq7MgV-wzc')}: ${response.status}`, type: 'error' })
    return false
  }
  const result = await response.json()
  if (result.success) {
    showMsg({ msg: i18n.t('ctWGhVvqB2k_1TX2iY0l2').toString() })
    return true
  } else {
    showMsg({ msg: `${i18n.t('MWVfUiW8egLWq7MgV-wzc')}: ${result.reason}`, type: 'error' })
    return false
  }
}

export function isPopularPage() {
  return /(yande.re|konachan).*\/post\/popular_/.test(location.href)
}

export function isPoolShowPage() {
  return /(yande.re|konachan).*\/pool\/show/.test(location.href)
}

export async function fetchPostsByPath(postsKey?: string, page?: number): Promise<SearchResults> {
  const url = new URL(location.href)
  url.pathname += '.json'
  page && url.searchParams.set('page', page.toString())
  const response = await fetch(url)
  const result = await response.json()
  const site = forSite(location.host)
  const results: [] = postsKey ? result[postsKey] : result
  const posts = results.map(e => new Post(e, site))
  return new SearchResults(posts, [], {}, site)
}

function splitTags(tagsData: string, limit: number, searchTerm?: string) {
  let results = tagsData?.split(/\s+/)
  if (searchTerm) results = results.filter(e => e.includes(searchTerm))
  if (!Array.isArray(results)) return []
  return results.slice(0, limit).map(e => e.split('`')[1]).filter(Boolean)
}

function getTagsString(key: string): string {
  return (window as any).TagCompletion?.[key] || localStorage.getItem(key) || ''
}

export function searchTagsByName(searchTerm?: string) {
  if (!searchTerm) return []
  return splitTags(getTagsString('tag_data'), 40, searchTerm)
}

export function getRecentTags() {
  return splitTags(getTagsString('recent_tags'), 10)
}

export interface Pool {
  created_at: string
  description: string
  id: string
  name: string
  post_count: number
  updated_at: string
  user_id: string
  thumb?: string
}

export async function fetchPools(page: number, query?: string): Promise<Pool[]> {
  const url = new URL('/pool.json', location.origin)
  url.searchParams.set('page', page.toString() || '1')
  query && url.searchParams.set('query', query)
  const jsonResp = await fetch(url)
  const results: Pool[] = await jsonResp.json()
  url.pathname = url.pathname.replace('.json', '.atom')
  const xmlResp = await fetch(url)
  const doc = new DOMParser().parseFromString(await xmlResp.text(), 'text/xml')
  const thumbMap = [...doc.querySelectorAll('entry')].reduce<Record<string, string>>((acc, cur) => {
    const id = cur.querySelector('id')?.textContent?.match(/Pool\/(\d+)/)?.[1]
    const url = cur.querySelector('link[rel=enclosure]')?.getAttribute('href')
    if (id && url) acc[id] = url
    return acc
  }, {})
  for (const item of results) {
    item.thumb = thumbMap[item.id]
    item.created_at = formatDate(new Date(item.created_at))
    item.updated_at = formatDate(new Date(item.updated_at))
  }
  return results
}
