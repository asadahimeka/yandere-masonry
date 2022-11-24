// eslint-disable-next-line import/order
import { prepareApp } from './prepare'

import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'
import installVuetify from './plugins/vuetify'
import WfLayout from './components/WfLayout.vue'
import App from './App.vue'

function initApp() {
  Vue.use(VueMasonry, { name: 'v-masonry' })
  Vue.component('WfLayout', WfLayout)
  const vuetify = installVuetify()
  const app = new Vue({
    vuetify,
    render: h => h(App),
  })
  app.$mount('#app')
}

prepareApp(initApp)
