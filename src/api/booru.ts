import { search, sites } from '@himeka/booru'
import { isSankakuSite } from './sankaku'
import { isMikubooru } from './mikubooru'
import { isConfiguredSzuruDomain, szurubooru } from './szurubooru'
import { getBooruSiteHosts, getNavDomains, getSiteTitle as getRegisteredSiteTitle, getSiteMeta } from './sites'
import { everiaPresetTags, isEveriaList } from './everia'
import { animepictures, realbooru, rule34 } from '@/api'
import { settings, store } from '@/store'

const siteKeys = getBooruSiteHosts()
export const isBooruSite = () => siteKeys.includes(location.host)

/** 导航抽屉里显示的站点域名 */
export const siteDomains = getNavDomains()

export const isSupportTagSearch = isBooruSite() || getSiteMeta(location.host)?.tagSearch !== false
export const notPartialSupportSite = getSiteMeta(location.host)?.partialSupport !== true

export const isSampleDownloadSupportedSite = () => {
  return notPartialSupportSite && (isBooruSite() || getSiteMeta(location.host)?.sampleDownload === true)
}

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
  if (szurubooru.is()) {
    return [
      'safety:safe', 'safety:sketchy', 'safety:unsafe',
      'sort:random', 'sort:score', 'sort:fav-count', 'sort:tag-count', 'sort:comment-count', 'sort:last-edit',
      'type:image', 'type:animation', 'type:video',
    ]
  }
  if (isMikubooru()) {
    return [
      'rating:safe', 'rating:questionable', 'rating:explicit',
      'order:date_desc', 'order:id_desc', 'order:score_desc', 'order:size_desc',
    ]
  }
  // everia 没有标签体系，搜索框里放的是站内分类（首页 / 日本 / 韩国 …）
  if (isEveriaList()) return everiaPresetTags
  return []
})()

export function getSiteTitle(domain: string = location.host) {
  const host = domain.toLowerCase().replace('www.', '')
  const title = getRegisteredSiteTitle(domain)
  if (title) return title
  if (isConfiguredSzuruDomain(host)) return 'Szurubooru'
  return host[0].toUpperCase() + host.slice(1).split('.')[0]
}

export const BOORU_PAGE_LIMIT = getSiteMeta(location.host)?.pageLimit || 40

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
