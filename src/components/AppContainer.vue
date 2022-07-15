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
      <v-btn v-show="showLoadMore" color="#ee8888" text @click="fetchData()">
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
        @click="refresh"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-fab-transition>
    <image-detail />
  </v-container>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from '@vue/composition-api'
import { eventBus, fetchPopularPosts, getFirstPageNo, isReachBottom, pushPageState, searchBooru, throttleScroll } from '@/common/utils'
import { addPostToFavorites } from '@/common/moebooru'
import store from '@/common/store'
import ImageDetail from './ImageDetail.vue'
import type Post from '@himeka/booru/dist/structures/Post'

const showImageList = ref(true)
const columnCount = computed(() => {
  return store.selectedColumn === '0' ? {
    300: 1,
    600: 2,
    900: 3,
    1200: 4,
    1600: 6,
    1920: 7,
    2400: 8,
    2700: 9,
    3000: 10,
    default: 6
  } : +store.selectedColumn
})

watch(
  () => store.selectedColumn,
  () => {
    showImageList.value = false
    nextTick(() => {
      showImageList.value = true
    })
  }
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

const isPopularPage = /(yande.re|konachan).*\/post\/popular_/.test(location.href)
const params = new URLSearchParams(location.search)
let page = getFirstPageNo(params)
const tags = params.get('tags')
const fetchData = async () => {
  store.requestState = true
  try {
    let results: Post[] = []
    if (isPopularPage) {
      results = await fetchPopularPosts()
      store.requestStop = true
    } else {
      results = await searchBooru(page, tags)
    }
    if (Array.isArray(results) && results.length > 0) {
      store.currentPage = page
      store.imageList = [...store.imageList, ...results]
      pushPageState(page)
      page++
    } else {
      store.requestStop = true
    }
  } catch (error) {
    console.log('fetch error: ' + error)
  } finally {
    store.requestState = false
  }
}

const calcFetchTimes = () => {
  const vcont = document.querySelector('._vcont')
  const cnth = vcont?.clientHeight
  const doch = document.documentElement.clientHeight
  return cnth ? Math.floor(doch / cnth) : 1
}

const initData = async () => {
  await fetchData()
  if (store.requestStop) return
  const times = calcFetchTimes()
  for (let index = 0; index < times; index++) {
    await fetchData()
  }
}

const refresh = () => {
  page = 1
  store.imageList = []
  store.selectedImageList = []
  store.requestStop = false
  initData()
}

onMounted(async () => {
  await initData()
  eventBus.$on('loadPostByPage', (toPage: string) => {
    page = Number(toPage) || 1
    store.imageList = []
    fetchData()
  })
  window.addEventListener('scroll', throttleScroll(scroll => {
    if (!store.showFab && scroll > 200) store.showFab = true
    if (store.requestStop) return
    if (store.requestState) return
    isReachBottom() && fetchData()
  }, () => {
    if (store.showFab) store.showFab = false
  }))
})
</script>
