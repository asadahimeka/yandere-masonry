<template>
  <div class="wf-layout" :class="wfClass">
    <true-masonry
      v-if="wfType === 'masonry2'"
      class="true-masonry"
      :gap="{ default: 8 }"
      :cols="columnCount2"
    >
      <slot></slot>
    </true-masonry>
    <masonry v-else-if="isMasonry" :cols="columnCount" gutter="8px">
      <slot></slot>
    </masonry>
    <div v-else class="justified-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { settings } from '@/store'

const wfType = computed(() => settings.masonryLayout || 'masonry')
const isMasonry = computed(() => ['masonry', 'grid'].includes(wfType.value))
const wfClass = computed(() => ({
  'wf-grid': wfType.value == 'grid',
  'wf-no-fit-screen': !settings.isFitScreen,
}))
const columnCount = computed(() => {
  return settings.selectedColumn === '0'
    ? settings.isFitScreen
      ? {
          300: 1,
          600: 2,
          900: 3,
          1200: 4,
          1600: 6,
          1920: 7,
          2400: 8,
          2700: 9,
          3000: 10,
          default: 6,
        }
      : {
          300: 1,
          1050: 2,
          1500: 3,
          1920: 4,
          default: 4,
        }
    : +settings.selectedColumn
})
const columnCount2 = computed(() => {
  if (typeof columnCount.value == 'number') return { default: columnCount.value }
  return columnCount.value
})
</script>
