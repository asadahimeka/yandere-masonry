import Vue from 'vue'
import type Post from '@himeka/booru/dist/structures/Post'

interface AppState {
  theme: string
  requestState: boolean
  requestStop: boolean
  showImageSelected: boolean
  imageSelectedIndex: number
  showDrawer: boolean
  showFab: boolean
  currentPage: number
  imageList: Post[]
  selectedImageList: Post[],
  toggleDrawer: () => void,
  addToSelectedList: (item: Post) => void
}

const store = Vue.observable<AppState>({
  theme: localStorage.getItem('__darkmode') ?? 'light',
  requestState: false,
  requestStop: false,
  showImageSelected: false,
  imageSelectedIndex: 0,
  showDrawer: false,
  showFab: false,
  currentPage: 1,
  imageList: [],
  selectedImageList: [],
  toggleDrawer() {
    store.showDrawer = !store.showDrawer
  },
  addToSelectedList(item)  {
    if (store.selectedImageList.some(e => e.id === item.id)) return
    store.selectedImageList.push(item)
  }
})

export default store
