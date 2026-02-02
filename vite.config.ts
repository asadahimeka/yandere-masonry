import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import userscript from 'vite-plugin-tm-userscript'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // https://github.com/vitejs/vite-plugin-vue2
    vue(),
    // https://github.com/asadahimeka/vite-plugin-tm-userscript
    userscript({
      externalGlobals: {
        'vue': ['Vue'],
        'vuetify': ['Vuetify'],
        'vue-i18n': ['VueI18n'],
        'fast-xml-parser': ['fxparser'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  esbuild: {
    target: 'es2020',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
})
