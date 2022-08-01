<template>
  <v-container v-if="showImageList" class="_vcont pa-2" fluid>
    <masonry :cols="columnCount" gutter="8px">
      <v-card v-for="(image, index) in store.imageList" :key="index" class="mb-2" :style="maxHeightStyle">
        <v-img
          transition="scroll-y-transition"
          :src="getImgSrc(image)"
          :aspect-ratio="image.aspectRatio"
          @click="showImgModal(index)"
          @contextmenu="onCtxMenu($event, image)"
        >
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="deep-purple" />
            </v-row>
          </template>
        </v-img>
      </v-card>
    </masonry>
    <div class="d-flex justify-center">
      <v-btn v-show="store.requestState" color="#ee8888" text>
        加载中...
      </v-btn>
      <v-btn v-show="showLoadMore" color="#ee8888" text @click="searchPosts()">
        加载更多
      </v-btn>
      <v-btn v-show="showNoMore" color="#ee8888" text>
        下面没有了...
      </v-btn>
    </div>
    <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
      <v-list>
        <v-list-item v-if="isYKSite" @click="addFavorite">
          <v-list-item-title>加入收藏</v-list-item-title>
        </v-list-item>
        <v-list-item @click="openDetail">
          <v-list-item-title>新标签页打开</v-list-item-title>
        </v-list-item>
        <v-list-item @click="addToSelectedList">
          <v-list-item-title>加入下载列表</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-fab-transition>
      <v-btn
        v-show="store.showFab"
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
    <ImageDetail />
    <v-snackbar
      v-model="showSnackbar"
      top
      :color="snackbarTypeMap[snackbarType]?.[0]"
      :timeout="2000"
      :min-width="160"
    >
      <v-icon v-show="snackbarType">{{ snackbarTypeMap[snackbarType]?.[1] }}</v-icon>
      <span class="ml-2">{{ snackbarText }}</span>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { mdiCheckCircle, mdiCloseCircle, mdiRefresh } from '@mdi/js'
import { computed, nextTick, onMounted, ref, watch } from '@vue/composition-api'
import type Post from '@himeka/booru/dist/structures/Post'
import ImageDetail from './ImageDetail.vue'
import { eventBus, isReachBottom, throttleScroll } from '@/utils'
import { addPostToFavorites } from '@/api/moebooru'
import { initPosts, refreshPosts, searchPosts } from '@/store/actions/post'
import store from '@/store'

const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarType = ref('')
const snackbarTypeMap = ref<Record<string, string[]>>({
  success: ['success', mdiCheckCircle],
  error: ['red accent-2', mdiCloseCircle],
})

eventBus.$on('showSnackbar', (text: string, type?: string) => {
  snackbarText.value = text
  snackbarType.value = ''
  if (type) snackbarType.value = type
  showSnackbar.value = true
})

const showImageList = ref(true)
const columnCount = computed(() => {
  return store.selectedColumn === '0'
    ? {
        300: 1,
        600: 2,
        900: 3,
        1200: 4,
        1600: 6,
        1920: 7,
        2400: 8,
        2700: 9,
        3000: 10,
        default: 6,
      }
    : +store.selectedColumn
})

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

const isYKSite = computed(() => {
  return ['konachan', 'yande'].some(e => store.imageList[0]?.booru.domain.includes(e))
})

const maxHeightStyle = computed(() => {
  const num = +store.selectedColumn
  if (num == 0 || num > 3) return 'max-height: 60vh;overflow: hidden'
  return ''
})

const getImgSrc = (img: Post) => {
  if (columnCount.value < 6) {
    return img.sampleUrl ?? img.fileUrl ?? void 0
  }
  return img.previewUrl ?? img.fileUrl ?? void 0
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

onMounted(async () => {
  await initPosts()
  window.addEventListener('scroll', throttleScroll(scroll => {
    if (!store.showFab && scroll > 200) store.showFab = true
    if (store.requestStop) return
    if (store.requestState) return
    isReachBottom() && searchPosts()
  }, () => {
    if (store.showFab) store.showFab = false
  }))
})
</script>
