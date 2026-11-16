import {
  type SiteAdapter,
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

/**
 * 站点行为注册表 —— 列表与详情共用的唯一登记处。
 *
 * 顺序即分发优先级：`is()` 自上而下第一个命中且具备对应能力的生效，
 * 末尾是兜底空实现。专用适配器必须排在 `booruAction`（包站通用实现）之前。
 * 同一 host 的子适配器（gelbooru/gelbooru.fav、rule34.fav/rule34.firefox、
 * sankaku 三变体、moebooru 各页）靠 URL/路径互斥，相对顺序不可调换。
 */
export const siteActions: SiteAdapter[] = [
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

if (import.meta.env.DEV) {
  // 自检：既没有 posts 也没有 detail 的死条目
  siteActions.forEach((adapter, index) => {
    if (!adapter.posts && !adapter.detail) {
      console.warn(`[siteActions] 第 ${index} 项既无 posts 也无 detail，永远不会被分发到`)
    }
  })
  // 自检：detail 适配器按设计 host 互斥，同页命中多个说明判定写重了
  // （posts 不做此检查：booruAction 与专用适配器同页命中属于有意的优先级设计）
  const detailHits = siteActions
    .map((adapter, index) => ({ adapter, index }))
    .filter(({ adapter }) => adapter.detail && adapter.is())
  if (detailHits.length > 1) {
    console.warn(`[siteActions] ${location.host} 上多个 detail 适配器同时命中:`, detailHits.map(e => e.index))
  }
}
