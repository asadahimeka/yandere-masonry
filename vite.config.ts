import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { createVuePlugin as Vue2 } from 'vite-plugin-vue2'
// import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
// import Components from 'unplugin-vue-components/vite'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'
import Userscript from 'vite-plugin-tm-userscript'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // https://github.com/underfin/vite-plugin-vue2
    Vue2({ target: 'esnext' }),
    // https://github.com/antfu/unplugin-vue2-script-setup
    ScriptSetup(),
    // https://github.com/antfu/unplugin-vue-components
    // Components({
    //   // generate `components.d.ts` global declarations
    //   dts: true,
    //   // auto import for directives
    //   directives: true,
    //   // resolvers for custom components
    //   resolvers: [
    //     // Vuetify
    //     VuetifyResolver(),
    //   ],
    // }),
    // https://github.com/asadahimeka/vite-plugin-tm-userscript
    Userscript({
      externalGlobals: {
        'vue': ['Vue'],
        'vuetify': ['Vuetify'],
        '@vue/composition-api': ['VueCompositionAPI'],
        'vue-masonry-css': ['VueMasonry']
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    }
  }
})
