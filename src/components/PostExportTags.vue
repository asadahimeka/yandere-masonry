<template>
  <v-dialog :value="showDialog" max-width="800px" @input="handleVisible">
    <v-card>
      <v-card-title>
        <h4>{{ $t('FMi4atPbKn-B1HiAZ2ZP2') }}</h4>
        <v-spacer />
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn fab small text v-bind="attrs" v-on="on" @click.stop="handleVisible(false)">
              <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('t83UAY18UebTg1_-zFGP3') }}</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text style="max-height: 72vh;overflow-y: auto;">
        <div class="subtitle-1">{{ $t('Cu6n0Apv5xVlo4DnQbVbT') }}</div>
        <div class="export-tags-setting mb-4">
          <v-checkbox v-model="isEscapeParens">
            <template #label>
              <code>( ) -> \( \)</code>
            </template>
          </v-checkbox>
          <v-checkbox v-model="isSettingWght" :label="$t('BB4C5taWpmw06X0Kz_Gtk')" />
          <v-radio-group v-model="bracketType" row>
            <v-radio value="use_parens">
              <template #label>
                <code>Using ( )</code>
              </template>
            </v-radio>
            <v-radio value="use_brackets">
              <template #label>
                <code>Using { }</code>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
        <div v-for="type in tagTypes" v-show="postTags[type[0]].length" :key="type[0]">
          <div class="d-flex-y">
            <div class="subtitle-2" style="min-width: 72px;">{{ type[1] }}</div>
            <template v-if="showSubActions">
              <v-btn color="light-blue accent-4" small text @click="selAll(type[0])">{{ $t('zg2GRF6zmMXCkT9Uz2Bni') }}</v-btn>
              <v-btn color="light-blue accent-4" small text @click="selNone(type[0])">{{ $t('xSC1vpAOTLQ3RBipKrNpD') }}</v-btn>
              <v-btn color="light-blue accent-4" small text @click="selInvert(type[0])">{{ $t('cKXET1CCnAXq4H60qr8uc') }}</v-btn>
              <v-btn color="light-blue accent-4" small text @click="exportTags(type[0])">{{ $t('QH_xm27zhgs5E1077asf1') }}</v-btn>
            </template>
          </div>
          <v-chip-group v-model="selTags[type[0]]" column multiple>
            <div v-for="tag in postTags[type[0]]" :key="tag" class="d-flex-col">
              <v-chip filter small :color="tagColorMap[type[0]]" :value="tag" :ripple="false">{{ tag }}</v-chip>
              <input v-if="isSettingWght" v-model="wghtMap[tag]" type="number" class="export-tags-wght-inp">
            </div>
          </v-chip-group>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue accent-2" text @click="selAll()">{{ $t('zg2GRF6zmMXCkT9Uz2Bni') }}</v-btn>
        <v-btn color="blue accent-2" text @click="selNone()">{{ $t('xSC1vpAOTLQ3RBipKrNpD') }}</v-btn>
        <v-btn color="blue accent-2" text @click="selInvert()">{{ $t('cKXET1CCnAXq4H60qr8uc') }}</v-btn>
        <v-btn color="blue accent-2" text @click="exportTags()">{{ $t('QH_xm27zhgs5E1077asf1') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { type PropType, computed, ref, watch } from 'vue'
import { mdiClose } from '@mdi/js'
import type { PostDetail } from '@/api/moebooru'
import { showMsg } from '@/utils'
import i18n from '@/utils/i18n'

const props = defineProps({
  tags: { type: Array as PropType<PostDetail['tags']>, default: () => [] },
  showDialog: { type: Boolean, default: false },
  updateShowDialog: { type: Function, default: () => {} },
})

const initTags = () => ({
  artist: [],
  copyright: [],
  character: [],
  general: [],
} as Record<string, string[]>)
const tagColorMap = {
  artist: 'orange lighten-4',
  copyright: 'purple lighten-4',
  character: 'green lighten-4',
  general: 'blue lighten-4',
}

const isEscapeParens = ref(true)
const isSettingWght = ref(false)
const bracketType = ref('use_parens')
const postTags = ref(initTags())
const selTags = ref(initTags())
const tagTypes = ref(Object.keys(initTags()).map(k => [k, `${k[0].toUpperCase()}${k.slice(1)}`]))
const wghtMap = ref<Record<string, number>>({})
const showSubActions = computed(() => postTags.value.artist.length && postTags.value.copyright.length && postTags.value.character.length)

watch(() => props.showDialog, val => {
  if (!val) return
  Object.keys(postTags.value).forEach(type => {
    postTags.value[type] = props.tags!.filter(e => e.type == type).map(e => e.tag.replaceAll('_', ' '))
  })
})

function handleVisible(val: boolean) {
  props.updateShowDialog(val)
  if (!val) {
    postTags.value = initTags()
    selTags.value = initTags()
    wghtMap.value = {}
  }
}

function selAll(type?: string) {
  if (type) {
    selTags.value[type] = [...postTags.value[type]]
  } else {
    Object.keys(postTags.value).forEach(type => {
      selTags.value[type] = [...postTags.value[type]]
    })
  }
}

function selNone(type?: string) {
  if (type) {
    selTags.value[type] = []
  } else {
    Object.keys(postTags.value).forEach(type => {
      selTags.value[type] = []
    })
  }
}

function selInvert(type?: string) {
  if (type) {
    const tags = postTags.value[type].filter(e => !selTags.value[type].includes(e))
    selTags.value[type] = tags
  } else {
    Object.keys(postTags.value).forEach(type => {
      const tags = postTags.value[type].filter(e => !selTags.value[type].includes(e))
      selTags.value[type] = tags
    })
  }
}

function exportTags(type?: string) {
  const tags: string[] = []
  const target = type ? selTags.value[type] : Object.keys(selTags.value).map(k => selTags.value[k]).flat()
  target.forEach(prompts => {
    const origTag = prompts
    if (isEscapeParens.value) {
      prompts = prompts.replaceAll('(', '\\(').replaceAll(')', '\\)')
    }
    if (isSettingWght.value) {
      prompts = addBrackets(prompts, bracketType.value == 'use_parens', wghtMap.value[origTag])
    }
    tags.push(prompts)
  })
  copyText(tags.join(', '))
}

function addBrackets(prompts: string, isRound: boolean, n: number) {
  n = Number(n)
  if (n == 0) return prompts
  const arr = n > 0 ? (isRound ? ['(', ')'] : ['{', '}']) : ['[', ']']
  n = Math.abs(n)
  return arr[0].repeat(n).concat(prompts, arr[1].repeat(n))
}

function copyText(text: string) {
  navigator
    .clipboard
    .writeText(text)
    .then(() => showMsg({ msg: i18n.t('99kLMSzDYJCAf1yK9QYzy') as string }))
    .catch(() => showMsg({ msg: i18n.t('si-zDDRFrEwDTCkp53Q44') as string, type: 'error' }))
}
</script>
