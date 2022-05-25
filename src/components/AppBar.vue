<template>
  <v-app-bar app dense>
    <v-app-bar-nav-icon @click="store.toggleDrawer" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <span class="mr-1">{{ store.selectedImageList.length }} Selected</span>
    <v-btn icon @click="selectAll">
      <v-icon v-show="isNoSelected">mdi-checkbox-blank-outline</v-icon>
      <v-icon v-show="isOneOrMoreSelected">mdi-checkbox-intermediate</v-icon>
      <v-icon v-show="isAllSelected">mdi-checkbox-marked</v-icon>
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
          <v-list-item v-for="item in store.selectedImageList" :key="item.id" dense two-line>
            <v-list-item-avatar>
              <v-btn v-if="!item.loading && !item.loaded" icon>
                <v-icon>mdi-file-clock-outline</v-icon>
              </v-btn>
              <v-btn v-if="item.loaded" icon color="green">
                <v-icon>mdi-check-underline-circle</v-icon>
              </v-btn>
              <v-progress-circular v-if="item.loading" :value="loadingValue" color="pink" />
            </v-list-item-avatar>
            <v-list-item-content style="max-width: 240px;" :title="item.fileUrl">
              <v-list-item-title v-text="item.fileDownloadName" />
              <v-list-item-subtitle v-text="item.fileUrl" />
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removeFromList(item.id)">
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
import { computed, ref, set } from '@vue/composition-api'
import { useVuetify } from '@/plugins/vuetify'
import store from '@/common/store'
import { downloadFile, showMsg } from '@/common/utils'

const title = computed(() => {
  const { 0: img, length } = store.imageList
  if (img) return `${img.booru.domain.toUpperCase()} - ${length} Posts - Page ${store.currentPage}`
  return '🚂'
})

const isNoSelected = computed(() => store.selectedImageList.length === 0)
const isOneOrMoreSelected = computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length < store.imageList.length)
const isAllSelected = computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length === store.imageList.length)
const loadingValue = ref(0)

const selectAll = () => {
  if (isNoSelected.value || isOneOrMoreSelected.value) {
    setTimeout(() => {
      store.selectedImageList = [...store.imageList]
    })
  }
  if (isAllSelected.value) {
    setTimeout(() => {
      store.selectedImageList = []
    })
  }
}

const removeFromList = (id: string) => {
  store.selectedImageList = store.selectedImageList.filter(e => e.id !== id)
}

const download = (url: string, name: string) => {
  loadingValue.value = 0
  return downloadFile(url, name, {
    saveAs: false,
    onprogress: d => {
      loadingValue.value = (d.loaded / d.total) * 100
    }
  })
}

const startDownload = async () => {
  try {
    const len = store.selectedImageList.length
    for (let index = 0; index < len; index++) {
      const item = store.selectedImageList[index]
      const { fileUrl, fileDownloadName, loaded } = item
      if (!fileUrl) continue
      if (loaded) continue
      set(item, 'loading', true)
      await download(fileUrl, `${fileDownloadName}.${fileUrl.split('.').pop()}`)
      set(item, 'loading', false)
      set(item, 'loaded', true)
    }
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
