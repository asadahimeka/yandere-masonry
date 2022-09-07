<template>
  <div v-if="showImageList">
    <masonry :cols="columnCount" gutter="8px">
      <v-card v-for="(image, index) in store.imageList" :key="index" class="mb-2" :style="maxHeightStyle">
        <v-img
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
        <v-list-item v-if="store.isYKSite" @click="addFavorite">
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
import { computed, nextTick, onMounted, onUnmounted, ref, set, watch } from '@vue/composition-api'
import type Post from '@himeka/booru/dist/structures/Post'
import PostDetail from './PostDetail.vue'
import { notReachBottom, throttleScroll } from '@/utils'
import { addPostToFavorites } from '@/api/moebooru'
import { initPosts, refreshPosts, searchPosts } from '@/store/actions/post'
import store from '@/store'

const showImageList = ref(true)
const showFab = ref(false)
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

const maxHeightStyle = computed(() => {
  const num = +store.selectedColumn
  if (num == 0 || num > 3) return 'max-height: 60vh;overflow: hidden'
  return ''
})

const getImgSrc = (img?: Post) => {
  if (columnCount.value < 6) {
    return img?.sampleUrl ?? img?.fileUrl ?? void 0
  }
  return img?.previewUrl ?? img?.fileUrl ?? void 0
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
  notReachBottom() && searchPosts()
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
