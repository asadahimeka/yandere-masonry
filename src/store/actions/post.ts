import type SearchResults from '@himeka/booru/dist/structures/SearchResults'
import store from '@/store'
import { BOORU_PAGE_LIMIT, isPidSite, searchBooru } from '@/api/booru'
import { fetchPostsByPath, isPoolShowPage, isPopularPage } from '@/api/moebooru'

function getFirstPageNo(params: URLSearchParams) {
  if (isPidSite) {
    const page = Number(params.get('pid')) || 0
    return Math.trunc(page / BOORU_PAGE_LIMIT) + 1
  }
  return Number(params.get('page')) || 1
}

function pushPageState(pageNo: number) {
  let pageParamName = 'page'
  if (isPidSite) {
    pageParamName = 'pid'
    pageNo = (pageNo - 1) * BOORU_PAGE_LIMIT
  }
  const url = new URL(location.href)
  url.searchParams.set(pageParamName, pageNo.toString())
  history.replaceState('', '', url)
}

function dealBlacklist(results: SearchResults) {
  return store.blacklist.length
    ? results.blacklist(store.blacklist)
    : results
}

const params = new URLSearchParams(location.search)
let page = getFirstPageNo(params)
let tags = params.get('tags')

const fetchActions = [
  {
    test: isPopularPage,
    action: async () => {
      const results = await fetchPostsByPath()
      store.requestStop = true
      return dealBlacklist(results)
    },
  },
  {
    test: isPoolShowPage,
    action: async () => {
      const results = await fetchPostsByPath('posts', page)
      return tags ? results.tagged(tags) : results
    },
  },
  {
    test: () => true,
    action: async () => {
      const results = await searchBooru(page, tags)
      return dealBlacklist(results)
    },
  },
]

export const searchPosts = async () => {
  store.requestState = true
  try {
    const posts = await fetchActions.find(e => e.test())?.action()
    if (Array.isArray(posts) && posts.length > 0) {
      store.currentPage = page
      store.imageList = [...store.imageList, ...posts]
      pushPageState(page)
      page++
    } else {
      store.requestStop = true
    }
  } catch (error) {
    console.log(`fetch error: ${error}`)
  } finally {
    store.requestState = false
  }
}

// const calcFetchTimes = () => {
//   const vcont = document.querySelector('._vcont')
//   const cnth = vcont?.clientHeight
//   const doch = document.documentElement.clientHeight
//   return cnth ? Math.floor(doch / cnth) : 1
// }

export const initPosts = async () => {
  await searchPosts()
  if (store.requestStop) return
  if (location.href.includes('safebooru')) return
  await searchPosts()
  // const times = calcFetchTimes()
  // for (let index = 0; index < times; index++) {
  //   await searchPosts()
  // }
}

export const refreshPosts = () => {
  page = 1
  store.imageList = []
  store.selectedImageList = []
  store.requestStop = false
  initPosts()
}

export const loadPostsByPage = (toPage: string) => {
  page = Number(toPage) || 1
  store.imageList = []
  searchPosts()
}

export const loadPostsByTags = (searchTerm: string) => {
  page = 1
  tags = searchTerm
  store.imageList = []
  searchPosts()
}
