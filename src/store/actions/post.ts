import { fetchPostsActions } from './site'
import { dealBlacklist, getFirstPageNo, pushPageState } from './_util'
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
      posts = dealBlacklist(posts as any)
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
    if (settings.masonryLayout === 'virtual') {
      document.documentElement.scrollTop = 1
    }
  })
}
