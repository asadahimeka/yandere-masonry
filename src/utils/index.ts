import Vue from 'vue'

export const eventBus = new Vue()

export function isURL(s: string) {
  return /^https?:\/\/.*/.test(s)
}

export function downloadFile(url: string, name: string, options?: Partial<Tampermonkey.DownloadRequest>) {
  return new Promise<void>((resolve, reject) => {
    GM_download({
      url,
      name,
      onload: () => resolve(),
      onerror: err => reject(new Error(err.error)),
      ...options,
    })
  })
}

type MsgType = 'success' | 'error'
interface MessageOptions {
  msg: string
  title?: string
  type?: MsgType
}
const msgTypeImages: Record<MsgType, string> = {
  success: 'https://i0.hdslb.com/bfs/album/39212b6f4c0ab75ca8f508237e756ed03f60e030.png',
  error: 'http://i0.hdslb.com/bfs/album/d84b69fded166425a21ebc1c6c8251f36c26ea49.png',
}
export function showMsg({ msg = '', title = 'Booru Masonry', type = 'success' }: MessageOptions) {
  GM_notification({
    title,
    text: msg,
    silent: true,
    timeout: 2000,
    image: msgTypeImages[type],
  })
}

export function isReachBottom() {
  const { clientHeight, scrollTop, scrollHeight } = document.documentElement
  return (clientHeight + scrollTop) >= scrollHeight * 0.8
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

export function debounce<T extends unknown[]>(func: (...args: T) => void, delay: number): (...args: T) => void {
  let timer: any = null
  return (...args: T) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      // eslint-disable-next-line no-useless-call
      func.call(null, ...args)
    }, delay)
  }
}
