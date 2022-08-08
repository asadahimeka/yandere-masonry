<script>
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
      await new Promise(resolve => {
        const script = document.createElement('script')
        script.src = 'https://lib.baomitu.com/dplayer/1.26.0/DPlayer.min.js'
        script.addEventListener('load', resolve, false)
        document.head.appendChild(script)
      })
    }
    await this.$nextTick()
    this.initPlayer()
  },
  methods: {
    initPlayer() {
      const player = this.dp = new unsafeWindow.DPlayer({ ...this.options, container: this.$el })
      const events = player.events
      Object.keys(events).forEach(item => {
        if (item === 'events') {
          return false
        } else {
          events[item].forEach(event => {
            player.on(event, () => this.$emit(event))
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
