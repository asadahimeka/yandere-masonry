import type { SearchResults } from '@himeka/booru'
import store from '@/store'
import { BOORU_PAGE_LIMIT, isPidSite } from '@/api/booru'
import { isRule34FavPage } from '@/api/rule34'
import { isAllGirlPage } from '@/api/all-girl'
import { isNozomiPage } from '@/api/nozomi'
import { getCookie } from '@/utils'

export function getFirstPageNo(params: URLSearchParams) {
  if (isPidSite) {
    const page = Number(params.get('pid')) || 0
    return Math.trunc(page / BOORU_PAGE_LIMIT) + 1
  }
  return Number(params.get('page')) || 1
}

export function pushPageState(pageNo: number, latePageQuery = false) {
  if (isRule34FavPage() || isAllGirlPage() || isNozomiPage()) return
  let pageParamName = 'page'
  if (isPidSite) {
    pageParamName = 'pid'
    pageNo = (pageNo - 1) * BOORU_PAGE_LIMIT
  } else if (latePageQuery && pageNo > 1) {
    pageNo -= 1
  }
  const url = new URL(location.href)
  url.searchParams.set(pageParamName, pageNo.toString())
  history.replaceState('', '', url)
}

export function dealBlacklist(results: SearchResults & { __isR34Fav?: boolean }) {
  if (location.hostname == 'rule34.xxx' && !results.__isR34Fav) {
    if (getCookie('filter_ai') == '1') {
      results = results.filter(e => !e.tags.includes('ai_assisted') && !e.tags.includes('ai_generated')) as any
    }
    const threshold = +getCookie('post_threshold')
    if (threshold > 0) {
      results = results.filter(e => e.score ? +e.score >= threshold : true) as any
    }
  }
  if (!store.blacklist.length) return results
  return typeof results.blacklist == 'function'
    ? results.blacklist(store.blacklist)
    : results.filter(e => {
      const tags = e.tags.map(t => t.toLowerCase())
      return !store.blacklist.some(w => tags.includes(w.toLowerCase()))
    })
}
