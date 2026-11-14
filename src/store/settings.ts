import type { DownloadUrlKey } from '@/utils/download-source'

export interface SzurubooruConfig {
  domain: string
  username: string
  token: string
}

export const langList = [
  { value: 'zh-Hans', label: '简体中文' },
  { value: 'zh-Hant', label: '繁體中文' },
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' },
] as const

const langMap: Record<string, typeof langList[number]['value']> = {
  'zh': 'zh-Hans',
  'zh-CN': 'zh-Hans',
  'zh-TW': 'zh-Hant',
  'zh-HK': 'zh-Hant',
  'zh-MO': 'zh-Hant',
  'zh-SG': 'zh-Hans',
  'ja': 'ja',
  'ja-JP': 'ja',
  'en': 'en',
  'en-US': 'en',
  'en-GB': 'en',
}

const isMobile = navigator.userAgent.includes('Mobile')
const defaultSettings = {
  lang: langMap[navigator.language] || 'en',
  darkMode: 'light' as 'light' | 'dark',
  blacklist: localStorage.getItem('__blacklist')?.split(',').filter(Boolean) || [] as string[],
  selectedColumn: '0',
  showNSFWContents: true,
  isListenWheelEvent: true,
  isFullImgPreload: false,
  imgPreloadNum: 1,
  masonryLayout: 'masonry' as 'masonry' | 'grid' | 'justified' | 'virtual' | 'masonry2',
  isListenKeyupEvent: true,
  credentialQuery: '',
  isThumbSampleUrl: false,
  showPostCheckbox: false,
  useFancybox: false,
  isHoldsFalse: false,
  isYandereFetchByHtml: false,
  showListPostReso: false,
  isFitScreen: true,
  isDLSubpath: false,
  autoWaterfall: false,
  showTagChipGroup: false,
  justifiedBaseWidth: isMobile ? 240 : 340,
  detailButtonsBottom: isMobile,
  closePopupOnImgClick: isMobile,
  downloadBy: 'tm' as 'tm' | 'fsa' | 'newtab',
  downloadUrlKey: 'fileUrl' as DownloadUrlKey,
  // szurubooru 自部署支持：多站点配置（域名/凭据），存 GM 存储（脚本级、跨域名共享），localStorage 仅作副本
  szurubooruConfigs: [] as SzurubooruConfig[],
}

export const initialSettings: typeof defaultSettings = {
  ...defaultSettings,
  ...(() => {
    try {
      return JSON.parse(localStorage.getItem('YM_APP_SETTINGS') || '{}')
    } catch (err) {
      return {}
    }
  })(),
}

// szurubooru 配置以 GM 存储为准（脚本级共享，任意站点配置后全局生效），覆盖 localStorage 值
if (typeof GM_getValue === 'function') {
  try {
    const raw = GM_getValue('ym_szurubooruConfigs')
    if (typeof raw === 'string') {
      const arr = JSON.parse(raw)
      if (Array.isArray(arr)) initialSettings.szurubooruConfigs = arr
    } else {
      // 迁移旧版单站点字段
      const domain = GM_getValue('ym_szurubooruDomain')
      if (typeof domain === 'string' && domain) {
        initialSettings.szurubooruConfigs = [{
          domain,
          username: typeof GM_getValue('ym_szurubooruUsername') === 'string' ? GM_getValue('ym_szurubooruUsername') : '',
          token: typeof GM_getValue('ym_szurubooruToken') === 'string' ? GM_getValue('ym_szurubooruToken') : '',
        }]
      }
    }
  } catch (error) {
    console.warn('[YM] failed to read szurubooru configs:', error)
  }
}
