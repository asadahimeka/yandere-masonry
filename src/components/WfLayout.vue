<template>
  <div class="wf-layout" :class="wfClass">
    <TrueMasonry
      v-if="wfType === 'masonry2'"
      class="true-masonry"
      :gap="{ default: 8 }"
      :cols="columnCount2"
    >
      <slot></slot>
    </TrueMasonry>
    <masonry v-else-if="isMasonry" :cols="columnCount" gutter="8px">
      <slot></slot>
    </masonry>
    <div v-else class="justified-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TrueMasonry from './TrueMasonry'
import { settings } from '@/store'

export default {
  components: {
    TrueMasonry,
  },
  computed: {
    wfType() {
      return settings.masonryLayout || 'masonry'
    },
    isMasonry() {
      return ['masonry', 'grid'].includes(this.wfType)
    },
    wfClass() {
      return {
        'wf-grid': this.wfType == 'grid',
        'wf-no-fit-screen': !settings.isFitScreen,
      }
    },
    columnCount2() {
      if (typeof this.columnCount == 'number') return { default: this.columnCount }
      return this.columnCount
    },
    columnCount() {
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
    },
  },
}
</script>
