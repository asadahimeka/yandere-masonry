// eslint-disable-next-line import/order
import { prepareApp } from './prepare'

import Vue from 'vue'
import VueMasonry from '@himeka/masonry-css'
import TrueMasonry from '@himeka/masonry-true'
import VirtualWaterfall from '@himeka/virtual-waterfall'
import installVuetify from './plugins/vuetify'
import i18n from './utils/i18n'
import WfLayout from './components/WfLayout.vue'
import App from './App.vue'

function initApp() {
  Vue.component('Masonry', VueMasonry)
  Vue.component('TrueMasonry', TrueMasonry)
  Vue.component('VirtualWaterfall', VirtualWaterfall)
  Vue.component('WfLayout', WfLayout)
  const vuetify = installVuetify()
  const app = new Vue({
    vuetify,
    i18n,
    render: h => h(App),
  })
  app.$mount('#app')
}

prepareApp(initApp)
