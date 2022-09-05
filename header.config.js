const { defineTmHeader } = require('vite-plugin-tm-userscript')

const sites = ['yande.re', 'lolibooru.moe', 'www.sakugabooru.com', 'safebooru.org']

module.exports = defineTmHeader({
  "name": "Yande.re 瀑布流浏览 (SFW 版)",
  "name:en": "Yande.re Masonry SFW",
  "namespace": "me.asadahimeka.yanderemasonrysfw",
  "author": "asadahimeka",
  "description": "Yande.re 中文标签 & 缩略图放大 & 双击翻页 & 瀑布流浏览模式(支持 sakugabooru/lolibooru/safebooru)",
  "description:en": "Yande.re/Konachan Masonry(Waterfall) Layout SFW version. Also support sakugabooru/lolibooru/safebooru.",
  "homepage": "https://www.nanoka.top",
  "source": "https://github.com/asadahimeka/yandere-masonry/tree/sfw",
  "icon": "https://upload-bbs.mihoyo.com/upload/2022/09/04/190122060/b318139785924f0de881d3ecbb27f418_1279470952178910763.jpg",
  "license": "MIT",
  "match": sites.map(e => `https://${e}/*`),
  "supportURL": "https://github.com/asadahimeka/yandere-masonry/issues",
  "run-at": "document-end",
})
