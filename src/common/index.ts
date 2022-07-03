import ydStyle from '@/styles/style.css?inline'
import knStyle from '@/styles/konachan.css?inline'
import loadingStyle from '@/styles/loading.css?inline'

export async function prepareApp(callback?: () => void) {
  if (doNotRun()) return
  addSiteStyle()
  bindDblclick()
  initMacy()
  setMoebooruLocale()
  const init = async () => {
    await initMasonry()
    callback?.()
  }
  addEventListener('load', () => {
    const params = new URLSearchParams(location.search)
    params.get('_wf') ? init() : addMasonryButton(init)
  })
}

function doNotRun() {
  const mimeTypes = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm', 'json', 'xml']
  return mimeTypes.some(e => location.pathname.endsWith('.' + e))
}

async function initMacy() {
  try {
    if (location.href.includes('yande.re/post')) {
      await Promise.all([
        loadScript('https://lib.baomitu.com/macy/2.5.1/macy.min.js')
      ])
      setTimeout(() => {
        new Macy({
          container: '#post-list-posts',
          trueOrder: false,
          waitForImages: false,
          columns: 5,
          margin: 16,
          breakAt: { 1800: 5, 1500: 4, 1200: 3, 900: 2, 700: 1 }
        })
      }, 100)
    }
  } catch (error) {
    console.log('init macy error:', error)
  }
}

async function initMasonry() {
  replaceHead()
  replaceBody()
  if (import.meta.env.PROD) await loadDeps()
}

function addSiteStyle() {
  if (location.href.includes('yande.re')) {
    GM_addStyle(ydStyle)
  }
  if (location.href.includes('konachan')) {
    GM_addStyle(ydStyle + knStyle)
  }
}

function isYKSite() {
  return ['yande.re', 'konachan'].some(e => location.href.includes(e))
}

function setMoebooruLocale() {
  if (!isYKSite()) return
  if (!Cookie) return
  if (Cookie.get('locale')) return
  Cookie.put('locale', 'zh_CN')
  location.reload()
}

function bindDblclick() {
  if (isYKSite()) {
    document.addEventListener('dblclick', e => {
      const prev = document.querySelector('a.previous_page') as HTMLAnchorElement
      const next = document.querySelector('a.next_page') as HTMLAnchorElement
      const w = document.documentElement.offsetWidth || document.body.offsetWidth
      const clickX = e.clientX
      clickX > w / 2 ? next?.click() : prev?.click()
    })
  }
}

function addMasonryButton(fn: () => void) {
  if (location.href.includes('safebooru')) {
    const oldBtn = document.querySelector('#enter-masonry') as HTMLButtonElement
    oldBtn?.remove()
  }
  document.body.insertAdjacentHTML('beforeend', '<button id="enter-masonry" style="position:fixed;z-index:99;right:16px;top:10px">瀑布流模式</button>')
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
    loadScript('https://npm.elemecdn.com/@vue/composition-api@1.6.2'),
    loadScript('https://lib.baomitu.com/vuetify/2.6.6/vuetify.min.js'),
    loadScript('https://npm.elemecdn.com/vue-masonry-css@1.0.3/dist/vue-masonry.min.js')
  ])
}

function replaceHead() {
  const el = document.querySelector('[name="csrf-token"]')
  const token = el?.getAttribute('content')
  token && sessionStorage.setItem('csrf-token', token)
  document.head.innerHTML = /* html */`
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <meta name="referrer" content="no-referrer">
    <title>Booru Masonry</title>
    <link rel="stylesheet" href="https://npm.elemecdn.com/normalize.css/normalize.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="https://npm.elemecdn.com/@mdi/font@6.7.96/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="https://lib.baomitu.com/vuetify/2.6.6/vuetify.min.css">
    <style>${loadingStyle}::-webkit-scrollbar{width:0px}</style>
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
