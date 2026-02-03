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
