import ydStyle from '@/styles/style.css?inline'
import knStyle from '@/styles/konachan.css?inline'
import customStyle from '@/styles/custom.css?inline'

export async function prepareApp(callback?: () => void) {
  if (doNotRun()) return
  addSiteStyle()
  if (isMoebooru()) {
    bindDblclick()
    setMoebooruLocale()
    translateTags()
    initMacy()
  }
  addEventListener('load', () => {
    setMasonryMode(async () => {
      removeOldListeners()
      await initMasonry()
      callback?.()
    })
  })
}

function doNotRun() {
  const mimeTypes = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm', 'json', 'xml']
  return mimeTypes.some(e => location.pathname.endsWith(`.${e}`))
}

function isMoebooru() {
  return ['yande.re', 'konachan'].some(e => location.href.includes(e))
}

async function initMacy() {
  if (!location.href.includes('yande.re/post')) return
  const listEl = document.querySelector('#post-list-posts')
  if (!listEl) return
  for (const item of listEl.children) {
    item.setAttribute('style', 'width:auto;margin:0 10px 10px 0;vertical-align:top')
  }
  await loadScript('https://lib.baomitu.com/macy/2.5.1/macy.min.js')
  setTimeout(() => {
    // eslint-disable-next-line no-new
    new Macy({
      container: listEl,
      trueOrder: false,
      waitForImages: false,
      columns: 6,
      margin: 16,
      breakAt: { 1900: 6, 1600: 5, 1200: 4, 900: 2, 600: 1 },
    })
  }, 100)
}

async function initMasonry() {
  replaceHead()
  replaceBody()
  if (import.meta.env.PROD) await loadDeps()
}

function addSiteStyle() {
  GM_addStyle('#enter-masonry{position:fixed;z-index:99;right:16px;top:10px;padding:8px 12px;border:0;border-radius:6px;color:#fff;outline:0;background: linear-gradient(to right, #ff758c 0%, #ff7eb3 100%);opacity:1;transform:scale(1);transition:opacity,transform .2s;cursor:pointer}#enter-masonry:hover{opacity:.8;transform:scale(1.05)}')
  if (location.href.includes('yande.re')) {
    GM_addStyle(ydStyle)
  }
  if (location.href.includes('konachan')) {
    GM_addStyle(ydStyle + knStyle)
  }
}

function setMoebooruLocale() {
  if (document.title === 'Access denied') return
  if (document.cookie.includes('locale=')) return
  const url = new URL(location.href)
  if (url.searchParams.get('_wf')) return
  if (url.searchParams.get('locale')) return
  url.searchParams.set('locale', 'zh_CN')
  location.assign(url)
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
  const response = await fetch('https://raw.githubusercontent.com/asadahimeka/yandere-masonry/main/src/data/tags_cn.json')
  window.__tagsCN = await response.json()
  const url = new URL(location.href)
  if (url.pathname == '/tag') return setTagText('td[class^=tag-type] a:last-child')
  if (!url.pathname.includes('/post')) return
  const textEn = (el: HTMLElement) => el.innerHTML.replace(/\s+/g, '_')
  setTagText('#site-title a[href^="/post?tags="]', textEn)
  setTagText('#tag-sidebar a[href^="/post?tags="]:not(.no-browser-link)', textEn, (en, cn) => `[${cn}] ${en}`)
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
  const params = new URLSearchParams(location.search)
  if (params.get('_wf')) return fn()
  if (location.href.includes('safebooru')) {
    const oldBtn = document.querySelector('#enter-masonry') as HTMLButtonElement
    oldBtn?.remove()
  }
  document.body.insertAdjacentHTML('beforeend', '<button id="enter-masonry">瀑布流模式</button>')
  const btn = document.querySelector('#enter-masonry') as HTMLButtonElement
  btn?.addEventListener('click', () => { fn() })
}

const specialSites = ['gelbooru']
function loadScript(src: string) {
  return new Promise<void>(resolve => {
    let script: HTMLScriptElement
    if (specialSites.some(e => location.href.includes(e))) {
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

function loadDeps() {
  return Promise.all([
    loadScript('https://lib.baomitu.com/vue/2.6.14/vue.min.js'),
    loadScript('https://unpkg.com/@vue/composition-api@1.7.0/dist/vue-composition-api.prod.js'),
    loadScript('https://lib.baomitu.com/vuetify/2.6.6/vuetify.min.js'),
    loadScript('https://code.bdstatic.com/npm/vue-masonry-css@1.0.3/dist/vue-masonry.min.js'),
  ])
}

function replaceHead() {
  const el = document.querySelector('[name="csrf-token"]')
  const token = el?.getAttribute('content')
  token && sessionStorage.setItem('csrf-token', token)
  document.head.innerHTML = /* html */`
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    ${location.href.includes('http://behoimi.org') ? '' : '<meta name="referrer" content="no-referrer">'}
    <title>${location.host.toUpperCase()} Masonry</title>
    <link rel="stylesheet" href="https://lib.baomitu.com/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="https://lib.baomitu.com/vuetify/2.6.6/vuetify.min.css">
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
