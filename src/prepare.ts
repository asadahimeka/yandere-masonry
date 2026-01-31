import prepareStyle from '@/styles/prepare.css?inline'
import ydStyle from '@/styles/yandere.css?inline'
import knStyle from '@/styles/konachan.css?inline'
import customStyle from '@/styles/custom.css?inline'
import { initialSettings } from '@/store/settings'

console.log('initialSettings: ', initialSettings)

function doNotRun() {
  const mimeTypes = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm', 'json', 'xml']
  return mimeTypes.some(e => location.pathname.endsWith(`.${e}`))
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function isMoebooru() {
  return ['yande.re', 'konachan', 'lolibooru', 'sakugabooru'].some(e => location.host.includes(e))
}

export async function prepareApp(callback?: () => void) {
  if (doNotRun()) return
  addSiteStyle()
  if (isMoebooru()) {
    bindDblclick()
    setMoebooruLocale()
    translateTags()
    addMoeLocaleSelect()
    addWfTypeSelect()
    initLayout()
  } else {
    translateDanbooruTags()
  }
  await sleep(1000)
  setMasonryMode(async () => {
    removeOldListeners()
    await initMasonry()
    callback?.()
  })
}

const wfTypeActions: Record<string, Function> = {
  masonry: (list: HTMLElement) => {
    list.classList.add('mm-masonry')
    for (const item of list.children) {
      const img = item.querySelector('img')
      const w = Number(img?.getAttribute('width'))
      let h = Number(img?.getAttribute('height'))
      h += w * 0.17
      item.setAttribute('style', `width:auto;margin:0 0 12px 0;vertical-align:top;--w:${w};--h:${h}`)
      item.classList.add('mm-masonry__item')
      img?.classList.add('mm-masonry__img')
    }
  },
  grid: (list: HTMLElement) => {
    list.classList.add('mm-masonry')
    for (const item of list.children) {
      const img = item.querySelector('img')
      item.setAttribute('style', 'width:auto;margin:0 0 12px 0;vertical-align:top;--img-proportional-height:263;')
      item.classList.add('mm-masonry__item')
      img?.classList.add('mm-masonry__img')
    }
  },
  justified: (list: HTMLElement) => {
    list.classList.add('justified-container')
    for (const item of list.children) {
      const img = item.querySelector('img')
      const w = Number(img?.getAttribute('width'))
      const h = Number(img?.getAttribute('height'))
      const width = w * 300 / h
      item.setAttribute('style', `width:${width}px;flex-grow:${width};margin:0 10px 10px 0;vertical-align:top;`)
      item.querySelector('.thumb')?.setAttribute('style', `padding-bottom:${h / w * 101}%`)
      item.classList.add('justified-item')
    }
  },
}

async function initLayout() {
  if (!location.href.includes('yande.re/post')) return
  const listEl = document.querySelector('#post-list-posts')
  if (!listEl) return
  const wfType = initialSettings.masonryLayout || 'masonry'
  wfTypeActions[wfType]?.(listEl)
}

const isAutoWf = (() => {
  const params = new URLSearchParams(location.search)
  if (params.get('_wf')) return true
  return initialSettings.autoWaterfall
})()

function addWfTypeSelect() {
  if (!location.href.includes('yande.re/post')) return
  if (isAutoWf) return
  const type = initialSettings.masonryLayout || 'masonry'
  document.body.insertAdjacentHTML('beforeend', `<select id="wf-type-select">${Object.keys(wfTypeActions).map(e => `<option ${type == e ? 'selected' : ''} value="${e}">${e}</option>`).join('')}</select>`)
  const sel = document.querySelector('#wf-type-select') as HTMLSelectElement
  sel?.addEventListener('change', function () {
    const { value } = this
    if (!value) return
    initialSettings.masonryLayout = value as any
    localStorage.setItem('YM_APP_SETTINGS', JSON.stringify(initialSettings))
    setTimeout(() => {
      location.reload()
    }, 200)
  })
}

async function initMasonry() {
  replaceHead()
  replaceBody()
  if (import.meta.env.PROD) await loadDeps()
}

function addSiteStyle() {
  GM_addStyle(prepareStyle)
  if (location.host.includes('yande.re')) {
    GM_addStyle(ydStyle)
  }
  if (location.host.includes('konachan')) {
    GM_addStyle(ydStyle + knStyle)
  }
}

const locales = ['de', 'en', 'es', 'ja', 'ru', 'zh_CN', 'zh_TW']

function setMoebooruLocale() {
  if (document.title === 'Access denied') return
  if (document.cookie.includes('locale=')) return
  if (isAutoWf) return
  const url = new URL(location.href)
  if (url.searchParams.get('locale')) return
  const browserLang = navigator.language
  const locale = locales.find(e => e == browserLang.replace('-', '_') || e == browserLang.split('-')[0])
  if (!locale) return
  url.searchParams.set('locale', locale)
  location.assign(url)
}

function addMoeLocaleSelect() {
  if (isAutoWf) return
  document.body.insertAdjacentHTML('beforeend', `<select id="locale-select"><option value="">- lang -</option>${locales.map(e => `<option value="${e}">${e}</option>`).join('')}</select>`)
  const sel = document.querySelector('#locale-select') as HTMLSelectElement
  sel?.addEventListener('change', function () {
    const { value } = this
    if (!value) return
    const url = new URL(location.href)
    url.searchParams.set('locale', value)
    location.assign(url)
  })
}

function bindDblclick() {
  document.addEventListener('dblclick', e => {
    const prev = document.querySelector('a.previous_page') as HTMLAnchorElement
    const next = document.querySelector('a.next_page') as HTMLAnchorElement
    const w = document.documentElement.offsetWidth || document.body.offsetWidth
    const clickX = e.clientX
    clickX > w / 2 ? next?.click() : prev?.click()
  })
}

function setTagText(seletcor: string, textEn?: (el: HTMLElement) => string, display?: (en: string, cn: string) => string) {
  const elements = document.querySelectorAll<HTMLElement>(seletcor)
  for (const item of elements) {
    const en = textEn?.(item) || item.innerHTML
    const cn = window.__tagsCN?.[en]
    if (cn) item.innerHTML = display?.(en, cn) || `${en} [${cn}]`
  }
}

async function translateTags() {
  const locale = document.cookie.match(/locale=(\w+)/)?.[1]
  if (locale && locale !== 'zh_CN') return
  const response = await fetch('https://cdn.jsdelivr.net/gh/asadahimeka/yandere-masonry@main/src/data/all_tags_cn.min.json')
  window.__tagsCN = await response.json()
  const url = new URL(location.href)
  if (url.pathname == '/tag') return setTagText('td[class^=tag-type] a:last-child')
  if (!url.pathname.includes('/post')) return
  const textEn = (el: HTMLElement) => el.innerHTML.replace(/\s+/g, '_')
  setTagText('#site-title a[href^="/post?tags="]', textEn)
  setTagText('#tag-sidebar a[href^="/post?tags="]:not(.no-browser-link)', textEn, (en, cn) => `[${cn}] ${en}`)
}

async function translateDanbooruTags() {
  if (!navigator.language.includes('zh')) return
  let tagsCache = sessionStorage.getItem('__YM_TAGS_CN_CACHE') || ''
  if (!tagsCache) {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/gh/asadahimeka/yandere-masonry@main/src/data/all_tags_cn_space.min.json')
      tagsCache = await response.text()
      sessionStorage.setItem('__YM_TAGS_CN_CACHE', tagsCache)
    } catch (error) {}
  }
  window.__tagsCN = JSON.parse(tagsCache || '{}')
  const textEn = (el: HTMLElement) => el.innerText.trim()
  const textCn = (en: string, cn: string) => `[${cn}] ${en}`
  setTagText('.tag-list li a[href*="post"]:not([onclick])', textEn, textCn)
  setTagText('#tag-sidebar li a[href*="post"]:not([onclick])', textEn, textCn)
  setTagText('#tags-table td.name-column a[href*="post"]', (el: HTMLElement) => el.innerText.trim().replace(/_/g, ' '), textCn)
}

function removeOldListeners() {
  try {
    document.documentElement.replaceWith(document.documentElement.cloneNode(true))
    document.body.replaceWith(document.body.cloneNode(true))
    unsafeWindow.onerror = null
    if (isMoebooru()) {
      const d = document as any
      const w = unsafeWindow as any
      d.stopObserving()
      w.$('login-popup-username').stopObserving()
      w.User = {
        form_username_focus: () => {},
        form_username_changed: () => {},
        form_username_blur: () => {},
      }
      w.ReportError = null
    }
  } catch (error) {
    console.log('error: ', error)
  }
}

function setMasonryMode(fn: () => void) {
  if (isAutoWf) return fn()
  if (location.href.includes('safebooru')) {
    const oldBtn = document.querySelector('#enter-masonry') as HTMLButtonElement
    oldBtn?.remove()
  }
  const btnText = navigator.language.includes('zh') ? '瀑布流模式' : 'Browsing'
  document.body.insertAdjacentHTML('beforeend', `<button id="enter-masonry" class="${initialSettings.detailButtonsBottom ? 'enter-button-bottom' : ''}">${btnText}</button>`)
  const btn = document.querySelector('#enter-masonry') as HTMLButtonElement
  btn?.addEventListener('click', () => { fn() })
}

const specialSites = ['gelbooru.com']
export function loadScript(src: string) {
  return new Promise<void>(resolve => {
    let script: HTMLScriptElement
    if (specialSites.some(e => location.hostname.includes(e))) {
      script = GM_addElement('script', { src })
      script.addEventListener('load', () => { resolve() }, false)
    } else {
      script = document.createElement('script')
      script.src = src
      script.addEventListener('load', () => { resolve() }, false)
      document.head.appendChild(script)
    }
  })
}

async function loadDeps() {
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vue/2.7.16/vue.min.js')
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.7.2/vuetify.min.js')
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/8.28.2/vue-i18n.min.js')
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/fast-xml-parser/4.4.0/fxparser.min.js')
}

function replaceHead() {
  const el = document.querySelector('[name="csrf-token"]')
  const token = el?.getAttribute('content')
  token && sessionStorage.setItem('csrf-token', token)
  document.head.innerHTML = /* html */`
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <title>${location.host.toUpperCase()} Masonry</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.7.2/vuetify.min.css">
    <style>${customStyle}</style>
  `
}

function replaceBody() {
  document.body.innerHTML = /* html */`
    <div id="app">
      <div id="loading">
        <div id="loading-center">
          <div id="loading-center-absolute">
            <div class="loading-object" id="loading-object_one"></div>
            <div class="loading-object" id="loading-object_two"></div>
            <div class="loading-object" id="loading-object_three"></div>
            <p>&nbsp;読み込み中</p>
          </div>
        </div>
      </div>
    </div>
  `
}
/*! prepare end */
