import * as api from '@/api'

/**
 * 站点行为注册表 —— 列表与详情共用的唯一登记处。
 *
 * 顺序即分发优先级：`is()` 自上而下第一个命中且具备对应能力的生效，
 * 末尾是兜底空实现。专用适配器必须排在 `booruAction`（包站通用实现）之前。
 * 同一 host 的子适配器（gelbooru/gelbooru.fav、rule34.fav/rule34.firefox、
 * sankaku 三变体、moebooru 各页）靠 URL/路径互斥，相对顺序不可调换。
 */
export const siteActions: api.SiteAdapter[] = [
  api.moebooru.popular,
  api.moebooru.pool,
  api.moebooru.yanderehtml,
  api.gelbooru,
  api.gelbooru.fav,
  api.rule34.fav,
  api.rule34.firefox,
  api.r34paheal,
  api.booruAction,
  api.eshuushuu,
  api.zerochan,
  api.animepictures,
  api.allgirl,
  api.hentaibooru,
  api.kusowanka,
  api.anihonetwallpaper,
  api.nozomila,
  api.sankaku.idol,
  api.sankaku,
  api.sankaku.complex,
  api.szurubooru,
  api.mikubooru,
  api.realbooru,
  api.rule34hentai,
  api.uhdpaper,
  api.sixteenKNote,
  api.sixteenKClub,
  // 同一 host 的两个视图靠路径互斥：列表页抓站点列表，文章页把整篇图当成瀑布流条目
  api.everia.list,
  api.everia.post,
  // hentai-cosplay-xxx：列表页弹层看整组图（images 回填到缩略条），详情页直开时喂瀑布流
  api.hentaiCosplay,
  api.hentaiclub.list,
  api.hentaiclub.post,
  // huamao：合集是另一套多图详情，列表页弹层 + /mix/{id} 直开两种入口
  api.huamao.list,
  api.huamao.mix,
  // wallhaven：只接管列表型页面（/latest /hot /toplist /random /search），
  // 单图页与用户页交给站点自己
  api.wallhaven,
  // cin.wtf：列表 25 条/页，详情弹窗吃 `/v/{id}` 的 SSR 页数组
  api.cin,
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
