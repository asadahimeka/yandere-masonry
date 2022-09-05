# v0.22.3

- feat: 详情弹窗可以用鼠标滚轮加载上一张/下一张图片
- fix: 详情弹窗稍微扩大

## v0.22.0

- feat: 瀑布流点击详情查看原图时可拖动图片
- fix: 显示侧栏滚动条

## v0.21.0

- feat: ✨添加 Web 预览版本链接
- feat: 添加 Pixiv Ranking 与 Pixiv Viewer 链接
- fix: 瀑布流初始化时只加载两页，避免某些情况下无限加载

## v0.20.4

- fix: 瀑布流模式详情记住标签显示隐藏状态

## v0.20.2

- fix: 修改 macy 响应列数

## v0.20.1

- feat: 添加反馈链接

## v0.20.0

- feat: ✨ moebooru 支持在图集列表与详情页面进入瀑布流模式
- feat: moebooru 添加返回首页按钮
- feat: 瀑布流列表标注视频与 GIF 格式的作品
- fix: 进入瀑布流按钮样式更改
- fix: 修改 a.thumb 样式
- docs: 更新翻译文件

## v0.19.1

- fix: 修复 dplayer 初始化错误

## v0.19.0

- feat: 使用 dplayer 替代原生播放器
- feat: 添加标签显示隐藏按钮
- feat: 支持 lolibooru
- feat: 支持 sakugabooru
- feat: 支持 3dbooru
- fix: 修复某些站点图片加载错误
- chore: 更新依赖

## v0.18.0

- feat: 本地标签黑名单
- feat: 作品详情弹窗加载上一个或下一个作品
- feat: 顶栏页码输入框可使用方向键跳页

## v0.17.3

- feat: moebooru 可以直接加载上一个或者下一个周期的人气作品

## v0.17.2

- fix: moebooru /tag 页面的标签添加翻译
- fix: 侧栏添加更新日志链接
- fix: 替换 `GM_notification` 为 `snackbar`

## v0.17.1

- fix: 修复搜索标签触发行为
- docs：完善更新日志
- docs: 更新 Readme

## v0.2.40

- feat: 瀑布流模式顶栏添加加载收藏夹 (moebooru 站点)、人气作品、随机作品按钮

## v0.2.39

- feat: 瀑布流模式支持标签搜索

## v0.2.38

- feat: 瀑布流模式侧栏添加人气与随机作品列表页面链接
- docs: 更新 Readme

## v0.2.37

- fix: 进入瀑布流模式时尝试移除 moebooru 站点一些监听事件

## v0.2.34

- fix: 移除 mdi CSS CDN 链接

## v0.2.33

- perf: 放弃 CSS Iconfont，使用 `@mdi/js` 加载 svg 图标
- chore: 更新依赖 & 添加依赖 `@antfu/eslint-config-vue`
- chore: eslint 基本配置修改为 `@antfu/vue`

## v0.2.31

- fix: 跳页输入框样式修改
- fix: 只在 moebooru 站点获取用户名
- refactor: 修改文件结构

## v0.2.30

- fix: 修改依赖库 CDN

## v0.2.29

- fix: 瀑布流模式详情只在 moebooru 站点查询作品信息

## v0.2.28

- feat: 瀑布流模式支持在 appbar 跳转页数
- docs: 更新 Readme

## v0.2.27

- fix: moebooru 瀑布流模式详情标签默认颜色

## v0.2.26

- feat: moebooru 支持在人气页面进入瀑布流模式
- feat: moebooru 瀑布流模式详情支持彩色标签

## v0.2.25

- fix: 通过 GitHub Raw 加载翻译文件
- fix: 替换 eleme CDN 为 jsDelivr
- docs: 更新翻译文件

## v0.2.24

- docs: 更新翻译文件

## v0.2.23

- chore: 修改翻译文件位置

## v0.2.22

- feat: 添加 moebooru 标签中文翻译
- fix: 使用 `GM_info` 获取脚本版本

## v0.2.21

- fix: 防止 Konachan Access Denied 时无限跳转

## v0.2.19

- fix: moebooru 站点使用 url 参数设置语言

## v0.2.18

- feat: 访问 moebooru 站点时默认设置语言为中文

## v0.2.17

- feat: 加载下一页时自动修改地址
- feat: 瀑布流模式列数选择小于 6 时列表会加载大图
- feat: 添加退出瀑布流模式按钮
- fix: 样式修改
- fix: 修改 Macy 默认列数为 5
- fix: 修复 safebooru 添加瀑布流模式按钮两次
- fix: 设置各站点 page limit
- chore: 更新依赖 `@himeka/booru`
- chore: 修改 eslint 规则

## v0.2.16

- fix: 样式修改

## v0.2.15

- fix: moebooru 修改获取用户名的方式

## v0.2.14

- fix: 修改脚本版本展示位置

## v0.2.13

- feat: 添加脚本版本展示

## v0.2.12

- feat: 瀑布流模式支持输出下载地址

## v0.2.10

- feat: 瀑布流模式图片详情支持查询收藏状态
- feat: 瀑布流模式侧栏添加个人页面、收藏夹链接
- fix:  静态页不运行脚本（"jpg", "jpeg", "png", "gif", "mp4", "webm", "json", "xml"）
- docs: 更新 Readme

## v0.2.9

- fix:  修改 @exclude

## v0.2.8

- feat: 瀑布流模式图片详情支持查看原图

## v0.2.7

- feat: 支持瀑布流模式图片显示列数调整
- fix: 样式调整
- chore: 添加 postbuild 与 release 脚本

## v0.2.5

- chore: 更新 `@himeka/booru` 依赖

## v0.2.4

- fix: 样式修改

## v0.2.3

- fix: 收藏失败时提示错误

## v0.2.2

- fix: 修改瀑布流按钮插入时机

## v0.2.1

- feat: moebooru 添加收藏功能
- feat: 邮件缩略图时弹出菜单，可以收藏、新标签页打开、加入下载列表
- fix: 下载功能使用 `GM_download`

## v0.2.0

- feat: 添加下载、下载列表

## v0.1.5

- feat: 详情支持视频展示
- docs：修改 Readme

## v0.1.4

- fix: 修改瀑布流按钮插入时机

## v0.1.3

- chore: 添加推送脚本

## v0.1.1

- fix: 修改 run-at 为 document-end

## v0.1.0

- feat: Yande.re 缩略图列表页面使用 Macy 库
- fix: 样式修改

## v0.0.1

- init: 初版提交，Forked 自 yande-re-chinese-patch
