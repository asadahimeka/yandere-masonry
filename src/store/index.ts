import Vue, { watch } from 'vue'
import type { Post } from '@himeka/booru'
import { initialSettings } from './settings'

export const settings = Vue.observable(initialSettings)

// szurubooru 站点配置变更时写入 GM 存储（脚本级、跨域名共享）
if (typeof GM_setValue === 'function') {
  watch(() => settings.szurubooruConfigs, val => {
    try {
      GM_setValue('ym_szurubooruConfigs', JSON.stringify(val))
    } catch (error) {
      console.warn('[YM] failed to save szurubooru configs:', error)
    }
  }, { deep: true })
}

interface SeletedPost extends Post {
  loading?: boolean
  loaded?: boolean
  fileNameWithTags?: string
}

const ykFlag = ['konachan', 'yande.re'].some(e => location.href.includes(e))
const poolFlag = location.pathname == '/pool'

export const store = Vue.observable({
  requestLoading: false,
  requestStop: false,
  showImageSelected: false,
  imageSelectedIndex: 0,
  showDrawer: false,
  showSettings: false,
  showFab: false,
  currentPage: 1,
  imageList: [] as Post[],
  selectedImageList: [] as SeletedPost[],
  isYKSite: ykFlag,
  showPostList: !poolFlag,
  showPoolList: ykFlag && poolFlag,
  isFullscreen: false,
})

export function toggleDrawer() {
  store.showDrawer = !store.showDrawer
}

export function addToSelectedList(item: Post) {
  if (store.selectedImageList.some(e => e.id === item.id)) return
  Object.assign(item, { fileNameWithTags: `${location.hostname} ${item.id} ${item.tags.join(' ')}` })
  store.selectedImageList.push(item)
}

export function removeFromSelectedList(id: string) {
  store.selectedImageList = store.selectedImageList.filter(e => {
    if (e.loading) return true
    return e.id !== id
  })
}
