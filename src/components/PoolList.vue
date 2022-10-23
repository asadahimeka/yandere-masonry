<template>
  <div>
    <masonry :cols="columnCount" gutter="8px">
      <v-card v-for="item in pools" :key="item.id" class="mb-2">
        <v-img transition="scroll-y-transition" :src="item.thumb" height="auto" />
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-subtitle class="pb-0">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <span
                v-bind="attrs"
                class="d-inline-block text-truncate"
                style="max-width: 100%;"
                v-on="on"
              >{{ item.description }}</span>
            </template>
            <span style="display: inline-block;max-width: 500px">{{ item.description }}</span>
          </v-tooltip>
        </v-card-subtitle>
        <v-card-text class="pb-0">
          <v-icon small>{{ mdiCalendarBlank }}</v-icon>
          <span class="ml-1 mr-4">{{ item.created_at }}</span>
          <v-icon small>{{ mdiCalendarEdit }}</v-icon>
          <span class="ml-1">{{ item.updated_at }}</span>
        </v-card-text>
        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar>
              <v-img
                alt=""
                class="elevation-6"
                :src="`/data/avatars/${item.user_id}.jpg`"
                lazy-src="https://upload-bbs.mihoyo.com/upload/2022/08/13/190122060/f65e984cb2f5184ba167e461bfdeea55_8564255716639207386.png"
              />
            </v-list-item-avatar>
            <v-row align="center" justify="end">
              <v-list-item-content class="ml-2">
                <v-list-item-title><a :href="`/pool/show/${item.id}`" target="_blank">Pool #{{ item.id }}</a></v-list-item-title>
              </v-list-item-content>
              <v-chip class="mr-1">{{ item.post_count }} 张</v-chip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" @click="viewPool(item.id)">
                    <v-icon>{{ mdiLaunch }}</v-icon>
                  </v-btn>
                </template>
                <span>查看</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" :href="`/pool/zip/${item.id}?jpeg=1`" v-on="on">
                    <v-icon>{{ mdiDownload }}</v-icon>
                  </v-btn>
                </template>
                <span>下载</span>
              </v-tooltip>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </masonry>
    <div class="d-flex justify-center">
      <v-btn v-show="store.requestState" color="#ee8888" text>加载中...</v-btn>
      <v-btn v-show="showLoadMore" color="#ee8888" text @click="loadData()">加载更多</v-btn>
      <v-btn v-show="showNoMore" color="#ee8888" text>没了</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiCalendarBlank, mdiCalendarEdit, mdiDownload, mdiLaunch } from '@mdi/js'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { type Pool, fetchPools } from '@/api/moebooru'
import { eventBus, notReachBottom, throttleScroll } from '@/utils'
import store from '@/store'

const columnCount = ref({
  300: 1,
  600: 1,
  900: 2,
  1200: 3,
  1600: 4,
  1920: 5,
  2400: 6,
  2700: 7,
  3000: 8,
  default: 5,
})

const noMore = ref(false)
const showNoMore = computed(() => !store.requestState && noMore.value)
const showLoadMore = computed(() => !store.requestState && !noMore.value)
const page = ref(Number(new URLSearchParams(location.search).get('page')) || 1)

const pools = ref<Pool[]>([])

const loadData = async (query?: string) => {
  store.requestState = true
  try {
    const results = await fetchPools(page.value, query)
    if (Array.isArray(results) && results.length > 0) {
      pools.value = [...pools.value, ...results]
      const url = new URL(location.href)
      url.searchParams.set('page', page.value.toString())
      history.replaceState('', '', url)
      page.value++
    } else {
      noMore.value = true
    }
  } catch (error) {
    console.log('fetchPools error: ', error)
  } finally {
    store.requestState = false
  }
}

const viewPool = (id: string) => {
  window.open(`/post?tags=pool%3A${id}&_wf=1`, '_blank')
}

const scrollFn = throttleScroll(() => {
  if (noMore.value) return
  if (store.requestState) return
  notReachBottom() && loadData()
})

onMounted(async () => {
  await loadData()
  window.addEventListener('scroll', scrollFn)
  eventBus.$on('loadPoolsByQuery', (query: string) => {
    page.value = 1
    pools.value = []
    loadData(query)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollFn)
  eventBus.$off('loadPoolsByQuery')
})
</script>
