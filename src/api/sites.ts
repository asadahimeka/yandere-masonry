import sitesJson from '@himeka/booru/sites.json'

/** 包内站点表用到的字段（完整结构见 packages/booru/index.d.ts） */
interface BooruPackageSite {
  insecure?: boolean
}

/**
 * `@himeka/booru` 的站点表。
 *
 * 这里只 import 纯数据 JSON（`@himeka/booru/sites.json`）而不 import 包入口，
 * 使 `vite.config.ts` 在构建期不必加载 `fast-xml-parser` / `isomorphic-unfetch`。
 * JSON 与包内 `index.mjs` 的内联数据同源，**上游更新站点表时需手动重新导出**：
 * `node -e "require('fs').writeFileSync('packages/booru/sites.json', JSON.stringify(require('@himeka/booru').sites, null, 2))"`
 */
const booruPackageSites = sitesJson as Record<string, BooruPackageSite>

/**
 * 站点元数据注册表 —— 所有站点元数据的唯一事实来源。
 *
 * 覆盖了原先散落在三处的重复数据：
 * - `src/api/booru.ts` 的 `siteDomains` / `specTitleMap` / `defaultLimitMap` /
 *   `sampleDownloadHosts` / `notPartialSupportSite` 列表 / `isSupportTagSearch` 排除列表
 * - `header.config.js` 的 `match` 数组
 *
 * 派生规则：
 * - 导航抽屉显示哪些站点 → `getNavDomains()`
 * - 站点显示标题 → `getSiteTitle()`
 * - userscript 的 @match 规则 → `getMatchPatterns()`
 * - 各站点能力开关与每页条数 → `getSiteMeta()`
 *
 * 本模块必须保持 **Node 与浏览器双端安全**：
 * 不做任何模块级的 DOM / location 访问，以便 `vite.config.ts`（构建期）
 * 与 `src/`（运行期）共用同一份数据。
 */

/** 站点元数据（所有字段可选） */
export interface SiteMeta {
  /** 站点显示标题；缺省时由 host 首段大写兜底 */
  title?: string
  /** 每页条数，默认 40 */
  pageLimit?: number
  /** 是否支持 sample 下载，默认 false */
  sampleDownload?: boolean
  /** 是否为部分支持站点（隐藏部分功能），默认 false */
  partialSupport?: boolean
  /** 是否支持 tag 搜索，默认 true */
  tagSearch?: boolean
}

/**
 * 手写维护的站点。
 *
 * 这些站点不在 @himeka/booru 包的 `sites` 里（或需要额外配置），
 * 因此在这里登记完整的元数据与 @match 规则。
 */
export interface SiteRegistration extends SiteMeta {
  /** 站点标识（用于查表） */
  key: string
  /**
   * 该站点在 `location.host` 上可能出现的形式。
   *
   * 必须与运行时真实的 `location.host` 完全一致 —— 能力开关是按
   * `location.host` 精确匹配的，www 变体要单列，否则查不到。
   */
  hosts: string[]
  /** 导航抽屉里显示/跳转的域名；`null` 表示只登记元数据、不进导航 */
  navHost?: string | null
  /** @match 规则 */
  match?: string[]
}

/**
 * 不进入导航 / @match 的包内站点。
 *
 * 与旧 `booru.ts` 的 blackList 一致。
 */
const EXCLUDED_HOSTS = new Set([
  'e621.net',
  'e926.net',
  'hypnohub.net',
  'derpibooru.org',
  'realbooru.com',
])

/**
 * 包内站点的元数据覆盖。
 *
 * 站点列表本身来自 `@himeka/booru` 包（上游新增站点会自动进入导航与
 * @match），这里只登记它没有提供的信息。
 */
const PACKAGE_SITE_META: Record<string, SiteMeta> = {
  'yande.re': { title: 'yande.re', pageLimit: 40 },
  'konachan.com': { title: 'Koanchan', pageLimit: 21 },
  'konachan.net': { title: 'Koanchan(Safe)', pageLimit: 21 },
  'danbooru.donmai.us': { pageLimit: 20 },
  'gelbooru.com': { pageLimit: 42, sampleDownload: true },
  'rule34.xxx': { pageLimit: 42, sampleDownload: true },
  'www.sakugabooru.com': { title: 'SAKUGABOORU' },
  'safebooru.org': { pageLimit: 40 },
  'tbib.org': { pageLimit: 42 },
  'xbooru.com': { pageLimit: 42 },
  'behoimi.org': { title: '3dbooru' },
  'rule34.paheal.net': { title: 'Rule34.Paheal', pageLimit: 70 },
  'booru.allthefallen.moe': { title: 'ATFBooru' },
  'aibooru.online': { title: 'AIBooru' },
}

/**
 * 手写维护的站点。
 *
 * 顺序即导航抽屉的显示顺序，与旧 `booru.ts` 的 `siteDomains` 保持一致。
 */
const MANUAL_SITES: SiteRegistration[] = [
  { key: 'e-shuushuu.net', hosts: ['e-shuushuu.net'], navHost: 'e-shuushuu.net', match: ['https://e-shuushuu.net/*'], partialSupport: true },
  { key: 'nekomaru.moe', hosts: ['nekomaru.moe'], navHost: 'nekomaru.moe', title: 'Szurubooru(Demo)', match: ['https://nekomaru.moe/*'] },
  { key: 'booru.funmaker.moe', hosts: ['booru.funmaker.moe'], navHost: 'booru.funmaker.moe', title: 'Mikubooru', match: ['https://booru.funmaker.moe/*'] },
  { key: 'zerochan.net', hosts: ['www.zerochan.net'], navHost: 'zerochan.net', match: ['https://www.zerochan.net/*'], partialSupport: true },
  { key: 'chan.sankakucomplex.com', hosts: ['chan.sankakucomplex.com'], navHost: 'chan.sankakucomplex.com', title: 'Sankaku Complex', match: ['https://chan.sankakucomplex.com/*'] },
  // 与 chan. 是同一站点，只登记标题与 @match，不进导航
  { key: 'www.sankakucomplex.com', hosts: ['www.sankakucomplex.com'], navHost: null, title: 'Sankaku Complex', match: ['https://www.sankakucomplex.com/*'] },
  { key: 'www.idolcomplex.com', hosts: ['www.idolcomplex.com'], navHost: 'www.idolcomplex.com', title: 'Idol Complex', match: ['https://www.idolcomplex.com/*'], partialSupport: true },
  { key: 'sankaku.app', hosts: ['sankaku.app'], navHost: 'sankaku.app', title: 'Sankaku APP', match: ['https://sankaku.app/*'] },
  { key: 'anime-pictures.net', hosts: ['anime-pictures.net'], navHost: 'anime-pictures.net', title: 'Anime Pictures', match: ['https://anime-pictures.net/*'], sampleDownload: true },
  { key: 'allgirl.booru.org', hosts: ['allgirl.booru.org'], navHost: 'allgirl.booru.org', title: 'All girl', match: ['https://allgirl.booru.org/*'], partialSupport: true },
  { key: 'booru.eu', hosts: ['booru.eu'], navHost: 'booru.eu', title: 'Hentai Booru', match: ['https://booru.eu/*'], partialSupport: true },
  { key: 'kusowanka.com', hosts: ['kusowanka.com'], navHost: 'kusowanka.com', match: ['https://kusowanka.com/*'], partialSupport: true },
  { key: 'anihonetwallpaper.com', hosts: ['anihonetwallpaper.com'], navHost: 'anihonetwallpaper.com', match: ['https://anihonetwallpaper.com/*'], partialSupport: true },
  { key: 'nozomi.la', hosts: ['nozomi.la'], navHost: 'nozomi.la', match: ['https://nozomi.la/*'], partialSupport: true, tagSearch: false },
  // realbooru.com 在包里但被旧 blackList 排除，此处补登记以保留导航与 @match
  { key: 'realbooru.com', hosts: ['realbooru.com'], navHost: 'realbooru.com', pageLimit: 42, partialSupport: true, match: ['https://realbooru.com/*'] },
  { key: 'rule34hentai.net', hosts: ['rule34hentai.net'], navHost: 'rule34hentai.net', title: 'Rule34Hentai', match: ['https://rule34hentai.net/*'], partialSupport: true },
  { key: 'www.uhdpaper.com', hosts: ['www.uhdpaper.com', 'uhdpaper.com'], navHost: 'www.uhdpaper.com', title: 'UHDPaper', match: ['https://www.uhdpaper.com/*', 'https://uhdpaper.com/*'] },
  { key: '16knote.com', hosts: ['16knote.com'], navHost: '16knote.com', title: '16K Note (SFW)', match: ['https://16knote.com/*'], tagSearch: false },
  { key: '16k.club', hosts: ['16k.club'], navHost: '16k.club', title: '16K Club', match: ['https://16k.club/*'], tagSearch: false },
  // rating 全为 e，且不提供批量下载 / 单图下载，故标 partialSupport
  { key: 'everia.club', hosts: ['everia.club'], navHost: 'everia.club', title: 'Everia', pageLimit: 30, match: ['https://everia.club/*'], partialSupport: true },
  // 七个语言子域结构完全一致，hosts 必须逐个列全（能力开关按 location.host 精确匹配）
  {
    key: 'hentai-cosplay-xxx.com',
    hosts: [
      'hentai-cosplay-xxx.com', 'zh.hentai-cosplay-xxx.com', 'ja.hentai-cosplay-xxx.com',
      'fr.hentai-cosplay-xxx.com', 'de.hentai-cosplay-xxx.com', 'ru.hentai-cosplay-xxx.com',
      'ko.hentai-cosplay-xxx.com', 'es.hentai-cosplay-xxx.com',
    ],
    navHost: 'hentai-cosplay-xxx.com',
    title: 'Hentai Cosplay',
    pageLimit: 32,
    match: ['https://*.hentai-cosplay-xxx.com/*', 'https://hentai-cosplay-xxx.com/*'],
  },
  {
    key: 'hentaiclub.net',
    hosts: ['www.hentaiclub.net', 'hentaiclub.net'],
    navHost: 'www.hentaiclub.net',
    title: '绅士会所',
    pageLimit: 24,
    match: ['https://www.hentaiclub.net/*', 'https://hentaiclub.net/*'],
  },
  // 原图要登录，公开的最大档是 1000w680h，故标 partialSupport（下载相关一并隐藏）
  {
    key: 'huamaobizhi.com',
    hosts: ['en.huamaobizhi.com', 'huamaobizhi.com', 'www.huamaobizhi.com'],
    navHost: 'en.huamaobizhi.com',
    title: '花猫壁纸',
    pageLimit: 24,
    match: ['https://*.huamaobizhi.com/*', 'https://huamaobizhi.com/*'],
    partialSupport: true,
  },
  // 单图壁纸站：列表 24 条/页，原图地址可由 id 推导，详情页不接管（保持站点自己的查看器）
  {
    key: 'wallhaven.cc',
    hosts: ['wallhaven.cc', 'www.wallhaven.cc'],
    navHost: 'wallhaven.cc',
    title: 'Wallhaven',
    pageLimit: 24,
    match: ['https://wallhaven.cc/*', 'https://www.wallhaven.cc/*'],
  },
  // 同人志站：列表 25 条/页，详情 `/v/{id}` 的 SSR 数据一次给全，走多图详情弹窗
  {
    key: 'cin.wtf',
    hosts: ['cin.wtf'],
    navHost: 'cin.wtf',
    title: 'cin.wtf',
    pageLimit: 25,
    match: ['https://cin.wtf/*'],
  },
  // 写真集站：只有 `/ja/photos` 是列表（24 条/页），视频与演员页留给站点自己
  {
    key: 'nanairo.co',
    // 没有 www 变体：`https://www.nanairo.co/` 连 TLS 握手都失败
    hosts: ['nanairo.co'],
    navHost: 'nanairo.co',
    title: 'nanairo',
    pageLimit: 24,
    match: ['https://nanairo.co/*'],
  },
  // cosplay 站：列表路径分页 25 条/页，图集一次给全；站点没有搜索接口，故关掉 tagSearch
  {
    key: 'galleryepic.com',
    hosts: ['galleryepic.com', 'www.galleryepic.com'],
    navHost: 'galleryepic.com',
    title: 'GalleryEpic',
    pageLimit: 25,
    tagSearch: false,
    match: ['https://galleryepic.com/*', 'https://www.galleryepic.com/*'],
  },
  // WP 图集站：列表走 REST 30 条/页，分类与搜索都用 REST 参数，帖子页留给站点
  {
    key: 'shaonvzhi.top',
    hosts: ['shaonvzhi.top', 'www.shaonvzhi.top'],
    navHost: 'shaonvzhi.top',
    title: '少女志',
    pageLimit: 30,
    match: ['https://shaonvzhi.top/*', 'https://www.shaonvzhi.top/*'],
  },
  // 图集站：列表与详情都吃站内 JSON 接口，30 条/页；接口 CORS 只认 dimtown.com，故不登记 www
  {
    key: 'dimtown.com',
    hosts: ['dimtown.com'],
    navHost: 'dimtown.com',
    title: '次元小镇',
    pageLimit: 30,
    match: ['https://dimtown.com/*'],
  },
  // WP 图集站：列表 20 条/页（`/page/N`），详情吃 REST 正文里的整篇图（一次给全）
  {
    key: 'misskon.com',
    hosts: ['misskon.com'],
    navHost: 'misskon.com',
    title: 'MissKon',
    pageLimit: 20,
    match: ['https://misskon.com/*'],
  },
]

/**
 * 规范化 host：去掉 `www.` 前缀并小写。
 *
 * 与旧 `getSiteTitle` 的 `domain.toLowerCase().replace('www.', '')` 行为一致，
 * 用于标题查找（标题不区分 www 变体）。
 */
export function normalizeHost(host: string): string {
  return host.toLowerCase().replace('www.', '')
}

/** 包内站点（已排除 EXCLUDED_HOSTS） */
const packageHosts = Object.keys(booruPackageSites).filter(host => !EXCLUDED_HOSTS.has(host))

/** 全部站点的元数据，按 `location.host` 精确匹配 */
const siteMetaByHost = new Map<string, SiteMeta>()
for (const host of packageHosts) {
  siteMetaByHost.set(host, PACKAGE_SITE_META[host] ?? {})
}
for (const site of MANUAL_SITES) {
  for (const host of site.hosts) {
    siteMetaByHost.set(host, {
      title: site.title,
      pageLimit: site.pageLimit,
      sampleDownload: site.sampleDownload,
      partialSupport: site.partialSupport,
      tagSearch: site.tagSearch,
    })
  }
}

/** 站点标题，按规范化 host 索引（不区分 www 变体） */
const siteTitleByHost = new Map<string, string>()
for (const host of packageHosts) {
  const title = PACKAGE_SITE_META[host]?.title
  if (title) siteTitleByHost.set(normalizeHost(host), title)
}
for (const site of MANUAL_SITES) {
  if (!site.title) continue
  for (const host of site.hosts) {
    siteTitleByHost.set(normalizeHost(host), site.title)
  }
}

/** 取站点的元数据；未登记的站点返回 undefined */
export function getSiteMeta(host: string): SiteMeta | undefined {
  return siteMetaByHost.get(host)
}

/** 取站点显示标题；未登记或未设标题时返回 undefined（由调用方兜底） */
export function getSiteTitle(host: string): string | undefined {
  return siteTitleByHost.get(normalizeHost(host))
}

/** 包内站点列表（@himeka/booru 提供，已排除黑名单） */
export function getBooruSiteHosts(): string[] {
  return packageHosts
}

/** 导航抽屉里显示的域名列表 */
export function getNavDomains(): string[] {
  return [
    ...packageHosts,
    ...MANUAL_SITES.filter(site => site.navHost !== null).map(site => site.navHost ?? site.key),
  ]
}

/**
 * userscript 的 @match 规则列表。
 *
 * 包内站点按包内 `insecure` 标记推导协议；手写站点用显式规则。
 */
export function getMatchPatterns(): string[] {
  const patterns: string[] = []
  for (const host of packageHosts) {
    const insecure = booruPackageSites[host]?.insecure
    patterns.push(`http${insecure ? '' : 's'}://${host}/*`)
  }
  for (const site of MANUAL_SITES) {
    if (site.match) patterns.push(...site.match)
  }
  return patterns
}
