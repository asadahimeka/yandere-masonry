<template>
  <v-navigation-drawer v-model="store.showDrawer" app temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Booru Masonry</v-list-item-title>
        <v-list-item-subtitle>Booru sites waterfall layout.</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list v-if="userName" dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Shortcuts</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/user/home">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiAccount }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Hello {{ userName }}!</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link :href="`/post?tags=vote%3A3%3A${userName}+order%3Avote&_wf=1`">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiStar }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>My Favorites</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/post/popular_recent?period=1d">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiFire }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Popular(Last 24 hours)</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/post/popular_recent?period=1w">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiFire }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Popular(Last week)</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/post/popular_recent?period=1m">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiFire }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Popular(Last month)</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/post/popular_recent?period=1y">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiFire }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Popular(Last year)</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/post?tags=order%3Arandom&page=1">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiShuffle }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Random</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Site List</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="link in siteLinks" :key="link" :href="dealLink(link)">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiArrowRightCircleOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ link.toUpperCase() }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">About</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiInformationOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>v{{ version }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="openLink('https://github.com/asadahimeka/yandere-masonry')">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiGithub }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Github</v-list-item-title>
          <v-list-item-subtitle>yandere-masonry</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="openLink('https://github.com/coderzhaoziwei/yande-re-chinese-patch')">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiSourceFork }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Forked from</v-list-item-title>
          <v-list-item-subtitle>yande-re-chinese-patch</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {
  mdiAccount,
  mdiArrowRightCircleOutline,
  mdiFire,
  mdiGithub,
  mdiInformationOutline,
  mdiShuffle,
  mdiSourceFork,
  mdiStar,
} from '@mdi/js'
import { onMounted, ref } from '@vue/composition-api'
import { siteDomains } from '@/api/booru'
import { getUsername } from '@/api/moebooru'
import store from '@/store'

const siteLinks = ref(siteDomains)
const userName = ref('')
const version = ref(GM_info.script.version)

const openLink = (link: string) => {
  window.open(link, '_blank', 'noreferrer')
}

const dealLink = (link: string) => {
  return `https://${link.includes('yande') ? `${link}/post` : link}?_wf=1`
}

onMounted(async () => {
  if (store.isYKSite) {
    const name = await getUsername()
    if (name) userName.value = name
  }
})
</script>
