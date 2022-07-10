const { defineTmHeader } = require('vite-plugin-tm-userscript')
const { sites } = require('@himeka/booru')

const blackList = new Set(['e621.net', 'e926.net', 'hypnohub.net', 'derpibooru.org'])

module.exports = defineTmHeader({
  "name": "Yande.re 瀑布流浏览",
  "namespace": "me.asadahimeka.yanderemasonry",
  "author": "asadahimeka",
  "description": "Yande.re/Konachan 缩略图放大 & 双击翻页 & 瀑布流浏览模式",
  "description:en": "Yande.re/Konachan Masonry(Waterfall) Layout. Fork form yande-re-chinese-patch.",
  "homepage": "https://www.nanoka.top",
  "source": "https://github.com/asadahimeka/yandere-masonry",
  "icon": "https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/f1f6267537a5aff959ee63ec2c9e4e52_4821140735490026106.jpg",
  "license": "MIT",
  "match": Object.keys(sites).filter(e => !blackList.has(e)).map(e => `https://${e}/*`),
  "supportURL": "https://github.com/asadahimeka/yandere-masonry/issues",
  "run-at": "document-end",
})
