<template>
  <v-navigation-drawer v-model="store.showDrawer" app temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Booru Masonry
        </v-list-item-title>
        <v-list-item-subtitle>Booru sites waterfall layout.</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Site List
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="link in siteLinks" :key="link" :href="`https://${link}?_wf=1`">
        <v-list-item-content>
          <v-list-item-title>{{ link.toUpperCase() }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            About
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="openLink('https://github.com/asadahimeka/yandere-masonry')">
        <v-list-item-icon class="mr-2">
          <v-icon>mdi-github</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Github</v-list-item-title>
          <v-list-item-subtitle>yandere-masonry</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="openLink('https://github.com/coderzhaoziwei/yande-re-chinese-patch')">
        <v-list-item-icon class="mr-2">
          <v-icon>mdi-source-fork</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Fork from</v-list-item-title>
          <v-list-item-subtitle>yande-re-chinese-patch</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from '@vue/composition-api'
import store from '@/common/store'
import { siteDomains } from '@/common/site-list'

const siteLinks = ref(siteDomains)

const openLink = (link: string) => {
  window.open(link, '_blank', 'noreferrer')
}
</script>
