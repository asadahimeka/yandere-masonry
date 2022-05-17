<template>
  <v-app-bar app dense>
    <v-app-bar-nav-icon @click="store.toggleDrawer" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-btn icon @click="toggleDarkmode">
      <v-icon>mdi-brightness-6</v-icon>
    </v-btn>
    <v-progress-linear
      :active="store.requestState"
      :height="6"
      color="deep-purple accent-4"
      indeterminate
      absolute
      bottom
    />
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from '@vue/composition-api'
import { useVuetify } from '@/plugins/vuetify'
import store from '@/common/store'

const title = computed(() => {
  const { 0: img, length } = store.imageList
  if (img) return `${img.booru.domain.toUpperCase()} - ${length} Posts - Page ${store.currentPage}`
  return '🚂'
})

const vuetify = useVuetify()

const toggleDarkmode = () => {
  vuetify.theme.dark = !vuetify.theme.dark
  localStorage.setItem('__darkmode', vuetify.theme.dark ? 'dark' : 'light')
}
</script>
