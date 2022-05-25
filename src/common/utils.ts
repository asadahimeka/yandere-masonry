import { search } from '@himeka/booru'

export async function searchBooru(domain: string, page: number, tags = '') {
  return search(domain, tags, { page, limit: 40 })
}

export function isURL(s: string) {
  return /^https?:\/\/.*/.test(s)
}

// export function downloadFile(url: string | null, name = '') {
//   if (!url) return
//   const a = document.createElement('a')
//   a.href = url
//   a.target = '_blank'
//   a.rel = 'noopener noreferrer'
//   a.style.display = 'none'
//   a.setAttribute('download', name)
//   document.body.appendChild(a)
//   a.click()
//   document.body.removeChild(a)
// }

export function downloadFile(url: string, name: string, options?: Partial<Tampermonkey.DownloadRequest>) {
  return new Promise<void>((resolve, reject) => {
    GM_download({
      url,
      name,
      onload: () => resolve(),
      onerror: err => reject(new Error(err.error)),
      ...options
    })
  })
}

type MsgType = 'success' | 'error'
interface MessageOptions {
  msg: string;
  title?: string;
  type?: MsgType
}
const msgTypeImages: Record<MsgType, string> = {
  success: 'https://i0.hdslb.com/bfs/album/39212b6f4c0ab75ca8f508237e756ed03f60e030.png',
  error: 'http://i0.hdslb.com/bfs/album/d84b69fded166425a21ebc1c6c8251f36c26ea49.png'
}
export function showMsg({ msg = '', title = 'Booru Masonry', type = 'success' }: MessageOptions) {
  GM_notification({
    title,
    text: msg,
    silent: true,
    timeout: 2000,
    image: msgTypeImages[type]
  })
}

export async function addPostToFavorites(domain: string, id: string) {
  if (['konachan', 'yande'].every(e => !domain.includes(e))) return
  const form = new FormData()
  form.append('id', id)
  form.append('score', '3')
  const response = await fetch(`https://${domain}/post/vote.json`, {
    method: 'POST',
    headers: { 'x-csrf-token': sessionStorage.getItem('csrf-token') ?? '' },
    body: form
  })
  const result = await response.json()
  if (result.success) {
    showMsg({ msg: '收藏成功' })
  } else {
    showMsg({ msg: '收藏失败: ' + result.reason, type: 'error' })
  }
}

export function isReachBottom() {
  const { clientHeight, scrollTop, scrollHeight } = document.documentElement
  return (clientHeight + scrollTop) >= scrollHeight * 0.9
}

type ScrollFn = (scroll: number, ev: Event) => void
export function throttleScroll(downFn: ScrollFn, upFn: ScrollFn) {
  const doc = document.documentElement
  let position = doc.scrollTop
  let ticking = false
  return function (arg: Event) {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(() => {
      const scroll = doc.scrollTop
      scroll > position ? downFn(scroll, arg) : upFn(scroll, arg)
      position = scroll
      ticking = false
    })
  }
}
