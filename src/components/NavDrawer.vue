<template>
  <v-navigation-drawer v-model="store.showDrawer" class="nav_drawer" app temporary>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://upload-bbs.mihoyo.com/upload/2022/09/07/190122060/8505ff4b535cb1487b521d73c7f71d63_865024295271530650.png" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">Booru Masonry</v-list-item-title>
        <v-list-item-subtitle>Booru 图站瀑布流浏览</v-list-item-subtitle>
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
          <v-list-item-title>人气作品</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-list-item link href="/post/popular_recent?period=1w">
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
      </v-list-item> -->
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
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">设置</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="mb-0">
        <v-list-item-content>
          <v-list-item-title>本地标签黑名单</v-list-item-title>
          <v-list-item-subtitle>下方输入标签，回车添加</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="pa-0">
        <v-list-item-content class="pt-0">
          <v-combobox
            v-model="store.blacklist"
            :append-icon="null"
            :items="[]"
            class="blacklist_combobox ma-0 pa-0"
            hide-details
            hide-no-data
            multiple
            outlined
            dense
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
      <v-list-item class="mb-0">
        <v-list-item-content>
          <v-list-item-title>当前站点 API Credentials</v-list-item-title>
          <v-list-item-subtitle>形如: &api_key=xx&user_id=1</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="pa-0">
        <v-list-item-content class="pt-0">
          <v-text-field
            v-model="store.settings.credentialQuery"
            class="blacklist_combobox ma-0 pa-0"
            hide-details
            outlined
            dense
            @change="onCredentialQueryChange"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>NSFW 开关</v-list-item-title>
          <v-list-item-subtitle>包含裸露或性描写内容</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="nsfwValue"
            color="deep-orange darken-1"
            @change="onNSFWSwitchChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>监听滚轮事件</v-list-item-title>
          <v-list-item-subtitle>详情弹窗滚轮切换图片</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.isListenWheelEvent"
            @change="onWheelSwitchChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>监听键盘事件</v-list-item-title>
          <v-list-item-subtitle>详情A/D/←/→切换图片</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.settings.isListenKeyupEvent"
            @change="onKeyupSwitchChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>详情图片预加载</v-list-item-title>
          <v-list-item-subtitle>预加载下一张样品图/原图</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.isFullImgPreload"
            @change="onImgPreloadChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="store.isFullImgPreload">
        <v-list-item-content>
          <v-list-item-title>图片预加载数量</v-list-item-title>
          <v-list-item-subtitle>实验性/不保证可用</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="pl-1">
          <input
            :value="store.imgPreloadNum"
            class="text-center rounded preload_num"
            type="number"
            min="0"
            max="5"
            @blur="onPreloadNumBlur"
          >
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>图片列表布局</v-list-item-title>
          <v-list-item-subtitle>masonry/grid/flexbin</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <!-- <v-switch
            v-model="store.settings.masonryLayout"
            @change="onmasonryLayoutChange"
          /> -->
          <v-menu transition="slide-y-transition" offset-y>
            <template #activator="{ on, attrs }">
              <v-btn small v-bind="attrs" style="text-transform:none" v-on="on">{{ store.settings.masonryLayout }}</v-btn>
            </template>
            <v-list dense>
              <v-list-item v-for="(val, key) in ['masonry', 'grid', 'flexbin']" :key="key" dense @click="onMasonryLayoutChange(val)">
                <v-list-item-title v-text="val" />
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
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
          <v-list-item-subtitle>查看更新日志</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="openLink('https://booru.kanata.ml')">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiWeb }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Web 预览版</v-list-item-title>
          <v-list-item-subtitle>点击查看</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="openLink('https://github.com/asadahimeka/yandere-masonry/issues')">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ mdiMessageAlertOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>问题与建议</v-list-item-title>
          <v-list-item-subtitle>点击反馈</v-list-item-subtitle>
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
import { onMounted, ref } from 'vue'
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

const nsfwValue = ref(store.showNSFWContents)
const setNSFWShow = (val: string) => {
  const flag = val !== '0'
  store.showNSFWContents = flag
  nsfwValue.value = flag
  localStorage.setItem('__showNSFW', val)
  location.reload()
}
const onNSFWSwitchChange = (val: any) => {
  setNSFWShow(val ? '1' : '0')
}

const onWheelSwitchChange = (val: any) => {
  localStorage.setItem('__listenWheel', val ? '1' : '0')
  location.reload()
}

const onKeyupSwitchChange = (val: any) => {
  localStorage.setItem('__listenKeyup', val ? '1' : '0')
  location.reload()
}

const onImgPreloadChange = (val: any) => {
  localStorage.setItem('__fullImgPreload', val ? '1' : '')
  location.reload()
}

const onMasonryLayoutChange = (val: any) => {
  localStorage.setItem('__masonryLayout', val)
  location.reload()
}

const onCredentialQueryChange = (val: any) => {
  localStorage.setItem('__credentialQuery', val)
}

const onPreloadNumBlur = (ev: Event) => {
  const input = ev.target as HTMLInputElement
  if (input.validationMessage) {
    input.value = '1'
    store.imgPreloadNum = 1
    localStorage.setItem('__imgPreloadNum', '1')
  } else {
    const num = Number(input.value) || 1
    store.imgPreloadNum = num
    localStorage.setItem('__imgPreloadNum', num.toString())
  }
}

onMounted(async () => {
  if (store.isYKSite) {
    const name = await getUsername()
    if (name) userName.value = name
  }
})
</script>
