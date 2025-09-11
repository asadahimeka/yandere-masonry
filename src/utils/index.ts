import Vue from 'vue'
import { add, formatDistanceToNow, isValid, sub } from 'date-fns'
import type { Post } from '@himeka/booru'
import i18n from './i18n'
import { loadScript } from '@/prepare'
import store from '@/store'

export const eventBus = new Vue()

export function isURL(s: string) {
  return /^https?:\/\/.*/.test(s)
}

const isSubpathDL = Boolean(localStorage.getItem('__dl_subpath_on'))
export function downloadFile(url: string, name: string, options?: Partial<Tampermonkey.DownloadRequest>) {
  if (!/\.\w+$/.test(name)) name += `.${url.split('.').pop()}`
  if (isSubpathDL) name = `${location.hostname}/${name}`
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

export function debounce(func: Function, delay: number, immediate = false) {
  let timer: ReturnType<typeof setTimeout> | undefined
  return function (this: any, ...args: any[]) {
    const callNow = immediate && !timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = void 0
      !immediate && func.apply(this, args)
    }, delay)
    callNow && func.apply(this, args)
  }
}

export const throttle = (fn: Function, wait = 300) => {
  let inThrottle: boolean
  let lastFn: ReturnType<typeof setTimeout>
  let lastTime: number
  return function (this: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
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

export function getLastPathsegment(url: string | null) {
  return url?.split('/').pop()
}

export function getImageSize(url: string) {
  return new Promise<{ width: number; height: number }>(resolve => {
    if (!url) {
      resolve({ width: 0, height: 0 })
      return
    }
    const image = new Image()
    image.onload = () => { resolve({ width: image.width, height: image.height }) }
    image.onerror = () => { resolve({ width: 0, height: 0 }) }
    image.src = url
  })
}

export async function fancyboxShow(images: Post[], index = 0) {
  if (!unsafeWindow.Fancybox) {
    if (store.isYKSite) {
      // // @ts-expect-error fuck rails global pollution
      // delete Array.prototype.entries
      // await loadScript('https://cdnjs.cloudflare.com/ajax/libs/core-js/3.37.1/minified.min.js')

      // @ts-expect-error fuck rails global pollution
      // eslint-disable-next-line no-extend-native
      Array.prototype.entries = function () {
        let index = 0
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const arr = this
        return {
          next() {
            if (index < arr.length) {
              return { value: [index, arr[index++]], done: false }
            } else {
              return { value: undefined, done: true }
            }
          },
          // eslint-disable-next-line no-mixed-operators
          [typeof Symbol !== 'undefined' && Symbol.iterator || '@@iterator']() {
            return this
          },
        }
      }
    }
    document.head.insertAdjacentHTML('beforeend', '<link href="https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.min.css" rel="stylesheet">')
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.umd.min.js')
  }
  const isMobile = navigator.userAgent.includes('Mobile')
  unsafeWindow.Fancybox.show((store.isYKSite ? [images[index]] : images).map(e => ({
    src: e.jpegUrl || e.fileUrl,
    thumb: e.previewUrl || e.fileUrl,
    downloadSrc: e.fileUrl,
    caption: e.tags.map(e => `<span class="v-chip theme--light v-size--small" style="background-color: rgb(143, 119, 181); border-color: rgb(143, 119, 181); color: rgb(255, 255, 255); caret-color: rgb(255, 255, 255);margin: 0 4px 4px 0">${e}</span>`).join(''),
  })), {
    compact: isMobile,
    startIndex: store.isYKSite ? 0 : index,
    ...(store.isYKSite
      ? {
          backdropClick: false,
          contentClick: 'toggleZoom',
          keyboard: {
            Escape: false,
            Delete: false,
            Backspace: false,
          },
        }
      : {}),
    placeFocusBack: false,
    trapFocus: false,
    Hash: false,
    Thumbs: { showOnStart: false },
    Carousel: { infinite: false },
    Toolbar: {
      display: {
        left: ['infobar'],
        middle: [],
        right: isMobile
          ? ['tagsTip', !store.isYKSite && 'toDetailPage', 'download', 'rotateCW', 'flipX', 'flipY', store.isYKSite ? 'customClose' : 'close'].filter(Boolean)
          : ['tagsTip', !store.isYKSite && 'toDetailPage', 'toggleZoom', 'slideshow', 'thumbs', 'download', 'rotateCW', 'flipX', 'flipY', store.isYKSite ? 'customClose' : 'close'].filter(Boolean),
      },
      items: {
        tagsTip: {
          tpl: '<button class="f-button"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4436" width="32" height="32"><path d="M483.2 790.3L861.4 412c1.7-1.7 2.5-4 2.3-6.3l-25.5-301.4c-0.7-7.8-6.8-13.9-14.6-14.6L522.2 64.3c-2.3-0.2-4.7 0.6-6.3 2.3L137.7 444.8c-3.1 3.1-3.1 8.2 0 11.3l334.2 334.2c3.1 3.2 8.2 3.2 11.3 0z m62.6-651.7l224.6 19 19 224.6L477.5 694 233.9 450.5l311.9-311.9z" p-id="4437" fill="#fff"></path><path d="M605.958852 324.826232a48 48 0 1 0 67.881066-67.883435 48 48 0 1 0-67.881066 67.883435Z" p-id="4438" fill="#fff"></path><path d="M889.7 539.8l-39.6-39.5c-3.1-3.1-8.2-3.1-11.3 0l-362 361.3-237.6-237c-3.1-3.1-8.2-3.1-11.3 0l-39.6 39.5c-3.1 3.1-3.1 8.2 0 11.3l243.2 242.8 39.6 39.5c3.1 3.1 8.2 3.1 11.3 0l407.3-406.6c3.1-3.1 3.1-8.2 0-11.3z" fill="#fff"></path></svg></path></svg></button>',
          click: () => {
            document.querySelectorAll<HTMLElement>('.fancybox__caption').forEach(e => {
              const { display } = e.style
              e.style.display = (!display || display == 'none') ? 'block' : 'none'
            })
          },
        },
        toDetailPage: {
          tpl: '<button class="f-button"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5483" width="32" height="32"><path d="M574 665.4c-3.1-3.1-8.2-3.1-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8c-3.1-3.1-8.2-3.1-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zM832.6 191.4c-84.6-84.6-221.5-84.6-306 0L410.3 307.6c-3.1 3.1-3.1 8.2 0 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6c-3.1 3.1-3.1 8.2 0 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1z" p-id="5484" fill="#fff"></path><path d="M610.1 372.3c-3.1-3.1-8.2-3.1-11.3 0L372.3 598.7c-3.1 3.1-3.1 8.2 0 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z" fill="#fff"></path></svg></button>',
          click: (ev: any) => {
            const { page } = ev.instance.carousel
            window.open(images[page].postView, '_blank', 'noreferrer')
          },
        },
        customClose: {
          tpl: '<button class="f-button" title="Close"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m19.5 4.5-15 15M4.5 4.5l15 15"></path></svg></button>',
          click: () => {
            document.querySelectorAll('.fancybox-focus-guard').forEach(e => e.remove())
            document.querySelectorAll('.fancybox__container').forEach(e => e.remove())
            document.documentElement.classList.remove('with-fancybox')
            document.body.classList.remove('hide-scrollbar')
          },
        },
      },
    },
  })
}

export function getCookie(cname: string) {
  const name = `${cname}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export function formatRelativeTime(dateInput?: Date | null): string {
  if (!dateInput || !isValid(dateInput)) return ''
  if (!Intl || !Intl.RelativeTimeFormat) {
    return formatDistanceToNow(dateInput, { addSuffix: true })
  }

  const rtf = new Intl.RelativeTimeFormat(i18n.locale, { numeric: 'auto' })
  const diffMs = dateInput.valueOf() - new Date().valueOf()
  const seconds = diffMs / 1000

  const units: { limit: number; value: number; unit: Intl.RelativeTimeFormatUnit }[] = [
    { limit: 60, value: seconds, unit: 'second' },
    { limit: 60 * 60, value: seconds / 60, unit: 'minute' },
    { limit: 60 * 60 * 24, value: seconds / 3600, unit: 'hour' },
    { limit: 60 * 60 * 24 * 7, value: seconds / (3600 * 24), unit: 'day' },
    { limit: 60 * 60 * 24 * 30, value: seconds / (3600 * 24 * 7), unit: 'week' },
    { limit: 60 * 60 * 24 * 365, value: seconds / (3600 * 24 * 30), unit: 'month' },
    { limit: Infinity, value: seconds / (3600 * 24 * 365), unit: 'year' },
  ]

  for (const { limit, value, unit } of units) {
    if (Math.abs(seconds) < limit) {
      return rtf.format(Math.round(value), unit)
    }
  }

  return ''
}

export function uniqBy<T>(array: T[], iteratee: ((item: T) => any) | keyof T): T[] {
  const seen = new Set<any>()
  const result: T[] = []
  for (const item of array) {
    const key = typeof iteratee === 'function' ? iteratee(item) : item[iteratee]
    if (!seen.has(key)) {
      seen.add(key)
      result.push(item)
    }
  }
  return result
}
