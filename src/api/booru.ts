import { search, sites } from '@himeka/booru'

const blackList = new Set(['e621.net', 'e926.net', 'hypnohub.net', 'derpibooru.org'])
export const siteDomains = Object.keys(sites).filter(e => !blackList.has(e))

const defaultLimitMap: Record<string, number> = {
  'yande.re': 40,
  'konachan.com': 21,
  'konachan.net': 21,
  'danbooru.donmai.us': 20,
  'gelbooru.com': 42,
  'rule34.xxx': 42,
  'safebooru.org': 40,
  'tbib.org': 42,
  'xbooru.com': 42,
  'rule34.paheal.net': 70,
  'realbooru.com': 42,
}
const BOORU_PAGE_LIMIT = defaultLimitMap[location.host]
const isPidSite = sites[location.host].paginate === 'pid'

export async function searchBooru(page: number, tags: string | null) {
  if (!tags || tags === 'all') tags = ''
  if (location.href.includes('konachan.net')) tags += ' rating:safe'
  return search(location.host, tags, { page, limit: BOORU_PAGE_LIMIT })
}

export function getFirstPageNo(params: URLSearchParams) {
  if (isPidSite) {
    const page = Number(params.get('pid')) || 0
    return Math.trunc(page / BOORU_PAGE_LIMIT) + 1
  }
  return Number(params.get('page')) || 1
}

export function pushPageState(pageNo: number) {
  let pageParamName = 'page'
  if (isPidSite) {
    pageParamName = 'pid'
    pageNo = (pageNo - 1) * BOORU_PAGE_LIMIT
  }
  const url = new URL(location.href)
  url.searchParams.set(pageParamName, pageNo.toString())
  history.replaceState('', '', url)
}
