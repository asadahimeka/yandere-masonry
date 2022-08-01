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
  type?: MsgType
}
export function showMsg({ msg = '', type = 'success' }: MessageOptions) {
  eventBus.$emit('showSnackbar', msg, type)
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

export function formatDate(date: Date) {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString()
  const day = date.getDate().toString()
  return [year, month, day].map(n => n[1] ? n : `0${n}`).join('-')
}

export function getDay(num: number) {
  const str = '-'
  const today = new Date()
  const nowTime = today.getTime()
  const ms = 24 * 3600 * 1000 * num
  today.setTime(parseInt(`${nowTime + ms}`, 10))
  const oYear = today.getFullYear()
  let oMoth = (today.getMonth() + 1).toString()
  if (oMoth.length <= 1) oMoth = `0${oMoth}`
  let oDay = today.getDate().toString()
  if (oDay.length <= 1) oDay = `0${oDay}`
  return oYear + str + oMoth + str + oDay
}
