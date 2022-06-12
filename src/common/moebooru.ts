import { showMsg } from './utils'

export function getUsername() {
  return User.last_username_in_form
}

export async function isVoted(id: string) {
  try {
    if (!id) return false
    const username = getUsername()
    if (!username) return false
    const response = await fetch(`/favorite/list_users.json?id=${id}`)
    const result = await response.json()
    const users: string[] = result.favorited_users.split(',')
    return users.includes(username)
  } catch (error) {
    console.log('isVoted error:', error)
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
