// Styles
// import '@mdi/font/css/materialdesignicons.css'
// import 'vuetify/dist/vuetify.min.css'

import Vue, { getCurrentInstance } from 'vue'
import Vuetify from 'vuetify'
// import { loadFonts } from './webfontloader'

// loadFonts()

function installVuetify() {
  Vue.use(Vuetify)
  return new Vuetify({
    icons: {
      iconfont: 'mdiSvg',
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#1a73e8',
          accent: '#c2e7ff',
        },
        dark: {
          primary: '#BA68C8',
          accent: '#FF80AB',
        },
      },
    },
  })
}

export default installVuetify

/** Get vuetify instance (For Composition api) */
export function useVuetify() {
  /** Get Instance */
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('Should be used in setup().')
  }
  return instance.proxy.$vuetify
}
