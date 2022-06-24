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
