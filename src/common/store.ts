import Vue from 'vue'
import type Post from 'booru/dist/structures/Post'

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
  toggleDrawer: () => void
}

const store = Vue.observable<AppState>({
  theme: localStorage.getItem('darken-mode') ?? 'light',
  requestState: false,
  requestStop: false,
  showImageSelected: false,
  imageSelectedIndex: 0,
  showDrawer: false,
  showFab: false,
  currentPage: 1,
  imageList: [],
  toggleDrawer() {
    store.showDrawer = !store.showDrawer
  }
})

export default store
