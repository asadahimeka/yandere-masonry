import type { Post } from '@himeka/booru'
import {
  allgirl,
  anihonetwallpaper,
  animepictures,
  booruAction,
  eshuushuu,
  gelbooru,
  hentaibooru,
  kusowanka,
  moebooru,
  nozomila,
  r34paheal,
  realbooru,
  rule34,
  rule34hentai,
  sankaku,
  zerochan,
} from '@/api'

interface FetchPostsAction {
  is: () => boolean
  posts: (page: number, tags: string | null) => Promise<Post[]>
}

export const fetchPostsActions: FetchPostsAction[] = [
  moebooru.popular,
  moebooru.pool,
  moebooru.yanderehtml,
  gelbooru,
  gelbooru.fav,
  rule34.fav,
  rule34.firefox,
  r34paheal,
  booruAction,
  eshuushuu,
  zerochan,
  animepictures,
  allgirl,
  hentaibooru,
  kusowanka,
  anihonetwallpaper,
  nozomila,
  sankaku.idol,
  sankaku,
  sankaku.complex,
  realbooru,
  rule34hentai,
  { is: () => true, posts: async () => [] },
]

interface FetchDetailAction {
  is: () => boolean
  detail: (id: string) => Promise<{ fileUrl?: string | null; sampleUrl?: string | null; tags?: string[] }>
}

export const fetchDetailActions: FetchDetailAction[] = [
  animepictures,
  sankaku.idol,
  sankaku,
  sankaku.complex,
  allgirl,
  hentaibooru,
  kusowanka,
]
