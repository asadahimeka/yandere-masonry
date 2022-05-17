const { defineTmHeader } = require('vite-plugin-tm-userscript')
const { sites } = require('booru')

const blackList = new Set(['e621.net', 'e926.net', 'hypnohub.net', 'derpibooru.org'])

module.exports = defineTmHeader({
  "name": "Yande.re 瀑布流浏览",
  "name:en": "Yande.re Masonry Layout",
  "namespace": "me.asadahimeka.yanderemasonry",
  "author": "asadahimeka",
  "description": "Yande.re/Konachan 缩略图放大 & 双击翻页 & 瀑布流浏览模式",
  "description:en": "Yande.re/Konachan Masonry(Waterfall) Layout. Fork form yande-re-chinese-patch.",
  "homepage": "https://asadahimeka.vercel.app",
  "source": "https://github.com/asadahimeka/yandere-masonry",
  "license": "MIT",
  "match": Object.keys(sites).filter(e => !blackList.has(e)).map(e => `https://${e}/*`),
  "supportURL": "https://github.com/asadahimeka/yandere-masonry/issues",
  "run-at": "document-body",
})
