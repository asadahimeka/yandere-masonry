import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import userscript, { defineTmHeader } from '@himeka/vite-userscript'
import { version } from './package.json'
import { getMatchPatterns } from './src/api/sites'

export default defineConfig({
  plugins: [
    // Vue
    vue(),
    // Tampermonkey userscript
    userscript({
      externalGlobals: {
        'vue': ['Vue'],
        'vuetify': ['Vuetify'],
        'vue-i18n': ['VueI18n'],
        'fast-xml-parser': ['fxparser'],
      },
      headers: defineTmHeader({
        "name": "Yande.re 瀑布流浏览",
        "name:zh": "Yande.re 瀑布流浏览",
        "name:en": "Yande.re Masonry",
        "namespace": "me.asadahimeka.yanderemasonry",
        "author": "asadahimeka",
        "description": "Yande.re/Konachan 中文标签 & 缩略图放大 & 双击翻页 & 瀑布流浏览模式(支持 danbooru/gelbooru/rule34/sakugabooru/lolibooru/safebooru/3dbooru/xbooru/atfbooru/aibooru 等)",
        "description:zh": "Yande.re/Konachan 中文标签 & 缩略图放大 & 双击翻页 & 瀑布流浏览模式(支持 danbooru/gelbooru/rule34/sakugabooru/lolibooru/safebooru/3dbooru/xbooru/atfbooru/aibooru 等)",
        "description:en": "Yande.re/Konachan Masonry(Waterfall) Layout. Also support danbooru/gelbooru/rule34/sakugabooru/lolibooru/safebooru/3dbooru/xbooru/atfbooru/aibooru et cetera.",
        "homepage": "https://www.nanoka.top",
        "source": "https://github.com/asadahimeka/yandere-masonry",
        "icon": "https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/f1f6267537a5aff959ee63ec2c9e4e52_4821140735490026106.jpg",
        "license": "MIT",
        "resource": [
          "vuetifycss https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.7.2/vuetify.min.css",
          "normalizecss https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css",
          "fancyboxcss https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.min.css",
          "vuejs https://cdnjs.cloudflare.com/ajax/libs/vue/2.7.16/vue.min.js",
          "vuetifyjs https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.7.2/vuetify.min.js",
          "vuei18njs https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/8.28.2/vue-i18n.min.js",
          "fxparserjs https://cdnjs.cloudflare.com/ajax/libs/fast-xml-parser/4.4.0/fxparser.min.js",
          `tagscn https://cdn.jsdelivr.net/gh/asadahimeka/yandere-masonry@v${version}/src/data/all_tags_cn.min.json`,
          `tagscnspace https://cdn.jsdelivr.net/gh/asadahimeka/yandere-masonry@v${version}/src/data/all_tags_cn_space.min.json`
        ],
        // @match 由站点注册表统一派生，避免与 src/api/sites.ts 脱节
        "match": getMatchPatterns(),
        "supportURL": "https://github.com/asadahimeka/yandere-masonry/issues",
        "run-at": "document-end",
      }),
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
