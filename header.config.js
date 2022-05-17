const { defineTmHeader } = require('vite-plugin-tm-userscript')
const { sites } = require('booru')

const blackList = new Set(['e621.net', 'e926.net', 'hypnohub.net', 'derpibooru.org'])

module.exports = defineTmHeader({
  "name": "Yande.re 瀑布流浏览",
  "name:en": "Yande.re Masonry",
  "namespace": "me.asadahimeka.yanderemasonry",
  "version": "0.0.2",
  "author": "asadahimeka",
  "description": "Yande.re/Konachan 大图预览 & 双击翻页 & 瀑布流浏览模式",
  "description:en": "Yande.re/Konachan Waterfall Layout. Fork form yande-re-chinese-patch.",
  "homepage": "https://github.com/asadahimeka/userscripts/tree/master/yandere-masonry",
  "source": "https://github.com/asadahimeka/userscripts/tree/master/yandere-masonry",
  "license": "MIT",
  "match": Object.keys(sites).filter(e => !blackList.has(e)).map(e => `https://${e}/*`),
  "supportURL": "https://github.com/asadahimeka/userscripts/issues",
  "run-at": "document-start",
})
