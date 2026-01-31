// ==UserScript==
// @name                 Yande.re 瀑布流浏览
// @name:en              Yande.re Masonry
// @name:zh              Yande.re 瀑布流浏览
// @version              0.37.0
// @description          Yande.re/Konachan 中文标签 & 缩略图放大 & 双击翻页 & 瀑布流浏览模式(支持 danbooru/gelbooru/rule34/sakugabooru/lolibooru/safebooru/3dbooru/xbooru/atfbooru/aibooru 等)
// @description:en       Yande.re/Konachan Masonry(Waterfall) Layout. Also support danbooru/gelbooru/rule34/sakugabooru/lolibooru/safebooru/3dbooru/xbooru/atfbooru/aibooru et cetera.
// @description:zh       Yande.re/Konachan 中文标签 & 缩略图放大 & 双击翻页 & 瀑布流浏览模式(支持 danbooru/gelbooru/rule34/sakugabooru/lolibooru/safebooru/3dbooru/xbooru/atfbooru/aibooru 等)
// @author               asadahimeka
// @namespace            me.asadahimeka.yanderemasonry
// @license              MIT
// @match                https://yande.re/*
// @match                https://konachan.com/*
// @match                https://konachan.net/*
// @match                https://danbooru.donmai.us/*
// @match                https://gelbooru.com/*
// @match                https://rule34.xxx/*
// @match                https://lolibooru.moe/*
// @match                https://www.sakugabooru.com/*
// @match                https://safebooru.org/*
// @match                https://tbib.org/*
// @match                https://xbooru.com/*
// @match                http://behoimi.org/*
// @match                https://rule34.paheal.net/*
// @match                https://realbooru.com/*
// @match                https://booru.allthefallen.moe/*
// @match                https://aibooru.online/*
// @match                https://e-shuushuu.net/*
// @match                https://www.zerochan.net/*
// @match                https://sankaku.app/*
// @match                https://chan.sankakucomplex.com/*
// @match                https://www.sankakucomplex.com/*
// @match                https://www.idolcomplex.com/*
// @match                https://anime-pictures.net/*
// @match                https://allgirl.booru.org/*
// @match                https://booru.eu/*
// @match                https://kusowanka.com/*
// @match                https://anihonetwallpaper.com/*
// @match                https://nozomi.la/*
// @match                https://rule34hentai.net/*
// @homepage             https://www.nanoka.top
// @source               https://github.com/asadahimeka/yandere-masonry
// @icon                 https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/f1f6267537a5aff959ee63ec2c9e4e52_4821140735490026106.jpg
// @supportURL           https://github.com/asadahimeka/yandere-masonry/issues
// @run-at               document-end
// @grant                GM_addStyle
// @grant                unsafeWindow
// @grant                GM_addElement
// @grant                GM_info
// @grant                GM_download
// ==/UserScript==

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(() => {
  var prepareStyle = "#enter-masonry{position:fixed;z-index:99999;right:16px;top:10px;height:30px;padding:6px 10px;font-size:13px;border:0;border-radius:6px;color:#fff;outline:0;background:linear-gradient(to right,#ff758c 0%,#ff7eb3 100%);opacity:1;transform:scale(1);transition:opacity,transform .2s;cursor:pointer}#enter-masonry:hover{opacity:.8;transform:scale(1.05)}#enter-masonry.enter-button-bottom{top:unset;bottom:15px}#locale-select{position:fixed;z-index:99;right:110px;top:12px;font-size:13px;padding:5px;background:#ee9ca7;background:linear-gradient(to left,#ffdde1,#ee9ca7);border:none;border-radius:6px}#wf-type-select{position:fixed;z-index:99;right:190px;top:12px;font-size:13px;padding:5px;background:#ee9ca7;background:linear-gradient(to left,#ffdde1,#ee9ca7);border:none;border-radius:6px}\n";
  var ydStyle = 'a.thumb{padding-bottom:5px;border-bottom:2px solid;border-color:#232322}a.thumb:visited{border-color:#ffaaae}#add-to-favs{zoom:1.7;margin:4px 0}li.tag-type-artist a[href^="/post"]:not(.no-browser-link):before{content:"[\\753b\\5e08] "}li.tag-type-copyright a[href^="/post"]:not(.no-browser-link):before{content:"[\\7248\\6743] "}li.tag-type-character a[href^="/post"]:not(.no-browser-link):before{content:"[\\89d2\\8272] "}li.tag-type-circle a[href^="/post"]:not(.no-browser-link):before{content:"[\\793e\\56e2] "}#post-list{display:flex}#post-list .sidebar,#post-popular .sidebar{float:none;width:auto;max-width:240px}#post-list .content,#post-popular .content{float:none;flex:1;padding-right:10px}#post-list ul#post-list-posts,#post-popular ul#post-list-posts{display:block;width:100%;margin:0 auto}#post-popular ul#post-list-posts{width:96vw}#post-list ul#post-list-posts li,#post-popular ul#post-list-posts li{float:none;display:inline-block;margin:0;transition:.2s ease-in-out}#post-list ul#post-list-posts li[data-macy-complete="1"] img.preview,#post-popular ul#post-list-posts li[data-macy-complete="1"] img.preview{max-width:100%}#post-list ul#post-list-posts .inner,#post-popular ul#post-list-posts .inner{width:100%!important;height:auto!important}#post-list img.preview,#post-popular img.preview{width:100%;height:auto;margin-top:0;border-radius:5px;box-sizing:border-box}#post-list a.directlink,#post-popular a.directlink{margin-top:5px}.mm-masonry{--gap: 24;--col-width: 240}.mm-masonry{--_col-width: var(--col-width, 280);--_col-width-px: calc(var(--_col-width) * 1px);--_gap: calc(var(--gap, 20) * 1px);display:var(--display, grid)!important;grid-template-columns:repeat(auto-fill,minmax(var(--_col-width-px),1fr));grid-auto-rows:1px;column-gap:var(--_gap)}.mm-masonry__item{--img-proportional-height: calc(var(--h) * var(--_col-width) / (var(--w)));grid-row-end:span var(--img-proportional-height, 240);overflow:hidden}.mm-masonry__item:not(:last-child){margin-bottom:var(--_gap)}#post-list ul#post-list-posts .mm-masonry__item .inner,#post-popular ul#post-list-posts .mm-masonry__item .inner{height:100%!important}.mm-masonry__img{width:100%!important;height:100%!important;object-fit:cover}.justified-container{display:flex!important;flex-wrap:wrap}.justified-container:after{content:"";flex-grow:999999999}.justified-item{position:relative}.justified-item img.preview{position:absolute;top:0;left:0;width:100%;vertical-align:bottom;object-fit:cover}\n';
  var knStyle = "#lsidebar{display:none}#post-popular ul#post-list-posts{display:flex;justify-content:center;flex-wrap:wrap}#post-list ul#post-list-posts li,#post-popular ul#post-list-posts li{width:auto!important;margin:0 10px 10px 0;vertical-align:top}\n";
  var customStyle = '#loading{height:100%;width:100%;position:fixed;z-index:99999;margin-top:0;top:0}#loading p{margin:100px auto;line-height:100px;font-family:Meiryo UI,MicroHei,Microsoft YaHei UI;font-size:18px;color:#9671d7}#loading-center{width:100%;height:100%;position:relative}#loading-center-absolute{position:absolute;left:50%;top:50%;height:150px;width:150px;margin-top:-75px;margin-left:-50px}.loading-object{width:20px;height:20px;background-color:#9671d7;float:left;margin-right:20px;margin-top:65px;border-radius:50%}#loading-object_one{animation:object_one 1.5s infinite}#loading-object_two{animation:object_two 1.5s infinite;animation-delay:.25s}#loading-object_three{animation:object_three 1.5s infinite;animation-delay:.5s}@keyframes object_one{75%{transform:scale(0)}}@keyframes object_two{75%{transform:scale(0)}}@keyframes object_three{75%{transform:scale(0)}}.img_detail_loading{position:absolute;top:0;left:0;z-index:1;display:flex;justify-content:center;align-items:center;width:100%;height:100%;margin:0}.img_detail_loading:after{content:"";position:absolute;z-index:1;top:0;left:0;width:100%;height:100%;backdrop-filter:blur(2px)}.img_detail_loading .v-progress-circular{position:absolute;z-index:10}.img_detail_loading img{object-fit:cover}.img_scale_scroll{display:block;width:100vw;height:100vh;overflow:auto;user-select:none}.img_detail_scale{display:block;margin:0 auto;user-select:none;transition:.2s}.img_detail_cont{position:relative;display:flex;justify-content:center;align-items:center;width:100%;height:100%;background-color:#212121}.theme--light .img_detail_cont{background-color:#fff}.img_scale_normal{display:flex;justify-content:center;align-items:center;height:100%}.img_detail_sample{display:block;max-width:100vw;max-height:100vh;margin:0 auto}.img_detail_btns{position:absolute;top:0;left:0;width:100%;height:100%}.img_detail_tag_list .v-slide-group__content{max-height:72vh;overflow-y:auto}::-webkit-scrollbar{width:0px}.img_detail_tag_list .v-slide-group__content::-webkit-scrollbar,.nav_drawer .v-navigation-drawer__content::-webkit-scrollbar,.img_scale_scroll::-webkit-scrollbar{width:10px!important;height:10px!important}.nav_drawer .v-list-group__items .v-list-item{padding-left:10px!important}.nav_drawer .v-list .v-list-group--active.primary--text{color:inherit!important}.img_scale_scroll::-webkit-scrollbar-track{background:#e6e6e6;border-left:1px solid #dadada}.img_detail_tag_list .v-slide-group__content::-webkit-scrollbar-thumb,.nav_drawer .v-navigation-drawer__content::-webkit-scrollbar-thumb{background:#b0b0b0;border:solid 3px #e9eef6;border-radius:7px}.theme--dark .img_detail_tag_list .v-slide-group__content::-webkit-scrollbar-thumb,.theme--dark .nav_drawer .v-navigation-drawer__content::-webkit-scrollbar-thumb{border:solid 3px #363636}.img_scale_scroll::-webkit-scrollbar-thumb{background:#b0b0b0;border:solid 3px #e6e6e6;border-radius:7px}.nav_drawer .v-navigation-drawer__content::-webkit-scrollbar-thumb:hover,.img_scale_scroll::-webkit-scrollbar-thumb:hover{background:black}.theme--dark .nav_drawer .v-navigation-drawer__content::-webkit-scrollbar-thumb:hover{background:#ddd}.v-date-picker-table>table>thead>tr>th{padding:0}.v-date-picker-table>table>thead>tr>th:nth-child(1):before{content:"\\65e5"}.v-date-picker-table>table>thead>tr>th:nth-child(2):before{content:"\\4e00"}.v-date-picker-table>table>thead>tr>th:nth-child(3):before{content:"\\4e8c"}.v-date-picker-table>table>thead>tr>th:nth-child(4):before{content:"\\4e09"}.v-date-picker-table>table>thead>tr>th:nth-child(5):before{content:"\\56db"}.v-date-picker-table>table>thead>tr>th:nth-child(6):before{content:"\\4e94"}.v-date-picker-table>table>thead>tr>th:nth-child(7):before{content:"\\516d"}.poa_left_center{position:absolute;left:10px;top:50%;transform:translateY(-50%)}.poa_right_center{position:absolute;right:10px;top:50%;transform:translateY(-50%)}.v-list-item__title.title{line-height:1.2!important}.blacklist_combobox [role=combobox]{padding:0!important}.blacklist_combobox .v-chip{margin-bottom:4px!important}.preload_num{width:32px;height:30px;margin:0;padding-left:4px;border:1px solid #bbb;color:inherit;appearance:none!important;-webkit-appearance:none!important;-moz-appearance:textfield}.dplayer-notice-list,.dplayer-bezel-icon{opacity:0!important;visibility:hidden!important}.posts-image-card{margin-bottom:8px}.wf-grid .posts-image-card .v-responsive__sizer{padding-bottom:100%!important}.justified-container{display:flex!important;flex-wrap:wrap;gap:8px}.justified-container:after{content:"";flex-grow:999999999}.justified-container .posts-image-card{--jstf-w: 340;position:relative;flex-grow:calc(var(--w) * var(--jstf-w) / var(--h));width:calc(1px * var(--w) * var(--jstf-w) / var(--h));margin-bottom:0!important;padding-bottom:0!important;background-color:#dcdcdc;content-visibility:auto;contain-intrinsic-size:auto 300px}@media screen and (max-width: 500px){.justified-container .posts-image-card{--jstf-w: 240}}.justified-container .posts-image-card:before{content:"";display:block;padding-bottom:calc(var(--h) / var(--w) * 100%)!important}.justified-container .post-image{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:4px;vertical-align:bottom;object-fit:cover}.theme--light .v-app-bar{background-color:#fff!important}.site_icon{width:20px;height:20px;object-fit:cover}.theme--light .sel_menu_btn{min-height:32px;padding:0 16px;background-color:#ba68c833!important;border-width:0;border-radius:4px;font-weight:600!important;color:#8e24aa!important;text-transform:none;box-shadow:none!important}.theme--light .nav_drawer .sel_menu_btn .v-icon{color:#8e24aa!important}.theme--light .sel_menu_btn .v-btn__content{line-height:1!important}.theme--light .nav_drawer .v-icon,.theme--light .nav_drawer .v-btn--icon,.theme--light .v-app-bar .v-icon,.theme--light .v-app-bar .v-btn--icon{color:#000000de!important}.posts-image-wh{position:absolute;bottom:0;left:0;padding:0 8px;font-size:14px;color:#fff;background:rgba(0,0,0,.4);border-top-right-radius:4px}.posts-image-actions{position:absolute;bottom:0;right:0;width:100%;padding:2px;text-align:center;background:rgba(0,0,0,.4);backdrop-filter:blur(10px);opacity:0;visibility:hidden;transition:.4s}.posts-image-card:hover .posts-image-actions{opacity:1;visibility:visible}.posts-image-checkbox{position:absolute;top:5px;left:5px;width:28px;padding:2px;height:28px;border-radius:2px;background:rgba(0,0,0,.4);backdrop-filter:blur(10px);opacity:0;visibility:hidden;transition:.4s}.posts-image-checkbox:has(input[aria-checked="true"]),.posts-image-card:hover .posts-image-checkbox{opacity:1;visibility:visible}.posts-image-checkbox .v-input--selection-controls__ripple .primary--text,.posts-image-checkbox .v-input--selection-controls__input .v-icon{color:#fff!important}.posts-image-type{position:absolute!important;top:0;right:0px;padding:2px 4px;border-bottom-left-radius:4px;background:rgba(0,0,0,.4);backdrop-filter:blur(10px)}.theme--light .posts-image-type{background:rgba(255,255,255,.4)}@media screen and (min-width: 768px){.wf-no-fit-screen{max-width:62.5vw;margin:16px auto}}.virtual-waterfall>[data-index]{box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border-radius:4px}.theme--light .v-app-bar{box-shadow:none!important;background:#f6f8fc!important}.theme--light .v-app-bar,.theme--light .v-app-bar .v-toolbar__content{height:64px!important}.theme--light .v-main{padding-top:64px!important}.theme--light .v-app-bar .v-toolbar__title+input{width:50px!important;background-color:#eaf1fb!important;border-radius:24px!important}.theme--light .nav_drawer .v-icon,.theme--light .nav_drawer .v-btn--icon,.theme--light .v-app-bar .v-icon,.theme--light .v-app-bar .v-btn--icon{color:#5f6368!important}.theme--light .app-bar-tag-input .v-input .v-input__slot:before,.theme--light .app-bar-tag-input .v-input .v-input__slot:after{display:none}.theme--light .app-bar-tag-input .v-input input{padding:5px 44px 5px 10px;background-color:#eaf1fb;min-height:48px;border-radius:24px}.theme--light .app-bar-tag-input:not([style*="none"])+.v-btn{position:relative;left:-50px}.theme--light.v-list,.theme--light.v-navigation-drawer{background:#e9eef6!important}.theme--dark .img_detail_btn_color .v-chip:not(.img_detail_tag),.theme--dark .img_detail_btn_color .v-chip.tag_type_general,.theme--dark .img_detail_btn_color .v-btn{background-color:#ba68c8b3!important;border-color:#ba68c8b3!important}.theme--light .img_detail_btn_color .v-chip:not(.img_detail_tag),.theme--light .img_detail_btn_color .v-chip:not(.img_detail_tag) .v-icon,.theme--light .img_detail_btn_color .v-chip.tag_type_general,.theme--light .img_detail_btn_color .v-btn{background-color:#c2e7ff!important;border-color:#c2e7ff!important;color:#1a73e8!important;box-shadow:none!important;font-weight:500}.img_detail_btn_color .v-chip.img_detail_tag{font-weight:500}.theme--light .v-btn:not(.v-btn--icon,.v-btn--fab,.v-btn--text,.v-date-picker-table__current){padding-bottom:2px;border-radius:10px;color:#001d35;background-color:#c2e7ff}.theme--light .refresh_posts_btn{box-shadow:0 1px 2px #0000,0 1px 3px 1px #0000;background-color:#c2e7ff!important;border-color:#c2e7ff!important;color:#001d35}.theme--light .img_detail_loading .v-progress-circular{color:#1a73e8!important;caret-color:#1a73e8!important}.theme--light .blacklist_combobox .v-input__slot{padding-left:8px!important}.theme--light .v-text-field--outlined{border-radius:20px}.fancybox__caption{display:none;padding:12px 24px!important}.v-toolbar.img_detail_btn_color{backdrop-filter:none!important}.virtual-waterfall .posts-image-card{width:100%;height:100%;margin-bottom:0;background:gainsboro;border-radius:4px!important}.virtual-waterfall .post-image-v{width:100%;height:100%;object-fit:cover;border-radius:4px!important}.virtual-waterfall .posts-image-type{border-top-right-radius:4px}.virtual-waterfall .posts-image-actions{border-bottom-left-radius:4px;border-bottom-right-radius:4px}html:has(#app.theme--dark){background:#121212}@media screen and (max-width: 1200px){.nav_drawer{height:100dvh!important}.nav_drawer .v-navigation-drawer__content{padding-bottom:9vh}}.img_meta_tag_list{position:absolute;top:35px;width:200px}.img_meta_tag_list .img_detail_tag.tag_type_artist{color:#c97000!important;background-color:#ffdcb0!important;border-color:#ffdcb0!important}.img_meta_tag_list .img_detail_tag.tag_type_copyright{color:#ae3fc1!important;background-color:#f9d5ff!important;border-color:#f9d5ff!important}.img_meta_tag_list .img_detail_tag.tag_type_character{color:#0c9312!important;background-color:#c4ffc7!important;border-color:#c4ffc7!important}.true-masonry .posts-image-card{height:fit-content;max-height:unset!important;margin-bottom:0!important}.d-flex-y{display:flex;align-items:center;flex-wrap:wrap}.d-flex-col{display:flex;flex-direction:column}.export-tags-setting{display:flex;align-items:center;flex-wrap:wrap;gap:20px}.export-tags-setting .v-messages{display:none}.export-tags-setting>.v-input{margin-top:0}.export-tags-wght-inp{width:45px;height:24px;margin-left:4px;background-color:#eaf1fb;border-radius:4px;border:1px solid rgb(187,187,187);color:inherit;text-align:center}.d-flex-col .v-chip--active:before,.d-flex-col .v-chip--active:hover:before,.d-flex-col .v-chip:focus:before{display:none}.img-detail-toolbar{position:absolute;top:0;width:100%;z-index:10}.img-detail-toolbar.detail-buttons-bottom{top:unset;bottom:12px}.img-detail-tags{position:absolute;z-index:10;bottom:12px;padding:0 12px}.img-detail-tags.detail-buttons-bottom{top:12px;bottom:unset}.img-detail-toolbar.detail-buttons-bottom .img_meta_tag_list{top:0;transform:translateY(-95%)}.settings_drawer .v-list-item__subtitle{white-space:normal}\n';
  const langList = [
    { value: "zh-Hans", label: "\u7B80\u4F53\u4E2D\u6587" },
    { value: "zh-Hant", label: "\u7E41\u9AD4\u4E2D\u6587" },
    { value: "ja", label: "\u65E5\u672C\u8A9E" },
    { value: "en", label: "English" }
  ];
  const langMap = {
    "zh": "zh-Hans",
    "zh-CN": "zh-Hans",
    "zh-TW": "zh-Hant",
    "zh-HK": "zh-Hant",
    "zh-MO": "zh-Hant",
    "zh-SG": "zh-Hans",
    "ja": "ja",
    "ja-JP": "ja",
    "en": "en",
    "en-US": "en",
    "en-GB": "en"
  };
  const isMobile = navigator.userAgent.includes("Mobile");
  const defaultSettings = {
    lang: langMap[navigator.language] || "en",
    darkMode: "light",
    blacklist: ((_a = localStorage.getItem("__blacklist")) == null ? void 0 : _a.split(",").filter(Boolean)) || [],
    selectedColumn: "0",
    showNSFWContents: true,
    isListenWheelEvent: true,
    isFullImgPreload: false,
    imgPreloadNum: 1,
    masonryLayout: "masonry",
    isListenKeyupEvent: true,
    credentialQuery: "",
    isThumbSampleUrl: false,
    showPostCheckbox: false,
    useFancybox: false,
    isHoldsFalse: false,
    isYandereFetchByHtml: false,
    showListPostReso: false,
    isFitScreen: true,
    isDLSubpath: false,
    autoWaterfall: false,
    showTagChipGroup: false,
    justifiedBaseWidth: isMobile ? 240 : 340,
    detailButtonsBottom: isMobile,
    closePopupOnImgClick: isMobile
  };
  const initialSettings = {
    ...defaultSettings,
    ...(() => {
      try {
        return JSON.parse(localStorage.getItem("YM_APP_SETTINGS") || "{}");
      } catch (err) {
        return {};
      }
    })()
  };
  console.log("initialSettings: ", initialSettings);
  function doNotRun() {
    const mimeTypes = ["jpg", "jpeg", "png", "gif", "mp4", "webm", "json", "xml"];
    return mimeTypes.some((e) => location.pathname.endsWith(`.${e}`));
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function isMoebooru() {
    return ["yande.re", "konachan", "lolibooru", "sakugabooru"].some((e) => location.host.includes(e));
  }
  async function prepareApp(callback) {
    if (doNotRun())
      return;
    addSiteStyle();
    if (isMoebooru()) {
      bindDblclick();
      setMoebooruLocale();
      translateTags();
      addMoeLocaleSelect();
      addWfTypeSelect();
      initLayout();
    } else {
      translateDanbooruTags();
    }
    await sleep(1e3);
    setMasonryMode(async () => {
      removeOldListeners();
      await initMasonry();
      callback == null ? void 0 : callback();
    });
  }
  const wfTypeActions = {
    masonry: (list) => {
      list.classList.add("mm-masonry");
      for (const item of list.children) {
        const img = item.querySelector("img");
        const w = Number(img == null ? void 0 : img.getAttribute("width"));
        let h = Number(img == null ? void 0 : img.getAttribute("height"));
        h += w * 0.17;
        item.setAttribute("style", `width:auto;margin:0 0 12px 0;vertical-align:top;--w:${w};--h:${h}`);
        item.classList.add("mm-masonry__item");
        img == null ? void 0 : img.classList.add("mm-masonry__img");
      }
    },
    grid: (list) => {
      list.classList.add("mm-masonry");
      for (const item of list.children) {
        const img = item.querySelector("img");
        item.setAttribute("style", "width:auto;margin:0 0 12px 0;vertical-align:top;--img-proportional-height:263;");
        item.classList.add("mm-masonry__item");
        img == null ? void 0 : img.classList.add("mm-masonry__img");
      }
    },
    justified: (list) => {
      var _a2;
      list.classList.add("justified-container");
      for (const item of list.children) {
        const img = item.querySelector("img");
        const w = Number(img == null ? void 0 : img.getAttribute("width"));
        const h = Number(img == null ? void 0 : img.getAttribute("height"));
        const width = w * 300 / h;
        item.setAttribute("style", `width:${width}px;flex-grow:${width};margin:0 10px 10px 0;vertical-align:top;`);
        (_a2 = item.querySelector(".thumb")) == null ? void 0 : _a2.setAttribute("style", `padding-bottom:${h / w * 101}%`);
        item.classList.add("justified-item");
      }
    }
  };
  async function initLayout() {
    var _a2;
    if (!location.href.includes("yande.re/post"))
      return;
    const listEl = document.querySelector("#post-list-posts");
    if (!listEl)
      return;
    const wfType = initialSettings.masonryLayout || "masonry";
    (_a2 = wfTypeActions[wfType]) == null ? void 0 : _a2.call(wfTypeActions, listEl);
  }
  const isAutoWf = (() => {
    const params2 = new URLSearchParams(location.search);
    if (params2.get("_wf"))
      return true;
    return initialSettings.autoWaterfall;
  })();
  function addWfTypeSelect() {
    if (!location.href.includes("yande.re/post"))
      return;
    if (isAutoWf)
      return;
    const type = initialSettings.masonryLayout || "masonry";
    document.body.insertAdjacentHTML("beforeend", `<select id="wf-type-select">${Object.keys(wfTypeActions).map((e) => `<option ${type == e ? "selected" : ""} value="${e}">${e}</option>`).join("")}</select>`);
    const sel = document.querySelector("#wf-type-select");
    sel == null ? void 0 : sel.addEventListener("change", function() {
      const { value } = this;
      if (!value)
        return;
      initialSettings.masonryLayout = value;
      localStorage.setItem("YM_APP_SETTINGS", JSON.stringify(initialSettings));
      setTimeout(() => {
        location.reload();
      }, 200);
    });
  }
  async function initMasonry() {
    replaceDocument();
    await loadDeps();
  }
  function addSiteStyle() {
    GM_addStyle(prepareStyle);
    if (location.host.includes("yande.re")) {
      GM_addStyle(ydStyle);
    }
    if (location.host.includes("konachan")) {
      GM_addStyle(ydStyle + knStyle);
    }
  }
  const locales = ["de", "en", "es", "ja", "ru", "zh_CN", "zh_TW"];
  function setMoebooruLocale() {
    if (document.title === "Access denied")
      return;
    if (document.cookie.includes("locale="))
      return;
    if (isAutoWf)
      return;
    const url = new URL(location.href);
    if (url.searchParams.get("locale"))
      return;
    const browserLang = navigator.language;
    const locale = locales.find((e) => e == browserLang.replace("-", "_") || e == browserLang.split("-")[0]);
    if (!locale)
      return;
    url.searchParams.set("locale", locale);
    location.assign(url);
  }
  function addMoeLocaleSelect() {
    if (isAutoWf)
      return;
    document.body.insertAdjacentHTML("beforeend", `<select id="locale-select"><option value="">- lang -</option>${locales.map((e) => `<option value="${e}">${e}</option>`).join("")}</select>`);
    const sel = document.querySelector("#locale-select");
    sel == null ? void 0 : sel.addEventListener("change", function() {
      const { value } = this;
      if (!value)
        return;
      const url = new URL(location.href);
      url.searchParams.set("locale", value);
      location.assign(url);
    });
  }
  function bindDblclick() {
    document.addEventListener("dblclick", (e) => {
      const prev = document.querySelector("a.previous_page");
      const next = document.querySelector("a.next_page");
      const w = document.documentElement.offsetWidth || document.body.offsetWidth;
      const clickX = e.clientX;
      clickX > w / 2 ? next == null ? void 0 : next.click() : prev == null ? void 0 : prev.click();
    });
  }
  function setTagText(seletcor, textEn, display) {
    var _a2;
    const elements = document.querySelectorAll(seletcor);
    for (const item of elements) {
      const en2 = (textEn == null ? void 0 : textEn(item)) || item.innerHTML;
      const cn = (_a2 = window.__tagsCN) == null ? void 0 : _a2[en2];
      if (cn)
        item.innerHTML = (display == null ? void 0 : display(en2, cn)) || `${en2} [${cn}]`;
    }
  }
  async function translateTags() {
    var _a2;
    const locale = (_a2 = document.cookie.match(/locale=(\w+)/)) == null ? void 0 : _a2[1];
    if (locale && locale !== "zh_CN")
      return;
    const response = await fetch("https://cdn.jsdelivr.net/gh/asadahimeka/yandere-masonry@main/src/data/all_tags_cn.min.json");
    window.__tagsCN = await response.json();
    const url = new URL(location.href);
    if (url.pathname == "/tag")
      return setTagText("td[class^=tag-type] a:last-child");
    if (!url.pathname.includes("/post"))
      return;
    const textEn = (el) => el.innerHTML.replace(/\s+/g, "_");
    setTagText('#site-title a[href^="/post?tags="]', textEn);
    setTagText('#tag-sidebar a[href^="/post?tags="]:not(.no-browser-link)', textEn, (en2, cn) => `[${cn}] ${en2}`);
  }
  async function translateDanbooruTags() {
    if (!navigator.language.includes("zh"))
      return;
    let tagsCache = sessionStorage.getItem("__YM_TAGS_CN_CACHE") || "";
    if (!tagsCache) {
      try {
        const response = await fetch("https://cdn.jsdelivr.net/gh/asadahimeka/yandere-masonry@main/src/data/all_tags_cn_space.min.json");
        tagsCache = await response.text();
        sessionStorage.setItem("__YM_TAGS_CN_CACHE", tagsCache);
      } catch (error) {
      }
    }
    window.__tagsCN = JSON.parse(tagsCache || "{}");
    const textEn = (el) => el.innerText.trim();
    const textCn = (en2, cn) => `[${cn}] ${en2}`;
    setTagText('.tag-list li a[href*="post"]:not([onclick])', textEn, textCn);
    setTagText('#tag-sidebar li a[href*="post"]:not([onclick])', textEn, textCn);
    setTagText('#tags-table td.name-column a[href*="post"]', (el) => el.innerText.trim().replace(/_/g, " "), textCn);
  }
  function removeOldListeners() {
    try {
      document.documentElement.replaceWith(document.documentElement.cloneNode(true));
      document.body.replaceWith(document.body.cloneNode(true));
      unsafeWindow.onerror = null;
      if (isMoebooru()) {
        const d = document;
        const w = unsafeWindow;
        d.stopObserving();
        w.$("login-popup-username").stopObserving();
        w.User = {
          form_username_focus: () => {
          },
          form_username_changed: () => {
          },
          form_username_blur: () => {
          }
        };
        w.ReportError = null;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
  function setMasonryMode(fn) {
    if (isAutoWf)
      return fn();
    if (location.href.includes("safebooru")) {
      const oldBtn = document.querySelector("#enter-masonry");
      oldBtn == null ? void 0 : oldBtn.remove();
    }
    const btnText = navigator.language.includes("zh") ? "\u7011\u5E03\u6D41\u6A21\u5F0F" : "Browsing";
    document.body.insertAdjacentHTML("beforeend", `<button id="enter-masonry" class="${initialSettings.detailButtonsBottom ? "enter-button-bottom" : ""}">${btnText}</button>`);
    const btn = document.querySelector("#enter-masonry");
    btn == null ? void 0 : btn.addEventListener("click", () => {
      fn();
    });
  }
  const specialSites = ["gelbooru.com"];
  function loadScript(src) {
    return new Promise((resolve) => {
      let script;
      if (specialSites.some((e) => location.hostname.includes(e))) {
        script = GM_addElement("script", { src });
        script.addEventListener("load", () => {
          resolve();
        }, false);
      } else {
        script = document.createElement("script");
        script.src = src;
        script.addEventListener("load", () => {
          resolve();
        }, false);
        document.head.appendChild(script);
      }
    });
  }
  async function loadDeps() {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/vue/2.7.16/vue.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.7.2/vuetify.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/8.28.2/vue-i18n.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/fast-xml-parser/4.4.0/fxparser.min.js");
  }
  function replaceDocument() {
    const el = document.querySelector('[name="csrf-token"]');
    const token = el == null ? void 0 : el.getAttribute("content");
    token && sessionStorage.setItem("csrf-token", token);
    document.head.innerHTML = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <title>${location.host.toUpperCase()} Masonry</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.7.2/vuetify.min.css">
    <style>${customStyle}</style>
  `;
    document.body.innerHTML = `
    <div id="app">
      <div id="loading">
        <div id="loading-center">
          <div id="loading-center-absolute">
            <div class="loading-object" id="loading-object_one"></div>
            <div class="loading-object" id="loading-object_two"></div>
            <div class="loading-object" id="loading-object_three"></div>
            <p>&nbsp;\u8AAD\u307F\u8FBC\u307F\u4E2D</p>
          </div>
        </div>
      </div>
    </div>
  `;
  }
  prepareApp(() => {(function(Vue2, Vuetify2, VueI18n2, fastXmlParser) {
  var _a;
  "use strict";
  ;
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { "default": e };
  }
  var Vue__default = /* @__PURE__ */ _interopDefaultLegacy(Vue2);
  var Vuetify__default = /* @__PURE__ */ _interopDefaultLegacy(Vuetify2);
  var VueI18n__default = /* @__PURE__ */ _interopDefaultLegacy(VueI18n2);
  /*! prepare end */
  /*!
   * vue-masonry-css v1.0.3
   * https://github.com/paulcollett/vue-masonry-css
   * Released under the MIT License.
   */
  var componentName = "masonry";
  var props$1 = {
    tag: {
      type: [String],
      default: "div"
    },
    cols: {
      type: [Object, Number, String],
      default: 2
    },
    gutter: {
      type: [Object, Number, String],
      default: 0
    },
    css: {
      type: [Boolean],
      default: true
    },
    columnTag: {
      type: [String],
      default: "div"
    },
    columnClass: {
      type: [String, Array, Object],
      default: function() {
        return [];
      }
    },
    columnAttr: {
      type: [Object],
      default: function() {
        return {};
      }
    }
  };
  var breakpointValue = function(mixed, windowWidth) {
    var valueAsNum = parseInt(mixed);
    if (valueAsNum > -1) {
      return mixed;
    } else if (typeof mixed !== "object") {
      return 0;
    }
    var matchedBreakpoint = Infinity;
    var matchedValue = mixed.default || 0;
    for (var k in mixed) {
      var breakpoint = parseInt(k);
      var breakpointValRaw = mixed[breakpoint];
      var breakpointVal = parseInt(breakpointValRaw);
      if (isNaN(breakpoint) || isNaN(breakpointVal)) {
        continue;
      }
      var isNewBreakpoint = windowWidth <= breakpoint && breakpoint < matchedBreakpoint;
      if (isNewBreakpoint) {
        matchedBreakpoint = breakpoint;
        matchedValue = breakpointValRaw;
      }
    }
    return matchedValue;
  };
  var component = {
    props: props$1,
    data: function data() {
      return {
        displayColumns: 2,
        displayGutter: 0
      };
    },
    mounted: function mounted() {
      var this$1$1 = this;
      this.$nextTick(function() {
        this$1$1.reCalculate();
      });
      if (window) {
        window.addEventListener("resize", this.reCalculate);
      }
    },
    updated: function updated() {
      var this$1$1 = this;
      this.$nextTick(function() {
        this$1$1.reCalculate();
      });
    },
    beforeDestroy: function beforeDestroy() {
      if (window) {
        window.removeEventListener("resize", this.reCalculate);
      }
    },
    methods: {
      reCalculate: function reCalculate() {
        var previousWindowWidth = this.windowWidth;
        this.windowWidth = (window ? window.innerWidth : null) || Infinity;
        if (previousWindowWidth === this.windowWidth) {
          return;
        }
        this._reCalculateColumnCount(this.windowWidth);
        this._reCalculateGutterSize(this.windowWidth);
      },
      _reCalculateGutterSize: function _reCalculateGutterSize(windowWidth) {
        this.displayGutter = breakpointValue(this.gutter, windowWidth);
      },
      _reCalculateColumnCount: function _reCalculateColumnCount(windowWidth) {
        var newColumns = breakpointValue(this.cols, windowWidth);
        newColumns = Math.max(1, Number(newColumns) || 0);
        this.displayColumns = newColumns;
      },
      _getChildItemsInColumnsArray: function _getChildItemsInColumnsArray() {
        var this$1$1 = this;
        var columns = [];
        var childItems = this.$slots.default || [];
        if (childItems.length === 1 && childItems[0].componentOptions && childItems[0].componentOptions.tag == "transition-group") {
          childItems = childItems[0].componentOptions.children;
        }
        for (var i = 0, visibleItemI = 0; i < childItems.length; i++, visibleItemI++) {
          if (!childItems[i].tag) {
            visibleItemI--;
            continue;
          }
          var columnIndex = visibleItemI % this$1$1.displayColumns;
          if (!columns[columnIndex]) {
            columns[columnIndex] = [];
          }
          columns[columnIndex].push(childItems[i]);
        }
        return columns;
      }
    },
    render: function render(createElement) {
      var this$1$1 = this;
      var columnsContainingChildren = this._getChildItemsInColumnsArray();
      var isGutterSizeUnitless = parseInt(this.displayGutter) === this.displayGutter * 1;
      var gutterSizeWithUnit = isGutterSizeUnitless ? this.displayGutter + "px" : this.displayGutter;
      var columnStyle = {
        boxSizing: "border-box",
        backgroundClip: "padding-box",
        width: 100 / this.displayColumns + "%",
        border: "0 solid transparent",
        borderLeftWidth: gutterSizeWithUnit
      };
      var columns = columnsContainingChildren.map(function(children, index) {
        return createElement(this$1$1.columnTag, {
          key: index + "-" + columnsContainingChildren.length,
          style: this$1$1.css ? columnStyle : null,
          class: this$1$1.columnClass,
          attrs: this$1$1.columnAttr
        }, children);
      });
      var containerStyle = {
        display: ["-webkit-box", "-ms-flexbox", "flex"],
        marginLeft: "-" + gutterSizeWithUnit
      };
      return createElement(
        this.tag,
        this.css ? { style: containerStyle } : null,
        columns
      );
    }
  };
  var Plugin = function() {
  };
  Plugin.install = function(Vue3, options) {
    if (Plugin.installed) {
      return;
    }
    if (options && options.name) {
      Vue3.component(options.name, component);
    } else {
      Vue3.component(componentName, component);
    }
  };
  if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(Plugin);
  }
  function installVuetify() {
    Vue__default["default"].use(Vuetify__default["default"]);
    return new Vuetify__default["default"]({
      icons: {
        iconfont: "mdiSvg"
      },
      theme: {
        dark: false,
        themes: {
          light: {
            primary: "#1a73e8",
            accent: "#c2e7ff"
          },
          dark: {
            primary: "#BA68C8",
            accent: "#FF80AB"
          }
        }
      }
    });
  }
  function useVuetify() {
    const instance = Vue2.getCurrentInstance();
    if (!instance) {
      throw new Error("Should be used in setup().");
    }
    return instance.proxy.$vuetify;
  }
  const UxxldE9xRwmQctrvba5Y8$3 = "\u8BBE\u7F6E";
  const Ym0HIEu9Q80qXB31LuC6c$3 = "\u753B\u5E08";
  const juT6gwLOg5r1h2vFpFf6P$3 = "\u7248\u6743";
  const aonlPAu9kEkkwNvQg0DBk$3 = "\u89D2\u8272";
  const ctWGhVvqB2k_1TX2iY0l2$3 = "\u6536\u85CF\u6210\u529F";
  const HzMBcS2oNGVIoLiHWprim$3 = "\u6536\u85CF\u5939";
  const DXEhXAQbkiCMU_l252jo_$3 = "\u56FE\u96C6 (Pool)";
  const ZztrWbSaaaas3v0cHtSmh$3 = "\u641C\u7D22\u6807\u7B7E";
  const OKs1ePekQA4Ona839U114$3 = "\u4E0B\u8F7D\u5217\u8868";
  const cKn4cfAxzdgh_HD6OFibB$3 = "\u5F00\u59CB\u4E0B\u8F7D";
  const aVqN9TBRCbNGsW3Y2D2Nm$3 = "\u5927\u56FE";
  const u8mEnSo4mxDRUbj7FeAll$3 = "\u5207\u6362\u6DF1\u8272\u6A21\u5F0F";
  const ClZdL9hGweOokP7Mn_Ptq$3 = "\u9000\u51FA\u7011\u5E03\u6D41\u6A21\u5F0F";
  const ze1PaiGdX4ufmoOLv_xw6$3 = "\u6309\u5E74";
  const l8CbIALt_VWUnzBl_Rmgf$3 = "Booru \u56FE\u7AD9\u7011\u5E03\u6D41\u6D4F\u89C8";
  const CacM8tispuPNrSxxpt9GX$3 = "\u5FEB\u6377\u65B9\u5F0F";
  const zs8YTCc8d8XFUgRnp7m_w$3 = "\u6211\u7684\u6536\u85CF\u5939";
  const e2_EYvweJsVoIZlIWkPRV$3 = "\u7AD9\u70B9\u5217\u8868";
  const qWcqQRsE9nN43MaZ2BmN9$3 = "Web \u7248\u672C";
  const jerGO2OCuW9TdnEnGYRWd$3 = "\u70B9\u51FB\u67E5\u770B";
  const tGi6xYfvStBmR8qduEmKX$3 = "\u67E5\u770B";
  const RN4dt81l_fZMWODsskZob$3 = "\u52A0\u8F7D\u4E2D";
  const fC8XNfCl04zK7vgeaRZMQ$3 = "\u52A0\u8F7D\u66F4\u591A";
  const ad8lEoWap_nT9U69WBKen$3 = "\u9002\u5E94\u5BBD\u5EA6";
  const GjMNbm97OgVvpIYlkOisE$3 = "\u9002\u5E94\u9AD8\u5EA6";
  const XvOYJ5gHo37M1XztPl18z$3 = "\u5168\u5C4F";
  const _bQs7o9oQSo7ao1G0cp3d$3 = "\u65CB\u8F6C";
  const pEU9Y9K7DsODkocCDwq_O$3 = "\u5DF2\u6536\u85CF";
  const caFFJlrS1wa_F86uKPykd$3 = "\u8BE6\u60C5";
  const qSF4OLshg2EEX4CwtBE6r$3 = "\u6765\u6E90";
  const wI4KHHIe3zNRziW4lDZrp$3 = "\u4E0B\u8F7D\u6837\u54C1\u56FE";
  const k4YzDnBtd_S2UpAQucGxF$3 = "\u4E0B\u8F7D\u9AD8\u6E05\u56FE";
  const hVmfDxXoj8vkgVQabEOSr$3 = "\u52A0\u5165\u4E0B\u8F7D\u5217\u8868";
  const gM92sLo0Cqfl2rCaXlOhc$3 = "\u9690\u85CF";
  const FAqj5ONm50QMfIt9Vq2p1$3 = "\u4E0B\u8F7D\u51FA\u9519";
  const Z4pa8GhgE63OGGvCqAld0$3 = "\u4E0B\u9762\u6CA1\u6709\u4E86";
  const Dnnio9m9RZA6bkTLytc99$3 = "\u52A0\u5165\u6536\u85CF";
  const EsiorRgoeHI8h7IHMLDA4$3 = "\u65B0\u6807\u7B7E\u9875\u6253\u5F00";
  const _Efl8k8uYQj9iJmj3kwbd$3 = "\u672C\u5730\u6807\u7B7E\u9ED1\u540D\u5355";
  const RstKmO7YVQMpaDoucxUel$3 = "\u5F53\u524D\u7AD9\u70B9 API Credentials";
  const Lm_HFVHpv4XCjilV3NLKu$3 = "\u663E\u793A NSFW \u5185\u5BB9";
  const A16qoBulYQJLbHe9mqNwm$3 = "\u5305\u542B\u88F8\u9732\u3001\u6027\u63CF\u5199\u5185\u5BB9\u7B49\u8FC7\u6FC0\u5185\u5BB9";
  const _nQfaNuwbvPAIFKOY6_7u$3 = "\u76D1\u542C\u6EDA\u8F6E\u4E8B\u4EF6";
  const SIUUZ4wqJTOilEdcX3EOi$3 = "\u8BE6\u60C5\u5F39\u7A97\u6EDA\u8F6E\u5207\u6362\u56FE\u7247";
  const fVE5taO6GDTPbILat4GCt$3 = "\u76D1\u542C\u952E\u76D8\u4E8B\u4EF6";
  const w95XGurDhDfOfw7XH4JFW$3 = "\u8BE6\u60C5\u5F39\u7A97\u4F7F\u7528A/D/\u2190/\u2192\u5207\u6362\u56FE\u7247";
  const kFcteLMfnoezhOwuTlLFC$3 = "\u8BE6\u60C5\u56FE\u7247\u9884\u52A0\u8F7D";
  const FT1uJs8XG__n5qBvuFsH4$3 = "\u8BE6\u60C5\u5F39\u7A97\u9884\u52A0\u8F7D\u4E0B\u4E00\u5F20\u6837\u54C1\u56FE/\u539F\u56FE";
  const G3b7rbyQEj3_rgzVsNJZY$3 = "\u56FE\u7247\u9884\u52A0\u8F7D\u6570\u91CF";
  const rXjhc8VuGloy1wZ09noNB$3 = "\u5C0F\u4E8E7\u5217\u65F6\u5217\u8868\u4F1A\u52A0\u8F7D\u5927\u56FE";
  const uxIs3XkeVzkrEX985zHk3$3 = "\u81EA\u52A8";
  const dU7ou5kVM0s9DMju5e2tS$3 = "\u5217";
  const vfUg8xP6WptIhSL0E9b9D$3 = "\u7B49\u5BBD\u7B49\u9AD8";
  const PBjdNKuj02doUvOf2zZqP$3 = "\u56FE\u7247\u4FDD\u5B58\u5230\u5B50\u6587\u4EF6\u5939";
  const z_oL9s5fS164W4_gITOGZ$3 = "\u5728\u9ED8\u8BA4\u4E0B\u8F7D\u76EE\u5F55\u521B\u5EFA\u4E00\u4E2A\u4EE5\u7AD9\u70B9\u4E3A\u540D\u7684\u6587\u4EF6\u5939\u5B58\u653E\u56FE\u7247\uFF0C\u9700\u8981\u5C06 Tampermonkey \u7684\u201C\u4E0B\u8F7D\u6A21\u5F0F\u201D\u4FEE\u6539\u4E3A\u201C\u6D4F\u89C8\u5668 API\u201D";
  const ti3akdSS3iZV9NsGzIo3m$3 = "\u63D0\u793A";
  const LN_Rsic4V50DrXbsv9T9L$3 = "\u786E\u5B9A\u8981\u5F00\u542F\u5B50\u6587\u4EF6\u5939\u4E0B\u8F7D\u529F\u80FD\u5417\uFF1F\u8BF7\u786E\u4FDD\u60A8\u5DF2\u5C06 Tampermonkey \u7684\u201C\u4E0B\u8F7D\u6A21\u5F0F\u201D\u4FEE\u6539\u4E3A\u201C\u6D4F\u89C8\u5668 API\u201D\u3002";
  const OJ8X55GXx5k3peoSXSujf$3 = "\u6253\u5F00\u65B9\u5F0F\uFF1A\u5C06 Tampermonkey \u8BBE\u7F6E\u4E2D\u7684\u201C\u914D\u7F6E\u6A21\u5F0F\u201D\u7531\u201C\u65B0\u624B\u201D\u6539\u4E3A\u201C\u9AD8\u7EA7\u201D\uFF0C\u7136\u540E\u627E\u5230\u201C\u4E0B\u8F7D BETA\u201D\uFF0C\u5C06\u201C\u4E0B\u8F7D\u6A21\u5F0F\u201D\u4FEE\u6539\u4E3A\u201C\u6D4F\u89C8\u5668 API\u201D\u3002";
  const ujBgilCWNgFNV8Q2IDMWS$3 = "\u63D0\u793A\uFF1A\u4E3A\u65B9\u4FBF\u4F7F\u7528\uFF0C\u53EF\u4EE5\u5C06\u6D4F\u89C8\u5668\u8BBE\u7F6E\u4E2D\u201C\u4E0B\u8F7D\u524D\u8BE2\u95EE\u6BCF\u4E2A\u6587\u4EF6\u7684\u4FDD\u5B58\u4F4D\u7F6E\u201D\u9009\u9879\u5173\u95ED\u3002";
  const sMkrF8bqCTJZZ1kXTkT_R$3 = "\u67E5\u770B\u7236\u6295\u7A3F";
  const u0K7A_hv1RZSJl6TDR61A$3 = "\u67E5\u770B\u5B50\u9879";
  const EVPG1YZDtykdz3htyf11u$3 = "\u590D\u5236\u5230\u526A\u8D34\u677F";
  const kCYFwKpwznYIKRmB1tCww$3 = "\u4ECE\u526A\u8D34\u677F\u8BFB\u53D6";
  const fbIpwMw2yVoSxP66OJ32z$3 = "\u56FE\u7247\u94FA\u6EE1\u5C4F\u5E55";
  const tEvQYzSVnggYAcM1uv9Tt$3 = "\u5173\u95ED\u6B64\u529F\u80FD\u7684\u8BDD\u5C4F\u5E55\u4E24\u4FA7\u4F1A\u7559\u767D";
  const HSx0XMZFid_lVuwjzrhH0$3 = "\u56FE\u7247\u5217\u8868\u7684\u7F29\u7565\u56FE\u4F7F\u7528\u5927\u56FE\u94FE\u63A5(sample_url)";
  const lkCkz1OpNtTCFRfGCEoBp$3 = "\u81EA\u52A8\u8FDB\u5165\u7011\u5E03\u6D41\u6A21\u5F0F";
  const e4_fgvntwNlfxgJUc2dXK$3 = "\u8BED\u8A00";
  const sxhTRqogDRozo9IaTGI7g$3 = "\u5217\u8868\u56FE\u7247\u663E\u793A\u590D\u9009\u6846";
  const gPt6cpWrkvqRqZnwJo1KV$3 = "\u5728\u56FE\u7247\u5361\u7247\u5DE6\u4E0A\u89D2\u663E\u793A\u52A0\u5165\u4E0B\u8F7D\u5217\u8868\u7684\u590D\u9009\u6846";
  const dvs63FvVKWm3uHVfqeq00$3 = "\u4F7F\u7528 Fancybox \u67E5\u770B\u8BE6\u60C5";
  const Tbq8O5KhwcDHQ_qxNFW09$3 = "\u5B9E\u9A8C\u6027";
  const IxTawC_qs_xjxj5g8_aGx$3 = "\u9690\u85CF\u6302\u8D77\u7684\u56FE\u7247";
  const YAUNSVT_pTygaY306DZmU$3 = "yande.re \u4E0D\u4F7F\u7528 API \u83B7\u53D6\u56FE\u7247\u5217\u8868";
  const HkRzE7fweBSefchs0z0r8$3 = "\u76F4\u63A5\u89E3\u6790 HTML \u83B7\u53D6\u56FE\u7247\u6570\u636E";
  const yYtssYrCL8VwFrdvvx8v3$3 = "\u865A\u62DF\u5217\u8868(\u7B49\u5BBD\u4E0D\u7B49\u9AD8)";
  const UqbfVZzRyk0iD2NcOii_E$3 = "\u5217\u8868\u56FE\u7247\u663E\u793A\u5206\u8FA8\u7387";
  const _4E2zv2NpOG4y8TV5PRL0$3 = "\u5728\u56FE\u7247\u5361\u7247\u5DE6\u4E0B\u89D2\u663E\u793A\u539F\u56FE\u7684\u5206\u8FA8\u7387";
  const Cu6n0Apv5xVlo4DnQbVbT$3 = "\u6807\u7B7E\u5BFC\u51FA\u8BBE\u7F6E";
  const BB4C5taWpmw06X0Kz_Gtk$3 = "\u8BBE\u7F6E\u6743\u91CD";
  const zg2GRF6zmMXCkT9Uz2Bni$3 = "\u5168\u9009";
  const xSC1vpAOTLQ3RBipKrNpD$3 = "\u4E0D\u9009";
  const cKXET1CCnAXq4H60qr8uc$3 = "\u53CD\u9009";
  const QH_xm27zhgs5E1077asf1$3 = "\u5BFC\u51FA";
  const Uw9QwD1SaR2VjZEqDYRdb$3 = "\u90E8\u5206\u8BBE\u7F6E\u9700\u8981\u5237\u65B0\u9875\u9762\u540E\u751F\u6548";
  const ECpLfRMsS0zpJPTw0qqNs$3 = "\u8BE6\u60C5\u64CD\u4F5C\u680F\u6309\u94AE\u7F6E\u4E8E\u4E0B\u65B9";
  const vJobIibroyz2wkpmONSnR$3 = "\u56FE\u7247\u8BE6\u60C5\u5F39\u7A97\u7684\u64CD\u4F5C\u6309\u94AE\u680F\u4E0E\u6807\u7B7E\u680F\u4F4D\u7F6E\u4E92\u6362";
  const I_MKXUxaNXp3D35GFULn4$3 = "\u6B64\u9009\u9879\u5173\u95ED\u65F6\uFF0C\u70B9\u51FB\u8BE6\u60C5\u56FE\u7247\u4F1A\u5207\u6362\u6309\u94AE\u4E0E\u6807\u7B7E\u7684\u663E\u793A\u9690\u85CF";
  const dm7zGAYbP2sbGXO_ekDDl$3 = "Justified \u5E03\u5C40\u5BBD\u5EA6\u7CFB\u6570";
  var zhHans = {
    UxxldE9xRwmQctrvba5Y8: UxxldE9xRwmQctrvba5Y8$3,
    "ZtQHZx-pEjmu_o3dQD1fc": "\u793E\u56E2",
    Ym0HIEu9Q80qXB31LuC6c: Ym0HIEu9Q80qXB31LuC6c$3,
    juT6gwLOg5r1h2vFpFf6P: juT6gwLOg5r1h2vFpFf6P$3,
    aonlPAu9kEkkwNvQg0DBk: aonlPAu9kEkkwNvQg0DBk$3,
    "MWVfUiW8egLWq7MgV-wzc": "\u6536\u85CF\u5931\u8D25",
    ctWGhVvqB2k_1TX2iY0l2: ctWGhVvqB2k_1TX2iY0l2$3,
    "nd4UjZy2ILsc-iW9iu7xR": "\u6309\u65E5\u671F",
    "elkBQ9moOZ-KMcy5bt_Ts": "\u6700\u8FD1\u4EBA\u6C14",
    HzMBcS2oNGVIoLiHWprim: HzMBcS2oNGVIoLiHWprim$3,
    DXEhXAQbkiCMU_l252jo_: DXEhXAQbkiCMU_l252jo_$3,
    "9juZMc0gPIgvMPKVORpJ1": "\u4EBA\u6C14",
    "6acPWiYq2-OdySa2_xqDu": "\u968F\u673A",
    ZztrWbSaaaas3v0cHtSmh: ZztrWbSaaaas3v0cHtSmh$3,
    OKs1ePekQA4Ona839U114: OKs1ePekQA4Ona839U114$3,
    cKn4cfAxzdgh_HD6OFibB: cKn4cfAxzdgh_HD6OFibB$3,
    "J2Ckb_-LITfmww4aEksqk": "\u8F93\u51FA\u4E0B\u8F7D\u5730\u5740",
    aVqN9TBRCbNGsW3Y2D2Nm: aVqN9TBRCbNGsW3Y2D2Nm$3,
    "jDjashxA-oBPo19DXI504": "\u539F\u56FE",
    u8mEnSo4mxDRUbj7FeAll: u8mEnSo4mxDRUbj7FeAll$3,
    "OrwwNKZ7I70-ecpspE8d_": "\u5207\u6362\u5168\u5C4F",
    ClZdL9hGweOokP7Mn_Ptq: ClZdL9hGweOokP7Mn_Ptq$3,
    "Mt3-hyoH7f_pW2gnfxyur": "\u6309\u65E5",
    "riciqzr6ILBnpPc7KtG-C": "\u6309\u5468",
    "PQhFo-g7sgagimkleVoZR": "\u6309\u6708",
    ze1PaiGdX4ufmoOLv_xw6: ze1PaiGdX4ufmoOLv_xw6$3,
    l8CbIALt_VWUnzBl_Rmgf: l8CbIALt_VWUnzBl_Rmgf$3,
    CacM8tispuPNrSxxpt9GX: CacM8tispuPNrSxxpt9GX$3,
    zs8YTCc8d8XFUgRnp7m_w: zs8YTCc8d8XFUgRnp7m_w$3,
    "7Cgsr4PUMbezDXNfWdvWH": "\u4EBA\u6C14\u4F5C\u54C1",
    "StU1-52QJmNFKQ5soJCyG": "\u968F\u673A\u4F5C\u54C1",
    e2_EYvweJsVoIZlIWkPRV: e2_EYvweJsVoIZlIWkPRV$3,
    "PT74UDfKA45vTVTst_-hD": "\u5173\u4E8E",
    "iJ0h220tvMmUhkfIMYI-W": "\u67E5\u770B\u66F4\u65B0\u65E5\u5FD7",
    qWcqQRsE9nN43MaZ2BmN9: qWcqQRsE9nN43MaZ2BmN9$3,
    jerGO2OCuW9TdnEnGYRWd: jerGO2OCuW9TdnEnGYRWd$3,
    "23iEYyiQlLVhFIqGbj527": "\u95EE\u9898\u4E0E\u5EFA\u8BAE",
    "4g1TUy2kwQrdOs-w4JobB": "\u70B9\u51FB\u53CD\u9988",
    "7Xq5puLNcT0mAvoxElqdf": "\u6B22\u8FCE Star \u2606\u5F61",
    "xJJTEE3nZ4HVXGFfiN-LC": "\u5F20",
    tGi6xYfvStBmR8qduEmKX: tGi6xYfvStBmR8qduEmKX$3,
    "Xtk-NnMgSQZmheJ87nbRV": "\u4E0B\u8F7D",
    RN4dt81l_fZMWODsskZob: RN4dt81l_fZMWODsskZob$3,
    fC8XNfCl04zK7vgeaRZMQ: fC8XNfCl04zK7vgeaRZMQ$3,
    "4hOFoP4M3ZkL3RiN7XOc8": "\u6CA1\u4E86",
    "M-wISnLiQgM_DURMwKZGT": "\u9002\u5E94\u9875\u9762",
    ad8lEoWap_nT9U69WBKen: ad8lEoWap_nT9U69WBKen$3,
    GjMNbm97OgVvpIYlkOisE: GjMNbm97OgVvpIYlkOisE$3,
    "KkkM-iz8RCVQoTrTfhS5j": "\u539F\u59CB\u5927\u5C0F",
    XvOYJ5gHo37M1XztPl18z: XvOYJ5gHo37M1XztPl18z$3,
    _bQs7o9oQSo7ao1G0cp3d: _bQs7o9oQSo7ao1G0cp3d$3,
    "lPPsX2CZbXwC-EGN79Rki": "\u7F29\u5C0F",
    "t83UAY18UebTg1_-zFGP3": "\u5173\u95ED",
    pEU9Y9K7DsODkocCDwq_O: pEU9Y9K7DsODkocCDwq_O$3,
    "2ZPEAvLkCbV3mC0iJAw9K": "\u6536\u85CF",
    caFFJlrS1wa_F86uKPykd: caFFJlrS1wa_F86uKPykd$3,
    qSF4OLshg2EEX4CwtBE6r: qSF4OLshg2EEX4CwtBE6r$3,
    "B_ptN5O-9PhmG5ymGGtc6": "\u67E5\u770B\u5927\u56FE",
    wI4KHHIe3zNRziW4lDZrp: wI4KHHIe3zNRziW4lDZrp$3,
    k4YzDnBtd_S2UpAQucGxF: k4YzDnBtd_S2UpAQucGxF$3,
    "VpuyxZtIoDF9-YyOm0tK_": "\u4E0B\u8F7D\u539F\u6587\u4EF6",
    hVmfDxXoj8vkgVQabEOSr: hVmfDxXoj8vkgVQabEOSr$3,
    gM92sLo0Cqfl2rCaXlOhc: gM92sLo0Cqfl2rCaXlOhc$3,
    "l5W-EtJ_ar-SY2lF4H5Zm": "\u663E\u793A",
    FAqj5ONm50QMfIt9Vq2p1: FAqj5ONm50QMfIt9Vq2p1$3,
    Z4pa8GhgE63OGGvCqAld0: Z4pa8GhgE63OGGvCqAld0$3,
    Dnnio9m9RZA6bkTLytc99: Dnnio9m9RZA6bkTLytc99$3,
    EsiorRgoeHI8h7IHMLDA4: EsiorRgoeHI8h7IHMLDA4$3,
    _Efl8k8uYQj9iJmj3kwbd: _Efl8k8uYQj9iJmj3kwbd$3,
    "jMod2JozzAnwHuD-3KuPb": "\u4E0B\u65B9\u8F93\u5165\u6807\u7B7E\uFF0C\u56DE\u8F66\u6DFB\u52A0",
    RstKmO7YVQMpaDoucxUel: RstKmO7YVQMpaDoucxUel$3,
    "1F-R4qChHIzZaohu5GJzl": "\u5F62\u5982: &api_key=xx&user_id=1",
    Lm_HFVHpv4XCjilV3NLKu: Lm_HFVHpv4XCjilV3NLKu$3,
    A16qoBulYQJLbHe9mqNwm: A16qoBulYQJLbHe9mqNwm$3,
    _nQfaNuwbvPAIFKOY6_7u: _nQfaNuwbvPAIFKOY6_7u$3,
    SIUUZ4wqJTOilEdcX3EOi: SIUUZ4wqJTOilEdcX3EOi$3,
    fVE5taO6GDTPbILat4GCt: fVE5taO6GDTPbILat4GCt$3,
    w95XGurDhDfOfw7XH4JFW: w95XGurDhDfOfw7XH4JFW$3,
    kFcteLMfnoezhOwuTlLFC: kFcteLMfnoezhOwuTlLFC$3,
    FT1uJs8XG__n5qBvuFsH4: FT1uJs8XG__n5qBvuFsH4$3,
    G3b7rbyQEj3_rgzVsNJZY: G3b7rbyQEj3_rgzVsNJZY$3,
    "iRt9V9wNQASic3D7-wTZo": "\u5B9E\u9A8C\u6027/\u4E0D\u4FDD\u8BC1\u53EF\u7528",
    "kop_-39vkeg-bz2wztJ9O": "\u56FE\u7247\u5217\u8868\u5E03\u5C40",
    "tt_YdgKCA_5m-aSTSMPQ_": "\u7011\u5E03\u6D41\u5217\u6570",
    rXjhc8VuGloy1wZ09noNB: rXjhc8VuGloy1wZ09noNB$3,
    uxIs3XkeVzkrEX985zHk3: uxIs3XkeVzkrEX985zHk3$3,
    dU7ou5kVM0s9DMju5e2tS: dU7ou5kVM0s9DMju5e2tS$3,
    "6jPGehET9TViankl5-SRu": "\u7B49\u5BBD\u4E0D\u7B49\u9AD8",
    vfUg8xP6WptIhSL0E9b9D: vfUg8xP6WptIhSL0E9b9D$3,
    "LZbI8am7nD-LiemZzroFF": "\u7B49\u9AD8\u4E0D\u7B49\u5BBD",
    PBjdNKuj02doUvOf2zZqP: PBjdNKuj02doUvOf2zZqP$3,
    z_oL9s5fS164W4_gITOGZ: z_oL9s5fS164W4_gITOGZ$3,
    ti3akdSS3iZV9NsGzIo3m: ti3akdSS3iZV9NsGzIo3m$3,
    "9dq_DxgMG88eom9Gq-4nT": "\u53D6\u6D88",
    "0VAN4cJ-_mUxvtmg4KEi1": "\u786E\u5B9A",
    LN_Rsic4V50DrXbsv9T9L: LN_Rsic4V50DrXbsv9T9L$3,
    OJ8X55GXx5k3peoSXSujf: OJ8X55GXx5k3peoSXSujf$3,
    ujBgilCWNgFNV8Q2IDMWS: ujBgilCWNgFNV8Q2IDMWS$3,
    sMkrF8bqCTJZZ1kXTkT_R: sMkrF8bqCTJZZ1kXTkT_R$3,
    u0K7A_hv1RZSJl6TDR61A: u0K7A_hv1RZSJl6TDR61A$3,
    EVPG1YZDtykdz3htyf11u: EVPG1YZDtykdz3htyf11u$3,
    kCYFwKpwznYIKRmB1tCww: kCYFwKpwznYIKRmB1tCww$3,
    fbIpwMw2yVoSxP66OJ32z: fbIpwMw2yVoSxP66OJ32z$3,
    tEvQYzSVnggYAcM1uv9Tt: tEvQYzSVnggYAcM1uv9Tt$3,
    "99kLMSzDYJCAf1yK9QYzy": "\u5DF2\u590D\u5236",
    "si-zDDRFrEwDTCkp53Q44": "\u8BF7\u5141\u8BB8\u526A\u8D34\u677F\u6743\u9650",
    "eOxsWLzwqrlhBdVMwz-rH": "\u63A8\u8350\u7F51\u7AD9",
    "4yzHPggVky2QKFD2TbBhl": "\u7F29\u7565\u56FE\u4F7F\u7528\u5927\u56FE",
    HSx0XMZFid_lVuwjzrhH0: HSx0XMZFid_lVuwjzrhH0$3,
    lkCkz1OpNtTCFRfGCEoBp: lkCkz1OpNtTCFRfGCEoBp$3,
    "EZd1QQdgUDjT3yya5ZYe-": "\u6253\u5F00\u6E90\u7AD9\u65F6\u76F4\u63A5\u8FDB\u5165\u7011\u5E03\u6D41\u6D4F\u89C8\u6A21\u5F0F",
    e4_fgvntwNlfxgJUc2dXK: e4_fgvntwNlfxgJUc2dXK$3,
    sxhTRqogDRozo9IaTGI7g: sxhTRqogDRozo9IaTGI7g$3,
    gPt6cpWrkvqRqZnwJo1KV: gPt6cpWrkvqRqZnwJo1KV$3,
    dvs63FvVKWm3uHVfqeq00: dvs63FvVKWm3uHVfqeq00$3,
    "w4uJjpTmSEkm6SIDgEo-0": "\u56FE\u7247\u8BE6\u60C5\u4F7F\u7528\u652F\u6301\u7F29\u653E\u65CB\u8F6C\u7B49\u64CD\u4F5C\u7684 Fancybox \u7EC4\u4EF6\u67E5\u770B",
    Tbq8O5KhwcDHQ_qxNFW09: Tbq8O5KhwcDHQ_qxNFW09$3,
    "-x4wjDoHtodaXEgm2SXkg": "\u8C03\u7528 API \u65F6\u4F1A\u9ED8\u8BA4\u4F20\u5165 `holds:false` \u6807\u7B7E",
    IxTawC_qs_xjxj5g8_aGx: IxTawC_qs_xjxj5g8_aGx$3,
    YAUNSVT_pTygaY306DZmU: YAUNSVT_pTygaY306DZmU$3,
    HkRzE7fweBSefchs0z0r8: HkRzE7fweBSefchs0z0r8$3,
    yYtssYrCL8VwFrdvvx8v3: yYtssYrCL8VwFrdvvx8v3$3,
    UqbfVZzRyk0iD2NcOii_E: UqbfVZzRyk0iD2NcOii_E$3,
    _4E2zv2NpOG4y8TV5PRL0: _4E2zv2NpOG4y8TV5PRL0$3,
    "FMi4atPbKn-B1HiAZ2ZP2": "\u5BFC\u51FA\u6807\u7B7E",
    Cu6n0Apv5xVlo4DnQbVbT: Cu6n0Apv5xVlo4DnQbVbT$3,
    BB4C5taWpmw06X0Kz_Gtk: BB4C5taWpmw06X0Kz_Gtk$3,
    zg2GRF6zmMXCkT9Uz2Bni: zg2GRF6zmMXCkT9Uz2Bni$3,
    xSC1vpAOTLQ3RBipKrNpD: xSC1vpAOTLQ3RBipKrNpD$3,
    cKXET1CCnAXq4H60qr8uc: cKXET1CCnAXq4H60qr8uc$3,
    QH_xm27zhgs5E1077asf1: QH_xm27zhgs5E1077asf1$3,
    Uw9QwD1SaR2VjZEqDYRdb: Uw9QwD1SaR2VjZEqDYRdb$3,
    ECpLfRMsS0zpJPTw0qqNs: ECpLfRMsS0zpJPTw0qqNs$3,
    vJobIibroyz2wkpmONSnR: vJobIibroyz2wkpmONSnR$3,
    "HPukB-OKzIuRxMmO4Rx2U": "\u70B9\u51FB\u8BE6\u60C5\u56FE\u7247\u5173\u95ED\u5F39\u7A97",
    I_MKXUxaNXp3D35GFULn4: I_MKXUxaNXp3D35GFULn4$3,
    dm7zGAYbP2sbGXO_ekDDl: dm7zGAYbP2sbGXO_ekDDl$3
  };
  const UxxldE9xRwmQctrvba5Y8$2 = "\u8A2D\u7F6E";
  const A16qoBulYQJLbHe9mqNwm$2 = "\u5305\u542B\u88F8\u9732\u3001\u6027\u611B\u63CF\u5BEB\u5167\u5BB9\u7B49\u904E\u6FC0\u5167\u5BB9";
  const CacM8tispuPNrSxxpt9GX$2 = "\u5FEB\u6377\u65B9\u5F0F";
  const ClZdL9hGweOokP7Mn_Ptq$2 = "\u9000\u51FA\u7011\u5E03\u6D41\u6A21\u5F0F";
  const DXEhXAQbkiCMU_l252jo_$2 = "\u5716\u96C6 (Pool)";
  const Dnnio9m9RZA6bkTLytc99$2 = "\u52A0\u5165\u6536\u85CF";
  const EsiorRgoeHI8h7IHMLDA4$2 = "\u65B0\u6A19\u7C64\u9801\u6253\u958B";
  const FAqj5ONm50QMfIt9Vq2p1$2 = "\u4E0B\u8F09\u51FA\u932F";
  const FT1uJs8XG__n5qBvuFsH4$2 = "\u8A73\u60C5\u5F48\u7A97\u9810\u52A0\u8F09\u4E0B\u4E00\u5F35\u6A23\u54C1\u5716/\u539F\u5716";
  const G3b7rbyQEj3_rgzVsNJZY$2 = "\u5716\u7247\u9810\u52A0\u8F09\u6578\u91CF";
  const GjMNbm97OgVvpIYlkOisE$2 = "\u9069\u61C9\u9AD8\u5EA6";
  const HzMBcS2oNGVIoLiHWprim$2 = "\u6536\u85CF\u593E";
  const Lm_HFVHpv4XCjilV3NLKu$2 = "\u986F\u793A NSFW \u5167\u5BB9";
  const OKs1ePekQA4Ona839U114$2 = "\u4E0B\u8F09\u5217\u8868";
  const RN4dt81l_fZMWODsskZob$2 = "\u52A0\u8F09\u4E2D";
  const RstKmO7YVQMpaDoucxUel$2 = "\u7576\u524D\u7AD9\u9EDE API Credentials";
  const SIUUZ4wqJTOilEdcX3EOi$2 = "\u8A73\u60C5\u5F48\u7A97\u6EFE\u8F2A\u5207\u63DB\u5716\u7247";
  const XvOYJ5gHo37M1XztPl18z$2 = "\u5168\u5C4F";
  const Ym0HIEu9Q80qXB31LuC6c$2 = "\u756B\u5E2B";
  const Z4pa8GhgE63OGGvCqAld0$2 = "\u4E0B\u9762\u6C92\u6709\u4E86";
  const ZztrWbSaaaas3v0cHtSmh$2 = "\u641C\u7D22\u6A19\u7C64";
  const _Efl8k8uYQj9iJmj3kwbd$2 = "\u672C\u5730\u6A19\u7C64\u9ED1\u540D\u55AE";
  const _bQs7o9oQSo7ao1G0cp3d$2 = "\u65CB\u8F49";
  const _nQfaNuwbvPAIFKOY6_7u$2 = "\u76E3\u807D\u6EFE\u8F2A\u4E8B\u4EF6";
  const aVqN9TBRCbNGsW3Y2D2Nm$2 = "\u5927\u5716";
  const ad8lEoWap_nT9U69WBKen$2 = "\u9069\u61C9\u5BEC\u5EA6";
  const aonlPAu9kEkkwNvQg0DBk$2 = "\u89D2\u8272";
  const cKn4cfAxzdgh_HD6OFibB$2 = "\u958B\u59CB\u4E0B\u8F09";
  const caFFJlrS1wa_F86uKPykd$2 = "\u8A73\u60C5";
  const ctWGhVvqB2k_1TX2iY0l2$2 = "\u6536\u85CF\u6210\u529F";
  const dU7ou5kVM0s9DMju5e2tS$2 = "\u5217";
  const e2_EYvweJsVoIZlIWkPRV$2 = "\u7AD9\u9EDE\u5217\u8868";
  const fC8XNfCl04zK7vgeaRZMQ$2 = "\u52A0\u8F09\u66F4\u591A";
  const fVE5taO6GDTPbILat4GCt$2 = "\u76E3\u807D\u9375\u76E4\u4E8B\u4EF6";
  const gM92sLo0Cqfl2rCaXlOhc$2 = "\u96B1\u85CF";
  const hVmfDxXoj8vkgVQabEOSr$2 = "\u52A0\u5165\u4E0B\u8F09\u5217\u8868";
  const jerGO2OCuW9TdnEnGYRWd$2 = "\u9EDE\u64CA\u67E5\u770B";
  const juT6gwLOg5r1h2vFpFf6P$2 = "\u7248\u6B0A";
  const k4YzDnBtd_S2UpAQucGxF$2 = "\u4E0B\u8F09\u9AD8\u6E05\u5716";
  const kFcteLMfnoezhOwuTlLFC$2 = "\u8A73\u60C5\u5716\u7247\u9810\u52A0\u8F09";
  const l8CbIALt_VWUnzBl_Rmgf$2 = "Booru \u5716\u7AD9\u7011\u5E03\u6D41\u700F\u89BD";
  const pEU9Y9K7DsODkocCDwq_O$2 = "\u5DF2\u6536\u85CF";
  const qSF4OLshg2EEX4CwtBE6r$2 = "\u4F86\u6E90";
  const qWcqQRsE9nN43MaZ2BmN9$2 = "Web \u7248\u672C";
  const rXjhc8VuGloy1wZ09noNB$2 = "\u5C0F\u65BC7\u5217\u6642\u5217\u8868\u6703\u52A0\u8F09\u5927\u5716";
  const tGi6xYfvStBmR8qduEmKX$2 = "\u67E5\u770B";
  const u8mEnSo4mxDRUbj7FeAll$2 = "\u5207\u63DB\u6DF1\u8272\u6A21\u5F0F";
  const uxIs3XkeVzkrEX985zHk3$2 = "\u81EA\u52D5";
  const vfUg8xP6WptIhSL0E9b9D$2 = "\u7B49\u5BEC\u7B49\u9AD8";
  const w95XGurDhDfOfw7XH4JFW$2 = "\u8A73\u60C5\u5F48\u7A97\u4F7F\u7528A/D/\u2190/\u2192\u5207\u63DB\u5716\u7247";
  const wI4KHHIe3zNRziW4lDZrp$2 = "\u4E0B\u8F09\u6A23\u54C1\u5716";
  const ze1PaiGdX4ufmoOLv_xw6$2 = "\u6309\u5E74";
  const zs8YTCc8d8XFUgRnp7m_w$2 = "\u6211\u7684\u6536\u85CF\u593E";
  const PBjdNKuj02doUvOf2zZqP$2 = "\u5716\u7247\u4FDD\u5B58\u5230\u5B50\u6587\u4EF6\u593E";
  const z_oL9s5fS164W4_gITOGZ$2 = "\u5728\u9ED8\u8A8D\u4E0B\u8F09\u76EE\u9304\u5275\u5EFA\u4E00\u500B\u4EE5\u7AD9\u9EDE\u70BA\u540D\u7684\u6587\u4EF6\u593E\u5B58\u653E\u5716\u7247\uFF0C\u9700\u8981\u5C07 Tampermonkey \u7684\u201C\u4E0B\u8F09\u6A21\u5F0F\u201D\u4FEE\u6539\u70BA\u201C\u700F\u89BD\u5668 API\u201D";
  const LN_Rsic4V50DrXbsv9T9L$2 = "\u78BA\u5B9A\u8981\u958B\u555F\u5B50\u6587\u4EF6\u593E\u4E0B\u8F09\u529F\u80FD\u55CE\uFF1F\n\u8ACB\u78BA\u4FDD\u60A8\u5DF2\u5C07 Tampermonkey \u7684\u201C\u4E0B\u8F09\u6A21\u5F0F\u201D\u4FEE\u6539\u70BA\u201C\u700F\u89BD\u5668 API\u201D\u3002";
  const OJ8X55GXx5k3peoSXSujf$2 = "\u6253\u958B\u65B9\u5F0F\uFF1A\u5C07 Tampermonkey \u8A2D\u7F6E\u4E2D\u7684\u201C\u914D\u7F6E\u6A21\u5F0F\u201D\u7531\u201C\u65B0\u624B\u201D\u6539\u70BA\u201C\u9AD8\u7D1A\u201D\uFF0C\u7136\u5F8C\u627E\u5230\u201C\u4E0B\u8F09 BETA\u201D\uFF0C\u5C07\u201C\u4E0B\u8F09\u6A21\u5F0F\u201D\u4FEE\u6539\u70BA\u201C\u700F\u89BD\u5668 API\u201D\u3002";
  const ti3akdSS3iZV9NsGzIo3m$2 = "\u63D0\u793A";
  const ujBgilCWNgFNV8Q2IDMWS$2 = "\u63D0\u793A\uFF1A\u70BA\u65B9\u4FBF\u4F7F\u7528\uFF0C\u53EF\u4EE5\u5C07\u700F\u89BD\u5668\u8A2D\u7F6E\u4E2D\u201C\u4E0B\u8F09\u524D\u8A62\u554F\u6BCF\u500B\u6587\u4EF6\u7684\u4FDD\u5B58\u4F4D\u7F6E\u201D\u9078\u9805\u95DC\u9589\u3002";
  const sMkrF8bqCTJZZ1kXTkT_R$2 = "\u67E5\u770B\u7236\u6295\u7A3F";
  const u0K7A_hv1RZSJl6TDR61A$2 = "\u67E5\u770B\u5B50\u9805";
  const EVPG1YZDtykdz3htyf11u$2 = "\u8907\u88FD\u5230\u526A\u8CBC\u7C3F";
  const fbIpwMw2yVoSxP66OJ32z$2 = "\u5716\u7247\u92EA\u6EFF\u87A2\u5E55";
  const kCYFwKpwznYIKRmB1tCww$2 = "\u5F9E\u526A\u8CBC\u7C3F\u8B80\u53D6";
  const tEvQYzSVnggYAcM1uv9Tt$2 = "\u95DC\u9589\u6B64\u529F\u80FD\u7684\u8A71\u87A2\u5E55\u5169\u5074\u6703\u7559\u767D";
  const HSx0XMZFid_lVuwjzrhH0$2 = "\u5716\u7247\u6E05\u55AE\u7684\u7E2E\u5716\u4F7F\u7528\u5927\u5716\u9023\u7D50(sample_url)";
  const lkCkz1OpNtTCFRfGCEoBp$2 = "\u81EA\u52D5\u9032\u5165\u7011\u5E03\u6D41\u6A21\u5F0F";
  const e4_fgvntwNlfxgJUc2dXK$2 = "\u8A9E\u8A00";
  const gPt6cpWrkvqRqZnwJo1KV$2 = "\u5728\u5716\u7247\u5361\u7247\u5DE6\u4E0A\u89D2\u986F\u793A\u52A0\u5165\u4E0B\u8F09\u6E05\u55AE\u7684\u8907\u9078\u6846";
  const sxhTRqogDRozo9IaTGI7g$2 = "\u6E05\u55AE\u5716\u7247\u986F\u793A\u8907\u9078\u6846";
  const dvs63FvVKWm3uHVfqeq00$2 = "\u4F7F\u7528 Fancybox \u67E5\u770B\u8A73\u60C5";
  const Tbq8O5KhwcDHQ_qxNFW09$2 = "\u5BE6\u9A57\u6027";
  const IxTawC_qs_xjxj5g8_aGx$2 = "\u96B1\u85CF\u639B\u8D77\u7684\u5716\u7247";
  const YAUNSVT_pTygaY306DZmU$2 = "yande.re \u4E0D\u4F7F\u7528 API \u53D6\u5F97\u5716\u7247\u5217\u8868";
  const HkRzE7fweBSefchs0z0r8$2 = "\u76F4\u63A5\u89E3\u6790 HTML \u53D6\u5F97\u5716\u7247\u6578\u64DA";
  const yYtssYrCL8VwFrdvvx8v3$2 = "\u865B\u64EC\u5217\u8868(\u7B49\u5BEC\u4E0D\u7B49\u9AD8)";
  const UqbfVZzRyk0iD2NcOii_E$2 = "\u5217\u8868\u5716\u7247\u986F\u793A\u5206\u8FA8\u7387";
  const _4E2zv2NpOG4y8TV5PRL0$2 = "\u5728\u5716\u7247\u5361\u5DE6\u4E0B\u89D2\u986F\u793A\u539F\u5716\u7684\u5206\u8FA8\u7387";
  const Cu6n0Apv5xVlo4DnQbVbT$2 = "\u6A19\u7C64\u532F\u51FA\u8A2D\u7F6E";
  const BB4C5taWpmw06X0Kz_Gtk$2 = "\u8A2D\u7F6E\u6B0A\u91CD";
  const zg2GRF6zmMXCkT9Uz2Bni$2 = "\u5168\u9078";
  const xSC1vpAOTLQ3RBipKrNpD$2 = "\u53D6\u6D88\u5168\u9078";
  const cKXET1CCnAXq4H60qr8uc$2 = "\u53CD\u9078";
  const QH_xm27zhgs5E1077asf1$2 = "\u532F\u51FA";
  const Uw9QwD1SaR2VjZEqDYRdb$2 = "\u90E8\u5206\u8A2D\u7F6E\u9700\u8981\u5237\u65B0\u9801\u9762\u5F8C\u751F\u6548";
  const ECpLfRMsS0zpJPTw0qqNs$2 = "\u8A73\u60C5\u64CD\u4F5C\u6B04\u6309\u9215\u7F6E\u65BC\u4E0B\u65B9";
  const vJobIibroyz2wkpmONSnR$2 = "\u5716\u7247\u8A73\u60C5\u5F48\u7A97\u7684\u64CD\u4F5C\u6309\u9215\u6B04\u8207\u6A19\u7C64\u6B04\u4F4D\u7F6E\u4E92\u63DB";
  const I_MKXUxaNXp3D35GFULn4$2 = "\u6B64\u9078\u9805\u95DC\u9589\u6642\uFF0C\u9EDE\u64CA\u8A73\u60C5\u5716\u7247\u6703\u5207\u63DB\u6309\u9215\u8207\u6A19\u7C64\u7684\u986F\u793A\u96B1\u85CF";
  const dm7zGAYbP2sbGXO_ekDDl$2 = "Justified \u4F48\u5C40\u5BEC\u5EA6\u4FC2\u6578";
  var zhHant = {
    UxxldE9xRwmQctrvba5Y8: UxxldE9xRwmQctrvba5Y8$2,
    "1F-R4qChHIzZaohu5GJzl": "\u5F62\u5982: &api_key=xx&user_id=1",
    "23iEYyiQlLVhFIqGbj527": "\u554F\u984C\u8207\u5EFA\u8B70",
    "2ZPEAvLkCbV3mC0iJAw9K": "\u6536\u85CF",
    "4g1TUy2kwQrdOs-w4JobB": "\u9EDE\u64CA\u53CD\u994B",
    "4hOFoP4M3ZkL3RiN7XOc8": "\u6C92\u4E86",
    "6acPWiYq2-OdySa2_xqDu": "\u96A8\u6A5F",
    "6jPGehET9TViankl5-SRu": "\u7B49\u5BEC\u4E0D\u7B49\u9AD8",
    "7Cgsr4PUMbezDXNfWdvWH": "\u4EBA\u6C23\u4F5C\u54C1",
    "7Xq5puLNcT0mAvoxElqdf": "\u6B61\u8FCE Star \u2606\u5F61",
    "9juZMc0gPIgvMPKVORpJ1": "\u4EBA\u6C23",
    A16qoBulYQJLbHe9mqNwm: A16qoBulYQJLbHe9mqNwm$2,
    "B_ptN5O-9PhmG5ymGGtc6": "\u67E5\u770B\u5927\u5716",
    CacM8tispuPNrSxxpt9GX: CacM8tispuPNrSxxpt9GX$2,
    ClZdL9hGweOokP7Mn_Ptq: ClZdL9hGweOokP7Mn_Ptq$2,
    DXEhXAQbkiCMU_l252jo_: DXEhXAQbkiCMU_l252jo_$2,
    Dnnio9m9RZA6bkTLytc99: Dnnio9m9RZA6bkTLytc99$2,
    EsiorRgoeHI8h7IHMLDA4: EsiorRgoeHI8h7IHMLDA4$2,
    FAqj5ONm50QMfIt9Vq2p1: FAqj5ONm50QMfIt9Vq2p1$2,
    FT1uJs8XG__n5qBvuFsH4: FT1uJs8XG__n5qBvuFsH4$2,
    G3b7rbyQEj3_rgzVsNJZY: G3b7rbyQEj3_rgzVsNJZY$2,
    GjMNbm97OgVvpIYlkOisE: GjMNbm97OgVvpIYlkOisE$2,
    HzMBcS2oNGVIoLiHWprim: HzMBcS2oNGVIoLiHWprim$2,
    "J2Ckb_-LITfmww4aEksqk": "\u8F38\u51FA\u4E0B\u8F09\u5730\u5740",
    "KkkM-iz8RCVQoTrTfhS5j": "\u539F\u59CB\u5927\u5C0F",
    "LZbI8am7nD-LiemZzroFF": "\u7B49\u9AD8\u4E0D\u7B49\u5BEC",
    Lm_HFVHpv4XCjilV3NLKu: Lm_HFVHpv4XCjilV3NLKu$2,
    "M-wISnLiQgM_DURMwKZGT": "\u9069\u61C9\u9801\u9762",
    "MWVfUiW8egLWq7MgV-wzc": "\u6536\u85CF\u5931\u6557",
    "Mt3-hyoH7f_pW2gnfxyur": "\u6309\u65E5",
    OKs1ePekQA4Ona839U114: OKs1ePekQA4Ona839U114$2,
    "OrwwNKZ7I70-ecpspE8d_": "\u5207\u63DB\u5168\u5C4F",
    "PQhFo-g7sgagimkleVoZR": "\u6309\u6708",
    "PT74UDfKA45vTVTst_-hD": "\u95DC\u65BC",
    RN4dt81l_fZMWODsskZob: RN4dt81l_fZMWODsskZob$2,
    RstKmO7YVQMpaDoucxUel: RstKmO7YVQMpaDoucxUel$2,
    SIUUZ4wqJTOilEdcX3EOi: SIUUZ4wqJTOilEdcX3EOi$2,
    "StU1-52QJmNFKQ5soJCyG": "\u96A8\u6A5F\u4F5C\u54C1",
    "VpuyxZtIoDF9-YyOm0tK_": "\u4E0B\u8F09\u539F\u6587\u4EF6",
    "Xtk-NnMgSQZmheJ87nbRV": "\u4E0B\u8F09",
    XvOYJ5gHo37M1XztPl18z: XvOYJ5gHo37M1XztPl18z$2,
    Ym0HIEu9Q80qXB31LuC6c: Ym0HIEu9Q80qXB31LuC6c$2,
    Z4pa8GhgE63OGGvCqAld0: Z4pa8GhgE63OGGvCqAld0$2,
    "ZtQHZx-pEjmu_o3dQD1fc": "\u793E\u5718",
    ZztrWbSaaaas3v0cHtSmh: ZztrWbSaaaas3v0cHtSmh$2,
    _Efl8k8uYQj9iJmj3kwbd: _Efl8k8uYQj9iJmj3kwbd$2,
    _bQs7o9oQSo7ao1G0cp3d: _bQs7o9oQSo7ao1G0cp3d$2,
    _nQfaNuwbvPAIFKOY6_7u: _nQfaNuwbvPAIFKOY6_7u$2,
    aVqN9TBRCbNGsW3Y2D2Nm: aVqN9TBRCbNGsW3Y2D2Nm$2,
    ad8lEoWap_nT9U69WBKen: ad8lEoWap_nT9U69WBKen$2,
    aonlPAu9kEkkwNvQg0DBk: aonlPAu9kEkkwNvQg0DBk$2,
    cKn4cfAxzdgh_HD6OFibB: cKn4cfAxzdgh_HD6OFibB$2,
    caFFJlrS1wa_F86uKPykd: caFFJlrS1wa_F86uKPykd$2,
    ctWGhVvqB2k_1TX2iY0l2: ctWGhVvqB2k_1TX2iY0l2$2,
    dU7ou5kVM0s9DMju5e2tS: dU7ou5kVM0s9DMju5e2tS$2,
    e2_EYvweJsVoIZlIWkPRV: e2_EYvweJsVoIZlIWkPRV$2,
    "elkBQ9moOZ-KMcy5bt_Ts": "\u6700\u8FD1\u4EBA\u6C23",
    fC8XNfCl04zK7vgeaRZMQ: fC8XNfCl04zK7vgeaRZMQ$2,
    fVE5taO6GDTPbILat4GCt: fVE5taO6GDTPbILat4GCt$2,
    gM92sLo0Cqfl2rCaXlOhc: gM92sLo0Cqfl2rCaXlOhc$2,
    hVmfDxXoj8vkgVQabEOSr: hVmfDxXoj8vkgVQabEOSr$2,
    "iJ0h220tvMmUhkfIMYI-W": "\u67E5\u770B\u66F4\u65B0\u65E5\u8A8C",
    "iRt9V9wNQASic3D7-wTZo": "\u5BE6\u9A57\u6027/\u4E0D\u4FDD\u8B49\u53EF\u7528",
    "jDjashxA-oBPo19DXI504": "\u539F\u5716",
    "jMod2JozzAnwHuD-3KuPb": "\u4E0B\u65B9\u8F38\u5165\u6A19\u7C64\uFF0C\u56DE\u8ECA\u6DFB\u52A0",
    jerGO2OCuW9TdnEnGYRWd: jerGO2OCuW9TdnEnGYRWd$2,
    juT6gwLOg5r1h2vFpFf6P: juT6gwLOg5r1h2vFpFf6P$2,
    k4YzDnBtd_S2UpAQucGxF: k4YzDnBtd_S2UpAQucGxF$2,
    kFcteLMfnoezhOwuTlLFC: kFcteLMfnoezhOwuTlLFC$2,
    "kop_-39vkeg-bz2wztJ9O": "\u5716\u7247\u5217\u8868\u4F48\u5C40",
    "l5W-EtJ_ar-SY2lF4H5Zm": "\u986F\u793A",
    l8CbIALt_VWUnzBl_Rmgf: l8CbIALt_VWUnzBl_Rmgf$2,
    "lPPsX2CZbXwC-EGN79Rki": "\u7E2E\u5C0F",
    "nd4UjZy2ILsc-iW9iu7xR": "\u6309\u65E5\u671F",
    pEU9Y9K7DsODkocCDwq_O: pEU9Y9K7DsODkocCDwq_O$2,
    qSF4OLshg2EEX4CwtBE6r: qSF4OLshg2EEX4CwtBE6r$2,
    qWcqQRsE9nN43MaZ2BmN9: qWcqQRsE9nN43MaZ2BmN9$2,
    rXjhc8VuGloy1wZ09noNB: rXjhc8VuGloy1wZ09noNB$2,
    "riciqzr6ILBnpPc7KtG-C": "\u6309\u9031",
    "t83UAY18UebTg1_-zFGP3": "\u95DC\u9589",
    tGi6xYfvStBmR8qduEmKX: tGi6xYfvStBmR8qduEmKX$2,
    "tt_YdgKCA_5m-aSTSMPQ_": "\u7011\u5E03\u6D41\u5217\u6578",
    u8mEnSo4mxDRUbj7FeAll: u8mEnSo4mxDRUbj7FeAll$2,
    uxIs3XkeVzkrEX985zHk3: uxIs3XkeVzkrEX985zHk3$2,
    vfUg8xP6WptIhSL0E9b9D: vfUg8xP6WptIhSL0E9b9D$2,
    w95XGurDhDfOfw7XH4JFW: w95XGurDhDfOfw7XH4JFW$2,
    wI4KHHIe3zNRziW4lDZrp: wI4KHHIe3zNRziW4lDZrp$2,
    "xJJTEE3nZ4HVXGFfiN-LC": "\u5F35",
    ze1PaiGdX4ufmoOLv_xw6: ze1PaiGdX4ufmoOLv_xw6$2,
    zs8YTCc8d8XFUgRnp7m_w: zs8YTCc8d8XFUgRnp7m_w$2,
    PBjdNKuj02doUvOf2zZqP: PBjdNKuj02doUvOf2zZqP$2,
    z_oL9s5fS164W4_gITOGZ: z_oL9s5fS164W4_gITOGZ$2,
    "0VAN4cJ-_mUxvtmg4KEi1": "\u78BA\u5B9A",
    "9dq_DxgMG88eom9Gq-4nT": "\u53D6\u6D88",
    LN_Rsic4V50DrXbsv9T9L: LN_Rsic4V50DrXbsv9T9L$2,
    OJ8X55GXx5k3peoSXSujf: OJ8X55GXx5k3peoSXSujf$2,
    ti3akdSS3iZV9NsGzIo3m: ti3akdSS3iZV9NsGzIo3m$2,
    ujBgilCWNgFNV8Q2IDMWS: ujBgilCWNgFNV8Q2IDMWS$2,
    sMkrF8bqCTJZZ1kXTkT_R: sMkrF8bqCTJZZ1kXTkT_R$2,
    u0K7A_hv1RZSJl6TDR61A: u0K7A_hv1RZSJl6TDR61A$2,
    "99kLMSzDYJCAf1yK9QYzy": "\u5DF2\u8907\u88FD",
    EVPG1YZDtykdz3htyf11u: EVPG1YZDtykdz3htyf11u$2,
    fbIpwMw2yVoSxP66OJ32z: fbIpwMw2yVoSxP66OJ32z$2,
    kCYFwKpwznYIKRmB1tCww: kCYFwKpwznYIKRmB1tCww$2,
    "si-zDDRFrEwDTCkp53Q44": "\u8ACB\u5141\u8A31\u526A\u8CBC\u7C3F\u6B0A\u9650",
    tEvQYzSVnggYAcM1uv9Tt: tEvQYzSVnggYAcM1uv9Tt$2,
    "eOxsWLzwqrlhBdVMwz-rH": "\u63A8\u85A6\u7DB2\u7AD9",
    "4yzHPggVky2QKFD2TbBhl": "\u7E2E\u5716\u4F7F\u7528\u5927\u5716",
    HSx0XMZFid_lVuwjzrhH0: HSx0XMZFid_lVuwjzrhH0$2,
    "EZd1QQdgUDjT3yya5ZYe-": "\u958B\u555F\u4F86\u6E90\u7AD9\u6642\u76F4\u63A5\u9032\u5165\u7011\u5E03\u6D41\u700F\u89BD\u6A21\u5F0F",
    lkCkz1OpNtTCFRfGCEoBp: lkCkz1OpNtTCFRfGCEoBp$2,
    e4_fgvntwNlfxgJUc2dXK: e4_fgvntwNlfxgJUc2dXK$2,
    gPt6cpWrkvqRqZnwJo1KV: gPt6cpWrkvqRqZnwJo1KV$2,
    sxhTRqogDRozo9IaTGI7g: sxhTRqogDRozo9IaTGI7g$2,
    dvs63FvVKWm3uHVfqeq00: dvs63FvVKWm3uHVfqeq00$2,
    "w4uJjpTmSEkm6SIDgEo-0": "\u5716\u7247\u8A73\u60C5\u4F7F\u7528\u652F\u63F4\u7E2E\u653E\u65CB\u8F49\u7B49\u64CD\u4F5C\u7684 Fancybox \u7D44\u4EF6\u67E5\u770B",
    Tbq8O5KhwcDHQ_qxNFW09: Tbq8O5KhwcDHQ_qxNFW09$2,
    IxTawC_qs_xjxj5g8_aGx: IxTawC_qs_xjxj5g8_aGx$2,
    "-x4wjDoHtodaXEgm2SXkg": "\u547C\u53EB API \u6642\u6703\u9810\u8A2D\u50B3\u5165 `holds:false` \u6A19\u7C64",
    YAUNSVT_pTygaY306DZmU: YAUNSVT_pTygaY306DZmU$2,
    HkRzE7fweBSefchs0z0r8: HkRzE7fweBSefchs0z0r8$2,
    yYtssYrCL8VwFrdvvx8v3: yYtssYrCL8VwFrdvvx8v3$2,
    UqbfVZzRyk0iD2NcOii_E: UqbfVZzRyk0iD2NcOii_E$2,
    _4E2zv2NpOG4y8TV5PRL0: _4E2zv2NpOG4y8TV5PRL0$2,
    "FMi4atPbKn-B1HiAZ2ZP2": "\u532F\u51FA\u6A19\u7C64",
    Cu6n0Apv5xVlo4DnQbVbT: Cu6n0Apv5xVlo4DnQbVbT$2,
    BB4C5taWpmw06X0Kz_Gtk: BB4C5taWpmw06X0Kz_Gtk$2,
    zg2GRF6zmMXCkT9Uz2Bni: zg2GRF6zmMXCkT9Uz2Bni$2,
    xSC1vpAOTLQ3RBipKrNpD: xSC1vpAOTLQ3RBipKrNpD$2,
    cKXET1CCnAXq4H60qr8uc: cKXET1CCnAXq4H60qr8uc$2,
    QH_xm27zhgs5E1077asf1: QH_xm27zhgs5E1077asf1$2,
    Uw9QwD1SaR2VjZEqDYRdb: Uw9QwD1SaR2VjZEqDYRdb$2,
    ECpLfRMsS0zpJPTw0qqNs: ECpLfRMsS0zpJPTw0qqNs$2,
    vJobIibroyz2wkpmONSnR: vJobIibroyz2wkpmONSnR$2,
    "HPukB-OKzIuRxMmO4Rx2U": "\u9EDE\u64CA\u8A73\u60C5\u5716\u7247\u95DC\u9589\u5F48\u7A97",
    I_MKXUxaNXp3D35GFULn4: I_MKXUxaNXp3D35GFULn4$2,
    dm7zGAYbP2sbGXO_ekDDl: dm7zGAYbP2sbGXO_ekDDl$2
  };
  const UxxldE9xRwmQctrvba5Y8$1 = "Settings";
  const A16qoBulYQJLbHe9mqNwm$1 = "Contains excessive content such as nudity and sexual descriptions";
  const CacM8tispuPNrSxxpt9GX$1 = "Shortcuts";
  const ClZdL9hGweOokP7Mn_Ptq$1 = "Exit Waterfall Mode";
  const DXEhXAQbkiCMU_l252jo_$1 = "Pools";
  const Dnnio9m9RZA6bkTLytc99$1 = "Add to favorites";
  const EsiorRgoeHI8h7IHMLDA4$1 = "Open in new tab";
  const FAqj5ONm50QMfIt9Vq2p1$1 = "Download error";
  const FT1uJs8XG__n5qBvuFsH4$1 = "The details pop-up window preloads the next sample image/original image";
  const G3b7rbyQEj3_rgzVsNJZY$1 = "Number of images preloaded";
  const GjMNbm97OgVvpIYlkOisE$1 = "Adapt to height";
  const HzMBcS2oNGVIoLiHWprim$1 = "Favorites";
  const Lm_HFVHpv4XCjilV3NLKu$1 = "Show NSFW content";
  const OKs1ePekQA4Ona839U114$1 = "Download list";
  const RN4dt81l_fZMWODsskZob$1 = "Loading";
  const RstKmO7YVQMpaDoucxUel$1 = "Current Site API Credentials";
  const SIUUZ4wqJTOilEdcX3EOi$1 = "Details pop-up scroll wheel to switch images";
  const XvOYJ5gHo37M1XztPl18z$1 = "Fullscreen";
  const Ym0HIEu9Q80qXB31LuC6c$1 = "Illustrator";
  const Z4pa8GhgE63OGGvCqAld0$1 = "No more";
  const ZztrWbSaaaas3v0cHtSmh$1 = "Search tags";
  const _Efl8k8uYQj9iJmj3kwbd$1 = "Local Tag Blacklist";
  const _bQs7o9oQSo7ao1G0cp3d$1 = "Rotate";
  const _nQfaNuwbvPAIFKOY6_7u$1 = "Listen for wheel events";
  const aVqN9TBRCbNGsW3Y2D2Nm$1 = "Large image";
  const ad8lEoWap_nT9U69WBKen$1 = "Adapt to width";
  const aonlPAu9kEkkwNvQg0DBk$1 = "Character";
  const cKn4cfAxzdgh_HD6OFibB$1 = "Start download";
  const caFFJlrS1wa_F86uKPykd$1 = "Details";
  const ctWGhVvqB2k_1TX2iY0l2$1 = "Add to favorites success";
  const dU7ou5kVM0s9DMju5e2tS$1 = "Column(s)";
  const e2_EYvweJsVoIZlIWkPRV$1 = "Site list";
  const fC8XNfCl04zK7vgeaRZMQ$1 = "Load more";
  const fVE5taO6GDTPbILat4GCt$1 = "Listen for keyboard events";
  const gM92sLo0Cqfl2rCaXlOhc$1 = "Hide";
  const hVmfDxXoj8vkgVQabEOSr$1 = "Add to download list";
  const jerGO2OCuW9TdnEnGYRWd$1 = "Click to view";
  const juT6gwLOg5r1h2vFpFf6P$1 = "Copyright";
  const k4YzDnBtd_S2UpAQucGxF$1 = "Download jpeg image";
  const kFcteLMfnoezhOwuTlLFC$1 = "Detailed image preloading";
  const l8CbIALt_VWUnzBl_Rmgf$1 = "Booru sites waterfall browsing";
  const pEU9Y9K7DsODkocCDwq_O$1 = "Bookmarked";
  const qSF4OLshg2EEX4CwtBE6r$1 = "Source";
  const qWcqQRsE9nN43MaZ2BmN9$1 = "Web version";
  const rXjhc8VuGloy1wZ09noNB$1 = "When the list is less than 7 columns, the list will load a large image";
  const tGi6xYfvStBmR8qduEmKX$1 = "View";
  const u8mEnSo4mxDRUbj7FeAll$1 = "Toggle dark mode";
  const uxIs3XkeVzkrEX985zHk3$1 = "Auto";
  const vfUg8xP6WptIhSL0E9b9D$1 = "Equal width and height";
  const w95XGurDhDfOfw7XH4JFW$1 = "Use A/D/\u2190/\u2192 to switch images in the detail pop-up window";
  const wI4KHHIe3zNRziW4lDZrp$1 = "Download sample image";
  const ze1PaiGdX4ufmoOLv_xw6$1 = "By year";
  const zs8YTCc8d8XFUgRnp7m_w$1 = "My favorites";
  const PBjdNKuj02doUvOf2zZqP$1 = "Save images to subfolders";
  const z_oL9s5fS164W4_gITOGZ$1 = `Create a folder named after the site in the default download directory to store pictures, you need to change Tampermonkey's "Download Mode" to "Browser API"`;
  const LN_Rsic4V50DrXbsv9T9L$1 = `Are you sure you want to enable subfolder downloads? 
Make sure you have modified Tampermonkey's "Download Mode" to "Browser API".`;
  const OJ8X55GXx5k3peoSXSujf$1 = 'How to open it: Change the "Configuration Mode" in the Tampermonkey settings from "Novice" to "Advanced", then find "Download BETA", and change the "Download Mode" to "Browser API".';
  const ti3akdSS3iZV9NsGzIo3m$1 = "Tips";
  const ujBgilCWNgFNV8Q2IDMWS$1 = 'Tip: For convenience, you can turn off the "Ask where to save each file before downloading" option in the browser settings.';
  const sMkrF8bqCTJZZ1kXTkT_R$1 = "Parent";
  const u0K7A_hv1RZSJl6TDR61A$1 = "Child";
  const EVPG1YZDtykdz3htyf11u$1 = "Copy to clipboard";
  const fbIpwMw2yVoSxP66OJ32z$1 = "Images fill the screen";
  const kCYFwKpwznYIKRmB1tCww$1 = "Read from clipboard";
  const tEvQYzSVnggYAcM1uv9Tt$1 = "When this feature is turned off, both sides of the screen will be blank.";
  const HSx0XMZFid_lVuwjzrhH0$1 = "Use the large image link(sample_url) to load the list image thumbnail.";
  const lkCkz1OpNtTCFRfGCEoBp$1 = "Automatically enter waterfall mode";
  const e4_fgvntwNlfxgJUc2dXK$1 = "Language";
  const gPt6cpWrkvqRqZnwJo1KV$1 = "Display a checkbox to add to the download list in the upper left corner of the image card";
  const sxhTRqogDRozo9IaTGI7g$1 = "Show checkbox in list image card";
  const dvs63FvVKWm3uHVfqeq00$1 = "Use Fancybox to view details";
  const Tbq8O5KhwcDHQ_qxNFW09$1 = "Experimental";
  const IxTawC_qs_xjxj5g8_aGx$1 = "Hide held posts";
  const YAUNSVT_pTygaY306DZmU$1 = "yande.re does not use API to get image list";
  const HkRzE7fweBSefchs0z0r8$1 = "Directly parsing HTML to obtain image data";
  const yYtssYrCL8VwFrdvvx8v3$1 = "Virtual list (equal width and unequal height)";
  const UqbfVZzRyk0iD2NcOii_E$1 = "Show resolution in list image card.";
  const _4E2zv2NpOG4y8TV5PRL0$1 = "Display the resolution of the original image in the lower left corner of the image card";
  const Cu6n0Apv5xVlo4DnQbVbT$1 = "Tags Export Settings";
  const BB4C5taWpmw06X0Kz_Gtk$1 = "Setting weights";
  const zg2GRF6zmMXCkT9Uz2Bni$1 = "All";
  const xSC1vpAOTLQ3RBipKrNpD$1 = "None";
  const cKXET1CCnAXq4H60qr8uc$1 = "Invert";
  const QH_xm27zhgs5E1077asf1$1 = "Export";
  const Uw9QwD1SaR2VjZEqDYRdb$1 = "Some settings need to refresh the page to take effect.";
  const ECpLfRMsS0zpJPTw0qqNs$1 = "Place the action button below the details pop-up window";
  const vJobIibroyz2wkpmONSnR$1 = "Swap the positions of the action button bar and the label bar of the image details pop-up window";
  const I_MKXUxaNXp3D35GFULn4$1 = "When this option is turned off, clicking the detail image will toggle the display and hiding of buttons and tags.";
  const dm7zGAYbP2sbGXO_ekDDl$1 = "Justified layout width factor";
  var en = {
    UxxldE9xRwmQctrvba5Y8: UxxldE9xRwmQctrvba5Y8$1,
    "1F-R4qChHIzZaohu5GJzl": "e.g: &api_key=xx&user_id=1",
    "23iEYyiQlLVhFIqGbj527": "Questions and Suggestions",
    "2ZPEAvLkCbV3mC0iJAw9K": "Add to favorites",
    "4g1TUy2kwQrdOs-w4JobB": "Click to feedback",
    "4hOFoP4M3ZkL3RiN7XOc8": "No more",
    "6acPWiYq2-OdySa2_xqDu": "Random",
    "6jPGehET9TViankl5-SRu": "Equal width and different height",
    "7Cgsr4PUMbezDXNfWdvWH": "Popular",
    "7Xq5puLNcT0mAvoxElqdf": "Welcome Star \u2606\u5F61",
    "9juZMc0gPIgvMPKVORpJ1": "Popular",
    A16qoBulYQJLbHe9mqNwm: A16qoBulYQJLbHe9mqNwm$1,
    "B_ptN5O-9PhmG5ymGGtc6": "View larger image",
    CacM8tispuPNrSxxpt9GX: CacM8tispuPNrSxxpt9GX$1,
    ClZdL9hGweOokP7Mn_Ptq: ClZdL9hGweOokP7Mn_Ptq$1,
    DXEhXAQbkiCMU_l252jo_: DXEhXAQbkiCMU_l252jo_$1,
    Dnnio9m9RZA6bkTLytc99: Dnnio9m9RZA6bkTLytc99$1,
    EsiorRgoeHI8h7IHMLDA4: EsiorRgoeHI8h7IHMLDA4$1,
    FAqj5ONm50QMfIt9Vq2p1: FAqj5ONm50QMfIt9Vq2p1$1,
    FT1uJs8XG__n5qBvuFsH4: FT1uJs8XG__n5qBvuFsH4$1,
    G3b7rbyQEj3_rgzVsNJZY: G3b7rbyQEj3_rgzVsNJZY$1,
    GjMNbm97OgVvpIYlkOisE: GjMNbm97OgVvpIYlkOisE$1,
    HzMBcS2oNGVIoLiHWprim: HzMBcS2oNGVIoLiHWprim$1,
    "J2Ckb_-LITfmww4aEksqk": "Output download links",
    "KkkM-iz8RCVQoTrTfhS5j": "Original size",
    "LZbI8am7nD-LiemZzroFF": "Equal height and unequal width",
    Lm_HFVHpv4XCjilV3NLKu: Lm_HFVHpv4XCjilV3NLKu$1,
    "M-wISnLiQgM_DURMwKZGT": "Fit page",
    "MWVfUiW8egLWq7MgV-wzc": "Add to favorites failed",
    "Mt3-hyoH7f_pW2gnfxyur": "By day",
    OKs1ePekQA4Ona839U114: OKs1ePekQA4Ona839U114$1,
    "OrwwNKZ7I70-ecpspE8d_": "Toggle fullscreen",
    "PQhFo-g7sgagimkleVoZR": "By month",
    "PT74UDfKA45vTVTst_-hD": "About",
    RN4dt81l_fZMWODsskZob: RN4dt81l_fZMWODsskZob$1,
    RstKmO7YVQMpaDoucxUel: RstKmO7YVQMpaDoucxUel$1,
    SIUUZ4wqJTOilEdcX3EOi: SIUUZ4wqJTOilEdcX3EOi$1,
    "StU1-52QJmNFKQ5soJCyG": "Random",
    "VpuyxZtIoDF9-YyOm0tK_": "Download the original file",
    "Xtk-NnMgSQZmheJ87nbRV": "Download",
    XvOYJ5gHo37M1XztPl18z: XvOYJ5gHo37M1XztPl18z$1,
    Ym0HIEu9Q80qXB31LuC6c: Ym0HIEu9Q80qXB31LuC6c$1,
    Z4pa8GhgE63OGGvCqAld0: Z4pa8GhgE63OGGvCqAld0$1,
    "ZtQHZx-pEjmu_o3dQD1fc": "Circle",
    ZztrWbSaaaas3v0cHtSmh: ZztrWbSaaaas3v0cHtSmh$1,
    _Efl8k8uYQj9iJmj3kwbd: _Efl8k8uYQj9iJmj3kwbd$1,
    _bQs7o9oQSo7ao1G0cp3d: _bQs7o9oQSo7ao1G0cp3d$1,
    _nQfaNuwbvPAIFKOY6_7u: _nQfaNuwbvPAIFKOY6_7u$1,
    aVqN9TBRCbNGsW3Y2D2Nm: aVqN9TBRCbNGsW3Y2D2Nm$1,
    ad8lEoWap_nT9U69WBKen: ad8lEoWap_nT9U69WBKen$1,
    aonlPAu9kEkkwNvQg0DBk: aonlPAu9kEkkwNvQg0DBk$1,
    cKn4cfAxzdgh_HD6OFibB: cKn4cfAxzdgh_HD6OFibB$1,
    caFFJlrS1wa_F86uKPykd: caFFJlrS1wa_F86uKPykd$1,
    ctWGhVvqB2k_1TX2iY0l2: ctWGhVvqB2k_1TX2iY0l2$1,
    dU7ou5kVM0s9DMju5e2tS: dU7ou5kVM0s9DMju5e2tS$1,
    e2_EYvweJsVoIZlIWkPRV: e2_EYvweJsVoIZlIWkPRV$1,
    "elkBQ9moOZ-KMcy5bt_Ts": "Recent Popular",
    fC8XNfCl04zK7vgeaRZMQ: fC8XNfCl04zK7vgeaRZMQ$1,
    fVE5taO6GDTPbILat4GCt: fVE5taO6GDTPbILat4GCt$1,
    gM92sLo0Cqfl2rCaXlOhc: gM92sLo0Cqfl2rCaXlOhc$1,
    hVmfDxXoj8vkgVQabEOSr: hVmfDxXoj8vkgVQabEOSr$1,
    "iJ0h220tvMmUhkfIMYI-W": "Check out the changelog",
    "iRt9V9wNQASic3D7-wTZo": "Experimental/not guaranteed",
    "jDjashxA-oBPo19DXI504": "Original image",
    "jMod2JozzAnwHuD-3KuPb": "Input the tags below and press Enter to add",
    jerGO2OCuW9TdnEnGYRWd: jerGO2OCuW9TdnEnGYRWd$1,
    juT6gwLOg5r1h2vFpFf6P: juT6gwLOg5r1h2vFpFf6P$1,
    k4YzDnBtd_S2UpAQucGxF: k4YzDnBtd_S2UpAQucGxF$1,
    kFcteLMfnoezhOwuTlLFC: kFcteLMfnoezhOwuTlLFC$1,
    "kop_-39vkeg-bz2wztJ9O": "Image List Layout",
    "l5W-EtJ_ar-SY2lF4H5Zm": "Show",
    l8CbIALt_VWUnzBl_Rmgf: l8CbIALt_VWUnzBl_Rmgf$1,
    "lPPsX2CZbXwC-EGN79Rki": "Zoom out",
    "nd4UjZy2ILsc-iW9iu7xR": "By date",
    pEU9Y9K7DsODkocCDwq_O: pEU9Y9K7DsODkocCDwq_O$1,
    qSF4OLshg2EEX4CwtBE6r: qSF4OLshg2EEX4CwtBE6r$1,
    qWcqQRsE9nN43MaZ2BmN9: qWcqQRsE9nN43MaZ2BmN9$1,
    rXjhc8VuGloy1wZ09noNB: rXjhc8VuGloy1wZ09noNB$1,
    "riciqzr6ILBnpPc7KtG-C": "By week",
    "t83UAY18UebTg1_-zFGP3": "Close",
    tGi6xYfvStBmR8qduEmKX: tGi6xYfvStBmR8qduEmKX$1,
    "tt_YdgKCA_5m-aSTSMPQ_": "Number of waterfall columns",
    u8mEnSo4mxDRUbj7FeAll: u8mEnSo4mxDRUbj7FeAll$1,
    uxIs3XkeVzkrEX985zHk3: uxIs3XkeVzkrEX985zHk3$1,
    vfUg8xP6WptIhSL0E9b9D: vfUg8xP6WptIhSL0E9b9D$1,
    w95XGurDhDfOfw7XH4JFW: w95XGurDhDfOfw7XH4JFW$1,
    wI4KHHIe3zNRziW4lDZrp: wI4KHHIe3zNRziW4lDZrp$1,
    "xJJTEE3nZ4HVXGFfiN-LC": "pcs",
    ze1PaiGdX4ufmoOLv_xw6: ze1PaiGdX4ufmoOLv_xw6$1,
    zs8YTCc8d8XFUgRnp7m_w: zs8YTCc8d8XFUgRnp7m_w$1,
    PBjdNKuj02doUvOf2zZqP: PBjdNKuj02doUvOf2zZqP$1,
    z_oL9s5fS164W4_gITOGZ: z_oL9s5fS164W4_gITOGZ$1,
    "0VAN4cJ-_mUxvtmg4KEi1": "OK",
    "9dq_DxgMG88eom9Gq-4nT": "Cancel",
    LN_Rsic4V50DrXbsv9T9L: LN_Rsic4V50DrXbsv9T9L$1,
    OJ8X55GXx5k3peoSXSujf: OJ8X55GXx5k3peoSXSujf$1,
    ti3akdSS3iZV9NsGzIo3m: ti3akdSS3iZV9NsGzIo3m$1,
    ujBgilCWNgFNV8Q2IDMWS: ujBgilCWNgFNV8Q2IDMWS$1,
    sMkrF8bqCTJZZ1kXTkT_R: sMkrF8bqCTJZZ1kXTkT_R$1,
    u0K7A_hv1RZSJl6TDR61A: u0K7A_hv1RZSJl6TDR61A$1,
    "99kLMSzDYJCAf1yK9QYzy": "Copied",
    EVPG1YZDtykdz3htyf11u: EVPG1YZDtykdz3htyf11u$1,
    fbIpwMw2yVoSxP66OJ32z: fbIpwMw2yVoSxP66OJ32z$1,
    kCYFwKpwznYIKRmB1tCww: kCYFwKpwznYIKRmB1tCww$1,
    "si-zDDRFrEwDTCkp53Q44": "Please allow clipboard permission",
    tEvQYzSVnggYAcM1uv9Tt: tEvQYzSVnggYAcM1uv9Tt$1,
    "eOxsWLzwqrlhBdVMwz-rH": "Recommended Websites",
    "4yzHPggVky2QKFD2TbBhl": "Use large image link for thumbnail",
    HSx0XMZFid_lVuwjzrhH0: HSx0XMZFid_lVuwjzrhH0$1,
    "EZd1QQdgUDjT3yya5ZYe-": "Directly enter waterfall browsing mode when opening the source site",
    lkCkz1OpNtTCFRfGCEoBp: lkCkz1OpNtTCFRfGCEoBp$1,
    e4_fgvntwNlfxgJUc2dXK: e4_fgvntwNlfxgJUc2dXK$1,
    gPt6cpWrkvqRqZnwJo1KV: gPt6cpWrkvqRqZnwJo1KV$1,
    sxhTRqogDRozo9IaTGI7g: sxhTRqogDRozo9IaTGI7g$1,
    dvs63FvVKWm3uHVfqeq00: dvs63FvVKWm3uHVfqeq00$1,
    "w4uJjpTmSEkm6SIDgEo-0": "Using Fancybox that supports zooming/rotation/so on to view details.",
    Tbq8O5KhwcDHQ_qxNFW09: Tbq8O5KhwcDHQ_qxNFW09$1,
    IxTawC_qs_xjxj5g8_aGx: IxTawC_qs_xjxj5g8_aGx$1,
    "-x4wjDoHtodaXEgm2SXkg": "When calling the API, the `holds:false` tag will be passed in by default.",
    YAUNSVT_pTygaY306DZmU: YAUNSVT_pTygaY306DZmU$1,
    HkRzE7fweBSefchs0z0r8: HkRzE7fweBSefchs0z0r8$1,
    yYtssYrCL8VwFrdvvx8v3: yYtssYrCL8VwFrdvvx8v3$1,
    UqbfVZzRyk0iD2NcOii_E: UqbfVZzRyk0iD2NcOii_E$1,
    _4E2zv2NpOG4y8TV5PRL0: _4E2zv2NpOG4y8TV5PRL0$1,
    "FMi4atPbKn-B1HiAZ2ZP2": "Export Tags",
    Cu6n0Apv5xVlo4DnQbVbT: Cu6n0Apv5xVlo4DnQbVbT$1,
    BB4C5taWpmw06X0Kz_Gtk: BB4C5taWpmw06X0Kz_Gtk$1,
    zg2GRF6zmMXCkT9Uz2Bni: zg2GRF6zmMXCkT9Uz2Bni$1,
    xSC1vpAOTLQ3RBipKrNpD: xSC1vpAOTLQ3RBipKrNpD$1,
    cKXET1CCnAXq4H60qr8uc: cKXET1CCnAXq4H60qr8uc$1,
    QH_xm27zhgs5E1077asf1: QH_xm27zhgs5E1077asf1$1,
    Uw9QwD1SaR2VjZEqDYRdb: Uw9QwD1SaR2VjZEqDYRdb$1,
    ECpLfRMsS0zpJPTw0qqNs: ECpLfRMsS0zpJPTw0qqNs$1,
    vJobIibroyz2wkpmONSnR: vJobIibroyz2wkpmONSnR$1,
    "HPukB-OKzIuRxMmO4Rx2U": "Close the pop-up window when you click on the detailed image",
    I_MKXUxaNXp3D35GFULn4: I_MKXUxaNXp3D35GFULn4$1,
    dm7zGAYbP2sbGXO_ekDDl: dm7zGAYbP2sbGXO_ekDDl$1
  };
  const UxxldE9xRwmQctrvba5Y8 = "\u8A2D\u5B9A";
  const A16qoBulYQJLbHe9mqNwm = "\u30CC\u30FC\u30C9\u3084\u6027\u7684\u63CF\u5199\u306A\u3069\u306E\u904E\u5EA6\u306A\u5185\u5BB9\u304C\u542B\u307E\u308C\u3066\u3044\u308B\u3082\u306E";
  const CacM8tispuPNrSxxpt9GX = "\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8";
  const ClZdL9hGweOokP7Mn_Ptq = "\u30A6\u30A9\u30FC\u30BF\u30FC\u30D5\u30A9\u30FC\u30EB\u30E2\u30FC\u30C9\u3092\u7D42\u4E86\u3059\u308B";
  const DXEhXAQbkiCMU_l252jo_ = "\u30D7\u30FC\u30EB";
  const Dnnio9m9RZA6bkTLytc99 = "\u304A\u6C17\u306B\u5165\u308A\u306B\u8FFD\u52A0";
  const EsiorRgoeHI8h7IHMLDA4 = "\u65B0\u3057\u3044\u30BF\u30D6\u3067\u958B\u304F";
  const FAqj5ONm50QMfIt9Vq2p1 = "\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u30A8\u30E9\u30FC";
  const FT1uJs8XG__n5qBvuFsH4 = "\u8A73\u7D30\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7 \u30A6\u30A3\u30F3\u30C9\u30A6\u306B\u306F\u3001\u6B21\u306E\u30B5\u30F3\u30D7\u30EB\u753B\u50CF/\u30AA\u30EA\u30B8\u30CA\u30EB\u753B\u50CF\u304C\u30D7\u30EA\u30ED\u30FC\u30C9\u3055\u308C\u307E\u3059\u3002";
  const G3b7rbyQEj3_rgzVsNJZY = "\u30D7\u30EA\u30ED\u30FC\u30C9\u3055\u308C\u305F\u753B\u50CF\u306E\u6570";
  const GjMNbm97OgVvpIYlkOisE = "\u9AD8\u3055\u306B\u9069\u5FDC\u3059\u308B";
  const HzMBcS2oNGVIoLiHWprim = "\u304A\u6C17\u306B\u5165\u308A";
  const Lm_HFVHpv4XCjilV3NLKu = "NSFW\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u8868\u793A";
  const OKs1ePekQA4Ona839U114 = "\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u30EA\u30B9\u30C8";
  const RN4dt81l_fZMWODsskZob = "\u8AAD\u307F\u8FBC\u307F\u4E2D";
  const RstKmO7YVQMpaDoucxUel = "\u73FE\u5728\u306E\u30B5\u30A4\u30C8 API \u8A8D\u8A3C\u60C5\u5831";
  const SIUUZ4wqJTOilEdcX3EOi = "\u753B\u50CF\u3092\u5207\u308A\u66FF\u3048\u308B\u305F\u3081\u306E\u8A73\u7D30\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7 \u30B9\u30AF\u30ED\u30FC\u30EB \u30DB\u30A4\u30FC\u30EB";
  const XvOYJ5gHo37M1XztPl18z = "\u5168\u753B\u9762\u8868\u793A";
  const Ym0HIEu9Q80qXB31LuC6c = "\u30A4\u30E9\u30B9\u30C8\u30EC\u30FC\u30BF\u30FC";
  const Z4pa8GhgE63OGGvCqAld0 = "\u3082\u3046\u3044\u3084";
  const ZztrWbSaaaas3v0cHtSmh = "\u30BF\u30B0\u3092\u691C\u7D22";
  const _Efl8k8uYQj9iJmj3kwbd = "\u30ED\u30FC\u30AB\u30EB\u30BF\u30B0\u30D6\u30E9\u30C3\u30AF\u30EA\u30B9\u30C8";
  const _bQs7o9oQSo7ao1G0cp3d = "\u56DE\u8EE2";
  const _nQfaNuwbvPAIFKOY6_7u = "\u30DB\u30A4\u30FC\u30EB \u30A4\u30D9\u30F3\u30C8\u3092\u30EA\u30C3\u30B9\u30F3\u3059\u308B";
  const aVqN9TBRCbNGsW3Y2D2Nm = "\u5927\u304D\u306A\u753B\u50CF";
  const ad8lEoWap_nT9U69WBKen = "\u5E45\u306B\u5408\u308F\u305B\u308B";
  const aonlPAu9kEkkwNvQg0DBk = "\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC";
  const cKn4cfAxzdgh_HD6OFibB = "\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u958B\u59CB";
  const caFFJlrS1wa_F86uKPykd = "\u8A73\u7D30";
  const ctWGhVvqB2k_1TX2iY0l2 = "\u304A\u6C17\u306B\u5165\u308A\u306B\u8FFD\u52A0\u6210\u529F";
  const dU7ou5kVM0s9DMju5e2tS = "\u6841";
  const e2_EYvweJsVoIZlIWkPRV = "\u30B5\u30A4\u30C8\u30EA\u30B9\u30C8";
  const fC8XNfCl04zK7vgeaRZMQ = "\u3082\u3063\u3068\u8AAD\u307F\u8FBC\u3080";
  const fVE5taO6GDTPbILat4GCt = "\u30AD\u30FC\u30DC\u30FC\u30C9\u30A4\u30D9\u30F3\u30C8\u3092\u30EA\u30C3\u30B9\u30F3\u3059\u308B";
  const gM92sLo0Cqfl2rCaXlOhc = "\u96A0\u308C\u308B";
  const hVmfDxXoj8vkgVQabEOSr = "\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u30EA\u30B9\u30C8\u306B\u8FFD\u52A0";
  const jerGO2OCuW9TdnEnGYRWd = "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u8868\u793A";
  const juT6gwLOg5r1h2vFpFf6P = "\u8457\u4F5C\u6A29";
  const k4YzDnBtd_S2UpAQucGxF = "JPEG\u753B\u50CF\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9";
  const kFcteLMfnoezhOwuTlLFC = "\u8A73\u7D30\u306A\u753B\u50CF\u306E\u30D7\u30EA\u30ED\u30FC\u30C9";
  const l8CbIALt_VWUnzBl_Rmgf = "Booru \u30B5\u30A4\u30C8\u306E\u30A6\u30A9\u30FC\u30BF\u30FC\u30D5\u30A9\u30FC\u30EB \u30D6\u30E9\u30A6\u30B8\u30F3\u30B0";
  const pEU9Y9K7DsODkocCDwq_O = "\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF\u6E08\u307F";
  const qSF4OLshg2EEX4CwtBE6r = "\u30BD\u30FC\u30B9";
  const qWcqQRsE9nN43MaZ2BmN9 = "Web\u30D0\u30FC\u30B8\u30E7\u30F3";
  const rXjhc8VuGloy1wZ09noNB = "\u30EA\u30B9\u30C8\u304C 7 \u5217\u672A\u6E80\u306E\u5834\u5408\u3001\u30EA\u30B9\u30C8\u306B\u306F\u5927\u304D\u306A\u753B\u50CF\u304C\u30ED\u30FC\u30C9\u3055\u308C\u307E\u3059\u3002";
  const tGi6xYfvStBmR8qduEmKX = "\u898B\u308B";
  const u8mEnSo4mxDRUbj7FeAll = "\u30C0\u30FC\u30AF\u30E2\u30FC\u30C9\u3092\u5207\u308A\u66FF\u3048\u308B";
  const uxIs3XkeVzkrEX985zHk3 = "\u81EA\u52D5";
  const vfUg8xP6WptIhSL0E9b9D = "\u5E45\u3068\u9AD8\u3055\u304C\u7B49\u3057\u3044";
  const w95XGurDhDfOfw7XH4JFW = "A/D/\u2190/\u2192\u3067\u8A73\u7D30\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u30A6\u30A3\u30F3\u30C9\u30A6\u306E\u753B\u50CF\u3092\u5207\u308A\u66FF\u3048\u307E\u3059";
  const wI4KHHIe3zNRziW4lDZrp = "\u30B5\u30F3\u30D7\u30EB\u753B\u50CF\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9";
  const ze1PaiGdX4ufmoOLv_xw6 = "\u5E74\u5225";
  const zs8YTCc8d8XFUgRnp7m_w = "\u79C1\u306E\u304A\u6C17\u306B\u5165\u308A";
  const PBjdNKuj02doUvOf2zZqP = "\u753B\u50CF\u3092\u30B5\u30D6\u30D5\u30A9\u30EB\u30C0\u30FC\u306B\u4FDD\u5B58\u3059\u308B";
  const z_oL9s5fS164W4_gITOGZ = "\u5199\u771F\u3092\u4FDD\u5B58\u3059\u308B\u306B\u306F\u3001\u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9 \u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306B\u30B5\u30A4\u30C8\u306B\u3061\u306A\u3093\u3060\u540D\u524D\u306E\u30D5\u30A9\u30EB\u30C0\u30FC\u3092\u4F5C\u6210\u3057\u307E\u3059\u3002Tampermonkey \u306E\u300C\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9 \u30E2\u30FC\u30C9\u300D\u3092\u300C\u30D6\u30E9\u30A6\u30B6 API\u300D\u306B\u5909\u66F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002";
  const LN_Rsic4V50DrXbsv9T9L = "\u30B5\u30D6\u30D5\u30A9\u30EB\u30C0\u30FC\u306E\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3092\u6709\u52B9\u306B\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B? \nTampermonkey \u306E\u300C\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9 \u30E2\u30FC\u30C9\u300D\u3092\u300C\u30D6\u30E9\u30A6\u30B6 API\u300D\u306B\u5909\u66F4\u3057\u3066\u3044\u308B\u3053\u3068\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002";
  const OJ8X55GXx5k3peoSXSujf = "\u958B\u304F\u65B9\u6CD5: Tampermonkey \u8A2D\u5B9A\u306E\u300C\u69CB\u6210\u30E2\u30FC\u30C9\u300D\u3092\u300C\u521D\u5FC3\u8005\u300D\u304B\u3089\u300C\u4E0A\u7D1A\u300D\u306B\u5909\u66F4\u3057\u3001\u300C\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9 \u30D9\u30FC\u30BF\u300D\u3092\u898B\u3064\u3051\u3066\u3001\u300C\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9 \u30E2\u30FC\u30C9\u300D\u3092\u300C\u30D6\u30E9\u30A6\u30B6 API\u300D\u306B\u5909\u66F4\u3057\u307E\u3059\u3002";
  const ti3akdSS3iZV9NsGzIo3m = "\u30D2\u30F3\u30C8";
  const ujBgilCWNgFNV8Q2IDMWS = "\u30D2\u30F3\u30C8: \u4FBF\u5B9C\u4E0A\u3001\u30D6\u30E9\u30A6\u30B6\u306E\u8A2D\u5B9A\u3067 [\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u524D\u306B\u5404\u30D5\u30A1\u30A4\u30EB\u306E\u4FDD\u5B58\u5834\u6240\u3092\u78BA\u8A8D\u3059\u308B] \u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u30AA\u30D5\u306B\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002";
  const sMkrF8bqCTJZZ1kXTkT_R = "Parent";
  const u0K7A_hv1RZSJl6TDR61A = "Child";
  const EVPG1YZDtykdz3htyf11u = "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC";
  const fbIpwMw2yVoSxP66OJ32z = "\u753B\u50CF\u304C\u753B\u9762\u3044\u3063\u3071\u3044\u306B\u8868\u793A\u3055\u308C\u308B";
  const kCYFwKpwznYIKRmB1tCww = "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u304B\u3089\u8AAD\u307F\u53D6\u308B";
  const tEvQYzSVnggYAcM1uv9Tt = "\u3053\u306E\u6A5F\u80FD\u3092\u30AA\u30D5\u306B\u3059\u308B\u3068\u3001\u753B\u9762\u306E\u4E21\u5074\u304C\u7A7A\u767D\u306B\u306A\u308A\u307E\u3059\u3002";
  const HSx0XMZFid_lVuwjzrhH0 = "\u753B\u50CF\u4E00\u89A7\u306E\u30B5\u30E0\u30CD\u30A4\u30EB\u306F\u5927\u304D\u306A\u753B\u50CF\u30EA\u30F3\u30AF(sample_url)\u3092\u4F7F\u7528\u3057\u3066\u3044\u307E\u3059";
  const lkCkz1OpNtTCFRfGCEoBp = "\u81EA\u52D5\u7684\u306B\u30A6\u30A9\u30FC\u30BF\u30FC\u30D5\u30A9\u30FC\u30EB\u30D5\u30ED\u30FC\u30E2\u30FC\u30C9\u306B\u5165\u308A\u307E\u3059";
  const e4_fgvntwNlfxgJUc2dXK = "\u8A00\u8A9E";
  const gPt6cpWrkvqRqZnwJo1KV = "\u753B\u50CF\u30AB\u30FC\u30C9\u306E\u5DE6\u4E0A\u9685\u306B\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9 \u30EA\u30B9\u30C8\u306B\u8FFD\u52A0\u3059\u308B\u30C1\u30A7\u30C3\u30AF\u30DC\u30C3\u30AF\u30B9\u3092\u8868\u793A\u3057\u307E\u3059\u3002";
  const sxhTRqogDRozo9IaTGI7g = "\u6295\u7A3F\u30EA\u30B9\u30C8\u306B\u753B\u50CF\u30C1\u30A7\u30C3\u30AF\u30DC\u30C3\u30AF\u30B9\u3092\u8868\u793A\u3059\u308B";
  const dvs63FvVKWm3uHVfqeq00 = "Fancybox \u3092\u4F7F\u7528\u3057\u3066\u8A73\u7D30\u3092\u8868\u793A\u3059\u308B";
  const Tbq8O5KhwcDHQ_qxNFW09 = "\u5B9F\u9A13\u7684";
  const IxTawC_qs_xjxj5g8_aGx = "\u4FDD\u7559\u4E2D\u306E\u753B\u50CF\u3092\u975E\u8868\u793A\u306B\u3059\u308B";
  const YAUNSVT_pTygaY306DZmU = "yande.re \u306F\u753B\u50CF\u30EA\u30B9\u30C8\u306E\u53D6\u5F97\u306B API \u3092\u4F7F\u7528\u3057\u307E\u305B\u3093";
  const HkRzE7fweBSefchs0z0r8 = "HTML \u3092\u76F4\u63A5\u89E3\u6790\u3057\u3066\u753B\u50CF\u30C7\u30FC\u30BF\u3092\u53D6\u5F97\u3059\u308B";
  const yYtssYrCL8VwFrdvvx8v3 = "\u4EEE\u60F3\u30EA\u30B9\u30C8 (\u5E45\u306F\u7B49\u3057\u304F\u3001\u9AD8\u3055\u306F\u7B49\u3057\u304F\u306A\u3044)";
  const UqbfVZzRyk0iD2NcOii_E = "\u30C7\u30A3\u30B9\u30D7\u30EC\u30A4\u30EA\u30B9\u30C8\u753B\u50CF\u306E\u89E3\u50CF\u5EA6";
  const _4E2zv2NpOG4y8TV5PRL0 = "\u753B\u50CF\u30AB\u30FC\u30C9\u306E\u5DE6\u4E0B\u9685\u306B\u5143\u306E\u753B\u50CF\u306E\u89E3\u50CF\u5EA6\u3092\u8868\u793A\u3057\u307E\u3059\u3002";
  const Cu6n0Apv5xVlo4DnQbVbT = "\u30BF\u30B0\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u8A2D\u5B9A";
  const BB4C5taWpmw06X0Kz_Gtk = "\u30A6\u30A7\u30A4\u30C8\u306E\u8A2D\u5B9A";
  const zg2GRF6zmMXCkT9Uz2Bni = "\u5168\u9078\u629E";
  const xSC1vpAOTLQ3RBipKrNpD = "\u9078\u629E\u3057\u306A\u3044";
  const cKXET1CCnAXq4H60qr8uc = "\u9006\u9078\u629E";
  const QH_xm27zhgs5E1077asf1 = "\u8F38\u51FA";
  const Uw9QwD1SaR2VjZEqDYRdb = "\u4E00\u90E8\u306E\u8A2D\u5B9A\u3092\u6709\u52B9\u306B\u3059\u308B\u306B\u306F\u3001\u30DA\u30FC\u30B8\u3092\u66F4\u65B0\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002";
  const ECpLfRMsS0zpJPTw0qqNs = "\u8A73\u7D30\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7 \u30A6\u30A3\u30F3\u30C9\u30A6\u306E\u4E0B\u306B\u30A2\u30AF\u30B7\u30E7\u30F3 \u30DC\u30BF\u30F3\u3092\u914D\u7F6E\u3057\u307E\u3059\u3002";
  const vJobIibroyz2wkpmONSnR = "\u753B\u50CF\u8A73\u7D30\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u30A6\u30A3\u30F3\u30C9\u30A6\u306E\u30A2\u30AF\u30B7\u30E7\u30F3\u30DC\u30BF\u30F3\u30D0\u30FC\u3068\u30E9\u30D9\u30EB\u30D0\u30FC\u306E\u4F4D\u7F6E\u3092\u5165\u308C\u66FF\u3048\u307E\u3059\u3002";
  const I_MKXUxaNXp3D35GFULn4 = "\u30AA\u30D5\u306B\u3059\u308B\u3068\u3001\u8A73\u7D30\u753B\u50CF\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u30DC\u30BF\u30F3\u3084\u30BF\u30B0\u306E\u8868\u793A\u30FB\u975E\u8868\u793A\u304C\u5207\u308A\u66FF\u308F\u308A\u307E\u3059\u3002";
  const dm7zGAYbP2sbGXO_ekDDl = "\u4E21\u7AEF\u63C3\u3048\u30EC\u30A4\u30A2\u30A6\u30C8\u5E45\u4FC2\u6570";
  var ja = {
    UxxldE9xRwmQctrvba5Y8,
    "1F-R4qChHIzZaohu5GJzl": "\u4F8B\uFF1A&api_key=xx&user_id=1",
    "23iEYyiQlLVhFIqGbj527": "\u8CEA\u554F\u3068\u63D0\u6848",
    "2ZPEAvLkCbV3mC0iJAw9K": "\u304A\u6C17\u306B\u5165\u308A\u306B\u8FFD\u52A0",
    "4g1TUy2kwQrdOs-w4JobB": "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u30D5\u30A3\u30FC\u30C9\u30D0\u30C3\u30AF\u3092\u9001\u4FE1",
    "4hOFoP4M3ZkL3RiN7XOc8": "\u3082\u3046\u3044\u3084",
    "6acPWiYq2-OdySa2_xqDu": "\u30E9\u30F3\u30C0\u30E0",
    "6jPGehET9TViankl5-SRu": "\u5E45\u306F\u540C\u3058\u3067\u9AD8\u3055\u306F\u7570\u306A\u308A\u307E\u3059",
    "7Cgsr4PUMbezDXNfWdvWH": "\u4EBA\u6C17\u4F5C\u54C1",
    "7Xq5puLNcT0mAvoxElqdf": "\u30A6\u30A7\u30EB\u30AB\u30E0\u30B9\u30BF\u30FC\u2606\u5F61",
    "9juZMc0gPIgvMPKVORpJ1": "\u4EBA\u6C17",
    A16qoBulYQJLbHe9mqNwm,
    "B_ptN5O-9PhmG5ymGGtc6": "\u62E1\u5927\u753B\u50CF\u3092\u898B\u308B",
    CacM8tispuPNrSxxpt9GX,
    ClZdL9hGweOokP7Mn_Ptq,
    DXEhXAQbkiCMU_l252jo_,
    Dnnio9m9RZA6bkTLytc99,
    EsiorRgoeHI8h7IHMLDA4,
    FAqj5ONm50QMfIt9Vq2p1,
    FT1uJs8XG__n5qBvuFsH4,
    G3b7rbyQEj3_rgzVsNJZY,
    GjMNbm97OgVvpIYlkOisE,
    HzMBcS2oNGVIoLiHWprim,
    "J2Ckb_-LITfmww4aEksqk": "\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u30EA\u30F3\u30AF\u3092\u51FA\u529B\u3059\u308B",
    "KkkM-iz8RCVQoTrTfhS5j": "\u30AA\u30EA\u30B8\u30CA\u30EB\u30B5\u30A4\u30BA",
    "LZbI8am7nD-LiemZzroFF": "\u9AD8\u3055\u304C\u540C\u3058\u3067\u5E45\u304C\u4E0D\u7B49",
    Lm_HFVHpv4XCjilV3NLKu,
    "M-wISnLiQgM_DURMwKZGT": "\u30DA\u30FC\u30B8\u306B\u5408\u308F\u305B\u308B",
    "MWVfUiW8egLWq7MgV-wzc": "\u304A\u6C17\u306B\u5165\u308A\u306B\u8FFD\u52A0\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F",
    "Mt3-hyoH7f_pW2gnfxyur": "\u65E5\u5225",
    OKs1ePekQA4Ona839U114,
    "OrwwNKZ7I70-ecpspE8d_": "\u30D5\u30EB\u30B9\u30AF\u30EA\u30FC\u30F3\u5207\u308A\u66FF\u3048",
    "PQhFo-g7sgagimkleVoZR": "\u6708\u5225",
    "PT74UDfKA45vTVTst_-hD": "\u3053\u306E\u30B9\u30AF\u30EA\u30D7\u30C8\u306B\u3064\u3044\u3066",
    RN4dt81l_fZMWODsskZob,
    RstKmO7YVQMpaDoucxUel,
    SIUUZ4wqJTOilEdcX3EOi,
    "StU1-52QJmNFKQ5soJCyG": "\u30E9\u30F3\u30C0\u30E0\u4F5C\u54C1",
    "VpuyxZtIoDF9-YyOm0tK_": "\u5143\u306E\u30D5\u30A1\u30A4\u30EB\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3059\u308B",
    "Xtk-NnMgSQZmheJ87nbRV": "\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9",
    XvOYJ5gHo37M1XztPl18z,
    Ym0HIEu9Q80qXB31LuC6c,
    Z4pa8GhgE63OGGvCqAld0,
    "ZtQHZx-pEjmu_o3dQD1fc": "\u30B5\u30FC\u30AF\u30EB",
    ZztrWbSaaaas3v0cHtSmh,
    _Efl8k8uYQj9iJmj3kwbd,
    _bQs7o9oQSo7ao1G0cp3d,
    _nQfaNuwbvPAIFKOY6_7u,
    aVqN9TBRCbNGsW3Y2D2Nm,
    ad8lEoWap_nT9U69WBKen,
    aonlPAu9kEkkwNvQg0DBk,
    cKn4cfAxzdgh_HD6OFibB,
    caFFJlrS1wa_F86uKPykd,
    ctWGhVvqB2k_1TX2iY0l2,
    dU7ou5kVM0s9DMju5e2tS,
    e2_EYvweJsVoIZlIWkPRV,
    "elkBQ9moOZ-KMcy5bt_Ts": "\u6700\u8FD1\u306E\u4EBA\u6C17",
    fC8XNfCl04zK7vgeaRZMQ,
    fVE5taO6GDTPbILat4GCt,
    gM92sLo0Cqfl2rCaXlOhc,
    hVmfDxXoj8vkgVQabEOSr,
    "iJ0h220tvMmUhkfIMYI-W": "\u5909\u66F4\u5C65\u6B74",
    "iRt9V9wNQASic3D7-wTZo": "\u5B9F\u9A13\u7684/\u4FDD\u8A3C\u3055\u308C\u3066\u3044\u307E\u305B\u3093",
    "jDjashxA-oBPo19DXI504": "\u5143\u306E\u753B\u50CF",
    "jMod2JozzAnwHuD-3KuPb": "\u4EE5\u4E0B\u306E\u30BF\u30B0\u3092\u5165\u529B\u3057\u3001Enter \u30AD\u30FC\u3092\u62BC\u3057\u3066\u8FFD\u52A0\u3057\u307E\u3059",
    jerGO2OCuW9TdnEnGYRWd,
    juT6gwLOg5r1h2vFpFf6P,
    k4YzDnBtd_S2UpAQucGxF,
    kFcteLMfnoezhOwuTlLFC,
    "kop_-39vkeg-bz2wztJ9O": "\u753B\u50CF\u30EA\u30B9\u30C8\u306E\u30EC\u30A4\u30A2\u30A6\u30C8",
    "l5W-EtJ_ar-SY2lF4H5Zm": "\u898B\u305B\u308B",
    l8CbIALt_VWUnzBl_Rmgf,
    "lPPsX2CZbXwC-EGN79Rki": "\u30BA\u30FC\u30E0\u30A2\u30A6\u30C8\u3059\u308B",
    "nd4UjZy2ILsc-iW9iu7xR": "\u65E5\u4ED8\u9806",
    pEU9Y9K7DsODkocCDwq_O,
    qSF4OLshg2EEX4CwtBE6r,
    qWcqQRsE9nN43MaZ2BmN9,
    rXjhc8VuGloy1wZ09noNB,
    "riciqzr6ILBnpPc7KtG-C": "\u9031\u5225",
    "t83UAY18UebTg1_-zFGP3": "\u9589\u3058\u308B",
    tGi6xYfvStBmR8qduEmKX,
    "tt_YdgKCA_5m-aSTSMPQ_": "\u30A6\u30A9\u30FC\u30BF\u30FC\u30D5\u30A9\u30FC\u30EB\u306E\u5217\u306E\u6570",
    u8mEnSo4mxDRUbj7FeAll,
    uxIs3XkeVzkrEX985zHk3,
    vfUg8xP6WptIhSL0E9b9D,
    w95XGurDhDfOfw7XH4JFW,
    wI4KHHIe3zNRziW4lDZrp,
    "xJJTEE3nZ4HVXGFfiN-LC": "\u679A",
    ze1PaiGdX4ufmoOLv_xw6,
    zs8YTCc8d8XFUgRnp7m_w,
    PBjdNKuj02doUvOf2zZqP,
    z_oL9s5fS164W4_gITOGZ,
    "0VAN4cJ-_mUxvtmg4KEi1": "OK",
    "9dq_DxgMG88eom9Gq-4nT": "\u30AD\u30E3\u30F3\u30BB\u30EB",
    LN_Rsic4V50DrXbsv9T9L,
    OJ8X55GXx5k3peoSXSujf,
    ti3akdSS3iZV9NsGzIo3m,
    ujBgilCWNgFNV8Q2IDMWS,
    sMkrF8bqCTJZZ1kXTkT_R,
    u0K7A_hv1RZSJl6TDR61A,
    "99kLMSzDYJCAf1yK9QYzy": "\u30B3\u30D4\u30FC\u3055\u308C\u307E\u3057\u305F",
    EVPG1YZDtykdz3htyf11u,
    fbIpwMw2yVoSxP66OJ32z,
    kCYFwKpwznYIKRmB1tCww,
    "si-zDDRFrEwDTCkp53Q44": "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306E\u8A31\u53EF\u3092\u8A31\u53EF\u3057\u3066\u304F\u3060\u3055\u3044",
    tEvQYzSVnggYAcM1uv9Tt,
    "eOxsWLzwqrlhBdVMwz-rH": "\u304A\u3059\u3059\u3081\u30B5\u30A4\u30C8",
    "4yzHPggVky2QKFD2TbBhl": "\u30B5\u30E0\u30CD\u30A4\u30EB\u306B\u306F\u5927\u304D\u306A\u753B\u50CF\u3092\u4F7F\u7528\u3059\u308B",
    HSx0XMZFid_lVuwjzrhH0,
    "EZd1QQdgUDjT3yya5ZYe-": "\u30BD\u30FC\u30B9\u30B5\u30A4\u30C8\u3092\u958B\u3044\u305F\u3068\u304D\u306B\u76F4\u63A5\u30A6\u30A9\u30FC\u30BF\u30FC\u30D5\u30A9\u30FC\u30EB\u30D6\u30E9\u30A6\u30B8\u30F3\u30B0\u30E2\u30FC\u30C9\u306B\u5165\u308B",
    lkCkz1OpNtTCFRfGCEoBp,
    e4_fgvntwNlfxgJUc2dXK,
    gPt6cpWrkvqRqZnwJo1KV,
    sxhTRqogDRozo9IaTGI7g,
    dvs63FvVKWm3uHVfqeq00,
    "w4uJjpTmSEkm6SIDgEo-0": "\u753B\u50CF\u306E\u8A73\u7D30\u306F\u3001\u30BA\u30FC\u30E0\u3084\u56DE\u8EE2\u306A\u3069\u306E\u64CD\u4F5C\u3092\u30B5\u30DD\u30FC\u30C8\u3059\u308B Fancybox \u30B3\u30F3\u30DD\u30FC\u30CD\u30F3\u30C8\u3092\u4F7F\u7528\u3057\u3066\u8868\u793A\u3067\u304D\u307E\u3059\u3002",
    Tbq8O5KhwcDHQ_qxNFW09,
    IxTawC_qs_xjxj5g8_aGx,
    "-x4wjDoHtodaXEgm2SXkg": "API \u3092\u547C\u3073\u51FA\u3059\u3068\u3001\u30C7\u30D5\u30A9\u30EB\u30C8\u3067 `holds:false` \u30BF\u30B0\u304C\u6E21\u3055\u308C\u307E\u3059\u3002",
    YAUNSVT_pTygaY306DZmU,
    HkRzE7fweBSefchs0z0r8,
    yYtssYrCL8VwFrdvvx8v3,
    UqbfVZzRyk0iD2NcOii_E,
    _4E2zv2NpOG4y8TV5PRL0,
    "FMi4atPbKn-B1HiAZ2ZP2": "\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u30BF\u30B0",
    Cu6n0Apv5xVlo4DnQbVbT,
    BB4C5taWpmw06X0Kz_Gtk,
    zg2GRF6zmMXCkT9Uz2Bni,
    xSC1vpAOTLQ3RBipKrNpD,
    cKXET1CCnAXq4H60qr8uc,
    QH_xm27zhgs5E1077asf1,
    Uw9QwD1SaR2VjZEqDYRdb,
    ECpLfRMsS0zpJPTw0qqNs,
    vJobIibroyz2wkpmONSnR,
    "HPukB-OKzIuRxMmO4Rx2U": "\u8A73\u7D30\u753B\u50CF\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u30A6\u30A3\u30F3\u30C9\u30A6\u3092\u9589\u3058\u307E\u3059",
    I_MKXUxaNXp3D35GFULn4,
    dm7zGAYbP2sbGXO_ekDDl
  };
  Vue__default["default"].use(VueI18n__default["default"]);
  const i18n = new VueI18n__default["default"]({
    locale: initialSettings.lang || "en",
    fallbackLocale: "en",
    messages: {
      "zh-Hans": zhHans,
      "zh-Hant": zhHant,
      en,
      ja
    }
  });
  const props = {
    tag: {
      type: [String],
      default: "div"
    },
    cols: {
      type: [Object, Number, String],
      default: 2
    },
    gap: {
      type: [Object, Number, String],
      default: 0
    },
    css: {
      type: [Boolean],
      default: true
    }
  };
  const setBreakpoints = (mixed, windowWidth) => {
    const valueAsNum = parseInt(mixed);
    const minVal = -1;
    const zero = 0;
    if (valueAsNum > -minVal) {
      return mixed;
    } else if (typeof mixed !== "object") {
      return zero;
    }
    let matchedBreakpoint = Infinity;
    let initValue = mixed.default || zero;
    for (const key in mixed) {
      const breakpoint = parseInt(key);
      const breakpointValRaw = mixed[breakpoint];
      const breakpointVal = parseInt(breakpointValRaw);
      if (isNaN(breakpoint) || isNaN(breakpointVal)) {
        continue;
      }
      const isNewBreakpoint = windowWidth <= breakpoint && breakpoint < matchedBreakpoint;
      if (isNewBreakpoint) {
        matchedBreakpoint = breakpoint;
        initValue = breakpointValRaw;
      }
    }
    return initValue;
  };
  const measurements = [
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "paddingBottom",
    "marginLeft",
    "marginRight",
    "marginTop",
    "marginBottom",
    "borderLeftWidth",
    "borderRightWidth",
    "borderTopWidth",
    "borderBottomWidth"
  ];
  const measurementsLength = measurements.length;
  const getStyle = (elem) => {
    const style = getComputedStyle(elem);
    if (!style) {
      console.error(`Style returned ${style}. Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1`);
    }
    return style;
  };
  const getStyleSize = (value) => {
    const num = parseFloat(value);
    const isValid2 = !value.includes("%") && !isNaN(num);
    return isValid2 && num;
  };
  const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const TrueMasonry = Vue2.defineComponent({
    props,
    data() {
      return {
        windowWidth: getWindowWidth(),
        displayColumns: 2,
        displayGutter: 0,
        style: {}
      };
    },
    mounted() {
      this.$nextTick(() => {
        this._reCalculate("force");
      });
      window.addEventListener("resize", this._reCalculate);
    },
    activated() {
      this.$nextTick(() => {
        this._reCalculate("force");
      });
    },
    updated() {
      this.$nextTick(() => {
        this._reCalculate("force");
      });
    },
    beforeDestroy() {
      window.removeEventListener("resize", this._reCalculate);
    },
    methods: {
      getChildItemsInColumnsArray() {
        const childItems = this.$slots.default || [];
        return childItems.filter((cell) => cell.tag);
      },
      _getSize(elemm) {
        const style = getStyle(elemm);
        const size = {};
        size.height = elemm.offsetHeight;
        const isBorderBox = size.isBorderBox = style.boxSizing == "border-box";
        for (let i = 0; i < measurementsLength; i++) {
          const measurement = measurements[i];
          const value = style[measurement];
          const num = parseFloat(value);
          size[measurement] = !isNaN(num) ? num : 0;
        }
        const paddingHeight = size.paddingTop + size.paddingBottom;
        const marginHeight = size.marginTop + size.marginBottom;
        const borderHeight = size.borderTopWidth + size.borderBottomWidth;
        const isBorderBoxSizeOuter = isBorderBox;
        const styleHeight = getStyleSize(style.height);
        const zero = 0;
        if (styleHeight !== false) {
          size.height = styleHeight + (isBorderBoxSizeOuter ? zero : paddingHeight + borderHeight);
        }
        size.innerHeight = size.height - (paddingHeight + borderHeight);
        size.outerHeight = size.height + marginHeight;
        return size;
      },
      _resizeMasonryItem(item) {
        const rowGap = this.displayGutter;
        const rowHeight = 0;
        const size = Math.round(this._getSize(item.elm).outerHeight);
        const rowSpan = Math.ceil((size + rowGap) / (rowHeight + rowGap));
        item.elm.style.gridRowEnd = `span ${rowSpan}`;
      },
      _resizeAllMasonryItems() {
        const allItems = this.getChildItemsInColumnsArray();
        for (let i = 0; i < allItems.length; i++) {
          this._resizeMasonryItem(allItems[i]);
        }
      },
      _reCalculate(force) {
        if (force == "force") {
          this._buildGrid();
          return;
        }
        const previousWindowWidth = this.windowWidth;
        this.windowWidth = getWindowWidth() || Infinity;
        if (previousWindowWidth !== this.windowWidth) {
          this._buildGrid();
        }
      },
      _buildGrid() {
        this._reCalculateColumnCount(this.windowWidth);
        this._reCalculateGutterSize(this.windowWidth);
        this._resizeAllMasonryItems();
      },
      _reCalculateColumnCount(windowWidth) {
        const zero = 0;
        const one = 1;
        let newCols = setBreakpoints(this.cols, windowWidth);
        newCols = Math.max(one, Number(newCols) || zero);
        this.displayColumns = newCols;
      },
      _reCalculateGutterSize(windowWidth) {
        this.displayGutter = setBreakpoints(this.gap, windowWidth);
      }
    },
    render(h) {
      const one = 1;
      const ten = 10;
      const hundred = 100;
      const isGutterSizeUnitless = parseInt(this.displayGutter) === this.displayGutter * one;
      const gutterSizeWithUnit = isGutterSizeUnitless ? `${this.displayGutter}px` : this.displayGutter;
      let columnWidth = (hundred / this.displayColumns * ten - this.displayGutter) / ten;
      if (columnWidth > 48)
        columnWidth -= 1;
      const containerStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${columnWidth}%, 1fr))`,
        gridAutoRows: 0,
        gridGap: gutterSizeWithUnit
      };
      return h(
        this.tag,
        this.css ? { style: containerStyle } : void 0,
        this.$slots.default
      );
    }
  });
  const settings = Vue__default["default"].observable(initialSettings);
  const ykFlag = ["konachan", "yande.re"].some((e) => location.href.includes(e));
  const poolFlag = location.pathname == "/pool";
  const store = Vue__default["default"].observable({
    requestLoading: false,
    requestStop: false,
    showImageSelected: false,
    imageSelectedIndex: 0,
    showDrawer: false,
    showSettings: false,
    showFab: false,
    currentPage: 1,
    imageList: [],
    selectedImageList: [],
    isYKSite: ykFlag,
    showPostList: !poolFlag,
    showPoolList: ykFlag && poolFlag,
    isFullscreen: false
  });
  function toggleDrawer() {
    store.showDrawer = !store.showDrawer;
  }
  function addToSelectedList(item) {
    if (store.selectedImageList.some((e) => e.id === item.id))
      return;
    Object.assign(item, { fileNameWithTags: `${location.hostname} ${item.id} ${item.tags.join(" ")}` });
    store.selectedImageList.push(item);
  }
  function removeFromSelectedList(id) {
    store.selectedImageList = store.selectedImageList.filter((e) => {
      if (e.loading)
        return true;
      return e.id !== id;
    });
  }
  function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render) {
      options.render = render;
      options.staticRenderFns = staticRenderFns;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        );
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const _sfc_main$c = {
    components: {
      TrueMasonry
    },
    computed: {
      wfType() {
        return settings.masonryLayout || "masonry";
      },
      isMasonry() {
        return ["masonry", "grid"].includes(this.wfType);
      },
      wfClass() {
        return {
          "wf-grid": this.wfType == "grid",
          "wf-no-fit-screen": !settings.isFitScreen
        };
      },
      columnCount2() {
        if (typeof this.columnCount == "number")
          return { default: this.columnCount };
        return this.columnCount;
      },
      columnCount() {
        return settings.selectedColumn === "0" ? settings.isFitScreen ? {
          300: 1,
          600: 2,
          900: 3,
          1200: 4,
          1600: 6,
          1920: 7,
          2400: 8,
          2700: 9,
          3e3: 10,
          default: 6
        } : {
          300: 1,
          1050: 2,
          1500: 3,
          1920: 4,
          default: 4
        } : +settings.selectedColumn;
      }
    }
  };
  var _sfc_render$c = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("div", { staticClass: "wf-layout", class: _vm.wfClass }, [_vm.wfType === "masonry2" ? _c("TrueMasonry", { staticClass: "true-masonry", attrs: { "gap": { default: 8 }, "cols": _vm.columnCount2 } }, [_vm._t("default")], 2) : _vm.isMasonry ? _c("masonry", { attrs: { "cols": _vm.columnCount, "gutter": "8px" } }, [_vm._t("default")], 2) : _c("div", { staticClass: "justified-container" }, [_vm._t("default")], 2)], 1);
  };
  var _sfc_staticRenderFns$c = [];
  var __component__$c = /* @__PURE__ */ normalizeComponent(
    _sfc_main$c,
    _sfc_render$c,
    _sfc_staticRenderFns$c,
    false,
    null,
    null,
    null,
    null
  );
  var WfLayout = __component__$c.exports;
  Vue__default["default"].util.warn;
  function tryOnScopeDispose(fn) {
    if (Vue2.getCurrentScope()) {
      Vue2.onScopeDispose(fn);
      return true;
    }
    return false;
  }
  function toValue(r) {
    return typeof r === "function" ? r() : Vue2.unref(r);
  }
  const isClient = typeof window !== "undefined" && typeof document !== "undefined";
  typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
  const notNullish = (val) => val != null;
  const toString = Object.prototype.toString;
  const isObject = (val) => toString.call(val) === "[object Object]";
  const noop = () => {
  };
  function getLifeCycleTarget(target) {
    return target || Vue2.getCurrentInstance();
  }
  function tryOnMounted(fn, sync = true, target) {
    const instance = getLifeCycleTarget();
    if (instance)
      Vue2.onMounted(fn, target);
    else if (sync)
      fn();
    else
      Vue2.nextTick(fn);
  }
  function unrefElement(elRef) {
    var _a2;
    const plain = toValue(elRef);
    return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
  }
  const defaultWindow = isClient ? window : void 0;
  isClient ? window.document : void 0;
  isClient ? window.navigator : void 0;
  isClient ? window.location : void 0;
  function useEventListener(...args) {
    let target;
    let events;
    let listeners;
    let options;
    if (typeof args[0] === "string" || Array.isArray(args[0])) {
      [events, listeners, options] = args;
      target = defaultWindow;
    } else {
      [target, events, listeners, options] = args;
    }
    if (!target)
      return noop;
    if (!Array.isArray(events))
      events = [events];
    if (!Array.isArray(listeners))
      listeners = [listeners];
    const cleanups = [];
    const cleanup = () => {
      cleanups.forEach((fn) => fn());
      cleanups.length = 0;
    };
    const register = (el, event, listener, options2) => {
      el.addEventListener(event, listener, options2);
      return () => el.removeEventListener(event, listener, options2);
    };
    const stopWatch = Vue2.watch(
      () => [unrefElement(target), toValue(options)],
      ([el, options2]) => {
        cleanup();
        if (!el)
          return;
        const optionsClone = isObject(options2) ? { ...options2 } : options2;
        cleanups.push(
          ...events.flatMap((event) => {
            return listeners.map((listener) => register(el, event, listener, optionsClone));
          })
        );
      },
      { immediate: true, flush: "post" }
    );
    const stop = () => {
      stopWatch();
      cleanup();
    };
    tryOnScopeDispose(stop);
    return stop;
  }
  function useMounted() {
    const isMounted = Vue2.ref(false);
    const instance = Vue2.getCurrentInstance();
    if (instance) {
      Vue2.onMounted(() => {
        isMounted.value = true;
      }, void 0);
    }
    return isMounted;
  }
  function useSupported(callback) {
    const isMounted = useMounted();
    return Vue2.computed(() => {
      isMounted.value;
      return Boolean(callback());
    });
  }
  function useMutationObserver(target, callback, options = {}) {
    const { window: window2 = defaultWindow, ...mutationOptions } = options;
    let observer;
    const isSupported = useSupported(() => window2 && "MutationObserver" in window2);
    const cleanup = () => {
      if (observer) {
        observer.disconnect();
        observer = void 0;
      }
    };
    const targets = Vue2.computed(() => {
      const value = toValue(target);
      const items = (Array.isArray(value) ? value : [value]).map(unrefElement).filter(notNullish);
      return new Set(items);
    });
    const stopWatch = Vue2.watch(
      () => targets.value,
      (targets2) => {
        cleanup();
        if (isSupported.value && targets2.size) {
          observer = new MutationObserver(callback);
          targets2.forEach((el) => observer.observe(el, mutationOptions));
        }
      },
      { immediate: true, flush: "post" }
    );
    const takeRecords = () => {
      return observer == null ? void 0 : observer.takeRecords();
    };
    const stop = () => {
      stopWatch();
      cleanup();
    };
    tryOnScopeDispose(stop);
    return {
      isSupported,
      stop,
      takeRecords
    };
  }
  function useMediaQuery(query2, options = {}) {
    const { window: window2 = defaultWindow } = options;
    const isSupported = useSupported(() => window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
    let mediaQuery;
    const matches = Vue2.ref(false);
    const handler = (event) => {
      matches.value = event.matches;
    };
    const cleanup = () => {
      if (!mediaQuery)
        return;
      if ("removeEventListener" in mediaQuery)
        mediaQuery.removeEventListener("change", handler);
      else
        mediaQuery.removeListener(handler);
    };
    const stopWatch = Vue2.watchEffect(() => {
      if (!isSupported.value)
        return;
      cleanup();
      mediaQuery = window2.matchMedia(toValue(query2));
      if ("addEventListener" in mediaQuery)
        mediaQuery.addEventListener("change", handler);
      else
        mediaQuery.addListener(handler);
      matches.value = mediaQuery.matches;
    });
    tryOnScopeDispose(() => {
      stopWatch();
      cleanup();
      mediaQuery = void 0;
    });
    return matches;
  }
  function useResizeObserver(target, callback, options = {}) {
    const { window: window2 = defaultWindow, ...observerOptions } = options;
    let observer;
    const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
    const cleanup = () => {
      if (observer) {
        observer.disconnect();
        observer = void 0;
      }
    };
    const targets = Vue2.computed(() => {
      const _targets = toValue(target);
      return Array.isArray(_targets) ? _targets.map((el) => unrefElement(el)) : [unrefElement(_targets)];
    });
    const stopWatch = Vue2.watch(
      targets,
      (els) => {
        cleanup();
        if (isSupported.value && window2) {
          observer = new ResizeObserver(callback);
          for (const _el of els) {
            if (_el)
              observer.observe(_el, observerOptions);
          }
        }
      },
      { immediate: true, flush: "post" }
    );
    const stop = () => {
      cleanup();
      stopWatch();
    };
    tryOnScopeDispose(stop);
    return {
      isSupported,
      stop
    };
  }
  function useElementBounding(target, options = {}) {
    const {
      reset = true,
      windowResize = true,
      windowScroll = true,
      immediate = true,
      updateTiming = "sync"
    } = options;
    const height = Vue2.ref(0);
    const bottom = Vue2.ref(0);
    const left = Vue2.ref(0);
    const right = Vue2.ref(0);
    const top = Vue2.ref(0);
    const width = Vue2.ref(0);
    const x = Vue2.ref(0);
    const y = Vue2.ref(0);
    function recalculate() {
      const el = unrefElement(target);
      if (!el) {
        if (reset) {
          height.value = 0;
          bottom.value = 0;
          left.value = 0;
          right.value = 0;
          top.value = 0;
          width.value = 0;
          x.value = 0;
          y.value = 0;
        }
        return;
      }
      const rect = el.getBoundingClientRect();
      height.value = rect.height;
      bottom.value = rect.bottom;
      left.value = rect.left;
      right.value = rect.right;
      top.value = rect.top;
      width.value = rect.width;
      x.value = rect.x;
      y.value = rect.y;
    }
    function update() {
      if (updateTiming === "sync")
        recalculate();
      else if (updateTiming === "next-frame")
        requestAnimationFrame(() => recalculate());
    }
    useResizeObserver(target, update);
    Vue2.watch(() => unrefElement(target), (ele) => !ele && update());
    useMutationObserver(target, update, {
      attributeFilter: ["style", "class"]
    });
    if (windowScroll)
      useEventListener("scroll", update, { capture: true, passive: true });
    if (windowResize)
      useEventListener("resize", update, { passive: true });
    tryOnMounted(() => {
      if (immediate)
        update();
    });
    return {
      height,
      bottom,
      left,
      right,
      top,
      width,
      x,
      y,
      update
    };
  }
  function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
    const { window: window2 = defaultWindow, box = "content-box" } = options;
    const isSVG = Vue2.computed(() => {
      var _a2, _b;
      return (_b = (_a2 = unrefElement(target)) == null ? void 0 : _a2.namespaceURI) == null ? void 0 : _b.includes("svg");
    });
    const width = Vue2.ref(initialSize.width);
    const height = Vue2.ref(initialSize.height);
    const { stop: stop1 } = useResizeObserver(
      target,
      ([entry]) => {
        const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
        if (window2 && isSVG.value) {
          const $elem = unrefElement(target);
          if ($elem) {
            const rect = $elem.getBoundingClientRect();
            width.value = rect.width;
            height.value = rect.height;
          }
        } else {
          if (boxSize) {
            const formatBoxSize = Array.isArray(boxSize) ? boxSize : [boxSize];
            width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
            height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
          } else {
            width.value = entry.contentRect.width;
            height.value = entry.contentRect.height;
          }
        }
      },
      options
    );
    tryOnMounted(() => {
      const ele = unrefElement(target);
      if (ele) {
        width.value = "offsetWidth" in ele ? ele.offsetWidth : initialSize.width;
        height.value = "offsetHeight" in ele ? ele.offsetHeight : initialSize.height;
      }
    });
    const stop2 = Vue2.watch(
      () => unrefElement(target),
      (ele) => {
        width.value = ele ? initialSize.width : 0;
        height.value = ele ? initialSize.height : 0;
      }
    );
    function stop() {
      stop1();
      stop2();
    }
    return {
      width,
      height,
      stop
    };
  }
  function useWindowSize(options = {}) {
    const {
      window: window2 = defaultWindow,
      initialWidth = Number.POSITIVE_INFINITY,
      initialHeight = Number.POSITIVE_INFINITY,
      listenOrientation = true,
      includeScrollbar = true,
      type = "inner"
    } = options;
    const width = Vue2.ref(initialWidth);
    const height = Vue2.ref(initialHeight);
    const update = () => {
      if (window2) {
        if (type === "outer") {
          width.value = window2.outerWidth;
          height.value = window2.outerHeight;
        } else if (includeScrollbar) {
          width.value = window2.innerWidth;
          height.value = window2.innerHeight;
        } else {
          width.value = window2.document.documentElement.clientWidth;
          height.value = window2.document.documentElement.clientHeight;
        }
      }
    };
    update();
    tryOnMounted(update);
    useEventListener("resize", update, { passive: true });
    if (listenOrientation) {
      const matches = useMediaQuery("(orientation: portrait)");
      Vue2.watch(matches, () => update());
    }
    return { width, height };
  }
  var _sfc_main$b = /* @__PURE__ */ Vue2.defineComponent({
    __name: "VirtualWaterfall",
    props: {
      virtual: { type: Boolean, default: true },
      rowKey: { default: "id" },
      gap: { default: 15 },
      preloadScreenCount: { default: () => [0, 0] },
      itemMinWidth: { default: 220 },
      maxColumnCount: { default: 10 },
      minColumnCount: { default: 2 },
      items: { default: () => [] },
      calcItemHeight: { type: Function, default: () => 250 }
    },
    setup(__props, { expose }) {
      const props2 = __props;
      const content = Vue2.ref();
      const { width: contentWidth } = useElementSize(content);
      const { top: contentTop } = useElementBounding(content);
      Vue2.onMounted(() => {
        if (contentWidth.value === 0 && content.value) {
          contentWidth.value = Number.parseInt(window.getComputedStyle(content.value).width);
        }
      });
      const columnCount = Vue2.computed(() => {
        if (!contentWidth.value) {
          return 0;
        }
        const cWidth = contentWidth.value;
        if (cWidth >= props2.itemMinWidth * 2) {
          const count = Math.floor(cWidth / props2.itemMinWidth);
          if (props2.maxColumnCount && count > props2.maxColumnCount) {
            return props2.maxColumnCount;
          }
          return count;
        }
        return props2.minColumnCount;
      });
      const columnsTop = Vue2.ref(new Array(columnCount.value).fill(0));
      const itemWidth = Vue2.computed(() => {
        if (!contentWidth.value || columnCount.value <= 0) {
          return 0;
        }
        const gap = (columnCount.value - 1) * props2.gap;
        return Math.ceil((contentWidth.value - gap) / columnCount.value);
      });
      const itemSpaces = Vue2.shallowRef([]);
      const withItemSpaces = (cb) => {
        cb(Vue2.readonly(itemSpaces).value);
      };
      expose({
        withItemSpaces
      });
      const getColumnIndex = () => {
        return columnsTop.value.indexOf(Math.min(...columnsTop.value));
      };
      Vue2.watchEffect(() => {
        const length = props2.items.length;
        if (!columnCount.value || !length) {
          itemSpaces.value = [];
          return;
        }
        const spaces = new Array(length);
        let start = 0;
        const cache = itemSpaces.value.length && length > itemSpaces.value.length;
        if (cache) {
          start = itemSpaces.value.length;
        } else {
          columnsTop.value = new Array(columnCount.value).fill(0);
        }
        for (let i = 0; i < length; i++) {
          if (cache && i < start) {
            spaces[i] = itemSpaces.value[i];
            continue;
          }
          const columnIndex = getColumnIndex();
          const h = props2.calcItemHeight(props2.items[i], itemWidth.value);
          const top = columnsTop.value[columnIndex];
          const left = (itemWidth.value + props2.gap) * columnIndex;
          const space = {
            index: i,
            item: props2.items[i],
            column: columnIndex,
            top,
            left,
            bottom: top + h,
            height: h
          };
          columnsTop.value[columnIndex] += h + props2.gap;
          spaces[i] = space;
        }
        itemSpaces.value = spaces;
      });
      const itemRenderList = Vue2.computed(() => {
        const length = itemSpaces.value.length;
        if (!length) {
          return [];
        }
        if (!props2.virtual) {
          return itemSpaces.value;
        }
        const parentTop = content.value.parentElement.offsetTop;
        const tp = -contentTop.value + parentTop;
        const [topPreloadScreenCount, bottomPreloadScreenCount] = props2.preloadScreenCount;
        const innerHeight = content.value.parentElement.clientHeight;
        const minLimit = tp - topPreloadScreenCount * innerHeight;
        const maxLimit = tp + (bottomPreloadScreenCount + 1) * innerHeight;
        const items = [];
        for (let i = 0; i < length; i++) {
          const v = itemSpaces.value[i];
          const t = v.top;
          const b = v.bottom;
          if (t >= minLimit && t <= maxLimit || b >= minLimit && b <= maxLimit || t < minLimit && b > maxLimit) {
            items.push(v);
          }
        }
        return items;
      });
      return { __sfc: true, props: props2, content, contentWidth, contentTop, columnCount, columnsTop, itemWidth, itemSpaces, withItemSpaces, getColumnIndex, itemRenderList };
    }
  });
  var _sfc_render$b = function render() {
    var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c("div", { ref: "content", style: {
      position: "relative",
      willChange: "height",
      height: `${Math.max(..._setup.columnsTop)}px`
    } }, _vm._l(_setup.itemRenderList, function(data) {
      return _c("div", { key: data.item[_vm.rowKey] || data.index, style: {
        position: "absolute",
        contentVisibility: "auto",
        width: `${_setup.itemWidth}px`,
        height: `${data.height}px`,
        transform: `translate(${data.left}px, ${data.top}px)`,
        containIntrinsicSize: `${_setup.itemWidth}px ${data.height}px`
      }, attrs: { "data-index": data.index } }, [_vm._t("default", null, { "item": data.item, "index": data.index })], 2);
    }), 0);
  };
  var _sfc_staticRenderFns$b = [];
  var __component__$b = /* @__PURE__ */ normalizeComponent(
    _sfc_main$b,
    _sfc_render$b,
    _sfc_staticRenderFns$b,
    false,
    null,
    null,
    null,
    null
  );
  var VirtualWaterfall = __component__$b.exports;
  var mdiAccount = "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z";
  var mdiBrightness6 = "M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z";
  var mdiCalendar = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z";
  var mdiCalendarBlank = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1";
  var mdiCalendarEdit = "M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H10V19H5V8H19V9H21V5A2,2 0 0,0 19,3M21.7,13.35L20.7,14.35L18.65,12.35L19.65,11.35C19.85,11.14 20.19,11.13 20.42,11.35L21.7,12.63C21.89,12.83 21.89,13.15 21.7,13.35M12,18.94L18.07,12.88L20.12,14.88L14.06,21H12V18.94Z";
  var mdiCalendarMonth = "M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z";
  var mdiCalendarSearch = "M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M19,8H5V19H9.5C9.81,19.75 10.26,20.42 10.81,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V13.03C20.5,12.22 19.8,11.54 19,11V8Z";
  var mdiCalendarText = "M14,14H7V16H14M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M17,10H7V12H17V10Z";
  var mdiCalendarToday = "M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z";
  var mdiCalendarWeek = "M6 1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.89 3.89 3 5 3H6V1M5 8V19H19V8H5M7 10H17V12H7V10Z";
  var mdiCheckCircle = "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";
  var mdiCheckUnderlineCircle = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M17,18H7V16H17V18M10.3,14L7,10.7L8.4,9.3L10.3,11.2L15.6,5.9L17,7.3L10.3,14Z";
  var mdiCheckboxBlankOutline = "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z";
  var mdiCheckboxIntermediate = "M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,17H7V7H17V17Z";
  var mdiCheckboxMarked = "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z";
  var mdiChevronDown = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
  var mdiChevronLeft = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";
  var mdiChevronRight = "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
  var mdiClose = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
  var mdiCloseCircle = "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z";
  var mdiCog = "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
  var mdiContentCopy = "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z";
  var mdiContentPaste = "M19,20H5V4H7V7H17V4H19M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M19,2H14.82C14.4,0.84 13.3,0 12,0C10.7,0 9.6,0.84 9.18,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2Z";
  var mdiDelete = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
  var mdiDownload = "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z";
  var mdiFileClockOutline = "M4 2A2 2 0 0 0 2 4V20A2 2 0 0 0 4 22H12.41A7 7 0 0 0 16 23A7 7 0 0 0 23 16A7 7 0 0 0 18 9.3V8L12 2H4M4 4H11V9H16A7 7 0 0 0 9 16A7 7 0 0 0 10.26 20H4V4M16 11A5 5 0 0 1 21 16A5 5 0 0 1 16 21A5 5 0 0 1 11 16A5 5 0 0 1 16 11M15 12V17L18.61 19.16L19.36 17.94L16.5 16.25V12H15Z";
  var mdiFileGifBox = "M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M10 10.5H7.5V13.5H8.5V12H10V13.7C10 14.4 9.5 15 8.7 15H7.3C6.5 15 6 14.3 6 13.7V10.4C6 9.7 6.5 9 7.3 9H8.6C9.5 9 10 9.7 10 10.3V10.5M13 15H11.5V9H13V15M17.5 10.5H16V11.5H17.5V13H16V15H14.5V9H17.5V10.5Z";
  var mdiFileTree = "M3,3H9V7H3V3M15,10H21V14H15V10M15,17H21V21H15V17M13,13H7V18H13V20H7L5,20V9H7V11H13V13Z";
  var mdiFire = "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z";
  var mdiFitToScreenOutline = "M17 4H20C21.1 4 22 4.9 22 6V8H20V6H17V4M4 8V6H7V4H4C2.9 4 2 4.9 2 6V8H4M20 16V18H17V20H20C21.1 20 22 19.1 22 18V16H20M7 18H4V16H2V18C2 19.1 2.9 20 4 20H7V18M16 10V14H8V10H16M18 8H6V16H18V8Z";
  var mdiFolderNetwork = "M3,15V5A2,2 0 0,1 5,3H11L13,5H19A2,2 0 0,1 21,7V15A2,2 0 0,1 19,17H13V19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H5A2,2 0 0,1 3,15Z";
  var mdiFullscreen = "M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z";
  var mdiFullscreenExit = "M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z";
  var mdiGithub = "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z";
  var mdiHeart = "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z";
  var mdiHeartPlusOutline = "M12.67 20.74L12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 9.93 21.5 11.26 20.62 12.61C20 12.31 19.31 12.11 18.59 12.04C19.5 10.8 20 9.65 20 8.5C20 6.5 18.5 5 16.5 5C14.96 5 13.46 6 12.93 7.36H11.07C10.54 6 9.04 5 7.5 5C5.5 5 4 6.5 4 8.5C4 11.39 7.14 14.24 11.89 18.55L12 18.65L12.04 18.61C12.12 19.37 12.34 20.09 12.67 20.74M17 14V17H14V19H17V22H19V19H22V17H19V14H17Z";
  var mdiHome = "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z";
  var mdiImageMultiple = "M22,16V4A2,2 0 0,0 20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16M11,12L13.03,14.71L16,11L20,16H8M2,6V20A2,2 0 0,0 4,22H18V20H4V6";
  var mdiInformationOutline = "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";
  var mdiLaunch = "M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z";
  var mdiLinkVariant = "M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z";
  var mdiLocationExit = "M22 12L18 8V11H10V13H18V16M20 18A10 10 0 1 1 20 6H17.27A8 8 0 1 0 17.27 18Z";
  var mdiLoupe = "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22H20A2,2 0 0,0 22,20V12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z";
  var mdiMagnify = "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";
  var mdiMagnifyMinusOutline = "M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M7,9H12V10H7V9Z";
  var mdiMagnifyPlusOutline = "M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z";
  var mdiMessageAlertOutline = "M13,10H11V6H13V10M13,12H11V14H13V12M22,4V16A2,2 0 0,1 20,18H6L2,22V4A2,2 0 0,1 4,2H20A2,2 0 0,1 22,4M20,4H4V17.2L5.2,16H20V4Z";
  var mdiPlaylistPlus = "M3 16H10V14H3M18 14V10H16V14H12V16H16V20H18V16H22V14M14 6H3V8H14M14 10H3V12H14V10Z";
  var mdiRefresh = "M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z";
  var mdiRotateRight = "M16.89,15.5L18.31,16.89C19.21,15.73 19.76,14.39 19.93,13H17.91C17.77,13.87 17.43,14.72 16.89,15.5M13,17.9V19.92C14.39,19.75 15.74,19.21 16.9,18.31L15.46,16.87C14.71,17.41 13.87,17.76 13,17.9M19.93,11C19.76,9.61 19.21,8.27 18.31,7.11L16.89,8.53C17.43,9.28 17.77,10.13 17.91,11M15.55,5.55L11,1V4.07C7.06,4.56 4,7.92 4,12C4,16.08 7.05,19.44 11,19.93V17.91C8.16,17.43 6,14.97 6,12C6,9.03 8.16,6.57 11,6.09V10L15.55,5.55Z";
  var mdiShuffle = "M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17Z";
  var mdiStar = "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z";
  var mdiTableSplitCell = "M19 14H21V20H3V14H5V18H19V14M3 4V10H5V6H19V10H21V4H3M11 11V13H8V15L5 12L8 9V11H11M16 11V9L19 12L16 15V13H13V11H16Z";
  var mdiTagMultiple = "M5.5,9A1.5,1.5 0 0,0 7,7.5A1.5,1.5 0 0,0 5.5,6A1.5,1.5 0 0,0 4,7.5A1.5,1.5 0 0,0 5.5,9M17.41,11.58C17.77,11.94 18,12.44 18,13C18,13.55 17.78,14.05 17.41,14.41L12.41,19.41C12.05,19.77 11.55,20 11,20C10.45,20 9.95,19.78 9.58,19.41L2.59,12.42C2.22,12.05 2,11.55 2,11V6C2,4.89 2.89,4 4,4H9C9.55,4 10.05,4.22 10.41,4.58L17.41,11.58M13.54,5.71L14.54,4.71L21.41,11.58C21.78,11.94 22,12.45 22,13C22,13.55 21.78,14.05 21.42,14.41L16.04,19.79L15.04,18.79L20.75,13L13.54,5.71Z";
  var mdiTranslate = "M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z";
  var mdiVideo = "M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z";
  var mdiWeb = "M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
  function toDate(argument) {
    const argStr = Object.prototype.toString.call(argument);
    if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
      return new argument.constructor(+argument);
    } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
      return new Date(argument);
    } else {
      return new Date(NaN);
    }
  }
  function constructFrom(date, value) {
    if (date instanceof Date) {
      return new date.constructor(value);
    } else {
      return new Date(value);
    }
  }
  function addDays(date, amount) {
    const _date = toDate(date);
    if (isNaN(amount))
      return constructFrom(date, NaN);
    if (!amount) {
      return _date;
    }
    _date.setDate(_date.getDate() + amount);
    return _date;
  }
  function addMonths(date, amount) {
    const _date = toDate(date);
    if (isNaN(amount))
      return constructFrom(date, NaN);
    if (!amount) {
      return _date;
    }
    const dayOfMonth = _date.getDate();
    const endOfDesiredMonth = constructFrom(date, _date.getTime());
    endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
    const daysInMonth = endOfDesiredMonth.getDate();
    if (dayOfMonth >= daysInMonth) {
      return endOfDesiredMonth;
    } else {
      _date.setFullYear(
        endOfDesiredMonth.getFullYear(),
        endOfDesiredMonth.getMonth(),
        dayOfMonth
      );
      return _date;
    }
  }
  function add(date, duration) {
    const {
      years = 0,
      months = 0,
      weeks = 0,
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0
    } = duration;
    const _date = toDate(date);
    const dateWithMonths = months || years ? addMonths(_date, months + years * 12) : _date;
    const dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
    const minutesToAdd = minutes + hours * 60;
    const secondsToAdd = seconds + minutesToAdd * 60;
    const msToAdd = secondsToAdd * 1e3;
    const finalDate = constructFrom(date, dateWithDays.getTime() + msToAdd);
    return finalDate;
  }
  const millisecondsInWeek = 6048e5;
  const millisecondsInMinute = 6e4;
  const millisecondsInHour = 36e5;
  const millisecondsInSecond = 1e3;
  const minutesInMonth = 43200;
  const minutesInDay = 1440;
  let defaultOptions$1 = {};
  function getDefaultOptions$1() {
    return defaultOptions$1;
  }
  function startOfWeek(date, options) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    const defaultOptions2 = getDefaultOptions$1();
    const weekStartsOn = (_h = (_g = (_d = (_c = options == null ? void 0 : options.weekStartsOn) != null ? _c : (_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) != null ? _d : defaultOptions2.weekStartsOn) != null ? _g : (_f = (_e = defaultOptions2.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) != null ? _h : 0;
    const _date = toDate(date);
    const day = _date.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    _date.setDate(_date.getDate() - diff);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  function startOfISOWeek(date) {
    return startOfWeek(date, { weekStartsOn: 1 });
  }
  function getISOWeekYear(date) {
    const _date = toDate(date);
    const year = _date.getFullYear();
    const fourthOfJanuaryOfNextYear = constructFrom(date, 0);
    fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
    const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
    const fourthOfJanuaryOfThisYear = constructFrom(date, 0);
    fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
    const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
    if (_date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (_date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  function getTimezoneOffsetInMilliseconds(date) {
    const _date = toDate(date);
    const utcDate = new Date(
      Date.UTC(
        _date.getFullYear(),
        _date.getMonth(),
        _date.getDate(),
        _date.getHours(),
        _date.getMinutes(),
        _date.getSeconds(),
        _date.getMilliseconds()
      )
    );
    utcDate.setUTCFullYear(_date.getFullYear());
    return +date - +utcDate;
  }
  function startOfISOWeekYear(date) {
    const year = getISOWeekYear(date);
    const fourthOfJanuary = constructFrom(date, 0);
    fourthOfJanuary.setFullYear(year, 0, 4);
    fourthOfJanuary.setHours(0, 0, 0, 0);
    return startOfISOWeek(fourthOfJanuary);
  }
  function compareAsc(dateLeft, dateRight) {
    const _dateLeft = toDate(dateLeft);
    const _dateRight = toDate(dateRight);
    const diff = _dateLeft.getTime() - _dateRight.getTime();
    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
    } else {
      return diff;
    }
  }
  function constructNow(date) {
    return constructFrom(date, Date.now());
  }
  function isDate(value) {
    return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
  }
  function isValid(date) {
    if (!isDate(date) && typeof date !== "number") {
      return false;
    }
    const _date = toDate(date);
    return !isNaN(Number(_date));
  }
  function differenceInCalendarMonths(dateLeft, dateRight) {
    const _dateLeft = toDate(dateLeft);
    const _dateRight = toDate(dateRight);
    const yearDiff = _dateLeft.getFullYear() - _dateRight.getFullYear();
    const monthDiff = _dateLeft.getMonth() - _dateRight.getMonth();
    return yearDiff * 12 + monthDiff;
  }
  function getRoundingMethod(method) {
    return (number) => {
      const round = method ? Math[method] : Math.trunc;
      const result = round(number);
      return result === 0 ? 0 : result;
    };
  }
  function differenceInMilliseconds(dateLeft, dateRight) {
    return +toDate(dateLeft) - +toDate(dateRight);
  }
  function endOfDay(date) {
    const _date = toDate(date);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  function endOfMonth(date) {
    const _date = toDate(date);
    const month = _date.getMonth();
    _date.setFullYear(_date.getFullYear(), month + 1, 0);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }
  function isLastDayOfMonth(date) {
    const _date = toDate(date);
    return +endOfDay(_date) === +endOfMonth(_date);
  }
  function differenceInMonths(dateLeft, dateRight) {
    const _dateLeft = toDate(dateLeft);
    const _dateRight = toDate(dateRight);
    const sign = compareAsc(_dateLeft, _dateRight);
    const difference = Math.abs(
      differenceInCalendarMonths(_dateLeft, _dateRight)
    );
    let result;
    if (difference < 1) {
      result = 0;
    } else {
      if (_dateLeft.getMonth() === 1 && _dateLeft.getDate() > 27) {
        _dateLeft.setDate(30);
      }
      _dateLeft.setMonth(_dateLeft.getMonth() - sign * difference);
      let isLastMonthNotFull = compareAsc(_dateLeft, _dateRight) === -sign;
      if (isLastDayOfMonth(toDate(dateLeft)) && difference === 1 && compareAsc(dateLeft, _dateRight) === 1) {
        isLastMonthNotFull = false;
      }
      result = sign * (difference - Number(isLastMonthNotFull));
    }
    return result === 0 ? 0 : result;
  }
  function differenceInSeconds(dateLeft, dateRight, options) {
    const diff = differenceInMilliseconds(dateLeft, dateRight) / 1e3;
    return getRoundingMethod(options == null ? void 0 : options.roundingMethod)(diff);
  }
  const formatDistanceLocale = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  };
  const formatDistance$1 = (token, count, options) => {
    let result;
    const tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace("{{count}}", count.toString());
    }
    if (options == null ? void 0 : options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "in " + result;
      } else {
        return result + " ago";
      }
    }
    return result;
  };
  function buildFormatLongFn(args) {
    return (options = {}) => {
      const width = options.width ? String(options.width) : args.defaultWidth;
      const format = args.formats[width] || args.formats[args.defaultWidth];
      return format;
    };
  }
  const dateFormats = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  };
  const timeFormats = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  };
  const dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  };
  const formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: "full"
    })
  };
  const formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  };
  const formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];
  function buildLocalizeFn(args) {
    return (value, options) => {
      const context = (options == null ? void 0 : options.context) ? String(options.context) : "standalone";
      let valuesArray;
      if (context === "formatting" && args.formattingValues) {
        const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        const width = (options == null ? void 0 : options.width) ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        const defaultWidth = args.defaultWidth;
        const width = (options == null ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[width] || args.values[defaultWidth];
      }
      const index = args.argumentCallback ? args.argumentCallback(value) : value;
      return valuesArray[index];
    };
  }
  const eraValues = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  };
  const quarterValues = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  };
  const monthValues = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  };
  const dayValues = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  };
  const dayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  };
  const formattingDayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  };
  const ordinalNumber = (dirtyNumber, _options) => {
    const number = Number(dirtyNumber);
    const rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
      }
    }
    return number + "th";
  };
  const localize = {
    ordinalNumber,
    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: "wide",
      argumentCallback: (quarter) => quarter - 1
    }),
    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: "wide"
    })
  };
  function buildMatchFn(args) {
    return (string, options = {}) => {
      const width = options.width;
      const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      const matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      const matchedString = matchResult[0];
      const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : findKey(parsePatterns, (pattern) => pattern.test(matchedString));
      let value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? options.valueCallback(value) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  function findKey(object, predicate) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
        return key;
      }
    }
    return void 0;
  }
  function findIndex(array, predicate) {
    for (let key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return void 0;
  }
  function buildMatchPatternFn(args) {
    return (string, options = {}) => {
      const matchResult = string.match(args.matchPattern);
      if (!matchResult)
        return null;
      const matchedString = matchResult[0];
      const parseResult = string.match(args.parsePattern);
      if (!parseResult)
        return null;
      let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  const parseOrdinalNumberPattern = /\d+/i;
  const matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  const parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };
  const matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  const parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  const matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  const parseMonthPatterns = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ]
  };
  const matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  const parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  const matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  const parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  const match = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: (value) => parseInt(value, 10)
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: "any",
      valueCallback: (index) => index + 1
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: "any"
    })
  };
  const enUS = {
    code: "en-US",
    formatDistance: formatDistance$1,
    formatLong,
    formatRelative,
    localize,
    match,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  function getISOWeek(date) {
    const _date = toDate(date);
    const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
    return Math.round(diff / millisecondsInWeek) + 1;
  }
  function getWeekYear(date, options) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    const _date = toDate(date);
    const year = _date.getFullYear();
    const defaultOptions2 = getDefaultOptions$1();
    const firstWeekContainsDate = (_h = (_g = (_d = (_c = options == null ? void 0 : options.firstWeekContainsDate) != null ? _c : (_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) != null ? _d : defaultOptions2.firstWeekContainsDate) != null ? _g : (_f = (_e = defaultOptions2.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.firstWeekContainsDate) != null ? _h : 1;
    const firstWeekOfNextYear = constructFrom(date, 0);
    firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setHours(0, 0, 0, 0);
    const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
    const firstWeekOfThisYear = constructFrom(date, 0);
    firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setHours(0, 0, 0, 0);
    const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
    if (_date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (_date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  function startOfWeekYear(date, options) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    const defaultOptions2 = getDefaultOptions$1();
    const firstWeekContainsDate = (_h = (_g = (_d = (_c = options == null ? void 0 : options.firstWeekContainsDate) != null ? _c : (_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) != null ? _d : defaultOptions2.firstWeekContainsDate) != null ? _g : (_f = (_e = defaultOptions2.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.firstWeekContainsDate) != null ? _h : 1;
    const year = getWeekYear(date, options);
    const firstWeek = constructFrom(date, 0);
    firstWeek.setFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setHours(0, 0, 0, 0);
    const _date = startOfWeek(firstWeek, options);
    return _date;
  }
  function getWeek(date, options) {
    const _date = toDate(date);
    const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
    return Math.round(diff / millisecondsInWeek) + 1;
  }
  const dateLongFormatter = (pattern, formatLong2) => {
    switch (pattern) {
      case "P":
        return formatLong2.date({ width: "short" });
      case "PP":
        return formatLong2.date({ width: "medium" });
      case "PPP":
        return formatLong2.date({ width: "long" });
      case "PPPP":
      default:
        return formatLong2.date({ width: "full" });
    }
  };
  const timeLongFormatter = (pattern, formatLong2) => {
    switch (pattern) {
      case "p":
        return formatLong2.time({ width: "short" });
      case "pp":
        return formatLong2.time({ width: "medium" });
      case "ppp":
        return formatLong2.time({ width: "long" });
      case "pppp":
      default:
        return formatLong2.time({ width: "full" });
    }
  };
  const dateTimeLongFormatter = (pattern, formatLong2) => {
    const matchResult = pattern.match(/(P+)(p+)?/) || [];
    const datePattern = matchResult[1];
    const timePattern = matchResult[2];
    if (!timePattern) {
      return dateLongFormatter(pattern, formatLong2);
    }
    let dateTimeFormat;
    switch (datePattern) {
      case "P":
        dateTimeFormat = formatLong2.dateTime({ width: "short" });
        break;
      case "PP":
        dateTimeFormat = formatLong2.dateTime({ width: "medium" });
        break;
      case "PPP":
        dateTimeFormat = formatLong2.dateTime({ width: "long" });
        break;
      case "PPPP":
      default:
        dateTimeFormat = formatLong2.dateTime({ width: "full" });
        break;
    }
    return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
  };
  const longFormatters = {
    p: timeLongFormatter,
    P: dateTimeLongFormatter
  };
  const dayOfYearTokenRE = /^D+$/;
  const weekYearTokenRE = /^Y+$/;
  const throwTokens = ["D", "DD", "YY", "YYYY"];
  function isProtectedDayOfYearToken(token) {
    return dayOfYearTokenRE.test(token);
  }
  function isProtectedWeekYearToken(token) {
    return weekYearTokenRE.test(token);
  }
  function warnOrThrowProtectedError(token, format, input) {
    const _message = message(token, format, input);
    console.warn(_message);
    if (throwTokens.includes(token))
      throw new RangeError(_message);
  }
  function message(token, format, input) {
    const subject = token[0] === "Y" ? "years" : "days of the month";
    return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
  }
  function formatDistance(date, baseDate, options) {
    var _a2, _b;
    const defaultOptions2 = getDefaultOptions$1();
    const locale = (_b = (_a2 = options == null ? void 0 : options.locale) != null ? _a2 : defaultOptions2.locale) != null ? _b : enUS;
    const minutesInAlmostTwoDays = 2520;
    const comparison = compareAsc(date, baseDate);
    if (isNaN(comparison)) {
      throw new RangeError("Invalid time value");
    }
    const localizeOptions = Object.assign({}, options, {
      addSuffix: options == null ? void 0 : options.addSuffix,
      comparison
    });
    let dateLeft;
    let dateRight;
    if (comparison > 0) {
      dateLeft = toDate(baseDate);
      dateRight = toDate(date);
    } else {
      dateLeft = toDate(date);
      dateRight = toDate(baseDate);
    }
    const seconds = differenceInSeconds(dateRight, dateLeft);
    const offsetInSeconds = (getTimezoneOffsetInMilliseconds(dateRight) - getTimezoneOffsetInMilliseconds(dateLeft)) / 1e3;
    const minutes = Math.round((seconds - offsetInSeconds) / 60);
    let months;
    if (minutes < 2) {
      if (options == null ? void 0 : options.includeSeconds) {
        if (seconds < 5) {
          return locale.formatDistance("lessThanXSeconds", 5, localizeOptions);
        } else if (seconds < 10) {
          return locale.formatDistance("lessThanXSeconds", 10, localizeOptions);
        } else if (seconds < 20) {
          return locale.formatDistance("lessThanXSeconds", 20, localizeOptions);
        } else if (seconds < 40) {
          return locale.formatDistance("halfAMinute", 0, localizeOptions);
        } else if (seconds < 60) {
          return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
        } else {
          return locale.formatDistance("xMinutes", 1, localizeOptions);
        }
      } else {
        if (minutes === 0) {
          return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
        } else {
          return locale.formatDistance("xMinutes", minutes, localizeOptions);
        }
      }
    } else if (minutes < 45) {
      return locale.formatDistance("xMinutes", minutes, localizeOptions);
    } else if (minutes < 90) {
      return locale.formatDistance("aboutXHours", 1, localizeOptions);
    } else if (minutes < minutesInDay) {
      const hours = Math.round(minutes / 60);
      return locale.formatDistance("aboutXHours", hours, localizeOptions);
    } else if (minutes < minutesInAlmostTwoDays) {
      return locale.formatDistance("xDays", 1, localizeOptions);
    } else if (minutes < minutesInMonth) {
      const days = Math.round(minutes / minutesInDay);
      return locale.formatDistance("xDays", days, localizeOptions);
    } else if (minutes < minutesInMonth * 2) {
      months = Math.round(minutes / minutesInMonth);
      return locale.formatDistance("aboutXMonths", months, localizeOptions);
    }
    months = differenceInMonths(dateRight, dateLeft);
    if (months < 12) {
      const nearestMonth = Math.round(minutes / minutesInMonth);
      return locale.formatDistance("xMonths", nearestMonth, localizeOptions);
    } else {
      const monthsSinceStartOfYear = months % 12;
      const years = Math.trunc(months / 12);
      if (monthsSinceStartOfYear < 3) {
        return locale.formatDistance("aboutXYears", years, localizeOptions);
      } else if (monthsSinceStartOfYear < 9) {
        return locale.formatDistance("overXYears", years, localizeOptions);
      } else {
        return locale.formatDistance("almostXYears", years + 1, localizeOptions);
      }
    }
  }
  function formatDistanceToNow(date, options) {
    return formatDistance(date, constructNow(date), options);
  }
  function getDefaultOptions() {
    return Object.assign({}, getDefaultOptions$1());
  }
  function getISODay(date) {
    const _date = toDate(date);
    let day = _date.getDay();
    if (day === 0) {
      day = 7;
    }
    return day;
  }
  function transpose(fromDate, constructor) {
    const date = constructor instanceof Date ? constructFrom(constructor, 0) : new constructor(0);
    date.setFullYear(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate()
    );
    date.setHours(
      fromDate.getHours(),
      fromDate.getMinutes(),
      fromDate.getSeconds(),
      fromDate.getMilliseconds()
    );
    return date;
  }
  const TIMEZONE_UNIT_PRIORITY = 10;
  class Setter {
    constructor() {
      __publicField(this, "subPriority", 0);
    }
    validate(_utcDate, _options) {
      return true;
    }
  }
  class ValueSetter extends Setter {
    constructor(value, validateValue, setValue, priority, subPriority) {
      super();
      this.value = value;
      this.validateValue = validateValue;
      this.setValue = setValue;
      this.priority = priority;
      if (subPriority) {
        this.subPriority = subPriority;
      }
    }
    validate(date, options) {
      return this.validateValue(date, this.value, options);
    }
    set(date, flags, options) {
      return this.setValue(date, flags, this.value, options);
    }
  }
  class DateToSystemTimezoneSetter extends Setter {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", TIMEZONE_UNIT_PRIORITY);
      __publicField(this, "subPriority", -1);
    }
    set(date, flags) {
      if (flags.timestampIsSet)
        return date;
      return constructFrom(date, transpose(date, Date));
    }
  }
  class Parser {
    run(dateString, token, match2, options) {
      const result = this.parse(dateString, token, match2, options);
      if (!result) {
        return null;
      }
      return {
        setter: new ValueSetter(
          result.value,
          this.validate,
          this.set,
          this.priority,
          this.subPriority
        ),
        rest: result.rest
      };
    }
    validate(_utcDate, _value, _options) {
      return true;
    }
  }
  class EraParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 140);
      __publicField(this, "incompatibleTokens", ["R", "u", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "G":
        case "GG":
        case "GGG":
          return match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
        case "GGGGG":
          return match2.era(dateString, { width: "narrow" });
        case "GGGG":
        default:
          return match2.era(dateString, { width: "wide" }) || match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
      }
    }
    set(date, flags, value) {
      flags.era = value;
      date.setFullYear(value, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  const numericPatterns = {
    month: /^(1[0-2]|0?\d)/,
    date: /^(3[0-1]|[0-2]?\d)/,
    dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
    week: /^(5[0-3]|[0-4]?\d)/,
    hour23h: /^(2[0-3]|[0-1]?\d)/,
    hour24h: /^(2[0-4]|[0-1]?\d)/,
    hour11h: /^(1[0-1]|0?\d)/,
    hour12h: /^(1[0-2]|0?\d)/,
    minute: /^[0-5]?\d/,
    second: /^[0-5]?\d/,
    singleDigit: /^\d/,
    twoDigits: /^\d{1,2}/,
    threeDigits: /^\d{1,3}/,
    fourDigits: /^\d{1,4}/,
    anyDigitsSigned: /^-?\d+/,
    singleDigitSigned: /^-?\d/,
    twoDigitsSigned: /^-?\d{1,2}/,
    threeDigitsSigned: /^-?\d{1,3}/,
    fourDigitsSigned: /^-?\d{1,4}/
  };
  const timezonePatterns = {
    basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
    basic: /^([+-])(\d{2})(\d{2})|Z/,
    basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
    extended: /^([+-])(\d{2}):(\d{2})|Z/,
    extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
  };
  function mapValue(parseFnResult, mapFn) {
    if (!parseFnResult) {
      return parseFnResult;
    }
    return {
      value: mapFn(parseFnResult.value),
      rest: parseFnResult.rest
    };
  }
  function parseNumericPattern(pattern, dateString) {
    const matchResult = dateString.match(pattern);
    if (!matchResult) {
      return null;
    }
    return {
      value: parseInt(matchResult[0], 10),
      rest: dateString.slice(matchResult[0].length)
    };
  }
  function parseTimezonePattern(pattern, dateString) {
    const matchResult = dateString.match(pattern);
    if (!matchResult) {
      return null;
    }
    if (matchResult[0] === "Z") {
      return {
        value: 0,
        rest: dateString.slice(1)
      };
    }
    const sign = matchResult[1] === "+" ? 1 : -1;
    const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
    const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
    const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
    return {
      value: sign * (hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * millisecondsInSecond),
      rest: dateString.slice(matchResult[0].length)
    };
  }
  function parseAnyDigitsSigned(dateString) {
    return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
  }
  function parseNDigits(n, dateString) {
    switch (n) {
      case 1:
        return parseNumericPattern(numericPatterns.singleDigit, dateString);
      case 2:
        return parseNumericPattern(numericPatterns.twoDigits, dateString);
      case 3:
        return parseNumericPattern(numericPatterns.threeDigits, dateString);
      case 4:
        return parseNumericPattern(numericPatterns.fourDigits, dateString);
      default:
        return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
    }
  }
  function parseNDigitsSigned(n, dateString) {
    switch (n) {
      case 1:
        return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
      case 2:
        return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
      case 3:
        return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
      case 4:
        return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
      default:
        return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
    }
  }
  function dayPeriodEnumToHours(dayPeriod) {
    switch (dayPeriod) {
      case "morning":
        return 4;
      case "evening":
        return 17;
      case "pm":
      case "noon":
      case "afternoon":
        return 12;
      case "am":
      case "midnight":
      case "night":
      default:
        return 0;
    }
  }
  function normalizeTwoDigitYear(twoDigitYear, currentYear) {
    const isCommonEra = currentYear > 0;
    const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
    let result;
    if (absCurrentYear <= 50) {
      result = twoDigitYear || 100;
    } else {
      const rangeEnd = absCurrentYear + 50;
      const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
      const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
      result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
    }
    return isCommonEra ? result : 1 - result;
  }
  function isLeapYearIndex(year) {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
  }
  class YearParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 130);
      __publicField(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
    }
    parse(dateString, token, match2) {
      const valueCallback = (year) => ({
        year,
        isTwoDigitYear: token === "yy"
      });
      switch (token) {
        case "y":
          return mapValue(parseNDigits(4, dateString), valueCallback);
        case "yo":
          return mapValue(
            match2.ordinalNumber(dateString, {
              unit: "year"
            }),
            valueCallback
          );
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback);
      }
    }
    validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
    set(date, flags, value) {
      const currentYear = date.getFullYear();
      if (value.isTwoDigitYear) {
        const normalizedTwoDigitYear = normalizeTwoDigitYear(
          value.year,
          currentYear
        );
        date.setFullYear(normalizedTwoDigitYear, 0, 1);
        date.setHours(0, 0, 0, 0);
        return date;
      }
      const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setFullYear(year, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class LocalWeekYearParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 130);
      __publicField(this, "incompatibleTokens", [
        "y",
        "R",
        "u",
        "Q",
        "q",
        "M",
        "L",
        "I",
        "d",
        "D",
        "i",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      const valueCallback = (year) => ({
        year,
        isTwoDigitYear: token === "YY"
      });
      switch (token) {
        case "Y":
          return mapValue(parseNDigits(4, dateString), valueCallback);
        case "Yo":
          return mapValue(
            match2.ordinalNumber(dateString, {
              unit: "year"
            }),
            valueCallback
          );
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback);
      }
    }
    validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
    set(date, flags, value, options) {
      const currentYear = getWeekYear(date, options);
      if (value.isTwoDigitYear) {
        const normalizedTwoDigitYear = normalizeTwoDigitYear(
          value.year,
          currentYear
        );
        date.setFullYear(
          normalizedTwoDigitYear,
          0,
          options.firstWeekContainsDate
        );
        date.setHours(0, 0, 0, 0);
        return startOfWeek(date, options);
      }
      const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setFullYear(year, 0, options.firstWeekContainsDate);
      date.setHours(0, 0, 0, 0);
      return startOfWeek(date, options);
    }
  }
  class ISOWeekYearParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 130);
      __publicField(this, "incompatibleTokens", [
        "G",
        "y",
        "Y",
        "u",
        "Q",
        "q",
        "M",
        "L",
        "w",
        "d",
        "D",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token) {
      if (token === "R") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
    set(date, _flags, value) {
      const firstWeekOfYear = constructFrom(date, 0);
      firstWeekOfYear.setFullYear(value, 0, 4);
      firstWeekOfYear.setHours(0, 0, 0, 0);
      return startOfISOWeek(firstWeekOfYear);
    }
  }
  class ExtendedYearParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 130);
      __publicField(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
    }
    parse(dateString, token) {
      if (token === "u") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
    set(date, _flags, value) {
      date.setFullYear(value, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class QuarterParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 120);
      __publicField(this, "incompatibleTokens", [
        "Y",
        "R",
        "q",
        "M",
        "L",
        "w",
        "I",
        "d",
        "D",
        "i",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "Q":
        case "QQ":
          return parseNDigits(token.length, dateString);
        case "Qo":
          return match2.ordinalNumber(dateString, { unit: "quarter" });
        case "QQQ":
          return match2.quarter(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQQ":
          return match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return match2.quarter(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 4;
    }
    set(date, _flags, value) {
      date.setMonth((value - 1) * 3, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class StandAloneQuarterParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 120);
      __publicField(this, "incompatibleTokens", [
        "Y",
        "R",
        "Q",
        "M",
        "L",
        "w",
        "I",
        "d",
        "D",
        "i",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "q":
        case "qq":
          return parseNDigits(token.length, dateString);
        case "qo":
          return match2.ordinalNumber(dateString, { unit: "quarter" });
        case "qqq":
          return match2.quarter(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqqq":
          return match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return match2.quarter(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 4;
    }
    set(date, _flags, value) {
      date.setMonth((value - 1) * 3, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class MonthParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "incompatibleTokens", [
        "Y",
        "R",
        "q",
        "Q",
        "L",
        "w",
        "I",
        "D",
        "i",
        "e",
        "c",
        "t",
        "T"
      ]);
      __publicField(this, "priority", 110);
    }
    parse(dateString, token, match2) {
      const valueCallback = (value) => value - 1;
      switch (token) {
        case "M":
          return mapValue(
            parseNumericPattern(numericPatterns.month, dateString),
            valueCallback
          );
        case "MM":
          return mapValue(parseNDigits(2, dateString), valueCallback);
        case "Mo":
          return mapValue(
            match2.ordinalNumber(dateString, {
              unit: "month"
            }),
            valueCallback
          );
        case "MMM":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, { width: "narrow", context: "formatting" });
        case "MMMMM":
          return match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return match2.month(dateString, { width: "wide", context: "formatting" }) || match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, { width: "narrow", context: "formatting" });
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 11;
    }
    set(date, _flags, value) {
      date.setMonth(value, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class StandAloneMonthParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 110);
      __publicField(this, "incompatibleTokens", [
        "Y",
        "R",
        "q",
        "Q",
        "M",
        "w",
        "I",
        "D",
        "i",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      const valueCallback = (value) => value - 1;
      switch (token) {
        case "L":
          return mapValue(
            parseNumericPattern(numericPatterns.month, dateString),
            valueCallback
          );
        case "LL":
          return mapValue(parseNDigits(2, dateString), valueCallback);
        case "Lo":
          return mapValue(
            match2.ordinalNumber(dateString, {
              unit: "month"
            }),
            valueCallback
          );
        case "LLL":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, { width: "narrow", context: "standalone" });
        case "LLLLL":
          return match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return match2.month(dateString, { width: "wide", context: "standalone" }) || match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, { width: "narrow", context: "standalone" });
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 11;
    }
    set(date, _flags, value) {
      date.setMonth(value, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  function setWeek(date, week, options) {
    const _date = toDate(date);
    const diff = getWeek(_date, options) - week;
    _date.setDate(_date.getDate() - diff * 7);
    return _date;
  }
  class LocalWeekParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 100);
      __publicField(this, "incompatibleTokens", [
        "y",
        "R",
        "u",
        "q",
        "Q",
        "M",
        "L",
        "I",
        "d",
        "D",
        "i",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "w":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "wo":
          return match2.ordinalNumber(dateString, { unit: "week" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 53;
    }
    set(date, _flags, value, options) {
      return startOfWeek(setWeek(date, value, options), options);
    }
  }
  function setISOWeek(date, week) {
    const _date = toDate(date);
    const diff = getISOWeek(_date) - week;
    _date.setDate(_date.getDate() - diff * 7);
    return _date;
  }
  class ISOWeekParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 100);
      __publicField(this, "incompatibleTokens", [
        "y",
        "Y",
        "u",
        "q",
        "Q",
        "M",
        "L",
        "w",
        "d",
        "D",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "I":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "Io":
          return match2.ordinalNumber(dateString, { unit: "week" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 53;
    }
    set(date, _flags, value) {
      return startOfISOWeek(setISOWeek(date, value));
    }
  }
  const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_IN_MONTH_LEAP_YEAR = [
    31,
    29,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];
  class DateParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 90);
      __publicField(this, "subPriority", 1);
      __publicField(this, "incompatibleTokens", [
        "Y",
        "R",
        "q",
        "Q",
        "w",
        "I",
        "D",
        "i",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "d":
          return parseNumericPattern(numericPatterns.date, dateString);
        case "do":
          return match2.ordinalNumber(dateString, { unit: "date" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(date, value) {
      const year = date.getFullYear();
      const isLeapYear = isLeapYearIndex(year);
      const month = date.getMonth();
      if (isLeapYear) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month];
      }
    }
    set(date, _flags, value) {
      date.setDate(value);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class DayOfYearParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 90);
      __publicField(this, "subpriority", 1);
      __publicField(this, "incompatibleTokens", [
        "Y",
        "R",
        "q",
        "Q",
        "M",
        "L",
        "w",
        "I",
        "d",
        "E",
        "i",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "D":
        case "DD":
          return parseNumericPattern(numericPatterns.dayOfYear, dateString);
        case "Do":
          return match2.ordinalNumber(dateString, { unit: "date" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(date, value) {
      const year = date.getFullYear();
      const isLeapYear = isLeapYearIndex(year);
      if (isLeapYear) {
        return value >= 1 && value <= 366;
      } else {
        return value >= 1 && value <= 365;
      }
    }
    set(date, _flags, value) {
      date.setMonth(0, value);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  function setDay(date, day, options) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    const defaultOptions2 = getDefaultOptions$1();
    const weekStartsOn = (_h = (_g = (_d = (_c = options == null ? void 0 : options.weekStartsOn) != null ? _c : (_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) != null ? _d : defaultOptions2.weekStartsOn) != null ? _g : (_f = (_e = defaultOptions2.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) != null ? _h : 0;
    const _date = toDate(date);
    const currentDay = _date.getDay();
    const remainder = day % 7;
    const dayIndex = (remainder + 7) % 7;
    const delta = 7 - weekStartsOn;
    const diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
    return addDays(_date, diff);
  }
  class DayParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 90);
      __publicField(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "E":
        case "EE":
        case "EEE":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
        case "EEEEE":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
        case "EEEE":
        default:
          return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 6;
    }
    set(date, _flags, value, options) {
      date = setDay(date, value, options);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class LocalDayParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 90);
      __publicField(this, "incompatibleTokens", [
        "y",
        "R",
        "u",
        "q",
        "Q",
        "M",
        "L",
        "I",
        "d",
        "D",
        "E",
        "i",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2, options) {
      const valueCallback = (value) => {
        const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "e":
        case "ee":
          return mapValue(parseNDigits(token.length, dateString), valueCallback);
        case "eo":
          return mapValue(
            match2.ordinalNumber(dateString, {
              unit: "day"
            }),
            valueCallback
          );
        case "eee":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
        case "eeeee":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
        case "eeee":
        default:
          return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 6;
    }
    set(date, _flags, value, options) {
      date = setDay(date, value, options);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class StandAloneLocalDayParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 90);
      __publicField(this, "incompatibleTokens", [
        "y",
        "R",
        "u",
        "q",
        "Q",
        "M",
        "L",
        "I",
        "d",
        "D",
        "E",
        "i",
        "e",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2, options) {
      const valueCallback = (value) => {
        const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "c":
        case "cc":
          return mapValue(parseNDigits(token.length, dateString), valueCallback);
        case "co":
          return mapValue(
            match2.ordinalNumber(dateString, {
              unit: "day"
            }),
            valueCallback
          );
        case "ccc":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
        case "ccccc":
          return match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
        case "cccc":
        default:
          return match2.day(dateString, { width: "wide", context: "standalone" }) || match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 6;
    }
    set(date, _flags, value, options) {
      date = setDay(date, value, options);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  function setISODay(date, day) {
    const _date = toDate(date);
    const currentDay = getISODay(_date);
    const diff = day - currentDay;
    return addDays(_date, diff);
  }
  class ISODayParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 90);
      __publicField(this, "incompatibleTokens", [
        "y",
        "Y",
        "u",
        "q",
        "Q",
        "M",
        "L",
        "w",
        "d",
        "D",
        "E",
        "e",
        "c",
        "t",
        "T"
      ]);
    }
    parse(dateString, token, match2) {
      const valueCallback = (value) => {
        if (value === 0) {
          return 7;
        }
        return value;
      };
      switch (token) {
        case "i":
        case "ii":
          return parseNDigits(token.length, dateString);
        case "io":
          return match2.ordinalNumber(dateString, { unit: "day" });
        case "iii":
          return mapValue(
            match2.day(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "short",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            }),
            valueCallback
          );
        case "iiiii":
          return mapValue(
            match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            }),
            valueCallback
          );
        case "iiiiii":
          return mapValue(
            match2.day(dateString, {
              width: "short",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            }),
            valueCallback
          );
        case "iiii":
        default:
          return mapValue(
            match2.day(dateString, {
              width: "wide",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "abbreviated",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "short",
              context: "formatting"
            }) || match2.day(dateString, {
              width: "narrow",
              context: "formatting"
            }),
            valueCallback
          );
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 7;
    }
    set(date, _flags, value) {
      date = setISODay(date, value);
      date.setHours(0, 0, 0, 0);
      return date;
    }
  }
  class AMPMParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 80);
      __publicField(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "a":
        case "aa":
        case "aaa":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaaa":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
    set(date, _flags, value) {
      date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }
  class AMPMMidnightParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 80);
      __publicField(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "b":
        case "bb":
        case "bbb":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbbb":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
    set(date, _flags, value) {
      date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }
  class DayPeriodParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 80);
      __publicField(this, "incompatibleTokens", ["a", "b", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "B":
        case "BB":
        case "BBB":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBBB":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
    set(date, _flags, value) {
      date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }
  class Hour1to12Parser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 70);
      __publicField(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "h":
          return parseNumericPattern(numericPatterns.hour12h, dateString);
        case "ho":
          return match2.ordinalNumber(dateString, { unit: "hour" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 12;
    }
    set(date, _flags, value) {
      const isPM = date.getHours() >= 12;
      if (isPM && value < 12) {
        date.setHours(value + 12, 0, 0, 0);
      } else if (!isPM && value === 12) {
        date.setHours(0, 0, 0, 0);
      } else {
        date.setHours(value, 0, 0, 0);
      }
      return date;
    }
  }
  class Hour0to23Parser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 70);
      __publicField(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "H":
          return parseNumericPattern(numericPatterns.hour23h, dateString);
        case "Ho":
          return match2.ordinalNumber(dateString, { unit: "hour" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 23;
    }
    set(date, _flags, value) {
      date.setHours(value, 0, 0, 0);
      return date;
    }
  }
  class Hour0To11Parser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 70);
      __publicField(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "K":
          return parseNumericPattern(numericPatterns.hour11h, dateString);
        case "Ko":
          return match2.ordinalNumber(dateString, { unit: "hour" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 11;
    }
    set(date, _flags, value) {
      const isPM = date.getHours() >= 12;
      if (isPM && value < 12) {
        date.setHours(value + 12, 0, 0, 0);
      } else {
        date.setHours(value, 0, 0, 0);
      }
      return date;
    }
  }
  class Hour1To24Parser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 70);
      __publicField(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "k":
          return parseNumericPattern(numericPatterns.hour24h, dateString);
        case "ko":
          return match2.ordinalNumber(dateString, { unit: "hour" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 1 && value <= 24;
    }
    set(date, _flags, value) {
      const hours = value <= 24 ? value % 24 : value;
      date.setHours(hours, 0, 0, 0);
      return date;
    }
  }
  class MinuteParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 60);
      __publicField(this, "incompatibleTokens", ["t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "m":
          return parseNumericPattern(numericPatterns.minute, dateString);
        case "mo":
          return match2.ordinalNumber(dateString, { unit: "minute" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 59;
    }
    set(date, _flags, value) {
      date.setMinutes(value, 0, 0);
      return date;
    }
  }
  class SecondParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 50);
      __publicField(this, "incompatibleTokens", ["t", "T"]);
    }
    parse(dateString, token, match2) {
      switch (token) {
        case "s":
          return parseNumericPattern(numericPatterns.second, dateString);
        case "so":
          return match2.ordinalNumber(dateString, { unit: "second" });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
    validate(_date, value) {
      return value >= 0 && value <= 59;
    }
    set(date, _flags, value) {
      date.setSeconds(value, 0);
      return date;
    }
  }
  class FractionOfSecondParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 30);
      __publicField(this, "incompatibleTokens", ["t", "T"]);
    }
    parse(dateString, token) {
      const valueCallback = (value) => Math.trunc(value * Math.pow(10, -token.length + 3));
      return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
    set(date, _flags, value) {
      date.setMilliseconds(value);
      return date;
    }
  }
  class ISOTimezoneWithZParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 10);
      __publicField(this, "incompatibleTokens", ["t", "T", "x"]);
    }
    parse(dateString, token) {
      switch (token) {
        case "X":
          return parseTimezonePattern(
            timezonePatterns.basicOptionalMinutes,
            dateString
          );
        case "XX":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "XXXX":
          return parseTimezonePattern(
            timezonePatterns.basicOptionalSeconds,
            dateString
          );
        case "XXXXX":
          return parseTimezonePattern(
            timezonePatterns.extendedOptionalSeconds,
            dateString
          );
        case "XXX":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
    set(date, flags, value) {
      if (flags.timestampIsSet)
        return date;
      return constructFrom(
        date,
        date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
      );
    }
  }
  class ISOTimezoneParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 10);
      __publicField(this, "incompatibleTokens", ["t", "T", "X"]);
    }
    parse(dateString, token) {
      switch (token) {
        case "x":
          return parseTimezonePattern(
            timezonePatterns.basicOptionalMinutes,
            dateString
          );
        case "xx":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "xxxx":
          return parseTimezonePattern(
            timezonePatterns.basicOptionalSeconds,
            dateString
          );
        case "xxxxx":
          return parseTimezonePattern(
            timezonePatterns.extendedOptionalSeconds,
            dateString
          );
        case "xxx":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
    set(date, flags, value) {
      if (flags.timestampIsSet)
        return date;
      return constructFrom(
        date,
        date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
      );
    }
  }
  class TimestampSecondsParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 40);
      __publicField(this, "incompatibleTokens", "*");
    }
    parse(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
    set(date, _flags, value) {
      return [constructFrom(date, value * 1e3), { timestampIsSet: true }];
    }
  }
  class TimestampMillisecondsParser extends Parser {
    constructor() {
      super(...arguments);
      __publicField(this, "priority", 20);
      __publicField(this, "incompatibleTokens", "*");
    }
    parse(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
    set(date, _flags, value) {
      return [constructFrom(date, value), { timestampIsSet: true }];
    }
  }
  const parsers = {
    G: new EraParser(),
    y: new YearParser(),
    Y: new LocalWeekYearParser(),
    R: new ISOWeekYearParser(),
    u: new ExtendedYearParser(),
    Q: new QuarterParser(),
    q: new StandAloneQuarterParser(),
    M: new MonthParser(),
    L: new StandAloneMonthParser(),
    w: new LocalWeekParser(),
    I: new ISOWeekParser(),
    d: new DateParser(),
    D: new DayOfYearParser(),
    E: new DayParser(),
    e: new LocalDayParser(),
    c: new StandAloneLocalDayParser(),
    i: new ISODayParser(),
    a: new AMPMParser(),
    b: new AMPMMidnightParser(),
    B: new DayPeriodParser(),
    h: new Hour1to12Parser(),
    H: new Hour0to23Parser(),
    K: new Hour0To11Parser(),
    k: new Hour1To24Parser(),
    m: new MinuteParser(),
    s: new SecondParser(),
    S: new FractionOfSecondParser(),
    X: new ISOTimezoneWithZParser(),
    x: new ISOTimezoneParser(),
    t: new TimestampSecondsParser(),
    T: new TimestampMillisecondsParser()
  };
  const formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
  const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  const escapedStringRegExp = /^'([^]*?)'?$/;
  const doubleQuoteRegExp = /''/g;
  const notWhitespaceRegExp = /\S/;
  const unescapedLatinCharacterRegExp = /[a-zA-Z]/;
  function parse(dateStr, formatStr, referenceDate, options) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    const defaultOptions2 = getDefaultOptions();
    const locale = (_b = (_a2 = options == null ? void 0 : options.locale) != null ? _a2 : defaultOptions2.locale) != null ? _b : enUS;
    const firstWeekContainsDate = (_j = (_i = (_f = (_e = options == null ? void 0 : options.firstWeekContainsDate) != null ? _e : (_d = (_c = options == null ? void 0 : options.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) != null ? _f : defaultOptions2.firstWeekContainsDate) != null ? _i : (_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.firstWeekContainsDate) != null ? _j : 1;
    const weekStartsOn = (_r = (_q = (_n = (_m = options == null ? void 0 : options.weekStartsOn) != null ? _m : (_l = (_k = options == null ? void 0 : options.locale) == null ? void 0 : _k.options) == null ? void 0 : _l.weekStartsOn) != null ? _n : defaultOptions2.weekStartsOn) != null ? _q : (_p = (_o = defaultOptions2.locale) == null ? void 0 : _o.options) == null ? void 0 : _p.weekStartsOn) != null ? _r : 0;
    if (formatStr === "") {
      if (dateStr === "") {
        return toDate(referenceDate);
      } else {
        return constructFrom(referenceDate, NaN);
      }
    }
    const subFnOptions = {
      firstWeekContainsDate,
      weekStartsOn,
      locale
    };
    const setters = [new DateToSystemTimezoneSetter()];
    const tokens = formatStr.match(longFormattingTokensRegExp).map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter in longFormatters) {
        const longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    }).join("").match(formattingTokensRegExp);
    const usedTokens = [];
    for (let token of tokens) {
      if (!(options == null ? void 0 : options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token)) {
        warnOrThrowProtectedError(token, formatStr, dateStr);
      }
      if (!(options == null ? void 0 : options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
        warnOrThrowProtectedError(token, formatStr, dateStr);
      }
      const firstCharacter = token[0];
      const parser = parsers[firstCharacter];
      if (parser) {
        const { incompatibleTokens } = parser;
        if (Array.isArray(incompatibleTokens)) {
          const incompatibleToken = usedTokens.find(
            (usedToken) => incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter
          );
          if (incompatibleToken) {
            throw new RangeError(
              `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`
            );
          }
        } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
          throw new RangeError(
            `The format string mustn't contain \`${token}\` and any other token at the same time`
          );
        }
        usedTokens.push({ token: firstCharacter, fullToken: token });
        const parseResult = parser.run(
          dateStr,
          token,
          locale.match,
          subFnOptions
        );
        if (!parseResult) {
          return constructFrom(referenceDate, NaN);
        }
        setters.push(parseResult.setter);
        dateStr = parseResult.rest;
      } else {
        if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
          throw new RangeError(
            "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
          );
        }
        if (token === "''") {
          token = "'";
        } else if (firstCharacter === "'") {
          token = cleanEscapedString(token);
        }
        if (dateStr.indexOf(token) === 0) {
          dateStr = dateStr.slice(token.length);
        } else {
          return constructFrom(referenceDate, NaN);
        }
      }
    }
    if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
      return constructFrom(referenceDate, NaN);
    }
    const uniquePrioritySetters = setters.map((setter) => setter.priority).sort((a, b) => b - a).filter((priority, index, array) => array.indexOf(priority) === index).map(
      (priority) => setters.filter((setter) => setter.priority === priority).sort((a, b) => b.subPriority - a.subPriority)
    ).map((setterArray) => setterArray[0]);
    let date = toDate(referenceDate);
    if (isNaN(date.getTime())) {
      return constructFrom(referenceDate, NaN);
    }
    const flags = {};
    for (const setter of uniquePrioritySetters) {
      if (!setter.validate(date, subFnOptions)) {
        return constructFrom(referenceDate, NaN);
      }
      const result = setter.set(date, flags, subFnOptions);
      if (Array.isArray(result)) {
        date = result[0];
        Object.assign(flags, result[1]);
      } else {
        date = result;
      }
    }
    return constructFrom(referenceDate, date);
  }
  function cleanEscapedString(input) {
    return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
  }
  function subDays(date, amount) {
    return addDays(date, -amount);
  }
  function subMonths(date, amount) {
    return addMonths(date, -amount);
  }
  function sub(date, duration) {
    const {
      years = 0,
      months = 0,
      weeks = 0,
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0
    } = duration;
    const dateWithoutMonths = subMonths(date, months + years * 12);
    const dateWithoutDays = subDays(dateWithoutMonths, days + weeks * 7);
    const minutestoSub = minutes + hours * 60;
    const secondstoSub = seconds + minutestoSub * 60;
    const mstoSub = secondstoSub * 1e3;
    const finalDate = constructFrom(date, dateWithoutDays.getTime() - mstoSub);
    return finalDate;
  }
  const eventBus = new Vue__default["default"]();
  function isURL(s) {
    return /^https?:\/\/.*/.test(s);
  }
  const isSubpathDL = Boolean(localStorage.getItem("__dl_subpath_on"));
  function downloadFile(url, name, options) {
    if (!/\.\w+$/.test(name))
      name += `.${url.split(".").pop()}`;
    if (isSubpathDL)
      name = `${location.hostname}/${name}`;
    return new Promise((resolve, reject) => {
      GM_download({
        url,
        name,
        onload: () => resolve(),
        onerror: (err) => reject(new Error(err.error)),
        ...options
      });
    });
  }
  function downloadText(text, filename = "file.txt") {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  function showMsg({ msg = "", type = "success" }) {
    eventBus.$emit("showSnackbar", msg, type);
  }
  function notReachBottom() {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
    return clientHeight + scrollTop >= scrollHeight * 0.8;
  }
  function throttleScroll(downFn, upFn) {
    const doc = document.documentElement;
    let position = doc.scrollTop;
    let ticking = false;
    return function(arg) {
      if (ticking)
        return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scroll = doc.scrollTop;
        scroll > position ? downFn(scroll, arg) : upFn == null ? void 0 : upFn(scroll, arg);
        position = scroll;
        ticking = false;
      });
    };
  }
  function debounce(func, delay, immediate = false) {
    let timer;
    return function(...args) {
      const callNow = immediate && !timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = void 0;
        !immediate && func.apply(this, args);
      }, delay);
      callNow && func.apply(this, args);
    };
  }
  function formatDate(date) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    return [year, month, day].map((n) => n[1] ? n : `0${n}`).join("-");
  }
  function addDate(num, duration, date) {
    const res = add(date || new Date(), { [duration]: num });
    return formatDate(res);
  }
  function subDate(num, duration, date) {
    const res = sub(date || new Date(), { [duration]: num });
    return formatDate(res);
  }
  function dragElement(sel, childSel) {
    const cont = document.querySelector(sel);
    if (!cont)
      return;
    const el = cont.querySelector(childSel);
    if (!el)
      return;
    let prevPos = [];
    let needForRAF = true;
    const onMouseDown = (e) => {
      if (e.which !== 1)
        return;
      let left;
      let top;
      const elScroller = (e2) => {
        if (needForRAF) {
          needForRAF = false;
          const x = e2.clientX;
          const y = e2.clientY;
          left = cont.scrollLeft + (prevPos[0] - x);
          top = cont.scrollTop + (prevPos[1] - y);
          prevPos[0] = x;
          prevPos[1] = y;
          requestAnimationFrame(() => {
            cont.scroll({ left, top });
            needForRAF = true;
          });
        }
        return false;
      };
      el.style.cursor = "move";
      prevPos = [e.clientX, e.clientY];
      window.addEventListener("mousemove", elScroller);
      const onMouseUp = () => {
        window.removeEventListener("mousemove", elScroller);
        el.style.cursor = "auto";
        window.removeEventListener("mouseup", onMouseUp);
        return false;
      };
      window.addEventListener("mouseup", onMouseUp);
      return false;
    };
    el.addEventListener("mousedown", onMouseDown);
    return () => {
      el.removeEventListener("mousedown", onMouseDown);
    };
  }
  function getImageSize(url) {
    return new Promise((resolve) => {
      if (!url) {
        resolve({ width: 0, height: 0 });
        return;
      }
      const image = new Image();
      image.onload = () => {
        resolve({ width: image.width, height: image.height });
      };
      image.onerror = () => {
        resolve({ width: 0, height: 0 });
      };
      image.src = url;
    });
  }
  async function fancyboxShow(images, index = 0) {
    if (!unsafeWindow.Fancybox) {
      if (store.isYKSite) {
        Array.prototype.entries = function() {
          let index2 = 0;
          const arr = this;
          return {
            next() {
              if (index2 < arr.length) {
                return { value: [index2, arr[index2++]], done: false };
              } else {
                return { value: void 0, done: true };
              }
            },
            [typeof Symbol !== "undefined" && Symbol.iterator || "@@iterator"]() {
              return this;
            }
          };
        };
      }
      document.head.insertAdjacentHTML("beforeend", '<link href="https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.min.css" rel="stylesheet">');
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.umd.min.js");
    }
    const isMobile2 = navigator.userAgent.includes("Mobile");
    unsafeWindow.Fancybox.show((store.isYKSite ? [images[index]] : images).map((e) => ({
      src: e.jpegUrl || e.fileUrl,
      thumb: e.previewUrl || e.fileUrl,
      downloadSrc: e.fileUrl,
      caption: e.tags.map((e2) => `<span class="v-chip theme--light v-size--small" style="background-color: rgb(143, 119, 181); border-color: rgb(143, 119, 181); color: rgb(255, 255, 255); caret-color: rgb(255, 255, 255);margin: 0 4px 4px 0">${e2}</span>`).join("")
    })), {
      compact: isMobile2,
      startIndex: store.isYKSite ? 0 : index,
      ...store.isYKSite ? {
        backdropClick: false,
        contentClick: "toggleZoom",
        keyboard: {
          Escape: false,
          Delete: false,
          Backspace: false
        }
      } : {},
      placeFocusBack: false,
      trapFocus: false,
      Hash: false,
      Thumbs: { showOnStart: false },
      Carousel: { infinite: false },
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: [],
          right: isMobile2 ? ["tagsTip", !store.isYKSite && "toDetailPage", "download", "rotateCW", "flipX", "flipY", store.isYKSite ? "customClose" : "close"].filter(Boolean) : ["tagsTip", !store.isYKSite && "toDetailPage", "toggleZoom", "slideshow", "thumbs", "download", "rotateCW", "flipX", "flipY", store.isYKSite ? "customClose" : "close"].filter(Boolean)
        },
        items: {
          tagsTip: {
            tpl: '<button class="f-button"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4436" width="32" height="32"><path d="M483.2 790.3L861.4 412c1.7-1.7 2.5-4 2.3-6.3l-25.5-301.4c-0.7-7.8-6.8-13.9-14.6-14.6L522.2 64.3c-2.3-0.2-4.7 0.6-6.3 2.3L137.7 444.8c-3.1 3.1-3.1 8.2 0 11.3l334.2 334.2c3.1 3.2 8.2 3.2 11.3 0z m62.6-651.7l224.6 19 19 224.6L477.5 694 233.9 450.5l311.9-311.9z" p-id="4437" fill="#fff"></path><path d="M605.958852 324.826232a48 48 0 1 0 67.881066-67.883435 48 48 0 1 0-67.881066 67.883435Z" p-id="4438" fill="#fff"></path><path d="M889.7 539.8l-39.6-39.5c-3.1-3.1-8.2-3.1-11.3 0l-362 361.3-237.6-237c-3.1-3.1-8.2-3.1-11.3 0l-39.6 39.5c-3.1 3.1-3.1 8.2 0 11.3l243.2 242.8 39.6 39.5c3.1 3.1 8.2 3.1 11.3 0l407.3-406.6c3.1-3.1 3.1-8.2 0-11.3z" fill="#fff"></path></svg></path></svg></button>',
            click: () => {
              document.querySelectorAll(".fancybox__caption").forEach((e) => {
                const { display } = e.style;
                e.style.display = !display || display == "none" ? "block" : "none";
              });
            }
          },
          toDetailPage: {
            tpl: '<button class="f-button"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5483" width="32" height="32"><path d="M574 665.4c-3.1-3.1-8.2-3.1-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8c-3.1-3.1-8.2-3.1-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zM832.6 191.4c-84.6-84.6-221.5-84.6-306 0L410.3 307.6c-3.1 3.1-3.1 8.2 0 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6c-3.1 3.1-3.1 8.2 0 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1z" p-id="5484" fill="#fff"></path><path d="M610.1 372.3c-3.1-3.1-8.2-3.1-11.3 0L372.3 598.7c-3.1 3.1-3.1 8.2 0 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z" fill="#fff"></path></svg></button>',
            click: (ev) => {
              const { page } = ev.instance.carousel;
              window.open(images[page].postView, "_blank", "noreferrer");
            }
          },
          customClose: {
            tpl: '<button class="f-button" title="Close"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m19.5 4.5-15 15M4.5 4.5l15 15"></path></svg></button>',
            click: () => {
              document.querySelectorAll(".fancybox-focus-guard").forEach((e) => e.remove());
              document.querySelectorAll(".fancybox__container").forEach((e) => e.remove());
              document.documentElement.classList.remove("with-fancybox");
              document.body.classList.remove("hide-scrollbar");
            }
          }
        }
      }
    });
  }
  function getCookie(cname) {
    const name = `${cname}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function formatRelativeTime(dateInput) {
    if (!dateInput || !isValid(dateInput))
      return "";
    if (!Intl || !Intl.RelativeTimeFormat) {
      return formatDistanceToNow(dateInput, { addSuffix: true });
    }
    const rtf = new Intl.RelativeTimeFormat(i18n.locale, { numeric: "auto" });
    const diffMs = dateInput.valueOf() - new Date().valueOf();
    const seconds = diffMs / 1e3;
    const units = [
      { limit: 60, value: seconds, unit: "second" },
      { limit: 60 * 60, value: seconds / 60, unit: "minute" },
      { limit: 60 * 60 * 24, value: seconds / 3600, unit: "hour" },
      { limit: 60 * 60 * 24 * 7, value: seconds / (3600 * 24), unit: "day" },
      { limit: 60 * 60 * 24 * 30, value: seconds / (3600 * 24 * 7), unit: "week" },
      { limit: 60 * 60 * 24 * 365, value: seconds / (3600 * 24 * 30), unit: "month" },
      { limit: Infinity, value: seconds / (3600 * 24 * 365), unit: "year" }
    ];
    for (const { limit, value, unit } of units) {
      if (Math.abs(seconds) < limit) {
        return rtf.format(Math.round(value), unit);
      }
    }
    return "";
  }
  function uniqBy(array, iteratee) {
    const seen = /* @__PURE__ */ new Set();
    const result = [];
    for (const item of array) {
      const key = typeof iteratee === "function" ? iteratee(item) : item[iteratee];
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }
    return result;
  }
  function isAllGirlPage() {
    return location.hostname == "allgirl.booru.org";
  }
  async function fetchAllGirlPosts(page, tags) {
    const url = new URL("https://allgirl.booru.org/index.php");
    url.searchParams.set("page", "post");
    url.searchParams.set("s", "list");
    url.searchParams.set("pid", `${(page - 1) * 20}`);
    tags && url.searchParams.set("tags", tags);
    const htmlResp = await fetch(url.href);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const results = [...doc.querySelectorAll(".content .thumb")].map(async (el) => {
      var _a2;
      const a = el.querySelector("a");
      const img = el.querySelector("img");
      const id = (_a2 = a.getAttribute("id")) == null ? void 0 : _a2.slice(1);
      const previewUrl = img.src;
      const { width, height } = await getImageSize(previewUrl);
      const tags2 = img.title.split(/\s/).filter(Boolean);
      return {
        id,
        postView: a.href,
        previewUrl,
        fileUrl: "",
        tags: tags2,
        width: Number(width),
        height: Number(height),
        aspectRatio: Number(width) / Number(height),
        fileExt: "jpg",
        fileDownloadName: `allgirl ${id} ${tags2.join(" ")}`,
        rating: img.title.includes("rating:Safe") ? "s" : "e"
      };
    });
    return Promise.all(results);
  }
  async function getAllGirlDetail(id) {
    var _a2;
    const resp = await fetch(`https://allgirl.booru.org/index.php?page=post&s=view&id=${id}`);
    const doc = new DOMParser().parseFromString(await resp.text(), "text/html");
    return {
      fileUrl: (_a2 = doc.querySelector("#image")) == null ? void 0 : _a2.src
    };
  }
  const allgirl = {
    is: isAllGirlPage,
    posts: fetchAllGirlPosts,
    detail: getAllGirlDetail
  };
  function isAnihonetwallpaperPage() {
    return location.hostname == "anihonetwallpaper.com";
  }
  async function fetchAnihonetwallpaperPosts(page, tags) {
    const htmlResp = await fetch(`https://anihonetwallpaper.com/page/${page}${tags ? `?s=${tags}` : ""}`);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const results = [...doc.querySelectorAll("main .post_box ")].map((el) => {
      var _a2;
      const a = el.querySelector(".posttitle a");
      const img = el.querySelector(".thumbnail-image");
      const id = (_a2 = a == null ? void 0 : a.href.match(/(\d+)/)) == null ? void 0 : _a2[1];
      const previewUrl = img == null ? void 0 : img.getAttribute("data-src");
      const width = img == null ? void 0 : img.getAttribute("width");
      const height = img == null ? void 0 : img.getAttribute("height");
      const tags2 = [...el.querySelectorAll(".itiran a[rel*=tag]")].map((e) => e.innerText);
      const fileUrl = (previewUrl == null ? void 0 : previewUrl.includes("wp.com")) ? previewUrl.replace(/i\d\.wp\.com\//, "").replace(/\?fit\=\d+\,\d+/, "") : previewUrl == null ? void 0 : previewUrl.replace(/\-\d+x\d+\.(jpg|jpeg|png|webp)/, ".$1");
      return {
        id,
        postView: a == null ? void 0 : a.href,
        previewUrl,
        fileUrl,
        tags: tags2,
        width: Number(width),
        height: Number(height),
        aspectRatio: Number(width) / Number(height),
        fileExt: "jpg",
        fileDownloadName: `Anihonetwallpaper_${id}`,
        rating: ""
      };
    });
    return results;
  }
  const anihonetwallpaper = {
    is: isAnihonetwallpaperPage,
    posts: fetchAnihonetwallpaperPosts
  };
  function isAnimePicturesPage() {
    return location.hostname == "anime-pictures.net";
  }
  async function fetchAnimePicturesPosts(page, tags) {
    const url = new URL("https://api.anime-pictures.net/api/v3/posts");
    url.searchParams.set("page", `${page - 1}`);
    url.searchParams.set("lang", "zh_CN");
    url.searchParams.set("ldate", "0");
    if (tags) {
      const { realTags, orders } = tags.split(/\s/).reduce((acc, cur) => {
        cur.startsWith("order_by:") ? acc.orders.push(cur) : acc.realTags.push(cur);
        return acc;
      }, { realTags: [], orders: [] });
      realTags.length && url.searchParams.set("search_tag", realTags.join(" "));
      orders.length && url.searchParams.set("order_by", orders[0].split(":")[1]);
    }
    const resp = await fetch(url.href);
    const json = await resp.json();
    return json.posts.map((e) => {
      const fileExt = e.ext.slice(1);
      return {
        id: e.id,
        postView: `https://anime-pictures.net/posts/${e.id}`,
        previewUrl: `https://opreviews.anime-pictures.net/${e.md5.slice(0, 3)}/${e.md5}_cp.avif`,
        sampleUrl: `https://opreviews.anime-pictures.net/${e.md5.slice(0, 3)}/${e.md5}_bp.avif`,
        fileUrl: "",
        tags: [],
        width: e.width,
        height: e.height,
        aspectRatio: e.width / e.height,
        fileExt,
        fileDownloadName: `anime-pictures_${e.id}_${e.width}\xD7${e.height}.${fileExt}`,
        fileDownloadText: `${e.width}\xD7${e.height} [${(e.size / 1024 / 1024).toFixed(2)} MB] ${e.ext.slice(1).toUpperCase()}`,
        rating: e.erotics == 0 ? "s" : "q",
        createdAt: new Date(`${e.pubtime.replace(" ", "T")}Z`)
      };
    });
  }
  async function getAnimePicturesDetail(id) {
    try {
      const resp = await fetch(`https://api.anime-pictures.net/api/v3/posts/${id}`);
      const json = await resp.json();
      return {
        tags: json.tags.map((t) => `${t.tag.tag}${t.tag.tag_jp ? `[${t.tag.tag_jp}]` : ""}`),
        fileUrl: `https://api.anime-pictures.net/pictures/get_image/${json.file_url}`
      };
    } catch (error) {
      return { tags: [], fileUrl: "" };
    }
  }
  const animepictures = {
    is: isAnimePicturesPage,
    posts: fetchAnimePicturesPosts,
    detail: getAnimePicturesDetail
  };
  function getAugmentedNamespace(n) {
    if (n.__esModule)
      return n;
    var a = Object.defineProperty({}, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  function unfetch_module(e, n) {
    return n = n || {}, new Promise(function(t, r) {
      var s = new XMLHttpRequest(), o = [], u = [], i = {}, a = function() {
        return { ok: 2 == (s.status / 100 | 0), statusText: s.statusText, status: s.status, url: s.responseURL, text: function() {
          return Promise.resolve(s.responseText);
        }, json: function() {
          return Promise.resolve(s.responseText).then(JSON.parse);
        }, blob: function() {
          return Promise.resolve(new Blob([s.response]));
        }, clone: a, headers: { keys: function() {
          return o;
        }, entries: function() {
          return u;
        }, get: function(e2) {
          return i[e2.toLowerCase()];
        }, has: function(e2) {
          return e2.toLowerCase() in i;
        } } };
      };
      for (var l in s.open(n.method || "get", e, true), s.onload = function() {
        s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(e2, n2, t2) {
          o.push(n2 = n2.toLowerCase()), u.push([n2, t2]), i[n2] = i[n2] ? i[n2] + "," + t2 : t2;
        }), t(a());
      }, s.onerror = r, s.withCredentials = "include" == n.credentials, n.headers)
        s.setRequestHeader(l, n.headers[l]);
      s.send(n.body || null);
    });
  }
  var unfetch_module$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    "default": unfetch_module
  }, Symbol.toStringTag, { value: "Module" }));
  var require$$0 = /* @__PURE__ */ getAugmentedNamespace(unfetch_module$1);
  self.fetch || (self.fetch = require$$0.default || require$$0);
  var sites_default = {
    "yande.re": {
      domain: "yande.re",
      aliases: [
        "yd",
        "yand",
        "yandere"
      ],
      nsfw: true,
      api: {
        search: "/post.json?",
        postView: "/post/show/"
      },
      random: true
    },
    "konachan.com": {
      domain: "konachan.com",
      aliases: [
        "kc",
        "konac",
        "kcom"
      ],
      nsfw: true,
      api: {
        search: "/post.json?",
        postView: "/post/show/"
      },
      random: true
    },
    "konachan.net": {
      domain: "konachan.net",
      aliases: [
        "kn",
        "konan",
        "knet"
      ],
      nsfw: false,
      api: {
        search: "/post.json?",
        postView: "/post/show/"
      },
      random: true,
      defaultTags: [
        "rating:safe"
      ]
    },
    "danbooru.donmai.us": {
      domain: "danbooru.donmai.us",
      aliases: [
        "db",
        "dan",
        "danbooru"
      ],
      nsfw: true,
      api: {
        search: "/posts.json?",
        postView: "/posts/"
      },
      random: true
    },
    "gelbooru.com": {
      domain: "gelbooru.com",
      aliases: [
        "gb",
        "gel",
        "gelbooru"
      ],
      nsfw: true,
      api: {
        search: "/index.php?page=dapi&s=post&q=index&json=1&",
        postView: "/index.php?page=post&s=view&json=1&id="
      },
      paginate: "pid",
      random: false
    },
    "rule34.xxx": {
      domain: "api.rule34.xxx",
      aliases: [
        "r34",
        "rule34"
      ],
      nsfw: true,
      api: {
        search: "/index.php?page=dapi&s=post&q=index&json=1&",
        postView: "/index.php?page=post&s=view&json=1&id="
      },
      paginate: "pid",
      random: false
    },
    "lolibooru.moe": {
      domain: "lolibooru.moe",
      aliases: [
        "loli",
        "lolibooru"
      ],
      nsfw: true,
      api: {
        search: "/post.json?",
        postView: "/post/show/"
      },
      random: true
    },
    "www.sakugabooru.com": {
      domain: "www.sakugabooru.com",
      aliases: [
        "sakuga",
        "sakugabooru"
      ],
      nsfw: false,
      api: {
        search: "/post.json?",
        postView: "/post/show/"
      },
      random: true
    },
    "safebooru.org": {
      domain: "safebooru.org",
      aliases: [
        "sb",
        "safe",
        "safebooru"
      ],
      nsfw: false,
      api: {
        search: "/index.php?page=dapi&s=post&q=index&json=1&",
        postView: "/index.php?page=post&s=view&json=1&id="
      },
      paginate: "pid",
      random: false
    },
    "tbib.org": {
      domain: "tbib.org",
      aliases: [
        "tb",
        "tbib",
        "big"
      ],
      nsfw: true,
      api: {
        search: "/index.php?page=dapi&s=post&q=index&json=1&",
        postView: "/index.php?page=post&s=view&json=1&id="
      },
      paginate: "pid",
      random: false
    },
    "xbooru.com": {
      domain: "xbooru.com",
      aliases: [
        "xb",
        "xbooru"
      ],
      nsfw: true,
      api: {
        search: "/index.php?page=dapi&s=post&q=index&json=1&",
        postView: "/index.php?page=post&s=view&json=1&id="
      },
      paginate: "pid",
      random: false
    },
    "behoimi.org": {
      domain: "behoimi.org",
      aliases: [
        "3d",
        "3dbooru"
      ],
      nsfw: true,
      api: {
        search: "/post/index.json?",
        postView: "/post/show/"
      },
      insecure: true,
      random: true
    },
    "hypnohub.net": {
      domain: "hypnohub.net",
      aliases: [
        "hh",
        "hypno",
        "hypnohub"
      ],
      nsfw: true,
      api: {
        search: "/index.php?page=dapi&s=post&q=index&json=1&",
        postView: "/post/show/"
      },
      paginate: "pid",
      random: false
    },
    "rule34.paheal.net": {
      domain: "rule34.paheal.net",
      type: "xml",
      aliases: [
        "pa",
        "paheal"
      ],
      nsfw: true,
      api: {
        search: "/api/danbooru/find_posts?",
        postView: "/post/view/"
      },
      random: false
    },
    "derpibooru.org": {
      domain: "derpibooru.org",
      type: "derpi",
      aliases: [
        "dp",
        "derp",
        "derpi",
        "derpibooru"
      ],
      nsfw: true,
      api: {
        search: "/api/v1/json/search/images?",
        postView: "/images/"
      },
      tagQuery: "q",
      tagJoin: ",",
      random: "sf=random"
    },
    "realbooru.com": {
      domain: "realbooru.com",
      aliases: [
        "rb",
        "realbooru"
      ],
      nsfw: true,
      api: {
        search: "/index.php?page=dapi&s=post&q=index&json=1&",
        postView: "/index.php?page=post&s=view&id="
      },
      paginate: "pid",
      random: false
    },
    "e621.net": {
      domain: "e621.net",
      aliases: [
        "e6",
        "e621"
      ],
      nsfw: true,
      api: {
        search: "/posts.json?",
        postView: "/post/show/"
      },
      random: true
    },
    "e926.net": {
      domain: "e926.net",
      aliases: [
        "e9",
        "e926"
      ],
      nsfw: false,
      api: {
        search: "/posts.json?",
        postView: "/post/show/"
      },
      random: true,
      defaultTags: ["rating:safe"]
    },
    "booru.allthefallen.moe": {
      domain: "booru.allthefallen.moe",
      aliases: [
        "atf",
        "atfbooru"
      ],
      nsfw: true,
      api: {
        search: "/posts.json?",
        postView: "/posts/"
      },
      random: true
    },
    "aibooru.online": {
      domain: "aibooru.online",
      aliases: [
        "ai",
        "aibooru"
      ],
      nsfw: true,
      api: {
        search: "/posts.json?",
        postView: "/posts/"
      },
      random: true
    }
  };
  var expandedTags = {
    "rating:e": "rating:explicit",
    "rating:q": "rating:questionable",
    "rating:s": "rating:safe"
  };
  var sites = sites_default;
  var BooruError = class extends Error {
    constructor(message2) {
      super(message2 instanceof Error ? message2.message : message2);
      if (message2 instanceof Error) {
        this.stack = message2.stack;
      } else {
        Error.captureStackTrace(this, BooruError);
      }
      this.name = "BooruError";
    }
  };
  function expandTags(tags) {
    return tags.map((v) => {
      const ex = expandedTags[v.toLowerCase()];
      return encodeURIComponent(ex ? ex : v);
    });
  }
  function searchURI(site, tags = [], limit = 100, page = 1, credentials) {
    if (site.paginate === "pid")
      page -= 1;
    let credentialsQuery = "";
    if (credentials == null ? void 0 : credentials.query) {
      const q = credentials.query;
      credentialsQuery = q.startsWith("&") ? q : "&" + q;
    }
    let uri = `http${site.insecure ? "" : "s"}://${site.domain}${site.api.search}${site.tagQuery}=${expandTags(tags).join(site.tagJoin)}&limit=${limit}&${site.paginate}=${page}${credentialsQuery}`;
    if (typeof BOORU_FETCH_PROXY === "function") {
      uri = BOORU_FETCH_PROXY(uri) || uri;
    }
    return uri;
  }
  var defaultOptions = {
    headers: {
      Accept: "application/json, application/xml;q=0.9, */*;q=0.8",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0"
    }
  };
  function resolveSite(domain2) {
    if (typeof domain2 !== "string") {
      return null;
    }
    domain2 = domain2.toLowerCase();
    for (const site in sites) {
      if (site === domain2 || sites[site].domain === domain2 || sites[site].aliases.includes(domain2)) {
        return site;
      }
    }
    return null;
  }
  var xmlParser = new fastXmlParser.XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: ""
  });
  function jsonfy(xml) {
    var _a2;
    if (typeof xml === "object")
      return xml;
    const data = xmlParser.parse(xml);
    if (data.html || data["!doctype"]) {
      const page = data.html || ((_a2 = data["!doctype"]) == null ? void 0 : _a2.html);
      const message2 = [];
      if (page.body.h1) {
        message2.push(page.body.h1);
      }
      if (page.body.p) {
        message2.push(page.body.p["#text"]);
      }
      throw new BooruError(
        `The Booru sent back an error: '${message2.join(": ")}'`
      );
    }
    if (data.posts.post) {
      return data.posts.post;
    }
    if (data.posts.tag) {
      return Array.isArray(data.posts.tag) ? data.posts.tag : [data.posts.tag];
    }
    return [];
  }
  function tryParseJSON(data) {
    if (data === "") {
      return [];
    }
    return JSON.parse(data);
  }
  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  function compareArrays(arr1, arr2) {
    return arr1.filter(
      (e1) => arr2.some((e2) => e1.toLowerCase() === e2.toLowerCase())
    );
  }
  function parseImageUrl(url, data, booru, type = "file") {
    var _a2;
    if (!url || url.trim() === "" || data.is_deleted) {
      return null;
    }
    if (url.startsWith("/data")) {
      url = `https://${booru.domain}${url}`;
    }
    if (url.startsWith("/cached")) {
      url = `https://${booru.domain}${url}`;
    }
    if (url.startsWith("/_images")) {
      url = `https://dollbooru.org${url}`;
    }
    if (url.startsWith("//derpicdn.net")) {
      url = `https:${data.image}`;
    }
    if (!data[`${type}_url`] && data.directory !== void 0) {
      const directory = (_a2 = data.directory) != null ? _a2 : `${data.hash.substr(0, 2)}/${data.hash.substr(2, 2)}`;
      const hash = data.image.split(".")[0];
      const map = {
        preview: `//${booru.domain}/thumbnails/${directory}/thumbnail_${hash}.jpg`,
        sample: `//${booru.domain}/samples/${directory}/sample_${hash}.jpg`,
        file: `//${booru.domain}/images/${directory}/${data.image}`
      };
      url = map[type];
    }
    if (!url.startsWith("http")) {
      url = `https:${url}`;
    }
    return encodeURI(url);
  }
  function getTags(data) {
    let tags = [];
    if (Array.isArray(data.tags)) {
      tags = data.tags;
    } else if (data.tags && data.tags.general) {
      tags = Object.values(data.tags).reduce(
        (acc, v) => acc = acc.concat(v),
        []
      );
    } else if (typeof data.tags === "string") {
      tags = fromTagString(data.tags);
    } else if (typeof data.tag_string === "string") {
      tags = fromTagString(data.tag_string);
    }
    return tags.filter((v) => v !== "");
  }
  function fromTagString(tags) {
    return tags.split(" ").map((v) => v.replace(/,/g, ""));
  }
  function formatFileSize(size) {
    if (size == null)
      return "N/A";
    if (size > 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + "MB";
    }
    if (size > 1024) {
      return (size / 1024).toFixed(2) + "KB";
    }
    return size.toFixed(2) + "B";
  }
  function getFileExt(url) {
    var _a2;
    return (_a2 = url == null ? void 0 : url.split(".").pop()) != null ? _a2 : "";
  }
  function dealDanbooruPreviewUrl(url, booru) {
    if ([
      "danbooru.donmai.us",
      "aibooru.online"
    ].includes(booru.domain)) {
      return url && url.replace(/(.*)preview(.*)jpg/, "$1720x720$2webp");
    }
    return url;
  }
  var Post = class {
    constructor(data, booru) {
      __publicField(this, "booru");
      __publicField(this, "fileUrl");
      __publicField(this, "height");
      __publicField(this, "width");
      __publicField(this, "sampleUrl");
      __publicField(this, "sampleHeight");
      __publicField(this, "sampleWidth");
      __publicField(this, "previewUrl");
      __publicField(this, "previewHeight");
      __publicField(this, "previewWidth");
      __publicField(this, "id");
      __publicField(this, "available");
      __publicField(this, "tags");
      __publicField(this, "score");
      __publicField(this, "source");
      __publicField(this, "rating");
      __publicField(this, "createdAt");
      __publicField(this, "data");
      this.data = data;
      this.booru = booru;
      const deletedOrBanned = data.is_deleted || data.is_banned;
      this.fileUrl = parseImageUrl(
        data.file_url || data.image || (deletedOrBanned ? data.source : void 0) || data.file && data.file.url || data.representations && data.representations.full,
        data,
        booru
      );
      this.available = !deletedOrBanned && this.fileUrl !== null;
      this.height = parseInt(
        data.height || data.image_height || data.file && data.file.height,
        10
      );
      this.width = parseInt(
        data.width || data.image_width || data.file && data.file.width,
        10
      );
      this.sampleUrl = parseImageUrl(
        data.sample_url || data.large_file_url || data.representations && data.representations.large || data.sample && data.sample.url || data.image,
        data,
        booru,
        "sample"
      );
      this.sampleHeight = parseInt(
        data.sample_height || data.sample && data.sample.height,
        10
      );
      this.sampleWidth = parseInt(
        data.sample_width || data.sample && data.sample.width,
        10
      );
      this.previewUrl = parseImageUrl(
        data.preview_url || dealDanbooruPreviewUrl(data.preview_file_url, booru) || data.representations && data.representations.small || data.preview && data.preview.url || data.image,
        data,
        booru,
        "preview"
      );
      this.previewHeight = parseInt(
        data.preview_height || data.preview && data.preview.height,
        10
      );
      this.previewWidth = parseInt(
        data.preview_width || data.preview && data.preview.width,
        10
      );
      this.id = data.id ? data.id.toString() : "No ID available";
      this.tags = getTags(data);
      if (data.score && data.score.total) {
        this.score = data.score.total;
      } else {
        this.score = data.score ? parseInt(data.score, 10) : data.score;
      }
      this.source = data.source || data.sources || data.source_url;
      this.rating = data.rating || /(safe|suggestive|questionable|explicit)/i.exec(data.tags) || "u";
      if (Array.isArray(this.rating)) {
        this.rating = this.rating[0];
      }
      if (this.rating === "suggestive") {
        this.rating = "q";
      }
      this.rating = this.rating.charAt(0);
      this.createdAt = null;
      if (typeof data.created_at === "object") {
        this.createdAt = new Date(
          data.created_at.s * 1e3 + data.created_at.n / 1e9
        );
      } else if (typeof data.created_at === "number") {
        this.createdAt = new Date(data.created_at * 1e3);
      } else if (typeof data.created_at === "string") {
        this.createdAt = new Date(data.created_at);
      } else if (typeof data.change === "number") {
        this.createdAt = new Date(data.change * 1e3);
      } else {
        this.createdAt = new Date(data.created_at || data.date);
      }
    }
    get isRatingS() {
      return this.rating === "s";
    }
    get isRatingQ() {
      return this.rating === "q";
    }
    get isRatingE() {
      return this.rating === "e";
    }
    get aspectRatio() {
      return this.width / this.height;
    }
    get jpegUrl() {
      var _a2;
      return (_a2 = this.data.jpeg_url) != null ? _a2 : "";
    }
    get jpegWidth() {
      var _a2;
      return (_a2 = this.data.jpeg_width) != null ? _a2 : 0;
    }
    get jpegHeight() {
      var _a2;
      return (_a2 = this.data.jpeg_height) != null ? _a2 : 0;
    }
    get fileExt() {
      var _a2;
      return (_a2 = this.data.file_ext) != null ? _a2 : getFileExt(this.fileUrl);
    }
    get sampleSize() {
      var _a2;
      return (_a2 = this.data.sample_file_size) != null ? _a2 : 0;
    }
    get jpegSize() {
      var _a2;
      return (_a2 = this.data.jpeg_file_size) != null ? _a2 : 0;
    }
    get fileSize() {
      var _a2;
      return (_a2 = this.data.file_size) != null ? _a2 : 0;
    }
    get sampleSizeText() {
      return formatFileSize(this.data.sample_file_size);
    }
    get sampleDownloadText() {
      return `${this.sampleWidth}\xD7${this.sampleHeight} [${this.sampleSizeText}] ${getFileExt(this.sampleUrl).toUpperCase()}`;
    }
    get sampleDownloadName() {
      return `${this.booru.domain}.${this.id}.${this.sampleWidth}x${this.sampleHeight}`.replace(/\./g, "_");
    }
    get jpegSizeText() {
      return formatFileSize(this.data.jpeg_file_size);
    }
    get jpegDownloadText() {
      return `${this.jpegWidth}\xD7${this.jpegHeight} [${this.jpegSizeText}] ${getFileExt(this.jpegUrl).toUpperCase()}`;
    }
    get jpegDownloadName() {
      return `${this.booru.domain}.${this.id}.${this.jpegWidth}x${this.jpegHeight}`.replace(/\./g, "_");
    }
    get fileSizeText() {
      return formatFileSize(this.data.file_size);
    }
    get fileDownloadText() {
      return `${this.width}\xD7${this.height} [${this.fileSizeText}] ${this.fileExt.toUpperCase()}`;
    }
    get fileDownloadName() {
      return `${this.booru.domain}.${this.id}.${this.width}x${this.height}`.replace(/\./g, "_");
    }
    get createdTime() {
      const date = this.createdAt;
      if (!date)
        return "";
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString("en-DE")}`;
    }
    get sourceUrl() {
      const source = Array.isArray(this.source) ? this.source[0] : this.source;
      if (!source)
        return "";
      if (/^https:\/\/i\.pximg\.net\/img-original\/img\/[\d/]{19}\/([\d]{1,})_p[\d]{1,}\.(jpg|png)$/.test(source)) {
        const pid = RegExp.$1;
        return `https://pixiv.net/artworks/${pid}`;
      }
      return source;
    }
    get postView() {
      return this.booru.postView(this.id);
    }
  };
  var SearchResults = class extends Array {
    constructor(posts, tags, options, booru) {
      super(posts.length);
      __publicField(this, "booru");
      __publicField(this, "page");
      __publicField(this, "tags");
      __publicField(this, "options");
      __publicField(this, "posts");
      for (let i = 0; i < posts.length; i++) {
        this[i] = posts[i];
      }
      this.posts = posts;
      this.tags = tags;
      this.options = options;
      this.booru = booru;
      this.page = options ? options.page || 0 : 0;
    }
    get first() {
      return this[0];
    }
    get last() {
      return this[this.length - 1];
    }
    nextPage() {
      const opts = this.options;
      opts.page = this.page + 1;
      return this.booru.search(this.tags, opts);
    }
    tagged(tags, { invert = false } = {}) {
      if (!Array.isArray(tags)) {
        tags = [tags];
      }
      const posts = [];
      for (const p of this) {
        const m = compareArrays(tags, p.tags).length;
        if (!invert && m > 0 || invert && m === 0) {
          posts.push(p);
        }
      }
      return new SearchResults(posts, this.tags, this.options, this.booru);
    }
    blacklist(tags) {
      return this.tagged(tags, { invert: true });
    }
  };
  var Booru = class {
    constructor(site, credentials) {
      __publicField(this, "domain");
      __publicField(this, "site");
      __publicField(this, "credentials");
      const domain2 = resolveSite(site.domain);
      if (domain2 === null) {
        throw new Error(`Invalid site passed: ${site}`);
      }
      this.domain = domain2;
      this.site = site;
      this.credentials = credentials;
    }
    normalizeTags(tags) {
      if (!Array.isArray(tags)) {
        return [tags];
      } else {
        return tags.slice();
      }
    }
    async search(tags, {
      limit = 1,
      random = false,
      page = 1,
      showUnavailable = false,
      credentials
    } = {}) {
      const fakeLimit = random && !this.site.random ? 100 : 0;
      const tagArray = this.normalizeTags(tags);
      try {
        const searchResult = await this.doSearchRequest(tagArray, {
          limit,
          random,
          page,
          showUnavailable,
          credentials: credentials || this.credentials
        });
        return this.parseSearchResult(searchResult, {
          fakeLimit,
          tags: tagArray,
          limit,
          random,
          page,
          showUnavailable
        });
      } catch (err) {
        if (err instanceof Error) {
          throw new BooruError(err);
        } else {
          throw err;
        }
      }
    }
    postView(id) {
      if (typeof id === "string" && Number.isNaN(parseInt(id, 10))) {
        throw new BooruError(`Not a valid id for postView: ${id}`);
      }
      return `http${this.site.insecure ? "" : "s"}://${this.domain}${this.site.api.postView}${id}`;
    }
    async doSearchRequest(tags, {
      uri = null,
      limit = 1,
      random = false,
      page = 1,
      credentials
    } = {}) {
      let fakeLimit;
      if (random) {
        if (this.site.random) {
          tags.push("order:random");
        } else {
          fakeLimit = 100;
        }
      }
      if (this.site.defaultTags) {
        tags = tags.concat(this.site.defaultTags.filter((v) => !tags.includes(v)));
      }
      const fetchuri = uri || this.getSearchUrl({ tags, limit: fakeLimit || limit, page, credentials });
      const options = defaultOptions;
      const xml = this.site.type === "xml";
      try {
        const response = await fetch(fetchuri, options);
        if (response.status === 503) {
          const body = await response.clone().text();
          if (body.includes("cf-browser-verification")) {
            throw new BooruError(
              "Received a CloudFlare browser verification request. Can't proceed."
            );
          }
        }
        const data = await response.text();
        const posts = xml ? jsonfy(data) : tryParseJSON(data);
        if (!response.ok) {
          throw new BooruError(
            `Received HTTP ${response.status} from booru: '${posts.error || posts.message || JSON.stringify(posts)}'`
          );
        } else {
          return posts;
        }
      } catch (err) {
        if (err.type === "invalid-json")
          return "";
        throw err;
      }
    }
    getSearchUrl({
      tags = [],
      limit = 100,
      page = 1,
      credentials
    }) {
      return searchURI(this.site, tags, limit, page, credentials);
    }
    parseSearchResult(result, {
      fakeLimit,
      tags,
      limit,
      random,
      page,
      showUnavailable
    }) {
      if (result.success === false) {
        throw new BooruError(result.message || result.reason);
      }
      if (result["@attributes"]) {
        const attributes = result["@attributes"];
        if (attributes.count === "0" || !result.post) {
          result = [];
        } else if (Array.isArray(result.post)) {
          result = result.post;
        } else {
          result = [result.post];
        }
      }
      if (result.posts) {
        result = result.posts;
      }
      if (result.images) {
        result = result.images;
      }
      let r;
      if (result === "") {
        r = [];
      } else if (fakeLimit) {
        r = shuffle(result);
      } else if (result.constructor === Object) {
        r = [result];
      }
      const results = r || result;
      let posts = results.slice(0, limit).map((v) => new Post(v, this));
      const options = { limit, random, page, showUnavailable };
      if (tags === void 0) {
        tags = [];
      }
      if (!showUnavailable) {
        posts = posts.filter((p) => p.available);
      }
      return new SearchResults(posts, tags, options, this);
    }
  };
  var Booru_default = Booru;
  var Derpibooru = class extends Booru_default {
    constructor(site, credentials) {
      super(site, credentials);
    }
    search(tags, { limit = 1, random = false, page = 0 } = {}) {
      const tagArray = this.normalizeTags(tags);
      if (tags[0] === void 0) {
        tagArray[0] = "*";
      }
      page += 1;
      const uri = this.getSearchUrl({ tags: tagArray, limit, page }) + (random && this.site.random === "string" ? `&${this.site.random}` : "") + (this.credentials ? `&key=${this.credentials.token}` : "");
      return super.doSearchRequest(tagArray, { limit, random, page, uri }).then(
        (r) => super.parseSearchResult(r, { fakeLimit: 0, tags: tagArray, limit, random, page })
      ).catch((e) => Promise.reject(new BooruError(e)));
    }
  };
  var XmlBooru = class extends Booru_default {
    constructor(site, credentials) {
      super(site, credentials);
    }
  };
  var Site = class {
    constructor(data) {
      __publicField(this, "domain");
      __publicField(this, "type");
      __publicField(this, "aliases");
      __publicField(this, "nsfw");
      __publicField(this, "api");
      __publicField(this, "paginate");
      __publicField(this, "random");
      __publicField(this, "tagQuery");
      __publicField(this, "tagJoin");
      __publicField(this, "insecure");
      __publicField(this, "defaultTags");
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
      this.domain = data.domain;
      this.type = (_a2 = data.type) != null ? _a2 : "json";
      this.aliases = (_b = data.aliases) != null ? _b : [];
      this.nsfw = data.nsfw;
      this.api = (_c = data.api) != null ? _c : {};
      this.paginate = (_d = data.paginate) != null ? _d : "page";
      this.random = (_e = data.random) != null ? _e : false;
      this.tagQuery = (_f = data.tagQuery) != null ? _f : "tags";
      this.tagJoin = (_g = data.tagJoin) != null ? _g : "+";
      this.insecure = (_h = data.insecure) != null ? _h : false;
      this.defaultTags = (_i = data.defaultTags) != null ? _i : [];
    }
  };
  var BooruTypes = {
    derpi: Derpibooru,
    xml: XmlBooru
  };
  var booruCache = {};
  function booruFrom(booruSite, credentials) {
    return new (booruSite.type !== void 0 && BooruTypes[booruSite.type] ? BooruTypes[booruSite.type] : Booru_default)(booruSite, credentials);
  }
  function booruForSite(site, credentials = null) {
    const rSite = resolveSite(site);
    if (!rSite)
      throw new BooruError("Site not supported");
    const booruSite = new Site(sites[rSite]);
    return booruFrom(booruSite, credentials);
  }
  function search(site, tags = [], { limit = 1, random = false, page = 1, credentials } = {}) {
    const rSite = resolveSite(site);
    if (typeof limit === "string") {
      limit = parseInt(limit, 10);
    }
    if (rSite === null) {
      throw new BooruError("Site not supported");
    }
    if (!Array.isArray(tags) && typeof tags !== "string") {
      throw new BooruError("`tags` should be an array or string");
    }
    if (typeof limit !== "number" || Number.isNaN(limit)) {
      throw new BooruError("`limit` should be an int");
    }
    const booruSite = new Site(sites[rSite]);
    if (!booruCache[rSite]) {
      booruCache[rSite] = booruFrom(booruSite);
    }
    return booruCache[rSite].search(tags, { limit, random, page, credentials });
  }
  function isSankakuComplexPage() {
    return location.hostname == "chan.sankakucomplex.com";
  }
  const state = {
    base: "https://chan.sankakucomplex.com/cn/posts?auto_page=t",
    nextUrl: null
  };
  const ratingMap = {
    "G": "s",
    "R15+": "q",
    "R18+": "e"
  };
  async function fetchSankakuComplexPosts(page, tags) {
    var _a2, _b;
    const w = unsafeWindow;
    w.$.ajax = () => {
    };
    w.jQuery.ajax = () => {
    };
    if (page == 1) {
      state.nextUrl = null;
      document.documentElement.scrollTop = 0;
    }
    const url = new URL(state.nextUrl ? `https://chan.sankakucomplex.com${state.nextUrl}` : state.base);
    url.searchParams.set("auto_page", "t");
    url.searchParams.set("page", `${page}`);
    !state.nextUrl && tags && url.searchParams.set("tags", tags);
    const htmlResp = await fetch(url.href);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    state.nextUrl = (_b = (_a2 = doc.querySelector("body > div[next-page-url]")) == null ? void 0 : _a2.getAttribute("next-page-url")) == null ? void 0 : _b.replace(/amp;/g, "");
    const results = [...doc.querySelectorAll(".post-gallery .post-preview")].map((el) => {
      var _a3;
      const id = el.getAttribute("data-id");
      const img = el.querySelector("img");
      const tagsText = (img == null ? void 0 : img.getAttribute("data-auto_page")) || "";
      const tagsArr = tagsText.split(/\s/) || [];
      const [_, width, height] = tagsText.match(/Size:(\d+)x(\d+)/) || [];
      const [__, ratingText] = tagsText.match(/Rating:(\S+)/) || [];
      return {
        id,
        postView: (_a3 = el.querySelector("a")) == null ? void 0 : _a3.href,
        previewUrl: img == null ? void 0 : img.src,
        fileUrl: "",
        tags: tagsArr,
        width: Number(width),
        height: Number(height),
        aspectRatio: Number(width) / Number(height),
        fileExt: el.querySelector(".animated_details") ? "mp4" : "jpg",
        fileDownloadName: `sankaku-complex ${id} ${tagsArr.join(" ")}`,
        fileDownloadText: `${width}\xD7${height}`,
        rating: ratingMap[ratingText] || ratingText
      };
    });
    return results;
  }
  async function getSankakuComplexDetail(id) {
    var _a2, _b, _c;
    const url = new URL(`https://chan.sankakucomplex.com/cn/posts/${id}`);
    const htmlResp = await fetch(url.href);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const imgSrc = (_a2 = doc.querySelector("#post-content img")) == null ? void 0 : _a2.src;
    const fileUrl = (_b = doc.querySelector("#post-content a")) == null ? void 0 : _b.href;
    const videoSrc = (_c = doc.querySelector("#post-content video")) == null ? void 0 : _c.src;
    return {
      sampleUrl: imgSrc,
      fileUrl: fileUrl || imgSrc || videoSrc
    };
  }
  function isSankakuIdolPage() {
    return location.hostname == "www.idolcomplex.com";
  }
  const pageState$1 = { next: null };
  async function fetchSankakuIdolPosts(page, tags) {
    if (page == 1)
      pageState$1.next = null;
    const url = new URL("https://i.sankakuapi.com/v2/posts/keyset");
    url.searchParams.set("lang", navigator.language || "zh-CN");
    url.searchParams.set("default_threshold", "1");
    url.searchParams.set("hide_posts_in_books", "in-larger-tags");
    url.searchParams.set("limit", "40");
    url.searchParams.set("page", `${page}`);
    pageState$1.next && url.searchParams.set("next", `${pageState$1.next}`);
    tags && url.searchParams.set("tags", tags);
    const resp = await fetch(url.href, {
      headers: {
        "api-version": "2",
        "client-type": "non-premium",
        "platform": "web-app",
        "priority": "u=1, i"
      }
    });
    const json = await resp.json();
    pageState$1.next = json.meta.next;
    return json.data.filter((e) => e.preview_url).map((e) => {
      const fileExt = e.file_ext;
      return {
        id: e.id,
        postView: `https://www.idolcomplex.com/posts/${e.id}`,
        previewUrl: e.preview_url,
        fileUrl: "",
        tags: e.tags.map((t) => t.name + (t.name_ja ? `[${t.name_ja}]` : "")),
        width: e.width,
        height: e.height,
        aspectRatio: e.width / e.height,
        fileExt,
        fileDownloadName: `sankaku ${e.id} ${e.tags.join(" ")}.${fileExt}`,
        fileDownloadText: `${e.width}\xD7${e.height} [${(e.file_size / 1e3).toFixed(0)} kB] ${fileExt.toUpperCase()}`,
        rating: e.rating,
        createdAt: e.created_at.s * 1e3
      };
    });
  }
  async function getSankakuIdolDetail(id) {
    const resp = await fetch(`https://i.sankakuapi.com/posts/${id}/fu?lang=${navigator.language || "zh-CN"}`, {
      headers: {
        "api-version": "2",
        "client-type": "non-premium",
        "platform": "web-app",
        "priority": "u=1, i"
      }
    });
    const json = await resp.json();
    return {
      sampleUrl: json.data.sample_url,
      fileUrl: json.data.file_url
    };
  }
  const isSankakuSite = location.host.includes("sankaku") || location.host.includes("idolcomplex");
  function isSankakuPage() {
    return location.hostname == "sankaku.app" || location.hostname == "www.sankakucomplex.com";
  }
  const pageState = { next: null };
  async function fetchSankakuPosts(page, tags) {
    if (page == 1)
      pageState.next = null;
    const url = new URL("https://sankakuapi.com/v2/posts/keyset");
    url.searchParams.set("lang", navigator.language || "zh-CN");
    url.searchParams.set("default_threshold", "1");
    url.searchParams.set("hide_posts_in_books", "in-larger-tags");
    url.searchParams.set("limit", "40");
    url.searchParams.set("page", `${page}`);
    pageState.next && url.searchParams.set("next", `${pageState.next}`);
    tags && url.searchParams.set("tags", tags);
    const resp = await fetch(url.href, {
      headers: {
        "api-version": "2",
        "client-type": "non-premium",
        "platform": "web-app",
        "priority": "u=1, i"
      }
    });
    const json = await resp.json();
    pageState.next = json.meta.next;
    return json.data.filter((e) => e.preview_url).map((e) => {
      const fileExt = e.file_ext;
      return {
        id: e.id,
        postView: `https://sankaku.app/posts/${e.id}`,
        previewUrl: e.preview_url,
        fileUrl: "",
        tags: e.tags.map((t) => t.name + (t.name_ja ? `[${t.name_ja}]` : "")),
        width: e.width,
        height: e.height,
        aspectRatio: e.width / e.height,
        fileExt,
        fileDownloadName: `sankaku ${e.id} ${e.tags.join(" ")}.${fileExt}`,
        fileDownloadText: `${e.width}\xD7${e.height} [${(e.file_size / 1e3).toFixed(0)} kB] ${fileExt.toUpperCase()}`,
        rating: e.rating,
        createdAt: e.created_at.s * 1e3
      };
    });
  }
  async function getSankakuDetail(id) {
    const resp = await fetch(`https://sankakuapi.com/posts/${id}/fu?lang=${navigator.language || "zh-CN"}`, {
      headers: {
        "api-version": "2",
        "client-type": "non-premium",
        "platform": "web-app",
        "priority": "u=1, i"
      }
    });
    const json = await resp.json();
    return {
      sampleUrl: json.data.sample_url,
      fileUrl: json.data.file_url
    };
  }
  const sankaku = {
    is: isSankakuPage,
    posts: fetchSankakuPosts,
    detail: getSankakuDetail,
    idol: {
      is: isSankakuIdolPage,
      posts: fetchSankakuIdolPosts,
      detail: getSankakuIdolDetail
    },
    complex: {
      is: isSankakuComplexPage,
      posts: fetchSankakuComplexPosts,
      detail: getSankakuComplexDetail
    }
  };
  const blackList = /* @__PURE__ */ new Set(["e621.net", "e926.net", "hypnohub.net", "derpibooru.org", "realbooru.com"]);
  const siteKeys = Object.keys(sites).filter((e) => !blackList.has(e));
  const isBooruSite = () => siteKeys.includes(location.host);
  const siteDomains = [
    ...siteKeys,
    "e-shuushuu.net",
    "zerochan.net",
    "chan.sankakucomplex.com",
    "www.idolcomplex.com",
    "sankaku.app",
    "anime-pictures.net",
    "allgirl.booru.org",
    "booru.eu",
    "kusowanka.com",
    "anihonetwallpaper.com",
    "nozomi.la",
    "realbooru.com",
    "rule34hentai.net"
  ];
  const isSupportTagSearch = isBooruSite() || !["e-shuushuu.net", "nozomi.la"].includes(location.host);
  const notPartialSupportSite = ![
    "e-shuushuu.net",
    "www.zerochan.net",
    "www.idolcomplex.com",
    "allgirl.booru.org",
    "booru.eu",
    "kusowanka.com",
    "anihonetwallpaper.com",
    "nozomi.la",
    "realbooru.com",
    "rule34hentai.net"
  ].includes(location.host);
  const defCompTags = (() => {
    if (store.isYKSite) {
      return ["rating:s", "rating:q", "rating:e", "order:score", "order:vote", "order:mpixels", "order:landscape", "order:portrait"];
    }
    if (isSankakuSite) {
      return ["order:quality", "order:popularity", "order:random", "order:recently_favorited", "order:recently_voted", "rating:s", "rating:q", "rating:e", "threshold:0", "threshold:1", "threshold:2", "threshold:3", "threshold:4", "threshold:5", "sankaku_ai order:popular"];
    }
    if (animepictures.is()) {
      return ["order_by:date", "order_by:date_r", "order_by:rating", "order_by:views", "order_by:size", "order_by:tag_num"];
    }
    if (location.host.includes("danbooru")) {
      return ["order:rank", "order:score", "order:favcount", "order:none", "order:upvotes", "rating:general", "rating:questionable", "rating:explicit", "rating:sensitive", "order:landscape", "order:portrait", "order:mpixels"];
    }
    if (/gelbooru\.com|rule34\.xxx/.test(location.host)) {
      return ["rating:safe", "rating:questionable", "rating:explicit", "sort:score"];
    }
    return [];
  })();
  const specTitleMap = {
    "yande.re": "yande.re",
    "konachan.com": "Koanchan",
    "konachan.net": "Koanchan(Safe)",
    "sakugabooru.com": "sakugabooru".toUpperCase(),
    "behoimi.org": "3dbooru",
    "rule34.paheal.net": "Rule34.Paheal",
    "booru.allthefallen.moe": "ATFBooru",
    "aibooru.online": "AIBooru",
    "sankaku.app": "Sankaku APP",
    "www.sankakucomplex.com": "Sankaku Complex",
    "chan.sankakucomplex.com": "Sankaku Complex",
    "www.idolcomplex.com": "Idol Complex",
    "anime-pictures.net": "Anime Pictures",
    "allgirl.booru.org": "All girl",
    "booru.eu": "Hentai Booru",
    "rule34hentai.net": "Rule34Hentai"
  };
  function getSiteTitle(domain2 = location.host) {
    const host = domain2.toLowerCase().replace("www.", "");
    return specTitleMap[host] || host[0].toUpperCase() + host.slice(1).split(".")[0];
  }
  const defaultLimitMap = {
    "yande.re": 40,
    "konachan.com": 21,
    "konachan.net": 21,
    "danbooru.donmai.us": 20,
    "gelbooru.com": 42,
    "rule34.xxx": 42,
    "safebooru.org": 40,
    "tbib.org": 42,
    "xbooru.com": 42,
    "rule34.paheal.net": 70,
    "realbooru.com": 42
  };
  const BOORU_PAGE_LIMIT = defaultLimitMap[location.host] || 40;
  const isPidSite = () => {
    var _a2;
    return ((_a2 = sites[location.host]) == null ? void 0 : _a2.paginate) === "pid" || realbooru.is();
  };
  async function searchBooru(page, tags) {
    if (!tags || tags === "all")
      tags = "";
    return search(location.host, tags, {
      page,
      limit: BOORU_PAGE_LIMIT,
      credentials: {
        query: settings.credentialQuery
      }
    });
  }
  const booruAction = {
    is: isBooruSite,
    posts: async (page, tags) => {
      if (settings.isHoldsFalse)
        tags = `holds:false ${tags || ""}`.trim();
      const results = await searchBooru(page, tags);
      if (rule34.is()) {
        results.forEach((e) => {
          const re = /api-cdn[^.]*\./;
          if (e.previewUrl)
            e.previewUrl = e.previewUrl.replace(re, "");
          if (e.sampleUrl)
            e.sampleUrl = e.sampleUrl.replace(re, "");
          if (e.fileUrl)
            e.fileUrl = e.fileUrl.replace(re, "");
        });
      }
      if (location.hostname == "xbooru.com") {
        results.forEach((e) => {
          const args = [/api-cdn(-mp4)?\.rule34\.xxx/, "xbooru.com"];
          if (e.previewUrl)
            e.previewUrl = e.previewUrl.replace(...args);
          if (e.sampleUrl)
            e.sampleUrl = e.sampleUrl.replace(...args);
          if (e.fileUrl)
            e.fileUrl = e.fileUrl.replace(...args);
        });
      }
      return results;
    }
  };
  function isEshuushuuPage() {
    return location.hostname == "e-shuushuu.net";
  }
  async function fetchEshuushuuPosts(page) {
    const url = new URL("https://e-shuushuu.net");
    url.searchParams.set("page", page.toString());
    const htmlResp = await fetch(url.href);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const results = [...doc.querySelectorAll("#content .image_thread")].map((el) => {
      var _a2, _b, _c, _d, _e, _f, _g;
      const id = (_a2 = el.getAttribute("id")) == null ? void 0 : _a2.slice(1);
      const fileUrl = (_b = el.querySelector(".thumb_image")) == null ? void 0 : _b.href;
      const fileExt = fileUrl == null ? void 0 : fileUrl.split(".").pop();
      const tags = [...el.querySelectorAll(".quicktag")].map((e) => e.innerText.replace(/[\t\n]/g, "")).join("").split('"').filter((e) => e.trim()).map((e) => e.replace(/\s/g, "_"));
      const [_, width, height] = ((_c = el.querySelector(".meta dl dd:nth-child(8)")) == null ? void 0 : _c.innerText.match(/(\d+)x(\d+)/)) || [];
      const date = (_d = el.querySelector(".meta dl dd:nth-child(4)")) == null ? void 0 : _d.innerText;
      return {
        id,
        postView: (_e = el.querySelector(".title a")) == null ? void 0 : _e.href,
        previewUrl: (_f = el.querySelector(".thumb_image img")) == null ? void 0 : _f.src,
        fileUrl,
        tags,
        width: Number(width),
        height: Number(height),
        aspectRatio: Number(width) / Number(height),
        fileExt,
        fileDownloadName: `e-shuushuu ${id} ${tags.join(" ")}.${fileExt}`,
        fileDownloadText: `${width}\xD7${height} [${(_g = el.querySelector(".meta dl dd:nth-child(6)")) == null ? void 0 : _g.innerText.replace(/[\t\n]/g, "")}] ${fileExt == null ? void 0 : fileExt.toUpperCase()}`,
        rating: "",
        createdAt: date && parse(date, "MMMM do, yyyy h:mm a", new Date())
      };
    });
    return results;
  }
  const eshuushuu = {
    is: isEshuushuuPage,
    posts: fetchEshuushuuPosts
  };
  function isGelbooruFavPage() {
    return /gelbooru\.com\/index\.php\?page\=favorites\&s\=view/.test(location.href);
  }
  function isGelbooruPage() {
    return /gelbooru\.com\/index\.php\?page\=post\&s\=list/.test(location.href) && !settings.credentialQuery;
  }
  async function fetchGelbooruPosts(page) {
    const url = new URL(location.href);
    url.searchParams.set("pid", `${(page - 1) * 42}`);
    const htmlResp = await fetch(url.href);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const results = [...doc.querySelectorAll(".thumbnail-container .thumbnail-preview")].map(async (el) => {
      var _a2, _b, _c, _d;
      const img = el.querySelector("img");
      const imgSrc = (img == null ? void 0 : img.src) || "";
      const postView = (_a2 = el.querySelector("a")) == null ? void 0 : _a2.href;
      const id = (_b = postView == null ? void 0 : postView.match(/id=(\d+)/)) == null ? void 0 : _b[1];
      const { width, height } = await getImageSize(imgSrc);
      const tags = img == null ? void 0 : img.title.split(/\s+/).filter(Boolean);
      const isGif = ["animated_gif", "gif"].some((e) => tags == null ? void 0 : tags.includes(e));
      const isVideo = ["mp4", "video"].some((e) => tags == null ? void 0 : tags.includes(e));
      let rating = (_d = (_c = img == null ? void 0 : img.title) == null ? void 0 : _c.match(/rating:(\w)\w+/)) == null ? void 0 : _d[1];
      if (rating == "g")
        rating = "s";
      return {
        id,
        postView,
        previewUrl: imgSrc,
        sampleUrl: isVideo ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.mp4") : isGif ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.gif") : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)/i, "$1samples$2sample_$3"),
        fileUrl: isVideo ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.webm") : isGif ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.gif") : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.jpg"),
        tags,
        width: width * 10,
        height: height * 10,
        aspectRatio: width / height,
        fileExt: isVideo ? "webm" : isGif ? "gif" : "jpg",
        fileDownloadName: `gelbooru_${id}`,
        rating: rating || ""
      };
    });
    return Promise.all(results);
  }
  async function fetchGelbooruFavorites(page) {
    const url = new URL(location.href);
    url.searchParams.set("pid", `${(page - 1) * 50}`);
    const htmlResp = await fetch(url.href);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const results = [...doc.querySelectorAll(".thumb")].map(async (el) => {
      var _a2, _b, _c, _d;
      const img = el.querySelector("img");
      const imgSrc = (img == null ? void 0 : img.src) || "";
      const postView = (_a2 = el.querySelector("a")) == null ? void 0 : _a2.href;
      const id = (_b = postView == null ? void 0 : postView.match(/id=(\d+)/)) == null ? void 0 : _b[1];
      const { width, height } = await getImageSize(imgSrc);
      const tags = img == null ? void 0 : img.title.split(/\s+/).filter(Boolean);
      const isGif = ["animated_gif", "gif"].some((e) => tags == null ? void 0 : tags.includes(e));
      const isVideo = ["mp4", "video"].some((e) => tags == null ? void 0 : tags.includes(e));
      let rating = (_d = (_c = img == null ? void 0 : img.title) == null ? void 0 : _c.match(/rating:(\w)\w+/)) == null ? void 0 : _d[1];
      if (rating == "g")
        rating = "s";
      return {
        id,
        postView,
        previewUrl: imgSrc,
        sampleUrl: isVideo ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.mp4") : isGif ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.gif") : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)/i, "$1samples$2sample_$3"),
        fileUrl: isVideo ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.webm") : isGif ? imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.gif") : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.jpg"),
        tags,
        width: width * 10,
        height: height * 10,
        aspectRatio: width / height,
        fileExt: isVideo ? "webm" : isGif ? "gif" : "jpg",
        fileDownloadName: `gelbooru_${id}`,
        rating: rating || ""
      };
    });
    return Promise.all(results);
  }
  async function addFavoriteGelbooru(id) {
    const response = await fetch(`https://gelbooru.com/public/addfav.php?id=${id}`);
    if (!response.ok) {
      showMsg({ msg: `${i18n.t("MWVfUiW8egLWq7MgV-wzc")}: ${response.status}`, type: "error" });
      return false;
    }
    const result = await response.text();
    if (result == "3") {
      showMsg({ msg: i18n.t("ctWGhVvqB2k_1TX2iY0l2").toString() });
      return true;
    } else {
      showMsg({ msg: `${i18n.t("MWVfUiW8egLWq7MgV-wzc")}: ${result}`, type: "error" });
      return false;
    }
  }
  const gelbooru = {
    is: isGelbooruPage,
    posts: fetchGelbooruPosts,
    fav: {
      is: isGelbooruFavPage,
      posts: fetchGelbooruFavorites
    }
  };
  function isHentaiBooruPage() {
    return location.hostname == "booru.eu";
  }
  async function fetchHentaiBooruPosts(page, tags) {
    document.onclick = function() {
    };
    document.onmouseup = function() {
    };
    document.onclick_copy = function() {
    };
    unsafeWindow.show_pop = function() {
    };
    unsafeWindow.open = function(url2) {
      const a = document.createElement("a");
      a.href = url2;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.click();
    };
    const url = `https://booru.eu/post/list${tags ? `/${tags}` : ""}/${page}`;
    const htmlResp = await fetch(url);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const results = [...doc.querySelectorAll(".shm-image-list span.thumb")].map((el) => {
      var _a2;
      const a = el.querySelector("a");
      const img = el.querySelector("img");
      const id = a == null ? void 0 : a.getAttribute("data-post-id");
      const previewUrl = img.src;
      const tags2 = ((_a2 = a == null ? void 0 : a.getAttribute("data-tags")) == null ? void 0 : _a2.split(/\s/).filter(Boolean)) || [];
      const [_, width, height] = (img == null ? void 0 : img.title.match(/\/\/\s+(\d+)x(\d+)\s+\/\//)) || [];
      const [__, size] = (img == null ? void 0 : img.title.match(/\/\/\s+\d+x\d+\s+\/\/\s+([\w\.]+)/)) || [];
      return {
        id,
        postView: a == null ? void 0 : a.href,
        previewUrl,
        fileUrl: "",
        tags: tags2,
        width: Number(width),
        height: Number(height),
        aspectRatio: Number(width) / Number(height),
        fileExt: "jpg",
        fileDownloadName: `HentaiBooru ${id} ${tags2.join(" ")}`,
        fileDownloadText: `${width}\xD7${height} [${size}]`,
        rating: ""
      };
    });
    return results;
  }
  async function getHentaiBooruDetail(id) {
    var _a2;
    const resp = await fetch(`https://booru.eu/post/view/${id}`);
    const doc = new DOMParser().parseFromString(await resp.text(), "text/html");
    return {
      fileUrl: (_a2 = doc.querySelector("#main_image")) == null ? void 0 : _a2.src
    };
  }
  const hentaibooru = {
    is: isHentaiBooruPage,
    posts: fetchHentaiBooruPosts,
    detail: getHentaiBooruDetail
  };
  function isKusowankaPage() {
    return location.hostname == "kusowanka.com";
  }
  async function fetchKusowankaPosts(page, tags) {
    const url = new URL(`https://kusowanka.com${tags ? `/tag/${tags}/` : ""}`);
    url.searchParams.set("page", `${page}`);
    const htmlResp = await fetch(url.href);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const results = [...doc.querySelectorAll(".box_thumbs .box_thumb")].map(async (el) => {
      var _a2;
      const a = el.querySelector("a");
      const img = el.querySelector("[data-bg]");
      const id = (_a2 = a.href.match(/(\d+)/)) == null ? void 0 : _a2[1];
      const previewUrl = img.getAttribute("data-bg");
      const { width, height } = await getImageSize(previewUrl);
      return {
        id,
        postView: a.href,
        previewUrl,
        fileUrl: "",
        tags: [],
        width: Number(width),
        height: Number(height),
        aspectRatio: Number(width) / Number(height),
        fileExt: "jpg",
        fileDownloadName: `kusowanka_${id}`,
        rating: ""
      };
    });
    return Promise.all(results);
  }
  async function getKusowankaDetail(id) {
    var _a2;
    const resp = await fetch(`https://kusowanka.com/post/${id}/`);
    const doc = new DOMParser().parseFromString(await resp.text(), "text/html");
    return {
      fileUrl: (_a2 = doc.querySelector(".post_image img")) == null ? void 0 : _a2.getAttribute("data-src"),
      tags: [
        ...[...doc.querySelectorAll(".parodies_list a")].map((e) => e.innerText),
        ...[...doc.querySelectorAll(".characters_list a")].map((e) => e.innerText),
        ...[...doc.querySelectorAll(".artists_list a")].map((e) => e.innerText),
        ...[...doc.querySelectorAll(".metadatas_list a")].map((e) => e.innerText),
        ...[...doc.querySelectorAll(".tags_list a")].map((e) => e.innerText)
      ]
    };
  }
  const kusowanka = {
    is: isKusowankaPage,
    posts: fetchKusowankaPosts,
    detail: getKusowankaDetail
  };
  function getYandereUserId() {
    const match2 = document.cookie.match(/user_id=(\d+)/);
    return match2 == null ? void 0 : match2[1];
  }
  function getKonachanUsername() {
    const match2 = document.cookie.match(/login=(\w+)/);
    return match2 == null ? void 0 : match2[1];
  }
  let _moebooruUserName;
  async function getUsername() {
    try {
      if (_moebooruUserName)
        return _moebooruUserName;
      if (location.href.includes("konachan")) {
        _moebooruUserName = getKonachanUsername();
        return _moebooruUserName;
      }
      const key = "YM_moebooru_username";
      const username = localStorage.getItem(key);
      _moebooruUserName = username;
      if (username)
        return username;
      const id = getYandereUserId();
      if (!id)
        return "";
      const response = await fetch(`/user.json?id=${id}`);
      const result = await response.json();
      const { name } = result[0];
      localStorage.setItem(key, name);
      return name;
    } catch (error) {
      console.log("getUsername error:", error);
      return "";
    }
  }
  const tagInfoMap = {
    circle: [i18n.t("ZtQHZx-pEjmu_o3dQD1fc"), "#26C6DA"],
    artist: [i18n.t("Ym0HIEu9Q80qXB31LuC6c"), "#FB8C00"],
    copyright: [i18n.t("juT6gwLOg5r1h2vFpFf6P"), "#AB47BC"],
    character: [i18n.t("aonlPAu9kEkkwNvQg0DBk"), "#66BB6A"],
    general: ["", "#E87A90cc"],
    faults: ["", "#AB3B3Ada"]
  };
  const tagSortOrder$1 = ["circle", "artist", "copyright", "character", "general"];
  const isCNLang$2 = i18n.locale.includes("zh");
  async function getPostDetail(id) {
    try {
      if (!id)
        return false;
      const response = await fetch(`/post.json?api_version=2&tags=id:${id}&include_tags=1&include_votes=1`);
      const result = await response.json();
      return {
        voted: result.votes[id] == 3,
        tags: Object.entries(result.tags).map(([tag2, type]) => {
          var _a2, _b, _c;
          const tagCN = (_a2 = window.__tagsCN) == null ? void 0 : _a2[tag2];
          const typeText = (_b = tagInfoMap[type]) == null ? void 0 : _b[0];
          const tagText = [
            typeText && `[ ${typeText} ] `,
            tag2,
            isCNLang$2 && tagCN && ` [ ${tagCN} ]`
          ].filter(Boolean).join("");
          return {
            tag: tag2,
            type,
            tagText,
            color: ((_c = tagInfoMap[type]) == null ? void 0 : _c[1]) || tagInfoMap.general[1]
          };
        }).sort((a, b) => {
          return tagSortOrder$1.indexOf(a.type) - tagSortOrder$1.indexOf(b.type);
        })
      };
    } catch (error) {
      console.log("getPostDetail error:", error);
      return false;
    }
  }
  async function addPostToFavorites$1(id) {
    var _a2;
    const form = new FormData();
    form.append("id", id);
    form.append("score", "3");
    const response = await fetch("/post/vote.json", {
      method: "POST",
      headers: { "x-csrf-token": (_a2 = sessionStorage.getItem("csrf-token")) != null ? _a2 : "" },
      body: form
    });
    if (!response.ok) {
      showMsg({ msg: `${i18n.t("MWVfUiW8egLWq7MgV-wzc")}: ${response.status}`, type: "error" });
      return false;
    }
    const result = await response.json();
    if (result.success) {
      showMsg({ msg: i18n.t("ctWGhVvqB2k_1TX2iY0l2").toString() });
      return true;
    } else {
      showMsg({ msg: `${i18n.t("MWVfUiW8egLWq7MgV-wzc")}: ${result.reason}`, type: "error" });
      return false;
    }
  }
  function isPopularPage() {
    return /(yande.re|konachan).*\/post\/popular_/.test(location.href);
  }
  function isPoolShowPage() {
    return /(yande.re|konachan).*\/pool\/show/.test(location.href);
  }
  async function fetchPostsByPath(postsKey, page) {
    const url = new URL(location.href);
    url.pathname += ".json";
    page && url.searchParams.set("page", page.toString());
    const response = await fetch(url);
    const result = await response.json();
    const site = booruForSite(location.host);
    const results = postsKey ? result[postsKey] : result;
    const posts = results.map((e) => new Post(e, site));
    return new SearchResults(posts, [], {}, site);
  }
  function splitTags(tagsData, limit, searchTerm) {
    let results = tagsData == null ? void 0 : tagsData.split(/\s+/);
    if (searchTerm)
      results = results.filter((e) => e.includes(searchTerm));
    if (!Array.isArray(results))
      return [];
    return results.slice(0, limit).map((e) => e.split("`")[1]).filter(Boolean);
  }
  function getTagsString(key) {
    var _a2;
    return ((_a2 = window.TagCompletion) == null ? void 0 : _a2[key]) || localStorage.getItem(key) || "";
  }
  function searchTagsByName(searchTerm) {
    if (!searchTerm)
      return [];
    return splitTags(getTagsString("tag_data"), 40, searchTerm);
  }
  function getRecentTags() {
    return splitTags(getTagsString("recent_tags"), 10);
  }
  async function fetchPools(page, query2) {
    const url = new URL("/pool.json", location.origin);
    url.searchParams.set("page", page.toString() || "1");
    query2 && url.searchParams.set("query", query2);
    const jsonResp = await fetch(url);
    const results = await jsonResp.json();
    url.pathname = url.pathname.replace(".json", ".atom");
    const xmlResp = await fetch(url);
    const doc = new DOMParser().parseFromString(await xmlResp.text(), "text/xml");
    const thumbMap = [...doc.querySelectorAll("entry")].reduce((acc, cur) => {
      var _a2, _b, _c, _d;
      const id = (_c = (_b = (_a2 = cur.querySelector("id")) == null ? void 0 : _a2.textContent) == null ? void 0 : _b.match(/Pool\/(\d+)/)) == null ? void 0 : _c[1];
      const url2 = (_d = cur.querySelector("link[rel=enclosure]")) == null ? void 0 : _d.getAttribute("href");
      if (id && url2)
        acc[id] = url2;
      return acc;
    }, {});
    for (const item of results) {
      item.thumb = thumbMap[item.id];
      item.created_at = formatDate(new Date(item.created_at));
      item.updated_at = formatDate(new Date(item.updated_at));
    }
    return results;
  }
  function isYandereHtml() {
    return location.hostname == "yande.re" && location.pathname == "/post" && settings.isYandereFetchByHtml;
  }
  async function fetchPostsByHtml(page, tags) {
    const url = new URL(location.href);
    url.searchParams.set("page", `${page}`);
    tags && url.searchParams.set("tags", tags);
    const htmlResp = await fetch(url.href);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const script = doc.querySelector("form:has(select[name=locale]) + script");
    const scriptText = (script == null ? void 0 : script.innerText.trim()) || "";
    let results = [];
    try {
      results = scriptText.split("\n").slice(1).map((e) => {
        var _a2;
        return JSON.parse(((_a2 = e.match(/Post.register\((.*)\)/)) == null ? void 0 : _a2[1]) || "[]");
      });
    } catch (err) {
      console.log("err: ", err);
    }
    const site = booruForSite(location.host);
    const posts = results.map((e) => new Post(e, site));
    return new SearchResults(posts, [], {}, site);
  }
  const moebooru = {
    yanderehtml: {
      is: isYandereHtml,
      posts: fetchPostsByHtml
    },
    popular: {
      is: isPopularPage,
      posts: async () => {
        const results = await fetchPostsByPath();
        store.requestStop = true;
        return results;
      }
    },
    pool: {
      is: isPoolShowPage,
      posts: async (page, tags) => {
        const results = await fetchPostsByPath("posts", page);
        return tags ? results.tagged(tags) : results;
      }
    }
  };
  function isNozomiPage() {
    return location.hostname == "nozomi.la" && location.pathname == "/";
  }
  let resPosts = [];
  function fetchNozomiPosts(page) {
    resPosts = [];
    return new Promise((resolve) => {
      fetch_nozomi(page);
      let times = 0;
      const si = setInterval(() => {
        times = times + 1;
        if (times > 10) {
          clearInterval(si);
          resolve([]);
          return;
        }
        if (resPosts.length) {
          clearInterval(si);
          resolve(resPosts.map((e) => ({
            id: e.postid,
            postView: e.postView,
            previewUrl: e.previewUrl,
            fileUrl: e.fileUrl,
            tags: e.tags,
            width: e.width,
            height: e.height,
            aspectRatio: e.width / e.height,
            fileExt: e.type,
            fileDownloadName: `NOZOMI ${e.postid} ${e.tags.join(" ")}.${e.type}`,
            rating: ""
          })));
        }
      }, 1e3);
    });
  }
  const nozomila = {
    is: isNozomiPage,
    posts: fetchNozomiPosts
  };
  const tns_per_page = 64;
  const nozomiextension = ".nozomi";
  const postdir = "post";
  const results_array = {};
  const outstanding_requests = {};
  let number_of_outstanding_requests = 0;
  const nozomi = [];
  let total_items = 0;
  const tag = "index";
  let page_number;
  let nozomi_address;
  const domain = "n.nozomi.la";
  const full_path_from_hash = (hash) => {
    if (hash.length < 3) {
      return hash;
    }
    return hash.replace(/^.*(..)(.)$/, `$2/$1/${hash}`);
  };
  const urlencode = (str) => {
    return str.replace(/[\;\/\?\:\@\=\&#%\+]/g, (c) => {
      return `%${c.charCodeAt(0).toString(16)}`;
    });
  };
  const remove_slashes = (input) => {
    return input.replace(/[\/]/g, "");
  };
  function path_from_postid(postid) {
    if (postid.length < 3)
      return postid;
    return postid.replace(/^(.*(..)(.))$/, "$3/$2/$1");
  }
  function fetch_nozomi(page) {
    page_number = page;
    nozomi_address = `https://${domain}`;
    nozomi_address += `/${urlencode(remove_slashes(tag))}`;
    nozomi_address += nozomiextension;
    const start_byte = (page_number - 1) * tns_per_page * 4;
    const end_byte = start_byte + tns_per_page * 4 - 1;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", nozomi_address);
    xhr.responseType = "arraybuffer";
    xhr.setRequestHeader("Range", `bytes=${start_byte.toString()}-${end_byte.toString()}`);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 206) {
          const arrayBuffer = xhr.response;
          if (arrayBuffer) {
            const view = new DataView(arrayBuffer);
            for (let pos = 0; pos < view.byteLength; pos += 4) {
              nozomi.push(view.getUint32(pos, false));
            }
            total_items = parseInt(xhr.getResponseHeader("Content-Range").replace(/^[Bb]ytes \d+-\d+\//, "")) / 4;
            console.log("total_items: ", total_items);
            get_jsons();
          }
        }
      }
    };
    xhr.send();
  }
  function get_jsons() {
    const datas = [];
    for (const i in nozomi) {
      const postid = nozomi[i];
      if (postid in results_array) {
        datas.push(results_array[postid]);
        continue;
      }
      if (!outstanding_requests[postid]) {
        outstanding_requests[postid] = 1;
        ++number_of_outstanding_requests;
        get_json(postid);
      }
    }
    if (number_of_outstanding_requests)
      return;
    results_to_page(datas);
  }
  function get_json(postid) {
    const url = `https://j.gold-usergeneratedcontent.net/${postdir}/${path_from_postid(postid.toString())}.json`;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url);
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          results_array[postid] = JSON.parse(this.responseText);
        } else {
          results_array[postid] = "";
        }
        delete outstanding_requests[postid];
        --number_of_outstanding_requests;
        get_jsons();
      }
    };
    xmlhttp.send();
  }
  function results_to_page(datas) {
    var _a2, _b, _c, _d;
    for (const d in datas) {
      const data = datas[d];
      if (!data)
        continue;
      data.tags = [
        ...((_a2 = data.artist) == null ? void 0 : _a2.map((e) => e.tag)) || [],
        ...((_b = data.copyright) == null ? void 0 : _b.map((e) => e.tag)) || [],
        ...((_c = data.character) == null ? void 0 : _c.map((e) => e.tag)) || [],
        ...((_d = data.general) == null ? void 0 : _d.map((e) => e.tag)) || []
      ];
      data.postView = `https://nozomi.la/post/${data.postid}.html`;
      data.previewUrl = `https://qtn.gold-usergeneratedcontent.net/${full_path_from_hash(data.imageurls[0].dataid)}.${data.imageurls[0].type}.webp`;
      const url = data.imageurls[0];
      if (url.is_video) {
        data.fileUrl = `https://v.gold-usergeneratedcontent.net/${full_path_from_hash(url.dataid)}.${url.type}`;
      } else {
        data.fileUrl = `https://${url.type === "gif" ? "g" : "w"}.gold-usergeneratedcontent.net/${full_path_from_hash(url.dataid)}.${url.type === "gif" ? "gif" : "webp"}`;
      }
    }
    resPosts = datas;
  }
  function isRule34Page() {
    return location.hostname == "rule34.xxx";
  }
  function isRule34FavPage() {
    return /rule34\.xxx\/index\.php\?page\=favorites\&s\=view/.test(location.href);
  }
  function isRule34Firefox() {
    return location.hostname == "rule34.xxx" && (navigator.userAgent.includes("Firefox") || !settings.credentialQuery);
  }
  async function fetchRule34Posts(page, tags) {
    const url = new URL("https://rule34.xxx/index.php");
    url.searchParams.set("page", "post");
    url.searchParams.set("s", "list");
    url.searchParams.set("pid", `${(page - 1) * 42}`);
    tags && url.searchParams.set("tags", tags);
    const htmlResp = await fetch(url.href, { credentials: "include" });
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const results = [...doc.querySelectorAll("#content .image-list .thumb")].map(async (el) => {
      var _a2, _b, _c;
      const id = el.id;
      const img = el.querySelector("img");
      const imgSrc = (img == null ? void 0 : img.src) || "";
      const postView = (_a2 = el.querySelector("a")) == null ? void 0 : _a2.href;
      const { width, height } = await getImageSize(imgSrc);
      const tags2 = img == null ? void 0 : img.title.split(/\s+/).filter(Boolean);
      const isVideo = ["mp4", "video"].some((e) => tags2 == null ? void 0 : tags2.includes(e));
      const videoUrl = imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.mp4").replace("https://wimg.", "https://api-cdn-mp4.");
      const rating = (_b = img == null ? void 0 : img.title.match(/rating\:(\w)/)) == null ? void 0 : _b[1];
      const score = (_c = img == null ? void 0 : img.title.match(/score\:(\d+)/)) == null ? void 0 : _c[1];
      if (el.querySelector(".blacklist-img")) {
        return null;
      }
      return {
        id,
        postView,
        previewUrl: imgSrc,
        sampleUrl: isVideo ? videoUrl : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)/i, "$1samples$2sample_$3"),
        fileUrl: isVideo ? videoUrl.replace(/\?\d+$/, "") : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.jpeg").replace(/\?\d+$/, ""),
        tags: tags2,
        width: width * 10,
        height: height * 10,
        aspectRatio: width / height,
        fileExt: isVideo ? "mp4" : "jpg",
        fileDownloadName: `rule34_xxx_${id}`,
        rating,
        score
      };
    });
    const posts = await Promise.all(results);
    return posts.filter(Boolean);
  }
  async function fetchRule34Favorites(page) {
    const url = new URL(location.href);
    url.searchParams.set("pid", `${(page - 1) * 50}`);
    const htmlResp = await fetch(url.href);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const results = [...doc.querySelectorAll("#content .image-list .thumb")].map(async (el) => {
      var _a2, _b;
      const img = el.querySelector("img");
      const imgSrc = (img == null ? void 0 : img.src) || "";
      const postView = (_a2 = el.querySelector("a")) == null ? void 0 : _a2.href;
      const id = (_b = postView == null ? void 0 : postView.match(/id=(\d+)/)) == null ? void 0 : _b[1];
      const { width, height } = await getImageSize(imgSrc);
      const tags = img == null ? void 0 : img.title.split(/\s+/).filter(Boolean);
      const isVideo = ["mp4", "animated", "video"].some((e) => tags == null ? void 0 : tags.includes(e));
      const videoUrl = imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.mp4").replace("https://wimg.", "https://api-cdn-mp4.");
      return {
        id,
        postView,
        previewUrl: imgSrc,
        sampleUrl: isVideo ? videoUrl : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)/i, "$1samples$2sample_$3"),
        fileUrl: isVideo ? videoUrl.replace(/\?\d+$/, "") : imgSrc.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, "$1images$2$3.jpeg").replace(/\?\d+$/, ""),
        tags,
        width: width * 10,
        height: height * 10,
        aspectRatio: width / height,
        fileExt: isVideo ? "mp4" : "jpg",
        fileDownloadName: `rule34_xxx_${id}`,
        rating: ""
      };
    });
    const list = await Promise.all(results);
    list.__isR34Fav = true;
    return list;
  }
  async function addFavoriteRule34(id) {
    var _a2;
    const _id = ((_a2 = id.match(/(\d+)/)) == null ? void 0 : _a2[1]) || id;
    const response = await fetch(`https://rule34.xxx/public/addfav.php?id=${_id}`);
    if (!response.ok) {
      showMsg({ msg: `${i18n.t("MWVfUiW8egLWq7MgV-wzc")}: ${response.status}`, type: "error" });
      return false;
    }
    const result = await response.text();
    if (result == "3") {
      showMsg({ msg: i18n.t("ctWGhVvqB2k_1TX2iY0l2").toString() });
      return true;
    } else {
      showMsg({ msg: `${i18n.t("MWVfUiW8egLWq7MgV-wzc")}: ${result}`, type: "error" });
      return false;
    }
  }
  const rule34 = {
    is: isRule34Page,
    fav: {
      is: isRule34FavPage,
      posts: fetchRule34Favorites
    },
    firefox: {
      is: isRule34Firefox,
      posts: fetchRule34Posts
    }
  };
  function isR34PahealPage() {
    return location.hostname == "rule34.paheal.net" && location.pathname != "/";
  }
  function isR34PahealHome() {
    return location.hostname == "rule34.paheal.net" && location.pathname == "/";
  }
  async function fetchR34PahealPosts(page, tags) {
    document.onclick = function() {
    };
    document.onmouseup = function() {
    };
    document.onclick_copy = function() {
    };
    unsafeWindow.show_pop = function() {
    };
    unsafeWindow.open = function(url2) {
      const a = document.createElement("a");
      a.href = url2;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.click();
    };
    const url = `https://rule34.paheal.net/post/list${tags ? `/${tags}` : ""}/${page}`;
    const htmlResp = await fetch(url);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const results = [...doc.querySelectorAll(".shm-image-list .shm-thumb.thumb")].map((el) => {
      var _a2, _b, _c;
      const id = el.getAttribute("data-post-id");
      const fileExt = el.getAttribute("data-ext");
      const tags2 = ((_a2 = el.getAttribute("data-tags")) == null ? void 0 : _a2.split(/\s/).filter(Boolean)) || [];
      const img = el.querySelector("img");
      const [_, width, height] = (img == null ? void 0 : img.title.match(/\s+(\d+)x(\d+)[,\s]+/)) || [];
      const [__, size] = (img == null ? void 0 : img.title.match(/\s+\d+x\d+\s+\/\/\s+([\w\.]+)/)) || [];
      const date = img == null ? void 0 : img.title.split("\n").pop();
      return {
        id,
        postView: (_b = el.querySelector(".shm-thumb-link")) == null ? void 0 : _b.href,
        previewUrl: img == null ? void 0 : img.src,
        fileUrl: (_c = el.querySelector(".shm-thumb-link + br + a")) == null ? void 0 : _c.href,
        tags: tags2,
        width: Number(width),
        height: Number(height),
        aspectRatio: Number(width) / Number(height),
        fileExt,
        fileDownloadName: `Rule34.Paheal ${id} ${tags2.join(" ")}.${fileExt}`,
        fileDownloadText: `${width}\xD7${height} [${size}] ${fileExt == null ? void 0 : fileExt.toUpperCase()}`,
        rating: "e",
        createdAt: date && parse(`${date} +00`, "MMMM do, yyyy; HH:mm x", new Date())
      };
    });
    return results;
  }
  const r34paheal = {
    is: isR34PahealPage,
    posts: fetchR34PahealPosts
  };
  function isRealbooruPage() {
    return location.hostname == "realbooru.com";
  }
  async function fetchRealbooruPosts(page, tags) {
    const url = new URL("https://realbooru.com/index.php");
    url.searchParams.set("page", "post");
    url.searchParams.set("s", "list");
    url.searchParams.set("pid", `${(page - 1) * 42}`);
    tags && url.searchParams.set("tags", tags);
    const htmlResp = await fetch(url.href);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const results = [...doc.querySelectorAll(".content .thumb")].map(async (el) => {
      var _a2;
      const a = el.querySelector("a");
      const img = el.querySelector("img");
      const id = (_a2 = a.getAttribute("id")) == null ? void 0 : _a2.slice(1);
      const previewUrl = img.src;
      const { width, height } = await getImageSize(previewUrl);
      const tags2 = img.title.split(/,\s+/).filter(Boolean);
      const isGif = tags2.includes("gif");
      const isVideo = (img == null ? void 0 : img.style.border.includes("rgb(0, 0, 255)")) || (img == null ? void 0 : img.style.border.includes("#0000ff"));
      const replaceSampleExt = isGif ? "$1images$2$3.gif" : isVideo ? "$1images$2$3.webm" : "$1samples$2sample_$3.jpg";
      const replaceFileExt = isGif ? "$1images$2$3.gif" : isVideo ? "$1images$2$3.mp4" : "$1images$2$3.jpeg";
      return {
        id,
        postView: a.href,
        previewUrl,
        sampleUrl: previewUrl.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg$/i, replaceSampleExt),
        fileUrl: previewUrl.replace(/(.*)thumbnails(.*)thumbnail_(.*)\.jpg/i, replaceFileExt),
        tags: tags2,
        width: Number(width) * 10,
        height: Number(height) * 10,
        aspectRatio: Number(width) / Number(height),
        fileExt: isGif ? "gif" : isVideo ? "mp4" : "jpg",
        fileDownloadName: `realbooru_${id}`,
        rating: "e"
      };
    });
    return Promise.all(results);
  }
  const realbooru = {
    is: isRealbooruPage,
    posts: fetchRealbooruPosts
  };
  function isRule34HentaiPage() {
    return location.hostname == "rule34hentai.net";
  }
  async function fetchRule34HentaiPosts(page, tags) {
    var _a2;
    if (!tags) {
      tags = ((_a2 = location.pathname.match(/post\/list\/(.+)\/\d+/)) == null ? void 0 : _a2[1]) || "";
    }
    const url = `https://rule34hentai.net/post/list/${tags ? `${tags}/` : ""}${page}`;
    const htmlResp = await fetch(url);
    const doc = new DOMParser().parseFromString(await htmlResp.text(), "text/html");
    const results = [...doc.querySelectorAll("#image-list .thumb")].map((el) => {
      var _a3;
      const img = el.querySelector("img");
      const id = el.getAttribute("data-post-id");
      const previewUrl = (img == null ? void 0 : img.src) || "";
      const previewWidth = Number(img == null ? void 0 : img.getAttribute("width"));
      const previewHeight = Number(img == null ? void 0 : img.getAttribute("height"));
      const width = Number(el.getAttribute("data-width"));
      const height = Number(el.getAttribute("data-height"));
      const postTags = ((_a3 = el.getAttribute("data-tags")) == null ? void 0 : _a3.split(/\s+/).filter(Boolean)) || [];
      const m = (img == null ? void 0 : img.title.split("//").map((e) => e.trim())) || [];
      const fileExt = m[3] || "";
      const fileSizeText = m[2] || "";
      const fileUrl = previewUrl.replace(/(.*)\/_thumbs\/(.*)\/thumb\..*/, `$1/_images/$2/${id}.${fileExt}`);
      return {
        id,
        postView: el.getAttribute("href"),
        previewUrl,
        previewWidth,
        previewHeight,
        fileUrl,
        fileSizeText,
        tags: postTags,
        width,
        height,
        aspectRatio: width / height,
        fileExt,
        fileDownloadName: `rule34hentai_${id}`,
        fileDownloadText: `${width}\xD7${height} [${fileSizeText}] ${fileExt.toUpperCase()}`,
        rating: "e"
      };
    });
    return results;
  }
  const rule34hentai = {
    is: isRule34HentaiPage,
    posts: fetchRule34HentaiPosts
  };
  function isZerochanPage() {
    return location.hostname == "www.zerochan.net";
  }
  let isChallengePass = false;
  function openApiWindow() {
    return new Promise((resolve) => {
      const win = window.open("https://www.zerochan.net/?p=1&json", "", "width=500,height=500");
      win == null ? void 0 : win.addEventListener("load", () => {
        isChallengePass = true;
        win.close();
        resolve();
      });
      setTimeout(() => {
        if (!isChallengePass) {
          win == null ? void 0 : win.close();
          resolve();
        }
      }, 5e3);
    });
  }
  async function fetchZerochanPosts(page, tags) {
    if (!isChallengePass) {
      await openApiWindow();
    }
    const resp = await fetch(`https://www.zerochan.net/${tags || ""}?p=${page}&json`);
    const json = await resp.json();
    return json.items.map((e) => {
      const primary = escape(e.tag.replace(/\s/g, "."));
      return {
        id: e.id,
        postView: `https://www.zerochan.net/${e.id}`,
        previewUrl: e.thumbnail,
        sampleUrl: `https://s1.zerochan.net/${primary}.600.${e.id}.jpg`,
        fileUrl: `https://static.zerochan.net/${primary}.full.${e.id}.png`,
        tags: e.tags,
        width: e.width,
        height: e.height,
        aspectRatio: e.width / e.height,
        fileExt: "jpg",
        fileDownloadName: `zerochan ${e.id} ${e.tags.join(" ")}`,
        fileDownloadText: `${e.width}\xD7${e.height}`,
        rating: "",
        sourceUrl: e.source
      };
    });
  }
  async function getZerochanFileUrl(id) {
    const resp = await fetch(`https://www.zerochan.net/${id}?json`);
    const json = await resp.json();
    return json.full;
  }
  const zerochan = {
    is: isZerochanPage,
    posts: fetchZerochanPosts
  };
  const fetchPostsActions = [
    moebooru.popular,
    moebooru.pool,
    moebooru.yanderehtml,
    gelbooru,
    gelbooru.fav,
    rule34.fav,
    rule34.firefox,
    r34paheal,
    booruAction,
    eshuushuu,
    zerochan,
    animepictures,
    allgirl,
    hentaibooru,
    kusowanka,
    anihonetwallpaper,
    nozomila,
    sankaku.idol,
    sankaku,
    sankaku.complex,
    realbooru,
    rule34hentai,
    { is: () => true, posts: async () => [] }
  ];
  const fetchDetailActions = [
    animepictures,
    sankaku.idol,
    sankaku,
    sankaku.complex,
    allgirl,
    hentaibooru,
    kusowanka
  ];
  function getFirstPageNo(params2) {
    if (isPidSite()) {
      const page = Number(params2.get("pid")) || 0;
      return Math.trunc(page / BOORU_PAGE_LIMIT) + 1;
    }
    return Number(params2.get("page")) || 1;
  }
  function pushPageState(pageNo, latePageQuery = false) {
    if (rule34.fav.is() || allgirl.is() || nozomila.is())
      return;
    let pageParamName = "page";
    if (isPidSite()) {
      pageParamName = "pid";
      pageNo = (pageNo - 1) * BOORU_PAGE_LIMIT;
    } else if (latePageQuery && pageNo > 1) {
      pageNo -= 1;
    }
    const url = new URL(location.href);
    url.searchParams.set(pageParamName, pageNo.toString());
    history.replaceState("", "", url);
  }
  function handleBlacklist(results) {
    if (rule34.is() && !results.__isR34Fav) {
      if (getCookie("filter_ai") == "1") {
        results = results.filter((e) => !e.tags.includes("ai_assisted") && !e.tags.includes("ai_generated"));
      }
      const threshold = +getCookie("post_threshold");
      if (threshold > 0) {
        results = results.filter((e) => e.score ? +e.score >= threshold : true);
      }
    }
    if (!settings.blacklist.length)
      return results;
    return typeof results.blacklist == "function" ? results.blacklist(settings.blacklist) : results.filter((e) => {
      const tags = e.tags.map((t) => t.toLowerCase());
      return !settings.blacklist.some((w) => tags.includes(w.toLowerCase()));
    });
  }
  const params = new URLSearchParams(location.search);
  const query = {
    page: getFirstPageNo(params),
    tags: params.get("tags")
  };
  const getSearchState = () => query;
  const setPage = (page) => query.page = page;
  const setTags = (tags) => query.tags = tags;
  const searchPosts = async (latePageQuery = false) => {
    var _a2;
    store.requestLoading = true;
    try {
      const { page, tags } = getSearchState();
      let posts = await ((_a2 = fetchPostsActions.find((e) => e.is())) == null ? void 0 : _a2.posts(page, tags));
      if (Array.isArray(posts) && posts.length > 0) {
        posts = handleBlacklist(posts);
        store.currentPage = page;
        store.imageList = uniqBy([
          ...store.imageList,
          ...settings.showNSFWContents ? posts : posts.filter((e) => ["s", "g"].includes(e.rating))
        ], "id");
        pushPageState(page, latePageQuery);
        setPage(page + 1);
      } else {
        store.requestStop = true;
      }
    } catch (error) {
      console.log(`fetch error: ${error}`);
    } finally {
      store.requestLoading = false;
    }
  };
  const calcFetchTimes = () => {
    const vcont = document.querySelector("._vcont");
    const cnth = vcont == null ? void 0 : vcont.clientHeight;
    const doch = document.documentElement.clientHeight;
    return cnth ? Math.floor(doch / cnth) : 1;
  };
  const initPosts = async () => {
    await searchPosts(true);
    if (settings.masonryLayout === "virtual") {
      document.documentElement.scrollTop = 1;
    }
    if (store.requestStop)
      return;
    if (/safebooru|nozomi\.la/.test(location.host))
      return;
    let times = calcFetchTimes();
    if (times > 3)
      times = 3;
    for (let index = 1; index < times; index++) {
      await searchPosts(true);
    }
  };
  const refreshPosts = () => {
    setPage(1);
    store.imageList = [];
    store.selectedImageList = [];
    store.requestStop = false;
    initPosts();
  };
  const loadPostsByPage = (toPage) => {
    setPage(Number(toPage) || 1);
    store.imageList = [];
    searchPosts();
  };
  const loadPostsByTags = (searchTerm) => {
    setPage(1);
    setTags(searchTerm);
    store.imageList = [];
    searchPosts().then(() => {
      if (settings.masonryLayout === "virtual") {
        document.documentElement.scrollTop = 1;
      }
    });
  };
  async function fetchDanbooruAutocomplete(term) {
    const response = await fetch(`https://danbooru.donmai.us/autocomplete.json?search[query]=${term}&search[type]=tag_query&version=1&limit=20`);
    if (!response.ok) {
      return [];
    }
    const result = await response.json();
    return result.map((e) => e.value);
  }
  async function fetchGelbooruAutocomplete(term) {
    const response = await fetch(`https://gelbooru.com/index.php?page=autocomplete2&term=${term}&type=tag_query&limit=10`);
    if (!response.ok) {
      return [];
    }
    const result = await response.json();
    return result.map((e) => e.value);
  }
  async function fetchRule34Autocomplete(term) {
    const response = await fetch(`https://ac.rule34.xxx/autocomplete.php?q=${term}`);
    if (!response.ok) {
      return [];
    }
    const result = await response.json();
    return result.map((e) => e.value);
  }
  const autocompleteActions = {
    "yande.re": async (term) => searchTagsByName(term),
    "konachan.com": async (term) => searchTagsByName(term),
    "konachan.net": async (term) => searchTagsByName(term),
    "danbooru.donmai.us": fetchDanbooruAutocomplete,
    "gelbooru.com": fetchGelbooruAutocomplete,
    "rule34.xxx": fetchRule34Autocomplete
  };
  const isAutocompleteAct = Object.keys(autocompleteActions).includes(location.hostname);
  const fetchAutocomplete = autocompleteActions[location.hostname] || (() => {
  });
  var _sfc_main$a = /* @__PURE__ */ Vue2.defineComponent({
    __name: "AppBar",
    setup(__props) {
      const title = Vue2.computed(() => `${getSiteTitle()} - ${store.imageList.length} Posts - Page `);
      const isNoSelected = Vue2.computed(() => store.selectedImageList.length === 0);
      const isOneOrMoreSelected = Vue2.computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length < store.imageList.length);
      const isAllSelected = Vue2.computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length === store.imageList.length);
      const loadingValue = Vue2.ref(0);
      function selectAll() {
        if (isNoSelected.value || isOneOrMoreSelected.value) {
          setTimeout(() => {
            const arr = [...store.imageList];
            arr.forEach((item) => {
              Object.assign(item, { fileNameWithTags: `${location.hostname} ${item.id} ${item.tags.join(" ")}` });
            });
            store.selectedImageList = arr;
          });
        }
        if (isAllSelected.value) {
          setTimeout(() => {
            store.selectedImageList = [];
          });
        }
      }
      function removeFromList(id) {
        store.selectedImageList = store.selectedImageList.filter((e) => {
          if (e.loading)
            return true;
          return e.id !== id;
        });
      }
      const tagsQuery = new URLSearchParams(location.search).get("tags");
      const searchState = Vue2.reactive({
        showInput: !!tagsQuery,
        showMenu: false,
        searchTerm: tagsQuery || "",
        searchItems: store.isYKSite ? defCompTags.concat(getRecentTags()) : defCompTags,
        loading: false
      });
      const onSearchTermInput = debounce(async () => {
        if (!isAutocompleteAct)
          return;
        const val = searchState.searchTerm;
        const lastTag = val == null ? void 0 : val.split(/\s+/).slice(-1)[0];
        if (!lastTag) {
          searchState.showMenu = false;
          searchState.searchItems = defCompTags;
          return;
        }
        searchState.loading = true;
        searchState.showMenu = true;
        searchState.searchItems = await fetchAutocomplete(lastTag);
        searchState.loading = false;
      }, 500);
      function selectTag(tag2) {
        const termArr = searchState.searchTerm.split(/\s+/);
        searchState.searchTerm = termArr.slice(0, -1).concat(tag2).join(" ");
        searchState.showMenu = false;
        searchState.searchItems = defCompTags;
      }
      const userName = Vue2.ref("");
      Vue2.onMounted(async () => {
        if (store.isYKSite) {
          const name = await getUsername();
          if (name)
            userName.value = name;
        }
      });
      function fetchTaggedPosts(tags) {
        const url = new URL(location.href);
        url.searchParams.set("tags", tags);
        history.pushState("", "", url);
        searchState.searchTerm = tags;
        loadPostsByTags(tags);
      }
      function showTagsInput() {
        if (searchState.showInput) {
          if (!searchState.searchTerm) {
            searchState.showInput = false;
          }
          fetchTaggedPosts(searchState.searchTerm);
        } else {
          searchState.showInput = true;
        }
      }
      function onSearchTermKeydown(ev) {
        if (ev.key != "Enter")
          return;
        if (searchState.showMenu && searchState.searchItems.length) {
          const item = document.querySelector(".ac_tags_list .v-list-item--highlighted");
          if (item) {
            selectTag(item.innerText);
            return;
          }
          searchState.showMenu = false;
          fetchTaggedPosts(searchState.searchTerm);
        } else {
          fetchTaggedPosts(searchState.searchTerm);
        }
      }
      const showPopAction = Vue2.ref(isPopularPage());
      const periodMap = {
        "1d": [i18n.t("Mt3-hyoH7f_pW2gnfxyur").toString(), mdiCalendarToday, "day"],
        "1w": [i18n.t("riciqzr6ILBnpPc7KtG-C").toString(), mdiCalendarWeek, "week"],
        "1m": [i18n.t("PQhFo-g7sgagimkleVoZR").toString(), mdiCalendarMonth, "month"],
        "1y": [i18n.t("ze1PaiGdX4ufmoOLv_xw6").toString(), mdiCalendarText, "year"]
      };
      const periodByDateMap = (() => {
        const map = { ...periodMap };
        delete map["1y"];
        return map;
      })();
      function getRecentPeriod() {
        var _a2;
        const params2 = new URLSearchParams(location.search);
        let period = params2.get("period");
        if (location.pathname.includes("popular_by")) {
          period = (_a2 = location.pathname.match(/\/post\/popular_by_(.*)/)) == null ? void 0 : _a2[1];
          period = Object.keys(periodByDateMap).find((e) => periodByDateMap[e][2] == period);
        }
        return period || "1d";
      }
      function isPopularRecent() {
        return location.pathname.includes("popular_recent");
      }
      function getPopTitle() {
        var _a2;
        if (isPopularRecent()) {
          return `Popular Recent ${getRecentPeriod()}`;
        }
        return (_a2 = location.pathname.split("/").pop()) == null ? void 0 : _a2.replace(/_/g, " ").toUpperCase();
      }
      const popTitle = Vue2.ref(getPopTitle());
      const isPopSearchByDate = Vue2.ref(!isPopularRecent());
      const recentPeriod = Vue2.ref(getRecentPeriod());
      const periodComputedMap = Vue2.computed(() => {
        return isPopSearchByDate.value ? periodByDateMap : periodMap;
      });
      const showPopDatePicker = Vue2.ref(false);
      const popSearchDate = Vue2.ref((() => {
        const params2 = new URLSearchParams(location.search);
        const y = params2.get("year");
        const m = params2.get("month");
        const d = params2.get("day");
        if (y && m && d)
          return formatDate(new Date(`${y}-${m}-${d}`));
        return subDate(1, "days");
      })());
      function fetchPopularPosts(type) {
        let url = `/post/popular_recent?period=${type}`;
        if (isPopSearchByDate.value) {
          const [year, month, day] = popSearchDate.value.split("-");
          url = `/post/popular_by_${periodMap[type][2]}?day=${day}&month=${month}&year=${year}`;
        }
        history.pushState("", "", url);
        popTitle.value = getPopTitle();
        refreshPosts();
      }
      function selPeriod(key) {
        recentPeriod.value = key;
        fetchPopularPosts(key);
      }
      Vue2.watch(popSearchDate, (val) => {
        if (!val)
          return;
        fetchPopularPosts(recentPeriod.value);
      });
      Vue2.watch(isPopSearchByDate, (val) => {
        recentPeriod.value = "1d";
        if (val)
          popSearchDate.value = subDate(1, "days");
        fetchPopularPosts("1d");
      });
      function loadPrevPeriod() {
        const duration = periodMap[recentPeriod.value][2];
        popSearchDate.value = subDate(1, `${duration}s`, new Date(popSearchDate.value));
      }
      function loadNextPeriod() {
        const duration = periodMap[recentPeriod.value][2];
        popSearchDate.value = addDate(1, `${duration}s`, new Date(popSearchDate.value));
      }
      function goToPopularPage() {
        location.href = "/post/popular_recent?period=1d&_wf=1";
      }
      function showPool() {
        store.showPostList = false;
        store.showPoolList = true;
        history.pushState("", "", "/pool");
      }
      const poolQueryTerm = Vue2.ref("");
      function searchPool() {
        eventBus.$emit("loadPoolsByQuery", poolQueryTerm.value);
      }
      function download(url, name) {
        loadingValue.value = 0;
        return downloadFile(url, name, {
          saveAs: false,
          onprogress: (d) => {
            loadingValue.value = d.loaded / d.total * 100;
          }
        });
      }
      const downloadUrlKey = Vue2.ref("fileUrl");
      const downloadNameMap = {
        fileUrl: "fileDownloadName",
        jpegUrl: "jpegDownloadName"
      };
      const downloadNameKey = Vue2.computed(() => {
        return downloadNameMap[downloadUrlKey.value] || "fileDownloadName";
      });
      const isGelbooru = location.host.includes("gelbooru");
      async function startDownload() {
        try {
          const len = store.selectedImageList.length;
          if (isGelbooru) {
            for (let index = 0; index < len; index++) {
              const item = store.selectedImageList[index];
              const downloadUrl = item[downloadUrlKey.value] || item.fileUrl;
              const downloadName = item[downloadNameKey.value];
              if (!downloadUrl)
                continue;
              download(downloadUrl, `${downloadName}`);
            }
            return;
          }
          for (let index = 0; index < len; index++) {
            const item = store.selectedImageList[index];
            const downloadUrl = item[downloadUrlKey.value] || item.fileUrl;
            let downloadName = store.isYKSite ? item.fileNameWithTags : item[downloadNameKey.value];
            if (isR34PahealHome()) {
              downloadName = `${downloadName}.${item.data.file_name.split(".").pop()}`;
            }
            if (!downloadUrl)
              continue;
            if (item.loaded)
              continue;
            Vue2.set(item, "loading", true);
            await download(downloadUrl, `${downloadName}`);
            Vue2.set(item, "loading", false);
            Vue2.set(item, "loaded", true);
          }
        } catch (error) {
          const msg = error;
          showMsg({ msg, type: "error" });
        }
      }
      const isExportUrlDecode = Vue2.ref(true);
      const isExportUrlEncode = Vue2.ref(false);
      async function exportFileUrls() {
        const urlText = store.selectedImageList.map((e) => {
          let url = e[downloadUrlKey.value] || e.fileUrl || "";
          if (store.isYKSite && isExportUrlDecode.value) {
            try {
              url = decodeURIComponent(url);
              url = decodeURI(url);
            } catch (e2) {
            }
          }
          if (isExportUrlEncode.value || isZerochanPage()) {
            url = encodeURI(url);
          }
          return url;
        }).join("\r\n");
        downloadText(urlText, "image-urls.txt");
      }
      const vuetify = useVuetify();
      function toggleDarkmode() {
        vuetify.theme.dark = !vuetify.theme.dark;
        localStorage.setItem("__darkmode", vuetify.theme.dark ? "dark" : "light");
      }
      const keyActions = {
        Enter: (cur) => loadPostsByPage(cur.toString()),
        ArrowUp: (cur) => cur > 1 && keyActions.Enter(--cur),
        ArrowDown: (cur) => keyActions.Enter(++cur),
        ArrowLeft: (cur) => keyActions.ArrowUp(cur),
        ArrowRight: (cur) => keyActions.ArrowDown(cur)
      };
      function goToPage(ev) {
        const action = keyActions[ev.key];
        if (!action)
          return;
        const input = ev.target;
        action((input == null ? void 0 : input.value) || 0);
      }
      function exitMasonry() {
        const url = new URL(location.href);
        url.searchParams.delete("_wf");
        location.assign(url);
      }
      async function toggleFullscreen() {
        try {
          if (document.fullscreenElement) {
            await document.exitFullscreen();
          } else {
            await document.documentElement.requestFullscreen();
          }
        } catch (error) {
          console.log("toggleFullscreen error: ", error);
        }
      }
      function selectLang(val) {
        settings.lang = val;
        i18n.locale = val;
      }
      Vue2.onMounted(() => {
        document.addEventListener("fullscreenchange", () => {
          store.isFullscreen = !!document.fullscreenElement;
        });
      });
      return { __sfc: true, title, isNoSelected, isOneOrMoreSelected, isAllSelected, loadingValue, selectAll, removeFromList, tagsQuery, searchState, onSearchTermInput, selectTag, userName, fetchTaggedPosts, showTagsInput, onSearchTermKeydown, showPopAction, periodMap, periodByDateMap, getRecentPeriod, isPopularRecent, getPopTitle, popTitle, isPopSearchByDate, recentPeriod, periodComputedMap, showPopDatePicker, popSearchDate, fetchPopularPosts, selPeriod, loadPrevPeriod, loadNextPeriod, goToPopularPage, showPool, poolQueryTerm, searchPool, download, downloadUrlKey, downloadNameMap, downloadNameKey, isGelbooru, startDownload, isExportUrlDecode, isExportUrlEncode, exportFileUrls, vuetify, toggleDarkmode, keyActions, goToPage, exitMasonry, toggleFullscreen, selectLang, mdiBrightness6, mdiCalendar, mdiCalendarSearch, mdiCheckUnderlineCircle, mdiCheckboxBlankOutline, mdiCheckboxIntermediate, mdiCheckboxMarked, mdiChevronLeft, mdiChevronRight, mdiCog, mdiDelete, mdiDownload, mdiFileClockOutline, mdiFire, mdiFullscreen, mdiFullscreenExit, mdiHome, mdiImageMultiple, mdiLocationExit, mdiMagnify, mdiShuffle, mdiStar, mdiTranslate, settings, store, toggleDrawer, langList, isSupportTagSearch, notPartialSupportSite, isSankakuSite, isZerochanPage };
    }
  });
  var _sfc_render$a = function render() {
    var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c("v-app-bar", { attrs: { "app": "", "dense": "", "flat": "", "elevation": 2 } }, [_c("v-app-bar-nav-icon", { on: { "click": function($event) {
      return _setup.toggleDrawer();
    } } }), _setup.store.isYKSite && _setup.showPopAction ? _c("div", { staticClass: "align-center", staticStyle: { "display": "flex" } }, [_c("v-toolbar-title", { staticClass: "mr-4 hidden-md-and-down", domProps: { "textContent": _vm._s(_setup.popTitle) } }), _c("v-switch", { staticClass: "hidden-sm-and-down", attrs: { "hide-details": "", "label": _setup.isPopSearchByDate ? _vm.$t("nd4UjZy2ILsc-iW9iu7xR") : _vm.$t("elkBQ9moOZ-KMcy5bt_Ts") }, model: { value: _setup.isPopSearchByDate, callback: function($$v) {
      _setup.isPopSearchByDate = $$v;
    }, expression: "isPopSearchByDate" } }), _c("v-menu", { attrs: { "transition": "slide-y-transition", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "ml-4", attrs: { "small": "" } }, "v-btn", attrs, false), on), [_c("v-icon", { attrs: { "left": "" } }, [_vm._v(_vm._s(_setup.mdiCalendarSearch))]), _c("span", { staticStyle: { "margin-bottom": "2px" } }, [_vm._v(_vm._s(_setup.periodComputedMap[_setup.recentPeriod][0]))])], 1)];
    } }], null, false, 638520899) }, [_c("v-list", { attrs: { "dense": "" } }, _vm._l(_setup.periodComputedMap, function(val, key) {
      return _c("v-list-item", { key, attrs: { "dense": "" }, on: { "click": function($event) {
        return _setup.selPeriod(key);
      } } }, [_c("v-list-item-title", [_c("v-icon", { attrs: { "left": "" } }, [_vm._v(_vm._s(val[1]))]), _c("span", [_vm._v(_vm._s(val[0]))])], 1)], 1);
    }), 1)], 1), _c("v-menu", { attrs: { "close-on-content-click": false, "transition": "scale-transition", "offset-y": "", "min-width": "auto" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _setup.isPopSearchByDate, expression: "isPopSearchByDate" }], staticClass: "ml-1 align-center hidden-sm-and-down", staticStyle: { "display": "flex", "width": "211px" } }, [_c("v-btn", { attrs: { "icon": "" }, on: { "click": function($event) {
        return _setup.loadPrevPeriod();
      } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiChevronLeft))])], 1), _c("v-text-field", _vm._g(_vm._b({ attrs: { "prepend-icon": _setup.mdiCalendar, "readonly": "", "hide-details": "" }, model: { value: _setup.popSearchDate, callback: function($$v) {
        _setup.popSearchDate = $$v;
      }, expression: "popSearchDate" } }, "v-text-field", attrs, false), on)), _c("v-btn", { attrs: { "icon": "" }, on: { "click": function($event) {
        return _setup.loadNextPeriod();
      } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiChevronRight))])], 1)], 1)];
    } }], null, false, 996853744), model: { value: _setup.showPopDatePicker, callback: function($$v) {
      _setup.showPopDatePicker = $$v;
    }, expression: "showPopDatePicker" } }, [_c("v-date-picker", { attrs: { "no-title": "", "locale": "zh-cn", "weekday-format": () => "" }, on: { "input": function($event) {
      _setup.showPopDatePicker = false;
    } }, model: { value: _setup.popSearchDate, callback: function($$v) {
      _setup.popSearchDate = $$v;
    }, expression: "popSearchDate" } })], 1), _c("v-btn", { staticClass: "ml-3 hidden-sm-and-down", attrs: { "icon": "", "href": "/post?_wf=1" } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiHome))])], 1)], 1) : _setup.store.showPostList ? _c("div", { staticClass: "align-center", staticStyle: { "display": "flex" } }, [_c("v-toolbar-title", { staticClass: "hidden-md-and-down", domProps: { "textContent": _vm._s(_setup.title) } }), !_setup.isSankakuSite ? _c("input", { staticClass: "ml-1 mr-2 text-center rounded", style: { width: "40px", height: "30px", border: "1px solid #bbb", color: "inherit" }, domProps: { "value": _setup.store.currentPage }, on: { "keyup": function($event) {
      return _setup.goToPage($event);
    } } }) : _vm._e(), _setup.store.isYKSite ? [_setup.userName ? _c("v-btn", { staticClass: "hidden-sm-and-down", attrs: { "title": _vm.$t("HzMBcS2oNGVIoLiHWprim"), "icon": "" }, on: { "click": function($event) {
      return _setup.fetchTaggedPosts(`vote:3:${_setup.userName} order:vote`);
    } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiStar))])], 1) : _vm._e(), _c("v-btn", { staticClass: "hidden-sm-and-down", attrs: { "title": _vm.$t("DXEhXAQbkiCMU_l252jo_"), "icon": "" }, on: { "click": function($event) {
      return _setup.showPool();
    } } }, [_c("v-icon", { attrs: { "size": 20 } }, [_vm._v(_vm._s(_setup.mdiImageMultiple))])], 1), _c("v-btn", { staticClass: "hidden-sm-and-down", attrs: { "title": _vm.$t("9juZMc0gPIgvMPKVORpJ1"), "icon": "" }, on: { "click": function($event) {
      return _setup.goToPopularPage();
    } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiFire))])], 1), _c("v-btn", { staticClass: "hidden-sm-and-down", attrs: { "title": _vm.$t("6acPWiYq2-OdySa2_xqDu"), "icon": "" }, on: { "click": function($event) {
      return _setup.fetchTaggedPosts("order:random");
    } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiShuffle))])], 1)] : _vm._e(), _setup.isSupportTagSearch || _setup.isSankakuSite ? [_c("v-menu", { attrs: { "max-width": 200, "max-height": "80vh", "transition": "slide-y-transition", "nudge-bottom": "5px", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on }) {
      return [_c("v-slide-x-transition", [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _setup.searchState.showInput, expression: "searchState.showInput" }], staticClass: "app-bar-tag-input ml-4", staticStyle: { "width": "200px" } }, [_c("v-text-field", _vm._g({ attrs: { "hide-details": "" }, on: { "input": _setup.onSearchTermInput, "click": function($event) {
        _setup.searchState.showMenu = true;
      }, "blur": function($event) {
        _setup.searchState.showMenu = false;
      }, "keydown": _setup.onSearchTermKeydown }, model: { value: _setup.searchState.searchTerm, callback: function($$v) {
        _vm.$set(_setup.searchState, "searchTerm", $$v);
      }, expression: "searchState.searchTerm" } }, on))], 1)])];
    } }], null, false, 1463821240), model: { value: _setup.searchState.showMenu, callback: function($$v) {
      _vm.$set(_setup.searchState, "showMenu", $$v);
    }, expression: "searchState.showMenu" } }, [_setup.searchState.searchItems.length ? _c("v-list", { staticClass: "ac_tags_list", attrs: { "dense": "" } }, [_c("v-progress-linear", { attrs: { "active": _setup.searchState.loading, "height": 4, "indeterminate": "", "absolute": "", "top": "" } }), _vm._l(_setup.searchState.searchItems, function(item) {
      return _c("v-list-item", { key: item, attrs: { "dense": "" }, on: { "click": function($event) {
        return _setup.selectTag(item);
      } } }, [_c("v-list-item-title", { domProps: { "textContent": _vm._s(item) } })], 1);
    })], 2) : _vm._e()], 1), _c("v-btn", { attrs: { "title": _vm.$t("ZztrWbSaaaas3v0cHtSmh"), "icon": "" }, on: { "click": function($event) {
      return _setup.showTagsInput();
    } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiMagnify))])], 1)] : _vm._e()], 2) : _setup.store.showPoolList ? _c("div", { staticClass: "align-center", staticStyle: { "display": "flex" } }, [_setup.store.showPoolList ? _c("v-toolbar-title", { staticClass: "mr-3 hidden-md-and-down" }, [_vm._v("Pools")]) : _vm._e(), _c("v-text-field", { attrs: { "hide-details": "", "append-icon": _setup.mdiMagnify }, on: { "keyup": function($event) {
      if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter"))
        return null;
      return _setup.searchPool.apply(null, arguments);
    } }, model: { value: _setup.poolQueryTerm, callback: function($$v) {
      _setup.poolQueryTerm = $$v;
    }, expression: "poolQueryTerm" } }), _c("v-btn", { staticClass: "ml-3", attrs: { "icon": "", "href": "/post?_wf=1" } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiHome))])], 1), _c("v-btn", { staticClass: "hidden-sm-and-down", attrs: { "title": _vm.$t("9juZMc0gPIgvMPKVORpJ1"), "icon": "" }, on: { "click": function($event) {
      return _setup.goToPopularPage();
    } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiFire))])], 1)], 1) : _vm._e(), _c("v-spacer"), _setup.store.showPostList && _setup.notPartialSupportSite ? [_c("span", { directives: [{ name: "show", rawName: "v-show", value: _setup.store.selectedImageList.length, expression: "store.selectedImageList.length" }], staticClass: "hidden-md-and-down ml-1 mr-1", staticStyle: { "margin-top": "2px" } }, [_vm._v(" " + _vm._s(_setup.store.selectedImageList.length) + " ")]), _c("v-btn", { staticClass: "hidden-md-and-down", attrs: { "icon": "" }, on: { "click": _setup.selectAll } }, [_c("v-icon", { directives: [{ name: "show", rawName: "v-show", value: _setup.isNoSelected, expression: "isNoSelected" }] }, [_vm._v(_vm._s(_setup.mdiCheckboxBlankOutline))]), _c("v-icon", { directives: [{ name: "show", rawName: "v-show", value: _setup.isOneOrMoreSelected, expression: "isOneOrMoreSelected" }] }, [_vm._v(_vm._s(_setup.mdiCheckboxIntermediate))]), _c("v-icon", { directives: [{ name: "show", rawName: "v-show", value: _setup.isAllSelected, expression: "isAllSelected" }] }, [_vm._v(_vm._s(_setup.mdiCheckboxMarked))])], 1), _c("v-menu", { attrs: { "dense": "", "offset-y": "", "close-on-content-click": false }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "hidden-md-and-down", attrs: { "title": _vm.$t("OKs1ePekQA4Ona839U114"), "icon": "" } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiDownload))])], 1)];
    } }], null, false, 1780380651) }, [_c("v-list", { staticStyle: { "min-width": "300px", "max-height": "80vh", "overflow": "auto" }, attrs: { "dense": "", "flat": "" } }, [_c("v-subheader", { staticClass: "ml-2" }, [_c("span", { staticClass: "mr-4" }, [_vm._v(_vm._s(_vm.$t("OKs1ePekQA4Ona839U114")))]), _c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.store.selectedImageList.length > 0, expression: "store.selectedImageList.length > 0" }], attrs: { "small": "" }, on: { "click": _setup.startDownload } }, [_vm._v(" " + _vm._s(_vm.$t("cKn4cfAxzdgh_HD6OFibB")) + " ")]), _c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.store.selectedImageList.length > 0, expression: "store.selectedImageList.length > 0" }], staticClass: "ml-2", attrs: { "small": "" }, on: { "click": _setup.exportFileUrls } }, [_vm._v(" " + _vm._s(_vm.$t("J2Ckb_-LITfmww4aEksqk")) + " ")])], 1), _setup.store.isYKSite ? _c("div", { staticClass: "d-flex align-center mt-1 ml-2" }, [_c("v-radio-group", { staticClass: "mr-1 mt-0", attrs: { "hide-details": "", "dense": "", "row": "" }, model: { value: _setup.downloadUrlKey, callback: function($$v) {
      _setup.downloadUrlKey = $$v;
    }, expression: "downloadUrlKey" } }, [_c("v-radio", { attrs: { "label": _vm.$t("aVqN9TBRCbNGsW3Y2D2Nm"), "value": "jpegUrl" } }), _c("v-radio", { attrs: { "label": _vm.$t("jDjashxA-oBPo19DXI504"), "value": "fileUrl" } })], 1), _c("v-switch", { staticClass: "mt-0 mr-1", attrs: { "label": "Decode URL", "hide-details": "", "dense": "" }, model: { value: _setup.isExportUrlDecode, callback: function($$v) {
      _setup.isExportUrlDecode = $$v;
    }, expression: "isExportUrlDecode" } })], 1) : _vm._e(), !_setup.isZerochanPage() ? _c("div", { staticClass: "d-flex align-center mt-1 ml-2" }, [_c("v-switch", { staticClass: "mt-0 mr-1", attrs: { "label": "Encode URL", "hide-details": "", "dense": "" }, model: { value: _setup.isExportUrlEncode, callback: function($$v) {
      _setup.isExportUrlEncode = $$v;
    }, expression: "isExportUrlEncode" } })], 1) : _vm._e(), _c("v-list-item-group", { attrs: { "color": "primary" } }, _vm._l(_setup.store.selectedImageList, function(item) {
      return _c("v-list-item", { key: item.id, attrs: { "dense": "", "two-line": "" } }, [_c("v-list-item-avatar", [!item.loading && !item.loaded ? _c("v-btn", { attrs: { "icon": "" } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiFileClockOutline))])], 1) : _vm._e(), item.loaded ? _c("v-btn", { attrs: { "icon": "", "color": "green" } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiCheckUnderlineCircle))])], 1) : _vm._e(), item.loading ? _c("v-progress-circular", { attrs: { "rotate": -90, "size": 28, "value": _setup.loadingValue, "color": "pink" } }) : _vm._e()], 1), _c("v-list-item-content", { staticStyle: { "max-width": "240px" } }, [_c("v-list-item-subtitle", { attrs: { "title": item.fileNameWithTags }, domProps: { "textContent": _vm._s(item.fileNameWithTags) } }), _c("v-list-item-subtitle", { attrs: { "title": item[_setup.downloadUrlKey] }, domProps: { "textContent": _vm._s(item[_setup.downloadUrlKey]) } })], 1), _c("v-list-item-action", [_c("v-btn", { attrs: { "icon": "" }, on: { "click": function($event) {
        return _setup.removeFromList(item.id);
      } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiDelete))])], 1)], 1)], 1);
    }), 1)], 1)], 1)] : _vm._e(), _c("v-btn", { attrs: { "title": _vm.$t("u8mEnSo4mxDRUbj7FeAll"), "icon": "" }, on: { "click": _setup.toggleDarkmode } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiBrightness6))])], 1), _c("v-btn", { staticClass: "hidden-md-and-down", attrs: { "title": _vm.$t("OrwwNKZ7I70-ecpspE8d_"), "icon": "" }, on: { "click": _setup.toggleFullscreen } }, [_c("v-icon", { attrs: { "size": 30 } }, [_vm._v(_vm._s(_setup.store.isFullscreen ? _setup.mdiFullscreenExit : _setup.mdiFullscreen))])], 1), _c("v-menu", { attrs: { "transition": "slide-y-transition", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "hidden-md-and-down", attrs: { "title": "Language", "icon": "" } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiTranslate))])], 1)];
    } }]) }, [_c("v-list", { attrs: { "dense": "" } }, [_c("v-list-item-group", { attrs: { "value": _setup.settings.lang, "color": "primary" } }, _vm._l(_setup.langList, function(lang) {
      return _c("v-list-item", { key: lang.value, attrs: { "value": lang.value, "dense": "" }, on: { "click": function($event) {
        return _setup.selectLang(lang.value);
      } } }, [_c("v-list-item-title", [_vm._v(_vm._s(lang.label))])], 1);
    }), 1)], 1)], 1), _c("v-btn", { attrs: { "title": _vm.$t("UxxldE9xRwmQctrvba5Y8"), "icon": "" }, on: { "click": function($event) {
      _setup.store.showSettings = true;
    } } }, [_c("v-icon", { attrs: { "size": 22 } }, [_vm._v(_vm._s(_setup.mdiCog))])], 1), _c("v-btn", { staticClass: "hidden-md-and-down", attrs: { "title": _vm.$t("ClZdL9hGweOokP7Mn_Ptq"), "icon": "" }, on: { "click": _setup.exitMasonry } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiLocationExit))])], 1), _c("v-progress-linear", { attrs: { "active": _setup.store.requestLoading, "height": 6, "indeterminate": "", "absolute": "", "bottom": "" } })], 2);
  };
  var _sfc_staticRenderFns$a = [];
  var __component__$a = /* @__PURE__ */ normalizeComponent(
    _sfc_main$a,
    _sfc_render$a,
    _sfc_staticRenderFns$a,
    false,
    null,
    null,
    null,
    null
  );
  var AppBar = __component__$a.exports;
  var _sfc_main$9 = /* @__PURE__ */ Vue2.defineComponent({
    __name: "NavDrawer",
    setup(__props) {
      const userName = Vue2.ref("");
      const version = Vue2.ref(GM_info.script.version);
      function openLink(link) {
        window.open(link, "_blank", "noreferrer");
      }
      function handleLink(link) {
        if (link.includes("yande"))
          return "https://yande.re/post?_wf=1";
        if (link.includes("behoimi"))
          return "http://behoimi.org";
        return `https://${link}`;
      }
      function handleFavicon(link) {
        if (link.includes("konachan"))
          return "https://upload-bbs.miyoushe.com/upload/2023/01/14/190122060/cbd0b71ead30e0777e5b023170ba415c_4819570566325089051.png";
        if (link.includes("behoimi"))
          return "https://upload-bbs.miyoushe.com/upload/2023/01/14/190122060/d3b97f45046795c87c12ad5704074f32_1333245617164582614.png";
        if (link.includes("sankaku") || link.includes("idolcomplex"))
          return "https://upload-bbs.miyoushe.com/upload/2025/03/29/190122060/4fa56922d173d28ac8e687caaa487f27_1885629069482225420.png";
        if (link.includes("rule34.xxx"))
          return "https://upload-bbs.miyoushe.com/upload/2025/03/29/190122060/76ba90d4350a1455f899d2a1500fca69_8344852329496206545.png";
        if (link.includes("rule34hentai.net"))
          return "https://prod-alicdn-community.kurobbs.com/forum/ee44a4b6a2cc4f08b693cfc4e364b1fa20260129.png";
        if (link.includes("aibooru.online"))
          return "https://prod-alicdn-community.kurobbs.com/forum/177e56ba1e704d6b85e492a365642dd920260129.png";
        if (link.includes("allthefallen") || link.includes("allgirl"))
          return "https://kwc.cocomi.eu.org/https://danbooru.donmai.us/favicon.ico";
        return `https://kwc.cocomi.eu.org/https://${link.split("/")[0]}/favicon.ico`;
      }
      const actSiteIndex = Vue2.computed(() => {
        return siteDomains.findIndex((e) => location.href.includes(e));
      });
      function showSettingDrawer() {
        store.showDrawer = false;
        store.showSettings = true;
      }
      Vue2.onMounted(async () => {
        if (store.isYKSite) {
          const name = await getUsername();
          if (name)
            userName.value = name;
        }
      });
      return { __sfc: true, userName, version, openLink, handleLink, handleFavicon, actSiteIndex, showSettingDrawer, mdiAccount, mdiFire, mdiGithub, mdiImageMultiple, mdiInformationOutline, mdiMessageAlertOutline, mdiShuffle, mdiStar, mdiWeb, getSiteTitle, siteDomains, store };
    }
  });
  var _sfc_render$9 = function render() {
    var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c("v-navigation-drawer", { staticClass: "nav_drawer", attrs: { "app": "", "temporary": "" }, model: { value: _setup.store.showDrawer, callback: function($$v) {
      _vm.$set(_setup.store, "showDrawer", $$v);
    }, expression: "store.showDrawer" } }, [_c("v-list-item", [_c("v-list-item-avatar", [_c("img", { attrs: { "width": "40", "src": "https://upload-bbs.mihoyo.com/upload/2022/09/07/190122060/8505ff4b535cb1487b521d73c7f71d63_865024295271530650.png", "alt": "", "loading": "lazy" } })]), _c("v-list-item-content", [_c("v-list-item-title", { staticClass: "title" }, [_vm._v("Booru Masonry")]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("l8CbIALt_VWUnzBl_Rmgf") } }, [_vm._v(_vm._s(_vm.$t("l8CbIALt_VWUnzBl_Rmgf")))])], 1)], 1), _c("v-divider"), _setup.store.isYKSite ? _c("v-list", { attrs: { "dense": "", "nav": "" } }, [_c("v-list-group", { attrs: { "value": true, "no-action": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function() {
      return [_c("v-list-item-content", [_c("v-list-item-title", { staticClass: "title" }, [_vm._v(_vm._s(_vm.$t("CacM8tispuPNrSxxpt9GX")))])], 1)];
    }, proxy: true }], null, false, 765759728) }, [_setup.userName ? _c("v-list-item", { attrs: { "link": "", "href": "/user/home" } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiAccount))])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_setup.userName))])], 1)], 1) : _vm._e(), _setup.userName ? _c("v-list-item", { attrs: { "link": "", "href": `/post?tags=vote%3A3%3A${_setup.userName}+order%3Avote&_wf=1` } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiStar))])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("zs8YTCc8d8XFUgRnp7m_w")))])], 1)], 1) : _vm._e(), _c("v-list-item", { attrs: { "link": "", "href": "/pool?page=1" } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiImageMultiple))])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("DXEhXAQbkiCMU_l252jo_")))])], 1)], 1), _c("v-list-item", { attrs: { "link": "", "href": "/post/popular_recent?period=1d" } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiFire))])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("7Cgsr4PUMbezDXNfWdvWH")))])], 1)], 1), _c("v-list-item", { attrs: { "link": "", "href": "/post?tags=order%3Arandom&page=1" } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiShuffle))])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("StU1-52QJmNFKQ5soJCyG")))])], 1)], 1)], 1)], 1) : _vm._e(), _c("v-list", { attrs: { "dense": "", "nav": "" } }, [_c("v-list-group", { attrs: { "value": true, "no-action": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function() {
      return [_c("v-list-item-content", [_c("v-list-item-title", { staticClass: "title" }, [_vm._v(_vm._s(_vm.$t("e2_EYvweJsVoIZlIWkPRV")))])], 1)];
    }, proxy: true }]) }, [_c("v-list-item-group", { attrs: { "value": _setup.actSiteIndex, "color": "primary" } }, [_vm._l(_setup.siteDomains, function(link) {
      return _c("v-list-item", { key: link, attrs: { "href": _setup.handleLink(link), "referrerpolicy": "no-referrer" } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("img", { staticClass: "site_icon", attrs: { "src": _setup.handleFavicon(link), "loading": "lazy", "referrerpolicy": "no-referrer" } })]), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_setup.getSiteTitle(link)))])], 1)], 1);
    }), _c("hr", { staticClass: "my-2" }), _c("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://pixiv.pictures/?ref=booru.vercel.app");
    } } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("img", { staticClass: "site_icon", attrs: { "src": "https://pixiv.pictures/favicon.ico", "loading": "lazy", "referrerpolicy": "no-referrer" } })]), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("Pixiv Viewer")])], 1)], 1), _c("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://moeview.cocomi.eu.org/?ref=booru.vercel.app");
    } } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("img", { staticClass: "site_icon", attrs: { "src": "https://moeview.cocomi.eu.org/favicon.ico", "loading": "lazy", "referrerpolicy": "no-referrer" } })]), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("Moeview")])], 1)], 1), _c("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://r-34.xyz/?ref=booru.vercel.app");
    } } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("img", { staticClass: "site_icon", attrs: { "src": "https://r-34.xyz/favicon.ico", "loading": "lazy", "referrerpolicy": "no-referrer" } })]), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("R-34.XYZ")])], 1)], 1), _c("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://nekon.app/?ref=booru.vercel.app");
    } } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("img", { staticClass: "site_icon", attrs: { "src": "https://nekon.app/favicon.ico", "loading": "lazy", "referrerpolicy": "no-referrer" } })]), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("Nekon")])], 1)], 1), _c("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://www.someacg.top/?ref=booru.vercel.app");
    } } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("img", { staticClass: "site_icon", attrs: { "src": "https://www.someacg.top/favicon.png", "loading": "lazy", "referrerpolicy": "no-referrer" } })]), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("SomeACG")])], 1)], 1), _c("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://manyacg.top/?ref=booru.vercel.app");
    } } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("img", { staticClass: "site_icon", attrs: { "src": "https://manyacg.top/favicon.ico", "loading": "lazy", "referrerpolicy": "no-referrer" } })]), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("ManyACG")])], 1)], 1), _c("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://pic.cosine.ren/?ref=booru.vercel.app");
    } } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("img", { staticClass: "site_icon", attrs: { "src": "https://pic.cosine.ren/favicon.ico", "loading": "lazy", "referrerpolicy": "no-referrer" } })]), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("Cosine Gallery")])], 1)], 1)], 2)], 1)], 1), _c("v-list", { attrs: { "dense": "", "nav": "" } }, [_c("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.showSettingDrawer();
    } } }, [_c("v-list-item-content", [_c("v-list-item-title", { staticClass: "title" }, [_vm._v(_vm._s(_vm.$t("UxxldE9xRwmQctrvba5Y8")))])], 1)], 1)], 1), _c("v-list", { attrs: { "dense": "", "nav": "" } }, [_c("v-list-group", { attrs: { "value": true, "no-action": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function() {
      return [_c("v-list-item-content", [_c("v-list-item-title", { staticClass: "title" }, [_vm._v(_vm._s(_vm.$t("PT74UDfKA45vTVTst_-hD")))])], 1)];
    }, proxy: true }]) }, [_c("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://github.com/asadahimeka/yandere-masonry/blob/main/CHANGELOG.md");
    } } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiInformationOutline))])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("v" + _vm._s(_setup.version))]), _c("v-list-item-subtitle", [_vm._v(_vm._s(_vm.$t("iJ0h220tvMmUhkfIMYI-W")))])], 1)], 1), _c("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://booru.cocomi.eu.org");
    } } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiWeb))])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("qWcqQRsE9nN43MaZ2BmN9")))]), _c("v-list-item-subtitle", [_vm._v(_vm._s(_vm.$t("jerGO2OCuW9TdnEnGYRWd")))])], 1)], 1), _c("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://github.com/asadahimeka/yandere-masonry/issues");
    } } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiMessageAlertOutline))])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("23iEYyiQlLVhFIqGbj527")))]), _c("v-list-item-subtitle", [_vm._v(_vm._s(_vm.$t("4g1TUy2kwQrdOs-w4JobB")))])], 1)], 1), _c("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://github.com/asadahimeka/yandere-masonry");
    } } }, [_c("v-list-item-icon", { staticClass: "mr-2" }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiGithub))])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("Github")]), _c("v-list-item-subtitle", [_vm._v(_vm._s(_vm.$t("7Xq5puLNcT0mAvoxElqdf")))])], 1)], 1)], 1)], 1)], 1);
  };
  var _sfc_staticRenderFns$9 = [];
  var __component__$9 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$9,
    _sfc_render$9,
    _sfc_staticRenderFns$9,
    false,
    null,
    null,
    null,
    null
  );
  var NavDrawer = __component__$9.exports;
  var _sfc_main$8 = /* @__PURE__ */ Vue2.defineComponent({
    __name: "SettingsDrawer",
    setup(__props) {
      const isBoorus = Vue2.ref(isBooruSite());
      const isYandere = Vue2.ref(location.hostname == "yande.re");
      const currentLanglabel = Vue2.computed(() => {
        var _a2;
        return (_a2 = langList.find((e) => e.value === settings.lang)) == null ? void 0 : _a2.label;
      });
      function selectLang(val) {
        settings.lang = val;
        i18n.locale = val;
      }
      function removeTagFromBlacklist(item) {
        settings.blacklist = settings.blacklist.filter((e) => e != item);
      }
      function exportBlacklist() {
        navigator.clipboard.writeText(settings.blacklist.join(",")).then(() => showMsg({ msg: i18n.t("99kLMSzDYJCAf1yK9QYzy") })).catch(() => showMsg({ msg: i18n.t("si-zDDRFrEwDTCkp53Q44"), type: "error" }));
      }
      function importBlacklist() {
        navigator.clipboard.readText().then((text) => {
          if (text) {
            settings.blacklist = [.../* @__PURE__ */ new Set([
              ...settings.blacklist,
              ...text.split(",").filter(Boolean)
            ])];
          }
        }).catch(() => showMsg({ msg: i18n.t("si-zDDRFrEwDTCkp53Q44"), type: "error" }));
      }
      const dlSubLoading = Vue2.ref(false);
      const showDLConfirm = Vue2.ref(false);
      function setDLSubpathOn(val) {
        settings.isDLSubpath = val;
        showDLConfirm.value = false;
        dlSubLoading.value = false;
      }
      function onDLSubpathChange(val) {
        dlSubLoading.value = true;
        if (val) {
          showDLConfirm.value = true;
        } else {
          setDLSubpathOn(false);
        }
      }
      const { width: windowWidth } = useWindowSize();
      const allColList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20];
      const colList = Vue2.computed(() => settings.masonryLayout == "virtual" ? allColList.filter((e) => e < (windowWidth.value - 32) / 300) : allColList);
      const cols = Vue2.computed(() => colList.value.map((e) => [`${e}`, e === 0 ? i18n.t("uxIs3XkeVzkrEX985zHk3").toString() : `${e} ${i18n.t("dU7ou5kVM0s9DMju5e2tS")}`]));
      const actCol = Vue2.computed(() => {
        return colList.value.findIndex((e) => e.toString() === settings.selectedColumn);
      });
      const layoutTypes = Vue2.ref([
        ["masonry", `Masonry/${i18n.t("6jPGehET9TViankl5-SRu")}`],
        ["grid", `Grid/${i18n.t("vfUg8xP6WptIhSL0E9b9D")}`],
        ["justified", `Justified/${i18n.t("LZbI8am7nD-LiemZzroFF")}`],
        ["virtual", `Virtual/${i18n.t("yYtssYrCL8VwFrdvvx8v3")}`],
        ["masonry2", `Masonry2/${i18n.t("6jPGehET9TViankl5-SRu")}`]
      ]);
      const actLayout = Vue2.computed(() => {
        var _a2, _b, _c;
        return (_c = (_b = (_a2 = layoutTypes.value.find((e) => e[0] === settings.masonryLayout)) == null ? void 0 : _a2[1]) == null ? void 0 : _b.split("/")) == null ? void 0 : _c[0];
      });
      const actLayoutIndex = Vue2.computed(() => {
        return layoutTypes.value.findIndex((e) => e[0] === settings.masonryLayout);
      });
      function onMasonryLayoutChange(val) {
        settings.masonryLayout = val;
        settings.selectedColumn = "0";
      }
      function onPreloadNumBlur(ev) {
        const input = ev.target;
        if (input.validationMessage) {
          input.value = "1";
          settings.imgPreloadNum = 1;
        } else {
          const num = Number(input.value) || 1;
          settings.imgPreloadNum = num;
        }
      }
      return { __sfc: true, isBoorus, isYandere, currentLanglabel, selectLang, removeTagFromBlacklist, exportBlacklist, importBlacklist, dlSubLoading, showDLConfirm, setDLSubpathOn, onDLSubpathChange, windowWidth, allColList, colList, cols, actCol, layoutTypes, actLayout, actLayoutIndex, onMasonryLayoutChange, onPreloadNumBlur, mdiChevronDown, mdiClose, mdiContentCopy, mdiContentPaste, settings, store, langList, notPartialSupportSite };
    }
  });
  var _sfc_render$8 = function render() {
    var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c("v-navigation-drawer", { staticClass: "nav_drawer settings_drawer", attrs: { "width": 400, "app": "", "temporary": "", "right": "" }, model: { value: _setup.store.showSettings, callback: function($$v) {
      _vm.$set(_setup.store, "showSettings", $$v);
    }, expression: "store.showSettings" } }, [_c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", { staticClass: "title" }, [_vm._v(_vm._s(_vm.$t("UxxldE9xRwmQctrvba5Y8")))]), _c("v-list-item-subtitle", [_vm._v(_vm._s(_vm.$t("Uw9QwD1SaR2VjZEqDYRdb")))])], 1), _c("v-list-item-icon", { on: { "click": function($event) {
      _setup.store.showSettings = false;
    } } }, [_c("v-btn", { attrs: { "icon": "" } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiClose))])], 1)], 1)], 1), _c("v-divider"), _c("v-list", { attrs: { "dense": "", "nav": "" } }, [_c("v-list-item", { staticClass: "hidden-lg-and-up" }, [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("e4_fgvntwNlfxgJUc2dXK")))])], 1), _c("v-list-item-action", [_c("v-menu", { attrs: { "transition": "slide-y-transition", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "sel_menu_btn", staticStyle: { "max-width": "100px" }, attrs: { "small": "" } }, "v-btn", attrs, false), on), [_vm._v(" " + _vm._s(_setup.currentLanglabel) + " "), _c("v-icon", { attrs: { "size": 16 } }, [_vm._v(_vm._s(_setup.mdiChevronDown))])], 1)];
    } }]) }, [_c("v-list", { attrs: { "dense": "" } }, [_c("v-list-item-group", { attrs: { "value": _setup.settings.lang, "color": "primary" } }, _vm._l(_setup.langList, function(lang) {
      return _c("v-list-item", { key: lang.value, attrs: { "value": lang.value, "dense": "" }, on: { "click": function($event) {
        return _setup.selectLang(lang.value);
      } } }, [_c("v-list-item-title", [_vm._v(_vm._s(lang.label))])], 1);
    }), 1)], 1)], 1)], 1)], 1), _c("v-list-item", { staticClass: "mb-0" }, [_c("v-list-item-content", [_c("v-list-item-title", [_c("div", { staticClass: "d-flex align-center" }, [_c("span", [_vm._v(_vm._s(_vm.$t("_Efl8k8uYQj9iJmj3kwbd")))]), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "ml-2", attrs: { "icon": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.exportBlacklist.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c("v-icon", { attrs: { "size": 18 } }, [_vm._v(_vm._s(_setup.mdiContentCopy))])], 1)];
    } }]) }, [_c("span", [_vm._v(_vm._s(_vm.$t("EVPG1YZDtykdz3htyf11u")))])]), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ attrs: { "icon": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.importBlacklist.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c("v-icon", { attrs: { "size": 18 } }, [_vm._v(_vm._s(_setup.mdiContentPaste))])], 1)];
    } }]) }, [_c("span", [_vm._v(_vm._s(_vm.$t("kCYFwKpwznYIKRmB1tCww")))])])], 1)]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("jMod2JozzAnwHuD-3KuPb") } }, [_vm._v(_vm._s(_vm.$t("jMod2JozzAnwHuD-3KuPb")))])], 1)], 1), _c("v-list-item", { staticClass: "pa-0" }, [_c("v-list-item-content", { staticClass: "pt-0" }, [_c("v-combobox", { staticClass: "blacklist_combobox ma-0 pa-0", attrs: { "append-icon": null, "items": [], "hide-details": "", "hide-no-data": "", "multiple": "", "outlined": "", "dense": "", "chips": "" }, scopedSlots: _vm._u([{ key: "selection", fn: function({ item }) {
      return [_c("v-chip", { attrs: { "label": "", "small": "", "outlined": "", "close": "" }, on: { "click:close": function($event) {
        return _setup.removeTagFromBlacklist(item);
      } } }, [_c("span", [_vm._v(_vm._s(item))])])];
    } }]), model: { value: _setup.settings.blacklist, callback: function($$v) {
      _vm.$set(_setup.settings, "blacklist", $$v);
    }, expression: "settings.blacklist" } })], 1)], 1), _setup.isBoorus ? [_c("v-list-item", { staticClass: "mb-0" }, [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("RstKmO7YVQMpaDoucxUel")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("1F-R4qChHIzZaohu5GJzl") } }, [_vm._v(_vm._s(_vm.$t("1F-R4qChHIzZaohu5GJzl")))])], 1)], 1), _c("v-list-item", { staticClass: "pa-0" }, [_c("v-list-item-content", { staticClass: "pt-0" }, [_c("v-text-field", { staticClass: "blacklist_combobox ma-0 pa-0", attrs: { "hide-details": "", "outlined": "", "dense": "" }, model: { value: _setup.settings.credentialQuery, callback: function($$v) {
      _vm.$set(_setup.settings, "credentialQuery", $$v);
    }, expression: "settings.credentialQuery" } })], 1)], 1)] : _vm._e(), _setup.notPartialSupportSite ? _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("Lm_HFVHpv4XCjilV3NLKu")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("A16qoBulYQJLbHe9mqNwm") } }, [_vm._v(_vm._s(_vm.$t("A16qoBulYQJLbHe9mqNwm")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "", "color": "deep-orange darken-1" }, model: { value: _setup.settings.showNSFWContents, callback: function($$v) {
      _vm.$set(_setup.settings, "showNSFWContents", $$v);
    }, expression: "settings.showNSFWContents" } })], 1)], 1) : _vm._e(), _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("_nQfaNuwbvPAIFKOY6_7u")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("SIUUZ4wqJTOilEdcX3EOi") } }, [_vm._v(_vm._s(_vm.$t("SIUUZ4wqJTOilEdcX3EOi")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "" }, model: { value: _setup.settings.isListenWheelEvent, callback: function($$v) {
      _vm.$set(_setup.settings, "isListenWheelEvent", $$v);
    }, expression: "settings.isListenWheelEvent" } })], 1)], 1), _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("fVE5taO6GDTPbILat4GCt")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("w95XGurDhDfOfw7XH4JFW") } }, [_vm._v(_vm._s(_vm.$t("w95XGurDhDfOfw7XH4JFW")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "" }, model: { value: _setup.settings.isListenKeyupEvent, callback: function($$v) {
      _vm.$set(_setup.settings, "isListenKeyupEvent", $$v);
    }, expression: "settings.isListenKeyupEvent" } })], 1)], 1), _setup.notPartialSupportSite ? _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("kFcteLMfnoezhOwuTlLFC")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("FT1uJs8XG__n5qBvuFsH4") } }, [_vm._v(_vm._s(_vm.$t("FT1uJs8XG__n5qBvuFsH4")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "" }, model: { value: _setup.settings.isFullImgPreload, callback: function($$v) {
      _vm.$set(_setup.settings, "isFullImgPreload", $$v);
    }, expression: "settings.isFullImgPreload" } })], 1)], 1) : _vm._e(), _setup.notPartialSupportSite && _setup.settings.isFullImgPreload ? _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("G3b7rbyQEj3_rgzVsNJZY")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("iRt9V9wNQASic3D7-wTZo") } }, [_vm._v(_vm._s(_vm.$t("iRt9V9wNQASic3D7-wTZo")))])], 1), _c("v-list-item-action", { staticClass: "pl-1" }, [_c("input", { staticClass: "text-center rounded preload_num", attrs: { "type": "number", "min": "0", "max": "5" }, domProps: { "value": _setup.settings.imgPreloadNum }, on: { "blur": _setup.onPreloadNumBlur } })])], 1) : _vm._e(), _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", { attrs: { "title": _vm.$t("kop_-39vkeg-bz2wztJ9O") } }, [_vm._v(_vm._s(_vm.$t("kop_-39vkeg-bz2wztJ9O")))]), _c("v-list-item-subtitle", { attrs: { "title": "Masonry/Grid/Justified/Virtual" } }, [_vm._v("Masonry/Grid/Justified/Virtual")])], 1), _c("v-list-item-action", [_c("v-menu", { attrs: { "transition": "slide-y-transition", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "sel_menu_btn", staticStyle: { "max-width": "100px" }, attrs: { "small": "" } }, "v-btn", attrs, false), on), [_vm._v(" " + _vm._s(_setup.actLayout) + " "), _c("v-icon", { attrs: { "size": 16 } }, [_vm._v(_vm._s(_setup.mdiChevronDown))])], 1)];
    } }]) }, [_c("v-list", { attrs: { "dense": "" } }, [_c("v-list-item-group", { attrs: { "value": _setup.actLayoutIndex, "color": "primary" } }, _vm._l(_setup.layoutTypes, function(item) {
      return _c("v-list-item", { key: item[0], attrs: { "dense": "" }, on: { "click": function($event) {
        return _setup.onMasonryLayoutChange(item[0]);
      } } }, [_c("v-list-item-title", { domProps: { "textContent": _vm._s(item[1]) } })], 1);
    }), 1)], 1)], 1)], 1)], 1), ["masonry", "grid", "virtual"].includes(_setup.settings.masonryLayout) ? _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("tt_YdgKCA_5m-aSTSMPQ_")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("rXjhc8VuGloy1wZ09noNB") } }, [_vm._v(_vm._s(_vm.$t("rXjhc8VuGloy1wZ09noNB")))])], 1), _c("v-list-item-action", [_c("v-menu", { attrs: { "transition": "slide-y-transition", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "sel_menu_btn", attrs: { "small": "" } }, "v-btn", attrs, false), on), [_c("span", { staticStyle: { "margin-bottom": "2px" } }, [_vm._v(_vm._s(_setup.settings.selectedColumn === "0" ? _vm.$t("uxIs3XkeVzkrEX985zHk3") : _setup.settings.selectedColumn + _vm.$t("dU7ou5kVM0s9DMju5e2tS")))]), _c("v-icon", { attrs: { "size": 16 } }, [_vm._v(_vm._s(_setup.mdiChevronDown))])], 1)];
    } }], null, false, 3336678071) }, [_c("v-list", { attrs: { "dense": "" } }, [_c("v-list-item-group", { attrs: { "value": _setup.actCol, "color": "primary" } }, _vm._l(_setup.cols, function(col) {
      return _c("v-list-item", { key: col[0], attrs: { "dense": "" }, on: { "click": function($event) {
        _setup.settings.selectedColumn = col[0];
      } } }, [_c("v-list-item-title", { domProps: { "textContent": _vm._s(col[1]) } })], 1);
    }), 1)], 1)], 1)], 1)], 1) : _vm._e(), _setup.settings.masonryLayout === "justified" ? _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("dm7zGAYbP2sbGXO_ekDDl")))])], 1), _c("v-list-item-action", [_c("v-slider", { staticStyle: { "min-width": "200px" }, attrs: { "min": "100", "max": "1200", "step": "1", "thumb-label": "" }, model: { value: _setup.settings.justifiedBaseWidth, callback: function($$v) {
      _vm.$set(_setup.settings, "justifiedBaseWidth", $$v);
    }, expression: "settings.justifiedBaseWidth" } })], 1)], 1) : _vm._e(), _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("4yzHPggVky2QKFD2TbBhl")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("HSx0XMZFid_lVuwjzrhH0") } }, [_vm._v(_vm._s(_vm.$t("HSx0XMZFid_lVuwjzrhH0")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "" }, model: { value: _setup.settings.isThumbSampleUrl, callback: function($$v) {
      _vm.$set(_setup.settings, "isThumbSampleUrl", $$v);
    }, expression: "settings.isThumbSampleUrl" } })], 1)], 1), _setup.notPartialSupportSite ? _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("PBjdNKuj02doUvOf2zZqP")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("z_oL9s5fS164W4_gITOGZ") } }, [_vm._v(_vm._s(_vm.$t("z_oL9s5fS164W4_gITOGZ")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "", "loading": _setup.dlSubLoading }, on: { "change": _setup.onDLSubpathChange }, model: { value: _setup.settings.isDLSubpath, callback: function($$v) {
      _vm.$set(_setup.settings, "isDLSubpath", $$v);
    }, expression: "settings.isDLSubpath" } })], 1)], 1) : _vm._e(), _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("fbIpwMw2yVoSxP66OJ32z")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("tEvQYzSVnggYAcM1uv9Tt") } }, [_vm._v(_vm._s(_vm.$t("tEvQYzSVnggYAcM1uv9Tt")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "" }, model: { value: _setup.settings.isFitScreen, callback: function($$v) {
      _vm.$set(_setup.settings, "isFitScreen", $$v);
    }, expression: "settings.isFitScreen" } })], 1)], 1), _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("lkCkz1OpNtTCFRfGCEoBp")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("EZd1QQdgUDjT3yya5ZYe-") } }, [_vm._v(_vm._s(_vm.$t("EZd1QQdgUDjT3yya5ZYe-")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "" }, model: { value: _setup.settings.autoWaterfall, callback: function($$v) {
      _vm.$set(_setup.settings, "autoWaterfall", $$v);
    }, expression: "settings.autoWaterfall" } })], 1)], 1), _setup.notPartialSupportSite ? _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("sxhTRqogDRozo9IaTGI7g")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("gPt6cpWrkvqRqZnwJo1KV") } }, [_vm._v(_vm._s(_vm.$t("gPt6cpWrkvqRqZnwJo1KV")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "" }, model: { value: _setup.settings.showPostCheckbox, callback: function($$v) {
      _vm.$set(_setup.settings, "showPostCheckbox", $$v);
    }, expression: "settings.showPostCheckbox" } })], 1)], 1) : _vm._e(), _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("UqbfVZzRyk0iD2NcOii_E")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("_4E2zv2NpOG4y8TV5PRL0") } }, [_vm._v(_vm._s(_vm.$t("_4E2zv2NpOG4y8TV5PRL0")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "" }, model: { value: _setup.settings.showListPostReso, callback: function($$v) {
      _vm.$set(_setup.settings, "showListPostReso", $$v);
    }, expression: "settings.showListPostReso" } })], 1)], 1), _setup.isBoorus ? _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("dvs63FvVKWm3uHVfqeq00")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("w4uJjpTmSEkm6SIDgEo-0") } }, [_vm._v(_vm._s(_vm.$t("w4uJjpTmSEkm6SIDgEo-0")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "" }, model: { value: _setup.settings.useFancybox, callback: function($$v) {
      _vm.$set(_setup.settings, "useFancybox", $$v);
    }, expression: "settings.useFancybox" } })], 1)], 1) : _vm._e(), _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("ECpLfRMsS0zpJPTw0qqNs")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("vJobIibroyz2wkpmONSnR") } }, [_vm._v(_vm._s(_vm.$t("vJobIibroyz2wkpmONSnR")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "" }, model: { value: _setup.settings.detailButtonsBottom, callback: function($$v) {
      _vm.$set(_setup.settings, "detailButtonsBottom", $$v);
    }, expression: "settings.detailButtonsBottom" } })], 1)], 1), _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("HPukB-OKzIuRxMmO4Rx2U")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("I_MKXUxaNXp3D35GFULn4") } }, [_vm._v(_vm._s(_vm.$t("I_MKXUxaNXp3D35GFULn4")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "" }, model: { value: _setup.settings.closePopupOnImgClick, callback: function($$v) {
      _vm.$set(_setup.settings, "closePopupOnImgClick", $$v);
    }, expression: "settings.closePopupOnImgClick" } })], 1)], 1), _setup.store.isYKSite ? _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("IxTawC_qs_xjxj5g8_aGx")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("-x4wjDoHtodaXEgm2SXkg") } }, [_vm._v(_vm._s(_vm.$t("-x4wjDoHtodaXEgm2SXkg")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "", "disabled": _setup.settings.isYandereFetchByHtml }, model: { value: _setup.settings.isHoldsFalse, callback: function($$v) {
      _vm.$set(_setup.settings, "isHoldsFalse", $$v);
    }, expression: "settings.isHoldsFalse" } })], 1)], 1) : _vm._e(), _setup.isYandere ? _c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("YAUNSVT_pTygaY306DZmU")))]), _c("v-list-item-subtitle", { attrs: { "title": _vm.$t("HkRzE7fweBSefchs0z0r8") } }, [_vm._v(_vm._s(_vm.$t("HkRzE7fweBSefchs0z0r8")))])], 1), _c("v-list-item-action", [_c("v-switch", { attrs: { "inset": "", "disabled": _setup.settings.isHoldsFalse }, model: { value: _setup.settings.isYandereFetchByHtml, callback: function($$v) {
      _vm.$set(_setup.settings, "isYandereFetchByHtml", $$v);
    }, expression: "settings.isYandereFetchByHtml" } })], 1)], 1) : _vm._e()], 2), _c("v-dialog", { attrs: { "max-width": "600" }, model: { value: _setup.showDLConfirm, callback: function($$v) {
      _setup.showDLConfirm = $$v;
    }, expression: "showDLConfirm" } }, [_c("v-card", [_c("v-card-title", { staticClass: "text-h5" }, [_vm._v(_vm._s(_vm.$t("ti3akdSS3iZV9NsGzIo3m")))]), _c("v-card-text", [_vm._v(" " + _vm._s(_vm.$t("LN_Rsic4V50DrXbsv9T9L"))), _c("br"), _vm._v(" " + _vm._s(_vm.$t("OJ8X55GXx5k3peoSXSujf"))), _c("br"), _vm._v(" " + _vm._s(_vm.$t("ujBgilCWNgFNV8Q2IDMWS")) + " ")]), _c("v-card-actions", [_c("v-spacer"), _c("v-btn", { attrs: { "text": "" }, on: { "click": function($event) {
      return _setup.setDLSubpathOn(false);
    } } }, [_vm._v(_vm._s(_vm.$t("9dq_DxgMG88eom9Gq-4nT")))]), _c("v-btn", { attrs: { "color": "primary", "text": "" }, on: { "click": function($event) {
      return _setup.setDLSubpathOn(true);
    } } }, [_vm._v(_vm._s(_vm.$t("0VAN4cJ-_mUxvtmg4KEi1")))])], 1)], 1)], 1)], 1);
  };
  var _sfc_staticRenderFns$8 = [];
  var __component__$8 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$8,
    _sfc_render$8,
    _sfc_staticRenderFns$8,
    false,
    null,
    null,
    null,
    null
  );
  var SettingsDrawer = __component__$8.exports;
  const _sfc_main$7 = {
    props: {
      options: {
        type: Object
      }
    },
    data() {
      return {
        dp: null
      };
    },
    async mounted() {
      if (!unsafeWindow.DPlayer) {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/dplayer/1.27.1/DPlayer.min.js");
      }
      await this.$nextTick();
      this.initPlayer();
    },
    beforeDestroy() {
      this.dp.destroy();
      this.dp = null;
    },
    methods: {
      initPlayer() {
        this.dp = new unsafeWindow.DPlayer({ ...this.options, container: this.$el });
        const events = this.dp.events;
        Object.keys(events).forEach((item) => {
          if (item === "events") {
            return false;
          } else {
            events[item].forEach((event) => {
              this.dp.on(event, () => this.$emit(event));
            });
          }
        });
      }
    },
    render(h) {
      return h("div", {
        class: "dplayer"
      }, []);
    }
  };
  const _sfc_render$7 = null;
  const _sfc_staticRenderFns$7 = null;
  var __component__$7 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$7,
    _sfc_render$7,
    _sfc_staticRenderFns$7,
    false,
    null,
    null,
    null,
    null
  );
  var DPlayer = __component__$7.exports;
  var _sfc_main$6 = /* @__PURE__ */ Vue2.defineComponent({
    __name: "PostExportTags",
    props: {
      tags: { type: Array, default: () => [] },
      showDialog: { type: Boolean, default: false },
      updateShowDialog: { type: Function, default: () => {
      } }
    },
    setup(__props) {
      const props2 = __props;
      const initTags = () => ({
        artist: [],
        copyright: [],
        character: [],
        general: []
      });
      const tagColorMap = {
        artist: "orange lighten-4",
        copyright: "purple lighten-4",
        character: "green lighten-4",
        general: "blue lighten-4"
      };
      const isEscapeParens = Vue2.ref(true);
      const isSettingWght = Vue2.ref(false);
      const bracketType = Vue2.ref("use_parens");
      const postTags = Vue2.ref(initTags());
      const selTags = Vue2.ref(initTags());
      const tagTypes = Vue2.ref(Object.keys(initTags()).map((k) => [k, `${k[0].toUpperCase()}${k.slice(1)}`]));
      const wghtMap = Vue2.ref({});
      const showSubActions = Vue2.computed(() => postTags.value.artist.length && postTags.value.copyright.length && postTags.value.character.length);
      Vue2.watch(() => props2.showDialog, (val) => {
        if (!val)
          return;
        Object.keys(postTags.value).forEach((type) => {
          postTags.value[type] = props2.tags.filter((e) => e.type == type).map((e) => e.tag.replaceAll("_", " "));
        });
      });
      function handleVisible(val) {
        props2.updateShowDialog(val);
        if (!val) {
          postTags.value = initTags();
          selTags.value = initTags();
          wghtMap.value = {};
        }
      }
      function selAll(type) {
        if (type) {
          selTags.value[type] = [...postTags.value[type]];
        } else {
          Object.keys(postTags.value).forEach((type2) => {
            selTags.value[type2] = [...postTags.value[type2]];
          });
        }
      }
      function selNone(type) {
        if (type) {
          selTags.value[type] = [];
        } else {
          Object.keys(postTags.value).forEach((type2) => {
            selTags.value[type2] = [];
          });
        }
      }
      function selInvert(type) {
        if (type) {
          const tags = postTags.value[type].filter((e) => !selTags.value[type].includes(e));
          selTags.value[type] = tags;
        } else {
          Object.keys(postTags.value).forEach((type2) => {
            const tags = postTags.value[type2].filter((e) => !selTags.value[type2].includes(e));
            selTags.value[type2] = tags;
          });
        }
      }
      function exportTags(type) {
        const tags = [];
        const target = type ? selTags.value[type] : Object.keys(selTags.value).map((k) => selTags.value[k]).flat();
        target.forEach((prompts) => {
          const origTag = prompts;
          if (isEscapeParens.value) {
            prompts = prompts.replaceAll("(", "\\(").replaceAll(")", "\\)");
          }
          if (isSettingWght.value) {
            prompts = addBrackets(prompts, bracketType.value == "use_parens", wghtMap.value[origTag]);
          }
          tags.push(prompts);
        });
        copyText(tags.join(", "));
      }
      function addBrackets(prompts, isRound, n) {
        n = Number(n);
        if (n == 0)
          return prompts;
        const arr = n > 0 ? isRound ? ["(", ")"] : ["{", "}"] : ["[", "]"];
        n = Math.abs(n);
        return arr[0].repeat(n).concat(prompts, arr[1].repeat(n));
      }
      function copyText(text) {
        navigator.clipboard.writeText(text).then(() => showMsg({ msg: i18n.t("99kLMSzDYJCAf1yK9QYzy") })).catch(() => showMsg({ msg: i18n.t("si-zDDRFrEwDTCkp53Q44"), type: "error" }));
      }
      return { __sfc: true, props: props2, initTags, tagColorMap, isEscapeParens, isSettingWght, bracketType, postTags, selTags, tagTypes, wghtMap, showSubActions, handleVisible, selAll, selNone, selInvert, exportTags, addBrackets, copyText, mdiClose };
    }
  });
  var _sfc_render$6 = function render() {
    var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c("v-dialog", { attrs: { "value": _vm.showDialog, "max-width": "800px" }, on: { "input": _setup.handleVisible } }, [_c("v-card", [_c("v-card-title", [_c("h4", [_vm._v(_vm._s(_vm.$t("FMi4atPbKn-B1HiAZ2ZP2")))]), _c("v-spacer"), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ attrs: { "fab": "", "small": "", "text": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.handleVisible(false);
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiClose))])], 1)];
    } }]) }, [_c("span", [_vm._v(_vm._s(_vm.$t("t83UAY18UebTg1_-zFGP3")))])])], 1), _c("v-card-text", { staticStyle: { "max-height": "72vh", "overflow-y": "auto" } }, [_c("div", { staticClass: "subtitle-1" }, [_vm._v(_vm._s(_vm.$t("Cu6n0Apv5xVlo4DnQbVbT")))]), _c("div", { staticClass: "export-tags-setting mb-4" }, [_c("v-checkbox", { scopedSlots: _vm._u([{ key: "label", fn: function() {
      return [_c("code", [_vm._v("( ) -> \\( \\)")])];
    }, proxy: true }]), model: { value: _setup.isEscapeParens, callback: function($$v) {
      _setup.isEscapeParens = $$v;
    }, expression: "isEscapeParens" } }), _c("v-checkbox", { attrs: { "label": _vm.$t("BB4C5taWpmw06X0Kz_Gtk") }, model: { value: _setup.isSettingWght, callback: function($$v) {
      _setup.isSettingWght = $$v;
    }, expression: "isSettingWght" } }), _c("v-radio-group", { attrs: { "row": "" }, model: { value: _setup.bracketType, callback: function($$v) {
      _setup.bracketType = $$v;
    }, expression: "bracketType" } }, [_c("v-radio", { attrs: { "value": "use_parens" }, scopedSlots: _vm._u([{ key: "label", fn: function() {
      return [_c("code", [_vm._v("Using ( )")])];
    }, proxy: true }]) }), _c("v-radio", { attrs: { "value": "use_brackets" }, scopedSlots: _vm._u([{ key: "label", fn: function() {
      return [_c("code", [_vm._v("Using { }")])];
    }, proxy: true }]) })], 1)], 1), _vm._l(_setup.tagTypes, function(type) {
      return _c("div", { directives: [{ name: "show", rawName: "v-show", value: _setup.postTags[type[0]].length, expression: "postTags[type[0]].length" }], key: type[0] }, [_c("div", { staticClass: "d-flex-y" }, [_c("div", { staticClass: "subtitle-2", staticStyle: { "min-width": "72px" } }, [_vm._v(_vm._s(type[1]))]), _setup.showSubActions ? [_c("v-btn", { attrs: { "color": "light-blue accent-4", "small": "", "text": "" }, on: { "click": function($event) {
        return _setup.selAll(type[0]);
      } } }, [_vm._v(_vm._s(_vm.$t("zg2GRF6zmMXCkT9Uz2Bni")))]), _c("v-btn", { attrs: { "color": "light-blue accent-4", "small": "", "text": "" }, on: { "click": function($event) {
        return _setup.selNone(type[0]);
      } } }, [_vm._v(_vm._s(_vm.$t("xSC1vpAOTLQ3RBipKrNpD")))]), _c("v-btn", { attrs: { "color": "light-blue accent-4", "small": "", "text": "" }, on: { "click": function($event) {
        return _setup.selInvert(type[0]);
      } } }, [_vm._v(_vm._s(_vm.$t("cKXET1CCnAXq4H60qr8uc")))]), _c("v-btn", { attrs: { "color": "light-blue accent-4", "small": "", "text": "" }, on: { "click": function($event) {
        return _setup.exportTags(type[0]);
      } } }, [_vm._v(_vm._s(_vm.$t("QH_xm27zhgs5E1077asf1")))])] : _vm._e()], 2), _c("v-chip-group", { attrs: { "column": "", "multiple": "" }, model: { value: _setup.selTags[type[0]], callback: function($$v) {
        _vm.$set(_setup.selTags, type[0], $$v);
      }, expression: "selTags[type[0]]" } }, _vm._l(_setup.postTags[type[0]], function(tag2) {
        return _c("div", { key: tag2, staticClass: "d-flex-col" }, [_c("v-chip", { attrs: { "filter": "", "small": "", "color": _setup.tagColorMap[type[0]], "value": tag2, "ripple": false } }, [_vm._v(_vm._s(tag2))]), _setup.isSettingWght ? _c("input", { directives: [{ name: "model", rawName: "v-model", value: _setup.wghtMap[tag2], expression: "wghtMap[tag]" }], staticClass: "export-tags-wght-inp", attrs: { "type": "number" }, domProps: { "value": _setup.wghtMap[tag2] }, on: { "input": function($event) {
          if ($event.target.composing)
            return;
          _vm.$set(_setup.wghtMap, tag2, $event.target.value);
        } } }) : _vm._e()], 1);
      }), 0)], 1);
    })], 2), _c("v-card-actions", [_c("v-btn", { attrs: { "color": "blue accent-2", "text": "" }, on: { "click": function($event) {
      return _setup.selAll();
    } } }, [_vm._v(_vm._s(_vm.$t("zg2GRF6zmMXCkT9Uz2Bni")))]), _c("v-btn", { attrs: { "color": "blue accent-2", "text": "" }, on: { "click": function($event) {
      return _setup.selNone();
    } } }, [_vm._v(_vm._s(_vm.$t("xSC1vpAOTLQ3RBipKrNpD")))]), _c("v-btn", { attrs: { "color": "blue accent-2", "text": "" }, on: { "click": function($event) {
      return _setup.selInvert();
    } } }, [_vm._v(_vm._s(_vm.$t("cKXET1CCnAXq4H60qr8uc")))]), _c("v-btn", { attrs: { "color": "blue accent-2", "text": "" }, on: { "click": function($event) {
      return _setup.exportTags();
    } } }, [_vm._v(_vm._s(_vm.$t("QH_xm27zhgs5E1077asf1")))])], 1)], 1)], 1);
  };
  var _sfc_staticRenderFns$6 = [];
  var __component__$6 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$6,
    _sfc_render$6,
    _sfc_staticRenderFns$6,
    false,
    null,
    null,
    null,
    null
  );
  var PostExportTags = __component__$6.exports;
  function isDanbooruPage() {
    return location.hostname == "danbooru.donmai.us";
  }
  const isCNLang$1 = i18n.locale.includes("zh");
  const tagSortOrder = ["artist", "copyright", "character", "general"];
  function getDanbooruTagDetail(image) {
    const { data, tags } = image;
    const tagMap = {
      artist: [i18n.t("Ym0HIEu9Q80qXB31LuC6c"), "#FB8C00", data.tag_string_artist.split(/\s+/)],
      copyright: [i18n.t("juT6gwLOg5r1h2vFpFf6P"), "#AB47BC", data.tag_string_copyright.split(/\s+/)],
      character: [i18n.t("aonlPAu9kEkkwNvQg0DBk"), "#66BB6A", data.tag_string_character.split(/\s+/)]
    };
    return {
      voted: false,
      tags: tags.map((tag2) => {
        var _a2;
        const tagCN = isCNLang$1 && ((_a2 = window.__tagsCN) == null ? void 0 : _a2[tag2.replace(/_/g, " ")]);
        const typedTag = { type: "", text: "", color: "" };
        for (const [key, val] of Object.entries(tagMap)) {
          if (val[2].includes(tag2)) {
            typedTag.type = key;
            typedTag.text = val[0];
            typedTag.color = val[1];
            break;
          }
        }
        const tagText = [
          typedTag.text && `[ ${typedTag.text} ] `,
          tag2,
          tagCN && ` [ ${tagCN} ]`
        ].filter(Boolean).join("");
        return {
          tag: tag2,
          tagText,
          color: typedTag.color || "#8F77B5",
          type: typedTag.type || "general"
        };
      }).sort((a, b) => {
        return tagSortOrder.indexOf(a.type) - tagSortOrder.indexOf(b.type);
      })
    };
  }
  async function addFavoriteDanbooru(id) {
    var _a2;
    const response = await fetch(`https://danbooru.donmai.us/favorites?post_id=${id}`, {
      method: "POST",
      headers: { "x-csrf-token": (_a2 = sessionStorage.getItem("csrf-token")) != null ? _a2 : "" }
    });
    if (!response.ok) {
      showMsg({ msg: `${i18n.t("MWVfUiW8egLWq7MgV-wzc")}: ${response.status}`, type: "error" });
      return false;
    }
    const result = await response.text();
    if (result.includes('toggleClass("fav-buttons-true")')) {
      showMsg({ msg: i18n.t("ctWGhVvqB2k_1TX2iY0l2").toString() });
      return true;
    } else {
      showMsg({ msg: `${i18n.t("MWVfUiW8egLWq7MgV-wzc")}: ${result}`, type: "error" });
      return false;
    }
  }
  const favActions = {
    "yande.re": addPostToFavorites$1,
    "konachan.com": addPostToFavorites$1,
    "konachan.net": addPostToFavorites$1,
    "danbooru.donmai.us": addFavoriteDanbooru,
    "gelbooru.com": addFavoriteGelbooru,
    "rule34.xxx": addFavoriteRule34
  };
  const isFavBtnShow = Object.keys(favActions).includes(location.hostname);
  const addPostToFavorites = favActions[location.hostname] || (() => {
  });
  const isCNLang = i18n.locale.includes("zh");
  async function handlePostDetail(img) {
    var _a2;
    const { fileUrl, sampleUrl, tags } = await ((_a2 = fetchDetailActions.find((e) => e.is())) == null ? void 0 : _a2.detail(img.value.id)) || {};
    if (tags == null ? void 0 : tags.length)
      img.value.tags = tags;
    if (fileUrl)
      img.value.fileUrl = fileUrl;
    if (sampleUrl)
      img.value.fileUrl = sampleUrl;
  }
  async function setPostDetail(imageSelected, postDetail) {
    if (store.isYKSite) {
      postDetail.value = {
        voted: false,
        tags: []
      };
      const result = await getPostDetail(imageSelected.value.id);
      if (result)
        postDetail.value = result;
      return;
    }
    if (isDanbooruPage()) {
      postDetail.value = getDanbooruTagDetail(imageSelected.value);
      return;
    }
    await handlePostDetail(imageSelected);
    postDetail.value = {
      voted: false,
      tags: imageSelected.value.tags.map((tag2) => {
        var _a2;
        const tagCN = (_a2 = window.__tagsCN) == null ? void 0 : _a2[tag2.replace(/_/g, " ")];
        return {
          tag: tag2,
          tagText: isCNLang && tagCN ? `${tag2} [ ${tagCN} ]` : tag2,
          color: "#8F77B5",
          type: "general"
        };
      })
    };
  }
  var _sfc_main$5 = /* @__PURE__ */ Vue2.defineComponent({
    __name: "PostDetail",
    setup(__props) {
      const notR34Fav = Vue2.ref(!(rule34.fav.is() || rule34.firefox.is() || gelbooru.fav.is() || gelbooru.is() || zerochan.is() || realbooru.is()));
      const showImageToolbar = Vue2.ref(true);
      const imgLoading = Vue2.ref(true);
      const innerWidth = Vue2.ref(window.innerWidth);
      const innerHeight = Vue2.ref(window.innerHeight);
      const downloading = Vue2.ref(false);
      const scaleOn = Vue2.ref(false);
      const imageSelected = Vue2.computed(() => {
        var _a2;
        return (_a2 = store.imageList[store.imageSelectedIndex]) != null ? _a2 : {};
      });
      const isVideo = Vue2.computed(() => {
        const { fileUrl, fileExt } = imageSelected.value;
        if (!fileUrl)
          return false;
        try {
          if (["mp4", "webm"].includes(fileExt)) {
            return true;
          }
          const url = new URL(fileUrl);
          return url.pathname.endsWith(".mp4") || url.pathname.endsWith(".webm");
        } catch (_error) {
          return false;
        }
      });
      const imgSrc = Vue2.computed(() => {
        var _a2, _b;
        if (isVideo.value)
          return void 0;
        return (_b = (_a2 = imageSelected.value.sampleUrl) != null ? _a2 : imageSelected.value.fileUrl) != null ? _b : void 0;
      });
      const imgLasySrc = Vue2.computed(() => {
        var _a2;
        if (isVideo.value)
          return void 0;
        return (_a2 = imageSelected.value.previewUrl) != null ? _a2 : void 0;
      });
      const imageSelectedWidth = Vue2.computed(() => {
        const width = Number.parseInt(
          Math.min(
            innerWidth.value * 1,
            imageSelected.value.sampleWidth || innerWidth.value
          ).toString()
        );
        const height = Math.min(innerHeight.value * 1, imageSelected.value.sampleHeight || innerHeight.value);
        const width2 = Number.parseInt((height * imageSelected.value.aspectRatio).toString());
        return Math.min(width, width2);
      });
      const notYKSite = Vue2.computed(() => {
        return ["konachan", "yande"].every((e) => !location.host.includes(e));
      });
      const imgCreateTime = Vue2.computed(() => {
        return formatRelativeTime(imageSelected.value.createdAt);
      });
      function close() {
        store.showImageSelected = false;
      }
      function toggleToolbar() {
        if (scaleOn.value)
          return;
        if (settings.closePopupOnImgClick) {
          close();
          return;
        }
        showImageToolbar.value = !showImageToolbar.value;
      }
      function toTagsPage(tag2) {
        if (store.isYKSite) {
          window.open(`/post?tags=${tag2}`, "_blank", "noreferrer");
        }
        if (isDanbooruPage()) {
          window.open(`/posts?tags=${tag2}`, "_blank", "noreferrer");
        }
      }
      function toPidPage(pid) {
        if (notYKSite.value)
          return;
        window.open(`/post/show/${pid}`, "_blank", "noreferrer");
      }
      function toDetailPage() {
        window.open(imageSelected.value.postView, "_blank", "noreferrer");
      }
      function toSourcePage() {
        const { sourceUrl } = imageSelected.value;
        if (!isURL(sourceUrl))
          return;
        window.open(sourceUrl, "_blank", "noreferrer");
      }
      async function download(url, name) {
        if (!url)
          return;
        if (location.host.includes("gelbooru")) {
          setTimeout(() => {
            downloading.value = false;
          }, 1e3);
        }
        if (store.isYKSite) {
          name = `${location.hostname} ${imageSelected.value.id} ${imageSelected.value.tags.join(" ")}`;
        }
        if (isR34PahealHome()) {
          name = `${name}.${imageSelected.value.data.file_name.split(".").pop()}`;
        }
        try {
          downloading.value = true;
          await downloadFile(url, name);
          downloading.value = false;
        } catch (error) {
          downloading.value = false;
          showMsg({ msg: `${i18n.t("FAqj5ONm50QMfIt9Vq2p1")}: ${error}`, type: "error" });
        }
      }
      function addToList() {
        addToSelectedList(imageSelected.value);
      }
      function onDtlContClick(ev) {
        var _a2, _b;
        const el = ev.target;
        if ((_b = (_a2 = el == null ? void 0 : el.className) == null ? void 0 : _a2.includes) == null ? void 0 : _b.call(_a2, "img_detail_cont")) {
          close();
        }
      }
      const postDetail = Vue2.ref({});
      const metaTags = Vue2.computed(() => {
        var _a2;
        return ((_a2 = postDetail.value.tags) == null ? void 0 : _a2.filter((e) => e.type != "general")) || [];
      });
      async function addFavorite() {
        if (!isFavBtnShow || postDetail.value.voted)
          return;
        const isSuccess = await addPostToFavorites(imageSelected.value.id);
        if (isSuccess)
          postDetail.value.voted = true;
      }
      const isExportTagsEnable = Vue2.ref(true);
      const isExportTagsShow = Vue2.ref(false);
      function openExportTags() {
        isExportTagsShow.value = true;
      }
      const preloadImgEl = new Image();
      function preloadImg(src) {
        console.log("preloadImg: ", src);
        return new Promise((resolve, reject) => {
          preloadImgEl.src = src;
          preloadImgEl.onload = resolve;
          preloadImgEl.onerror = reject;
        });
      }
      async function preloadNextImg() {
        if (!settings.isFullImgPreload)
          return;
        if (isVideo.value)
          return;
        for (let index = 1; index <= settings.imgPreloadNum; index++) {
          console.log("index: ", index);
          const next = store.imageList[store.imageSelectedIndex + index];
          if (!next)
            break;
          const imgSrc2 = (scaleOn.value ? next.jpegUrl : next.sampleUrl) || next.fileUrl;
          await preloadImg(imgSrc2 || "");
        }
      }
      const isVideoShow = Vue2.ref(true);
      async function toggleVideoShow() {
        isVideoShow.value = false;
        await Vue2.nextTick();
        isVideoShow.value = true;
      }
      const showPreviewThumb = Vue2.ref(true);
      async function showPrevPost() {
        if (store.imageSelectedIndex == 0)
          return;
        if (showPreviewThumb.value) {
          showPreviewThumb.value = false;
        }
        imgLoading.value = true;
        store.imageSelectedIndex--;
        isVideo.value && toggleVideoShow();
        await setPostDetail(imageSelected, postDetail);
      }
      async function showNextPost() {
        if (showPreviewThumb.value) {
          showPreviewThumb.value = false;
        }
        if (store.imageSelectedIndex >= store.imageList.length - 1) {
          if (store.requestLoading || store.requestStop)
            return;
          await searchPosts();
        }
        imgLoading.value = true;
        store.imageSelectedIndex++;
        isVideo.value && toggleVideoShow();
        await setPostDetail(imageSelected, postDetail);
        preloadNextImg();
      }
      function onImageLoadError(ev) {
        imageSelected.value.sampleUrl = null;
        if (notR34Fav.value) {
          return;
        }
        const { fileUrl } = imageSelected.value;
        const el = ev.target;
        if (fileUrl && location.hostname.includes("zerochan")) {
          getZerochanFileUrl(imageSelected.value.id).then((url) => {
            imageSelected.value.fileUrl = url;
          });
          return;
        }
        if (!(el == null ? void 0 : el.src.includes("/images/"))) {
          el.src = imageSelected.value.fileUrl || "";
          return;
        }
        if (fileUrl == null ? void 0 : fileUrl.includes(".jpeg")) {
          imageSelected.value.fileUrl = fileUrl.replace(/\.jpeg(\?\d+)?$/, ".jpg");
          return;
        }
        if (fileUrl == null ? void 0 : fileUrl.includes(".jpg")) {
          imageSelected.value.fileUrl = fileUrl.replace(/\.jpg(\?\d+)?$/, ".png");
          return;
        }
        if (fileUrl && (realbooru.is() || rule34.firefox.is())) {
          imageSelected.value.fileUrl = fileUrl.replace(/\.png(\?\d+)?$/, ".gif");
        }
      }
      const scaleImgSrc = Vue2.computed(() => {
        return scaleOn.value ? imageSelected.value.jpegUrl || imageSelected.value.fileUrl || void 0 : void 0;
      });
      function onScaleImgError(ev) {
        if (notR34Fav.value) {
          imageSelected.value.data.jpeg_url = null;
          return;
        }
        const img = ev.target;
        const { fileUrl } = imageSelected.value;
        if (fileUrl && location.hostname.includes("zerochan")) {
          getZerochanFileUrl(imageSelected.value.id).then((url) => {
            imageSelected.value.fileUrl = url;
            img.src = url;
          });
          return;
        }
        if (fileUrl == null ? void 0 : fileUrl.includes(".jpeg")) {
          imageSelected.value.fileUrl = fileUrl.replace(/\.jpeg(\?\d+)?$/, ".jpg");
          img.src = imageSelected.value.fileUrl;
          return;
        }
        if (fileUrl == null ? void 0 : fileUrl.includes(".jpg")) {
          imageSelected.value.fileUrl = fileUrl.replace(/\.jpg(\?\d+)?$/, ".png");
          img.src = imageSelected.value.fileUrl;
          return;
        }
        if (fileUrl && (realbooru.is() || rule34.firefox.is())) {
          imageSelected.value.fileUrl = fileUrl.replace(/\.png(\?\d+)?$/, ".gif");
          img.src = imageSelected.value.fileUrl;
        }
      }
      const scaleImgStyleMap = {
        FitToPage: { maxWidth: "100vw", maxHeight: "100vh" },
        FitToWidth: { width: "100vw" },
        FitToHeight: { height: "100vh" },
        Original: {}
      };
      const imgScaleState = Vue2.ref("Original");
      const imgRotateDeg = Vue2.ref(0);
      function rotateImg() {
        imgScaleState.value = "FitToPage";
        imgRotateDeg.value += 90;
      }
      const scaleImgStyle = Vue2.computed(() => ({
        ...scaleImgStyleMap[imgScaleState.value],
        "transform": `rotate(${imgRotateDeg.value}deg)`,
        "transform-origin": "center center"
      }));
      let clearDragEv;
      async function zoomInImg() {
        scaleOn.value = true;
        if (imageSelected.value.sampleUrl) {
          imgLoading.value = true;
        }
        await Vue2.nextTick();
        clearDragEv = dragElement(".img_scale_scroll", ".img_detail_scale");
      }
      function zoomOutImg() {
        scaleOn.value = false;
        imgRotateDeg.value = 0;
        clearDragEv == null ? void 0 : clearDragEv();
      }
      async function reqFullscreen() {
        try {
          if (document.fullscreenElement)
            return;
          const img = document.querySelector(".img_detail_scale");
          await (img == null ? void 0 : img.requestFullscreen());
        } catch (error) {
          console.log("toggleFullscreen error: ", error);
        }
      }
      Vue2.watch(() => store.showImageSelected, async (val) => {
        if (val) {
          imgLoading.value = true;
          await setPostDetail(imageSelected, postDetail);
          preloadNextImg();
        } else {
          scaleOn.value = false;
          postDetail.value = {};
          await Vue2.nextTick();
          showPreviewThumb.value = true;
        }
      });
      function onResize() {
        innerWidth.value = window.innerWidth;
        innerHeight.value = window.innerHeight;
      }
      const isTriggerEvent = Vue2.computed(() => {
        if (!store.showImageSelected)
          return false;
        if (isVideo.value)
          return false;
        if (scaleOn.value && imgScaleState.value !== "FitToPage")
          return false;
        if (isExportTagsShow.value)
          return false;
        return true;
      });
      const onWheel = debounce((ev) => {
        if (!isTriggerEvent.value)
          return;
        ev.deltaY > 0 ? showNextPost() : showPrevPost();
      }, 500, true);
      const onKeyup = debounce((ev) => {
        if (!isTriggerEvent.value)
          return;
        ev.preventDefault();
        if (["ArrowLeft", "a", "A"].includes(ev.key)) {
          showPrevPost();
          return;
        }
        if (["ArrowRight", "d", "D"].includes(ev.key)) {
          showNextPost();
          return;
        }
        if (["f", "F"].includes(ev.key)) {
          addFavorite();
        }
      }, 500, true);
      Vue2.onMounted(() => {
        window.addEventListener("resize", onResize);
        settings.isListenWheelEvent && window.addEventListener("wheel", onWheel);
        settings.isListenKeyupEvent && window.addEventListener("keyup", onKeyup);
      });
      Vue2.onUnmounted(() => {
        window.removeEventListener("resize", onResize);
        settings.isListenWheelEvent && window.removeEventListener("wheel", onWheel);
        settings.isListenKeyupEvent && window.removeEventListener("keyup", onKeyup);
      });
      return { __sfc: true, notR34Fav, showImageToolbar, imgLoading, innerWidth, innerHeight, downloading, scaleOn, imageSelected, isVideo, imgSrc, imgLasySrc, imageSelectedWidth, notYKSite, imgCreateTime, close, toggleToolbar, toTagsPage, toPidPage, toDetailPage, toSourcePage, download, addToList, onDtlContClick, postDetail, metaTags, addFavorite, isExportTagsEnable, isExportTagsShow, openExportTags, preloadImgEl, preloadImg, preloadNextImg, isVideoShow, toggleVideoShow, showPreviewThumb, showPrevPost, showNextPost, onImageLoadError, scaleImgSrc, onScaleImgError, scaleImgStyleMap, imgScaleState, imgRotateDeg, rotateImg, scaleImgStyle, clearDragEv, zoomInImg, zoomOutImg, reqFullscreen, onResize, isTriggerEvent, onWheel, onKeyup, mdiChevronLeft, mdiChevronRight, mdiClose, mdiDownload, mdiFileTree, mdiFitToScreenOutline, mdiFolderNetwork, mdiFullscreen, mdiHeart, mdiHeartPlusOutline, mdiLaunch, mdiLinkVariant, mdiLoupe, mdiMagnifyMinusOutline, mdiMagnifyPlusOutline, mdiPlaylistPlus, mdiRotateRight, mdiTableSplitCell, mdiTagMultiple, DPlayer, PostExportTags, isFavBtnShow, notPartialSupportSite, settings, store };
    }
  });
  var _sfc_render$5 = function render() {
    var _a2, _b, _c2, _d, _e, _f, _g, _h;
    var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c("v-dialog", { attrs: { "fullscreen": "" }, model: { value: _setup.store.showImageSelected, callback: function($$v) {
      _vm.$set(_setup.store, "showImageSelected", $$v);
    }, expression: "store.showImageSelected" } }, [_setup.store.showImageSelected ? _c("div", { staticClass: "img_detail_cont", on: { "click": _setup.onDtlContClick } }, [_setup.isVideo ? [_setup.isVideoShow ? _c(_setup.DPlayer, { style: `width: ${_setup.imageSelectedWidth > _setup.imageSelected.width ? _setup.imageSelected.width : _setup.imageSelectedWidth}px`, attrs: { "options": { theme: "#8E24AA", autoplay: true, loop: true, video: { url: _setup.imageSelected.fileUrl } } } }) : _vm._e()] : _c("div", { class: { img_scale_scroll: _setup.scaleOn, img_scale_normal: !_setup.scaleOn }, attrs: { "draggable": "false" } }, [_c("v-row", { directives: [{ name: "show", rawName: "v-show", value: _setup.imgLoading, expression: "imgLoading" }], staticClass: "img_detail_loading" }, [_setup.showPreviewThumb && !_setup.scaleOn ? _c("img", { attrs: { "src": _setup.imgLasySrc, "width": _setup.imageSelectedWidth, "alt": "" } }) : _vm._e(), _c("v-progress-circular", { attrs: { "size": 100, "width": 6, "indeterminate": "", "color": "deep-purple" } })], 1), !_setup.scaleOn ? _c("img", { staticClass: "img_detail_sample", attrs: { "alt": "", "src": _setup.imgSrc, "width": _setup.imgLoading ? 0 : _setup.imageSelectedWidth }, on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.toggleToolbar.apply(null, arguments);
    }, "load": function($event) {
      _setup.imgLoading = false;
    }, "error": _setup.onImageLoadError } }) : _vm._e(), _setup.scaleOn ? _c("img", { staticClass: "img_detail_scale", style: _setup.scaleImgStyle, attrs: { "draggable": "false", "alt": "", "src": _setup.scaleImgSrc }, on: { "load": function($event) {
      _setup.imgLoading = false;
    }, "error": _setup.onScaleImgError } }) : _vm._e()], 1)], 2) : _vm._e(), _c("v-toolbar", { directives: [{ name: "show", rawName: "v-show", value: _setup.showImageToolbar && _setup.scaleOn && !_setup.isVideo, expression: "showImageToolbar && scaleOn && !isVideo" }], staticClass: "img-detail-toolbar img_detail_btn_color", class: { "detail-buttons-bottom": _setup.settings.detailButtonsBottom }, attrs: { "color": "transparent", "height": "auto", "flat": "" } }, [_c("v-spacer"), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "mr-1 hidden-sm-and-down", attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        _setup.imgScaleState = "FitToPage";
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiFitToScreenOutline))])], 1)];
    } }]) }, [_c("span", [_vm._v(_vm._s(_vm.$t("M-wISnLiQgM_DURMwKZGT")))])]), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        _setup.imgScaleState = "FitToWidth";
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiTableSplitCell))])], 1)];
    } }]) }, [_c("span", [_vm._v(_vm._s(_vm.$t("ad8lEoWap_nT9U69WBKen")))])]), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        _setup.imgScaleState = "FitToHeight";
      } } }, "v-btn", attrs, false), on), [_c("v-icon", { staticStyle: { "transform": "rotate(90deg)" } }, [_vm._v(_vm._s(_setup.mdiTableSplitCell))])], 1)];
    } }]) }, [_c("span", [_vm._v(_vm._s(_vm.$t("GjMNbm97OgVvpIYlkOisE")))])]), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        _setup.imgScaleState = "Original";
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiLoupe))])], 1)];
    } }]) }, [_c("span", [_vm._v(_vm._s(_vm.$t("KkkM-iz8RCVQoTrTfhS5j")))])]), !_setup.store.isFullscreen ? _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "mr-1 hidden-sm-and-down", attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.reqFullscreen.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiFullscreen))])], 1)];
    } }], null, false, 2505938539) }, [_c("span", [_vm._v(_vm._s(_vm.$t("XvOYJ5gHo37M1XztPl18z")))])]) : _vm._e(), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.rotateImg.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiRotateRight))])], 1)];
    } }]) }, [_c("span", [_vm._v(_vm._s(_vm.$t("_bQs7o9oQSo7ao1G0cp3d")))])]), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.zoomOutImg();
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiMagnifyMinusOutline))])], 1)];
    } }]) }, [_c("span", [_vm._v(_vm._s(_vm.$t("lPPsX2CZbXwC-EGN79Rki")))])]), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.close.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiClose))])], 1)];
    } }]) }, [_c("span", [_vm._v(_vm._s(_vm.$t("t83UAY18UebTg1_-zFGP3")))])])], 1), _c("v-toolbar", { directives: [{ name: "show", rawName: "v-show", value: _setup.showImageToolbar && !_setup.scaleOn, expression: "showImageToolbar && !scaleOn" }], staticClass: "img-detail-toolbar img_detail_btn_color", class: { "detail-buttons-bottom": _setup.settings.detailButtonsBottom }, attrs: { "color": "transparent", "height": "auto", "flat": "" } }, [_c("v-chip", { staticClass: "hidden-xs-only", attrs: { "small": "", "role": "button", "tabindex": "0" }, domProps: { "textContent": _vm._s(`${(_a2 = _setup.imageSelected.rating) == null ? void 0 : _a2.toUpperCase()} ${_setup.imageSelected.id}`) }, on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.toDetailPage.apply(null, arguments);
    } } }), _setup.imgCreateTime ? _c("v-chip", { staticClass: "ml-1 hidden-sm-and-down", attrs: { "small": "", "title": _setup.imageSelected.createdTime }, domProps: { "textContent": _vm._s(_setup.imgCreateTime) } }) : _vm._e(), _c("v-chip-group", { directives: [{ name: "show", rawName: "v-show", value: _setup.metaTags.length, expression: "metaTags.length" }], staticClass: "hidden-sm-and-down img_detail_tag_list img_meta_tag_list", attrs: { "column": "" } }, _vm._l(_setup.metaTags, function(item, i) {
      return _c("v-chip", { key: i, staticClass: "img_detail_tag", class: `tag_type_${item.type}`, attrs: { "color": item.color, "title": item.tagText, "small": "", "text-color": "#ffffff", "role": "button", "tabindex": "0" }, domProps: { "textContent": _vm._s(item.tagText) }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.toTagsPage(item.tag);
      } } });
    }), 1), _c("v-spacer"), _setup.isFavBtnShow ? _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.addFavorite.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.postDetail.voted ? _setup.mdiHeart : _setup.mdiHeartPlusOutline))])], 1)];
    } }], null, false, 1566492844) }, [_c("span", [_vm._v(_vm._s(_setup.postDetail.voted ? _vm.$t("pEU9Y9K7DsODkocCDwq_O") : _vm.$t("2ZPEAvLkCbV3mC0iJAw9K")))])]) : _vm._e(), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "", "href": _setup.imageSelected.postView, "target": "_blank", "rel": "noreferrer" } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiLinkVariant))])], 1)];
    } }]) }, [_c("span", [_vm._v(_vm._s(_vm.$t("caFFJlrS1wa_F86uKPykd")))])]), _setup.imageSelected.sourceUrl ? _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.toSourcePage.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiLaunch))])], 1)];
    } }], null, false, 2921050437) }, [_c("span", [_vm._v(_vm._s(_vm.$t("qSF4OLshg2EEX4CwtBE6r")) + " " + _vm._s(_setup.imageSelected.sourceUrl))])]) : _vm._e(), !_setup.isVideo ? _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.zoomInImg();
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiMagnifyPlusOutline))])], 1)];
    } }], null, false, 1673140250) }, [_c("span", [_vm._v(_vm._s(_vm.$t("B_ptN5O-9PhmG5ymGGtc6")))])]) : _vm._e(), _setup.notR34Fav ? _c("v-menu", { attrs: { "dense": "", "open-on-hover": "", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ directives: [{ name: "show", rawName: "v-show", value: !_setup.downloading, expression: "!downloading" }], staticClass: "mr-1", attrs: { "fab": "", "small": "" } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiDownload))])], 1)];
    } }], null, false, 2023776716) }, [_c("v-list", { attrs: { "dense": "", "flat": "" } }, [_setup.imageSelected.sampleUrl ? _c("v-list-item", { attrs: { "two-line": "", "link": "", "dense": "" } }, [_c("v-list-item-content", { on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.download(_setup.imageSelected.sampleUrl, _setup.imageSelected.sampleDownloadName);
    } } }, [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("wI4KHHIe3zNRziW4lDZrp")))]), _c("v-list-item-subtitle", { domProps: { "textContent": _vm._s(_setup.imageSelected.sampleDownloadText) } })], 1)], 1) : _vm._e(), _setup.imageSelected.jpegUrl ? _c("v-list-item", { attrs: { "two-line": "", "link": "", "dense": "" } }, [_c("v-list-item-content", { on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.download(_setup.imageSelected.jpegUrl, _setup.imageSelected.jpegDownloadName);
    } } }, [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("k4YzDnBtd_S2UpAQucGxF")))]), _c("v-list-item-subtitle", { domProps: { "textContent": _vm._s(_setup.imageSelected.jpegDownloadText) } })], 1)], 1) : _vm._e(), _c("v-list-item", { attrs: { "two-line": "", "link": "", "dense": "" } }, [_c("v-list-item-content", { on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.download(_setup.imageSelected.fileUrl, _setup.imageSelected.fileDownloadName);
    } } }, [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("VpuyxZtIoDF9-YyOm0tK_")))]), _c("v-list-item-subtitle", { domProps: { "textContent": _vm._s(_setup.imageSelected.fileDownloadText) } })], 1)], 1)], 1)], 1) : _vm._e(), _c("v-progress-circular", { directives: [{ name: "show", rawName: "v-show", value: _setup.downloading, expression: "downloading" }], staticClass: "ml-1 mr-2", attrs: { "indeterminate": "", "color": "primary" } }), _setup.notPartialSupportSite && _setup.notR34Fav ? _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.addToList.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiPlaylistPlus))])], 1)];
    } }], null, false, 3165283113) }, [_c("span", [_vm._v(_vm._s(_vm.$t("hVmfDxXoj8vkgVQabEOSr")))])]) : _vm._e(), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c("v-btn", _vm._g(_vm._b({ attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.close.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiClose))])], 1)];
    } }]) }, [_c("span", [_vm._v(_vm._s(_vm.$t("t83UAY18UebTg1_-zFGP3")))])])], 1), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _setup.showImageToolbar, expression: "showImageToolbar" }], staticClass: "img_detail_btn_color" }, [_c("div", { staticClass: "img-detail-tags", class: { "detail-buttons-bottom": _setup.settings.detailButtonsBottom } }, [_c("v-chip", { directives: [{ name: "show", rawName: "v-show", value: (_b = _setup.postDetail.tags) == null ? void 0 : _b.length, expression: "postDetail.tags?.length" }], staticClass: "mr-1", attrs: { "small": "", "role": "button", "tabindex": "0" }, on: { "click": function($event) {
      $event.stopPropagation();
      _setup.settings.showTagChipGroup = !_setup.settings.showTagChipGroup;
    } } }, [_c("v-icon", { attrs: { "left": "" } }, [_vm._v(_vm._s(_setup.mdiTagMultiple))]), _c("span", [_vm._v(_vm._s(_setup.settings.showTagChipGroup ? _vm.$t("gM92sLo0Cqfl2rCaXlOhc") : _vm.$t("l5W-EtJ_ar-SY2lF4H5Zm")))])], 1), _setup.isExportTagsEnable && ((_c2 = _setup.postDetail.tags) == null ? void 0 : _c2.length) ? _c("v-chip", { staticClass: "mr-1", attrs: { "small": "", "role": "button", "tabindex": "0" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.openExportTags();
    } } }, [_c("v-icon", { attrs: { "left": "" } }, [_vm._v(_vm._s(_setup.mdiTagMultiple))]), _c("span", [_vm._v(_vm._s(_vm.$t("QH_xm27zhgs5E1077asf1")))])], 1) : _vm._e(), _setup.store.isYKSite ? [((_e = (_d = _setup.imageSelected) == null ? void 0 : _d.data) == null ? void 0 : _e.parent_id) ? _c("v-chip", { staticClass: "mr-1", attrs: { "small": "", "role": "button", "tabindex": "0" }, on: { "click": function($event) {
      var _a3, _b2;
      $event.stopPropagation();
      _setup.toPidPage((_b2 = (_a3 = _setup.imageSelected) == null ? void 0 : _a3.data) == null ? void 0 : _b2.parent_id);
    } } }, [_c("v-icon", { attrs: { "small": "", "left": "" } }, [_vm._v(_vm._s(_setup.mdiFolderNetwork))]), _c("span", [_vm._v(_vm._s(_vm.$t("sMkrF8bqCTJZZ1kXTkT_R")))])], 1) : _vm._e(), ((_g = (_f = _setup.imageSelected) == null ? void 0 : _f.data) == null ? void 0 : _g.has_children) ? _c("v-chip", { staticClass: "mr-1", attrs: { "small": "", "role": "button", "tabindex": "0" }, on: { "click": function($event) {
      var _a3;
      $event.stopPropagation();
      return _setup.toTagsPage(`parent:${(_a3 = _setup.imageSelected) == null ? void 0 : _a3.id}&_wf=1`);
    } } }, [_c("v-icon", { attrs: { "small": "", "left": "" } }, [_vm._v(_vm._s(_setup.mdiFileTree))]), _c("span", [_vm._v(_vm._s(_vm.$t("u0K7A_hv1RZSJl6TDR61A")))])], 1) : _vm._e()] : _vm._e(), _c("v-chip-group", { directives: [{ name: "show", rawName: "v-show", value: _setup.settings.showTagChipGroup, expression: "settings.showTagChipGroup" }], staticClass: "img_detail_tag_list", attrs: { "column": "" } }, _vm._l(_setup.postDetail.tags || [], function(item, i) {
      return _c("v-chip", { key: i, staticClass: "img_detail_tag mr-1", class: `tag_type_${item.type}`, attrs: { "small": "", "color": item.color, "text-color": "#ffffff", "role": "button", "tabindex": "0" }, domProps: { "textContent": _vm._s(item.tagText) }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.toTagsPage(item.tag);
      } } });
    }), 1)], 2), _c("v-btn", { staticClass: "poa_left_center hidden-sm-and-down", staticStyle: { "z-index": "10" }, attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.showPrevPost.apply(null, arguments);
    } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiChevronLeft))])], 1), _c("v-btn", { staticClass: "poa_right_center hidden-sm-and-down", staticStyle: { "z-index": "10" }, attrs: { "fab": "", "small": "" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.showNextPost.apply(null, arguments);
    } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiChevronRight))])], 1)], 1), _setup.isExportTagsEnable && _setup.store.showImageSelected ? _c(_setup.PostExportTags, { attrs: { "show-dialog": _setup.isExportTagsShow, "update-show-dialog": (val) => _setup.isExportTagsShow = val, "tags": ((_h = _setup.postDetail) == null ? void 0 : _h.tags) || [] } }) : _vm._e()], 1);
  };
  var _sfc_staticRenderFns$5 = [];
  var __component__$5 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$5,
    _sfc_render$5,
    _sfc_staticRenderFns$5,
    false,
    null,
    null,
    null,
    null
  );
  var PostDetail = __component__$5.exports;
  var _sfc_main$4 = /* @__PURE__ */ Vue2.defineComponent({
    __name: "PostList",
    setup(__props) {
      const notFitScreen = Vue2.ref(localStorage.getItem("__fitScreen") == "0");
      const isR34Fav = Vue2.ref(isRule34FavPage() || isGelbooruFavPage());
      const showImageList = Vue2.ref(true);
      const showFab = Vue2.ref(false);
      Vue2.watch(
        () => settings.selectedColumn,
        () => {
          showImageList.value = false;
          Vue2.nextTick(() => {
            showImageList.value = true;
          });
        }
      );
      const showNoMore = Vue2.computed(() => !store.requestLoading && store.requestStop);
      const showLoadMore = Vue2.computed(() => !store.requestLoading && !store.requestStop);
      const ctxActPost = Vue2.ref();
      const showMenu = Vue2.ref(false);
      const x = Vue2.ref(0);
      const y = Vue2.ref(0);
      const maxHeightStyle = Vue2.computed(() => {
        const num = +settings.selectedColumn;
        if (num == 0 || num > 3)
          return "max-height: 60vh;overflow: hidden";
        return "";
      });
      function imgCardStyle(image) {
        if (settings.masonryLayout !== "justified")
          return maxHeightStyle;
        let style = `--w:${image == null ? void 0 : image.width};--h:${image == null ? void 0 : image.height};`;
        if (settings.justifiedBaseWidth)
          style += `--jstf-w:${settings.justifiedBaseWidth};`;
        return style;
      }
      function getImgSrc(img) {
        let src = img == null ? void 0 : img.previewUrl;
        if (!/\.(mp4|webm)$/i.test((img == null ? void 0 : img.fileUrl) || "")) {
          const num = +settings.selectedColumn;
          if (settings.isThumbSampleUrl || num != 0 && num < 7) {
            src = img == null ? void 0 : img.sampleUrl;
          }
          if (location.hostname === "danbooru.donmai.us" && src) {
            src = src.replace(/(.*)\/180x180\/(.*)jpg/, "$1/720x720/$2webp");
          }
        }
        return src || (img == null ? void 0 : img.fileUrl) || void 0;
      }
      function onCtxMenu(ev, img) {
        if (isR34Fav.value)
          return;
        ev.preventDefault();
        showMenu.value = false;
        x.value = ev.clientX;
        y.value = ev.clientY;
        Vue2.nextTick(() => {
          ctxActPost.value = img;
          showMenu.value = true;
        });
      }
      function showImgModal(index) {
        if (settings.useFancybox) {
          fancyboxShow(store.imageList, index);
          return;
        }
        store.imageSelectedIndex = index;
        store.showImageSelected = true;
      }
      function openDetail(post) {
        const img = post || ctxActPost.value;
        img && window.open(img.postView, "_blank", "noreferrer");
      }
      function addToSelectedList$1(post) {
        const img = post || ctxActPost.value;
        img && addToSelectedList(img);
      }
      function addFavorite(id) {
        var _a2;
        if (!isFavBtnShow)
          return;
        const imgId = id || ((_a2 = ctxActPost.value) == null ? void 0 : _a2.id);
        imgId && addPostToFavorites(imgId);
      }
      async function downloadCtxPost(post) {
        const img = post || ctxActPost.value;
        if (!img)
          return;
        let { fileDownloadName } = img;
        if (!img.fileUrl)
          return;
        if (store.isYKSite) {
          fileDownloadName = `${location.hostname} ${img.id} ${img.tags.join(" ")}`;
        }
        if (isR34PahealHome()) {
          fileDownloadName = `${fileDownloadName}.${img.data.file_name.split(".").pop()}`;
        }
        try {
          await downloadFile(img.fileUrl, fileDownloadName);
        } catch (error) {
          showMsg({ msg: `${i18n.t("FAqj5ONm50QMfIt9Vq2p1")}: ${error}`, type: "error" });
        }
      }
      function isPostChecked(id) {
        return store.selectedImageList.some((e) => e.id === id);
      }
      function onPostCheckboxChange(e, image) {
        e ? addToSelectedList(image) : removeFromSelectedList(image.id);
      }
      function onImageLoadError(id) {
        const item = store.imageList.find((e) => e.id == id);
        if (!item)
          return;
        if (item.previewUrl) {
          Vue2.set(item, "previewUrl", null);
          Vue2.set(item, "sampleUrl", null);
          return;
        }
        if (location.hostname != "rule34.xxx")
          return;
        const { fileUrl } = item;
        if (!fileUrl)
          return;
        if (fileUrl.includes(".jpeg")) {
          Vue2.set(item, "fileUrl", fileUrl.replace(/\.jpeg(\?\d+)?$/, ".jpg"));
        } else if (fileUrl.includes(".jpg")) {
          Vue2.set(item, "fileUrl", fileUrl.replace(/\.jpg(\?\d+)?$/, ".png"));
        } else {
          Vue2.set(item, "fileUrl", fileUrl.replace(/\.png(\?\d+)?$/, ".gif"));
        }
      }
      const virtualMaxCol = Vue2.computed(() => {
        const num = Number(settings.selectedColumn);
        return num > 0 ? num : void 0;
      });
      function calcItemHeight(item, itemWidth) {
        return item.height * (itemWidth / item.width);
      }
      const scrollFn = throttleScroll((scroll) => {
        if (!showFab.value && scroll > 200)
          showFab.value = true;
        if (store.requestStop)
          return;
        if (store.requestLoading)
          return;
        notReachBottom() && searchPosts(true);
      }, () => {
        if (showFab.value)
          showFab.value = false;
      });
      Vue2.onMounted(async () => {
        await initPosts();
        window.addEventListener("scroll", scrollFn);
      });
      Vue2.onUnmounted(() => {
        window.removeEventListener("scroll", scrollFn);
      });
      return { __sfc: true, notFitScreen, isR34Fav, showImageList, showFab, showNoMore, showLoadMore, ctxActPost, showMenu, x, y, maxHeightStyle, imgCardStyle, getImgSrc, onCtxMenu, showImgModal, openDetail, addToSelectedList: addToSelectedList$1, addFavorite, downloadCtxPost, isPostChecked, onPostCheckboxChange, onImageLoadError, virtualMaxCol, calcItemHeight, scrollFn, mdiDownload, mdiFileGifBox, mdiFileTree, mdiFolderNetwork, mdiHeartPlusOutline, mdiLinkVariant, mdiPlaylistPlus, mdiRefresh, mdiVideo, PostDetail, notPartialSupportSite, isFavBtnShow, refreshPosts, searchPosts, settings, store };
    }
  });
  var _sfc_render$4 = function render() {
    var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
    return _setup.showImageList ? _c("div", { style: _setup.settings.masonryLayout === "virtual" ? "height:93vh" : "" }, [_setup.settings.masonryLayout === "virtual" ? _c("virtual-waterfall", { staticClass: "virtual-waterfall", class: { "wf-no-fit-screen": _setup.notFitScreen }, staticStyle: { "min-height": "93vh" }, attrs: { "gap": 10, "preload-screen-count": [1, 1], "item-min-width": 300, "items": _setup.store.imageList, "max-column-count": _setup.virtualMaxCol, "calc-item-height": _setup.calcItemHeight }, scopedSlots: _vm._u([{ key: "default", fn: function({ item, index }) {
      var _a2, _b;
      return [_c("div", { staticClass: "posts-image-card" }, [_c("img", { staticClass: "post-image-v", attrs: { "alt": "", "loading": "lazy", "src": _setup.getImgSrc(item), "role": "button", "tabindex": "0" }, on: { "click": function($event) {
        return _setup.showImgModal(index);
      }, "contextmenu": function($event) {
        return _setup.onCtxMenu($event, item);
      }, "error": function($event) {
        return _setup.onImageLoadError((item == null ? void 0 : item.id) || "");
      } } }), _setup.store.isYKSite ? [((_a2 = item == null ? void 0 : item.data) == null ? void 0 : _a2.has_children) ? _c("v-icon", { staticClass: "posts-image-type", attrs: { "dense": "" } }, [_vm._v(" " + _vm._s(_setup.mdiFileTree) + " ")]) : _vm._e(), ((_b = item == null ? void 0 : item.data) == null ? void 0 : _b.parent_id) ? _c("v-icon", { staticClass: "posts-image-type", attrs: { "dense": "" } }, [_vm._v(" " + _vm._s(_setup.mdiFolderNetwork) + " ")]) : _vm._e()] : _vm._e(), (item == null ? void 0 : item.fileExt.toLowerCase()) === "gif" ? _c("v-icon", { staticClass: "posts-image-type" }, [_vm._v(" " + _vm._s(_setup.mdiFileGifBox) + " ")]) : _vm._e(), ["mp4", "webm"].includes(item == null ? void 0 : item.fileExt.toLowerCase()) ? _c("v-icon", { staticClass: "posts-image-type" }, [_vm._v(" " + _vm._s(_setup.mdiVideo) + " ")]) : _vm._e(), !_setup.isR34Fav && _setup.settings.showPostCheckbox ? _c("div", { staticClass: "posts-image-checkbox" }, [_c("v-checkbox", { staticClass: "ma-0 pa-0", attrs: { "value": _setup.isPostChecked(item == null ? void 0 : item.id), "hide-details": "" }, on: { "change": function($event) {
        return _setup.onPostCheckboxChange($event, item);
      } } })], 1) : _vm._e(), _setup.settings.showListPostReso ? _c("div", { staticClass: "posts-image-wh" }, [_vm._v(_vm._s(item == null ? void 0 : item.width) + " \xD7 " + _vm._s(item == null ? void 0 : item.height))]) : _vm._e(), !_setup.isR34Fav ? _c("div", { staticClass: "posts-image-actions" }, [_c("v-btn", { attrs: { "icon": "", "color": "#fff", "title": _vm.$t("EsiorRgoeHI8h7IHMLDA4"), "href": item == null ? void 0 : item.postView, "target": "_blank", "rel": "noreferrer" } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiLinkVariant))])], 1), _setup.notPartialSupportSite ? _c("v-btn", { attrs: { "icon": "", "color": "#fff", "title": _vm.$t("hVmfDxXoj8vkgVQabEOSr") }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.addToSelectedList(item);
      } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiPlaylistPlus))])], 1) : _vm._e(), _setup.notPartialSupportSite ? _c("v-btn", { attrs: { "icon": "", "color": "#fff", "title": _vm.$t("VpuyxZtIoDF9-YyOm0tK_") }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.downloadCtxPost(item);
      } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiDownload))])], 1) : _vm._e(), _setup.isFavBtnShow ? _c("v-btn", { attrs: { "icon": "", "color": "#fff", "title": _vm.$t("Dnnio9m9RZA6bkTLytc99") }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.addFavorite(item == null ? void 0 : item.id);
      } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiHeartPlusOutline))])], 1) : _vm._e()], 1) : _vm._e()], 2)];
    } }], null, false, 1028004845) }) : _c("wf-layout", _vm._l(_setup.store.imageList, function(image, index) {
      var _a2, _b;
      return _c("v-card", { key: index, staticClass: "posts-image-card", style: _setup.imgCardStyle(image) }, [_setup.settings.masonryLayout === "justified" ? [_c("img", { staticClass: "post-image", attrs: { "alt": "", "loading": "lazy", "src": _setup.getImgSrc(image), "role": "button", "tabindex": "0" }, on: { "click": function($event) {
        return _setup.showImgModal(index);
      }, "contextmenu": function($event) {
        return _setup.onCtxMenu($event, image);
      }, "error": function($event) {
        return _setup.onImageLoadError((image == null ? void 0 : image.id) || "");
      } } })] : _c("v-img", { attrs: { "transition": "scroll-y-transition", "src": _setup.getImgSrc(image), "aspect-ratio": image == null ? void 0 : image.aspectRatio }, on: { "click": function($event) {
        return _setup.showImgModal(index);
      }, "contextmenu": function($event) {
        return _setup.onCtxMenu($event, image);
      }, "error": function($event) {
        return _setup.onImageLoadError(image == null ? void 0 : image.id);
      } }, scopedSlots: _vm._u([{ key: "placeholder", fn: function() {
        return [_c("v-row", { staticClass: "fill-height ma-0", attrs: { "align": "center", "justify": "center" } }, [_c("v-progress-circular", { attrs: { "indeterminate": "", "color": "deep-purple" } })], 1)];
      }, proxy: true }], null, true) }), _setup.store.isYKSite ? [((_a2 = image == null ? void 0 : image.data) == null ? void 0 : _a2.has_children) ? _c("v-icon", { staticClass: "posts-image-type", attrs: { "dense": "" } }, [_vm._v(" " + _vm._s(_setup.mdiFileTree) + " ")]) : _vm._e(), ((_b = image == null ? void 0 : image.data) == null ? void 0 : _b.parent_id) ? _c("v-icon", { staticClass: "posts-image-type", attrs: { "dense": "" } }, [_vm._v(" " + _vm._s(_setup.mdiFolderNetwork) + " ")]) : _vm._e()] : _vm._e(), (image == null ? void 0 : image.fileExt.toLowerCase()) === "gif" ? _c("v-icon", { staticClass: "posts-image-type" }, [_vm._v(" " + _vm._s(_setup.mdiFileGifBox) + " ")]) : _vm._e(), ["mp4", "webm"].includes(image == null ? void 0 : image.fileExt.toLowerCase()) ? _c("v-icon", { staticClass: "posts-image-type" }, [_vm._v(" " + _vm._s(_setup.mdiVideo) + " ")]) : _vm._e(), !_setup.isR34Fav && _setup.settings.showPostCheckbox ? _c("div", { staticClass: "posts-image-checkbox" }, [_c("v-checkbox", { staticClass: "ma-0 pa-0", attrs: { "value": _setup.isPostChecked(image == null ? void 0 : image.id), "hide-details": "" }, on: { "change": function($event) {
        return _setup.onPostCheckboxChange($event, image);
      } } })], 1) : _vm._e(), _setup.settings.showListPostReso ? _c("div", { staticClass: "posts-image-wh" }, [_vm._v(_vm._s(image == null ? void 0 : image.width) + " \xD7 " + _vm._s(image == null ? void 0 : image.height))]) : _vm._e(), !_setup.isR34Fav ? _c("div", { staticClass: "posts-image-actions" }, [_c("v-btn", { attrs: { "icon": "", "color": "#fff", "title": _vm.$t("EsiorRgoeHI8h7IHMLDA4"), "href": image == null ? void 0 : image.postView, "target": "_blank", "rel": "noreferrer" } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiLinkVariant))])], 1), _setup.notPartialSupportSite ? _c("v-btn", { staticClass: "hidden-md-and-down", attrs: { "icon": "", "color": "#fff", "title": _vm.$t("hVmfDxXoj8vkgVQabEOSr") }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.addToSelectedList(image);
      } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiPlaylistPlus))])], 1) : _vm._e(), _setup.notPartialSupportSite ? _c("v-btn", { attrs: { "icon": "", "color": "#fff", "title": _vm.$t("VpuyxZtIoDF9-YyOm0tK_") }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.downloadCtxPost(image);
      } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiDownload))])], 1) : _vm._e(), _setup.isFavBtnShow ? _c("v-btn", { attrs: { "icon": "", "color": "#fff", "title": _vm.$t("Dnnio9m9RZA6bkTLytc99") }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.addFavorite(image == null ? void 0 : image.id);
      } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiHeartPlusOutline))])], 1) : _vm._e()], 1) : _vm._e()], 2);
    }), 1), _c("div", { staticClass: "d-flex justify-center" }, [_c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.store.requestLoading, expression: "store.requestLoading" }], attrs: { "color": "primary", "text": "" } }, [_vm._v(" " + _vm._s(_vm.$t("RN4dt81l_fZMWODsskZob")) + "... ")]), _c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.showLoadMore, expression: "showLoadMore" }], attrs: { "color": "primary", "text": "" }, on: { "click": function($event) {
      return _setup.searchPosts();
    } } }, [_vm._v(" " + _vm._s(_vm.$t("fC8XNfCl04zK7vgeaRZMQ")) + " ")]), _c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.showNoMore, expression: "showNoMore" }], staticClass: "mt-2", attrs: { "color": "primary", "text": "" } }, [_vm._v(" " + _vm._s(_vm.$t("Z4pa8GhgE63OGGvCqAld0")) + "... ")])], 1), _c("v-menu", { attrs: { "position-x": _setup.x, "position-y": _setup.y, "absolute": "", "offset-y": "" }, model: { value: _setup.showMenu, callback: function($$v) {
      _setup.showMenu = $$v;
    }, expression: "showMenu" } }, [_c("v-list", [_setup.isFavBtnShow ? _c("v-list-item", { on: { "click": function($event) {
      return _setup.addFavorite();
    } } }, [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("Dnnio9m9RZA6bkTLytc99")))])], 1) : _vm._e(), _setup.notPartialSupportSite ? _c("v-list-item", { on: { "click": function($event) {
      return _setup.downloadCtxPost();
    } } }, [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("VpuyxZtIoDF9-YyOm0tK_")))])], 1) : _vm._e(), _c("v-list-item", { on: { "click": function($event) {
      return _setup.openDetail();
    } } }, [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("EsiorRgoeHI8h7IHMLDA4")))])], 1), _setup.notPartialSupportSite ? _c("v-list-item", { staticClass: "hidden-md-and-down", on: { "click": function($event) {
      return _setup.addToSelectedList();
    } } }, [_c("v-list-item-title", [_vm._v(_vm._s(_vm.$t("hVmfDxXoj8vkgVQabEOSr")))])], 1) : _vm._e()], 1)], 1), _c("v-fab-transition", [_c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.showFab, expression: "showFab" }], staticClass: "refresh_posts_btn", attrs: { "fab": "", "dark": "", "fixed": "", "bottom": "", "right": "", "color": "pink" }, on: { "click": function($event) {
      return _setup.refreshPosts();
    } } }, [_c("v-icon", [_vm._v(_vm._s(_setup.mdiRefresh))])], 1)], 1), _c(_setup.PostDetail)], 1) : _vm._e();
  };
  var _sfc_staticRenderFns$4 = [];
  var __component__$4 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$4,
    _sfc_render$4,
    _sfc_staticRenderFns$4,
    false,
    null,
    null,
    null,
    null
  );
  var PostList = __component__$4.exports;
  var _sfc_main$3 = /* @__PURE__ */ Vue2.defineComponent({
    __name: "PoolList",
    setup(__props) {
      const columnCount = Vue2.ref({
        300: 1,
        600: 1,
        900: 2,
        1200: 3,
        1600: 4,
        1920: 5,
        2400: 6,
        2700: 7,
        3e3: 8,
        default: 5
      });
      const noMore = Vue2.ref(false);
      const showNoMore = Vue2.computed(() => !store.requestLoading && noMore.value);
      const showLoadMore = Vue2.computed(() => !store.requestLoading && !noMore.value);
      const page = Vue2.ref(Number(new URLSearchParams(location.search).get("page")) || 1);
      const pools = Vue2.ref([]);
      async function loadData(query2) {
        store.requestLoading = true;
        try {
          const results = await fetchPools(page.value, query2);
          if (Array.isArray(results) && results.length > 0) {
            pools.value = [...pools.value, ...results];
            const url = new URL(location.href);
            url.searchParams.set("page", page.value.toString());
            history.replaceState("", "", url);
            page.value++;
          } else {
            noMore.value = true;
          }
        } catch (error) {
          console.log("fetchPools error: ", error);
        } finally {
          store.requestLoading = false;
        }
      }
      function viewPool(id) {
        window.open(`/post?tags=pool%3A${id}&_wf=1`, "_blank");
      }
      const scrollFn = throttleScroll(() => {
        if (noMore.value)
          return;
        if (store.requestLoading)
          return;
        notReachBottom() && loadData();
      });
      Vue2.onMounted(async () => {
        await loadData();
        window.addEventListener("scroll", scrollFn);
        eventBus.$on("loadPoolsByQuery", (query2) => {
          page.value = 1;
          pools.value = [];
          loadData(query2);
        });
      });
      Vue2.onUnmounted(() => {
        window.removeEventListener("scroll", scrollFn);
        eventBus.$off("loadPoolsByQuery");
      });
      return { __sfc: true, columnCount, noMore, showNoMore, showLoadMore, page, pools, loadData, viewPool, scrollFn, mdiCalendarBlank, mdiCalendarEdit, mdiDownload, mdiLaunch, store };
    }
  });
  var _sfc_render$3 = function render() {
    var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c("div", [_c("masonry", { attrs: { "cols": _setup.columnCount, "gutter": "8px" } }, _vm._l(_setup.pools, function(item) {
      return _c("v-card", { key: item.id, staticClass: "mb-2" }, [_c("v-img", { attrs: { "transition": "scroll-y-transition", "src": item.thumb, "height": "auto" } }), _c("v-card-title", [_vm._v(_vm._s(item.name))]), _c("v-card-subtitle", { staticClass: "pb-0" }, [_c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
        return [_c("span", _vm._g(_vm._b({ staticClass: "d-inline-block text-truncate", staticStyle: { "max-width": "100%" } }, "span", attrs, false), on), [_vm._v(_vm._s(item.description))])];
      } }], null, true) }, [_c("span", { staticStyle: { "display": "inline-block", "max-width": "500px" } }, [_vm._v(_vm._s(item.description))])])], 1), _c("v-card-text", { staticClass: "pb-0" }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v(_vm._s(_setup.mdiCalendarBlank))]), _c("span", { staticClass: "ml-1 mr-4" }, [_vm._v(_vm._s(item.created_at))]), _c("v-icon", { attrs: { "small": "" } }, [_vm._v(_vm._s(_setup.mdiCalendarEdit))]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(item.updated_at))])], 1), _c("v-card-actions", [_c("v-list-item", { staticClass: "grow" }, [_c("v-list-item-avatar", [_c("v-img", { staticClass: "elevation-6", attrs: { "alt": "", "src": `/data/avatars/${item.user_id}.jpg`, "lazy-src": "https://upload-bbs.mihoyo.com/upload/2022/08/13/190122060/f65e984cb2f5184ba167e461bfdeea55_8564255716639207386.png" } })], 1), _c("v-row", { attrs: { "align": "center", "justify": "end" } }, [_c("v-list-item-content", { staticClass: "ml-2" }, [_c("v-list-item-title", [_c("a", { attrs: { "href": `/pool/show/${item.id}`, "target": "_blank" } }, [_vm._v("Pool #" + _vm._s(item.id))])])], 1), _c("v-chip", { staticClass: "mr-1" }, [_vm._v(_vm._s(item.post_count) + " " + _vm._s(_vm.$t("xJJTEE3nZ4HVXGFfiN-LC")))]), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
        return [_c("v-btn", _vm._g(_vm._b({ attrs: { "icon": "" }, on: { "click": function($event) {
          return _setup.viewPool(item.id);
        } } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiLaunch))])], 1)];
      } }], null, true) }, [_c("span", [_vm._v(_vm._s(_vm.$t("tGi6xYfvStBmR8qduEmKX")))])]), _c("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
        return [_c("v-btn", _vm._g(_vm._b({ attrs: { "icon": "", "href": `/pool/zip/${item.id}?jpeg=1` } }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_setup.mdiDownload))])], 1)];
      } }], null, true) }, [_c("span", [_vm._v(_vm._s(_vm.$t("Xtk-NnMgSQZmheJ87nbRV")))])])], 1)], 1)], 1)], 1);
    }), 1), _c("div", { staticClass: "d-flex justify-center" }, [_c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.store.requestLoading, expression: "store.requestLoading" }], attrs: { "color": "primary", "text": "" } }, [_vm._v(_vm._s(_vm.$t("RN4dt81l_fZMWODsskZob")) + "...")]), _c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.showLoadMore, expression: "showLoadMore" }], attrs: { "color": "primary", "text": "" }, on: { "click": function($event) {
      return _setup.loadData();
    } } }, [_vm._v(_vm._s(_vm.$t("fC8XNfCl04zK7vgeaRZMQ")))]), _c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.showNoMore, expression: "showNoMore" }], attrs: { "color": "primary", "text": "" } }, [_vm._v(_vm._s(_vm.$t("4hOFoP4M3ZkL3RiN7XOc8")))])], 1)], 1);
  };
  var _sfc_staticRenderFns$3 = [];
  var __component__$3 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$3,
    _sfc_render$3,
    _sfc_staticRenderFns$3,
    false,
    null,
    null,
    null,
    null
  );
  var PoolList = __component__$3.exports;
  var _sfc_main$2 = /* @__PURE__ */ Vue2.defineComponent({
    __name: "Snackbar",
    setup(__props) {
      const showSnackbar = Vue2.ref(false);
      const snackbarText = Vue2.ref("");
      const snackbarType = Vue2.ref("");
      const snackbarTypeMap = Vue2.ref({
        success: ["success", mdiCheckCircle],
        error: ["red accent-2", mdiCloseCircle]
      });
      eventBus.$on("showSnackbar", (text, type) => {
        snackbarText.value = text;
        snackbarType.value = type || "";
        showSnackbar.value = true;
      });
      return { __sfc: true, showSnackbar, snackbarText, snackbarType, snackbarTypeMap };
    }
  });
  var _sfc_render$2 = function render() {
    var _a2, _b;
    var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c("v-snackbar", { attrs: { "top": "", "color": (_a2 = _setup.snackbarTypeMap[_setup.snackbarType]) == null ? void 0 : _a2[0], "timeout": 2e3, "min-width": 160 }, model: { value: _setup.showSnackbar, callback: function($$v) {
      _setup.showSnackbar = $$v;
    }, expression: "showSnackbar" } }, [_c("v-icon", { directives: [{ name: "show", rawName: "v-show", value: _setup.snackbarType, expression: "snackbarType" }] }, [_vm._v(_vm._s((_b = _setup.snackbarTypeMap[_setup.snackbarType]) == null ? void 0 : _b[1]))]), _c("span", { staticClass: "ml-2" }, [_vm._v(_vm._s(_setup.snackbarText))])], 1);
  };
  var _sfc_staticRenderFns$2 = [];
  var __component__$2 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$2,
    _sfc_render$2,
    _sfc_staticRenderFns$2,
    false,
    null,
    null,
    null,
    null
  );
  var Snackbar = __component__$2.exports;
  var _sfc_main$1 = /* @__PURE__ */ Vue2.defineComponent({
    __name: "AppContainer",
    setup(__props) {
      return { __sfc: true, PostList, PoolList, Snackbar, store };
    }
  });
  var _sfc_render$1 = function render() {
    var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c("v-container", { staticClass: "_vcont pa-4", attrs: { "fluid": "" } }, [_setup.store.showPostList ? _c(_setup.PostList) : _vm._e(), _setup.store.showPoolList ? _c(_setup.PoolList) : _vm._e(), _c(_setup.Snackbar)], 1);
  };
  var _sfc_staticRenderFns$1 = [];
  var __component__$1 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$1,
    _sfc_render$1,
    _sfc_staticRenderFns$1,
    false,
    null,
    null,
    null,
    null
  );
  var AppContainer = __component__$1.exports;
  var _sfc_main = /* @__PURE__ */ Vue2.defineComponent({
    __name: "App",
    setup(__props) {
      const vuetify = useVuetify();
      Vue2.watch(() => settings, (val) => {
        localStorage.setItem("YM_APP_SETTINGS", JSON.stringify(val));
      }, { deep: true });
      Vue2.onMounted(() => {
        vuetify.theme.dark = settings.darkMode === "dark";
      });
      return { __sfc: true, vuetify, AppBar, NavDrawer, SettingsDrawer, AppContainer };
    }
  });
  var _sfc_render = function render() {
    var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c("v-app", [_c(_setup.AppBar), _c(_setup.NavDrawer), _c("v-main", { attrs: { "app": "" } }, [_c(_setup.AppContainer), _c(_setup.SettingsDrawer)], 1)], 1);
  };
  var _sfc_staticRenderFns = [];
  var __component__ = /* @__PURE__ */ normalizeComponent(
    _sfc_main,
    _sfc_render,
    _sfc_staticRenderFns,
    false,
    null,
    null,
    null,
    null
  );
  var App = __component__.exports;
  function initApp() {
    Vue__default["default"].use(Plugin);
    Vue__default["default"].component("WfLayout", WfLayout);
    Vue__default["default"].component("VirtualWaterfall", VirtualWaterfall);
    const vuetify = installVuetify();
    const app = new Vue__default["default"]({
      vuetify,
      i18n,
      render: (h) => h(App)
    });
    app.$mount("#app");
  }
  initApp();
  })(Vue, Vuetify, VueI18n, {XMLParser});});
})();
