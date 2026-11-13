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
  replaceDocument()
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

function translateTags() {
  const locale = document.cookie.match(/locale=(\w+)/)?.[1]
  if (locale && locale !== 'zh_CN') return
  const text = getResourceText('tagscn')
  if (!text) return
  try {
    window.__tagsCN = JSON.parse(text)
  } catch (error) {
    console.warn('[YM] failed to parse tag translation:', error)
    window.__tagsCN = {}
  }
  const url = new URL(location.href)
  if (url.pathname == '/tag') return setTagText('td[class^=tag-type] a:last-child')
  if (!url.pathname.includes('/post')) return
  const textEn = (el: HTMLElement) => el.innerHTML.replace(/\s+/g, '_')
  setTagText('#site-title a[href^="/post?tags="]', textEn)
  setTagText('#tag-sidebar a[href^="/post?tags="]:not(.no-browser-link)', textEn, (en, cn) => `[${cn}] ${en}`)
}

function translateDanbooruTags() {
  if (!navigator.language.includes('zh')) return
  const text = getResourceText('tagscnspace')
  if (!text) return
  try {
    window.__tagsCN = JSON.parse(text)
  } catch (error) {
    console.warn('[YM] failed to parse danbooru tag translation:', error)
    window.__tagsCN = {}
  }
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

const scriptLoadTimeout = 15000

function loadScriptByElement(src: string) {
  console.log('loadScriptByElement: ', src)
  return new Promise<void>((resolve, reject) => {
    const script = GM_addElement('script', { src })
    const timer = setTimeout(() => reject(new Error(`script load timeout: ${src}`)), scriptLoadTimeout)
    script.addEventListener('load', () => { clearTimeout(timer); resolve() }, false)
    script.addEventListener('error', () => { clearTimeout(timer); reject(new Error(`script load failed: ${src}`)) }, false)
  })
}

function loadScriptByEval(src: string) {
  console.log('loadScriptByEval: ', src)
  return new Promise<void>((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url: src,
      timeout: scriptLoadTimeout,
      onload(res) {
        if (res.status !== 200) { reject(new Error(`HTTP ${res.status}: ${src}`)); return }
        try {
          // indirect eval so top-level var declarations become real globals
          // eslint-disable-next-line no-eval
          (0, eval)(res.responseText)
          resolve()
        } catch (error) {
          reject(error instanceof Error ? error : new Error(String(error)))
        }
      },
      onerror() { reject(new Error(`script fetch failed: ${src}`)) },
      ontimeout() { reject(new Error(`script fetch timeout: ${src}`)) },
    })
  })
}

export async function loadScript(src: string) {
  try {
    await loadScriptByElement(src)
  } catch (error) {
    console.warn('[YM] script element load failed, falling back to eval:', src, error)
    await loadScriptByEval(src)
  }
}

const deps: { name: string; globalName: string; url: string }[] = [
  { name: 'vuejs', globalName: 'Vue', url: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.7.16/vue.min.js' },
  { name: 'vuetifyjs', globalName: 'Vuetify', url: 'https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.7.2/vuetify.min.js' },
  { name: 'vuei18njs', globalName: 'VueI18n', url: 'https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/8.28.2/vue-i18n.min.js' },
  { name: 'fxparserjs', globalName: 'XMLParser', url: 'https://cdnjs.cloudflare.com/ajax/libs/fast-xml-parser/4.4.0/fxparser.min.js' },
]

function loadScriptFromResource(source: string) {
  // inline scripts run synchronously when inserted, so the 'load' event can fire
  // before we could attach a listener; resolve right away and let the caller
  // check whether the library actually exposed its global
  GM_addElement('script', { textContent: source })
}

function pageGlobal(name: string) {
  const w = (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window) as any
  return w?.[name]
}

async function waitForGlobal(name: string) {
  for (let i = 0; i < 20; i++) {
    if (typeof pageGlobal(name) !== 'undefined') return true
    await new Promise(resolve => setTimeout(resolve, 25))
  }
  return typeof pageGlobal(name) !== 'undefined'
}

async function loadDep(dep: { name: string; globalName: string; url: string }) {
  let source = ''
  try {
    source = GM_getResourceText(dep.name) || ''
  } catch (error) {
    console.warn('[YM] failed to read resource:', dep.name, error)
  }
  if (source) {
    try {
      loadScriptFromResource(source)
      if (await waitForGlobal(dep.globalName)) return
      console.warn('[YM] resource script did not expose global, falling back to CDN:', dep.globalName)
    } catch (error) {
      console.warn('[YM] resource script failed, falling back to CDN:', dep.name, error)
    }
  }
  await loadScript(dep.url)
}

async function loadDeps() {
  try {
    for (const dep of deps) {
      await loadDep(dep)
    }
  } catch (error) {
    console.error('[YM] failed to load dependencies:', error)
    const loadingText = document.querySelector('#loading p')
    if (loadingText) loadingText.textContent = 'Dependencies failed to load / 依赖加载失败'
    throw error
  }
}

function addResourceStyle(name: string) {
  try {
    const css = GM_getResourceText(name)
    if (css) GM_addStyle(css)
  } catch (error) {
    console.warn('[YM] failed to apply resource style:', name, error)
  }
}

function getResourceText(name: string) {
  try {
    return GM_getResourceText(name) || ''
  } catch (error) {
    console.warn('[YM] failed to read resource:', name, error)
    return ''
  }
}

function replaceDocument() {
  const el = document.querySelector('[name="csrf-token"]')
  const token = el?.getAttribute('content')
  token && sessionStorage.setItem('csrf-token', token)
  document.head.innerHTML = /* html */`
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <title>${location.host.toUpperCase()} Masonry</title>
  `.trim()
  addResourceStyle('normalizecss')
  addResourceStyle('vuetifycss')
  GM_addStyle(customStyle)
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
  `.trim()
}

/*! prepare end */
