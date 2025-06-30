import type { Post } from '@himeka/booru'
import { getFirstPageNo } from './_util'
import store from '@/store'
import { isBooruSite, searchBooru } from '@/api/booru'
import { fetchPostsByHtml, fetchPostsByPath, isPoolShowPage, isPopularPage, isYandereHtml } from '@/api/moebooru'
import { fetchRule34Favorites, fetchRule34Posts, isRule34FavPage, isRule34Firefox } from '@/api/rule34'
import { fetchGelbooruFavorites, fetchGelbooruPosts, isGelbooruFavPage, isGelbooruPage } from '@/api/gelbooru'
import { fetchEshuushuuPosts, isEshuushuuPage } from '@/api/e-shuushuu'
import { fetchZerochanPosts, isZerochanPage } from '@/api/zerochan'
import { fetchSankakuPosts, isSankakuPage } from '@/api/sankaku'
import { fetchSankakuIdolPosts, isSankakuIdolPage } from '@/api/sankaku-idol'
import { fetchSankakuComplexPosts, isSankakuComplexPage } from '@/api/sankaku-complex'
import { fetchAnimePicturesPosts, isAnimePicturesPage } from '@/api/anime-pictures'
import { fetchAllGirlPosts, isAllGirlPage } from '@/api/all-girl'
import { fetchHentaiBooruPosts, isHentaiBooruPage } from '@/api/hentaibooru'
import { fetchKusowankaPosts, isKusowankaPage } from '@/api/kusowanka'
import { fetchAnihonetwallpaperPosts, isAnihonetwallpaperPage } from '@/api/anihonetwallpaper'
import { fetchNozomiPosts, isNozomiPage } from '@/api/nozomi.js'
import { fetchR34PahealPosts, isR34PahealPage } from '@/api/r34-paheal'
import { fetchRealbooruPosts, isRealbooruPage } from '@/api/realbooru'

const params = new URLSearchParams(location.search)
const query = {
  page: getFirstPageNo(params),
  tags: params.get('tags'),
}
export const getSearchState = () => query
export const setPage = (page: number) => query.page = page
export const setTags = (tags: string) => query.tags = tags

interface FetchActionItem {
  test: () => boolean
  action: () => Promise<Post[]>
}

export const fetchActions: FetchActionItem[] = [
  {
    test: isPopularPage,
    action: async () => {
      const results = await fetchPostsByPath()
      store.requestStop = true
      return results
    },
  },
  {
    test: isPoolShowPage,
    action: async () => {
      const results = await fetchPostsByPath('posts', query.page)
      return query.tags ? results.tagged(query.tags) : results
    },
  },
  {
    test: isYandereHtml,
    action: async () => {
      const results = await fetchPostsByHtml(query.page, query.tags)
      return results
    },
  },
  {
    test: isGelbooruFavPage,
    action: async () => {
      const results = await fetchGelbooruFavorites(query.page)
      return results
    },
  },
  {
    test: isGelbooruPage,
    action: async () => {
      const results = await fetchGelbooruPosts(query.page)
      return results
    },
  },
  {
    test: isRule34FavPage,
    action: async () => {
      const results = await fetchRule34Favorites(query.page)
      return results
    },
  },
  {
    test: isRule34Firefox,
    action: async () => {
      const results = await fetchRule34Posts(query.page, query.tags)
      return results
    },
  },
  {
    test: isR34PahealPage,
    action: async () => {
      const results = await fetchR34PahealPosts(query.page, query.tags)
      return results
    },
  },
  {
    test: isBooruSite,
    action: async () => {
      let { tags } = query
      if (store.settings.isHoldsFalse) tags = `holds:false ${tags || ''}`.trim()
      const results = await searchBooru(query.page, tags)
      if (location.hostname == 'rule34.xxx') {
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
  },
  {
    test: isEshuushuuPage,
    action: async () => {
      const results = await fetchEshuushuuPosts(query.page)
      return results
    },
  },
  {
    test: isZerochanPage,
    action: async () => {
      const results = await fetchZerochanPosts(query.page, query.tags)
      return results
    },
  },
  {
    test: isAnimePicturesPage,
    action: async () => {
      const results = await fetchAnimePicturesPosts(query.page, query.tags)
      return results
    },
  },
  {
    test: isAllGirlPage,
    action: async () => {
      const results = await fetchAllGirlPosts(query.page, query.tags)
      return results
    },
  },
  {
    test: isHentaiBooruPage,
    action: async () => {
      const results = await fetchHentaiBooruPosts(query.page, query.tags)
      return results
    },
  },
  {
    test: isKusowankaPage,
    action: async () => {
      const results = await fetchKusowankaPosts(query.page, query.tags)
      return results
    },
  },
  {
    test: isAnihonetwallpaperPage,
    action: async () => {
      const results = await fetchAnihonetwallpaperPosts(query.page, query.tags)
      return results
    },
  },
  {
    test: isNozomiPage,
    action: async () => {
      const results = await fetchNozomiPosts(query.page)
      return results
    },
  },
  {
    test: isSankakuIdolPage,
    action: async () => {
      const results = await fetchSankakuIdolPosts(query.page, query.tags)
      return results
    },
  },
  {
    test: isSankakuPage,
    action: async () => {
      const results = await fetchSankakuPosts(query.page, query.tags)
      return results
    },
  },
  {
    test: isSankakuComplexPage,
    action: async () => {
      const results = await fetchSankakuComplexPosts(query.page, query.tags)
      return results
    },
  },
  {
    test: isRealbooruPage,
    action: async () => {
      const results = await fetchRealbooruPosts(query.page, query.tags)
      return results
    },
  },
  {
    test: () => true,
    action: async () => [],
  },
]
