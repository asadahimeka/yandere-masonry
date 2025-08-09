const { defineTmHeader } = require('vite-plugin-tm-userscript')
const { sites } = require('@himeka/booru')

const blackList = new Set(['e621.net', 'e926.net', 'hypnohub.net', 'derpibooru.org'])

module.exports = defineTmHeader({
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
  "match": [
    ...Object.entries(sites).filter(([e]) => !blackList.has(e)).map(([k, v]) => `http${v.insecure ? '' : 's'}://${k}/*`),
    'https://e-shuushuu.net/*',
    'https://www.zerochan.net/*',
    'https://sankaku.app/*',
    'https://chan.sankakucomplex.com/*',
    'https://idol.sankakucomplex.com/*',
    'https://anime-pictures.net/*',
    'https://allgirl.booru.org/*',
    'https://booru.eu/*',
    'https://kusowanka.com/*',
    'https://anihonetwallpaper.com/*',
    'https://nozomi.la/*',
    'https://rule34hentai.net/*'
  ],
  "supportURL": "https://github.com/asadahimeka/yandere-masonry/issues",
  "run-at": "document-end",
})
