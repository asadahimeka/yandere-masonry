import type { SearchResults } from '@himeka/booru'
import { settings } from '@/store'
import { allgirl, nozomila, rule34 } from '@/api'
import { BOORU_PAGE_LIMIT, isPidSite } from '@/api/booru'
import { getCookie } from '@/utils'

export function getFirstPageNo(params: URLSearchParams) {
  if (isPidSite()) {
    const page = Number(params.get('pid')) || 0
    return Math.trunc(page / BOORU_PAGE_LIMIT) + 1
  }
  return Number(params.get('page')) || 1
}

export function pushPageState(pageNo: number, latePageQuery = false) {
  if (rule34.fav.is() || allgirl.is() || nozomila.is()) return
  let pageParamName = 'page'
  if (isPidSite()) {
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
  if (rule34.is() && !results.__isR34Fav) {
    if (getCookie('filter_ai') == '1') {
      results = results.filter(e => !e.tags.includes('ai_assisted') && !e.tags.includes('ai_generated')) as any
    }
    const threshold = +getCookie('post_threshold')
    if (threshold > 0) {
      results = results.filter(e => e.score ? +e.score >= threshold : true) as any
    }
  }
  if (!settings.blacklist.length) return results
  return typeof results.blacklist == 'function'
    ? results.blacklist(settings.blacklist)
    : results.filter(e => {
      const tags = e.tags.map(t => t.toLowerCase())
      return !settings.blacklist.some(w => tags.includes(w.toLowerCase()))
    })
}
