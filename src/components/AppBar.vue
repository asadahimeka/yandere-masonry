<template>
  <v-app-bar ref="barRef" app dense flat class="app-bar-glass" :class="{ 'app-bar--auto-hidden': autoHidden }" :elevation="2">
    <v-app-bar-nav-icon @click="toggleDrawer()" />
    <div v-if="store.isYKSite && showPopAction" style="display:flex" class="align-center">
      <v-toolbar-title class="mr-4 hidden-md-and-down" v-text="popTitle" />
      <v-switch v-model="isPopSearchByDate" class="hidden-sm-and-down" hide-details :label="isPopSearchByDate ? $t('nd4UjZy2ILsc-iW9iu7xR') : $t('elkBQ9moOZ-KMcy5bt_Ts')" />
      <v-menu transition="slide-y-transition" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn small class="ml-4" v-bind="attrs" v-on="on">
            <v-icon left>{{ mdiCalendarSearch }}</v-icon>
            <span style="margin-bottom:2px">{{ periodComputedMap[recentPeriod][0] }}</span>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item v-for="(val, key) in periodComputedMap" :key="key" dense @click="selPeriod(key)">
            <v-list-item-title>
              <v-icon left>{{ val[1] }}</v-icon>
              <span>{{ val[0] }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu
        v-model="showPopDatePicker"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <div v-show="isPopSearchByDate" class="ml-1 align-center hidden-sm-and-down" style="display: flex;width: 211px;">
            <v-btn icon @click="loadPrevPeriod()">
              <v-icon>{{ mdiChevronLeft }}</v-icon>
            </v-btn>
            <v-text-field
              v-model="popSearchDate"
              :prepend-icon="mdiCalendar"
              readonly
              hide-details
              v-bind="attrs"
              v-on="on"
            />
            <v-btn icon @click="loadNextPeriod()">
              <v-icon>{{ mdiChevronRight }}</v-icon>
            </v-btn>
          </div>
        </template>
        <v-date-picker
          v-model="popSearchDate"
          no-title
          locale="zh-cn"
          :weekday-format="() => ''"
          @input="showPopDatePicker = false"
        />
      </v-menu>
      <v-btn class="ml-3 hidden-sm-and-down" icon href="/post?_wf=1">
        <v-icon>{{ mdiHome }}</v-icon>
      </v-btn>
    </div>
    <div v-else-if="store.showPostList" style="display:flex" class="align-center">
      <v-toolbar-title class="hidden-md-and-down" v-text="title" />
      <input
        v-if="!isSankakuSite"
        :value="store.currentPage"
        class="ml-1 mr-2 text-center rounded"
        :style="{ width: '40px', height: '30px', border: '1px solid #bbb', color: 'inherit' }"
        @keyup="goToPage($event)"
      >
      <template v-if="store.isYKSite">
        <v-btn v-if="userName" class="hidden-sm-and-down" :title="$t('HzMBcS2oNGVIoLiHWprim')" icon @click="fetchTaggedPosts(`vote:3:${userName} order:vote`)">
          <v-icon>{{ mdiStar }}</v-icon>
        </v-btn>
        <v-btn class="hidden-sm-and-down" :title="$t('DXEhXAQbkiCMU_l252jo_')" icon @click="showPool()">
          <v-icon :size="20">{{ mdiImageMultiple }}</v-icon>
        </v-btn>
        <v-btn class="hidden-sm-and-down" :title="$t('9juZMc0gPIgvMPKVORpJ1')" icon @click="goToPopularPage()">
          <v-icon>{{ mdiFire }}</v-icon>
        </v-btn>
        <v-btn class="hidden-sm-and-down" :title="$t('6acPWiYq2-OdySa2_xqDu')" icon @click="fetchTaggedPosts('order:random')">
          <v-icon>{{ mdiShuffle }}</v-icon>
        </v-btn>
      </template>
      <template v-if="isSupportTagSearch || isSankakuSite">
        <v-menu
          v-model="searchState.showMenu"
          :max-width="200"
          max-height="80vh"
          transition="slide-y-transition"
          nudge-bottom="5px"
          offset-y
        >
          <template #activator="{ on }">
            <v-slide-x-transition>
              <div v-show="searchState.showInput" class="app-bar-tag-input ml-4" style="width: 200px">
                <v-text-field
                  v-model="searchState.searchTerm"
                  hide-details
                  v-on="on"
                  @input="onSearchTermInput"
                  @click="searchState.showMenu = true"
                  @blur="searchState.showMenu = false"
                  @keydown="onSearchTermKeydown"
                />
              </div>
            </v-slide-x-transition>
          </template>
          <v-list v-if="searchState.searchItems.length" class="ac_tags_list" dense>
            <v-progress-linear :active="searchState.loading" :height="4" indeterminate absolute top />
            <v-list-item v-for="item in searchState.searchItems" :key="item" dense @click="selectTag(item)">
              <v-list-item-title v-text="item" />
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn :title="$t('ZztrWbSaaaas3v0cHtSmh')" icon @click="showTagsInput()">
          <v-icon>{{ mdiMagnify }}</v-icon>
        </v-btn>
      </template>
      <v-btn
        v-if="isSzuru"
        class="hidden-sm-and-down szuru-guide-btn ml-1"
        color="deep-orange"
        dark
        small
        :title="$t('szurubooruAppBarHint')"
        @click="store.showSettings = true"
      >
        <v-icon left :size="16" style="color:white!important">{{ mdiInformationOutline }}</v-icon>
        <span style="color:white">{{ $t('szurubooruGuideBtn') }}</span>
      </v-btn>
    </div>
    <div v-else-if="store.showPoolList" style="display:flex" class="align-center">
      <v-toolbar-title v-if="store.showPoolList" class="mr-3 hidden-md-and-down">Pools</v-toolbar-title>
      <v-text-field
        v-model="poolQueryTerm"
        hide-details
        :append-icon="mdiMagnify"
        @keyup.enter="searchPool"
      />
      <v-btn class="ml-3" icon href="/post?_wf=1">
        <v-icon>{{ mdiHome }}</v-icon>
      </v-btn>
      <v-btn class="hidden-sm-and-down" :title="$t('9juZMc0gPIgvMPKVORpJ1')" icon @click="goToPopularPage()">
        <v-icon>{{ mdiFire }}</v-icon>
      </v-btn>
    </div>
    <v-spacer />
    <template v-if="store.showPostList && notPartialSupportSite">
      <span
        v-show="store.selectedImageList.length"
        class="hidden-md-and-down ml-1 mr-1"
        style="margin-top: 2px;"
      >
        {{ store.selectedImageList.length }}
      </span>
      <v-btn class="hidden-md-and-down" icon @click="selectAll">
        <v-icon v-show="isNoSelected">{{ mdiCheckboxBlankOutline }}</v-icon>
        <v-icon v-show="isOneOrMoreSelected">{{ mdiCheckboxIntermediate }}</v-icon>
        <v-icon v-show="isAllSelected">{{ mdiCheckboxMarked }}</v-icon>
      </v-btn>
      <v-menu dense offset-y :close-on-content-click="false">
        <template #activator="{ on, attrs }">
          <v-btn class="hidden-md-and-down" :title="$t('OKs1ePekQA4Ona839U114')" icon v-bind="attrs" v-on="on">
            <v-icon>{{ mdiDownload }}</v-icon>
          </v-btn>
        </template>
        <v-list dense flat style="min-width: 300px;max-height: 80vh;overflow: auto;">
          <v-subheader class="ml-2">
            <span class="mr-4">{{ $t('OKs1ePekQA4Ona839U114') }}</span>
            <v-btn v-show="store.selectedImageList.length > 0" small @click="startDownload">
              {{ $t('cKn4cfAxzdgh_HD6OFibB') }}
            </v-btn>
            <v-btn v-show="store.selectedImageList.length > 0" class="ml-2" small @click="exportFileUrls">
              {{ $t('J2Ckb_-LITfmww4aEksqk') }}
            </v-btn>
          </v-subheader>
          <div v-if="showDownloadSourceSwitch" class="d-flex align-center mt-1 ml-2">
            <v-radio-group
              v-model="downloadUrlKey"
              class="mr-1 mt-0"
              hide-details
              dense
              row
            >
              <v-radio v-for="item in downloadSourceOptions" :key="item.value" :label="item.text" :value="item.value" />
            </v-radio-group>
          </div>
          <div v-if="store.isYKSite" class="d-flex align-center mt-1 ml-2">
            <v-switch
              v-model="isExportUrlDecode"
              class="mt-0 mr-1"
              label="Decode URL"
              hide-details
              dense
            />
          </div>
          <div v-if="!isZerochanPage()" class="d-flex align-center mt-1 ml-2">
            <v-switch
              v-model="isExportUrlEncode"
              class="mt-0 mr-1"
              label="Encode URL"
              hide-details
              dense
            />
          </div>
          <v-list-item-group color="primary">
            <v-list-item v-for="item in store.selectedImageList" :key="item.id" dense two-line>
              <v-list-item-avatar>
                <v-btn v-if="!item.loading && !item.loaded" icon>
                  <v-icon>{{ mdiFileClockOutline }}</v-icon>
                </v-btn>
                <v-btn v-if="item.loaded" icon color="green">
                  <v-icon>{{ mdiCheckUnderlineCircle }}</v-icon>
                </v-btn>
                <v-progress-circular v-if="item.loading" :rotate="-90" :size="28" :value="loadingValue" color="pink" />
              </v-list-item-avatar>
              <v-list-item-content style="max-width: 240px;">
                <!-- <v-list-item-title :title="item[downloadNameKey]" v-text="item[downloadNameKey]" /> -->
                <v-list-item-subtitle :title="item.fileNameWithTags" v-text="item.fileNameWithTags" />
                <v-list-item-subtitle :title="getItemDownloadUrl(item)" v-text="getItemDownloadUrl(item)" />
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="removeFromList(item.id)">
                  <v-icon>{{ mdiDelete }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </template>
    <v-btn :title="$t('u8mEnSo4mxDRUbj7FeAll')" icon @click="toggleDarkmode">
      <v-icon>{{ mdiBrightness6 }}</v-icon>
    </v-btn>
    <v-btn class="hidden-md-and-down" :title="$t('OrwwNKZ7I70-ecpspE8d_')" icon @click="toggleFullscreen">
      <v-icon :size="30">{{ store.isFullscreen ? mdiFullscreenExit : mdiFullscreen }}</v-icon>
    </v-btn>
    <v-menu transition="slide-y-transition" offset-y>
      <template #activator="{ on, attrs }">
        <v-btn class="hidden-md-and-down" title="Language" icon v-bind="attrs" v-on="on">
          <v-icon>{{ mdiTranslate }}</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item-group :value="settings.lang" color="primary">
          <v-list-item v-for="lang in langList" :key="lang.value" :value="lang.value" dense @click="selectLang(lang.value)">
            <v-list-item-title>{{ lang.label }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <v-btn :title="$t('UxxldE9xRwmQctrvba5Y8')" icon @click="store.showSettings = true">
      <v-icon :size="22">{{ mdiCog }}</v-icon>
    </v-btn>
    <v-btn class="hidden-md-and-down" :title="$t('ClZdL9hGweOokP7Mn_Ptq')" icon @click="exitMasonry">
      <v-icon>{{ mdiLocationExit }}</v-icon>
    </v-btn>
    <v-progress-linear
      :active="store.requestLoading"
      :height="6"
      indeterminate
      absolute
      bottom
    />
  </v-app-bar>
</template>

<script setup lang="ts">
import {
  mdiBrightness6,
  mdiCalendar,
  mdiCalendarMonth,
  mdiCalendarSearch,
  mdiCalendarText,
  mdiCalendarToday,
  mdiCalendarWeek,
  mdiCheckUnderlineCircle,
  mdiCheckboxBlankOutline,
  mdiCheckboxIntermediate,
  mdiCheckboxMarked,
  mdiChevronLeft,
  mdiChevronRight,
  mdiCog,
  mdiDelete,
  mdiDownload,
  mdiFileClockOutline,
  mdiFire,
  mdiFullscreen,
  mdiFullscreenExit,
  mdiHome,
  mdiImageMultiple,
  mdiInformationOutline,
  mdiLocationExit,
  mdiMagnify,
  mdiShuffle,
  mdiStar,
  mdiTranslate,
} from '@mdi/js'
import { computed, onMounted, onUnmounted, reactive, ref, set, watch } from 'vue'
import { useVuetify } from '@/plugins/vuetify'
import { addDate, debounce, downloadFile, downloadText, eventBus, formatDate, showMsg, subDate } from '@/utils'
import { settings, store, toggleDrawer } from '@/store'
import { langList } from '@/store/settings'
import { loadPostsByPage, loadPostsByTags, refreshPosts } from '@/store/actions/post'
import { getRecentTags, getUsername, isPopularPage } from '@/api/moebooru'
import { defCompTags, getSiteTitle, isSampleDownloadSupportedSite, isSupportTagSearch, notPartialSupportSite } from '@/api/booru'
import { fetchAutocomplete, isAutocompleteAct } from '@/api/autocomplete'
import { isSankakuSite } from '@/api/sankaku'
import { isSzurubooru } from '@/api/szurubooru'
import { isR34PahealHome } from '@/api/r34-paheal'
import { isZerochanPage } from '@/api/zerochan'
import { uhdpaper, uhdpaperSearchUrl } from '@/api/uhdpaper'
import { type DownloadUrlKey, getActiveDownloadUrlKey, getAvailableDownloadUrlKeys, resolvePostDownloadSource } from '@/utils/download-source'
import i18n from '@/utils/i18n'

const title = computed(() => `${getSiteTitle()} - ${store.imageList.length} Posts - Page `)
const isSzuru = computed(() => isSzurubooru())

const isNoSelected = computed(() => store.selectedImageList.length === 0)
const isOneOrMoreSelected = computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length < store.imageList.length)
const isAllSelected = computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length === store.imageList.length)
const loadingValue = ref(0)

function selectAll() {
  if (isNoSelected.value || isOneOrMoreSelected.value) {
    setTimeout(() => {
      const arr = [...store.imageList]
      arr.forEach(item => {
        Object.assign(item, { fileNameWithTags: `${location.hostname} ${item.id} ${item.tags.join(' ')}` })
      })
      store.selectedImageList = arr
    })
  }
  if (isAllSelected.value) {
    setTimeout(() => {
      store.selectedImageList = []
    })
  }
}

function removeFromList(id: string) {
  store.selectedImageList = store.selectedImageList.filter(e => {
    if (e.loading) return true
    return e.id !== id
  })
}

const searchParams = new URLSearchParams(location.search)
const tagsQuery = searchParams.get('tags') || (uhdpaper.is() ? searchParams.get('q') : null)
const searchState = reactive({
  showInput: !!tagsQuery,
  showMenu: false,
  searchTerm: tagsQuery || '',
  searchItems: store.isYKSite ? defCompTags.concat(getRecentTags()) : defCompTags,
  loading: false,
})

const onSearchTermInput = debounce(async () => {
  if (!isAutocompleteAct) return
  const val = searchState.searchTerm
  const lastTag = val?.split(/\s+/).slice(-1)[0]
  if (!lastTag) {
    searchState.showMenu = false
    searchState.searchItems = defCompTags
    return
  }
  searchState.loading = true
  searchState.showMenu = true
  searchState.searchItems = await fetchAutocomplete(lastTag)
  searchState.loading = false
}, 500)

function selectTag(tag: string) {
  const termArr = searchState.searchTerm.split(/\s+/)
  searchState.searchTerm = termArr.slice(0, -1).concat(tag).join(' ')
  searchState.showMenu = false
  searchState.searchItems = defCompTags
}

const userName = ref('')
onMounted(async () => {
  if (store.isYKSite) {
    const name = await getUsername()
    if (name) userName.value = name
  }
})

function fetchTaggedPosts(tags: string) {
  if (uhdpaper.is()) {
    // uhdpaper 的搜索是站点自己的 Blogger 查询，用它的地址格式
    history.pushState('', '', uhdpaperSearchUrl(tags))
  } else {
    const url = new URL(location.href)
    url.searchParams.set('tags', tags)
    history.pushState('', '', url)
  }
  searchState.searchTerm = tags
  loadPostsByTags(tags)
}

function showTagsInput() {
  if (searchState.showInput) {
    if (!searchState.searchTerm) {
      searchState.showInput = false
    }
    fetchTaggedPosts(searchState.searchTerm)
  } else {
    searchState.showInput = true
  }
}

function onSearchTermKeydown(ev: KeyboardEvent) {
  if (ev.key != 'Enter') return
  if (searchState.showMenu && searchState.searchItems.length) {
    const item = document.querySelector<HTMLElement>('.ac_tags_list .v-list-item--highlighted')
    if (item) {
      selectTag(item.innerText)
      return
    }
    searchState.showMenu = false
    fetchTaggedPosts(searchState.searchTerm)
  } else {
    fetchTaggedPosts(searchState.searchTerm)
  }
}

const showPopAction = ref(isPopularPage())

const periodMap: Record<string, string[]> = {
  '1d': [i18n.t('Mt3-hyoH7f_pW2gnfxyur').toString(), mdiCalendarToday, 'day'],
  '1w': [i18n.t('riciqzr6ILBnpPc7KtG-C').toString(), mdiCalendarWeek, 'week'],
  '1m': [i18n.t('PQhFo-g7sgagimkleVoZR').toString(), mdiCalendarMonth, 'month'],
  '1y': [i18n.t('ze1PaiGdX4ufmoOLv_xw6').toString(), mdiCalendarText, 'year'],
}
const periodByDateMap = (() => {
  const map = { ...periodMap }
  delete map['1y']
  return map
})()

function getRecentPeriod() {
  const params = new URLSearchParams(location.search)
  let period: string | null | undefined = params.get('period')
  if (location.pathname.includes('popular_by')) {
    period = location.pathname.match(/\/post\/popular_by_(.*)/)?.[1]
    period = Object.keys(periodByDateMap).find(e => periodByDateMap[e][2] == period)
  }
  return period || '1d'
}
function isPopularRecent() {
  return location.pathname.includes('popular_recent')
}
function getPopTitle() {
  if (isPopularRecent()) {
    return `Popular Recent ${getRecentPeriod()}`
  }
  return location.pathname.split('/').pop()?.replace(/_/g, ' ').toUpperCase()
}

const popTitle = ref(getPopTitle())
const isPopSearchByDate = ref(!isPopularRecent())
const recentPeriod = ref(getRecentPeriod())
const periodComputedMap = computed(() => {
  return isPopSearchByDate.value ? periodByDateMap : periodMap
})

const showPopDatePicker = ref(false)
const popSearchDate = ref((() => {
  const params = new URLSearchParams(location.search)
  const y = params.get('year')
  const m = params.get('month')
  const d = params.get('day')
  if (y && m && d) return formatDate(new Date(`${y}-${m}-${d}`))
  return subDate(1, 'days')
})())

function fetchPopularPosts(type: string) {
  let url = `/post/popular_recent?period=${type}`
  if (isPopSearchByDate.value) {
    const [year, month, day] = popSearchDate.value.split('-')
    url = `/post/popular_by_${periodMap[type][2]}?day=${day}&month=${month}&year=${year}`
  }
  history.pushState('', '', url)
  popTitle.value = getPopTitle()
  refreshPosts()
}

function selPeriod(key: string) {
  recentPeriod.value = key
  fetchPopularPosts(key)
}

watch(popSearchDate, val => {
  if (!val) return
  fetchPopularPosts(recentPeriod.value)
})

watch(isPopSearchByDate, val => {
  recentPeriod.value = '1d'
  if (val) popSearchDate.value = subDate(1, 'days')
  fetchPopularPosts('1d')
})

function loadPrevPeriod() {
  const duration = periodMap[recentPeriod.value][2]
  popSearchDate.value = subDate(1, `${duration}s`, new Date(popSearchDate.value))
}
function loadNextPeriod() {
  const duration = periodMap[recentPeriod.value][2]
  popSearchDate.value = addDate(1, `${duration}s`, new Date(popSearchDate.value))
}

function goToPopularPage() {
  location.href = '/post/popular_recent?period=1d&_wf=1'
}

function showPool() {
  store.showPostList = false
  store.showPoolList = true
  history.pushState('', '', '/pool')
}

const poolQueryTerm = ref('')
function searchPool() {
  eventBus.$emit('loadPoolsByQuery', poolQueryTerm.value)
}

function download(url: string, name: string) {
  loadingValue.value = 0
  return downloadFile(url, name, {
    saveAs: false,
    onprogress: d => {
      loadingValue.value = (d.loaded / d.total) * 100
    },
  })
}

const hasSampleDownload = isSampleDownloadSupportedSite()
const downloadSourceOptions = computed(() => {
  const options: { text: string; value: DownloadUrlKey }[] = []
  if (hasSampleDownload) options.push({ text: i18n.t('wI4KHHIe3zNRziW4lDZrp').toString(), value: 'sampleUrl' })
  if (store.isYKSite) options.push({ text: i18n.t('aVqN9TBRCbNGsW3Y2D2Nm').toString(), value: 'jpegUrl' })
  options.push({ text: i18n.t('jDjashxA-oBPo19DXI504').toString(), value: 'fileUrl' })
  return options
})
const showDownloadSourceSwitch = computed(() => downloadSourceOptions.value.length > 1)
const downloadUrlKey = computed<DownloadUrlKey>({
  get: () => {
    const keys = getAvailableDownloadUrlKeys(hasSampleDownload, store.isYKSite)
    return getActiveDownloadUrlKey(keys, settings.downloadUrlKey)
  },
  set: val => {
    settings.downloadUrlKey = val
  },
})
function getItemDownloadUrl(item: typeof store.selectedImageList[number]) {
  return resolvePostDownloadSource(item, downloadUrlKey.value).url || ''
}
const isGelbooru = location.host.includes('gelbooru')
async function startDownload() {
  try {
    const len = store.selectedImageList.length
    if (isGelbooru) {
      for (let index = 0; index < len; index++) {
        const item = store.selectedImageList[index]
        const { url: downloadUrl, name: downloadName } = resolvePostDownloadSource(item, downloadUrlKey.value)
        if (!downloadUrl || !downloadName) continue
        download(downloadUrl, `${downloadName}`)
      }
      return
    }
    for (let index = 0; index < len; index++) {
      const item = store.selectedImageList[index]
      const { url: downloadUrl, name: resolvedName } = resolvePostDownloadSource(item, downloadUrlKey.value)
      let downloadName = store.isYKSite ? item.fileNameWithTags || resolvedName : resolvedName
      if (isR34PahealHome() && item.fileExt) {
        downloadName = `${downloadName}.${item.fileExt}`
      }
      if (!downloadUrl) continue
      if (item.loaded) continue
      set(item, 'loading', true)
      await download(downloadUrl, `${downloadName}`)
      set(item, 'loading', false)
      set(item, 'loaded', true)
    }
  } catch (error) {
    console.log('download error: ', error)
    const msg = error as string
    showMsg({ msg, type: 'error' })
  }
}

const isExportUrlDecode = ref(true)
const isExportUrlEncode = ref(false)
async function exportFileUrls() {
  const urlText = store.selectedImageList.map(e => {
    let url = resolvePostDownloadSource(e, downloadUrlKey.value).url || ''
    if (store.isYKSite && isExportUrlDecode.value) {
      try {
        url = decodeURIComponent(url)
        url = decodeURI(url)
      } catch (e) {}
    }
    if (isExportUrlEncode.value || isZerochanPage()) {
      url = encodeURI(url)
    }
    return url
  }).join('\r\n')
  downloadText(urlText, 'image-urls.txt')
}

const vuetify = useVuetify()
function toggleDarkmode() {
  vuetify.theme.dark = !vuetify.theme.dark
  settings.darkMode = vuetify.theme.dark ? 'dark' : 'light'
}

const keyActions: Record<string, Function> = {
  Enter: (cur: number) => loadPostsByPage(cur.toString()),
  ArrowUp: (cur: number) => cur > 1 && keyActions.Enter(--cur),
  ArrowDown: (cur: number) => keyActions.Enter(++cur),
  ArrowLeft: (cur: number) => keyActions.ArrowUp(cur),
  ArrowRight: (cur: number) => keyActions.ArrowDown(cur),
}
function goToPage(ev: KeyboardEvent) {
  const action = keyActions[ev.key]
  if (!action) return
  const input = ev.target as HTMLInputElement
  action(input?.value || 0)
}

function exitMasonry() {
  const url = new URL(location.href)
  url.searchParams.delete('_wf')
  location.assign(url)
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await document.documentElement.requestFullscreen()
    }
  } catch (error) {
    console.log('toggleFullscreen error: ', error)
  }
}

function selectLang(val: typeof settings.lang) {
  settings.lang = val
  i18n.locale = val
}

// 顶栏自动隐藏：向下滚收起，向上滚 / 鼠标贴近顶部 / 键盘聚焦时展开。
// 只用方向 + 累计位移判断，不再用定时器无条件回弹，否则停下来 500ms 就会落回来，
// 下次滚动又推走，看起来就是来回抽动。
const autoHidden = ref(false)
const HIDE_AFTER = 80 // 超过这个滚动位置才允许收起，避开顶部附近的抖动区
const NEAR_TOP = 24 // 回到顶部附近必定展开
const DIRECTION_DELTA = 8 // 同方向累计位移超过该值才切换，抵消阈值抖动
const JUMP_GUARD = 240 // 单帧位移过大视为程序化滚动，不参与方向判断
const REVEAL_ZONE = 12 // 鼠标进入顶部这个高度内展开

const barRef = ref<any>(null)
let lastScrollY = window.scrollY
let scrollDelta = 0
let ticking = false

function setAutoHidden(hidden: boolean) {
  scrollDelta = 0
  if (autoHidden.value !== hidden) autoHidden.value = hidden
}

// 鼠标停在顶栏上时不收起，避免正要点击时整条被推走
function isPointerOverBar() {
  const el = barRef.value?.$el as HTMLElement | undefined
  return !!el && el.matches(':hover')
}

function onWindowScroll() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(() => {
    ticking = false
    const y = window.scrollY
    const delta = y - lastScrollY
    lastScrollY = y
    if (!settings.autoHideAppBar) {
      if (autoHidden.value) setAutoHidden(false)
      return
    }
    // Vuetify 关闭弹层时恢复 scrollTop、virtual 布局的 scrollTop = 1、锚点跳转
    // 这类程序化滚动不该被当成用户往下滚
    if (Math.abs(delta) > JUMP_GUARD) {
      scrollDelta = 0
      return
    }
    if (y <= NEAR_TOP) {
      if (autoHidden.value) setAutoHidden(false)
      return
    }
    // 方向翻转时重新累计
    if (delta !== 0 && (scrollDelta > 0) !== (delta > 0)) scrollDelta = 0
    scrollDelta += delta
    if (scrollDelta > DIRECTION_DELTA && y > HIDE_AFTER) {
      if (isPointerOverBar()) {
        scrollDelta = 0
        return
      }
      setAutoHidden(true)
    } else if (scrollDelta < -DIRECTION_DELTA) {
      setAutoHidden(false)
    }
  })
}

function onPointerMove(ev: MouseEvent) {
  if (!autoHidden.value || !settings.autoHideAppBar) return
  if (ev.clientY > REVEAL_ZONE) return
  setAutoHidden(false)
}

// 键盘 Tab 进入顶栏控件时也要能看见
function onFocusIn(ev: FocusEvent) {
  if (!autoHidden.value) return
  const target = ev.target as HTMLElement | null
  if (target?.closest?.('.v-app-bar')) setAutoHidden(false)
}

watch(() => settings.autoHideAppBar, val => {
  if (!val) setAutoHidden(false)
})

onMounted(() => {
  document.addEventListener('fullscreenchange', () => {
    store.isFullscreen = !!document.fullscreenElement
  })
  window.addEventListener('scroll', onWindowScroll, { passive: true })
  window.addEventListener('mousemove', onPointerMove, { passive: true })
  document.addEventListener('focusin', onFocusIn)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onWindowScroll)
  window.removeEventListener('mousemove', onPointerMove)
  document.removeEventListener('focusin', onFocusIn)
})
</script>
