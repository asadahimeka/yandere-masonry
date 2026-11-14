<template>
  <v-navigation-drawer v-model="store.showDrawer" class="nav_drawer" app temporary>
    <v-list-item>
      <v-list-item-avatar v-if="!isDanbooruPage()">
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
          <v-list-item v-for="link in navSites" :key="link" :href="handleLink(link)" referrerpolicy="no-referrer">
            <v-list-item-icon class="mr-2">
              <div class="site_icon site_icon_fallback" :style="{ backgroundColor: fallbackColor(link) }">{{ fallbackLetter(link) }}</div>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ getSiteTitle(link) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <hr class="my-2">
          <v-list-item v-for="tool in toolLinks" :key="tool.host" link @click="openLink(tool.url)">
            <v-list-item-icon class="mr-2">
              <div class="site_icon site_icon_fallback" :style="{ backgroundColor: fallbackColor(tool.host) }">{{ fallbackLetter(tool.host) }}</div>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ tool.title }}</v-list-item-title>
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
        <v-list-item link @click="openLink('https://booru.cocomi.eu.org')">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ mdiWeb }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('qWcqQRsE9nN43MaZ2BmN9') }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('jerGO2OCuW9TdnEnGYRWd') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item link @click="openLink('https://pixiv.pictures/setting/recommend')">
          <v-list-item-icon class="mr-2">
            <v-icon>{{ mdiBookmarkBoxMultipleOutline }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('eOxsWLzwqrlhBdVMwz-rH') }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('jerGO2OCuW9TdnEnGYRWd') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item> -->
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
  // mdiBookmarkBoxMultipleOutline,
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
import { getSiteTitle, siteDomains } from '@/api/booru'
import { isDanbooruPage } from '@/api/danbooru'
import { getUsername } from '@/api/moebooru'
import { SZURU_DEMO_HOST, normalizeSzuruDomain } from '@/api/szurubooru'
import { settings, store } from '@/store'

// 站点导航 = 内置站点 + 已配置的自部署 szurubooru 域名
const navSites = computed(() => {
  const szuruDomains = settings.szurubooruConfigs
    .map(c => normalizeSzuruDomain(c.domain))
    .filter(d => d && d !== SZURU_DEMO_HOST && !siteDomains.includes(d))
  return [...siteDomains, ...szuruDomains]
})

const userName = ref('')
const version = ref(GM_info.script.version)

function openLink(link: string) {
  window.open(link, '_blank', 'noreferrer')
}

function handleLink(link: string) {
  if (link.includes('yande')) return 'https://yande.re/post?_wf=1'
  if (link.includes('behoimi')) return 'http://behoimi.org'
  return `https://${link}`
}

const FALLBACK_COLORS = ['#e91e63', '#8e24aa', '#3949ab', '#1e88e5', '#00897b', '#43a047', '#f4511e', '#5c6bc0']

const toolLinks = [
  { title: 'Pixiv Viewer', url: 'https://pixiv.pictures/?ref=booru.vercel.app', host: 'pixiv.pictures' },
  { title: 'Moeview', url: 'https://moeview.app/?ref=booru.vercel.app', host: 'moeview.app' },
  { title: 'R-34.XYZ', url: 'https://r-34.xyz/?ref=booru.vercel.app', host: 'r-34.xyz' },
  { title: 'Nekon', url: 'https://nekon.app/?ref=booru.vercel.app', host: 'nekon.app' },
  { title: 'SomeACG', url: 'https://www.someacg.top/?ref=booru.vercel.app', host: 'someacg.top' },
  { title: 'ManyACG', url: 'https://manyacg.top/?ref=booru.vercel.app', host: 'manyacg.top' },
  { title: 'Cosine Gallery', url: 'https://pic.cosine.ren/?ref=booru.vercel.app', host: 'pic.cosine.ren' },
]

function fallbackColor(url: string) {
  let hash = 0
  for (let i = 0; i < url.length; i++) hash = (hash * 31 + url.charCodeAt(i)) >>> 0
  return FALLBACK_COLORS[hash % FALLBACK_COLORS.length]
}

function fallbackLetter(url: string) {
  const host = url.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '')
  return host.charAt(0).toUpperCase() || '?'
}

const actSiteIndex = computed(() => {
  return navSites.value.findIndex(e => location.href.includes(e))
})

function showSettingDrawer() {
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
