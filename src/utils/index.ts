import Vue from 'vue'
import { add, sub } from 'date-fns'

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

export function notReachBottom() {
  const { clientHeight, scrollTop, scrollHeight } = document.documentElement
  return (clientHeight + scrollTop) >= scrollHeight * 0.8
}

type ScrollFn = (scroll: number, ev: Event) => void
export function throttleScroll(downFn: ScrollFn, upFn?: ScrollFn) {
  const doc = document.documentElement
  let position = doc.scrollTop
  let ticking = false
  return function (arg: Event) {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(() => {
      const scroll = doc.scrollTop
      scroll > position ? downFn(scroll, arg) : upFn?.(scroll, arg)
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

export function addDate(num: number, duration: string, date?: Date) {
  const res = add(date || new Date(), { [duration]: num })
  return formatDate(res)
}

export function subDate(num: number, duration: string, date?: Date) {
  const res = sub(date || new Date(), { [duration]: num })
  return formatDate(res)
}

export function dragElement(sel: string, childSel: string) {
  const cont = document.querySelector<HTMLElement>(sel)
  if (!cont) return
  const el = cont.querySelector<HTMLElement>(childSel)
  if (!el) return

  let prevPos: number[] = []
  let needForRAF = true

  const onMouseDown = (e: MouseEvent) => {
    if (e.which !== 1) return
    let left: number
    let top: number
    const elScroller = (e: MouseEvent) => {
      if (needForRAF) {
        needForRAF = false
        const x = e.clientX
        const y = e.clientY
        left = cont.scrollLeft + (prevPos[0] - x)
        top = cont.scrollTop + (prevPos[1] - y)
        prevPos[0] = x
        prevPos[1] = y
        requestAnimationFrame(() => {
          cont.scroll({ left, top })
          needForRAF = true
        })
      }
      return false
    }
    el.style.cursor = 'move'
    prevPos = [e.clientX, e.clientY]
    window.addEventListener('mousemove', elScroller)
    const onMouseUp = () => {
      window.removeEventListener('mousemove', elScroller)
      el.style.cursor = 'auto'
      window.removeEventListener('mouseup', onMouseUp)
      return false
    }
    window.addEventListener('mouseup', onMouseUp)
    return false
  }
  el.addEventListener('mousedown', onMouseDown)

  return () => {
    el.removeEventListener('mousedown', onMouseDown)
  }
}
