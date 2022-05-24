<template>
  <v-dialog
    v-model="store.showImageSelected"
    :width="imageSelectedWidth > 300 ? imageSelectedWidth : 300"
    :height="imageSelectedHeight"
    :overlay-opacity="0.7"
  >
    <v-img
      v-if="store.showImageSelected"
      :src="imgSrc"
      :lazy-src="imgLasySrc"
      style="min-width: 300px;"
      @click="toggleToolbar"
    >
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular :size="100" :width="6" indeterminate color="deep-purple" />
        </v-row>
      </template>
      <v-toolbar
        v-show="showImageToolbar"
        style="position:absolute;top:0;width:100%;z-index:10;"
        color="transparent"
        height="auto"
        flat
      >
        <v-chip
          small
          color="#ee8888b3"
          text-color="#ffffff"
          @click.stop="toDetailPage"
          v-text="imageSelected.rating.toUpperCase() + ' ' + imageSelected.id"
        />
        <v-spacer />
        <v-tooltip v-if="!notYKSite" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="#ee8888b3"
              v-bind="attrs"
              class="mr-1"
              v-on="on"
              @click.stop="addFavorite"
            >
              <v-icon>mdi-heart-plus-outline</v-icon>
            </v-btn>
          </template>
          <span>收藏</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="#ee8888b3"
              v-bind="attrs"
              class="mr-1"
              v-on="on"
              @click.stop="toDetailPage"
            >
              <v-icon>mdi-link-variant</v-icon>
            </v-btn>
          </template>
          <span>详情</span>
        </v-tooltip>
        <v-tooltip v-if="imageSelected.sourceUrl" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="#ee8888b3"
              v-bind="attrs"
              class="mr-1"
              v-on="on"
              @click.stop="toSourcePage"
            >
              <v-icon>mdi-launch</v-icon>
            </v-btn>
          </template>
          <span>{{ '来源 ' + imageSelected.sourceUrl }}</span>
        </v-tooltip>
        <v-menu dense open-on-hover offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              v-show="!downloadLoading"
              fab
              dark
              small
              color="#ee8888b3"
              class="mr-1"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
          <v-list dense flat>
            <v-list-item two-line link dense>
              <v-list-item-content @click.stop="download(imageSelected.sampleUrl, imageSelected.sampleDownloadName)">
                <v-list-item-title>下载缩略图</v-list-item-title>
                <v-list-item-subtitle v-text="imageSelected.sampleDownloadText" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="imageSelected.jpegSize !== 0" two-line link dense>
              <v-list-item-content @click.stop="download(imageSelected.jpegUrl, imageSelected.jpegDownloadName)">
                <v-list-item-title>下载高清图</v-list-item-title>
                <v-list-item-subtitle v-text="imageSelected.jpegDownloadText" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line link dense>
              <v-list-item-content @click.stop="download(imageSelected.fileUrl, imageSelected.fileDownloadName)">
                <v-list-item-title>下载原文件</v-list-item-title>
                <v-list-item-subtitle v-text="imageSelected.fileDownloadText" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-progress-circular v-show="downloadLoading" indeterminate class="ml-1 mr-2" color="#ee8888b3" />
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="#ee8888b3"
              class="mr-1"
              v-bind="attrs"
              v-on="on"
              @click.stop="addToList"
            >
              <v-icon>mdi-playlist-plus</v-icon>
            </v-btn>
          </template>
          <span>加入下载列表</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn fab dark small color="#ee8888b3" v-bind="attrs" v-on="on" @click.stop="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>关闭</span>
        </v-tooltip>
      </v-toolbar>
      <v-chip-group
        v-show="!notYKSite && showImageToolbar"
        class="pa-3 hidden-sm-and-down"
        style="position: absolute;bottom: 0;"
        column
      >
        <v-chip
          v-for="(tag, i) in imageSelected.tags"
          :key="tag + i"
          small
          class="mr-1"
          color="#ee8888b3"
          text-color="#ffffff"
          @click.stop="toTagsPage(tag)"
          v-text="tag"
        />
      </v-chip-group>
      <video v-if="isVideo" controls style="width: 100%;" :src="imageSelected.fileUrl ?? void 0"></video>
    </v-img>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from '@vue/composition-api'
import store from '@/common/store'
import { isURL, showMsg } from '@/common/utils'

const showImageToolbar = ref(true)
const innerWidth = ref(window.innerWidth)
const innerHeight = ref(window.innerHeight)
const downloadLoading = ref(false)

const imageSelected = computed(() => store.imageList[store.imageSelectedIndex] ?? {})
const isVideo = computed(() => ['.mp4', '.webm'].some(e => imageSelected.value.fileUrl?.endsWith(e)))
const imgSrc = computed(() => {
  if (isVideo.value) return void 0
  return imageSelected.value.sampleUrl ??
    imageSelected.value.fileUrl ??
    void 0
})
const imgLasySrc = computed(() => {
  if (isVideo.value) return void 0
  return imageSelected.value.previewUrl ?? void 0
})

const imageSelectedWidth = computed(() => {
  const width = Number.parseInt(
    Math.min(
      innerWidth.value * 0.9,
      imageSelected.value.sampleWidth || innerWidth.value
    ).toString()
  )
  const height = Math.min(innerHeight.value * 0.9, imageSelected.value.sampleHeight || innerHeight.value)
  const width2 = Number.parseInt((height * imageSelected.value.aspectRatio).toString())
  return Math.min(width, width2)
})

const imageSelectedHeight = computed(() => {
  const width = Math.min(innerWidth.value * 0.9, imageSelected.value.sampleWidth || innerWidth.value)
  const height = Number.parseInt(
    Math.min(
      innerHeight.value * 0.9,
      imageSelected.value.sampleHeight || innerHeight.value
    ).toString()
  )
  const height2 = Number.parseInt((width / imageSelected.value.aspectRatio).toString())
  return Math.min(height, height2)
})

const booruDomain = computed(() => imageSelected.value.booru.domain)
const notYKSite = computed(() => {
  return ['konachan', 'yande'].every(e => !booruDomain.value.includes(e))
})

const toggleToolbar = () => {
  showImageToolbar.value = !showImageToolbar.value
}

const toTagsPage = (tag: string) => {
  if (notYKSite.value) return
  window.open(`https://${booruDomain.value}/post?tags=${tag}`, '_blank', 'noreferrer')
}

const toDetailPage = () => {
  window.open(imageSelected.value.postView, '_blank', 'noreferrer')
}

const toSourcePage = () => {
  const { sourceUrl } = imageSelected.value
  if (!isURL(sourceUrl)) return
  window.open(sourceUrl, '_blank', 'noreferrer')
}

const download = (url: string | null, name: string) => {
  if (!url) return
  downloadLoading.value = true
  GM_download({
    url,
    name,
    onload() {
      downloadLoading.value = false
    },
    onerror(err) {
      downloadLoading.value = false
      showMsg({ msg: '下载出错: ' + err.error, type: 'error' })
    }
  })
}

const addToList = () => {
  store.addToSelectedList(imageSelected.value)
}

const close = () => {
  store.showImageSelected = false
}

const addFavorite = async () => {
  if (notYKSite.value) return
  const form = new FormData()
  form.append('id', imageSelected.value.id)
  form.append('score', '3')
  const response = await fetch(`https://${booruDomain.value}/post/vote.json`, {
    method: 'POST',
    headers: { 'x-csrf-token': sessionStorage.getItem('csrf-token') ?? '' },
    body: form
  })
  if (!response.ok) return
  const result = await response.json()
  if (result.success) {
    showMsg({ msg: '收藏成功' })
  } else {
    showMsg({ msg: '收藏失败', type: 'error' })
  }
}

onMounted(() => {
  window.addEventListener('resize', () => {
    innerWidth.value = window.innerWidth
    innerHeight.value = window.innerHeight
  })
})
</script>
