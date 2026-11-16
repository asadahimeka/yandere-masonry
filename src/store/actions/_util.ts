import type { SearchResults } from '@himeka/booru'
import { settings } from '@/store'
import { allgirl, isEveria, isHentaiCosplay, isHentaiclub, nozomila, rule34, szurubooru, uhdpaper } from '@/api'
import { BOORU_PAGE_LIMIT, isPidSite } from '@/api/booru'
import { getCookie } from '@/utils'

export function getFirstPageNo(params: URLSearchParams) {
  if (isPidSite()) {
    const page = Number(params.get('pid')) || 0
    return Math.trunc(page / BOORU_PAGE_LIMIT) + 1
  }
  // everia 靠路径 /page/N/ 翻页，URL 里的 page 参数只是临时态，刷新时要从路径还原
  if (isEveria()) {
    return Number(location.pathname.match(/\/page\/(\d+)\/?$/)?.[1]) || 1
  }
  // hentai-cosplay-xxx 同为路径翻页（/search/page/2/、/search/tag/x/page/2/）
  if (isHentaiCosplay()) {
    return Number(location.pathname.match(/\/page\/(\d+)\/?$/)?.[1]) || 1
  }
  // hentaiclub：首页 /page/2/，分区 /sort/r15.html/2/（页码在 .html 之后）
  if (isHentaiclub()) {
    return Number(location.pathname.match(/\/(?:page\/)?(\d+)\/?$/)?.[1]) || 1
  }
  return Number(params.get('page')) || 1
}

export function pushPageState(pageNo: number, latePageQuery = false) {
  if (rule34.fav.is() || allgirl.is() || nozomila.is()) return
  // uhdpaper 靠 ?updated-max= 游标翻页，URL 里不写 page（否则会把站点搜索地址弄脏）
  if (uhdpaper.is()) return
  // szurubooru 用 offset 分页，站点自身不认 ?page=，写进 URL 只会把搜索地址弄脏
  if (szurubooru.is()) return
  // everia 靠路径 /page/N/ 翻页；文章页更不能写 page，否则刷新会从中间一块开始
  if (isEveria()) return
  // hentai-cosplay-xxx / hentaiclub 同样是路径翻页（page/N/、sort/r15.html/N/），
  // 写 ?page= 既不被站点识别，也会污染地址栏
  if (isHentaiCosplay() || isHentaiclub()) return
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

export function handleBlacklist(results: SearchResults & { __isR34Fav?: boolean }) {
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
