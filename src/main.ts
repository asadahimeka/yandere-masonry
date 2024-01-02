// eslint-disable-next-line import/order
import { prepareApp } from './prepare'

import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'
import installVuetify from './plugins/vuetify'
import i18n from './utils/i18n'
import WfLayout from './components/WfLayout.vue'
import VirtualWaterfall from './components/VirtualWaterfall.vue'
import App from './App.vue'

function initApp() {
  Vue.use(VueMasonry)
  Vue.component('WfLayout', WfLayout)
  Vue.component('VirtualWaterfall', VirtualWaterfall)
  const vuetify = installVuetify()
  const app = new Vue({
    vuetify,
    i18n,
    render: h => h(App),
  })
  app.$mount('#app')
}

prepareApp(initApp)
