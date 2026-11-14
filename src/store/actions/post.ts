import { nextTick } from 'vue'
import { fetchPostsActions } from './site'
import { getFirstPageNo, handleBlacklist, pushPageState } from './_util'
import { settings, store } from '@/store'
import { uniqBy } from '@/utils'

const params = new URLSearchParams(location.search)
const query = {
  page: getFirstPageNo(params),
  tags: params.get('tags'),
}
export const getSearchState = () => query
export const setPage = (page: number) => query.page = page
export const setTags = (tags: string) => query.tags = tags

export const searchPosts = async (latePageQuery = false) => {
  store.requestLoading = true
  try {
    const { page, tags } = getSearchState()
    let posts = await fetchPostsActions.find(e => e.is())?.posts(page, tags)
    if (Array.isArray(posts) && posts.length > 0) {
      posts = handleBlacklist(posts as any)
      store.currentPage = page
      store.imageList = uniqBy([
        ...store.imageList,
        ...(settings.showNSFWContents ? posts : posts.filter(e => ['s', 'g'].includes(e.rating))),
      ], 'id')
      pushPageState(page, latePageQuery)
      setPage(page + 1)
    } else {
      store.requestStop = true
    }
  } catch (error) {
    console.log(`fetch error: ${error}`)
  } finally {
    store.requestLoading = false
  }
}

const calcFetchTimes = () => {
  const vcont = document.querySelector('._vcont')
  const cnth = vcont?.clientHeight
  const doch = document.documentElement.clientHeight
  return cnth ? Math.floor(doch / cnth) : 1
}

// 有的站点一页条数很少（uhdpaper 每页 20 条），瀑布流撑不满一屏时页面根本不可滚动，
// 滚动事件永远不触发，这里主动补几页，直到能滚动或者没有更多
const fillViewport = async () => {
  if (settings.masonryLayout === 'virtual') return
  for (let i = 0; i < 3; i++) {
    await nextTick()
    const doc = document.documentElement
    if (doc.scrollHeight > doc.clientHeight + 1) return
    if (store.requestStop) return
    await searchPosts(true)
  }
}

export const initPosts = async () => {
  await searchPosts(true)
  if (settings.masonryLayout === 'virtual') {
    document.documentElement.scrollTop = 1
  }
  if (store.requestStop) return
  if (/safebooru|nozomi\.la/.test(location.host)) return
  let times = calcFetchTimes()
  if (times > 3) times = 3
  for (let index = 1; index < times; index++) {
    await searchPosts(true)
  }
  await fillViewport()
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
  searchPosts().then(async () => {
    if (settings.masonryLayout === 'virtual') {
      document.documentElement.scrollTop = 1
    }
    await fillViewport()
  })
}
