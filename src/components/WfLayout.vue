<template>
  <div class="wf-layout" :class="wfClass">
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

const notFitScreen = localStorage.getItem('__fitScreen') == '0'

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
        'wf-no-fit-screen': notFitScreen,
      }
    },
    columnCount() {
      return store.selectedColumn === '0'
        ? notFitScreen
          ? {
              300: 1,
              1050: 2,
              1500: 3,
              1920: 4,
              default: 4,
            }
          : {
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
