# Yande.re Masonry

![](https://img.shields.io/github/package-json/v/asadahimeka/yandere-masonry)
![](https://img.shields.io/badge/license-MIT-green)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/dev/vite)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/dev/vite-plugin-tm-userscript)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/@himeka/booru)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/vue)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/vuetify)

Yande.re/Konachan 中文标签 & 缩略图放大 & 双击翻页 & 瀑布流浏览

*有问题或建议请到 GitHub [反馈](https://github.com/asadahimeka/yandere-masonry/issues)*

修改自 [yande-re-chinese-patch](https://github.com/coderzhaoziwei/yande-re-chinese-patch)

> Build with [vite](https://vitejs.dev) & [vite-plugin-tm-userscript](https://github.com/asadahimeka/vite-plugin-tm-userscript)

## Tips

Moebooru 站点（Y 站、K 站）可通过设置查询参数 `locale` 或者设置 cookie 里的 `locale` 项来指定界面语言

如： https://yande.re/post?locale=zh_CN

本脚本在访问 Y 站或 K 站时已默认指定语言为 `zh_CN`

## Features

### 缩略图放大

对列表页的缩略图进行放大，目前适配 yande.re 与 Konachan

### 双击翻页

双击页面左侧任意区域进入上一页，双击页面右侧任意区域进入下一页，目前适配 yande.re 与 Konachan

### 标签中文翻译

添加 yande.re 与 Konachan 标签的中文翻译，翻译文件来自 [tags.json](https://github.com/coderzhaoziwei/yande-re-chinese-patch/blob/main/source/data/tags.json)

### 瀑布流模式

点击右上角按钮进入瀑布流模式

#### 输出下载地址

瀑布流模式下可使用 `输出下载地址` 功能保存图片地址 TXT 后使用迅雷、IDM、wget 等批量下载，见 https://github.com/FoXZilla/Pxer/issues/8

#### 顶部操作

- 站点切换，打开侧栏操作，支持站点见下方所述
- 打开个人页面或收藏夹（Y 站/K 站），侧栏里操作
- 瀑布流显示列数切换，列数选择非自动且列数小于 6 时图片会以 sample_url (即点击详情的大小) 展示。
- 批量选择
- 查看下载列表
- 深色模式切换

#### 详情查看

点击缩略图可查看详情，可进行以下操作

- 收藏（Y 站/K 站）
- 打开源站详情页面
- 打开来源地址
- 查看原图
- 下载/加入下载列表
- 打开源站标签页面
- 点击图片控制按钮与标签显示

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
![](https://upload-bbs.mihoyo.com/upload/2022/05/25/260511332/7eec96d7c629bc30ff4b1942838d9ea2_7197279808091047211.png)
![](https://upload-bbs.mihoyo.com/upload/2022/05/25/260511332/8dccc28bf99106aaab984feb383d4c1f_939382269553345713.png)

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
