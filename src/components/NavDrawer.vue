<template>
  <v-navigation-drawer v-model="store.showDrawer" app temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Booru Masonry</v-list-item-title>
        <v-list-item-subtitle>Booru 站点瀑布流布局浏览</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list v-if="store.isYKSite" dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">快捷方式</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
          <v-list-item-title>我的收藏夹</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/pool?page=1">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiImageMultiple }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>图集 (Pool)</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/post/popular_recent?period=1d">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiFire }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>人气作品 (日)</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/post/popular_recent?period=1w">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiFire }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>人气作品 (周)</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/post/popular_recent?period=1m">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiFire }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>人气作品 (月)</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/post/popular_recent?period=1y">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiFire }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>人气作品 (年)</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link href="/post?tags=order%3Arandom&page=1">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiShuffle }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>随机作品</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">站点列表</v-list-item-title>
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
      <v-divider />
      <v-list-item link @click="openLink('https://www.nanoka.top/illust/pixiv/')">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiArrowRightCircleOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Pixiv Ranking</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="openLink('https://pixiv.kanata.ml')">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiArrowRightCircleOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Pixiv Viewer</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense nav>
      <v-list-item class="mb-0">
        <v-list-item-content>
          <v-list-item-title class="title">标签黑名单</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="pa-0">
        <v-list-item-content class="pt-0">
          <v-combobox
            v-model="store.blacklist"
            :append-icon="null"
            :items="[]"
            class="ma-0 pa-0"
            hide-details
            hide-no-data
            multiple
            chips
            @change="onComboboxChange"
          >
            <template #selection="{ item }">
              <v-chip
                label
                small
                outlined
                close
                @click:close="removeTagFromBlacklist(item)"
              >
                <span>{{ item }}</span>
              </v-chip>
            </template>
          </v-combobox>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">关于</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="openLink('https://github.com/asadahimeka/yandere-masonry/blob/main/CHANGELOG.md')">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiInformationOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>v{{ version }}</v-list-item-title>
          <v-list-item-subtitle>更新日志</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="openLink('https://booru.kanata.ml')">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiWeb }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>v{{ version }}</v-list-item-title>
          <v-list-item-subtitle>Web 预览版本</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="openLink('https://github.com/asadahimeka/yandere-masonry/issues')">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiMessageAlertOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>反馈</v-list-item-title>
          <v-list-item-subtitle>问题与建议</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="openLink('https://github.com/asadahimeka/yandere-masonry')">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiGithub }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Github</v-list-item-title>
          <v-list-item-subtitle>欢迎 Star ☆彡</v-list-item-subtitle>
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
  mdiImageMultiple,
  mdiInformationOutline,
  mdiMessageAlertOutline,
  mdiShuffle,
  mdiStar,
  mdiWeb,
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
  if (link.includes('yande')) return 'https://yande.re/post?_wf=1'
  if (link.includes('behoimi')) return 'http://behoimi.org?_wf=1'
  return `https://${link}?_wf=1`
}

const onComboboxChange = (val: string[]) => {
  localStorage.setItem('__blacklist', val.join(','))
}

const removeTagFromBlacklist = (item: string) => {
  store.blacklist.splice(store.blacklist.indexOf(item), 1)
  localStorage.setItem('__blacklist', store.blacklist.join(','))
}

onMounted(async () => {
  if (store.isYKSite) {
    const name = await getUsername()
    if (name) userName.value = name
  }
})
</script>
