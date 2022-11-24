<template>
  <div :class="wfClass">
    <v-masonry v-if="isMasonry" :cols="columnCount" gutter="8px">
      <slot></slot>
    </v-masonry>
    <div v-if="wfType === 'flexbin'" class="flexbin">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  data() {
    return {
      wfType: localStorage.getItem('__masonryLayout') || 'masonry',
    }
  },
  computed: {
    isMasonry() {
      return ['masonry', 'grid'].includes(this.wfType)
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
