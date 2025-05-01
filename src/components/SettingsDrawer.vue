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
      <v-list-item class="hidden-md-and-up">
        <v-list-item-content>
          <v-list-item-title>{{ $t('e4_fgvntwNlfxgJUc2dXK') }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu transition="slide-y-transition" offset-y>
            <template #activator="{ on, attrs }">
              <v-btn small v-bind="attrs" class="sel_menu_btn" style="max-width: 100px;" v-on="on">
                {{ currentLanglabel }}
                <v-icon :size="16">{{ mdiChevronDown }}</v-icon>
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
        </v-list-item-action>
      </v-list-item>
      <v-list-item class="mb-0">
        <v-list-item-content>
          <v-list-item-title>
            <div class="d-flex align-center">
              <span>{{ $t('_Efl8k8uYQj9iJmj3kwbd') }}</span>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn class="ml-2" icon v-bind="attrs" v-on="on" @click.stop="exportBlacklist"><v-icon :size="18">{{ mdiContentCopy }}</v-icon></v-btn>
                </template>
                <span>{{ $t('EVPG1YZDtykdz3htyf11u') }}</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" @click.stop="importBlacklist"><v-icon :size="18">{{ mdiContentPaste }}</v-icon></v-btn>
                </template>
                <span>{{ $t('kCYFwKpwznYIKRmB1tCww') }}</span>
              </v-tooltip>
            </div>
          </v-list-item-title>
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
      <template v-if="isBoorus">
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
      </template>
      <v-list-item v-if="notPartialSupportSite">
        <v-list-item-content>
          <v-list-item-title>{{ $t('Lm_HFVHpv4XCjilV3NLKu') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('A16qoBulYQJLbHe9mqNwm')">{{ $t('A16qoBulYQJLbHe9mqNwm') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="nsfwValue"
            inset
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
            inset
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
            inset
            @change="onKeyupSwitchChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="notPartialSupportSite">
        <v-list-item-content>
          <v-list-item-title>{{ $t('kFcteLMfnoezhOwuTlLFC') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('FT1uJs8XG__n5qBvuFsH4')">{{ $t('FT1uJs8XG__n5qBvuFsH4') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.isFullImgPreload"
            inset
            @change="onImgPreloadChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="notPartialSupportSite && store.isFullImgPreload">
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
          <v-list-item-subtitle title="Masonry/Grid/Justified/Virtual">Masonry/Grid/Justified/Virtual</v-list-item-subtitle>
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
      <v-list-item v-if="['masonry', 'grid', 'virtual'].includes(store.settings.masonryLayout)">
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
                <v-list-item v-for="col in cols" :key="col[0]" dense @click="selColumn(col[0])">
                  <v-list-item-title v-text="col[1]" />
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('4yzHPggVky2QKFD2TbBhl') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('HSx0XMZFid_lVuwjzrhH0')">{{ $t('HSx0XMZFid_lVuwjzrhH0') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.settings.isThumbSampleUrl"
            inset
            @change="onThumbSampleUrlChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="notPartialSupportSite">
        <v-list-item-content>
          <v-list-item-title>{{ $t('PBjdNKuj02doUvOf2zZqP') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('z_oL9s5fS164W4_gITOGZ')">{{ $t('z_oL9s5fS164W4_gITOGZ') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="isDLSubpath"
            inset
            :loading="dlSubLoading"
            @change="onDLSubpathChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('fbIpwMw2yVoSxP66OJ32z') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('tEvQYzSVnggYAcM1uv9Tt')">{{ $t('tEvQYzSVnggYAcM1uv9Tt') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="isFitScreen"
            inset
            @change="onFitScreenChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('lkCkz1OpNtTCFRfGCEoBp') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('EZd1QQdgUDjT3yya5ZYe-')">{{ $t('EZd1QQdgUDjT3yya5ZYe-') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="isAutoWfMode"
            inset
            @change="onAutoWfModeChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="notPartialSupportSite">
        <v-list-item-content>
          <v-list-item-title>{{ $t('sxhTRqogDRozo9IaTGI7g') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('gPt6cpWrkvqRqZnwJo1KV')">{{ $t('gPt6cpWrkvqRqZnwJo1KV') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.settings.showPostCheckbox"
            inset
            @change="onShowPostCheckboxChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('UqbfVZzRyk0iD2NcOii_E') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('_4E2zv2NpOG4y8TV5PRL0')">{{ $t('_4E2zv2NpOG4y8TV5PRL0') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.settings.showListPostReso"
            inset
            @change="onShowListPostResoChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="isBoorus">
        <v-list-item-content>
          <v-list-item-title>{{ $t('dvs63FvVKWm3uHVfqeq00') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('w4uJjpTmSEkm6SIDgEo-0')">{{ $t('Tbq8O5KhwcDHQ_qxNFW09') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.settings.useFancybox"
            inset
            @change="onUseFancyboxChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="store.isYKSite">
        <v-list-item-content>
          <v-list-item-title>{{ $t('IxTawC_qs_xjxj5g8_aGx') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('-x4wjDoHtodaXEgm2SXkg')">{{ $t('-x4wjDoHtodaXEgm2SXkg') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.settings.isHoldsFalse"
            inset
            :disabled="store.settings.isYandereFetchByHtml"
            @change="onHoldsFalseChange"
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="isYandere">
        <v-list-item-content>
          <v-list-item-title>{{ $t('YAUNSVT_pTygaY306DZmU') }}</v-list-item-title>
          <v-list-item-subtitle :title="$t('HkRzE7fweBSefchs0z0r8')">{{ $t('HkRzE7fweBSefchs0z0r8') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="store.settings.isYandereFetchByHtml"
            inset
            :disabled="store.settings.isHoldsFalse"
            @change="onYandreFetchByHtmlChange"
          />
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-dialog v-model="showDLConfirm" max-width="600">
      <v-card>
        <v-card-title class="text-h5">{{ $t('ti3akdSS3iZV9NsGzIo3m') }}</v-card-title>
        <v-card-text>
          {{ $t('LN_Rsic4V50DrXbsv9T9L') }}<br>
          {{ $t('OJ8X55GXx5k3peoSXSujf') }}<br>
          {{ $t('ujBgilCWNgFNV8Q2IDMWS') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="setDLSubpathOn('')">{{ $t('9dq_DxgMG88eom9Gq-4nT') }}</v-btn>
          <v-btn color="primary" text @click="setDLSubpathOn('1')">{{ $t('0VAN4cJ-_mUxvtmg4KEi1') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { mdiChevronDown, mdiClose, mdiContentCopy, mdiContentPaste } from '@mdi/js'
import store from '@/store'
import i18n from '@/utils/i18n'
import { showMsg } from '@/utils'
import { isBooruSite, notPartialSupportSite } from '@/api/booru'

const isBoorus = ref(isBooruSite())
const isYandere = ref(location.hostname == 'yande.re')

const onComboboxChange = (val: string[]) => {
  localStorage.setItem('__blacklist', val.join(','))
}

const removeTagFromBlacklist = (item: string) => {
  store.blacklist.splice(store.blacklist.indexOf(item), 1)
  localStorage.setItem('__blacklist', store.blacklist.join(','))
}

const exportBlacklist = () => {
  navigator
    .clipboard
    .writeText(store.blacklist.join(','))
    .then(() => showMsg({ msg: i18n.t('99kLMSzDYJCAf1yK9QYzy') as string }))
    .catch(() => showMsg({ msg: i18n.t('si-zDDRFrEwDTCkp53Q44') as string, type: 'error' }))
}

const importBlacklist = () => {
  navigator
    .clipboard
    .readText()
    .then(text => {
      if (text) {
        store.blacklist = [...new Set([
          ...store.blacklist,
          ...text.split(',').filter(Boolean),
        ])]
        localStorage.setItem('__blacklist', store.blacklist.join(','))
      }
    })
    .catch(() => showMsg({ msg: i18n.t('si-zDDRFrEwDTCkp53Q44') as string, type: 'error' }))
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

const onThumbSampleUrlChange = (val: any) => {
  localStorage.setItem('__thumbSampleUrl', val ? '1' : '')
}

const onShowPostCheckboxChange = (val: any) => {
  localStorage.setItem('__showPostCheckbox', val ? '1' : '')
}

const onShowListPostResoChange = (val: any) => {
  localStorage.setItem('__showListPostReso', val ? '1' : '')
}

const onUseFancyboxChange = (val: any) => {
  localStorage.setItem('__useFancybox', val ? '1' : '')
}

const onHoldsFalseChange = (val: any) => {
  localStorage.setItem('__isHoldsFalse', val ? '1' : '')
  location.reload()
}

const onYandreFetchByHtmlChange = (val: any) => {
  localStorage.setItem('__isYandereFetchByHtml', val ? '1' : '')
  location.reload()
}

const isFitScreen = ref(localStorage.getItem('__fitScreen') != '0')
const onFitScreenChange = (val: any) => {
  localStorage.setItem('__fitScreen', val ? '1' : '0')
  location.reload()
}

const isAutoWfMode = ref(!!localStorage.getItem('__autoWfMode'))
const onAutoWfModeChange = (val: any) => {
  localStorage.setItem('__autoWfMode', val ? '1' : '')
  location.reload()
}

const dlSubLoading = ref(false)
const showDLConfirm = ref(false)
const isDLSubpath = ref(Boolean(localStorage.getItem('__dl_subpath_on')))
const setDLSubpathOn = (val: any) => {
  isDLSubpath.value = !!val
  localStorage.setItem('__dl_subpath_on', val)
  showDLConfirm.value = false
  dlSubLoading.value = false
  location.reload()
}
const onDLSubpathChange = (val: any) => {
  dlSubLoading.value = true
  if (val) {
    showDLConfirm.value = true
  } else {
    setDLSubpathOn('')
  }
}

const { width: windowWidth } = useWindowSize()
const allColList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20]
const colList = computed(() => store.settings.masonryLayout == 'virtual' ? allColList.filter(e => e < (windowWidth.value - 32) / 300) : allColList)
const cols = computed(() => colList.value.map(e => [`${e}`, e === 0 ? i18n.t('uxIs3XkeVzkrEX985zHk3').toString() : `${e} ${i18n.t('dU7ou5kVM0s9DMju5e2tS')}`] as const))
const actCol = computed(() => {
  return colList.value.findIndex(e => e.toString() === store.selectedColumn)
})
const selColumn = (val: string) => {
  store.selectedColumn = val
  localStorage.setItem('__masonry_col', val)
}

const layoutTypes = ref([
  ['masonry', `Masonry/${i18n.t('6jPGehET9TViankl5-SRu')}`],
  ['grid', `Grid/${i18n.t('vfUg8xP6WptIhSL0E9b9D')}`],
  ['flexbin', `Justified/${i18n.t('LZbI8am7nD-LiemZzroFF')}`],
  ['virtual', `Virtual/${i18n.t('yYtssYrCL8VwFrdvvx8v3')}`],
])
const actLayout = computed(() => {
  return layoutTypes.value.find(e => e[0] === store.settings.masonryLayout)?.[1]?.split('/')?.[0]
})
const actLayoutIndex = computed(() => {
  return layoutTypes.value.findIndex(e => e[0] === store.settings.masonryLayout)
})
const onMasonryLayoutChange = (val: any) => {
  selColumn('0')
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

const currentLang = ref(i18n.locale)
const langList = [
  { value: 'zh-Hans', label: '简体中文' },
  { value: 'zh-Hant', label: '繁體中文' },
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' },
]
const currentLanglabel = computed(() => {
  return langList.find(e => e.value === currentLang.value)?.label
})
const selectLang = (val: string) => {
  currentLang.value = val
  i18n.locale = val
  localStorage.setItem('__LANG', val)
}
</script>
