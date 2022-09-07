<template>
  <v-dialog
    v-model="store.showImageSelected"
    :content-class="scaleOn ? 'img_detail_scale_on' : 'img_detail'"
    :width="imageSelectedWidth > 360 ? imageSelectedWidth : 360"
    :overlay-opacity="0.7"
  >
    <v-img
      v-if="store.showImageSelected"
      :src="imgSrc"
      :lazy-src="imgLasySrc"
      :aspect-ratio="imageSelected.aspectRatio"
      style="min-width: 360px;"
      @click="toggleToolbar"
      @loadstart="imgLoading = true"
      @load="!scaleOn && (imgLoading = false)"
      @error="onImageLoadError"
    >
      <v-row v-show="imgLoading" class="img_detail_loading">
        <v-progress-circular :size="100" :width="6" indeterminate color="deep-purple" />
      </v-row>
      <v-toolbar
        v-show="showImageToolbar && scaleOn && !isVideo"
        style="position:absolute;top:0;width:100%;z-index:10;"
        color="transparent"
        height="auto"
        flat
      >
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              v-show="imageSelectedWidth > 400"
              fab
              dark
              small
              color="#ee8888b3"
              v-bind="attrs"
              class="mr-1 hidden-sm-and-down"
              v-on="on"
              @click.stop="toDetailPage"
            >
              <v-icon>{{ mdiLinkVariant }}</v-icon>
            </v-btn>
          </template>
          <span>详情</span>
        </v-tooltip>
        <v-tooltip v-if="!notYKSite" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              v-show="imageSelectedWidth > 400"
              fab
              dark
              small
              color="#ee8888b3"
              v-bind="attrs"
              class="mr-1 hidden-sm-and-down"
              v-on="on"
              @click.stop="addFavorite"
            >
              <v-icon>{{ postDetail.voted ? mdiHeart : mdiHeartPlusOutline }}</v-icon>
            </v-btn>
          </template>
          <span>{{ postDetail.voted ? '已收藏' : '收藏' }}</span>
        </v-tooltip>
        <v-spacer />
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="#ee8888b3"
              v-bind="attrs"
              class="mr-1 hidden-sm-and-down"
              v-on="on"
              @click.stop="imgScaleState = 'FitToPage'"
            >
              <v-icon>{{ mdiFitToScreenOutline }}</v-icon>
            </v-btn>
          </template>
          <span>适应页面</span>
        </v-tooltip>
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
              @click.stop="imgScaleState = 'FitToWidth'"
            >
              <v-icon>{{ mdiTableSplitCell }}</v-icon>
            </v-btn>
          </template>
          <span>适应宽度</span>
        </v-tooltip>
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
              @click.stop="imgScaleState = 'FitToHeight'"
            >
              <v-icon style="transform:rotate(90deg)">{{ mdiTableSplitCell }}</v-icon>
            </v-btn>
          </template>
          <span>适应高度</span>
        </v-tooltip>
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
              @click.stop="imgScaleState = 'Original'"
            >
              <v-icon>{{ mdiLoupe }}</v-icon>
            </v-btn>
          </template>
          <span>原始大小</span>
        </v-tooltip>
        <v-tooltip v-if="!store.isFullscreen" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="#ee8888b3"
              v-bind="attrs"
              class="mr-1"
              v-on="on"
              @click.stop="reqFullscreen"
            >
              <v-icon>{{ mdiFullscreen }}</v-icon>
            </v-btn>
          </template>
          <span>全屏</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="#ee8888b3"
              class="mr-1 hidden-sm-and-down"
              v-bind="attrs"
              v-on="on"
              @click.stop="zoomOutImg()"
            >
              <v-icon>{{ mdiMagnifyMinusOutline }}</v-icon>
            </v-btn>
          </template>
          <span>缩小</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn fab dark small color="#ee8888b3" v-bind="attrs" v-on="on" @click.stop="close">
              <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
          </template>
          <span>关闭</span>
        </v-tooltip>
      </v-toolbar>
      <v-toolbar
        v-show="showImageToolbar && !scaleOn"
        style="position:absolute;top:0;width:100%;z-index:10;"
        color="transparent"
        height="auto"
        flat
      >
        <v-chip
          v-show="imageSelectedWidth > 400"
          small
          color="#ee8888b3"
          text-color="#ffffff"
          @click.stop="toDetailPage"
          v-text="`${imageSelected.rating?.toUpperCase()} ${imageSelected.id}`"
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
              <v-icon>{{ postDetail.voted ? mdiHeart : mdiHeartPlusOutline }}</v-icon>
            </v-btn>
          </template>
          <span>{{ postDetail.voted ? '已收藏' : '收藏' }}</span>
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
              <v-icon>{{ mdiLinkVariant }}</v-icon>
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
              <v-icon>{{ mdiLaunch }}</v-icon>
            </v-btn>
          </template>
          <span>{{ `来源 ${imageSelected.sourceUrl}` }}</span>
        </v-tooltip>
        <v-tooltip v-if="!isVideo" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              fab
              dark
              small
              color="#ee8888b3"
              class="mr-1"
              v-bind="attrs"
              v-on="on"
              @click.stop="zoomInImg()"
            >
              <v-icon>{{ mdiMagnifyPlusOutline }}</v-icon>
            </v-btn>
          </template>
          <span>查看大图</span>
        </v-tooltip>
        <v-menu dense open-on-hover offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              v-show="!downloading"
              fab
              dark
              small
              color="#ee8888b3"
              class="mr-1"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{ mdiDownload }}</v-icon>
            </v-btn>
          </template>
          <v-list dense flat>
            <v-list-item v-if="imageSelected.sampleUrl" two-line link dense>
              <v-list-item-content @click.stop="download(imageSelected.sampleUrl, imageSelected.sampleDownloadName)">
                <v-list-item-title>下载样品图</v-list-item-title>
                <v-list-item-subtitle v-text="imageSelected.sampleDownloadText" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="imageSelected.jpegUrl" two-line link dense>
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
        <v-progress-circular v-show="downloading" indeterminate class="ml-1 mr-2" color="#ee8888b3" />
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
              <v-icon>{{ mdiPlaylistPlus }}</v-icon>
            </v-btn>
          </template>
          <span>加入下载列表</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn fab dark small color="#ee8888b3" v-bind="attrs" v-on="on" @click.stop="close">
              <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
          </template>
          <span>关闭</span>
        </v-tooltip>
      </v-toolbar>
      <d-player v-if="isVideo" style="width: 100%;" :options="{ theme: '#ee8888', autoplay: true, video: { url: imageSelected.fileUrl } }" />
      <!-- <video v-if="isVideo" controls style="width: 100%;" :src="imageSelected.fileUrl ?? void 0"></video> -->
      <div v-show="!isVideo" class="img_scale_scroll" draggable="false">
        <img
          :src="scaleImgSrc"
          :style="scaleImgStyleMap[imgScaleState]"
          alt=""
          draggable="false"
          @load="imgLoading = false"
          @error="onScaleImgError"
        >
      </div>
      <div v-show="!isVideo && showImageToolbar" class="hidden-sm-and-down">
        <div style="position: absolute;bottom: 12px;padding: 0 12px;">
          <v-chip
            v-show="postDetail.tags?.length"
            small
            class="mr-1"
            color="#ee8888b3"
            text-color="#ffffff"
            @click.stop="toggleTagsShow()"
          >
            <v-icon left>{{ mdiTagMultiple }}</v-icon>
            <span>{{ showTagChipGroup ? '隐藏' : '显示' }}</span>
          </v-chip>
          <v-chip-group v-show="showTagChipGroup" column>
            <v-chip
              v-for="(item, i) in postDetail.tags || []"
              :key="i"
              small
              class="mr-1"
              :color="item.color"
              text-color="#ffffff"
              @click.stop="toTagsPage(item.tag)"
              v-text="item.tagText"
            />
          </v-chip-group>
        </div>
        <v-btn fab dark small color="#ee888863" class="poa_left_center" @click.stop="showPrevPost">
          <v-icon>{{ mdiChevronLeft }}</v-icon>
        </v-btn>
        <v-btn fab dark small color="#ee888863" class="poa_right_center" @click.stop="showNextPost">
          <v-icon>{{ mdiChevronRight }}</v-icon>
        </v-btn>
      </div>
    </v-img>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiDownload,
  mdiFitToScreenOutline,
  mdiFullscreen,
  mdiHeart,
  mdiHeartPlusOutline,
  mdiLaunch,
  mdiLinkVariant,
  mdiLoupe,
  mdiMagnifyMinusOutline,
  mdiMagnifyPlusOutline,
  mdiPlaylistPlus,
  mdiTableSplitCell,
  mdiTagMultiple,
} from '@mdi/js'
import { computed, onMounted, onUnmounted, ref, watch } from '@vue/composition-api'
import DPlayer from './DPlayer.vue'
import { debounce, downloadFile, dragElement, isURL, showMsg } from '@/utils'
import { type PostDetail, addPostToFavorites, getPostDetail } from '@/api/moebooru'
import store from '@/store'

const showImageToolbar = ref(true)
const imgLoading = ref(false)
const innerWidth = ref(window.innerWidth)
const innerHeight = ref(window.innerHeight)
const downloading = ref(false)
const scaleOn = ref(false)
const showTagChipGroup = ref(localStorage.getItem('__showTags') == '1')

const toggleTagsShow = () => {
  showTagChipGroup.value = !showTagChipGroup.value
  localStorage.setItem('__showTags', showTagChipGroup.value ? '1' : '')
}

const imageSelected = computed(() => store.imageList[store.imageSelectedIndex] ?? {})
const isVideo = computed(() => ['.mp4', '.webm'].some(e => imageSelected.value.fileUrl?.endsWith(e)))
const imgSrc = computed(() => {
  if (isVideo.value) return void 0
  return imageSelected.value.sampleUrl
    ?? imageSelected.value.fileUrl
    ?? void 0
})
const imgLasySrc = computed(() => {
  if (isVideo.value) return void 0
  return imageSelected.value.previewUrl ?? void 0
})

const imageSelectedWidth = computed(() => {
  const width = Number.parseInt(
    Math.min(
      innerWidth.value * 0.98,
      imageSelected.value.sampleWidth || innerWidth.value,
    ).toString(),
  )
  const height = Math.min(innerHeight.value * 0.98, imageSelected.value.sampleHeight || innerHeight.value)
  const width2 = Number.parseInt((height * imageSelected.value.aspectRatio).toString())
  return Math.min(width, width2)
})

const notYKSite = computed(() => {
  return ['konachan', 'yande'].every(e => !location.host.includes(e))
})

const toggleToolbar = () => {
  if (scaleOn.value) return
  showImageToolbar.value = !showImageToolbar.value
}

const toTagsPage = (tag: string) => {
  if (notYKSite.value) return
  window.open(`/post?tags=${tag}`, '_blank', 'noreferrer')
}

const toDetailPage = () => {
  window.open(imageSelected.value.postView, '_blank', 'noreferrer')
}

const toSourcePage = () => {
  const { sourceUrl } = imageSelected.value
  if (!isURL(sourceUrl)) return
  window.open(sourceUrl, '_blank', 'noreferrer')
}

const download = async (url: string | null, name: string) => {
  if (!url) return
  try {
    downloading.value = true
    await downloadFile(url, name)
  } catch (error) {
    showMsg({ msg: `下载出错: ${error}`, type: 'error' })
  } finally {
    downloading.value = false
  }
}

const addToList = () => {
  store.addToSelectedList(imageSelected.value)
}

const close = () => {
  store.showImageSelected = false
}

const postDetail = ref<PostDetail>({})

const addFavorite = async () => {
  if (notYKSite.value || postDetail.value.voted) return
  const isSuccess = await addPostToFavorites(imageSelected.value.id)
  if (isSuccess) postDetail.value.voted = true
}

const setPostDetail = async () => {
  if (store.isYKSite) {
    const result = await getPostDetail(imageSelected.value.id)
    if (result) postDetail.value = result
  } else {
    postDetail.value = {
      voted: false,
      tags: imageSelected.value.tags.map(e => ({
        tag: e,
        tagText: e,
        color: '#E87A90cc',
        type: 'general',
      })),
    }
  }
}

const preload = new Image()
const preloadNextImg = () => {
  if (!store.isFullImgPreload) return
  const next = store.imageList[store.imageSelectedIndex + 1]
  if (!next) return
  const imgSrc = (scaleOn.value ? next.jpegUrl : next.sampleUrl) || next.fileUrl
  preload.src = imgSrc || ''
}

const showPrevPost = async () => {
  if (store.imageSelectedIndex == 0) return
  imgLoading.value = true
  store.imageSelectedIndex--
  await setPostDetail()
}

const showNextPost = async () => {
  if (store.imageSelectedIndex >= store.imageList.length - 1) return
  imgLoading.value = true
  store.imageSelectedIndex++
  preloadNextImg()
  await setPostDetail()
}

const onImageLoadError = () => {
  imgLoading.value = false
  imageSelected.value.sampleUrl = null
}

const scaleImgSrc = computed(() => {
  return scaleOn.value
    ? (imageSelected.value.jpegUrl || imageSelected.value.fileUrl || void 0)
    : void 0
})

const onScaleImgError = () => {
  // @ts-expect-error data protected
  imageSelected.value.data.jpeg_url = null
}

const scaleImgStyleMap = {
  FitToPage: { maxWidth: '100vw', maxHeight: '100vh' },
  FitToWidth: { width: '100vw' },
  FitToHeight: { height: '100vh' },
  Original: {},
}

type ImgScaleState = 'FitToPage' | 'FitToWidth' | 'FitToHeight' | 'Original'
const imgScaleState = ref<ImgScaleState>('FitToWidth')

let clearDragEv: (() => void) | undefined
const zoomInImg = () => {
  scaleOn.value = true
  imgLoading.value = true
  clearDragEv = dragElement('.img_scale_scroll', 'img')
}
const zoomOutImg = () => {
  scaleOn.value = false
  clearDragEv?.()
}

const reqFullscreen = async () => {
  try {
    if (document.fullscreenElement) return
    const img = document.querySelector('.img_scale_scroll img')
    await img?.requestFullscreen()
    preloadNextImg()
  } catch (error) {
    console.log('toggleFullscreen error: ', error)
  }
}

watch(() => store.showImageSelected, async val => {
  if (val) {
    await setPostDetail()
    preloadNextImg()
  } else {
    scaleOn.value = false
    postDetail.value = {}
  }
})

const onResize = () => {
  innerWidth.value = window.innerWidth
  innerHeight.value = window.innerHeight
}

const onWheel = debounce((ev: WheelEvent) => {
  if (!store.showImageSelected) return
  if (scaleOn.value && imgScaleState.value !== 'FitToPage') return
  ev.deltaY > 0 ? showNextPost() : showPrevPost()
}, 500, true)

onMounted(() => {
  window.addEventListener('resize', onResize)
  store.isListenWheelEvent && window.addEventListener('wheel', onWheel)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  store.isListenWheelEvent && window.removeEventListener('wheel', onWheel)
})
</script>
