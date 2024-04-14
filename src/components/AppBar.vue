<template>
  <v-app-bar app dense flat :elevation="2">
    <v-app-bar-nav-icon @click="store.toggleDrawer()" />
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
        <v-list v-show="store.isYKSite && searchState.searchItems.length" class="ac_tags_list" dense>
          <v-list-item v-for="item in searchState.searchItems" :key="item" dense @click="selectTag(item)">
            <v-list-item-title v-text="item" />
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn :title="$t('ZztrWbSaaaas3v0cHtSmh')" icon @click="showTagsInput()">
        <v-icon>{{ mdiMagnify }}</v-icon>
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
    <template v-if="store.showPostList">
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
          <div v-if="store.isYKSite" class="d-flex align-center mt-1 ml-2">
            <v-radio-group
              v-model="downloadUrlKey"
              class="mr-1 mt-0"
              hide-details
              dense
              row
            >
              <v-radio :label="$t('aVqN9TBRCbNGsW3Y2D2Nm')" value="jpegUrl" />
              <v-radio :label="$t('jDjashxA-oBPo19DXI504')" value="fileUrl" />
            </v-radio-group>
            <v-switch
              v-model="isExportUrlDecode"
              class="mt-0 mr-1"
              label="Decode URL"
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
                <v-list-item-subtitle :title="item[downloadUrlKey]" v-text="item[downloadUrlKey]" />
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
        <v-list-item-group v-model="currentLang" color="primary">
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
      :active="store.requestState"
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
  mdiLocationExit,
  mdiMagnify,
  mdiShuffle,
  mdiStar,
  mdiTranslate,
} from '@mdi/js'
import { computed, onMounted, reactive, ref, set, watch } from 'vue'
import { useVuetify } from '@/plugins/vuetify'
import store from '@/store'
import { addDate, debounce, downloadFile, eventBus, formatDate, showMsg, subDate } from '@/utils'
import { loadPostsByPage, loadPostsByTags, refreshPosts } from '@/store/actions/post'
import { getRecentTags, getUsername, isPopularPage, searchTagsByName } from '@/api/moebooru'
import i18n from '@/utils/i18n'

const specTitleMap: Record<string, string> = {
  'yande.re': 'yande.re',
  'konachan.com': 'Koanchan',
  'konachan.net': 'Koanchan(Safe)',
  'www.sakugabooru.com': 'sakugabooru'.toUpperCase(),
  'behoimi.org': '3dbooru',
  'rule34.paheal.net': 'rule34.paheal'.toUpperCase(),
  'booru.allthefallen.moe': 'ATFBooru',
  'aibooru.online': 'AIBooru',
}

const title = computed(() => {
  const host = location.host.toLowerCase()
  const siteName = specTitleMap[host] || (host[0].toUpperCase() + host.slice(1).split('.')[0])
  return `${siteName} - ${store.imageList.length} Posts - Page `
})

const isNoSelected = computed(() => store.selectedImageList.length === 0)
const isOneOrMoreSelected = computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length < store.imageList.length)
const isAllSelected = computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length === store.imageList.length)
const loadingValue = ref(0)

const selectAll = () => {
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

const removeFromList = (id: string) => {
  store.selectedImageList = store.selectedImageList.filter(e => {
    if (e.loading) return true
    return e.id !== id
  })
}

const tagsQuery = new URLSearchParams(location.search).get('tags')
const searchState = reactive({
  showInput: !!tagsQuery,
  showMenu: false,
  searchTerm: tagsQuery || '',
  searchItems: store.isYKSite ? getRecentTags() : [],
})

const onSearchTermInput = debounce(() => {
  if (!store.isYKSite) return
  const val = searchState.searchTerm
  const lastTag = val?.split(/\s+/).slice(-1)[0]
  if (!lastTag) {
    searchState.showMenu = false
    searchState.searchItems = []
    return
  }
  searchState.showMenu = true
  searchState.searchItems = searchTagsByName(lastTag)
}, 500)

const selectTag = (tag: string) => {
  const termArr = searchState.searchTerm.split(/\s+/)
  searchState.searchTerm = termArr.slice(0, -1).concat(tag).join(' ')
  searchState.showMenu = false
  searchState.searchItems = []
}

const userName = ref('')
onMounted(async () => {
  if (store.isYKSite) {
    const name = await getUsername()
    if (name) userName.value = name
  }
})

const fetchTaggedPosts = (tags: string) => {
  const url = new URL(location.href)
  url.searchParams.set('tags', tags)
  history.pushState('', '', url)
  searchState.searchTerm = tags
  loadPostsByTags(tags)
}

const showTagsInput = () => {
  if (searchState.showInput) {
    if (!searchState.searchTerm) {
      searchState.showInput = false
    } else {
      fetchTaggedPosts(searchState.searchTerm)
    }
  } else {
    searchState.showInput = true
  }
}

const onSearchTermKeydown = (ev: KeyboardEvent) => {
  if (ev.key != 'Enter') return
  if (store.isYKSite && searchState.searchItems.length) {
    const item = document.querySelector<HTMLElement>('.ac_tags_list .v-list-item--highlighted')
    item && selectTag(item.innerText)
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

const getRecentPeriod = () => {
  const params = new URLSearchParams(location.search)
  let period: string | null | undefined = params.get('period')
  if (location.pathname.includes('popular_by')) {
    period = location.pathname.match(/\/post\/popular_by_(.*)/)?.[1]
    period = Object.keys(periodByDateMap).find(e => periodByDateMap[e][2] == period)
  }
  return period || '1d'
}
const isPopularRecent = () => location.pathname.includes('popular_recent')
const getPopTitle = () => {
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

const fetchPopularPosts = (type: string) => {
  let url = `/post/popular_recent?period=${type}`
  if (isPopSearchByDate.value) {
    const [year, month, day] = popSearchDate.value.split('-')
    url = `/post/popular_by_${periodMap[type][2]}?day=${day}&month=${month}&year=${year}`
  }
  history.pushState('', '', url)
  popTitle.value = getPopTitle()
  refreshPosts()
}

const selPeriod = (key: string) => {
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

const loadPrevPeriod = () => {
  const duration = periodMap[recentPeriod.value][2]
  popSearchDate.value = subDate(1, `${duration}s`, new Date(popSearchDate.value))
}
const loadNextPeriod = () => {
  const duration = periodMap[recentPeriod.value][2]
  popSearchDate.value = addDate(1, `${duration}s`, new Date(popSearchDate.value))
}

const goToPopularPage = () => {
  location.href = '/post/popular_recent?period=1d&_wf=1'
}

const showPool = () => {
  store.showPostList = false
  store.showPoolList = true
  history.pushState('', '', '/pool')
}

const poolQueryTerm = ref('')
const searchPool = () => {
  eventBus.$emit('loadPoolsByQuery', poolQueryTerm.value)
}

const download = (url: string, name: string) => {
  loadingValue.value = 0
  return downloadFile(url, name, {
    saveAs: false,
    onprogress: d => {
      loadingValue.value = (d.loaded / d.total) * 100
    },
  })
}

type ImgUrlKeys = 'fileUrl' | 'jpegUrl'
type ImgNameKeys = 'jpegDownloadName' | 'fileDownloadName'
const downloadUrlKey = ref<ImgUrlKeys>('fileUrl')
const downloadNameMap: Record<ImgUrlKeys, ImgNameKeys> = {
  fileUrl: 'fileDownloadName',
  jpegUrl: 'jpegDownloadName',
}
const downloadNameKey = computed(() => {
  return downloadNameMap[downloadUrlKey.value] || 'fileDownloadName'
})
const isGelbooru = location.host.includes('gelbooru')
const startDownload = async () => {
  try {
    const len = store.selectedImageList.length
    if (isGelbooru) {
      for (let index = 0; index < len; index++) {
        const item = store.selectedImageList[index]
        const downloadUrl = item[downloadUrlKey.value] || item.fileUrl
        const downloadName = item[downloadNameKey.value]
        if (!downloadUrl) continue
        download(downloadUrl, `${downloadName}.${downloadUrl.split('.').pop()}`)
      }
      return
    }
    for (let index = 0; index < len; index++) {
      const item = store.selectedImageList[index]
      const downloadUrl = item[downloadUrlKey.value] || item.fileUrl
      const downloadName = store.isYKSite ? item.fileNameWithTags : item[downloadNameKey.value]
      if (!downloadUrl) continue
      if (item.loaded) continue
      set(item, 'loading', true)
      await download(downloadUrl, `${downloadName}.${downloadUrl.split('.').pop()}`)
      set(item, 'loading', false)
      set(item, 'loaded', true)
    }
  } catch (error) {
    const msg = error as string
    showMsg({ msg, type: 'error' })
  }
}

const isExportUrlDecode = ref(true)
const exportFileUrls = async () => {
  let urlText = store.selectedImageList.map(e => e[downloadUrlKey.value] || e.fileUrl).join('\n')
  if (store.isYKSite && isExportUrlDecode.value) {
    urlText = decodeURIComponent(urlText)
  }
  await downloadFile(`data:text/plain;charset=utf-8,${urlText}`, 'image-urls.txt')
}

const vuetify = useVuetify()
const toggleDarkmode = () => {
  vuetify.theme.dark = !vuetify.theme.dark
  localStorage.setItem('__darkmode', vuetify.theme.dark ? 'dark' : 'light')
}

const keyActions: Record<string, Function> = {
  Enter: (cur: number) => loadPostsByPage(cur.toString()),
  ArrowUp: (cur: number) => cur > 1 && keyActions.Enter(--cur),
  ArrowDown: (cur: number) => keyActions.Enter(++cur),
  ArrowLeft: (cur: number) => keyActions.ArrowUp(cur),
  ArrowRight: (cur: number) => keyActions.ArrowDown(cur),
}
const goToPage = (ev: KeyboardEvent) => {
  const action = keyActions[ev.key]
  if (!action) return
  const input = ev.target as HTMLInputElement
  action(input?.value || 0)
}

const exitMasonry = () => {
  const url = new URL(location.href)
  url.searchParams.delete('_wf')
  location.assign(url)
}

const toggleFullscreen = async () => {
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

const currentLang = ref(i18n.locale)
const langList = [
  { value: 'zh-Hans', label: '简体中文' },
  { value: 'zh-Hant', label: '繁體中文' },
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' },
]
const selectLang = (val: string) => {
  currentLang.value = val
  i18n.locale = val
  localStorage.setItem('__LANG', val)
}

onMounted(() => {
  document.addEventListener('fullscreenchange', () => {
    store.isFullscreen = !!document.fullscreenElement
  })
})
</script>
