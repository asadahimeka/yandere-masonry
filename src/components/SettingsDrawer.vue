<template>
  <v-navigation-drawer
    v-model="store.showSettings"
    class="nav_drawer"
    :width="400"
    app
    temporary
    right
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">{{ $t('UxxldE9xRwmQctrvba5Y8') }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon @click="store.showSettings = false">
        <v-btn icon>
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-list-item-icon>
    </v-list-item>
    <v-divider />
    <v-list dense nav>
      <v-list-item class="mb-0">
        <v-list-item-content>
          <v-list-item-title>{{ $t('_Efl8k8uYQj9iJmj3kwbd') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('jMod2JozzAnwHuD-3KuPb')">{{ $t('jMod2JozzAnwHuD-3KuPb') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="pa-0">
        <v-list-item-content class="pt-0">
          <v-combobox
            v-model="store.blacklist"
            :append-icon="null"
            :items="[]"
            class="blacklist_combobox ma-0 pa-0"
            hide-details
            hide-no-data
            multiple
            outlined
            dense
            chips
            @change="onComboboxChange"
          >
            <template #selection="{ item }">
              <v-chip
                label
                small
                outlined
                close
                @click:close="removeTagFromBlacklist(item)"
              >
                <span>{{ item }}</span>
              </v-chip>
            </template>
          </v-combobox>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="mb-0">
        <v-list-item-content>
          <v-list-item-title>{{ $t('RstKmO7YVQMpaDoucxUel') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('1F-R4qChHIzZaohu5GJzl')">{{ $t('1F-R4qChHIzZaohu5GJzl') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="pa-0">
        <v-list-item-content class="pt-0">
          <v-text-field
            v-model="store.settings.credentialQuery"
            class="blacklist_combobox ma-0 pa-0"
            hide-details
            outlined
            dense
            @change="onCredentialQueryChange"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('Lm_HFVHpv4XCjilV3NLKu') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('A16qoBulYQJLbHe9mqNwm')">{{ $t('A16qoBulYQJLbHe9mqNwm') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="nsfwValue"
            color="deep-orange darken-1"
            @change="onNSFWSwitchChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('_nQfaNuwbvPAIFKOY6_7u') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('SIUUZ4wqJTOilEdcX3EOi')">{{ $t('SIUUZ4wqJTOilEdcX3EOi') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.isListenWheelEvent"
            @change="onWheelSwitchChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('fVE5taO6GDTPbILat4GCt') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('w95XGurDhDfOfw7XH4JFW')">{{ $t('w95XGurDhDfOfw7XH4JFW') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.settings.isListenKeyupEvent"
            @change="onKeyupSwitchChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('kFcteLMfnoezhOwuTlLFC') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('FT1uJs8XG__n5qBvuFsH4')">{{ $t('FT1uJs8XG__n5qBvuFsH4') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.isFullImgPreload"
            @change="onImgPreloadChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="store.isFullImgPreload">
        <v-list-item-content>
          <v-list-item-title>{{ $t('G3b7rbyQEj3_rgzVsNJZY') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('iRt9V9wNQASic3D7-wTZo')">{{ $t('iRt9V9wNQASic3D7-wTZo') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="pl-1">
          <input
            :value="store.imgPreloadNum"
            class="text-center rounded preload_num"
            type="number"
            min="0"
            max="5"
            @blur="onPreloadNumBlur"
          >
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title :title="$t('kop_-39vkeg-bz2wztJ9O')">{{ $t('kop_-39vkeg-bz2wztJ9O') }}</v-list-item-title>
          <v-list-item-subtitle title="Masonry/Grid/Justified">Masonry/Grid/Justified</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu transition="slide-y-transition" offset-y>
            <template #activator="{ on, attrs }">
              <v-btn small v-bind="attrs" class="sel_menu_btn" style="max-width: 100px;" v-on="on">
                {{ actLayout }}
                <v-icon :size="16">{{ mdiChevronDown }}</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item-group :value="actLayoutIndex" color="primary">
                <v-list-item v-for="item in layoutTypes" :key="item[0]" dense @click="onMasonryLayoutChange(item[0])">
                  <v-list-item-title v-text="item[1]" />
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="store.settings.masonryLayout !== 'flexbin'">
        <v-list-item-content>
          <v-list-item-title>{{ $t('tt_YdgKCA_5m-aSTSMPQ_') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('rXjhc8VuGloy1wZ09noNB')">{{ $t('rXjhc8VuGloy1wZ09noNB') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu transition="slide-y-transition" offset-y>
            <template #activator="{ on, attrs }">
              <v-btn small v-bind="attrs" class="sel_menu_btn" v-on="on">
                <span style="margin-bottom:2px">{{ store.selectedColumn === '0' ? $t('uxIs3XkeVzkrEX985zHk3') : store.selectedColumn + $t('dU7ou5kVM0s9DMju5e2tS') }}</span>
                <v-icon :size="16">{{ mdiChevronDown }}</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item-group :value="actCol" color="primary">
                <v-list-item v-for="(val, key) in cols" :key="key" dense @click="selColumn(key)">
                  <v-list-item-title v-text="val" />
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { mdiChevronDown, mdiClose } from '@mdi/js'
import store from '@/store'
import i18n from '@/utils/i18n'

const onComboboxChange = (val: string[]) => {
  localStorage.setItem('__blacklist', val.join(','))
}

const removeTagFromBlacklist = (item: string) => {
  store.blacklist.splice(store.blacklist.indexOf(item), 1)
  localStorage.setItem('__blacklist', store.blacklist.join(','))
}

const nsfwValue = ref(store.showNSFWContents)
const setNSFWShow = (val: string) => {
  const flag = val !== '0'
  store.showNSFWContents = flag
  nsfwValue.value = flag
  localStorage.setItem('__showNSFW', val)
  location.reload()
}
const onNSFWSwitchChange = (val: any) => {
  setNSFWShow(val ? '1' : '0')
}

const onWheelSwitchChange = (val: any) => {
  localStorage.setItem('__listenWheel', val ? '1' : '0')
  location.reload()
}

const onKeyupSwitchChange = (val: any) => {
  localStorage.setItem('__listenKeyup', val ? '1' : '0')
  location.reload()
}

const onImgPreloadChange = (val: any) => {
  localStorage.setItem('__fullImgPreload', val ? '1' : '')
  location.reload()
}

const layoutTypes = ref([
  ['masonry', `Masonry/${i18n.t('6jPGehET9TViankl5-SRu')}`],
  ['grid', `Grid/${i18n.t('vfUg8xP6WptIhSL0E9b9D')}`],
  ['flexbin', `Justified/${i18n.t('LZbI8am7nD-LiemZzroFF')}`],
])

const actLayout = computed(() => {
  return layoutTypes.value.find(e => e[0] === store.settings.masonryLayout)?.[1]?.split('/')?.[0]
})

const actLayoutIndex = computed(() => {
  return layoutTypes.value.findIndex(e => e[0] === store.settings.masonryLayout)
})

const onMasonryLayoutChange = (val: any) => {
  localStorage.setItem('__masonryLayout', val)
  location.reload()
}

const onCredentialQueryChange = (val: any) => {
  localStorage.setItem('__credentialQuery', val)
}

const onPreloadNumBlur = (ev: Event) => {
  const input = ev.target as HTMLInputElement
  if (input.validationMessage) {
    input.value = '1'
    store.imgPreloadNum = 1
    localStorage.setItem('__imgPreloadNum', '1')
  } else {
    const num = Number(input.value) || 1
    store.imgPreloadNum = num
    localStorage.setItem('__imgPreloadNum', num.toString())
  }
}

const colList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20]
const cols = ref(colList.reduce<Record<string, string>>((acc, cur) => {
  acc[cur] = cur === 0 ? i18n.t('uxIs3XkeVzkrEX985zHk3').toString() : `${cur} ${i18n.t('dU7ou5kVM0s9DMju5e2tS')}`
  return acc
}, {}))

const actCol = computed(() => {
  return colList.findIndex(e => e.toString() === store.selectedColumn)
})

const selColumn = (val: string) => {
  store.selectedColumn = val
  localStorage.setItem('__masonry_col', val)
}
</script>
