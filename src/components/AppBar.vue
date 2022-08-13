<template>
  <v-app-bar app dense>
    <v-app-bar-nav-icon @click="store.toggleDrawer" />
    <div v-if="store.isYKSite && showPopAction" style="display:flex" class="align-center hidden-sm-and-down">
      <v-toolbar-title class="mr-4" v-text="popTitle" />
      <v-switch v-model="isPopSearchByDate" hide-details :label="isPopSearchByDate ? '按日期' : '最近人气'" />
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
              <span>{{ val[0].slice(-1) }}</span>
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
          <div v-show="isPopSearchByDate" class="ml-1 align-center" style="display: flex;width: 211px;">
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
      <v-btn class="ml-3" icon href="/post?_wf=1">
        <v-icon>{{ mdiHome }}</v-icon>
      </v-btn>
    </div>
    <div v-else-if="store.showPostList" style="display:flex" class="align-center hidden-sm-and-down">
      <v-toolbar-title class="hidden-md-and-down" v-text="title" />
      <input
        :value="store.currentPage"
        class="ml-1 mr-2 text-center rounded"
        :style="{ width: '40px', height: '30px', border: '1px solid #bbb', color: 'inherit' }"
        @keyup="goToPage($event)"
      >
      <template v-if="store.isYKSite">
        <v-btn v-if="userName" title="收藏夹" icon @click="fetchTaggedPosts(`vote:3:${userName} order:vote`)">
          <v-icon>{{ mdiStar }}</v-icon>
        </v-btn>
        <v-btn title="图集 (Pool)" icon @click="showPool()">
          <v-icon :size="20">{{ mdiImageMultiple }}</v-icon>
        </v-btn>
        <v-btn title="人气" icon @click="goToPopularPage()">
          <v-icon>{{ mdiFire }}</v-icon>
        </v-btn>
        <v-btn title="随机" icon @click="fetchTaggedPosts('order:random')">
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
            <div v-show="searchState.showInput" class="ml-4" style="width: 200px">
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
      <v-btn title="搜索标签" icon @click="showTagsInput()">
        <v-icon>{{ mdiMagnify }}</v-icon>
      </v-btn>
    </div>
    <div v-else-if="store.showPoolList" style="display:flex" class="align-center">
      <v-toolbar-title v-if="store.showPoolList" class="mr-3">Pools</v-toolbar-title>
      <v-text-field
        v-model="poolQueryTerm"
        hide-details
        :append-icon="mdiMagnify"
        @keyup.enter="searchPool"
      />
      <v-btn class="ml-3" icon href="/post?_wf=1">
        <v-icon>{{ mdiHome }}</v-icon>
      </v-btn>
      <v-btn title="人气" icon @click="goToPopularPage()">
        <v-icon>{{ mdiFire }}</v-icon>
      </v-btn>
    </div>
    <v-spacer />
    <template v-if="store.showPostList">
      <v-menu transition="slide-y-transition" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn small class="mr-6" v-bind="attrs" v-on="on">
            <v-icon left>{{ mdiViewDashboardVariant }}</v-icon>
            <span style="margin-bottom:2px">{{ store.selectedColumn === '0' ? '自动' : `${store.selectedColumn}列` }}</span>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item v-for="(val, key) in cols" :key="key" dense @click="selColumn(key)">
            <v-list-item-title v-text="val" />
          </v-list-item>
        </v-list>
      </v-menu>
      <span class="hidden-md-and-down">已选择</span>
      <span class="ml-1 mr-1" v-text="store.selectedImageList.length"></span>
      <v-btn icon @click="selectAll">
        <v-icon v-show="isNoSelected">{{ mdiCheckboxBlankOutline }}</v-icon>
        <v-icon v-show="isOneOrMoreSelected">{{ mdiCheckboxIntermediate }}</v-icon>
        <v-icon v-show="isAllSelected">{{ mdiCheckboxMarked }}</v-icon>
      </v-btn>
      <v-menu dense offset-y :close-on-content-click="false">
        <template #activator="{ on, attrs }">
          <v-btn title="下载列表" icon v-bind="attrs" v-on="on">
            <v-icon>{{ mdiDownload }}</v-icon>
          </v-btn>
        </template>
        <v-list dense flat style="min-width: 300px;max-height: 80vh;overflow: auto;">
          <v-subheader class="ml-2">
            <span class="mr-4">下载列表</span>
            <v-btn v-show="store.selectedImageList.length > 0" small @click="startDownload">
              开始下载
            </v-btn>
            <v-btn v-show="store.selectedImageList.length > 0" class="ml-2" small @click="exportFileUrls">
              输出下载地址
            </v-btn>
          </v-subheader>
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
                <v-list-item-title :title="item.fileDownloadName" v-text="item.fileDownloadName" />
                <v-list-item-subtitle :title="item.fileUrl" v-text="item.fileUrl" />
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
    <v-btn title="切换深色模式" icon @click="toggleDarkmode">
      <v-icon>{{ mdiBrightness6 }}</v-icon>
    </v-btn>
    <v-btn title="退出瀑布流模式" icon @click="exitMasonry">
      <v-icon>{{ mdiLocationExit }}</v-icon>
    </v-btn>
    <v-progress-linear
      :active="store.requestState"
      :height="6"
      color="deep-purple accent-4"
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
  mdiDelete,
  mdiDownload,
  mdiFileClockOutline,
  mdiFire,
  mdiHome,
  mdiImageMultiple,
  mdiLocationExit,
  mdiMagnify,
  mdiShuffle,
  mdiStar,
  mdiViewDashboardVariant,
} from '@mdi/js'
import { computed, onMounted, reactive, ref, set, watch } from '@vue/composition-api'
import { useVuetify } from '@/plugins/vuetify'
import store from '@/store'
import { addDate, debounce, downloadFile, eventBus, formatDate, showMsg, subDate } from '@/utils'
import { loadPostsByPage, loadPostsByTags, refreshPosts } from '@/store/actions/post'
import { getRecentTags, getUsername, isPopularPage, searchTagsByName } from '@/api/moebooru'

const title = computed(() => {
  return `${location.host.toUpperCase()} - ${store.imageList.length} Posts - Page `
})

const cols = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20].reduce<Record<string, string>>((acc, cur) => {
  acc[cur] = cur === 0 ? '自动' : `${cur} 列`
  return acc
}, {}))

const selColumn = (val: string) => {
  store.selectedColumn = val
  localStorage.setItem('__masonry_col', val)
}

const isNoSelected = computed(() => store.selectedImageList.length === 0)
const isOneOrMoreSelected = computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length < store.imageList.length)
const isAllSelected = computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length === store.imageList.length)
const loadingValue = ref(0)

const selectAll = () => {
  if (isNoSelected.value || isOneOrMoreSelected.value) {
    setTimeout(() => {
      store.selectedImageList = [...store.imageList]
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
  showInput: !!tagsQuery?.includes('pool:'),
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
    fetchTaggedPosts(searchState.searchTerm)
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
  '1d': ['按日', mdiCalendarToday, 'day'],
  '1w': ['按周', mdiCalendarWeek, 'week'],
  '1m': ['按月', mdiCalendarMonth, 'month'],
  '1y': ['按年', mdiCalendarText, 'year'],
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

const startDownload = async () => {
  try {
    const len = store.selectedImageList.length
    for (let index = 0; index < len; index++) {
      const item = store.selectedImageList[index]
      const { fileUrl, fileDownloadName, loaded } = item
      if (!fileUrl) continue
      if (loaded) continue
      set(item, 'loading', true)
      await download(fileUrl, `${fileDownloadName}.${fileUrl.split('.').pop()}`)
      set(item, 'loading', false)
      set(item, 'loaded', true)
    }
  } catch (error) {
    const msg = error as string
    showMsg({ msg, type: 'error' })
  }
}

const exportFileUrls = async () => {
  const urlText = store.selectedImageList.map(e => e.fileUrl).join('\n')
  await downloadFile(`data:text/plain;charset=utf-8,${encodeURIComponent(urlText)}`, 'image-urls.txt')
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
</script>
