import type { SearchResults } from '@himeka/booru'
import store from '@/store'
import { BOORU_PAGE_LIMIT, isPidSite } from '@/api/booru'
import { isRule34FavPage } from '@/api/rule34'
import { isAllGirlPage } from '@/api/all-girl'
import { isNozomiPage } from '@/api/nozomi'

export function getFirstPageNo(params: URLSearchParams) {
  if (isPidSite) {
    const page = Number(params.get('pid')) || 0
    return Math.trunc(page / BOORU_PAGE_LIMIT) + 1
  }
  return Number(params.get('page')) || 1
}

export function pushPageState(pageNo: number, latePageQuery = false) {
  if (isRule34FavPage() || isAllGirlPage() || isNozomiPage()) return
  if (latePageQuery && pageNo > 1) pageNo -= 1
  let pageParamName = 'page'
  if (isPidSite) {
    pageParamName = 'pid'
    pageNo = (pageNo - 1) * BOORU_PAGE_LIMIT
  }
  const url = new URL(location.href)
  url.searchParams.set(pageParamName, pageNo.toString())
  history.replaceState('', '', url)
}

export function dealBlacklist(results: SearchResults) {
  if (!store.blacklist.length) return results
  return typeof results.blacklist == 'function'
    ? results.blacklist(store.blacklist)
    : results.filter((e: any) => {
      const tags = e.tags.map((t: string) => t.toLowerCase())
      return !store.blacklist.some(w => tags.includes(w.toLowerCase()))
    })
}
