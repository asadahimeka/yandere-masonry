import { search, sites } from '@himeka/booru'
import { isSankakuSite } from './sankaku'
import { animepictures, realbooru, rule34 } from '@/api'
import { settings, store } from '@/store'

const blackList = new Set(['e621.net', 'e926.net', 'hypnohub.net', 'derpibooru.org', 'realbooru.com'])
const siteKeys = Object.keys(sites).filter(e => !blackList.has(e))
export const isBooruSite = () => siteKeys.includes(location.host)

export const siteDomains = [
  ...siteKeys,
  'e-shuushuu.net',
  'zerochan.net',
  'chan.sankakucomplex.com',
  // 'idol.sankakucomplex.com',
  'www.idolcomplex.com',
  'sankaku.app',
  'anime-pictures.net',
  'allgirl.booru.org',
  'booru.eu',
  'kusowanka.com',
  'anihonetwallpaper.com',
  'nozomi.la',
  'realbooru.com',
  'rule34hentai.net',
]

export const isSupportTagSearch = isBooruSite() || !['e-shuushuu.net', 'nozomi.la'].includes(location.host)
export const notPartialSupportSite = !([
  'e-shuushuu.net',
  'www.zerochan.net',
  // 'idol.sankakucomplex.com',
  'www.idolcomplex.com',
  'allgirl.booru.org',
  'booru.eu',
  'kusowanka.com',
  'anihonetwallpaper.com',
  'nozomi.la',
  'realbooru.com',
  'rule34hentai.net',
].includes(location.host))

export const defCompTags = (() => {
  if (store.isYKSite) {
    return ['rating:s', 'rating:q', 'rating:e', 'order:score', 'order:vote', 'order:mpixels', 'order:landscape', 'order:portrait']
  }
  if (isSankakuSite) {
    return ['order:quality', 'order:popularity', 'order:random', 'order:recently_favorited', 'order:recently_voted', 'rating:s', 'rating:q', 'rating:e', 'threshold:0', 'threshold:1', 'threshold:2', 'threshold:3', 'threshold:4', 'threshold:5', 'sankaku_ai order:popular']
  }
  if (animepictures.is()) {
    return ['order_by:date', 'order_by:date_r', 'order_by:rating', 'order_by:views', 'order_by:size', 'order_by:tag_num']
  }
  if (location.host.includes('danbooru')) {
    return ['order:rank', 'order:score', 'order:favcount', 'order:none', 'order:upvotes', 'rating:general', 'rating:questionable', 'rating:explicit', 'rating:sensitive', 'order:landscape', 'order:portrait', 'order:mpixels']
  }
  if (/gelbooru\.com|rule34\.xxx/.test(location.host)) {
    return ['rating:safe', 'rating:questionable', 'rating:explicit', 'sort:score']
  }
  return []
})()

const specTitleMap: Record<string, string> = {
  'yande.re': 'yande.re',
  'konachan.com': 'Koanchan',
  'konachan.net': 'Koanchan(Safe)',
  'sakugabooru.com': 'sakugabooru'.toUpperCase(),
  'behoimi.org': '3dbooru',
  'rule34.paheal.net': 'Rule34.Paheal',
  'booru.allthefallen.moe': 'ATFBooru',
  'aibooru.online': 'AIBooru',
  'sankaku.app': 'Sankaku APP',
  'www.sankakucomplex.com': 'Sankaku Complex',
  'chan.sankakucomplex.com': 'Sankaku Complex',
  'www.idolcomplex.com': 'Idol Complex',
  'anime-pictures.net': 'Anime Pictures',
  'allgirl.booru.org': 'All girl',
  'booru.eu': 'Hentai Booru',
  'rule34hentai.net': 'Rule34Hentai',
}

export function getSiteTitle(domain: string = location.host) {
  const host = domain.toLowerCase().replace('www.', '')
  return specTitleMap[host] || (host[0].toUpperCase() + host.slice(1).split('.')[0])
}

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

export const isPidSite = () => sites[location.host]?.paginate === 'pid' || realbooru.is()

export async function searchBooru(page: number, tags: string | null) {
  if (!tags || tags === 'all') tags = ''
  return search(location.host, tags, {
    page,
    limit: BOORU_PAGE_LIMIT,
    credentials: {
      query: settings.credentialQuery,
    },
  })
}

export const booruAction = {
  is: isBooruSite,
  posts: async (page: number, tags: string | null) => {
    if (settings.isHoldsFalse) tags = `holds:false ${tags || ''}`.trim()
    const results = await searchBooru(page, tags)
    if (rule34.is()) {
      results.forEach(e => {
        const re = /api-cdn[^.]*\./
        if (e.previewUrl) e.previewUrl = e.previewUrl.replace(re, '')
        if (e.sampleUrl) e.sampleUrl = e.sampleUrl.replace(re, '')
        if (e.fileUrl) e.fileUrl = e.fileUrl.replace(re, '')
      })
    }
    if (location.hostname == 'xbooru.com') {
      results.forEach(e => {
        const args = [/api-cdn(-mp4)?\.rule34\.xxx/, 'xbooru.com'] as const
        if (e.previewUrl) e.previewUrl = e.previewUrl.replace(...args)
        if (e.sampleUrl) e.sampleUrl = e.sampleUrl.replace(...args)
        if (e.fileUrl) e.fileUrl = e.fileUrl.replace(...args)
      })
    }
    return results
  },
}
