<template>
  <v-dialog v-model="store.showImageSelected" fullscreen>
    <div v-if="store.showImageSelected" class="img_detail_cont" @click="onDtlContClick">
      <template v-if="isVideo">
        <DPlayer
          v-if="isVideoShow"
          :style="`width: ${imageSelectedWidth > imageSelected.width ? imageSelected.width : imageSelectedWidth}px`"
          :options="{ theme: '#8E24AA', autoplay: true, loop: true, video: { url: imageSelected.fileUrl } }"
        />
      </template>
      <div
        v-else
        :class="{ img_scale_scroll: scaleOn, img_scale_normal: !scaleOn }"
        draggable="false"
      >
        <v-row v-show="imgLoading" class="img_detail_loading">
          <img v-if="(showPreviewThumb && !scaleOn)" :src="imgLasySrc" :width="imageSelectedWidth" alt="">
          <v-progress-circular :size="100" :width="6" indeterminate color="deep-purple" />
        </v-row>
        <img
          v-if="!scaleOn"
          class="img_detail_sample"
          alt=""
          :src="imgSrc"
          :width="imgLoading ? 0 : imageSelectedWidth"
          @click.stop="toggleToolbar"
          @load="imgLoading = false"
          @error="onImageLoadError"
        >
        <img
          v-if="scaleOn"
          class="img_detail_scale"
          draggable="false"
          alt=""
          :src="scaleImgSrc"
          :style="scaleImgStyle"
          @load="imgLoading = false"
          @error="onScaleImgError"
        >
      </div>
    </div>
    <v-toolbar
      v-show="showImageToolbar && scaleOn && !isVideo"
      class="img_detail_btn_color"
      style="position:absolute;top:0;width:100%;z-index:10;"
      color="transparent"
      height="auto"
      flat
    >
      <v-spacer />
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            v-bind="attrs"
            class="mr-1 hidden-sm-and-down"
            v-on="on"
            @click.stop="imgScaleState = 'FitToPage'"
          >
            <v-icon>{{ mdiFitToScreenOutline }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('M-wISnLiQgM_DURMwKZGT') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            class="mr-1"
            v-bind="attrs"
            v-on="on"
            @click.stop="imgScaleState = 'FitToWidth'"
          >
            <v-icon>{{ mdiTableSplitCell }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('ad8lEoWap_nT9U69WBKen') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            class="mr-1"
            v-bind="attrs"
            v-on="on"
            @click.stop="imgScaleState = 'FitToHeight'"
          >
            <v-icon style="transform:rotate(90deg)">{{ mdiTableSplitCell }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('GjMNbm97OgVvpIYlkOisE') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            class="mr-1"
            v-bind="attrs"
            v-on="on"
            @click.stop="imgScaleState = 'Original'"
          >
            <v-icon>{{ mdiLoupe }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('KkkM-iz8RCVQoTrTfhS5j') }}</span>
      </v-tooltip>
      <v-tooltip v-if="!store.isFullscreen" bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            v-bind="attrs"
            class="mr-1 hidden-sm-and-down"
            v-on="on"
            @click.stop="reqFullscreen"
          >
            <v-icon>{{ mdiFullscreen }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('XvOYJ5gHo37M1XztPl18z') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            class="mr-1"
            v-bind="attrs"
            v-on="on"
            @click.stop="rotateImg"
          >
            <v-icon>{{ mdiRotateRight }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('_bQs7o9oQSo7ao1G0cp3d') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            class="mr-1"
            v-bind="attrs"
            v-on="on"
            @click.stop="zoomOutImg()"
          >
            <v-icon>{{ mdiMagnifyMinusOutline }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('lPPsX2CZbXwC-EGN79Rki') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn fab small v-bind="attrs" v-on="on" @click.stop="close">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('t83UAY18UebTg1_-zFGP3') }}</span>
      </v-tooltip>
    </v-toolbar>
    <v-toolbar
      v-show="showImageToolbar && !scaleOn"
      class="img_detail_btn_color"
      style="position:absolute;top:0;width:100%;z-index:10;"
      color="transparent"
      height="auto"
      flat
    >
      <v-chip
        class="hidden-xs-only"
        small
        role="button"
        tabindex="0"
        @click.stop="toDetailPage"
        v-text="`${imageSelected.rating?.toUpperCase()} ${imageSelected.id}`"
      />
      <v-chip
        v-if="imgCreateTime"
        class="ml-1 hidden-sm-and-down"
        small
        :title="imageSelected.createdTime"
        v-text="imgCreateTime"
      />
      <v-spacer />
      <v-tooltip v-if="isFavBtnShow" bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            v-bind="attrs"
            class="mr-1"
            v-on="on"
            @click.stop="addFavorite"
          >
            <v-icon>{{ postDetail.voted ? mdiHeart : mdiHeartPlusOutline }}</v-icon>
          </v-btn>
        </template>
        <span>{{ postDetail.voted ? $t('pEU9Y9K7DsODkocCDwq_O') : $t('2ZPEAvLkCbV3mC0iJAw9K') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            v-bind="attrs"
            class="mr-1"
            :href="imageSelected.postView"
            target="_blank"
            rel="noreferrer"
            v-on="on"
          >
            <v-icon>{{ mdiLinkVariant }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('caFFJlrS1wa_F86uKPykd') }}</span>
      </v-tooltip>
      <v-tooltip v-if="imageSelected.sourceUrl" bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            v-bind="attrs"
            class="mr-1"
            v-on="on"
            @click.stop="toSourcePage"
          >
            <v-icon>{{ mdiLaunch }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('qSF4OLshg2EEX4CwtBE6r') }} {{ imageSelected.sourceUrl }}</span>
      </v-tooltip>
      <v-tooltip v-if="!isVideo" bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            class="mr-1"
            v-bind="attrs"
            v-on="on"
            @click.stop="zoomInImg()"
          >
            <v-icon>{{ mdiMagnifyPlusOutline }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('B_ptN5O-9PhmG5ymGGtc6') }}</span>
      </v-tooltip>
      <v-menu v-if="notR34Fav" dense open-on-hover offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            v-show="!downloading"
            fab
            small
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
              <v-list-item-title>{{ $t('wI4KHHIe3zNRziW4lDZrp') }}</v-list-item-title>
              <v-list-item-subtitle v-text="imageSelected.sampleDownloadText" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="imageSelected.jpegUrl" two-line link dense>
            <v-list-item-content @click.stop="download(imageSelected.jpegUrl, imageSelected.jpegDownloadName)">
              <v-list-item-title>{{ $t('k4YzDnBtd_S2UpAQucGxF') }}</v-list-item-title>
              <v-list-item-subtitle v-text="imageSelected.jpegDownloadText" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line link dense>
            <v-list-item-content @click.stop="download(imageSelected.fileUrl, imageSelected.fileDownloadName)">
              <v-list-item-title>{{ $t('VpuyxZtIoDF9-YyOm0tK_') }}</v-list-item-title>
              <v-list-item-subtitle v-text="imageSelected.fileDownloadText" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-progress-circular v-show="downloading" indeterminate class="ml-1 mr-2" color="primary" />
      <v-tooltip v-if="notPartialSupportSite && notR34Fav" bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            small
            class="mr-1"
            v-bind="attrs"
            v-on="on"
            @click.stop="addToList"
          >
            <v-icon>{{ mdiPlaylistPlus }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('hVmfDxXoj8vkgVQabEOSr') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn fab small v-bind="attrs" v-on="on" @click.stop="close">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('t83UAY18UebTg1_-zFGP3') }}</span>
      </v-tooltip>
    </v-toolbar>
    <!-- <div v-show="showImageToolbar" class="img_detail_btn_color hidden-sm-and-down"> -->
    <div v-show="showImageToolbar" class="img_detail_btn_color">
      <!-- <div v-show="!isVideo" style="position: absolute;z-index: 10;bottom: 12px;padding: 0 12px;"> -->
      <div style="position: absolute;z-index: 10;bottom: 12px;padding: 0 12px;">
        <v-chip
          v-show="postDetail.tags?.length"
          small
          class="mr-1"
          role="button"
          tabindex="0"
          @click.stop="toggleTagsShow()"
        >
          <v-icon left>{{ mdiTagMultiple }}</v-icon>
          <span>{{ showTagChipGroup ? $t('gM92sLo0Cqfl2rCaXlOhc') : $t('l5W-EtJ_ar-SY2lF4H5Zm') }}</span>
        </v-chip>
        <template v-if="store.isYKSite">
          <v-chip
            v-if="//@ts-ignore
              imageSelected?.data?.parent_id"
            small
            class="mr-1"
            role="button"
            tabindex="0"
            @click.stop="//@ts-ignore
              toPidPage(imageSelected?.data?.parent_id)"
          >
            <v-icon small left>{{ mdiFolderNetwork }}</v-icon>
            <span>{{ $t('sMkrF8bqCTJZZ1kXTkT_R') }}</span>
          </v-chip>
          <v-chip
            v-if="//@ts-ignore
              imageSelected?.data?.has_children"
            small
            class="mr-1"
            role="button"
            tabindex="0"
            @click.stop="toTagsPage(`parent:${imageSelected?.id}&_wf=1`)"
          >
            <v-icon small left>{{ mdiFileTree }}</v-icon>
            <span>{{ $t('u0K7A_hv1RZSJl6TDR61A') }}</span>
          </v-chip>
        </template>
        <v-chip-group v-show="showTagChipGroup" column class="img_detail_tag_list">
          <v-chip
            v-for="(item, i) in postDetail.tags || []"
            :key="i"
            small
            class="img_detail_tag mr-1"
            :class="`tag_type_${item.type}`"
            :color="item.color"
            text-color="#ffffff"
            role="button"
            tabindex="0"
            @click.stop="toTagsPage(item.tag)"
            v-text="item.tagText"
          />
        </v-chip-group>
      </div>
      <v-btn fab small class="poa_left_center hidden-sm-and-down" style="z-index: 10;" @click.stop="showPrevPost">
        <v-icon>{{ mdiChevronLeft }}</v-icon>
      </v-btn>
      <v-btn fab small class="poa_right_center hidden-sm-and-down" style="z-index: 10;" @click.stop="showNextPost">
        <v-icon>{{ mdiChevronRight }}</v-icon>
      </v-btn>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiDownload,
  mdiFileTree,
  mdiFitToScreenOutline,
  mdiFolderNetwork,
  mdiFullscreen,
  mdiHeart,
  mdiHeartPlusOutline,
  mdiLaunch,
  mdiLinkVariant,
  mdiLoupe,
  mdiMagnifyMinusOutline,
  mdiMagnifyPlusOutline,
  mdiPlaylistPlus,
  mdiRotateRight,
  mdiTableSplitCell,
  mdiTagMultiple,
} from '@mdi/js'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { formatDistanceToNow, isValid } from 'date-fns'
import DPlayer from './DPlayer.vue'
import { debounce, downloadFile, dragElement, isURL, showMsg } from '@/utils'
import { type PostDetail, getPostDetail } from '@/api/moebooru'
import { addPostToFavorites, isFavBtnShow } from '@/api/fav'
import { isRule34FavPage } from '@/api/rule34'
import { isGelbooruFavPage } from '@/api/gelbooru'
import { notPartialSupportSite } from '@/api/booru'
import { getZerochanFileUrl, isZerochanPage } from '@/api/zerochan'
import { getSankakuIdolDetail, isSankakuIdolPage } from '@/api/sankaku-idol'
import { getAnimePicturesDetail, isAnimePicturesPage } from '@/api/anime-pictures'
import { getAllGirlDetail, isAllGirlPage } from '@/api/all-girl'
import { getHentaiBooruDetail, isHentaiBooruPage } from '@/api/hentaibooru'
import { getKusowankaDetail, isKusowankaPage } from '@/api/kusowanka'
import { isR34PahealHome } from '@/api/r34-paheal'
import { isRealbooruPage } from '@/api/realbooru'
import i18n from '@/utils/i18n'
import store from '@/store'
import { searchPosts } from '@/store/actions/post'

const notR34Fav = ref(!(isRule34FavPage() || isGelbooruFavPage() || isZerochanPage() || isRealbooruPage()))

const showImageToolbar = ref(true)
const imgLoading = ref(true)
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
const isVideo = computed(() => ['.mp4', '.webm'].some(e => {
  const { fileUrl, fileExt } = imageSelected.value
  if (!fileUrl) return false
  try {
    if (['mp4', 'webm'].includes(fileExt)) {
      return true
    }
    const url = new URL(fileUrl)
    return url.pathname.endsWith(e)
  } catch (_error) {
    return false
  }
}))
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
      innerWidth.value * 1,
      imageSelected.value.sampleWidth || innerWidth.value,
    ).toString(),
  )
  const height = Math.min(innerHeight.value * 1, imageSelected.value.sampleHeight || innerHeight.value)
  const width2 = Number.parseInt((height * imageSelected.value.aspectRatio).toString())
  return Math.min(width, width2)
})

const notYKSite = computed(() => {
  return ['konachan', 'yande'].every(e => !location.host.includes(e))
})

const imgCreateTime = computed(() => {
  if (!isValid(imageSelected.value.createdAt)) return ''
  return formatDistanceToNow(imageSelected.value.createdAt as Date, { addSuffix: true })
})

const toggleToolbar = () => {
  if (scaleOn.value) return
  showImageToolbar.value = !showImageToolbar.value
}

const toTagsPage = (tag: string) => {
  if (notYKSite.value) return
  window.open(`/post?tags=${tag}`, '_blank', 'noreferrer')
}

const toPidPage = (pid: string) => {
  if (notYKSite.value) return
  window.open(`/post/show/${pid}`, '_blank', 'noreferrer')
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
  if (location.host.includes('gelbooru')) {
    setTimeout(() => {
      downloading.value = false
    }, 1000)
  }
  if (store.isYKSite) {
    name = `${location.hostname} ${imageSelected.value.id} ${imageSelected.value.tags.join(' ')}`
  }
  if (isR34PahealHome()) {
    // @ts-expect-error protected prop
    name = `${name}.${imageSelected.value.data.file_name.split('.').pop()}`
  }
  try {
    downloading.value = true
    await downloadFile(url, name)
    downloading.value = false
  } catch (error) {
    downloading.value = false
    showMsg({ msg: `${i18n.t('FAqj5ONm50QMfIt9Vq2p1')}: ${error}`, type: 'error' })
  }
}

const addToList = () => {
  store.addToSelectedList(imageSelected.value)
}

const close = () => {
  store.showImageSelected = false
}

const onDtlContClick = (ev: Event) => {
  const el = ev.target as HTMLElement
  if (el?.className?.includes?.('img_detail_cont')) {
    close()
  }
}

const postDetail = ref<PostDetail>({})

const addFavorite = async () => {
  if (!isFavBtnShow || postDetail.value.voted) return
  const isSuccess = await addPostToFavorites(imageSelected.value.id)
  if (isSuccess) postDetail.value.voted = true
}

const isCNLang = i18n.locale.includes('zh')
const setPostDetail = async () => {
  if (store.isYKSite) {
    postDetail.value = {
      voted: false,
      tags: [],
    }
    const result = await getPostDetail(imageSelected.value.id)
    if (result) postDetail.value = result
    return
  }
  if (isAnimePicturesPage()) {
    const { tags, fileUrl } = await getAnimePicturesDetail(imageSelected.value.id)
    if (tags?.length) imageSelected.value.tags = tags
    if (fileUrl) imageSelected.value.fileUrl = fileUrl
  }
  if (isSankakuIdolPage()) {
    const { sampleUrl, fileUrl } = await getSankakuIdolDetail(imageSelected.value.id)
    if (sampleUrl) imageSelected.value.sampleUrl = sampleUrl
    if (fileUrl) imageSelected.value.fileUrl = fileUrl
  }
  if (isAllGirlPage()) {
    const { fileUrl } = await getAllGirlDetail(imageSelected.value.id)
    if (fileUrl) imageSelected.value.fileUrl = fileUrl
  }
  if (isHentaiBooruPage()) {
    const { fileUrl } = await getHentaiBooruDetail(imageSelected.value.id)
    if (fileUrl) imageSelected.value.fileUrl = fileUrl
  }
  if (isKusowankaPage()) {
    const { fileUrl, tags } = await getKusowankaDetail(imageSelected.value.id)
    if (fileUrl) imageSelected.value.fileUrl = fileUrl
    if (tags?.length) imageSelected.value.tags = tags
  }
  postDetail.value = {
    voted: false,
    tags: imageSelected.value.tags.map(tag => {
      const tagCN = window.__tagsCN?.[tag.replace(/_/g, ' ')]
      return {
        tag,
        tagText: isCNLang && tagCN ? `${tag} [ ${tagCN} ]` : tag,
        color: '#8F77B5',
        type: 'general',
      }
    }),
  }
}

const preloadImgEl = new Image()
const preloadImg = (src: string) => {
  console.log('preloadImg: ', src)
  return new Promise((resolve, reject) => {
    preloadImgEl.src = src
    preloadImgEl.onload = resolve
    preloadImgEl.onerror = reject
  })
}

const preloadNextImg = async () => {
  if (!store.isFullImgPreload) return
  if (isVideo.value) return
  for (let index = 1; index <= store.imgPreloadNum; index++) {
    console.log('index: ', index)
    const next = store.imageList[store.imageSelectedIndex + index]
    if (!next) break
    const imgSrc = (scaleOn.value ? next.jpegUrl : next.sampleUrl) || next.fileUrl
    await preloadImg(imgSrc || '')
  }
}

const isVideoShow = ref(true)
const toggleVideoShow = async () => {
  isVideoShow.value = false
  await nextTick()
  isVideoShow.value = true
}

const showPreviewThumb = ref(true)

const showPrevPost = async () => {
  if (store.imageSelectedIndex == 0) return
  if (showPreviewThumb.value) {
    showPreviewThumb.value = false
  }
  imgLoading.value = true
  store.imageSelectedIndex--
  isVideo.value && toggleVideoShow()
  await setPostDetail()
}

const showNextPost = async () => {
  if (showPreviewThumb.value) {
    showPreviewThumb.value = false
  }
  if (store.imageSelectedIndex >= store.imageList.length - 1) {
    if (store.requestState || store.requestStop) return
    await searchPosts()
  }
  imgLoading.value = true
  store.imageSelectedIndex++
  isVideo.value && toggleVideoShow()
  await setPostDetail()
  preloadNextImg()
}

const onImageLoadError = (ev: Event) => {
  // imgLoading.value = false
  imageSelected.value.sampleUrl = null

  if (notR34Fav.value) {
    return
  }
  const { fileUrl } = imageSelected.value
  const el = ev.target as HTMLImageElement

  if (fileUrl && location.hostname.includes('zerochan')) {
    getZerochanFileUrl(imageSelected.value.id).then(url => {
      imageSelected.value.fileUrl = url
    })
    return
  }

  if (!el?.src.includes('/images/')) {
    el.src = imageSelected.value.fileUrl || ''
    return
  }
  if (fileUrl?.includes('.jpeg')) {
    imageSelected.value.fileUrl = fileUrl.replace(/\.jpeg(\?\d+)?$/, '.jpg')
    return
  }
  if (fileUrl?.includes('.jpg')) {
    imageSelected.value.fileUrl = fileUrl.replace(/\.jpg(\?\d+)?$/, '.png')
    return
  }
  if (fileUrl && isRealbooruPage()) {
    imageSelected.value.fileUrl = fileUrl.replace(/\.png(\?\d+)?$/, '.gif')
  }
}

const scaleImgSrc = computed(() => {
  return scaleOn.value
    ? (imageSelected.value.jpegUrl || imageSelected.value.fileUrl || void 0)
    : void 0
})

const onScaleImgError = (ev: Event) => {
  if (notR34Fav.value) {
    // @ts-expect-error data protected
    imageSelected.value.data.jpeg_url = null
    return
  }

  // imgLoading.value = false
  const { fileUrl } = imageSelected.value

  if (fileUrl && location.hostname.includes('zerochan')) {
    getZerochanFileUrl(imageSelected.value.id).then(url => {
      imageSelected.value.fileUrl = url
      ;(ev.target as HTMLImageElement).src = url
    })
    return
  }

  if (fileUrl?.includes('.jpeg')) {
    imageSelected.value.fileUrl = fileUrl.replace(/\.jpeg(\?\d+)?$/, '.jpg')
    ;(ev.target as HTMLImageElement).src = imageSelected.value.fileUrl
    return
  }
  if (fileUrl?.includes('.jpg')) {
    imageSelected.value.fileUrl = fileUrl.replace(/\.jpg(\?\d+)?$/, '.png')
    ;(ev.target as HTMLImageElement).src = imageSelected.value.fileUrl
    return
  }
  if (fileUrl && isRealbooruPage()) {
    imageSelected.value.fileUrl = fileUrl.replace(/\.png(\?\d+)?$/, '.gif')
    ;(ev.target as HTMLImageElement).src = imageSelected.value.fileUrl
  }
}

const scaleImgStyleMap = {
  FitToPage: { maxWidth: '100vw', maxHeight: '100vh' },
  FitToWidth: { width: '100vw' },
  FitToHeight: { height: '100vh' },
  Original: {},
}

type ImgScaleState = 'FitToPage' | 'FitToWidth' | 'FitToHeight' | 'Original'
const imgScaleState = ref<ImgScaleState>('Original')

const imgRotateDeg = ref(0)
const rotateImg = () => {
  imgScaleState.value = 'FitToPage'
  imgRotateDeg.value += 90
}

const scaleImgStyle = computed(() => ({
  ...scaleImgStyleMap[imgScaleState.value],
  'transform': `rotate(${imgRotateDeg.value}deg)`,
  'transform-origin': 'center center',
}))

let clearDragEv: (() => void) | undefined
const zoomInImg = async () => {
  scaleOn.value = true
  if (imageSelected.value.sampleUrl) {
    imgLoading.value = true
  }
  await nextTick()
  clearDragEv = dragElement('.img_scale_scroll', '.img_detail_scale')
}
const zoomOutImg = () => {
  scaleOn.value = false
  imgRotateDeg.value = 0
  clearDragEv?.()
}

const reqFullscreen = async () => {
  try {
    if (document.fullscreenElement) return
    const img = document.querySelector('.img_detail_scale')
    await img?.requestFullscreen()
  } catch (error) {
    console.log('toggleFullscreen error: ', error)
  }
}

watch(() => store.showImageSelected, async val => {
  if (val) {
    imgLoading.value = true
    await setPostDetail()
    preloadNextImg()
  } else {
    scaleOn.value = false
    postDetail.value = {}
    await nextTick()
    showPreviewThumb.value = true
  }
})

const onResize = () => {
  innerWidth.value = window.innerWidth
  innerHeight.value = window.innerHeight
}

const isTriggerEvent = computed(() => {
  if (!store.showImageSelected) return false
  if (isVideo.value) return false
  if (scaleOn.value && imgScaleState.value !== 'FitToPage') return false
  return true
})

const onWheel = debounce((ev: WheelEvent) => {
  if (!isTriggerEvent.value) return
  ev.deltaY > 0 ? showNextPost() : showPrevPost()
}, 500, true)

const onKeyup = debounce((ev: KeyboardEvent) => {
  if (!isTriggerEvent.value) return
  ev.preventDefault()
  if (['ArrowLeft', 'a', 'A'].includes(ev.key)) {
    showPrevPost()
    return
  }
  if (['ArrowRight', 'd', 'D'].includes(ev.key)) {
    showNextPost()
    return
  }
  if (['f', 'F'].includes(ev.key)) {
    addFavorite()
  }
}, 500, true)

onMounted(() => {
  window.addEventListener('resize', onResize)
  store.isListenWheelEvent && window.addEventListener('wheel', onWheel)
  store.settings.isListenKeyupEvent && window.addEventListener('keyup', onKeyup)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  store.isListenWheelEvent && window.removeEventListener('wheel', onWheel)
  store.settings.isListenKeyupEvent && window.removeEventListener('keyup', onKeyup)
})
</script>
