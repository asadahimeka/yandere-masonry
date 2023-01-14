<template>
  <v-navigation-drawer
    v-model="store.showSettings"
    class="nav_drawer"
    :width="400"
    app
    temporary
    right
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">设置</v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon @click="store.showSettings = false">
        <v-btn icon>
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-list-item-icon>
    </v-list-item>
    <v-divider />
    <v-list dense nav>
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
          <v-list-item-title>显示 NSFW 内容</v-list-item-title>
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
          <v-list-item-subtitle>详情弹窗使用A/D/←/→切换图片</v-list-item-subtitle>
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
          <v-list-item-subtitle>详情弹窗预加载下一张样品图/原图</v-list-item-subtitle>
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
          <v-list-item-subtitle>Masonry/Grid/Justified</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu transition="slide-y-transition" offset-y>
            <template #activator="{ on, attrs }">
              <v-btn small v-bind="attrs" class="sel_menu_btn" v-on="on">
                {{ actLayout }}
                <v-icon :size="16">{{ mdiChevronDown }}</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item-group :value="actLayoutIndex" color="primary">
                <v-list-item v-for="item in layoutTypes" :key="item[0]" dense @click="onMasonryLayoutChange(item[0])">
                  <v-list-item-title v-text="item[1]" />
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="store.settings.masonryLayout !== 'flexbin'">
        <v-list-item-content>
          <v-list-item-title>瀑布流列数</v-list-item-title>
          <v-list-item-subtitle>小于7列时列表会加载大图</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu transition="slide-y-transition" offset-y>
            <template #activator="{ on, attrs }">
              <v-btn small v-bind="attrs" class="sel_menu_btn" v-on="on">
                <span style="margin-bottom:2px">{{ store.selectedColumn === '0' ? '自动' : `${store.selectedColumn}列` }}</span>
                <v-icon :size="16">{{ mdiChevronDown }}</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item-group :value="actCol" color="primary">
                <v-list-item v-for="(val, key) in cols" :key="key" dense @click="selColumn(key)">
                  <v-list-item-title v-text="val" />
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { mdiChevronDown, mdiClose } from '@mdi/js'
import store from '@/store'

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

const layoutTypes = ref([
  ['masonry', 'Masonry/等宽不等高'],
  ['grid', 'Grid/等宽等高'],
  ['flexbin', 'Justified/适高不等宽'],
])

const actLayout = computed(() => {
  return layoutTypes.value.find(e => e[0] === store.settings.masonryLayout)?.[1]
})

const actLayoutIndex = computed(() => {
  return layoutTypes.value.findIndex(e => e[0] === store.settings.masonryLayout)
})

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

const colList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20]
const cols = ref(colList.reduce<Record<string, string>>((acc, cur) => {
  acc[cur] = cur === 0 ? '自动' : `${cur} 列`
  return acc
}, {}))

const actCol = computed(() => {
  return colList.findIndex(e => e.toString() === store.selectedColumn)
})

const selColumn = (val: string) => {
  store.selectedColumn = val
  localStorage.setItem('__masonry_col', val)
}
</script>
