import { showMsg } from './utils'

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
    if (!id) return
    const response = await fetch(`/user.json?id=${id}`)
    const result = await response.json()
    const { name } = result[0]
    localStorage.setItem('__username', name)
    return name
  } catch (error) {
    console.log('getUsername error:', error)
    return
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
  voted?: boolean;
  tags?: {
    tag: string;
    tagText: string;
    color: string;
    type: string;
  }[];
}

const tagInfoMap: Record<string, string[]> = {
  circle: ['社团', '#00bbbbcc'],
  artist: ['画师', '#FFB11Bf1'],
  copyright: ['版权', '#C1328Ede'],
  character: ['角色', '#00aa00cc'],
  general: ['', '#E87A90cc'],
  faults: ['', '#AB3B3Ada']
}
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
          tagCN && ` [ ${tagCN} ]`
        ].filter(Boolean).join('')
        return {
          tag,
          type,
          tagText,
          color: tagInfoMap[type][1]
        }
      })
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
    body: form
  })
  if (!response.ok) {
    showMsg({ msg: '收藏失败: ' + response.status, type: 'error' })
    return false
  }
  const result = await response.json()
  if (result.success) {
    showMsg({ msg: '收藏成功' })
    return true
  } else {
    showMsg({ msg: '收藏失败: ' + result.reason, type: 'error' })
    return false
  }
}
