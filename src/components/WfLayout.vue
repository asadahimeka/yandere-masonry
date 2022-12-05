<template>
  <div :class="wfClass">
    <masonry v-if="isMasonry" :cols="columnCount" gutter="8px">
      <slot></slot>
    </masonry>
    <div v-else class="justified-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  data() {
    return {
      wfType: store.settings.masonryLayout || 'masonry',
    }
  },
  computed: {
    isMasonry() {
      return ['masonry', 'grid', '1'].includes(this.wfType)
    },
    wfClass() {
      return {
        'wf-grid': this.wfType == 'grid',
      }
    },
    columnCount() {
      return store.selectedColumn === '0'
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
        : +store.selectedColumn
    },
  },
}
</script>
