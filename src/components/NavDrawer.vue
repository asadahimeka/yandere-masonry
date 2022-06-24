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
    <v-list v-if="store.isYKSite && userName" dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            My Account
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/user/home">
        <v-list-item-icon class="mr-2">
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Hello {{ userName }}!</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link :href="`/post?tags=vote%3A3%3A${userName}+order%3Avote&_wf=1`">
        <v-list-item-icon class="mr-2">
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>My Favorites</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Site List
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="link in siteLinks" :key="link" :href="`https://${link.includes('yande')?link+'/post':link}?_wf=1`">
        <v-list-item-icon class="mr-2">
          <v-icon>mdi-arrow-right-circle-outline</v-icon>
        </v-list-item-icon>
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
      <v-list-item>
        <v-list-item-icon class="mr-2">
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>%__VERSION__%</v-list-item-title>
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
import { ref, onMounted } from '@vue/composition-api'
import { siteDomains } from '@/common/site-list'
import { getUsername } from '@/common/moebooru'
import store from '@/common/store'

const siteLinks = ref(siteDomains)
const userName = ref('')

const openLink = (link: string) => {
  window.open(link, '_blank', 'noreferrer')
}

onMounted(async () => {
  const name = await getUsername()
  if (name) userName.value = name
})
</script>
