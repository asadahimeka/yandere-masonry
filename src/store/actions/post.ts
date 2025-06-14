import { fetchActions, getSearchState, setPage, setTags } from './site'
import { dealBlacklist, pushPageState } from './_util'
import store from '@/store'

export const searchPosts = async (latePageQuery = false) => {
  store.requestState = true
  try {
    let posts = await fetchActions.find(e => e.test())?.action()
    if (Array.isArray(posts) && posts.length > 0) {
      posts = dealBlacklist(posts as any)
      const { page } = getSearchState()
      store.currentPage = page
      store.imageList = [
        ...store.imageList,
        ...(store.showNSFWContents ? posts : posts.filter(e => ['s', 'g'].includes(e.rating))),
      ]
      pushPageState(page, latePageQuery)
      setPage(page + 1)
    } else {
      store.requestStop = true
    }
  } catch (error) {
    console.log(`fetch error: ${error}`)
  } finally {
    store.requestState = false
  }
}

const calcFetchTimes = () => {
  const vcont = document.querySelector('._vcont')
  const cnth = vcont?.clientHeight
  const doch = document.documentElement.clientHeight
  return cnth ? Math.floor(doch / cnth) : 1
}

export const initPosts = async () => {
  await searchPosts(true)
  if (store.settings.masonryLayout === 'virtual') {
    document.documentElement.scrollTop = 1
  }
  if (store.requestStop) return
  if (/safebooru|nozomi\.la/.test(location.host)) return
  let times = calcFetchTimes()
  if (times > 2) times = 2
  for (let index = 0; index < times; index++) {
    await searchPosts(true)
  }
}

export const refreshPosts = () => {
  setPage(1)
  store.imageList = []
  store.selectedImageList = []
  store.requestStop = false
  initPosts()
}

export const loadPostsByPage = (toPage: string) => {
  setPage(Number(toPage) || 1)
  store.imageList = []
  searchPosts()
}

export const loadPostsByTags = (searchTerm: string) => {
  setPage(1)
  setTags(searchTerm)
  store.imageList = []
  searchPosts().then(() => {
    if (store.settings.masonryLayout === 'virtual') {
      document.documentElement.scrollTop = 1
    }
  })
}
