import { search, sites } from '@himeka/booru'
import store from '@/store'

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

export const BOORU_PAGE_LIMIT = defaultLimitMap[location.host] || 40

export const isPidSite = sites[location.host]?.paginate === 'pid'

export async function searchBooru(page: number, tags: string | null) {
  if (!tags || tags === 'all') tags = ''
  return search(location.host, tags, { page, limit: BOORU_PAGE_LIMIT, credentials: { query: store.settings.credentialQuery } })
}
