# Yande.re Masonry

![](https://img.shields.io/github/package-json/v/asadahimeka/yandere-masonry)
![](https://img.shields.io/badge/license-MIT-green)
![](https://img.shields.io/greasyfork/dt/444885?logo=greasyfork)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/dev/vite)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/dev/vite-plugin-tm-userscript)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/@himeka/booru)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/vue)
<!-- ![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/vuetify) -->

[中文](https://github.com/asadahimeka/yandere-masonry/blob/main/README.md) | English

Yande.re/Konachan Thumbnail Zoom & Double Click to Next Page & Waterfall Browsing

> Modified from [zhzwz/yande-re-chinese-patch](https://github.com/zhzwz/yande-re-chinese-patch)

Changelog see [CHANGELOG.md](https://github.com/asadahimeka/yandere-masonry/blob/main/CHANGELOG.md)

*For questions or suggestions please go to GitHub [Issues](https://github.com/asadahimeka/yandere-masonry/issues)*

Build with [vite](https://vitejs.dev) & [vite-plugin-tm-userscript](https://github.com/asadahimeka/vite-plugin-tm-userscript)


## Install

How to install the userscript manager plugin is not repeated, you can refer to [Greasy Fork](https://greasyfork.org) homepage tips to install the browser plugin.

Greasy Fork: [Click to install](https://greasyfork.org/zh-CN/scripts/444885)

Sleazy Fork: [Click to install](https://sleazyfork.org/scripts/444885)

GitHub Raw：[Click to install](https://github.com/asadahimeka/yandere-masonry/raw/main/dist/yandere-masonry.user.js)

Web Version: [Click to view](https://booru.vercel.app)

## Features

### Thumbnail zoom

Enlarge the thumbnail of the list page, currently compatible with yande.re and Konachan

### Double click to turn the page

Double-click any area on the left side of the page to enter the previous page, double-click any area on the right side of the page to enter the next page, currently compatible with yande.re and Konachan

### Visited marking

A horizontal line will be marked below the image that has been clicked on the details page, using the :visited feature of the `<a>` tag, which will expire after clearing the browser cache, currently compatible with yande.re and Konachan

### Waterfall mode

Click the upper right button to enter waterfall mode

#### Output Download Address

In waterfall mode, you can use the `Output download links` function to save the image address TXT and then use Thunder, IDM, wget, etc. to download in batches, see https://github.com/FoXZilla/Pxer/issues/8

#### Topbar action

- Open sidebar
- Load specified number of pages
- Load favorites, popular, random posts (yande.re / Konachan)
- Load pools (yande.re / Konachan)
- Search posts by tags
- Batch selection
- View download list
- Toggle dark mode
- Exit waterfall mode

#### Sidebar action

- Site switching, see below for supported sites
- Go to Favorites, Popular, Random posts page (yande.re / Konachan)
- Go to the Pool page (yande.re / Konachan)
- Local tag blacklist
- Set site API Credentials
- Toggle NSFW content display
- Waterfall display column toggle, if the number of columns is selected non-automatically and the number of columns is less than 6, the images will be displayed as sample_url (i.e. the size of the clicked details).
- Set image flow layout
  - Masonry (equal width and not equal height)
  - Grid (equal width and height)
  - Justified (fit height and not equal width)

#### Details View

Click on the thumbnail to view the details, and the following actions can be performed

- Add to favorites (yande.re / Konachan)
- Open detail page
- Open source link
- View original image
- Download / Add to download list
- Open tags page
- Click on the image to toggle button and tags display
- When viewing the original image you can use the mouse to drag and drop the image itself to move it

### Site Support

> ⚠ Notice
>
> Main support sites are Yande.re and Konachan, other sites are basic support, not tested in detail
>
> This script is mainly for the convenience of image browsing. Other functions such as downloading are simply supported, and are not guaranteed to be fully available. In addition, there is a situation where the image list of the origin site page is inconsistent with the list returned by the API, please be aware

The supported sites for thumbnail enlargement and double-click page flip are as follows:

https://yande.re

https://konachan.com

https://konachan.net

The supported booru sites for waterfall layout are as follows:

https://yande.re

https://konachan.com

https://konachan.net

https://danbooru.donmai.us

https://gelbooru.com

https://rule34.xxx

https://lolibooru.moe

https://www.sakugabooru.com

http://behoimi.org (3dbooru)

https://safebooru.org

https://tbib.org

https://xbooru.com

https://rule34.paheal.net

https://realbooru.com

https://booru.allthefallen.moe

https://aibooru.online

Other supported sites：

https://e-shuushuu.net

https://www.zerochan.net

https://sankaku.app (https://chan.sankakucomplex.com)

https://idol.sankakucomplex.com

https://anime-pictures.net

https://allgirl.booru.org

https://booru.eu

https://kusowanka.com

https://anihonetwallpaper.com

https://nozomi.la

https://rule34hentai.net


## Screenshots

![](https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/33dd626bdbfb6409f79770028350a01f_3755474670149737904.png)
![](https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/cbd70aad422a3b28818cd80684c37cb8_6836193104680068275.png)
![](https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/612f0b45cb34ac8168ecd94edbfd87f3_891482662276213615.png)
![](https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/232674c7673d1c05a2e8efb028304067_7491959587592803223.png)
![](https://upload-bbs.mihoyo.com/upload/2022/05/25/260511332/7eec96d7c629bc30ff4b1942838d9ea2_7197279808091047211.png)
![](https://upload-bbs.mihoyo.com/upload/2022/05/25/260511332/8dccc28bf99106aaab984feb383d4c1f_939382269553345713.png)

## Sponsors

<!-- Sponsors list: https://sponsors.nanoka.top/account -->
Thanks for TSUKYU's support

If you find this project helpful, feel free to buy me a coffee via the following link:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/sakurayumine)

## Developing

1. `git clone https://github.com/asadahimeka/yandere-masonry.git`
2. `cd yandere-masonry`
3. `yarn install`
4. `yarn dev`

### Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/ sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar v1.8.27](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## Credits

[zhzwz/yande-re-chinese-patch](https://github.com/zhzwz/yande-re-chinese-patch)

[Booru Search API](https://github.com/asadahimeka/booru-search) modified from [AtoraSuunva/booru](https://github.com/AtoraSuunva/booru)

## License

Licensed under the [MIT](https://github.com/asadahimeka/yandere-masonry/blob/main/LICENSE) license

Copyright © 2022 Yumine Sakura

<p><img src="https://count.nanoka.top/@himekaydmsghen" alt="yandere-masonry"></p>
