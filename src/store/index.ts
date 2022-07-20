import Vue from 'vue'
import type Post from '@himeka/booru/dist/structures/Post'

interface SeletedPost extends Post {
  loading?: boolean
  loaded?: boolean
}

interface AppState {
  requestState: boolean
  requestStop: boolean
  showImageSelected: boolean
  imageSelectedIndex: number
  showDrawer: boolean
  showFab: boolean
  currentPage: number
  imageList: Post[]
  selectedImageList: SeletedPost[]
  selectedColumn: string
  isYKSite: boolean
  toggleDrawer: () => void,
  addToSelectedList: (item: Post) => void
}

const store = Vue.observable<AppState>({
  requestState: false,
  requestStop: false,
  showImageSelected: false,
  imageSelectedIndex: 0,
  showDrawer: false,
  showFab: false,
  currentPage: 1,
  imageList: [],
  selectedImageList: [],
  selectedColumn: localStorage.getItem('__masonry_col') ?? '0',
  isYKSite: ['konachan', 'yande.re'].some(e => location.href.includes(e)),
  toggleDrawer() {
    store.showDrawer = !store.showDrawer
  },
  addToSelectedList(item)  {
    if (store.selectedImageList.some(e => e.id === item.id)) return
    store.selectedImageList.push(item)
  }
})

export default store
