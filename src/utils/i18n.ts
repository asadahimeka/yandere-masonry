import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zhHans from '@/locales/zh-Hans.json'
import zhHant from '@/locales/zh-Hant.json'
import en from '@/locales/en.json'
import ja from '@/locales/ja.json'

Vue.use(VueI18n)

const langMap: Record<string, string> = {
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
const language = localStorage.getItem('__LANG') || langMap[navigator.language]
console.log('language: ', language)

const i18n = new VueI18n({
  locale: language || 'en',
  fallbackLocale: 'en',
  messages: {
    'zh-Hans': zhHans,
    'zh-Hant': zhHant,
    en,
    ja,
  },
})

export default i18n
