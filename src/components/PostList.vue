<template>
  <div v-if="showImageList">
    <virtual-waterfall
      v-if="store.settings.masonryLayout === 'virtual'"
      class="virtual-waterfall"
      :class="{ 'wf-no-fit-screen': notFitScreen }"
      :items="store.imageList"
      :calc-item-height="calcItemHeight"
      :gap="10"
      style="min-height: 99vh"
    >
      <template #default="{ item, index }">
        <v-card class="posts-image-card">
          <v-img
            transition="scroll-y-transition"
            :src="getImgSrc(item)"
            :aspect-ratio="item?.aspectRatio"
            style="background: gainsboro;border-radius: 4px;"
            @click="showImgModal(index)"
            @error="onImageLoadError"
          />
          <template v-if="store.isYKSite">
            <v-icon
              v-if="//@ts-ignore
                item?.data?.has_children"
              class="posts-image-type"
              dense
            >
              {{ mdiFileTree }}
            </v-icon>
            <v-icon
              v-if="//@ts-ignore
                item?.data?.parent_id"
              class="posts-image-type"
              dense
            >
              {{ mdiFolderNetwork }}
            </v-icon>
          </template>
          <v-icon
            v-if="item?.fileExt.toLowerCase() === 'gif'"
            class="posts-image-type"
          >
            {{ mdiFileGifBox }}
          </v-icon>
          <v-icon
            v-if="['mp4', 'webm'].includes(item?.fileExt.toLowerCase())"
            class="posts-image-type"
          >
            {{ mdiVideo }}
          </v-icon>
          <div v-if="!isR34Fav && store.settings.showPostCheckbox" class="posts-image-checkbox">
            <v-checkbox class="ma-0 pa-0" :value="store.selectedImageList.some(e => e.id === item.id)" hide-details @change="onPostCheckboxChange($event, item)" />
          </div>
          <div v-if="!isR34Fav" class="posts-image-actions">
            <v-btn icon color="#fff" :title="$t('EsiorRgoeHI8h7IHMLDA4')" :href="item.postView" target="_blank" rel="noreferrer">
              <v-icon>{{ mdiLinkVariant }}</v-icon>
            </v-btn>
            <v-btn icon color="#fff" :title="$t('hVmfDxXoj8vkgVQabEOSr')" @click.stop="addToSelectedList(item)">
              <v-icon>{{ mdiPlaylistPlus }}</v-icon>
            </v-btn>
            <v-btn icon color="#fff" :title="$t('VpuyxZtIoDF9-YyOm0tK_')" @click.stop="downloadCtxPost(item)">
              <v-icon>{{ mdiDownload }}</v-icon>
            </v-btn>
            <v-btn v-if="isFavBtnShow" icon color="#fff" :title="$t('Dnnio9m9RZA6bkTLytc99')" @click.stop="addFavorite(item.id)">
              <v-icon>{{ mdiHeartPlusOutline }}</v-icon>
            </v-btn>
          </div>
        </v-card>
      </template>
    </virtual-waterfall>
    <wf-layout v-else>
      <v-card
        v-for="(image, index) in store.imageList"
        :key="index"
        class="posts-image-card"
        :style="store.settings.masonryLayout === 'flexbin' ? `--w:${image.width};--h:${image.height}` : maxHeightStyle"
      >
        <template v-if="store.settings.masonryLayout === 'flexbin'">
          <img
            class="post-image"
            alt=""
            loading="lazy"
            :src="getImgSrc(image)"
            role="button"
            tabindex="0"
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
        </v-img>
        <template v-if="store.isYKSite">
          <v-icon
            v-if="//@ts-ignore
              image?.data?.has_children"
            class="posts-image-type"
            dense
          >
            {{ mdiFileTree }}
          </v-icon>
          <v-icon
            v-if="//@ts-ignore
              image?.data?.parent_id"
            class="posts-image-type"
            dense
          >
            {{ mdiFolderNetwork }}
          </v-icon>
        </template>
        <v-icon
          v-if="image?.fileExt.toLowerCase() === 'gif'"
          class="posts-image-type"
        >
          {{ mdiFileGifBox }}
        </v-icon>
        <v-icon
          v-if="['mp4', 'webm'].includes(image?.fileExt.toLowerCase())"
          class="posts-image-type"
        >
          {{ mdiVideo }}
        </v-icon>
        <div v-if="!isR34Fav && store.settings.showPostCheckbox" class="posts-image-checkbox">
          <v-checkbox class="ma-0 pa-0" :value="store.selectedImageList.some(e => e.id === image.id)" hide-details @change="onPostCheckboxChange($event, image)" />
        </div>
        <div v-if="!isR34Fav" class="posts-image-actions">
          <v-btn icon color="#fff" :title="$t('EsiorRgoeHI8h7IHMLDA4')" :href="image.postView" target="_blank" rel="noreferrer">
            <v-icon>{{ mdiLinkVariant }}</v-icon>
          </v-btn>
          <v-btn v-if="notPartialSupportSite" class="hidden-md-and-down" icon color="#fff" :title="$t('hVmfDxXoj8vkgVQabEOSr')" @click.stop="addToSelectedList(image)">
            <v-icon>{{ mdiPlaylistPlus }}</v-icon>
          </v-btn>
          <v-btn v-if="notPartialSupportSite" icon color="#fff" :title="$t('VpuyxZtIoDF9-YyOm0tK_')" @click.stop="downloadCtxPost(image)">
            <v-icon>{{ mdiDownload }}</v-icon>
          </v-btn>
          <v-btn v-if="isFavBtnShow" icon color="#fff" :title="$t('Dnnio9m9RZA6bkTLytc99')" @click.stop="addFavorite(image.id)">
            <v-icon>{{ mdiHeartPlusOutline }}</v-icon>
          </v-btn>
        </div>
      </v-card>
    </wf-layout>
    <div class="d-flex justify-center">
      <v-btn v-show="store.requestState" color="primary" text>
        {{ $t('RN4dt81l_fZMWODsskZob') }}...
      </v-btn>
      <v-btn v-show="showLoadMore" color="primary" text @click="searchPosts()">
        {{ $t('fC8XNfCl04zK7vgeaRZMQ') }}
      </v-btn>
      <v-btn v-show="showNoMore" class="mt-2" color="primary" text>
        {{ $t('Z4pa8GhgE63OGGvCqAld0') }}...
      </v-btn>
    </div>
    <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
      <v-list>
        <v-list-item v-if="isFavBtnShow" @click="addFavorite()">
          <v-list-item-title>{{ $t('Dnnio9m9RZA6bkTLytc99') }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="notPartialSupportSite" @click="downloadCtxPost()">
          <v-list-item-title>{{ $t('VpuyxZtIoDF9-YyOm0tK_') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="openDetail()">
          <v-list-item-title>{{ $t('EsiorRgoeHI8h7IHMLDA4') }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="notPartialSupportSite" class="hidden-md-and-down" @click="addToSelectedList()">
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
        class="refresh_posts_btn"
        @click="refreshPosts()"
      >
        <v-icon>{{ mdiRefresh }}</v-icon>
      </v-btn>
    </v-fab-transition>
    <PostDetail />
  </div>
</template>

<script setup lang="ts">
import { mdiDownload, mdiFileGifBox, mdiFileTree, mdiFolderNetwork, mdiHeartPlusOutline, mdiLinkVariant, mdiPlaylistPlus, mdiRefresh, mdiVideo } from '@mdi/js'
import { computed, nextTick, onMounted, onUnmounted, ref, set, watch } from 'vue'
import type { Post } from '@himeka/booru'
import PostDetail from './PostDetail.vue'
import { downloadFile, fancyboxShow, notReachBottom, showMsg, throttleScroll } from '@/utils'
import { notPartialSupportSite } from '@/api/booru'
import { addPostToFavorites, isFavBtnShow } from '@/api/fav'
import { isRule34FavPage } from '@/api/rule34'
import { isGelbooruFavPage } from '@/api/gelbooru'
import { initPosts, refreshPosts, searchPosts } from '@/store/actions/post'
import store from '@/store'
import i18n from '@/utils/i18n'

const notFitScreen = ref(localStorage.getItem('__fitScreen') == '0')
const isR34Fav = ref(isRule34FavPage() || isGelbooruFavPage())
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
  let src = img?.previewUrl
  if (!/\.(mp4|webm)$/i.test(img?.fileUrl || '')) {
    const num = +store.selectedColumn
    if (store.settings.isThumbSampleUrl || (num != 0 && num < 7)) {
      src = img?.sampleUrl
    }
    if (location.hostname === 'danbooru.donmai.us' && src) {
      src = src.replace(/(.*)\/180x180\/(.*)jpg/, '$1/720x720/$2webp')
    }
  }
  return src || img?.fileUrl || void 0
}

const onCtxMenu = (ev: MouseEvent, img: Post) => {
  if (isR34Fav.value) return
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
  if (store.settings.useFancybox) {
    fancyboxShow(store.imageList, index)
    return
  }
  store.imageSelectedIndex = index
  store.showImageSelected = true
}

const openDetail = (post?: Post) => {
  const img = post || ctxActPost.value
  img && window.open(img.postView, '_blank', 'noreferrer')
}

const addToSelectedList = (post?: Post) => {
  const img = post || ctxActPost.value
  img && store.addToSelectedList(img)
}

const addFavorite = (id?: string) => {
  if (!isFavBtnShow) return
  const imgId = id || ctxActPost.value?.id
  imgId && addPostToFavorites(imgId)
}

const downloadCtxPost = async (post?: Post) => {
  const img = post || ctxActPost.value
  if (!img) return
  const { fileUrl } = img
  let { fileDownloadName } = img
  if (!fileUrl) return
  if (store.isYKSite) {
    fileDownloadName = `${location.hostname} ${img.id} ${img.tags.join(' ')}`
  }
  try {
    await downloadFile(fileUrl, fileDownloadName)
  } catch (error) {
    showMsg({ msg: `${i18n.t('FAqj5ONm50QMfIt9Vq2p1')}: ${error}`, type: 'error' })
  }
}

const onPostCheckboxChange = (e: any, image: Post) => {
  e ? store.addToSelectedList(image) : store.removeFromSelectedList(image.id)
}

const onImageLoadError = (url: string) => {
  const item = store.imageList.find(e => e.previewUrl == url)
  if (!item) return
  set(item, 'previewUrl', null)
  set(item, 'sampleUrl', null)
}

const calcItemHeight = (item: any, itemWidth: number) => {
  return item.height * (itemWidth / item.width)
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
