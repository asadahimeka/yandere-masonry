<template>
  <div v-if="showImageList">
    <wf-layout>
      <v-card
        v-for="(image, index) in store.imageList"
        :key="index"
        class="mb-2 posts-image-card"
        :style="store.settings.masonryLayout === 'flexbin' ? `width:${image.width * 300 / image.height}px;flex-grow:${image.width * 300 / image.height}` : maxHeightStyle"
      >
        <template v-if="store.settings.masonryLayout === 'flexbin'">
          <div :style="`padding-bottom:${image.height / image.width * 100}%`"></div>
          <img
            class="post-image"
            alt=""
            loading="lazy"
            :src="getImgSrc(image)"
            @click="showImgModal(index)"
            @contextmenu="onCtxMenu($event, image)"
            @error="onImageLoadError(image.previewUrl || '')"
          >
        </template>
        <v-img
          v-else
          transition="scroll-y-transition"
          :src="getImgSrc(image)"
          :aspect-ratio="image?.aspectRatio"
          @click="showImgModal(index)"
          @contextmenu="onCtxMenu($event, image)"
          @error="onImageLoadError"
        >
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="deep-purple" />
            </v-row>
          </template>
          <v-icon
            v-if="image?.fileExt.toLowerCase() === 'gif'"
            style="position: absolute;right: 5px"
          >
            {{ mdiFileGifBox }}
          </v-icon>
          <v-icon
            v-if="['mp4', 'webm'].includes(image?.fileExt.toLowerCase())"
            style="position: absolute;right: 5px"
          >
            {{ mdiVideo }}
          </v-icon>
        </v-img>
      </v-card>
    </wf-layout>
    <div class="d-flex justify-center">
      <v-btn v-show="store.requestState" color="primary" text>
        {{ $t('RN4dt81l_fZMWODsskZob') }}...
      </v-btn>
      <v-btn v-show="showLoadMore" color="primary" text @click="searchPosts()">
        {{ $t('fC8XNfCl04zK7vgeaRZMQ') }}
      </v-btn>
      <v-btn v-show="showNoMore" color="primary" text>
        {{ $t('Z4pa8GhgE63OGGvCqAld0') }}...
      </v-btn>
    </div>
    <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
      <v-list>
        <v-list-item v-if="store.isYKSite" @click="addFavorite">
          <v-list-item-title>{{ $t('Dnnio9m9RZA6bkTLytc99') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="downloadCtxPost">
          <v-list-item-title>{{ $t('VpuyxZtIoDF9-YyOm0tK_') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="openDetail">
          <v-list-item-title>{{ $t('EsiorRgoeHI8h7IHMLDA4') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="addToSelectedList">
          <v-list-item-title>{{ $t('hVmfDxXoj8vkgVQabEOSr') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-fab-transition>
      <v-btn
        v-show="showFab"
        fab
        dark
        fixed
        bottom
        right
        color="pink"
        @click="refreshPosts()"
      >
        <v-icon>{{ mdiRefresh }}</v-icon>
      </v-btn>
    </v-fab-transition>
    <PostDetail />
  </div>
</template>

<script setup lang="ts">
import { mdiFileGifBox, mdiRefresh, mdiVideo } from '@mdi/js'
import { computed, nextTick, onMounted, onUnmounted, ref, set, watch } from 'vue'
import type { Post } from '@himeka/booru'
import PostDetail from './PostDetail.vue'
import { downloadFile, notReachBottom, showMsg, throttleScroll } from '@/utils'
import { addPostToFavorites } from '@/api/moebooru'
import { initPosts, refreshPosts, searchPosts } from '@/store/actions/post'
import store from '@/store'
import i18n from '@/utils/i18n'

const showImageList = ref(true)
const showFab = ref(false)

watch(
  () => store.selectedColumn,
  () => {
    showImageList.value = false
    nextTick(() => {
      showImageList.value = true
    })
  },
)

const showNoMore = computed(() => !store.requestState && store.requestStop)
const showLoadMore = computed(() => !store.requestState && !store.requestStop)

const ctxActPost = ref<Post>()
const showMenu = ref(false)
const x = ref(0)
const y = ref(0)

const maxHeightStyle = computed(() => {
  const num = +store.selectedColumn
  if (num == 0 || num > 3) return 'max-height: 60vh;overflow: hidden'
  return ''
})

const getImgSrc = (img?: Post) => {
  const num = +store.selectedColumn
  if (num != 0 && num < 7) {
    return img?.sampleUrl || img?.fileUrl || void 0
  }
  return img?.previewUrl || img?.fileUrl || void 0
}

const onCtxMenu = (ev: MouseEvent, img: Post) => {
  ev.preventDefault()
  showMenu.value = false
  x.value = ev.clientX
  y.value = ev.clientY
  nextTick(() => {
    ctxActPost.value = img
    showMenu.value = true
  })
}

const showImgModal = (index: number) => {
  store.imageSelectedIndex = index
  store.showImageSelected = true
}

const openDetail = () => {
  const img = ctxActPost.value
  img && window.open(img.postView, '_blank', 'noreferrer')
}

const addToSelectedList = () => {
  const img = ctxActPost.value
  img && store.addToSelectedList(img)
}

const addFavorite = () => {
  const img = ctxActPost.value
  img && addPostToFavorites(img.id)
}

const downloadCtxPost = async () => {
  if (!ctxActPost.value) return
  const { fileUrl, fileDownloadName } = ctxActPost.value
  if (!fileUrl) return
  try {
    await downloadFile(fileUrl, `${fileDownloadName}.${fileUrl.split('.').pop()}`)
  } catch (error) {
    showMsg({ msg: `${i18n.t('FAqj5ONm50QMfIt9Vq2p1')}: ${error}`, type: 'error' })
  }
}

const onImageLoadError = (url: string) => {
  const item = store.imageList.find(e => e.previewUrl == url)
  if (!item) return
  set(item, 'previewUrl', null)
  set(item, 'sampleUrl', null)
}

const scrollFn = throttleScroll(scroll => {
  if (!showFab.value && scroll > 200) showFab.value = true
  if (store.requestStop) return
  if (store.requestState) return
  notReachBottom() && searchPosts(true)
}, () => {
  if (showFab.value) showFab.value = false
})

onMounted(async () => {
  await initPosts()
  window.addEventListener('scroll', scrollFn)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollFn)
})
</script>
