<script>
import { loadScript } from '@/prepare'

export default {
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      dp: null,
    }
  },
  async mounted() {
    if (!unsafeWindow.DPlayer) {
      await loadScript('https://unpkg.com/dplayer@1.27.0/dist/DPlayer.min.js')
    }
    await this.$nextTick()
    this.initPlayer()
  },
  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy() {
    this.dp.destroy()
    this.dp = null
  },
  methods: {
    initPlayer() {
      this.dp = new unsafeWindow.DPlayer({ ...this.options, container: this.$el })
      const events = this.dp.events
      Object.keys(events).forEach(item => {
        if (item === 'events') {
          return false
        } else {
          events[item].forEach(event => {
            this.dp.on(event, () => this.$emit(event))
          })
        }
      })
    },
  },
  render(h) {
    return h('div', {
      class: 'dplayer',
    }, [])
  },
}
</script>
