# Yande.re Masonry

Yande.re/Konachan 缩略图放大 & 双击翻页 & 瀑布流浏览

> 修改自 [yande-re-chinese-patch](https://github.com/coderzhaoziwei/yande-re-chinese-patch)

## Features

### 缩略图放大

对列表页的缩略图进行放大，目前适配 yande.re 与 Konachan

### 双击翻页

双击页面左侧任意区域进入上一页，双击页面右侧任意区域进入下一页，目前适配 yande.re 与 Konachan

### 瀑布流模式

点击右上角按钮进入瀑布流模式

### 站点支持

> ⚠ Notice
>
> 主要支持站点为 Yande.re 和 Konachan，其他站点为基本支持，未经过详细测试
>
> 本脚本主要是为了方便图片浏览，其他功能如下载为简单支持，不保证完全可用。另，存在源站页面图片列表与 API 返回列表不一致的情况，请悉知

缩略图放大与双击翻页支持的站点如下：

https://yande.re/

https://konachan.com/

https://konachan.net/

瀑布流支持的 Booru 站如下：

https://danbooru.donmai.us/

https://konachan.com/

https://konachan.net/

https://yande.re/

https://gelbooru.com/

https://rule34.xxx/

https://safebooru.org/

https://tbib.org/

https://xbooru.com/

https://rule34.paheal.net/

https://realbooru.com/

## Screenshots

![](https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/33dd626bdbfb6409f79770028350a01f_3755474670149737904.png)
![](https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/cbd70aad422a3b28818cd80684c37cb8_6836193104680068275.png)
![](https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/612f0b45cb34ac8168ecd94edbfd87f3_891482662276213615.png)
![](https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/232674c7673d1c05a2e8efb028304067_7491959587592803223.png)

## Developing

1. `git clone https://github.com/asadahimeka/yandere-masonry.git`
2. `cd yandere-masonry`
3. `yarn install`
4. `yarn dev`

### Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
