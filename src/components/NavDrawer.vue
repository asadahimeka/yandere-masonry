<template>
  <v-navigation-drawer v-model="store.showDrawer" class="nav_drawer" app temporary>
    <v-list-item>
      <v-list-item-avatar>
        <img width="40" src="https://upload-bbs.mihoyo.com/upload/2022/09/07/190122060/8505ff4b535cb1487b521d73c7f71d63_865024295271530650.png" alt="" loading="lazy">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">Booru Masonry</v-list-item-title>
        <v-list-item-subtitle :title="$t('l8CbIALt_VWUnzBl_Rmgf')">{{ $t('l8CbIALt_VWUnzBl_Rmgf') }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list v-if="store.isYKSite" dense nav>
      <v-list-group :value="true" no-action>
        <template #activator>
          <v-list-item-content>
            <v-list-item-title class="title">{{ $t('CacM8tispuPNrSxxpt9GX') }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-if="userName" link href="/user/home">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ mdiAccount }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ userName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userName" link :href="`/post?tags=vote%3A3%3A${userName}+order%3Avote&_wf=1`">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ mdiStar }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('zs8YTCc8d8XFUgRnp7m_w') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/pool?page=1">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ mdiImageMultiple }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('DXEhXAQbkiCMU_l252jo_') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/post/popular_recent?period=1d">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ mdiFire }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('7Cgsr4PUMbezDXNfWdvWH') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/post?tags=order%3Arandom&page=1">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ mdiShuffle }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('StU1-52QJmNFKQ5soJCyG') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-list dense nav>
      <v-list-group :value="true" no-action>
        <template #activator>
          <v-list-item-content>
            <v-list-item-title class="title">{{ $t('e2_EYvweJsVoIZlIWkPRV') }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item-group :value="actSiteIndex" color="primary">
          <v-list-item v-for="link in siteLinks" :key="link" :href="dealLink(link)">
            <v-list-item-icon class="mr-2">
              <img :src="dealFavicon(link)" loading="lazy" class="site_icon">
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ link.toUpperCase() }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="openLink('https://www.nanoka.top/illust/pixiv/')">
            <v-list-item-icon class="mr-2">
              <img src="https://www.nanoka.top/images/favicon.ico" loading="lazy" class="site_icon">
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Pixiv Ranking</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="openLink('https://pixiv.pics')">
            <v-list-item-icon class="mr-2">
              <img src="https://pixiv.pics/favicon.ico" loading="lazy" class="site_icon">
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Pixiv Viewer</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
    </v-list>
    <v-list dense nav>
      <v-list-item link @click="showSettingDrawer()">
        <v-list-item-content>
          <v-list-item-title class="title">{{ $t('UxxldE9xRwmQctrvba5Y8') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense nav>
      <v-list-group :value="true" no-action>
        <template #activator>
          <v-list-item-content>
            <v-list-item-title class="title">{{ $t('PT74UDfKA45vTVTst_-hD') }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item link @click="openLink('https://github.com/asadahimeka/yandere-masonry/blob/main/CHANGELOG.md')">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ mdiInformationOutline }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>v{{ version }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('iJ0h220tvMmUhkfIMYI-W') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="openLink('https://booru.pixiv.pics')">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ mdiWeb }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('qWcqQRsE9nN43MaZ2BmN9') }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('jerGO2OCuW9TdnEnGYRWd') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="openLink('https://github.com/asadahimeka/yandere-masonry/issues')">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ mdiMessageAlertOutline }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('23iEYyiQlLVhFIqGbj527') }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('4g1TUy2kwQrdOs-w4JobB') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="openLink('https://github.com/asadahimeka/yandere-masonry')">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ mdiGithub }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Github</v-list-item-title>
            <v-list-item-subtitle>{{ $t('7Xq5puLNcT0mAvoxElqdf') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {
  mdiAccount,
  mdiFire,
  mdiGithub,
  mdiImageMultiple,
  mdiInformationOutline,
  mdiMessageAlertOutline,
  mdiShuffle,
  mdiStar,
  mdiWeb,
} from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
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
  if (link.includes('yande')) return 'https://yande.re/post?_wf=1'
  if (link.includes('behoimi')) return 'http://behoimi.org?_wf=1'
  return `https://${link}?_wf=1`
}

const dealFavicon = (link: string) => {
  if (link.includes('konachan')) return 'https://upload-bbs.miyoushe.com/upload/2023/01/14/190122060/cbd0b71ead30e0777e5b023170ba415c_4819570566325089051.png'
  if (link.includes('behoimi')) return 'https://upload-bbs.miyoushe.com/upload/2023/01/14/190122060/d3b97f45046795c87c12ad5704074f32_1333245617164582614.png'
  return `https://${link}/favicon.ico`
}

const actSiteIndex = computed(() => {
  return siteDomains.findIndex(e => location.host.includes(e))
})

const showSettingDrawer = () => {
  store.showDrawer = false
  store.showSettings = true
}

onMounted(async () => {
  if (store.isYKSite) {
    const name = await getUsername()
    if (name) userName.value = name
  }
})
</script>
