import Vue from 'vue'
import type { Post } from '@himeka/booru'

interface SeletedPost extends Post {
  loading?: boolean
  loaded?: boolean
  fileNameWithTags?: string
}

interface AppSettings {
  masonryLayout: string
  isListenKeyupEvent: boolean
  credentialQuery: string
  isThumbSampleUrl: boolean
  showPostCheckbox: boolean
  useFancybox: boolean
  isHoldsFalse: boolean
  isYandereFetchByHtml: boolean
  showListPostReso: boolean
}

interface AppState {
  requestState: boolean
  requestStop: boolean
  showImageSelected: boolean
  imageSelectedIndex: number
  showDrawer: boolean
  showSettings: boolean
  showFab: boolean
  currentPage: number
  blacklist: string[]
  imageList: Post[]
  selectedImageList: SeletedPost[]
  selectedColumn: string
  isYKSite: boolean
  showPostList: boolean
  showPoolList: boolean
  showNSFWContents: boolean
  isListenWheelEvent: boolean
  isFullImgPreload: boolean
  imgPreloadNum: number
  isFullscreen: boolean
  settings: AppSettings
  toggleDrawer: () => void
  addToSelectedList: (item: Post) => void
  removeFromSelectedList: (id: string) => void
}

const ykFlag = ['konachan', 'yande.re'].some(e => location.href.includes(e))
const poolFlag = location.pathname == '/pool'

const store = Vue.observable<AppState>({
  requestState: false,
  requestStop: false,
  showImageSelected: false,
  imageSelectedIndex: 0,
  showDrawer: false,
  showSettings: false,
  showFab: false,
  currentPage: 1,
  imageList: [],
  blacklist: localStorage.getItem('__blacklist')?.split(',').filter(Boolean) || [],
  selectedImageList: [],
  selectedColumn: localStorage.getItem('__masonry_col') ?? '0',
  isYKSite: ykFlag,
  showPostList: !poolFlag,
  showPoolList: ykFlag && poolFlag,
  showNSFWContents: localStorage.getItem('__showNSFW') !== '0',
  isListenWheelEvent: localStorage.getItem('__listenWheel') !== '0',
  isFullImgPreload: !!localStorage.getItem('__fullImgPreload'),
  imgPreloadNum: Number(localStorage.getItem('__imgPreloadNum')) || 1,
  isFullscreen: false,
  settings: {
    masonryLayout: localStorage.getItem('__masonryLayout') || 'masonry',
    isListenKeyupEvent: localStorage.getItem('__listenKeyup') !== '0',
    credentialQuery: localStorage.getItem('__credentialQuery') || '',
    isThumbSampleUrl: !!localStorage.getItem('__thumbSampleUrl'),
    showPostCheckbox: !!localStorage.getItem('__showPostCheckbox'),
    useFancybox: !!localStorage.getItem('__useFancybox'),
    isHoldsFalse: !!localStorage.getItem('__isHoldsFalse'),
    isYandereFetchByHtml: !!localStorage.getItem('__isYandereFetchByHtml'),
    showListPostReso: !!localStorage.getItem('__showListPostReso'),
  },
  toggleDrawer() {
    store.showDrawer = !store.showDrawer
  },
  addToSelectedList(item) {
    if (store.selectedImageList.some(e => e.id === item.id)) return
    Object.assign(item, { fileNameWithTags: `${location.hostname} ${item.id} ${item.tags.join(' ')}` })
    store.selectedImageList.push(item)
  },
  removeFromSelectedList(id: string) {
    store.selectedImageList = store.selectedImageList.filter(e => {
      if (e.loading) return true
      return e.id !== id
    })
  },
})

export default store
