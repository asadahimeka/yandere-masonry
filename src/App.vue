<template>
  <v-app>
    <AppBar />
    <NavDrawer />
    <v-main app>
      <AppContainer />
      <SettingsDrawer />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { onMounted } from 'vue'
import AppBar from './components/AppBar.vue'
import NavDrawer from './components/NavDrawer.vue'
import SettingsDrawer from './components/SettingsDrawer.vue'
import AppContainer from './components/AppContainer.vue'
import { useVuetify } from './plugins/vuetify'

const vuetify = useVuetify()

onMounted(() => {
  const mode = localStorage.getItem('__darkmode') || 'light'
  vuetify.theme.dark = mode === 'dark'
})
</script>
