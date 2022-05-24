<template>
  <v-app-bar app dense>
    <v-app-bar-nav-icon @click="store.toggleDrawer" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <span class="mr-1">{{ store.selectedImageList.length }} Selected</span>
    <v-btn icon @click="select">
      <v-icon v-show="isNoSelected">
        mdi-checkbox-blank-outline
      </v-icon>
      <v-icon v-show="isOneOrMoreSelected">
        mdi-checkbox-intermediate
      </v-icon>
      <v-icon v-show="isAllSelected">
        mdi-checkbox-marked
      </v-icon>
    </v-btn>
    <v-menu dense offset-y :close-on-content-click="false">
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </template>
      <v-list dense flat style="min-width: 300px;max-height: 80vh;overflow: auto;">
        <v-subheader class="ml-2">
          <span class="mr-4">下载列表</span>
          <v-btn v-show="store.selectedImageList.length > 0" small @click="startDownload">
            开始下载
          </v-btn>
        </v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, index) in store.selectedImageList" :key="item.id" dense two-line>
            <v-list-item-avatar>
              <v-btn v-if="!loadingMap[index] && !loadedMap[index]" icon>
                <v-icon>mdi-file-clock-outline</v-icon>
              </v-btn>
              <v-btn v-if="loadedMap[index]" icon color="green">
                <v-icon>mdi-check-underline-circle</v-icon>
              </v-btn>
              <v-progress-circular v-if="loadingMap[index]" :value="loadingValue" color="purple" />
            </v-list-item-avatar>
            <v-list-item-content :title="item.fileUrl">
              <v-list-item-title v-text="item.fileDownloadName" />
              <v-list-item-subtitle style="max-width: 240px;" v-text="item.fileUrl" />
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removeFromList(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
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
import { computed, ref, del } from '@vue/composition-api'
import { useVuetify } from '@/plugins/vuetify'
import store from '@/common/store'
import { showMsg } from '@/common/utils'

const title = computed(() => {
  const { 0: img, length } = store.imageList
  if (img) return `${img.booru.domain.toUpperCase()} - ${length} Posts - Page ${store.currentPage}`
  return '🚂'
})

const isNoSelected = computed(() => store.selectedImageList.length === 0)
const isOneOrMoreSelected = computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length < store.imageList.length)
const isAllSelected = computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length === store.imageList.length)
const loadingMap = ref<Record<number, boolean>>({})
const loadedMap = ref<Record<number, boolean>>({})
const loadingValue = ref(0)

const getInitialLoadMap = (value: boolean) => {
  const map: Record<number, boolean> = {}
  for (const i of store.selectedImageList.keys()) {
    map[i] = value
  }
  return map
}

const select = () => {
  if (isNoSelected.value || isOneOrMoreSelected.value) {
    setTimeout(() => {
      store.selectedImageList = [...store.imageList]
      loadingMap.value = getInitialLoadMap(false)
      loadedMap.value = getInitialLoadMap(false)
    })
  }
  if (isAllSelected.value) {
    setTimeout(() => {
      store.selectedImageList = []
      loadedMap.value = {}
      loadingMap.value = {}
    })
  }
}

const removeFromList = (index: number) => {
  store.selectedImageList.splice(index, 1)
  del(loadingMap.value, index)
  del(loadedMap.value, index)
}

const download = (url: string, name: string) => {
  console.log('url:', url)
  return new Promise<void>((resolve, reject) => {
    GM_download({
      url,
      name,
      onload: () => resolve(),
      onerror: err => reject(new Error(err.error)),
      onprogress: d => {
        loadingValue.value = (d.loaded / d.total) * 100
        console.log('loadingValue.value:', loadingValue.value)
      }
    })
  })
}

const startDownload = async () => {
  console.log('sabhxbakxnnksaxklasx')
  try {
    loadingMap.value = getInitialLoadMap(true)
    loadedMap.value = getInitialLoadMap(false)
    // eslint-disable-next-line unicorn/no-array-for-each
    store.selectedImageList.forEach(async (item, index) => {
      console.log('index:', index)
      if (!item.fileUrl) return
      await download(item.fileUrl, `${item.fileDownloadName}.${item.fileUrl?.split('.').pop()}`)
      loadingMap.value[index] = false
      loadedMap.value[index] = true
    })
    // for (const [index, item] of store.selectedImageList.entries()) {
    //   console.log('item:', item)
    //   if (!item.fileUrl) continue
    //   await download(item.fileUrl, `${item.fileDownloadName}.${item.fileUrl?.split('.').pop()}`)
    //   loadingMap.value[index] = false
    //   loadedMap.value[index] = true
    // }
  } catch (error) {
    const msg = error as string
    showMsg({ msg, type: 'error' })
  }
}

const vuetify = useVuetify()
const toggleDarkmode = () => {
  vuetify.theme.dark = !vuetify.theme.dark
  localStorage.setItem('__darkmode', vuetify.theme.dark ? 'dark' : 'light')
}
</script>
