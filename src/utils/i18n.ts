import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zhHans from '@/locales/zh-Hans.json'
import zhHant from '@/locales/zh-Hant.json'
import en from '@/locales/en.json'
import ja from '@/locales/ja.json'
import { initialSettings } from '@/store/settings'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: initialSettings.lang || 'en',
  fallbackLocale: 'en',
  messages: {
    'zh-Hans': zhHans,
    'zh-Hant': zhHant,
    en,
    ja,
  },
})

export default i18n
