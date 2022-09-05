# Yande.re Masonry (Safe For Work Version)

![](https://img.shields.io/github/package-json/v/asadahimeka/yandere-masonry)
![](https://img.shields.io/badge/license-MIT-green)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/dev/vite)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/dev/vite-plugin-tm-userscript)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/@himeka/booru)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/vue)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/yandere-masonry/vuetify)

Yande.re 中文标签 & 缩略图放大 & 双击翻页 & 瀑布流浏览 (SFW 版）

*有问题或建议请到 GitHub [反馈](https://github.com/asadahimeka/yandere-masonry/issues)*

更新日志见 [CHANGELOG.md](https://github.com/asadahimeka/yandere-masonry/blob/main/CHANGELOG.md)

Build with [vite](https://vitejs.dev) & [vite-plugin-tm-userscript](https://github.com/asadahimeka/vite-plugin-tm-userscript)

## Install

SFW 版 Greasy Fork: [点击安装](https://greasyfork.org/zh-CN/scripts/450751)

完全版 Greasy Fork: [点击安装](https://greasyfork.org/zh-CN/scripts/444885)

Web 端预览版本：[点击查看](https://booru.vercel.app/)

## Tips

Moebooru 站点可通过设置查询参数 `locale` 或者设置 cookie 里的 `locale` 项来指定界面语言

如： https://yande.re/post?locale=zh_CN

本脚本在访问 Y 站时已默认指定语言为 `zh_CN`

## Features

### 缩略图放大

对列表页的缩略图进行放大

### 双击翻页

双击页面左侧任意区域进入上一页，双击页面右侧任意区域进入下一页

### 访问标记

会在点击过详情页面的图片下方标注一条横线，利用的是 a 标签 :visited 特性，清除缓存后失效

### 标签中文翻译

添加 Y 站标签的中文翻译，翻译文件来自 yande-re-chinese-patch

欢迎 [PR](https://github.com/asadahimeka/yandere-masonry/blob/main/src/data/tags_cn.json) 补充或校正翻译

### 瀑布流模式

点击右上角按钮进入瀑布流模式

#### 顶部操作

- 打开侧栏
- 加载指定页数
- 加载收藏夹、随机作品
- 按标签搜索作品
- 深色模式切换
- 退出瀑布流模式

#### 侧栏操作

- 站点切换，支持站点见下方所述
- 进入收藏夹、随机作品页面
- 本地标签黑名单

#### 详情查看

点击缩略图可查看详情，可进行以下操作

- 收藏
- 打开详情页面
- 打开来源地址
- 查看原图
- 下载/加入下载列表
- 打开标签页面
- 点击图片控制按钮与标签显示

### 站点支持

> ⚠ Notice
>
> 主要支持站点为 Yande.re，其他站点为基本支持。
>
> 存在站点页面图片列表与 API 返回列表不一致的情况，请悉知。

缩略图放大与双击翻页支持的站点如下：

https://yande.re

瀑布流支持的 Booru 站如下：

https://yande.re

https://lolibooru.moe

https://www.sakugabooru.com

https://safebooru.org

## Screenshots

![](https://upload-bbs.mihoyo.com/upload/2022/08/13/260511332/a542077b61a2dcb85838baa41bf96c8c_7747043650649306795.png)

![](https://upload-bbs.mihoyo.com/upload/2022/08/13/260511332/14b7a0249234a79acac2d950db710b28_2747662949275143079.png)

![](https://upload-bbs.mihoyo.com/upload/2022/08/13/260511332/3886bf873b766f93e3cd103c0346705f_8954181707521812180.png)

![](https://upload-bbs.mihoyo.com/upload/2022/08/13/260511332/f18495ec74cf7895da6a583b6eef5815_2183319892513327746.png)

![](https://upload-bbs.mihoyo.com/upload/2022/08/13/260511332/59a35c4b527ec44904a6114a45033caf_7008024359546939405.png)

![](https://upload-bbs.mihoyo.com/upload/2022/08/13/260511332/c7c1ff0b187292ebc010fd40987ad52a_6882591913629167774.png)

![](https://upload-bbs.mihoyo.com/upload/2022/08/13/260511332/c0e70eea28e684bdb35e7ee77123235a_5045513856955976275.png)

![](https://upload-bbs.mihoyo.com/upload/2022/08/13/260511332/1fbb7f92ecba4a515b3a6781bd38610a_8247048012698921815.png)

![](https://upload-bbs.mihoyo.com/upload/2022/05/25/260511332/7eec96d7c629bc30ff4b1942838d9ea2_7197279808091047211.png)

![](https://upload-bbs.mihoyo.com/upload/2022/05/25/260511332/8dccc28bf99106aaab984feb383d4c1f_939382269553345713.png)

## Developing

```bash
$ git clone https://github.com/asadahimeka/yandere-masonry.git
$ cd yandere-masonry
$ yarn install
$ yarn dev
```

### Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## Credits

Modified from coderzhaoziwei/yande-re-chinese-patch

[Booru Search API](https://github.com/asadahimeka/booru-search) modified from [AtoraSuunva/booru](https://github.com/AtoraSuunva/booru)

## License

Licensed under the [MIT](https://github.com/asadahimeka/yandere-masonry/blob/main/LICENSE) license

Copyright © 2022 Yumine Sakura
