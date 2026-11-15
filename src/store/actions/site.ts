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
  mikubooru,
  moebooru,
  nozomila,
  r34paheal,
  realbooru,
  rule34,
  rule34hentai,
  sankaku,
  sixteenKClub,
  sixteenKNote,
  szurubooru,
  uhdpaper,
  zerochan,
} from '@/api'
import type { PostImage } from '@/api/16k'

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
  szurubooru,
  mikubooru,
  realbooru,
  rule34hentai,
  uhdpaper,
  sixteenKNote,
  sixteenKClub,
  { is: () => true, posts: async () => [] },
]

interface FetchDetailAction {
  is: () => boolean
  detail: (id: string) => Promise<{ fileUrl?: string | null; sampleUrl?: string | null; tags?: string[]; source?: string | null; images?: PostImage[]; title?: string }>
}

export const fetchDetailActions: FetchDetailAction[] = [
  uhdpaper,
  animepictures,
  sankaku.idol,
  sankaku,
  sankaku.complex,
  allgirl,
  hentaibooru,
  kusowanka,
  mikubooru,
  sixteenKNote,
  sixteenKClub,
]
