// ==UserScript==
// @name                 Yande.re 瀑布流浏览
// @version              0.21.0
// @description          Yande.re/Konachan 中文标签 & 缩略图放大 & 双击翻页 & 瀑布流浏览模式
// @description:en       Yande.re/Konachan Masonry(Waterfall) Layout.
// @author               asadahimeka
// @namespace            me.asadahimeka.yanderemasonry
// @license              MIT
// @homepage             https://www.nanoka.top
// @source               https://github.com/asadahimeka/yandere-masonry
// @icon                 https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/f1f6267537a5aff959ee63ec2c9e4e52_4821140735490026106.jpg
// @supportURL           https://github.com/asadahimeka/yandere-masonry/issues
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
// @run-at               document-end
// @grant                GM_addStyle
// @grant                unsafeWindow
// @grant                GM_addElement
// @grant                GM_info
// @grant                GM_download
// ==/UserScript==

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(() => {
  var ydStyle = 'a.thumb{padding-bottom:5px;border-bottom:2px solid;border-color:#232322}a.thumb:visited{border-color:#ffaaae}#add-to-favs{zoom:1.7;margin:4px 0}li.tag-type-artist a[href^="/post"]:not(.no-browser-link):before{content:"[\\753b\\5e08] "}li.tag-type-copyright a[href^="/post"]:not(.no-browser-link):before{content:"[\\7248\\6743] "}li.tag-type-character a[href^="/post"]:not(.no-browser-link):before{content:"[\\89d2\\8272] "}li.tag-type-circle a[href^="/post"]:not(.no-browser-link):before{content:"[\\793e\\56e2] "}#post-list{display:flex}#post-list .sidebar,#post-popular .sidebar{float:none;width:auto;max-width:240px}#post-list .content,#post-popular .content{float:none;flex:1;padding-right:10px}#post-list ul#post-list-posts,#post-popular ul#post-list-posts{display:block;width:100%;margin:0 auto}#post-popular ul#post-list-posts{width:96vw}#post-list ul#post-list-posts li,#post-popular ul#post-list-posts li{float:none;display:inline-block;margin:0;transition:.2s ease-in-out}#post-list ul#post-list-posts li[data-macy-complete="1"] img.preview,#post-popular ul#post-list-posts li[data-macy-complete="1"] img.preview{max-width:100%}#post-list ul#post-list-posts .inner,#post-popular ul#post-list-posts .inner{width:100%!important;height:auto!important}#post-list img.preview,#post-popular img.preview{width:100%;height:auto;margin-top:0;border-radius:5px;box-sizing:border-box}#post-list a.directlink,#post-popular a.directlink{margin-top:5px}\n';
  var knStyle = "#lsidebar{display:none}#post-popular ul#post-list-posts{display:flex;justify-content:center;flex-wrap:wrap}#post-list ul#post-list-posts li,#post-popular ul#post-list-posts li{width:auto!important;margin:0 10px 10px 0;vertical-align:top}\n";
  var customStyle = '#loading{height:100%;width:100%;position:fixed;z-index:99999;margin-top:0;top:0}#loading p{margin:100px auto;line-height:100px;font-family:Meiryo UI,MicroHei,Microsoft YaHei UI;font-size:18px;color:#9671d7}#loading-center{width:100%;height:100%;position:relative}#loading-center-absolute{position:absolute;left:50%;top:50%;height:150px;width:150px;margin-top:-75px;margin-left:-50px}.loading-object{width:20px;height:20px;background-color:#9671d7;float:left;margin-right:20px;margin-top:65px;border-radius:50%}#loading-object_one{animation:object_one 1.5s infinite}#loading-object_two{animation:object_two 1.5s infinite;animation-delay:.25s}#loading-object_three{animation:object_three 1.5s infinite;animation-delay:.5s}@keyframes object_one{75%{transform:scale(0)}}@keyframes object_two{75%{transform:scale(0)}}@keyframes object_three{75%{transform:scale(0)}}.img_detail_scale_on{width:auto!important;max-width:100vw!important;max-height:100vh!important;margin:0;padding:12px;overflow:auto}.img_detail_scale_on .v-image{display:block;max-height:100vh;margin:0 auto}.img_detail_scale_on .v-responsive__sizer,.img_detail_scale_on .v-image__image{display:none}.img_detail_scale_on .v-responsive__content{position:relative;width:auto!important;max-width:100vw!important;max-height:100vh;margin:0!important}.img_scale_scroll{display:none}.img_detail_scale_on .img_scale_scroll{display:block;max-width:100vw;max-height:calc(100vh - 30px);overflow:auto}.img_scale_scroll::-webkit-scrollbar{width:10px;height:10px}.img_scale_scroll::-webkit-scrollbar-track{background:#e6e6e6;border-left:1px solid #dadada}.img_scale_scroll::-webkit-scrollbar-thumb{background:#b0b0b0;border:solid 3px #e6e6e6;border-radius:7px}.img_scale_scroll::-webkit-scrollbar-thumb:hover{background:black}.v-date-picker-table>table>thead>tr>th{padding:0}.v-date-picker-table>table>thead>tr>th:nth-child(1):before{content:"\\65e5"}.v-date-picker-table>table>thead>tr>th:nth-child(2):before{content:"\\4e00"}.v-date-picker-table>table>thead>tr>th:nth-child(3):before{content:"\\4e8c"}.v-date-picker-table>table>thead>tr>th:nth-child(4):before{content:"\\4e09"}.v-date-picker-table>table>thead>tr>th:nth-child(5):before{content:"\\56db"}.v-date-picker-table>table>thead>tr>th:nth-child(6):before{content:"\\4e94"}.v-date-picker-table>table>thead>tr>th:nth-child(7):before{content:"\\516d"}.poa_left_center{position:absolute;left:10px;top:50%;transform:translateY(-50%)}.poa_right_center{position:absolute;right:10px;top:50%;transform:translateY(-50%)}.v-list-item__title.title{line-height:1.2!important}\n';
  async function prepareApp(callback) {
    if (doNotRun())
      return;
    addSiteStyle();
    if (isMoebooru()) {
      bindDblclick();
      setMoebooruLocale();
      translateTags();
      initMacy();
    }
    addEventListener("load", () => {
      setMasonryMode(async () => {
        removeOldListeners();
        await initMasonry();
        callback == null ? void 0 : callback();
      });
    });
  }
  function doNotRun() {
    const mimeTypes = ["jpg", "jpeg", "png", "gif", "mp4", "webm", "json", "xml"];
    return mimeTypes.some((e) => location.pathname.endsWith(`.${e}`));
  }
  function isMoebooru() {
    return ["yande.re", "konachan"].some((e) => location.href.includes(e));
  }
  async function initMacy() {
    if (!location.href.includes("yande.re/post"))
      return;
    const listEl = document.querySelector("#post-list-posts");
    if (!listEl)
      return;
    for (const item of listEl.children) {
      item.setAttribute("style", "width:auto;margin:0 10px 10px 0;vertical-align:top");
    }
    await loadScript("https://lib.baomitu.com/macy/2.5.1/macy.min.js");
    setTimeout(() => {
      new Macy({
        container: listEl,
        trueOrder: false,
        waitForImages: false,
        columns: 6,
        margin: 16,
        breakAt: { 1900: 6, 1600: 5, 1200: 4, 900: 2, 600: 1 }
      });
    }, 100);
  }
  async function initMasonry() {
    replaceHead();
    replaceBody();
    await loadDeps();
  }
  function addSiteStyle() {
    GM_addStyle("#enter-masonry{position:fixed;z-index:99;right:16px;top:10px;padding:8px 12px;border:0;border-radius:6px;color:#fff;outline:0;background: linear-gradient(to right, #ff758c 0%, #ff7eb3 100%);opacity:1;transform:scale(1);transition:opacity,transform .2s;cursor:pointer}#enter-masonry:hover{opacity:.8;transform:scale(1.05)}");
    if (location.href.includes("yande.re")) {
      GM_addStyle(ydStyle);
    }
    if (location.href.includes("konachan")) {
      GM_addStyle(ydStyle + knStyle);
    }
  }
  function setMoebooruLocale() {
    if (document.title === "Access denied")
      return;
    if (document.cookie.includes("locale="))
      return;
    const url = new URL(location.href);
    if (url.searchParams.get("_wf"))
      return;
    if (url.searchParams.get("locale"))
      return;
    url.searchParams.set("locale", "zh_CN");
    location.assign(url);
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
      const en = (textEn == null ? void 0 : textEn(item)) || item.innerHTML;
      const cn = (_a2 = window.__tagsCN) == null ? void 0 : _a2[en];
      if (cn)
        item.innerHTML = (display == null ? void 0 : display(en, cn)) || `${en} [${cn}]`;
    }
  }
  async function translateTags() {
    const response = await fetch("https://raw.githubusercontent.com/asadahimeka/yandere-masonry/main/src/data/tags_cn.json");
    window.__tagsCN = await response.json();
    const url = new URL(location.href);
    if (url.pathname == "/tag")
      return setTagText("td[class^=tag-type] a:last-child");
    if (!url.pathname.includes("/post"))
      return;
    const textEn = (el) => el.innerHTML.replace(/\s+/g, "_");
    setTagText('#site-title a[href^="/post?tags="]', textEn);
    setTagText('#tag-sidebar a[href^="/post?tags="]:not(.no-browser-link)', textEn, (en, cn) => `[${cn}] ${en}`);
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
    const params2 = new URLSearchParams(location.search);
    if (params2.get("_wf"))
      return fn();
    if (location.href.includes("safebooru")) {
      const oldBtn = document.querySelector("#enter-masonry");
      oldBtn == null ? void 0 : oldBtn.remove();
    }
    document.body.insertAdjacentHTML("beforeend", '<button id="enter-masonry">\u7011\u5E03\u6D41\u6A21\u5F0F</button>');
    const btn = document.querySelector("#enter-masonry");
    btn == null ? void 0 : btn.addEventListener("click", () => {
      fn();
    });
  }
  const specialSites = ["gelbooru"];
  function loadScript(src) {
    return new Promise((resolve) => {
      let script;
      if (specialSites.some((e) => location.href.includes(e))) {
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
  function loadDeps() {
    return Promise.all([
      loadScript("https://lib.baomitu.com/vue/2.6.14/vue.min.js"),
      loadScript("https://unpkg.com/@vue/composition-api@1.7.0/dist/vue-composition-api.prod.js"),
      loadScript("https://lib.baomitu.com/vuetify/2.6.6/vuetify.min.js"),
      loadScript("https://code.bdstatic.com/npm/vue-masonry-css@1.0.3/dist/vue-masonry.min.js")
    ]);
  }
  function replaceHead() {
    const el = document.querySelector('[name="csrf-token"]');
    const token = el == null ? void 0 : el.getAttribute("content");
    token && sessionStorage.setItem("csrf-token", token);
    document.head.innerHTML = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    ${location.href.includes("http://behoimi.org") ? "" : '<meta name="referrer" content="no-referrer">'}
    <title>${location.host.toUpperCase()} Masonry</title>
    <link rel="stylesheet" href="https://lib.baomitu.com/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="https://lib.baomitu.com/vuetify/2.6.6/vuetify.min.css">
    <style>${customStyle}::-webkit-scrollbar{width:0px}</style>
  `;
  }
  function replaceBody() {
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
  prepareApp(() => {(function(Vue2, VueCompositionAPI2, VueMasonry2, Vuetify2) {
  var _a, _b, _c;
  "use strict";
  ;
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { "default": e };
  }
  var Vue__default = /* @__PURE__ */ _interopDefaultLegacy(Vue2);
  var VueCompositionAPI__default = /* @__PURE__ */ _interopDefaultLegacy(VueCompositionAPI2);
  var VueMasonry__default = /* @__PURE__ */ _interopDefaultLegacy(VueMasonry2);
  var Vuetify__default = /* @__PURE__ */ _interopDefaultLegacy(Vuetify2);
  /*! prepare end */
  function installVuetify() {
    Vue__default["default"].use(Vuetify__default["default"]);
    return new Vuetify__default["default"]({
      icons: {
        iconfont: "mdiSvg"
      },
      theme: {
        dark: true,
        themes: {
          light: {
            primary: "#8E24AA",
            accent: "#EC407A"
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
    const instance = VueCompositionAPI2.getCurrentInstance();
    if (!instance) {
      throw new Error("Should be used in setup().");
    }
    return instance.proxy.$vuetify;
  }
  var mdiAccount = "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z";
  var mdiArrowRightCircleOutline = "M6,13V11H14L10.5,7.5L11.92,6.08L17.84,12L11.92,17.92L10.5,16.5L14,13H6M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12Z";
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
  var mdiChevronLeft = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";
  var mdiChevronRight = "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
  var mdiClose = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
  var mdiCloseCircle = "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z";
  var mdiDelete = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
  var mdiDownload = "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z";
  var mdiFileClockOutline = "M4 2A2 2 0 0 0 2 4V20A2 2 0 0 0 4 22H12.41A7 7 0 0 0 16 23A7 7 0 0 0 23 16A7 7 0 0 0 18 9.3V8L12 2H4M4 4H11V9H16A7 7 0 0 0 9 16A7 7 0 0 0 10.26 20H4V4M16 11A5 5 0 0 1 21 16A5 5 0 0 1 16 21A5 5 0 0 1 11 16A5 5 0 0 1 16 11M15 12V17L18.61 19.16L19.36 17.94L16.5 16.25V12H15Z";
  var mdiFileGifBox = "M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M10 10.5H7.5V13.5H8.5V12H10V13.7C10 14.4 9.5 15 8.7 15H7.3C6.5 15 6 14.3 6 13.7V10.4C6 9.7 6.5 9 7.3 9H8.6C9.5 9 10 9.7 10 10.3V10.5M13 15H11.5V9H13V15M17.5 10.5H16V11.5H17.5V13H16V15H14.5V9H17.5V10.5Z";
  var mdiFire = "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z";
  var mdiGithub = "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z";
  var mdiHeart = "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z";
  var mdiHeartPlusOutline = "M12.67 20.74L12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 9.93 21.5 11.26 20.62 12.61C20 12.31 19.31 12.11 18.59 12.04C19.5 10.8 20 9.65 20 8.5C20 6.5 18.5 5 16.5 5C14.96 5 13.46 6 12.93 7.36H11.07C10.54 6 9.04 5 7.5 5C5.5 5 4 6.5 4 8.5C4 11.39 7.14 14.24 11.89 18.55L12 18.65L12.04 18.61C12.12 19.37 12.34 20.09 12.67 20.74M17 14V17H14V19H17V22H19V19H22V17H19V14H17Z";
  var mdiHome = "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z";
  var mdiImageMultiple = "M22,16V4A2,2 0 0,0 20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16M11,12L13.03,14.71L16,11L20,16H8M2,6V20A2,2 0 0,0 4,22H18V20H4V6";
  var mdiInformationOutline = "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";
  var mdiLaunch = "M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z";
  var mdiLinkVariant = "M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z";
  var mdiLocationExit = "M22 12L18 8V11H10V13H18V16M20 18A10 10 0 1 1 20 6H17.27A8 8 0 1 0 17.27 18Z";
  var mdiMagnify = "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";
  var mdiMagnifyMinusOutline = "M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M7,9H12V10H7V9Z";
  var mdiMagnifyPlusOutline = "M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z";
  var mdiMessageAlertOutline = "M13,10H11V6H13V10M13,12H11V14H13V12M22,4V16A2,2 0 0,1 20,18H6L2,22V4A2,2 0 0,1 4,2H20A2,2 0 0,1 22,4M20,4H4V17.2L5.2,16H20V4Z";
  var mdiPlaylistPlus = "M3 16H10V14H3M18 14V10H16V14H12V16H16V20H18V16H22V14M14 6H3V8H14M14 10H3V12H14V10Z";
  var mdiRefresh = "M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z";
  var mdiShuffle = "M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17Z";
  var mdiStar = "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z";
  var mdiTagMultiple = "M5.5,9A1.5,1.5 0 0,0 7,7.5A1.5,1.5 0 0,0 5.5,6A1.5,1.5 0 0,0 4,7.5A1.5,1.5 0 0,0 5.5,9M17.41,11.58C17.77,11.94 18,12.44 18,13C18,13.55 17.78,14.05 17.41,14.41L12.41,19.41C12.05,19.77 11.55,20 11,20C10.45,20 9.95,19.78 9.58,19.41L2.59,12.42C2.22,12.05 2,11.55 2,11V6C2,4.89 2.89,4 4,4H9C9.55,4 10.05,4.22 10.41,4.58L17.41,11.58M13.54,5.71L14.54,4.71L21.41,11.58C21.78,11.94 22,12.45 22,13C22,13.55 21.78,14.05 21.42,14.41L16.04,19.79L15.04,18.79L20.75,13L13.54,5.71Z";
  var mdiVideo = "M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z";
  var mdiViewDashboardVariant = "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z";
  var mdiWeb = "M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
  const ykFlag = ["konachan", "yande.re"].some((e) => location.href.includes(e));
  const poolFlag = location.pathname == "/pool";
  const store = Vue__default["default"].observable({
    requestState: false,
    requestStop: false,
    showImageSelected: false,
    imageSelectedIndex: 0,
    showDrawer: false,
    showFab: false,
    currentPage: 1,
    imageList: [],
    blacklist: ((_a = localStorage.getItem("__blacklist")) == null ? void 0 : _a.split(",").filter(Boolean)) || [],
    selectedImageList: [],
    selectedColumn: (_b = localStorage.getItem("__masonry_col")) != null ? _b : "0",
    isYKSite: ykFlag,
    showPostList: !poolFlag,
    showPoolList: ykFlag && poolFlag,
    toggleDrawer() {
      store.showDrawer = !store.showDrawer;
    },
    addToSelectedList(item) {
      if (store.selectedImageList.some((e) => e.id === item.id))
        return;
      store.selectedImageList.push(item);
    }
  });
  function toInteger(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }
    var number = Number(dirtyNumber);
    if (isNaN(number)) {
      return number;
    }
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }
  function requiredArgs(required, args) {
    if (args.length < required) {
      throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
    }
  }
  function toDate(argument) {
    requiredArgs(1, arguments);
    var argStr = Object.prototype.toString.call(argument);
    if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || argStr === "[object Number]") {
      return new Date(argument);
    } else {
      if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
        console.warn(new Error().stack);
      }
      return new Date(NaN);
    }
  }
  function addDays(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var date = toDate(dirtyDate);
    var amount = toInteger(dirtyAmount);
    if (isNaN(amount)) {
      return new Date(NaN);
    }
    if (!amount) {
      return date;
    }
    date.setDate(date.getDate() + amount);
    return date;
  }
  function addMonths(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var date = toDate(dirtyDate);
    var amount = toInteger(dirtyAmount);
    if (isNaN(amount)) {
      return new Date(NaN);
    }
    if (!amount) {
      return date;
    }
    var dayOfMonth = date.getDate();
    var endOfDesiredMonth = new Date(date.getTime());
    endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
    var daysInMonth = endOfDesiredMonth.getDate();
    if (dayOfMonth >= daysInMonth) {
      return endOfDesiredMonth;
    } else {
      date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
      return date;
    }
  }
  function add(dirtyDate, duration) {
    requiredArgs(2, arguments);
    if (!duration || typeof duration !== "object")
      return new Date(NaN);
    var years = duration.years ? toInteger(duration.years) : 0;
    var months = duration.months ? toInteger(duration.months) : 0;
    var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
    var days = duration.days ? toInteger(duration.days) : 0;
    var hours = duration.hours ? toInteger(duration.hours) : 0;
    var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
    var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
    var date = toDate(dirtyDate);
    var dateWithMonths = months || years ? addMonths(date, months + years * 12) : date;
    var dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
    var minutesToAdd = minutes + hours * 60;
    var secondsToAdd = seconds + minutesToAdd * 60;
    var msToAdd = secondsToAdd * 1e3;
    var finalDate = new Date(dateWithDays.getTime() + msToAdd);
    return finalDate;
  }
  function subDays(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var amount = toInteger(dirtyAmount);
    return addDays(dirtyDate, -amount);
  }
  function subMonths(dirtyDate, dirtyAmount) {
    requiredArgs(2, arguments);
    var amount = toInteger(dirtyAmount);
    return addMonths(dirtyDate, -amount);
  }
  function sub(date, duration) {
    requiredArgs(2, arguments);
    if (!duration || typeof duration !== "object")
      return new Date(NaN);
    var years = duration.years ? toInteger(duration.years) : 0;
    var months = duration.months ? toInteger(duration.months) : 0;
    var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
    var days = duration.days ? toInteger(duration.days) : 0;
    var hours = duration.hours ? toInteger(duration.hours) : 0;
    var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
    var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
    var dateWithoutMonths = subMonths(date, months + years * 12);
    var dateWithoutDays = subDays(dateWithoutMonths, days + weeks * 7);
    var minutestoSub = minutes + hours * 60;
    var secondstoSub = seconds + minutestoSub * 60;
    var mstoSub = secondstoSub * 1e3;
    var finalDate = new Date(dateWithoutDays.getTime() - mstoSub);
    return finalDate;
  }
  const eventBus = new Vue__default["default"]();
  function isURL(s) {
    return /^https?:\/\/.*/.test(s);
  }
  function downloadFile(url, name, options) {
    return new Promise((resolve, reject) => {
      GM_download(__spreadValues({
        url,
        name,
        onload: () => resolve(),
        onerror: (err) => reject(new Error(err.error))
      }, options));
    });
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
  function debounce(func, delay) {
    let timer = null;
    return (...args) => {
      if (timer)
        clearTimeout(timer);
      timer = setTimeout(() => {
        func.call(null, ...args);
      }, delay);
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
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var dist = {};
  var Constants = {};
  var require$$0 = {
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
      nsfw: true,
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
      nsfw: false,
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
      random: true
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
        search: "/api/danbooru/find_posts/index.xml?",
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
      defaultTags: [
        "rating:safe"
      ]
    }
  };
  (function(exports) {
    var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(r) {
      return r && r.__esModule ? r : { default: r };
    };
    Object.defineProperty(exports, "__esModule", { value: true }), exports.defaultOptions = exports.searchURI = exports.USER_AGENT = exports.BooruError = exports.sites = void 0;
    const sites_json_1 = __importDefault2(require$$0), expandedTags = { "rating:e": "rating:explicit", "rating:q": "rating:questionable", "rating:s": "rating:safe" };
    exports.sites = sites_json_1.default;
    class BooruError extends Error {
      constructor(r) {
        super(r instanceof Error ? r.message : r), r instanceof Error ? this.stack = r.stack : Error.captureStackTrace(this, BooruError), this.name = "BooruError";
      }
    }
    function expandTags(r) {
      return r.map((r2) => {
        const t = expandedTags[r2.toLowerCase()];
        return encodeURIComponent(t || r2);
      });
    }
    function searchURI(r, t = [], e = 100, o = 1) {
      return r.paginate === "pid" && (o -= 1), `http${r.insecure ? "" : "s"}://${r.domain}${r.api.search}${r.tagQuery}=${expandTags(t).join(r.tagJoin)}&limit=${e}&${r.paginate}=${o}`;
    }
    exports.BooruError = BooruError, exports.USER_AGENT = "booru (https://github.com/AtoraSuunva/booru)", exports.searchURI = searchURI, exports.defaultOptions = { headers: { Accept: "application/json, application/xml;q=0.9, */*;q=0.8" } };
  })(Constants);
  var Booru = {};
  var browser = { exports: {} };
  (function(module, exports) {
    var getGlobal = function() {
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof global2 !== "undefined") {
        return global2;
      }
      throw new Error("unable to locate global object");
    };
    var global2 = getGlobal();
    module.exports = exports = global2.fetch;
    if (global2.fetch) {
      exports.default = global2.fetch.bind(global2);
    }
    exports.Headers = global2.Headers;
    exports.Request = global2.Request;
    exports.Response = global2.Response;
  })(browser, browser.exports);
  var Utils$1 = {};
  var parser = {};
  var node2json = {};
  var util$4 = {};
  (function(exports) {
    const nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    const nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    const nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
    const regexName = new RegExp("^" + nameRegexp + "$");
    const getAllMatches = function(string, regex) {
      const matches = [];
      let match = regex.exec(string);
      while (match) {
        const allmatches = [];
        allmatches.startIndex = regex.lastIndex - match[0].length;
        const len = match.length;
        for (let index = 0; index < len; index++) {
          allmatches.push(match[index]);
        }
        matches.push(allmatches);
        match = regex.exec(string);
      }
      return matches;
    };
    const isName = function(string) {
      const match = regexName.exec(string);
      return !(match === null || typeof match === "undefined");
    };
    exports.isExist = function(v) {
      return typeof v !== "undefined";
    };
    exports.isEmptyObject = function(obj) {
      return Object.keys(obj).length === 0;
    };
    exports.merge = function(target, a, arrayMode) {
      if (a) {
        const keys = Object.keys(a);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
          if (arrayMode === "strict") {
            target[keys[i]] = [a[keys[i]]];
          } else {
            target[keys[i]] = a[keys[i]];
          }
        }
      }
    };
    exports.getValue = function(v) {
      if (exports.isExist(v)) {
        return v;
      } else {
        return "";
      }
    };
    exports.buildOptions = function(options, defaultOptions2, props2) {
      let newOptions = {};
      if (!options) {
        return defaultOptions2;
      }
      for (let i = 0; i < props2.length; i++) {
        if (options[props2[i]] !== void 0) {
          newOptions[props2[i]] = options[props2[i]];
        } else {
          newOptions[props2[i]] = defaultOptions2[props2[i]];
        }
      }
      return newOptions;
    };
    exports.isTagNameInArrayMode = function(tagName, arrayMode, parentTagName) {
      if (arrayMode === false) {
        return false;
      } else if (arrayMode instanceof RegExp) {
        return arrayMode.test(tagName);
      } else if (typeof arrayMode === "function") {
        return !!arrayMode(tagName, parentTagName);
      }
      return arrayMode === "strict";
    };
    exports.isName = isName;
    exports.getAllMatches = getAllMatches;
    exports.nameRegexp = nameRegexp;
  })(util$4);
  const util$3 = util$4;
  const convertToJson = function(node, options, parentTagName) {
    const jObj = {};
    if (!options.alwaysCreateTextNode && (!node.child || util$3.isEmptyObject(node.child)) && (!node.attrsMap || util$3.isEmptyObject(node.attrsMap))) {
      return util$3.isExist(node.val) ? node.val : "";
    }
    if (util$3.isExist(node.val) && !(typeof node.val === "string" && (node.val === "" || node.val === options.cdataPositionChar))) {
      const asArray = util$3.isTagNameInArrayMode(node.tagname, options.arrayMode, parentTagName);
      jObj[options.textNodeName] = asArray ? [node.val] : node.val;
    }
    util$3.merge(jObj, node.attrsMap, options.arrayMode);
    const keys = Object.keys(node.child);
    for (let index = 0; index < keys.length; index++) {
      const tagName = keys[index];
      if (node.child[tagName] && node.child[tagName].length > 1) {
        jObj[tagName] = [];
        for (let tag in node.child[tagName]) {
          if (node.child[tagName].hasOwnProperty(tag)) {
            jObj[tagName].push(convertToJson(node.child[tagName][tag], options, tagName));
          }
        }
      } else {
        const result = convertToJson(node.child[tagName][0], options, tagName);
        const asArray = options.arrayMode === true && typeof result === "object" || util$3.isTagNameInArrayMode(tagName, options.arrayMode, parentTagName);
        jObj[tagName] = asArray ? [result] : result;
      }
    }
    return jObj;
  };
  node2json.convertToJson = convertToJson;
  var xmlstr2xmlnode = {};
  var xmlNode$1 = function(tagname, parent, val) {
    this.tagname = tagname;
    this.parent = parent;
    this.child = {};
    this.attrsMap = {};
    this.val = val;
    this.addChild = function(child) {
      if (Array.isArray(this.child[child.tagname])) {
        this.child[child.tagname].push(child);
      } else {
        this.child[child.tagname] = [child];
      }
    };
  };
  const hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
  const numRegex = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
  if (!Number.parseInt && window.parseInt) {
    Number.parseInt = window.parseInt;
  }
  if (!Number.parseFloat && window.parseFloat) {
    Number.parseFloat = window.parseFloat;
  }
  const consider = {
    hex: true,
    leadingZeros: true,
    decimalPoint: ".",
    eNotation: true
  };
  function toNumber$1(str, options = {}) {
    options = Object.assign({}, consider, options);
    if (!str || typeof str !== "string")
      return str;
    let trimmedStr = str.trim();
    if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr))
      return str;
    else if (options.hex && hexRegex.test(trimmedStr)) {
      return Number.parseInt(trimmedStr, 16);
    } else {
      const match = numRegex.exec(trimmedStr);
      if (match) {
        const sign = match[1];
        const leadingZeros = match[2];
        let numTrimmedByZeros = trimZeros(match[3]);
        const eNotation = match[4] || match[6];
        if (!options.leadingZeros && leadingZeros.length > 0 && sign && trimmedStr[2] !== ".")
          return str;
        else if (!options.leadingZeros && leadingZeros.length > 0 && !sign && trimmedStr[1] !== ".")
          return str;
        else {
          const num = Number(trimmedStr);
          const numStr = "" + num;
          if (numStr.search(/[eE]/) !== -1) {
            if (options.eNotation)
              return num;
            else
              return str;
          } else if (eNotation) {
            if (options.eNotation)
              return num;
            else
              return str;
          } else if (trimmedStr.indexOf(".") !== -1) {
            if (numStr === "0" && numTrimmedByZeros === "")
              return num;
            else if (numStr === numTrimmedByZeros)
              return num;
            else if (sign && numStr === "-" + numTrimmedByZeros)
              return num;
            else
              return str;
          }
          if (leadingZeros) {
            if (numTrimmedByZeros === numStr)
              return num;
            else if (sign + numTrimmedByZeros === numStr)
              return num;
            else
              return str;
          }
          if (trimmedStr === numStr)
            return num;
          else if (trimmedStr === sign + numStr)
            return num;
          return str;
        }
      } else {
        return str;
      }
    }
  }
  function trimZeros(numStr) {
    if (numStr && numStr.indexOf(".") !== -1) {
      numStr = numStr.replace(/0+$/, "");
      if (numStr === ".")
        numStr = "0";
      else if (numStr[0] === ".")
        numStr = "0" + numStr;
      else if (numStr[numStr.length - 1] === ".")
        numStr = numStr.substr(0, numStr.length - 1);
      return numStr;
    }
    return numStr;
  }
  var strnum = toNumber$1;
  const util$2 = util$4;
  const buildOptions$3 = util$4.buildOptions;
  const xmlNode = xmlNode$1;
  const toNumber = strnum;
  "<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, util$2.nameRegexp);
  if (!Number.parseInt && window.parseInt) {
    Number.parseInt = window.parseInt;
  }
  if (!Number.parseFloat && window.parseFloat) {
    Number.parseFloat = window.parseFloat;
  }
  const defaultOptions$2 = {
    attributeNamePrefix: "@_",
    attrNodeName: false,
    textNodeName: "#text",
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    arrayMode: false,
    trimValues: true,
    cdataTagName: false,
    cdataPositionChar: "\\c",
    numParseOptions: {
      hex: true,
      leadingZeros: true
    },
    tagValueProcessor: function(a, tagName) {
      return a;
    },
    attrValueProcessor: function(a, attrName) {
      return a;
    },
    stopNodes: [],
    alwaysCreateTextNode: false
  };
  xmlstr2xmlnode.defaultOptions = defaultOptions$2;
  const props$2 = [
    "attributeNamePrefix",
    "attrNodeName",
    "textNodeName",
    "ignoreAttributes",
    "ignoreNameSpace",
    "allowBooleanAttributes",
    "parseNodeValue",
    "parseAttributeValue",
    "arrayMode",
    "trimValues",
    "cdataTagName",
    "cdataPositionChar",
    "tagValueProcessor",
    "attrValueProcessor",
    "parseTrueNumberOnly",
    "numParseOptions",
    "stopNodes",
    "alwaysCreateTextNode"
  ];
  xmlstr2xmlnode.props = props$2;
  function processTagValue(tagName, val, options) {
    if (val) {
      if (options.trimValues) {
        val = val.trim();
      }
      val = options.tagValueProcessor(val, tagName);
      val = parseValue(val, options.parseNodeValue, options.numParseOptions);
    }
    return val;
  }
  function resolveNameSpace(tagname, options) {
    if (options.ignoreNameSpace) {
      const tags2 = tagname.split(":");
      const prefix = tagname.charAt(0) === "/" ? "/" : "";
      if (tags2[0] === "xmlns") {
        return "";
      }
      if (tags2.length === 2) {
        tagname = prefix + tags2[1];
      }
    }
    return tagname;
  }
  function parseValue(val, shouldParse, options) {
    if (shouldParse && typeof val === "string") {
      const newval = val.trim();
      if (newval === "true")
        return true;
      else if (newval === "false")
        return false;
      else
        return toNumber(val, options);
    } else {
      if (util$2.isExist(val)) {
        return val;
      } else {
        return "";
      }
    }
  }
  const attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])(.*?)\\3)?`, "g");
  function buildAttributesMap(attrStr, options) {
    if (!options.ignoreAttributes && typeof attrStr === "string") {
      attrStr = attrStr.replace(/\r?\n/g, " ");
      const matches = util$2.getAllMatches(attrStr, attrsRegx);
      const len = matches.length;
      const attrs = {};
      for (let i = 0; i < len; i++) {
        const attrName = resolveNameSpace(matches[i][1], options);
        if (attrName.length) {
          if (matches[i][4] !== void 0) {
            if (options.trimValues) {
              matches[i][4] = matches[i][4].trim();
            }
            matches[i][4] = options.attrValueProcessor(matches[i][4], attrName);
            attrs[options.attributeNamePrefix + attrName] = parseValue(matches[i][4], options.parseAttributeValue, options.numParseOptions);
          } else if (options.allowBooleanAttributes) {
            attrs[options.attributeNamePrefix + attrName] = true;
          }
        }
      }
      if (!Object.keys(attrs).length) {
        return;
      }
      if (options.attrNodeName) {
        const attrCollection = {};
        attrCollection[options.attrNodeName] = attrs;
        return attrCollection;
      }
      return attrs;
    }
  }
  const getTraversalObj = function(xmlData, options) {
    xmlData = xmlData.replace(/\r\n?/g, "\n");
    options = buildOptions$3(options, defaultOptions$2, props$2);
    const xmlObj = new xmlNode("!xml");
    let currentNode = xmlObj;
    let textData = "";
    for (let i = 0; i < xmlData.length; i++) {
      const ch = xmlData[i];
      if (ch === "<") {
        if (xmlData[i + 1] === "/") {
          const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
          let tagName = xmlData.substring(i + 2, closeIndex).trim();
          if (options.ignoreNameSpace) {
            const colonIndex = tagName.indexOf(":");
            if (colonIndex !== -1) {
              tagName = tagName.substr(colonIndex + 1);
            }
          }
          if (currentNode) {
            if (currentNode.val) {
              currentNode.val = util$2.getValue(currentNode.val) + "" + processTagValue(tagName, textData, options);
            } else {
              currentNode.val = processTagValue(tagName, textData, options);
            }
          }
          if (options.stopNodes.length && options.stopNodes.includes(currentNode.tagname)) {
            currentNode.child = [];
            if (currentNode.attrsMap == void 0) {
              currentNode.attrsMap = {};
            }
            currentNode.val = xmlData.substr(currentNode.startIndex + 1, i - currentNode.startIndex - 1);
          }
          currentNode = currentNode.parent;
          textData = "";
          i = closeIndex;
        } else if (xmlData[i + 1] === "?") {
          i = findClosingIndex(xmlData, "?>", i, "Pi Tag is not closed.");
        } else if (xmlData.substr(i + 1, 3) === "!--") {
          i = findClosingIndex(xmlData, "-->", i, "Comment is not closed.");
        } else if (xmlData.substr(i + 1, 2) === "!D") {
          const closeIndex = findClosingIndex(xmlData, ">", i, "DOCTYPE is not closed.");
          const tagExp = xmlData.substring(i, closeIndex);
          if (tagExp.indexOf("[") >= 0) {
            i = xmlData.indexOf("]>", i) + 1;
          } else {
            i = closeIndex;
          }
        } else if (xmlData.substr(i + 1, 2) === "![") {
          const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
          const tagExp = xmlData.substring(i + 9, closeIndex);
          if (textData) {
            currentNode.val = util$2.getValue(currentNode.val) + "" + processTagValue(currentNode.tagname, textData, options);
            textData = "";
          }
          if (options.cdataTagName) {
            const childNode = new xmlNode(options.cdataTagName, currentNode, tagExp);
            currentNode.addChild(childNode);
            currentNode.val = util$2.getValue(currentNode.val) + options.cdataPositionChar;
            if (tagExp) {
              childNode.val = tagExp;
            }
          } else {
            currentNode.val = (currentNode.val || "") + (tagExp || "");
          }
          i = closeIndex + 2;
        } else {
          const result = closingIndexForOpeningTag(xmlData, i + 1);
          let tagExp = result.data;
          const closeIndex = result.index;
          const separatorIndex = tagExp.indexOf(" ");
          let tagName = tagExp;
          let shouldBuildAttributesMap = true;
          if (separatorIndex !== -1) {
            tagName = tagExp.substr(0, separatorIndex).replace(/\s\s*$/, "");
            tagExp = tagExp.substr(separatorIndex + 1);
          }
          if (options.ignoreNameSpace) {
            const colonIndex = tagName.indexOf(":");
            if (colonIndex !== -1) {
              tagName = tagName.substr(colonIndex + 1);
              shouldBuildAttributesMap = tagName !== result.data.substr(colonIndex + 1);
            }
          }
          if (currentNode && textData) {
            if (currentNode.tagname !== "!xml") {
              currentNode.val = util$2.getValue(currentNode.val) + "" + processTagValue(currentNode.tagname, textData, options);
            }
          }
          if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
            if (tagName[tagName.length - 1] === "/") {
              tagName = tagName.substr(0, tagName.length - 1);
              tagExp = tagName;
            } else {
              tagExp = tagExp.substr(0, tagExp.length - 1);
            }
            const childNode = new xmlNode(tagName, currentNode, "");
            if (tagName !== tagExp) {
              childNode.attrsMap = buildAttributesMap(tagExp, options);
            }
            currentNode.addChild(childNode);
          } else {
            const childNode = new xmlNode(tagName, currentNode);
            if (options.stopNodes.length && options.stopNodes.includes(childNode.tagname)) {
              childNode.startIndex = closeIndex;
            }
            if (tagName !== tagExp && shouldBuildAttributesMap) {
              childNode.attrsMap = buildAttributesMap(tagExp, options);
            }
            currentNode.addChild(childNode);
            currentNode = childNode;
          }
          textData = "";
          i = closeIndex;
        }
      } else {
        textData += xmlData[i];
      }
    }
    return xmlObj;
  };
  function closingIndexForOpeningTag(data, i) {
    let attrBoundary;
    let tagExp = "";
    for (let index = i; index < data.length; index++) {
      let ch = data[index];
      if (attrBoundary) {
        if (ch === attrBoundary)
          attrBoundary = "";
      } else if (ch === '"' || ch === "'") {
        attrBoundary = ch;
      } else if (ch === ">") {
        return {
          data: tagExp,
          index
        };
      } else if (ch === "	") {
        ch = " ";
      }
      tagExp += ch;
    }
  }
  function findClosingIndex(xmlData, str, i, errMsg) {
    const closingIndex = xmlData.indexOf(str, i);
    if (closingIndex === -1) {
      throw new Error(errMsg);
    } else {
      return closingIndex + str.length - 1;
    }
  }
  xmlstr2xmlnode.getTraversalObj = getTraversalObj;
  var validator = {};
  const util$1 = util$4;
  const defaultOptions$1 = {
    allowBooleanAttributes: false
  };
  const props$1 = ["allowBooleanAttributes"];
  validator.validate = function(xmlData, options) {
    options = util$1.buildOptions(options, defaultOptions$1, props$1);
    const tags2 = [];
    let tagFound = false;
    let reachedRoot = false;
    if (xmlData[0] === "\uFEFF") {
      xmlData = xmlData.substr(1);
    }
    for (let i = 0; i < xmlData.length; i++) {
      if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
        i += 2;
        i = readPI(xmlData, i);
        if (i.err)
          return i;
      } else if (xmlData[i] === "<") {
        let tagStartPos = i;
        i++;
        if (xmlData[i] === "!") {
          i = readCommentAndCDATA(xmlData, i);
          continue;
        } else {
          let closingTag = false;
          if (xmlData[i] === "/") {
            closingTag = true;
            i++;
          }
          let tagName = "";
          for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) {
            tagName += xmlData[i];
          }
          tagName = tagName.trim();
          if (tagName[tagName.length - 1] === "/") {
            tagName = tagName.substring(0, tagName.length - 1);
            i--;
          }
          if (!validateTagName(tagName)) {
            let msg;
            if (tagName.trim().length === 0) {
              msg = "Invalid space after '<'.";
            } else {
              msg = "Tag '" + tagName + "' is an invalid name.";
            }
            return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
          }
          const result = readAttributeStr(xmlData, i);
          if (result === false) {
            return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
          }
          let attrStr = result.value;
          i = result.index;
          if (attrStr[attrStr.length - 1] === "/") {
            const attrStrStart = i - attrStr.length;
            attrStr = attrStr.substring(0, attrStr.length - 1);
            const isValid = validateAttributeString(attrStr, options);
            if (isValid === true) {
              tagFound = true;
            } else {
              return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
            }
          } else if (closingTag) {
            if (!result.tagClosed) {
              return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
            } else if (attrStr.trim().length > 0) {
              return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
            } else {
              const otg = tags2.pop();
              if (tagName !== otg.tagName) {
                let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                return getErrorObject("InvalidTag", "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.", getLineNumberForPosition(xmlData, tagStartPos));
              }
              if (tags2.length == 0) {
                reachedRoot = true;
              }
            }
          } else {
            const isValid = validateAttributeString(attrStr, options);
            if (isValid !== true) {
              return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
            }
            if (reachedRoot === true) {
              return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
            } else {
              tags2.push({ tagName, tagStartPos });
            }
            tagFound = true;
          }
          for (i++; i < xmlData.length; i++) {
            if (xmlData[i] === "<") {
              if (xmlData[i + 1] === "!") {
                i++;
                i = readCommentAndCDATA(xmlData, i);
                continue;
              } else if (xmlData[i + 1] === "?") {
                i = readPI(xmlData, ++i);
                if (i.err)
                  return i;
              } else {
                break;
              }
            } else if (xmlData[i] === "&") {
              const afterAmp = validateAmpersand(xmlData, i);
              if (afterAmp == -1)
                return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
              i = afterAmp;
            }
          }
          if (xmlData[i] === "<") {
            i--;
          }
        }
      } else {
        if (xmlData[i] === " " || xmlData[i] === "	" || xmlData[i] === "\n" || xmlData[i] === "\r") {
          continue;
        }
        return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
      }
    }
    if (!tagFound) {
      return getErrorObject("InvalidXml", "Start tag expected.", 1);
    } else if (tags2.length == 1) {
      return getErrorObject("InvalidTag", "Unclosed tag '" + tags2[0].tagName + "'.", getLineNumberForPosition(xmlData, tags2[0].tagStartPos));
    } else if (tags2.length > 0) {
      return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags2.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
    }
    return true;
  };
  function readPI(xmlData, i) {
    const start = i;
    for (; i < xmlData.length; i++) {
      if (xmlData[i] == "?" || xmlData[i] == " ") {
        const tagname = xmlData.substr(start, i - start);
        if (i > 5 && tagname === "xml") {
          return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
        } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
          i++;
          break;
        } else {
          continue;
        }
      }
    }
    return i;
  }
  function readCommentAndCDATA(xmlData, i) {
    if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
      for (i += 3; i < xmlData.length; i++) {
        if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
          i += 2;
          break;
        }
      }
    } else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
      let angleBracketsCount = 1;
      for (i += 8; i < xmlData.length; i++) {
        if (xmlData[i] === "<") {
          angleBracketsCount++;
        } else if (xmlData[i] === ">") {
          angleBracketsCount--;
          if (angleBracketsCount === 0) {
            break;
          }
        }
      }
    } else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
      for (i += 8; i < xmlData.length; i++) {
        if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
          i += 2;
          break;
        }
      }
    }
    return i;
  }
  const doubleQuote = '"';
  const singleQuote = "'";
  function readAttributeStr(xmlData, i) {
    let attrStr = "";
    let startChar = "";
    let tagClosed = false;
    for (; i < xmlData.length; i++) {
      if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
        if (startChar === "") {
          startChar = xmlData[i];
        } else if (startChar !== xmlData[i])
          ;
        else {
          startChar = "";
        }
      } else if (xmlData[i] === ">") {
        if (startChar === "") {
          tagClosed = true;
          break;
        }
      }
      attrStr += xmlData[i];
    }
    if (startChar !== "") {
      return false;
    }
    return {
      value: attrStr,
      index: i,
      tagClosed
    };
  }
  const validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
  function validateAttributeString(attrStr, options) {
    const matches = util$1.getAllMatches(attrStr, validAttrStrRegxp);
    const attrNames = {};
    for (let i = 0; i < matches.length; i++) {
      if (matches[i][1].length === 0) {
        return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
      } else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) {
        return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
      }
      const attrName = matches[i][2];
      if (!validateAttrName(attrName)) {
        return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
      }
      if (!attrNames.hasOwnProperty(attrName)) {
        attrNames[attrName] = 1;
      } else {
        return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
      }
    }
    return true;
  }
  function validateNumberAmpersand(xmlData, i) {
    let re = /\d/;
    if (xmlData[i] === "x") {
      i++;
      re = /[\da-fA-F]/;
    }
    for (; i < xmlData.length; i++) {
      if (xmlData[i] === ";")
        return i;
      if (!xmlData[i].match(re))
        break;
    }
    return -1;
  }
  function validateAmpersand(xmlData, i) {
    i++;
    if (xmlData[i] === ";")
      return -1;
    if (xmlData[i] === "#") {
      i++;
      return validateNumberAmpersand(xmlData, i);
    }
    let count = 0;
    for (; i < xmlData.length; i++, count++) {
      if (xmlData[i].match(/\w/) && count < 20)
        continue;
      if (xmlData[i] === ";")
        break;
      return -1;
    }
    return i;
  }
  function getErrorObject(code, message, lineNumber) {
    return {
      err: {
        code,
        msg: message,
        line: lineNumber.line || lineNumber,
        col: lineNumber.col
      }
    };
  }
  function validateAttrName(attrName) {
    return util$1.isName(attrName);
  }
  function validateTagName(tagname) {
    return util$1.isName(tagname);
  }
  function getLineNumberForPosition(xmlData, index) {
    const lines = xmlData.substring(0, index).split(/\r?\n/);
    return {
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    };
  }
  function getPositionFromMatch(match) {
    return match.startIndex + match[1].length;
  }
  var nimndata = {};
  const char = function(a) {
    return String.fromCharCode(a);
  };
  const chars = {
    nilChar: char(176),
    missingChar: char(201),
    nilPremitive: char(175),
    missingPremitive: char(200),
    emptyChar: char(178),
    emptyValue: char(177),
    boundryChar: char(179),
    objStart: char(198),
    arrStart: char(204),
    arrayEnd: char(185)
  };
  const charsArr = [
    chars.nilChar,
    chars.nilPremitive,
    chars.missingChar,
    chars.missingPremitive,
    chars.boundryChar,
    chars.emptyChar,
    chars.emptyValue,
    chars.arrayEnd,
    chars.objStart,
    chars.arrStart
  ];
  const _e = function(node, e_schema, options) {
    if (typeof e_schema === "string") {
      if (node && node[0] && node[0].val !== void 0) {
        return getValue(node[0].val);
      } else {
        return getValue(node);
      }
    } else {
      const hasValidData = hasData(node);
      if (hasValidData === true) {
        let str = "";
        if (Array.isArray(e_schema)) {
          str += chars.arrStart;
          const itemSchema = e_schema[0];
          const arr_len = node.length;
          if (typeof itemSchema === "string") {
            for (let arr_i = 0; arr_i < arr_len; arr_i++) {
              const r = getValue(node[arr_i].val);
              str = processValue(str, r);
            }
          } else {
            for (let arr_i = 0; arr_i < arr_len; arr_i++) {
              const r = _e(node[arr_i], itemSchema, options);
              str = processValue(str, r);
            }
          }
          str += chars.arrayEnd;
        } else {
          str += chars.objStart;
          const keys = Object.keys(e_schema);
          if (Array.isArray(node)) {
            node = node[0];
          }
          for (let i in keys) {
            const key = keys[i];
            let r;
            if (!options.ignoreAttributes && node.attrsMap && node.attrsMap[key]) {
              r = _e(node.attrsMap[key], e_schema[key], options);
            } else if (key === options.textNodeName) {
              r = _e(node.val, e_schema[key], options);
            } else {
              r = _e(node.child[key], e_schema[key], options);
            }
            str = processValue(str, r);
          }
        }
        return str;
      } else {
        return hasValidData;
      }
    }
  };
  const getValue = function(a) {
    switch (a) {
      case void 0:
        return chars.missingPremitive;
      case null:
        return chars.nilPremitive;
      case "":
        return chars.emptyValue;
      default:
        return a;
    }
  };
  const processValue = function(str, r) {
    if (!isAppChar(r[0]) && !isAppChar(str[str.length - 1])) {
      str += chars.boundryChar;
    }
    return str + r;
  };
  const isAppChar = function(ch) {
    return charsArr.indexOf(ch) !== -1;
  };
  function hasData(jObj) {
    if (jObj === void 0) {
      return chars.missingChar;
    } else if (jObj === null) {
      return chars.nilChar;
    } else if (jObj.child && Object.keys(jObj.child).length === 0 && (!jObj.attrsMap || Object.keys(jObj.attrsMap).length === 0)) {
      return chars.emptyChar;
    } else {
      return true;
    }
  }
  const x2j$1 = xmlstr2xmlnode;
  const buildOptions$2 = util$4.buildOptions;
  const convert2nimn = function(node, e_schema, options) {
    options = buildOptions$2(options, x2j$1.defaultOptions, x2j$1.props);
    return _e(node, e_schema, options);
  };
  nimndata.convert2nimn = convert2nimn;
  var node2json_str = {};
  const util = util$4;
  const buildOptions$1 = util$4.buildOptions;
  const x2j = xmlstr2xmlnode;
  const convertToJsonString = function(node, options) {
    options = buildOptions$1(options, x2j.defaultOptions, x2j.props);
    options.indentBy = options.indentBy || "";
    return _cToJsonStr(node, options);
  };
  const _cToJsonStr = function(node, options, level) {
    let jObj = "{";
    const keys = Object.keys(node.child);
    for (let index = 0; index < keys.length; index++) {
      const tagname = keys[index];
      if (node.child[tagname] && node.child[tagname].length > 1) {
        jObj += '"' + tagname + '" : [ ';
        for (let tag in node.child[tagname]) {
          jObj += _cToJsonStr(node.child[tagname][tag], options) + " , ";
        }
        jObj = jObj.substr(0, jObj.length - 1) + " ] ";
      } else {
        jObj += '"' + tagname + '" : ' + _cToJsonStr(node.child[tagname][0], options) + " ,";
      }
    }
    util.merge(jObj, node.attrsMap);
    if (util.isEmptyObject(jObj)) {
      return util.isExist(node.val) ? node.val : "";
    } else {
      if (util.isExist(node.val)) {
        if (!(typeof node.val === "string" && (node.val === "" || node.val === options.cdataPositionChar))) {
          jObj += '"' + options.textNodeName + '" : ' + stringval(node.val);
        }
      }
    }
    if (jObj[jObj.length - 1] === ",") {
      jObj = jObj.substr(0, jObj.length - 2);
    }
    return jObj + "}";
  };
  function stringval(v) {
    if (v === true || v === false || !isNaN(v)) {
      return v;
    } else {
      return '"' + v + '"';
    }
  }
  node2json_str.convertToJsonString = convertToJsonString;
  const buildOptions = util$4.buildOptions;
  const defaultOptions = {
    attributeNamePrefix: "@_",
    attrNodeName: false,
    textNodeName: "#text",
    ignoreAttributes: true,
    cdataTagName: false,
    cdataPositionChar: "\\c",
    format: false,
    indentBy: "  ",
    supressEmptyNode: false,
    tagValueProcessor: function(a) {
      return a;
    },
    attrValueProcessor: function(a) {
      return a;
    }
  };
  const props = [
    "attributeNamePrefix",
    "attrNodeName",
    "textNodeName",
    "ignoreAttributes",
    "cdataTagName",
    "cdataPositionChar",
    "format",
    "indentBy",
    "supressEmptyNode",
    "tagValueProcessor",
    "attrValueProcessor",
    "rootNodeName"
  ];
  function Parser(options) {
    this.options = buildOptions(options, defaultOptions, props);
    if (this.options.ignoreAttributes || this.options.attrNodeName) {
      this.isAttribute = function() {
        return false;
      };
    } else {
      this.attrPrefixLen = this.options.attributeNamePrefix.length;
      this.isAttribute = isAttribute;
    }
    if (this.options.cdataTagName) {
      this.isCDATA = isCDATA;
    } else {
      this.isCDATA = function() {
        return false;
      };
    }
    this.replaceCDATAstr = replaceCDATAstr;
    this.replaceCDATAarr = replaceCDATAarr;
    this.processTextOrObjNode = processTextOrObjNode;
    if (this.options.format) {
      this.indentate = indentate;
      this.tagEndChar = ">\n";
      this.newLine = "\n";
    } else {
      this.indentate = function() {
        return "";
      };
      this.tagEndChar = ">";
      this.newLine = "";
    }
    if (this.options.supressEmptyNode) {
      this.buildTextNode = buildEmptyTextNode;
      this.buildObjNode = buildEmptyObjNode;
    } else {
      this.buildTextNode = buildTextValNode;
      this.buildObjNode = buildObjectNode;
    }
    this.buildTextValNode = buildTextValNode;
    this.buildObjectNode = buildObjectNode;
  }
  Parser.prototype.parse = function(jObj) {
    if (Array.isArray(jObj) && this.options.rootNodeName && this.options.rootNodeName.length > 1) {
      jObj = {
        [this.options.rootNodeName]: jObj
      };
    }
    return this.j2x(jObj, 0).val;
  };
  Parser.prototype.j2x = function(jObj, level) {
    let attrStr = "";
    let val = "";
    for (let key in jObj) {
      if (typeof jObj[key] === "undefined")
        ;
      else if (jObj[key] === null) {
        val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
      } else if (jObj[key] instanceof Date) {
        val += this.buildTextNode(jObj[key], key, "", level);
      } else if (typeof jObj[key] !== "object") {
        const attr = this.isAttribute(key);
        if (attr) {
          attrStr += " " + attr + '="' + this.options.attrValueProcessor("" + jObj[key]) + '"';
        } else if (this.isCDATA(key)) {
          if (jObj[this.options.textNodeName]) {
            val += this.replaceCDATAstr(jObj[this.options.textNodeName], jObj[key]);
          } else {
            val += this.replaceCDATAstr("", jObj[key]);
          }
        } else {
          if (key === this.options.textNodeName) {
            if (jObj[this.options.cdataTagName])
              ;
            else {
              val += this.options.tagValueProcessor("" + jObj[key]);
            }
          } else {
            val += this.buildTextNode(jObj[key], key, "", level);
          }
        }
      } else if (Array.isArray(jObj[key])) {
        if (this.isCDATA(key)) {
          val += this.indentate(level);
          if (jObj[this.options.textNodeName]) {
            val += this.replaceCDATAarr(jObj[this.options.textNodeName], jObj[key]);
          } else {
            val += this.replaceCDATAarr("", jObj[key]);
          }
        } else {
          const arrLen = jObj[key].length;
          for (let j = 0; j < arrLen; j++) {
            const item = jObj[key][j];
            if (typeof item === "undefined")
              ;
            else if (item === null) {
              val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
            } else if (typeof item === "object") {
              val += this.processTextOrObjNode(item, key, level);
            } else {
              val += this.buildTextNode(item, key, "", level);
            }
          }
        }
      } else {
        if (this.options.attrNodeName && key === this.options.attrNodeName) {
          const Ks = Object.keys(jObj[key]);
          const L = Ks.length;
          for (let j = 0; j < L; j++) {
            attrStr += " " + Ks[j] + '="' + this.options.attrValueProcessor("" + jObj[key][Ks[j]]) + '"';
          }
        } else {
          val += this.processTextOrObjNode(jObj[key], key, level);
        }
      }
    }
    return { attrStr, val };
  };
  function processTextOrObjNode(object, key, level) {
    const result = this.j2x(object, level + 1);
    if (object[this.options.textNodeName] !== void 0 && Object.keys(object).length === 1) {
      return this.buildTextNode(result.val, key, result.attrStr, level);
    } else {
      return this.buildObjNode(result.val, key, result.attrStr, level);
    }
  }
  function replaceCDATAstr(str, cdata) {
    str = this.options.tagValueProcessor("" + str);
    if (this.options.cdataPositionChar === "" || str === "") {
      return str + "<![CDATA[" + cdata + "]]" + this.tagEndChar;
    } else {
      return str.replace(this.options.cdataPositionChar, "<![CDATA[" + cdata + "]]" + this.tagEndChar);
    }
  }
  function replaceCDATAarr(str, cdata) {
    str = this.options.tagValueProcessor("" + str);
    if (this.options.cdataPositionChar === "" || str === "") {
      return str + "<![CDATA[" + cdata.join("]]><![CDATA[") + "]]" + this.tagEndChar;
    } else {
      for (let v in cdata) {
        str = str.replace(this.options.cdataPositionChar, "<![CDATA[" + cdata[v] + "]]>");
      }
      return str + this.newLine;
    }
  }
  function buildObjectNode(val, key, attrStr, level) {
    if (attrStr && val.indexOf("<") === -1) {
      return this.indentate(level) + "<" + key + attrStr + ">" + val + "</" + key + this.tagEndChar;
    } else {
      return this.indentate(level) + "<" + key + attrStr + this.tagEndChar + val + this.indentate(level) + "</" + key + this.tagEndChar;
    }
  }
  function buildEmptyObjNode(val, key, attrStr, level) {
    if (val !== "") {
      return this.buildObjectNode(val, key, attrStr, level);
    } else {
      return this.indentate(level) + "<" + key + attrStr + "/" + this.tagEndChar;
    }
  }
  function buildTextValNode(val, key, attrStr, level) {
    return this.indentate(level) + "<" + key + attrStr + ">" + this.options.tagValueProcessor(val) + "</" + key + this.tagEndChar;
  }
  function buildEmptyTextNode(val, key, attrStr, level) {
    if (val !== "") {
      return this.buildTextValNode(val, key, attrStr, level);
    } else {
      return this.indentate(level) + "<" + key + attrStr + "/" + this.tagEndChar;
    }
  }
  function indentate(level) {
    return this.options.indentBy.repeat(level);
  }
  function isAttribute(name) {
    if (name.startsWith(this.options.attributeNamePrefix)) {
      return name.substr(this.attrPrefixLen);
    } else {
      return false;
    }
  }
  function isCDATA(name) {
    return name === this.options.cdataTagName;
  }
  var json2xml = Parser;
  (function(exports) {
    const nodeToJson = node2json;
    const xmlToNodeobj = xmlstr2xmlnode;
    const x2xmlnode = xmlstr2xmlnode;
    const buildOptions2 = util$4.buildOptions;
    const validator$1 = validator;
    exports.parse = function(xmlData, givenOptions = {}, validationOption) {
      if (validationOption) {
        if (validationOption === true)
          validationOption = {};
        const result = validator$1.validate(xmlData, validationOption);
        if (result !== true) {
          throw Error(result.err.msg);
        }
      }
      if (givenOptions.parseTrueNumberOnly && givenOptions.parseNodeValue !== false && !givenOptions.numParseOptions) {
        givenOptions.numParseOptions = {
          leadingZeros: false
        };
      }
      let options = buildOptions2(givenOptions, x2xmlnode.defaultOptions, x2xmlnode.props);
      const traversableObj = xmlToNodeobj.getTraversalObj(xmlData, options);
      return nodeToJson.convertToJson(traversableObj, options);
    };
    exports.convertTonimn = nimndata.convert2nimn;
    exports.getTraversalObj = xmlToNodeobj.getTraversalObj;
    exports.convertToJson = nodeToJson.convertToJson;
    exports.convertToJsonString = node2json_str.convertToJsonString;
    exports.validate = validator$1.validate;
    exports.j2xParser = json2xml;
    exports.parseToNimn = function(xmlData, schema, options) {
      return exports.convertTonimn(exports.getTraversalObj(xmlData, options), schema, options);
    };
  })(parser);
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true }), exports.compareArrays = exports.validateSearchParams = exports.randInt = exports.shuffle = exports.jsonfy = exports.resolveSite = void 0;
    const Constants_12 = Constants, fast_xml_parser_1 = parser;
    function resolveSite(t) {
      if (typeof t != "string")
        return null;
      t = t.toLowerCase();
      for (const r in Constants_12.sites)
        if (r === t || Constants_12.sites[r].domain === t || Constants_12.sites[r].aliases.includes(t))
          return r;
      return null;
    }
    function jsonfy(t) {
      var _a2;
      if (typeof t == "object")
        return t;
      const r = (0, fast_xml_parser_1.parse)(t, { ignoreAttributes: false, attributeNamePrefix: "" });
      if (r.html || r["!doctype"]) {
        const t2 = r.html || ((_a2 = r["!doctype"]) == null ? void 0 : _a2.html), e = [];
        throw t2.body.h1 && e.push(t2.body.h1), t2.body.p && e.push(t2.body.p["#text"]), new Constants_12.BooruError(`The Booru sent back an error: '${e.join(": ")}'`);
      }
      return r.posts.post ? r.posts.post : r.posts.tag ? Array.isArray(r.posts.tag) ? r.posts.tag : [r.posts.tag] : [];
    }
    function shuffle(t) {
      let r, e, o = t.length;
      for (; o !== 0; )
        e = Math.floor(Math.random() * o), o -= 1, r = t[o], t[o] = t[e], t[e] = r;
      return t;
    }
    function randInt(t, r) {
      return t = Math.ceil(t), r = Math.floor(r), Math.floor(Math.random() * (r - t + 1)) + t;
    }
    function validateSearchParams(t, r) {
      const e = resolveSite(t);
      if (typeof r != "number" && (r = parseInt(r, 10)), e === null)
        throw new Constants_12.BooruError("Site not supported");
      if (typeof r != "number" || Number.isNaN(r))
        throw new Constants_12.BooruError("`limit` should be an int");
      return { site: e, limit: r };
    }
    function compareArrays(t, r) {
      return t.filter((t2) => r.some((r2) => t2.toLowerCase() === r2.toLowerCase()));
    }
    exports.resolveSite = resolveSite, exports.jsonfy = jsonfy, exports.shuffle = shuffle, exports.randInt = randInt, exports.validateSearchParams = validateSearchParams, exports.compareArrays = compareArrays;
  })(Utils$1);
  var Post$1 = {};
  function parseImageUrl(e, t, i, s = "file") {
    var _a2;
    if (!e || e.trim() === "" || t.is_deleted)
      return null;
    if (e.startsWith("/data") && (e = `https://danbooru.donmai.us${e}`), e.startsWith("/cached") && (e = `https://danbooru.donmai.us${e}`), e.startsWith("/_images") && (e = `https://dollbooru.org${e}`), e.startsWith("//derpicdn.net") && (e = `https:${t.image}`), !t[`${s}_url`] && t.directory !== void 0) {
      const r = (_a2 = t.directory) != null ? _a2 : `${t.hash.substr(0, 2)}/${t.hash.substr(2, 2)}`;
      e = { preview: `//${i.domain}/thumbnails/${r}/thumbnail_${t.hash}.jpg`, sample: `//${i.domain}/samples/${r}/sample_${t.hash}.jpg`, file: `//${i.domain}/images/${r}/${t.image}` }[s];
    }
    return e.startsWith("http") || (e = `https:${e}`), encodeURI(e);
  }
  function getTags(e) {
    let t = [];
    return Array.isArray(e.tags) ? e.tags : (t = e.tags && e.tags.general ? Object.values(e.tags).reduce((e2, t2) => e2.concat(t2), []) : e.tags ? e.tags.split(" ") : e.tag_string.split(" ").map((e2) => e2.replace(/,/g, "").replace(/ /g, "_")), t.filter((e2) => e2 !== ""));
  }
  function formatFileSize(e) {
    return e == null ? "N/A" : e > 1048576 ? (e / 1048576).toFixed(2) + "MB" : e > 1024 ? (e / 1024).toFixed(2) + "KB" : e.toFixed(2) + "B";
  }
  function getFileExt(e) {
    var _a2;
    return (_a2 = e == null ? void 0 : e.split(".").pop()) != null ? _a2 : "";
  }
  Object.defineProperty(Post$1, "__esModule", { value: true });
  class Post {
    constructor(e, t) {
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
      this.data = e, this.booru = t;
      const i = e.is_deleted || e.is_banned;
      this.fileUrl = parseImageUrl(e.file_url || e.image || (i ? e.source : void 0) || e.file && e.file.url || e.representations && e.representations.full, e, t), this.available = !i && this.fileUrl !== null, this.height = parseInt(e.height || e.image_height || e.file && e.file.height, 10), this.width = parseInt(e.width || e.image_width || e.file && e.file.width, 10), this.sampleUrl = parseImageUrl(e.sample_url || e.large_file_url || e.representations && e.representations.large || e.sample && e.sample.url || e.image, e, t, "sample"), this.sampleHeight = parseInt(e.sample_height || e.sample && e.sample.height, 10), this.sampleWidth = parseInt(e.sample_width || e.sample && e.sample.width, 10), this.previewUrl = parseImageUrl(e.preview_url || e.preview_file_url && e.preview_file_url.replace(/(.*)preview(.*)jpg/, "$1720x720$2webp") || e.representations && e.representations.small || e.preview && e.preview.url || e.image, e, t, "preview"), this.previewHeight = parseInt(e.preview_height || e.preview && e.preview.height, 10), this.previewWidth = parseInt(e.preview_width || e.preview && e.preview.width, 10), this.id = e.id ? e.id.toString() : "No ID available", this.tags = getTags(e), e.score && e.score.total ? this.score = e.score.total : this.score = e.score ? parseInt(e.score, 10) : e.score, this.source = e.source || e.sources || e.source_url, this.rating = e.rating || /(safe|suggestive|questionable|explicit)/i.exec(e.tags) || "u", Array.isArray(this.rating) && (this.rating = this.rating[0]), this.rating === "suggestive" && (this.rating = "q"), this.rating = this.rating.charAt(0), this.createdAt = null, typeof e.created_at == "object" ? this.createdAt = new Date(1e3 * e.created_at.s + e.created_at.n / 1e9) : typeof e.created_at == "number" ? this.createdAt = new Date(1e3 * e.created_at) : typeof e.change == "number" ? this.createdAt = new Date(1e3 * e.change) : this.createdAt = new Date(e.created_at || e.date);
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
      const e = this.createdAt;
      return e ? `${e.toLocaleDateString()} ${e.toLocaleTimeString("en-DE")}` : "";
    }
    get sourceUrl() {
      const e = Array.isArray(this.source) ? this.source[0] : this.source;
      return e ? /^https:\/\/i\.pximg\.net\/img-original\/img\/[\d/]{19}\/([\d]{1,})_p[\d]{1,}\.(jpg|png)$/.test(e) ? `https://pixiv.net/artworks/${RegExp.$1}` : e : "";
    }
    get postView() {
      return this.booru.postView(this.id);
    }
  }
  var _default$1 = Post$1.default = Post;
  var SearchResults$1 = {};
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(t, e, r, s) {
    s === void 0 && (s = r);
    var i = Object.getOwnPropertyDescriptor(e, r);
    i && !("get" in i ? !e.__esModule : i.writable || i.configurable) || (i = { enumerable: true, get: function() {
      return e[r];
    } }), Object.defineProperty(t, s, i);
  } : function(t, e, r, s) {
    s === void 0 && (s = r), t[s] = e[r];
  }), __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(t, e) {
    Object.defineProperty(t, "default", { enumerable: true, value: e });
  } : function(t, e) {
    t.default = e;
  }), __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(t) {
    if (t && t.__esModule)
      return t;
    var e = {};
    if (t != null)
      for (var r in t)
        r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && __createBinding(e, t, r);
    return __setModuleDefault(e, t), e;
  };
  Object.defineProperty(SearchResults$1, "__esModule", { value: true });
  const Utils = __importStar(Utils$1);
  class SearchResults extends Array {
    constructor(t, e, r, s) {
      super(t.length);
      __publicField(this, "booru");
      __publicField(this, "page");
      __publicField(this, "tags");
      __publicField(this, "options");
      __publicField(this, "posts");
      for (let e2 = 0; e2 < t.length; e2++)
        this[e2] = t[e2];
      this.posts = t, this.tags = e, this.options = r, this.booru = s, this.page = r && r.page || 0;
    }
    get first() {
      return this[0];
    }
    get last() {
      return this[this.length - 1];
    }
    nextPage() {
      const t = this.options;
      return t.page = this.page + 1, this.booru.search(this.tags, t);
    }
    tagged(t, { invert: e = false } = {}) {
      Array.isArray(t) || (t = [t]);
      const r = [];
      for (const s of this) {
        const i = Utils.compareArrays(t, s.tags).length;
        (!e && i > 0 || e && i === 0) && r.push(s);
      }
      return new SearchResults(r, this.tags, this.options, this.booru);
    }
    blacklist(t) {
      return this.tagged(t, { invert: true });
    }
  }
  var _default = SearchResults$1.default = SearchResults;
  (function(exports) {
    var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(t) {
      return t && t.__esModule ? t : { default: t };
    };
    Object.defineProperty(exports, "__esModule", { value: true }), exports.Booru = void 0;
    const node_fetch_1 = __importDefault2(browser.exports), Constants_12 = Constants, Utils_1 = Utils$1, Post_1 = __importDefault2(Post$1), SearchResults_1 = __importDefault2(SearchResults$1);
    class Booru2 {
      constructor(t, e) {
        __publicField(this, "domain");
        __publicField(this, "site");
        __publicField(this, "credentials");
        const s = (0, Utils_1.resolveSite)(t.domain);
        if (s === null)
          throw new Error(`Invalid site passed: ${t}`);
        this.domain = s, this.site = t, this.credentials = e;
      }
      async search(t, { limit: e = 1, random: s = false, page: r = 1, showUnavailable: a = false } = {}) {
        const i = s && !this.site.random ? 100 : 0;
        try {
          const o = await this.doSearchRequest(t, { limit: e, random: s, page: r, showUnavailable: a });
          return this.parseSearchResult(o, { fakeLimit: i, tags: t, limit: e, random: s, page: r, showUnavailable: a });
        } catch (t2) {
          throw t2 instanceof Error ? new Constants_12.BooruError(t2) : t2;
        }
      }
      postView(t) {
        if (typeof t == "string" && Number.isNaN(parseInt(t, 10)))
          throw new Constants_12.BooruError(`Not a valid id for postView: ${t}`);
        return `http${this.site.insecure ? "" : "s"}://${this.domain}${this.site.api.postView}${t}`;
      }
      async doSearchRequest(t, { uri: e = null, limit: s = 1, random: r = false, page: a = 1 } = {}) {
        let i;
        Array.isArray(t) || (t = [t]), r && (this.site.random ? t.push("order:random") : i = 100), this.site.defaultTags && (t = t.concat(this.site.defaultTags.filter((e2) => !t.includes(e2))));
        const o = e || this.getSearchUrl({ tags: t, limit: i || s, page: a }), n = Constants_12.defaultOptions, l = this.site.type === "xml";
        try {
          const t2 = await (0, node_fetch_1.default)(o, n);
          if (t2.status === 503 && (await t2.clone().text()).includes("cf-browser-verification"))
            throw new Constants_12.BooruError("Received a CloudFlare browser verification request. Can't proceed.");
          const e2 = l ? await t2.text() : await t2.json(), s2 = l ? (0, Utils_1.jsonfy)(e2) : e2;
          if (t2.ok)
            return s2;
          throw new Constants_12.BooruError(`Received HTTP ${t2.status} from booru: '${s2.error || s2.message || JSON.stringify(s2)}'`);
        } catch (t2) {
          if (t2.type === "invalid-json")
            return "";
          throw t2;
        }
      }
      getSearchUrl({ tags: t = [], limit: e = 100, page: s = 1 }) {
        return (0, Constants_12.searchURI)(this.site, t, e, s);
      }
      parseSearchResult(t, { fakeLimit: e, tags: s, limit: r, random: a, page: i, showUnavailable: o }) {
        if (t.success === false)
          throw new Constants_12.BooruError(t.message || t.reason);
        let n;
        t["@attributes"] && (t = t["@attributes"].count !== "0" && t.post ? Array.isArray(t.post) ? t.post : [t.post] : []), t.posts && (t = t.posts), t.images && (t = t.images), t === "" ? n = [] : e ? n = (0, Utils_1.shuffle)(t) : t.constructor === Object && (n = [t]);
        let l = (n || t).slice(0, r).map((t2) => new Post_1.default(t2, this));
        const u = { limit: r, random: a, page: i, showUnavailable: o };
        return s === void 0 && (s = []), Array.isArray(s) || (s = [s]), o || (l = l.filter((t2) => t2.available)), new SearchResults_1.default(l, s, u, this);
      }
    }
    exports.Booru = Booru2, exports.default = Booru2;
  })(Booru);
  var Derpibooru$1 = {};
  var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(Derpibooru$1, "__esModule", { value: true });
  const Constants_1 = Constants, Booru_1$1 = __importDefault$1(Booru);
  class Derpibooru extends Booru_1$1.default {
    constructor(e, t) {
      super(e, t);
    }
    search(e, { limit: t = 1, random: r = false, page: s = 0 } = {}) {
      Array.isArray(e) || (e = [e]), e[0] === void 0 && (e[0] = "*"), s += 1;
      const o = this.getSearchUrl({ tags: e, limit: t, page: s }) + (r && this.site.random === "string" ? `&${this.site.random}` : "") + (this.credentials ? `&key=${this.credentials.token}` : "");
      return super.doSearchRequest(e, { limit: t, random: r, page: s, uri: o }).then((o2) => super.parseSearchResult(o2, { fakeLimit: 0, tags: e, limit: t, random: r, page: s })).catch((e2) => Promise.reject(new Constants_1.BooruError(e2)));
    }
  }
  Derpibooru$1.default = Derpibooru;
  var XmlBooru$1 = {};
  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(XmlBooru$1, "__esModule", { value: true });
  const Booru_1 = __importDefault(Booru);
  class XmlBooru extends Booru_1.default {
    constructor(e, t) {
      super(e, t);
    }
  }
  XmlBooru$1.default = XmlBooru;
  var Site$1 = {};
  Object.defineProperty(Site$1, "__esModule", { value: true });
  class Site {
    constructor(a) {
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
      var _a2, _b2, _c2, _d, _e2, _f, _g, _h, _i;
      this.domain = a.domain, this.type = (_a2 = a.type) != null ? _a2 : "json", this.aliases = (_b2 = a.aliases) != null ? _b2 : [], this.nsfw = a.nsfw, this.api = (_c2 = a.api) != null ? _c2 : {}, this.paginate = (_d = a.paginate) != null ? _d : "page", this.random = (_e2 = a.random) != null ? _e2 : false, this.tagQuery = (_f = a.tagQuery) != null ? _f : "tags", this.tagJoin = (_g = a.tagJoin) != null ? _g : "+", this.insecure = (_h = a.insecure) != null ? _h : false, this.defaultTags = (_i = a.defaultTags) != null ? _i : [];
    }
  }
  Site$1.default = Site;
  (function(exports) {
    var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(r) {
      return r && r.__esModule ? r : { default: r };
    };
    Object.defineProperty(exports, "__esModule", { value: true }), exports.BooruError = exports.resolveSite = exports.sites = exports.BooruClass = exports.search = exports.forSite = void 0;
    const Constants_12 = Constants, Booru_12 = __importDefault2(Booru), Derpibooru_1 = __importDefault2(Derpibooru$1), XmlBooru_1 = __importDefault2(XmlBooru$1), Site_1 = __importDefault2(Site$1), Utils_1 = Utils$1, BooruTypes = { derpi: Derpibooru_1.default, xml: XmlBooru_1.default }, booruCache = {};
    function booruFrom(r, e) {
      return new (r.type !== void 0 && BooruTypes[r.type] ? BooruTypes[r.type] : Booru_12.default)(r, e);
    }
    function booruForSite(r, e = null) {
      const o = (0, Utils_1.resolveSite)(r);
      if (!o)
        throw new Constants_12.BooruError("Site not supported");
      return booruFrom(new Site_1.default(Constants_12.sites[o]), e);
    }
    function search(r, e = [], { limit: o = 1, random: t = false, page: s = 1, credentials: u } = {}) {
      const n = (0, Utils_1.resolveSite)(r);
      if (typeof o == "string" && (o = parseInt(o, 10)), n === null)
        throw new Constants_12.BooruError("Site not supported");
      if (!Array.isArray(e) && typeof e != "string")
        throw new Constants_12.BooruError("`tags` should be an array or string");
      if (typeof o != "number" || Number.isNaN(o))
        throw new Constants_12.BooruError("`limit` should be an int");
      const i = new Site_1.default(Constants_12.sites[n]);
      return booruCache[n] || (booruCache[n] = booruFrom(i)), booruCache[n].search(e, { limit: o, random: t, page: s, credentials: u });
    }
    exports.forSite = booruForSite, exports.default = booruForSite, exports.search = search;
    var Booru_2 = Booru;
    Object.defineProperty(exports, "BooruClass", { enumerable: true, get: function() {
      return Booru_2.Booru;
    } });
    var Constants_2 = Constants;
    Object.defineProperty(exports, "sites", { enumerable: true, get: function() {
      return Constants_2.sites;
    } });
    var Utils_2 = Utils$1;
    Object.defineProperty(exports, "resolveSite", { enumerable: true, get: function() {
      return Utils_2.resolveSite;
    } });
    var Constants_3 = Constants;
    Object.defineProperty(exports, "BooruError", { enumerable: true, get: function() {
      return Constants_3.BooruError;
    } });
  })(dist);
  const blackList = /* @__PURE__ */ new Set(["e621.net", "e926.net", "hypnohub.net", "derpibooru.org"]);
  const siteDomains = Object.keys(dist.sites).filter((e) => !blackList.has(e));
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
  const isPidSite = ((_c = dist.sites[location.host]) == null ? void 0 : _c.paginate) === "pid";
  async function searchBooru(page2, tags2) {
    if (!tags2 || tags2 === "all")
      tags2 = "";
    if (location.href.includes("konachan.net"))
      tags2 += " rating:safe";
    return dist.search(location.host, tags2, { page: page2, limit: BOORU_PAGE_LIMIT });
  }
  function getYandereUserId() {
    const match = document.cookie.match(/user_id=(\d+)/);
    return match == null ? void 0 : match[1];
  }
  function getKonachanUsername() {
    const match = document.cookie.match(/login=(\w+)/);
    return match == null ? void 0 : match[1];
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
      const username = localStorage.getItem("__username");
      _moebooruUserName = username;
      if (username)
        return username;
      const id = getYandereUserId();
      if (!id)
        return "";
      const response = await fetch(`/user.json?id=${id}`);
      const result = await response.json();
      const { name } = result[0];
      localStorage.setItem("__username", name);
      return name;
    } catch (error) {
      console.log("getUsername error:", error);
      return "";
    }
  }
  const tagInfoMap = {
    circle: ["\u793E\u56E2", "#00bbbbcc"],
    artist: ["\u753B\u5E08", "#FFB11Bf1"],
    copyright: ["\u7248\u6743", "#C1328Ede"],
    character: ["\u89D2\u8272", "#00aa00cc"],
    general: ["", "#E87A90cc"],
    faults: ["", "#AB3B3Ada"]
  };
  async function getPostDetail(id) {
    try {
      if (!id)
        return false;
      const response = await fetch(`/post.json?api_version=2&tags=id:${id}&include_tags=1&include_votes=1`);
      const result = await response.json();
      return {
        voted: result.votes[id] == 3,
        tags: Object.entries(result.tags).map(([tag, type]) => {
          var _a2, _b2, _c2;
          const tagCN = (_a2 = window.__tagsCN) == null ? void 0 : _a2[tag];
          const typeText = (_b2 = tagInfoMap[type]) == null ? void 0 : _b2[0];
          const tagText = [
            typeText && `[ ${typeText} ] `,
            tag,
            tagCN && ` [ ${tagCN} ]`
          ].filter(Boolean).join("");
          return {
            tag,
            type,
            tagText,
            color: ((_c2 = tagInfoMap[type]) == null ? void 0 : _c2[1]) || tagInfoMap.general[1]
          };
        })
      };
    } catch (error) {
      console.log("getPostDetail error:", error);
      return false;
    }
  }
  async function addPostToFavorites(id) {
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
      showMsg({ msg: `\u6536\u85CF\u5931\u8D25: ${response.status}`, type: "error" });
      return false;
    }
    const result = await response.json();
    if (result.success) {
      showMsg({ msg: "\u6536\u85CF\u6210\u529F" });
      return true;
    } else {
      showMsg({ msg: `\u6536\u85CF\u5931\u8D25: ${result.reason}`, type: "error" });
      return false;
    }
  }
  function isPopularPage() {
    return /(yande.re|konachan).*\/post\/popular_/.test(location.href);
  }
  function isPoolShowPage() {
    return /(yande.re|konachan).*\/pool\/show/.test(location.href);
  }
  async function fetchPostsByPath(postsKey, page2) {
    const url = new URL(location.href);
    url.pathname += ".json";
    page2 && url.searchParams.set("page", page2.toString());
    const response = await fetch(url);
    const result = await response.json();
    const site = dist.forSite(location.host);
    const results = postsKey ? result[postsKey] : result;
    const posts = results.map((e) => new _default$1(e, site));
    return new _default(posts, [], {}, site);
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
  async function fetchPools(page2, query) {
    const url = new URL("/pool.json", location.origin);
    url.searchParams.set("page", page2.toString() || "1");
    query && url.searchParams.set("query", query);
    const jsonResp = await fetch(url);
    const results = await jsonResp.json();
    url.pathname = url.pathname.replace(".json", ".atom");
    const xmlResp = await fetch(url);
    const doc = new DOMParser().parseFromString(await xmlResp.text(), "text/xml");
    const thumbMap = [...doc.querySelectorAll("entry")].reduce((acc, cur) => {
      var _a2, _b2, _c2, _d;
      const id = (_c2 = (_b2 = (_a2 = cur.querySelector("id")) == null ? void 0 : _a2.textContent) == null ? void 0 : _b2.match(/Pool\/(\d+)/)) == null ? void 0 : _c2[1];
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
  function getFirstPageNo(params2) {
    if (isPidSite) {
      const page2 = Number(params2.get("pid")) || 0;
      return Math.trunc(page2 / BOORU_PAGE_LIMIT) + 1;
    }
    return Number(params2.get("page")) || 1;
  }
  function pushPageState(pageNo) {
    let pageParamName = "page";
    if (isPidSite) {
      pageParamName = "pid";
      pageNo = (pageNo - 1) * BOORU_PAGE_LIMIT;
    }
    const url = new URL(location.href);
    url.searchParams.set(pageParamName, pageNo.toString());
    history.replaceState("", "", url);
  }
  function dealBlacklist(results) {
    return store.blacklist.length ? results.blacklist(store.blacklist) : results;
  }
  const params = new URLSearchParams(location.search);
  let page = getFirstPageNo(params);
  let tags = params.get("tags");
  const fetchActions = [
    {
      test: isPopularPage,
      action: async () => {
        const results = await fetchPostsByPath();
        store.requestStop = true;
        return dealBlacklist(results);
      }
    },
    {
      test: isPoolShowPage,
      action: async () => {
        const results = await fetchPostsByPath("posts", page);
        return tags ? results.tagged(tags) : results;
      }
    },
    {
      test: () => true,
      action: async () => {
        const results = await searchBooru(page, tags);
        return dealBlacklist(results);
      }
    }
  ];
  const searchPosts = async () => {
    var _a2;
    store.requestState = true;
    try {
      const posts = await ((_a2 = fetchActions.find((e) => e.test())) == null ? void 0 : _a2.action());
      if (Array.isArray(posts) && posts.length > 0) {
        store.currentPage = page;
        store.imageList = [...store.imageList, ...posts];
        pushPageState(page);
        page++;
      } else {
        store.requestStop = true;
      }
    } catch (error) {
      console.log(`fetch error: ${error}`);
    } finally {
      store.requestState = false;
    }
  };
  const initPosts = async () => {
    await searchPosts();
    if (store.requestStop)
      return;
    if (location.href.includes("safebooru"))
      return;
    await searchPosts();
  };
  const refreshPosts = () => {
    page = 1;
    store.imageList = [];
    store.selectedImageList = [];
    store.requestStop = false;
    initPosts();
  };
  const loadPostsByPage = (toPage) => {
    page = Number(toPage) || 1;
    store.imageList = [];
    searchPosts();
  };
  const loadPostsByTags = (searchTerm) => {
    page = 1;
    tags = searchTerm;
    store.imageList = [];
    searchPosts();
  };
  const __sfc_main$7 = {};
  __sfc_main$7.setup = (__props, __ctx) => {
    const title = VueCompositionAPI2.computed(() => {
      return `${location.host.toUpperCase()} - ${store.imageList.length} Posts - Page `;
    });
    const cols = VueCompositionAPI2.ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20].reduce((acc, cur) => {
      acc[cur] = cur === 0 ? "\u81EA\u52A8" : `${cur} \u5217`;
      return acc;
    }, {}));
    const selColumn = (val) => {
      store.selectedColumn = val;
      localStorage.setItem("__masonry_col", val);
    };
    const isNoSelected = VueCompositionAPI2.computed(() => store.selectedImageList.length === 0);
    const isOneOrMoreSelected = VueCompositionAPI2.computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length < store.imageList.length);
    const isAllSelected = VueCompositionAPI2.computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length === store.imageList.length);
    const loadingValue = VueCompositionAPI2.ref(0);
    const selectAll = () => {
      if (isNoSelected.value || isOneOrMoreSelected.value) {
        setTimeout(() => {
          store.selectedImageList = [...store.imageList];
        });
      }
      if (isAllSelected.value) {
        setTimeout(() => {
          store.selectedImageList = [];
        });
      }
    };
    const removeFromList = (id) => {
      store.selectedImageList = store.selectedImageList.filter((e) => {
        if (e.loading)
          return true;
        return e.id !== id;
      });
    };
    const tagsQuery = new URLSearchParams(location.search).get("tags");
    const searchState = VueCompositionAPI2.reactive({
      showInput: !!(tagsQuery == null ? void 0 : tagsQuery.includes("pool:")),
      showMenu: false,
      searchTerm: tagsQuery || "",
      searchItems: store.isYKSite ? getRecentTags() : []
    });
    const onSearchTermInput = debounce(() => {
      if (!store.isYKSite)
        return;
      const val = searchState.searchTerm;
      const lastTag = val == null ? void 0 : val.split(/\s+/).slice(-1)[0];
      if (!lastTag) {
        searchState.showMenu = false;
        searchState.searchItems = [];
        return;
      }
      searchState.showMenu = true;
      searchState.searchItems = searchTagsByName(lastTag);
    }, 500);
    const selectTag = (tag) => {
      const termArr = searchState.searchTerm.split(/\s+/);
      searchState.searchTerm = termArr.slice(0, -1).concat(tag).join(" ");
      searchState.showMenu = false;
      searchState.searchItems = [];
    };
    const userName = VueCompositionAPI2.ref("");
    VueCompositionAPI2.onMounted(async () => {
      if (store.isYKSite) {
        const name = await getUsername();
        if (name)
          userName.value = name;
      }
    });
    const fetchTaggedPosts = (tags2) => {
      const url = new URL(location.href);
      url.searchParams.set("tags", tags2);
      history.pushState("", "", url);
      searchState.searchTerm = tags2;
      loadPostsByTags(tags2);
    };
    const showTagsInput = () => {
      if (searchState.showInput) {
        fetchTaggedPosts(searchState.searchTerm);
      } else {
        searchState.showInput = true;
      }
    };
    const onSearchTermKeydown = (ev) => {
      if (ev.key != "Enter")
        return;
      if (store.isYKSite && searchState.searchItems.length) {
        const item = document.querySelector(".ac_tags_list .v-list-item--highlighted");
        item && selectTag(item.innerText);
      } else {
        fetchTaggedPosts(searchState.searchTerm);
      }
    };
    const showPopAction = VueCompositionAPI2.ref(isPopularPage());
    const periodMap = {
      "1d": ["\u6309\u65E5", mdiCalendarToday, "day"],
      "1w": ["\u6309\u5468", mdiCalendarWeek, "week"],
      "1m": ["\u6309\u6708", mdiCalendarMonth, "month"],
      "1y": ["\u6309\u5E74", mdiCalendarText, "year"]
    };
    const periodByDateMap = (() => {
      const map = __spreadValues({}, periodMap);
      delete map["1y"];
      return map;
    })();
    const getRecentPeriod = () => {
      var _a2;
      const params2 = new URLSearchParams(location.search);
      let period = params2.get("period");
      if (location.pathname.includes("popular_by")) {
        period = (_a2 = location.pathname.match(/\/post\/popular_by_(.*)/)) == null ? void 0 : _a2[1];
        period = Object.keys(periodByDateMap).find((e) => periodByDateMap[e][2] == period);
      }
      return period || "1d";
    };
    const isPopularRecent = () => location.pathname.includes("popular_recent");
    const getPopTitle = () => {
      var _a2;
      if (isPopularRecent()) {
        return `Popular Recent ${getRecentPeriod()}`;
      }
      return (_a2 = location.pathname.split("/").pop()) == null ? void 0 : _a2.replace(/_/g, " ").toUpperCase();
    };
    const popTitle = VueCompositionAPI2.ref(getPopTitle());
    const isPopSearchByDate = VueCompositionAPI2.ref(!isPopularRecent());
    const recentPeriod = VueCompositionAPI2.ref(getRecentPeriod());
    const periodComputedMap = VueCompositionAPI2.computed(() => {
      return isPopSearchByDate.value ? periodByDateMap : periodMap;
    });
    const showPopDatePicker = VueCompositionAPI2.ref(false);
    const popSearchDate = VueCompositionAPI2.ref((() => {
      const params2 = new URLSearchParams(location.search);
      const y = params2.get("year");
      const m = params2.get("month");
      const d = params2.get("day");
      if (y && m && d)
        return formatDate(new Date(`${y}-${m}-${d}`));
      return subDate(1, "days");
    })());
    const fetchPopularPosts = (type) => {
      let url = `/post/popular_recent?period=${type}`;
      if (isPopSearchByDate.value) {
        const [year, month, day] = popSearchDate.value.split("-");
        url = `/post/popular_by_${periodMap[type][2]}?day=${day}&month=${month}&year=${year}`;
      }
      history.pushState("", "", url);
      popTitle.value = getPopTitle();
      refreshPosts();
    };
    const selPeriod = (key) => {
      recentPeriod.value = key;
      fetchPopularPosts(key);
    };
    VueCompositionAPI2.watch(popSearchDate, (val) => {
      if (!val)
        return;
      fetchPopularPosts(recentPeriod.value);
    });
    VueCompositionAPI2.watch(isPopSearchByDate, (val) => {
      recentPeriod.value = "1d";
      if (val)
        popSearchDate.value = subDate(1, "days");
      fetchPopularPosts("1d");
    });
    const loadPrevPeriod = () => {
      const duration = periodMap[recentPeriod.value][2];
      popSearchDate.value = subDate(1, `${duration}s`, new Date(popSearchDate.value));
    };
    const loadNextPeriod = () => {
      const duration = periodMap[recentPeriod.value][2];
      popSearchDate.value = addDate(1, `${duration}s`, new Date(popSearchDate.value));
    };
    const goToPopularPage = () => {
      location.href = "/post/popular_recent?period=1d&_wf=1";
    };
    const showPool = () => {
      store.showPostList = false;
      store.showPoolList = true;
      history.pushState("", "", "/pool");
    };
    const poolQueryTerm = VueCompositionAPI2.ref("");
    const searchPool = () => {
      eventBus.$emit("loadPoolsByQuery", poolQueryTerm.value);
    };
    const download = (url, name) => {
      loadingValue.value = 0;
      return downloadFile(url, name, {
        saveAs: false,
        onprogress: (d) => {
          loadingValue.value = d.loaded / d.total * 100;
        }
      });
    };
    const startDownload = async () => {
      try {
        const len = store.selectedImageList.length;
        for (let index = 0; index < len; index++) {
          const item = store.selectedImageList[index];
          const {
            fileUrl,
            fileDownloadName,
            loaded
          } = item;
          if (!fileUrl)
            continue;
          if (loaded)
            continue;
          VueCompositionAPI2.set(item, "loading", true);
          await download(fileUrl, `${fileDownloadName}.${fileUrl.split(".").pop()}`);
          VueCompositionAPI2.set(item, "loading", false);
          VueCompositionAPI2.set(item, "loaded", true);
        }
      } catch (error) {
        const msg = error;
        showMsg({
          msg,
          type: "error"
        });
      }
    };
    const exportFileUrls = async () => {
      const urlText = store.selectedImageList.map((e) => e.fileUrl).join("\n");
      await downloadFile(`data:text/plain;charset=utf-8,${encodeURIComponent(urlText)}`, "image-urls.txt");
    };
    const vuetify = useVuetify();
    const toggleDarkmode = () => {
      vuetify.theme.dark = !vuetify.theme.dark;
      localStorage.setItem("__darkmode", vuetify.theme.dark ? "dark" : "light");
    };
    const keyActions = {
      Enter: (cur) => loadPostsByPage(cur.toString()),
      ArrowUp: (cur) => cur > 1 && keyActions.Enter(--cur),
      ArrowDown: (cur) => keyActions.Enter(++cur),
      ArrowLeft: (cur) => keyActions.ArrowUp(cur),
      ArrowRight: (cur) => keyActions.ArrowDown(cur)
    };
    const goToPage = (ev) => {
      const action = keyActions[ev.key];
      if (!action)
        return;
      const input = ev.target;
      action((input == null ? void 0 : input.value) || 0);
    };
    const exitMasonry = () => {
      const url = new URL(location.href);
      url.searchParams.delete("_wf");
      location.assign(url);
    };
    return {
      mdiBrightness6,
      mdiCalendar,
      mdiCalendarSearch,
      mdiCheckUnderlineCircle,
      mdiCheckboxBlankOutline,
      mdiCheckboxIntermediate,
      mdiCheckboxMarked,
      mdiChevronLeft,
      mdiChevronRight,
      mdiDelete,
      mdiDownload,
      mdiFileClockOutline,
      mdiFire,
      mdiHome,
      mdiImageMultiple,
      mdiLocationExit,
      mdiMagnify,
      mdiShuffle,
      mdiStar,
      mdiViewDashboardVariant,
      store,
      title,
      cols,
      selColumn,
      isNoSelected,
      isOneOrMoreSelected,
      isAllSelected,
      loadingValue,
      selectAll,
      removeFromList,
      searchState,
      onSearchTermInput,
      selectTag,
      userName,
      fetchTaggedPosts,
      showTagsInput,
      onSearchTermKeydown,
      showPopAction,
      popTitle,
      isPopSearchByDate,
      recentPeriod,
      periodComputedMap,
      showPopDatePicker,
      popSearchDate,
      selPeriod,
      loadPrevPeriod,
      loadNextPeriod,
      goToPopularPage,
      showPool,
      poolQueryTerm,
      searchPool,
      startDownload,
      exportFileUrls,
      toggleDarkmode,
      goToPage,
      exitMasonry
    };
  };
  var render$7 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c2 = _vm._self._c || _h;
    return _c2("v-app-bar", {
      attrs: {
        "app": "",
        "dense": ""
      }
    }, [_c2("v-app-bar-nav-icon", {
      on: {
        "click": _vm.store.toggleDrawer
      }
    }), _vm.store.isYKSite && _vm.showPopAction ? _c2("div", {
      staticClass: "align-center hidden-sm-and-down",
      staticStyle: {
        "display": "flex"
      }
    }, [_c2("v-toolbar-title", {
      staticClass: "mr-4",
      domProps: {
        "textContent": _vm._s(_vm.popTitle)
      }
    }), _c2("v-switch", {
      attrs: {
        "hide-details": "",
        "label": _vm.isPopSearchByDate ? "\u6309\u65E5\u671F" : "\u6700\u8FD1\u4EBA\u6C14"
      },
      model: {
        value: _vm.isPopSearchByDate,
        callback: function($$v) {
          _vm.isPopSearchByDate = $$v;
        },
        expression: "isPopSearchByDate"
      }
    }), _c2("v-menu", {
      attrs: {
        "transition": "slide-y-transition",
        "offset-y": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref) {
          var on = _ref.on, attrs = _ref.attrs;
          return [_c2("v-btn", _vm._g(_vm._b({
            staticClass: "ml-4",
            attrs: {
              "small": ""
            }
          }, "v-btn", attrs, false), on), [_c2("v-icon", {
            attrs: {
              "left": ""
            }
          }, [_vm._v(_vm._s(_vm.mdiCalendarSearch))]), _c2("span", {
            staticStyle: {
              "margin-bottom": "2px"
            }
          }, [_vm._v(_vm._s(_vm.periodComputedMap[_vm.recentPeriod][0]))])], 1)];
        }
      }], null, false, 638520899)
    }, [_c2("v-list", {
      attrs: {
        "dense": ""
      }
    }, _vm._l(_vm.periodComputedMap, function(val, key) {
      return _c2("v-list-item", {
        key,
        attrs: {
          "dense": ""
        },
        on: {
          "click": function($event) {
            return _vm.selPeriod(key);
          }
        }
      }, [_c2("v-list-item-title", [_c2("v-icon", {
        attrs: {
          "left": ""
        }
      }, [_vm._v(_vm._s(val[1]))]), _c2("span", [_vm._v(_vm._s(val[0].slice(-1)))])], 1)], 1);
    }), 1)], 1), _c2("v-menu", {
      attrs: {
        "close-on-content-click": false,
        "transition": "scale-transition",
        "offset-y": "",
        "min-width": "auto"
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref2) {
          var on = _ref2.on, attrs = _ref2.attrs;
          return [_c2("div", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.isPopSearchByDate,
              expression: "isPopSearchByDate"
            }],
            staticClass: "ml-1 align-center",
            staticStyle: {
              "display": "flex",
              "width": "211px"
            }
          }, [_c2("v-btn", {
            attrs: {
              "icon": ""
            },
            on: {
              "click": function($event) {
                return _vm.loadPrevPeriod();
              }
            }
          }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiChevronLeft))])], 1), _c2("v-text-field", _vm._g(_vm._b({
            attrs: {
              "prepend-icon": _vm.mdiCalendar,
              "readonly": "",
              "hide-details": ""
            },
            model: {
              value: _vm.popSearchDate,
              callback: function($$v) {
                _vm.popSearchDate = $$v;
              },
              expression: "popSearchDate"
            }
          }, "v-text-field", attrs, false), on)), _c2("v-btn", {
            attrs: {
              "icon": ""
            },
            on: {
              "click": function($event) {
                return _vm.loadNextPeriod();
              }
            }
          }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiChevronRight))])], 1)], 1)];
        }
      }], null, false, 4183596848),
      model: {
        value: _vm.showPopDatePicker,
        callback: function($$v) {
          _vm.showPopDatePicker = $$v;
        },
        expression: "showPopDatePicker"
      }
    }, [_c2("v-date-picker", {
      attrs: {
        "no-title": "",
        "locale": "zh-cn",
        "weekday-format": function() {
          return "";
        }
      },
      on: {
        "input": function($event) {
          _vm.showPopDatePicker = false;
        }
      },
      model: {
        value: _vm.popSearchDate,
        callback: function($$v) {
          _vm.popSearchDate = $$v;
        },
        expression: "popSearchDate"
      }
    })], 1), _c2("v-btn", {
      staticClass: "ml-3",
      attrs: {
        "icon": "",
        "href": "/post?_wf=1"
      }
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiHome))])], 1)], 1) : _vm.store.showPostList ? _c2("div", {
      staticClass: "align-center hidden-sm-and-down",
      staticStyle: {
        "display": "flex"
      }
    }, [_c2("v-toolbar-title", {
      staticClass: "hidden-md-and-down",
      domProps: {
        "textContent": _vm._s(_vm.title)
      }
    }), _c2("input", {
      staticClass: "ml-1 mr-2 text-center rounded",
      style: {
        width: "40px",
        height: "30px",
        border: "1px solid #bbb",
        color: "inherit"
      },
      domProps: {
        "value": _vm.store.currentPage
      },
      on: {
        "keyup": function($event) {
          return _vm.goToPage($event);
        }
      }
    }), _vm.store.isYKSite ? [_vm.userName ? _c2("v-btn", {
      attrs: {
        "title": "\u6536\u85CF\u5939",
        "icon": ""
      },
      on: {
        "click": function($event) {
          return _vm.fetchTaggedPosts(`vote:3:${_vm.userName} order:vote`);
        }
      }
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiStar))])], 1) : _vm._e(), _c2("v-btn", {
      attrs: {
        "title": "\u56FE\u96C6 (Pool)",
        "icon": ""
      },
      on: {
        "click": function($event) {
          return _vm.showPool();
        }
      }
    }, [_c2("v-icon", {
      attrs: {
        "size": 20
      }
    }, [_vm._v(_vm._s(_vm.mdiImageMultiple))])], 1), _c2("v-btn", {
      attrs: {
        "title": "\u4EBA\u6C14",
        "icon": ""
      },
      on: {
        "click": function($event) {
          return _vm.goToPopularPage();
        }
      }
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiFire))])], 1), _c2("v-btn", {
      attrs: {
        "title": "\u968F\u673A",
        "icon": ""
      },
      on: {
        "click": function($event) {
          return _vm.fetchTaggedPosts("order:random");
        }
      }
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiShuffle))])], 1)] : _vm._e(), _c2("v-menu", {
      attrs: {
        "max-width": 200,
        "max-height": "80vh",
        "transition": "slide-y-transition",
        "nudge-bottom": "5px",
        "offset-y": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref3) {
          var on = _ref3.on;
          return [_c2("v-slide-x-transition", [_c2("div", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.searchState.showInput,
              expression: "searchState.showInput"
            }],
            staticClass: "ml-4",
            staticStyle: {
              "width": "200px"
            }
          }, [_c2("v-text-field", _vm._g({
            attrs: {
              "hide-details": ""
            },
            on: {
              "input": _vm.onSearchTermInput,
              "click": function($event) {
                _vm.searchState.showMenu = true;
              },
              "blur": function($event) {
                _vm.searchState.showMenu = false;
              },
              "keydown": _vm.onSearchTermKeydown
            },
            model: {
              value: _vm.searchState.searchTerm,
              callback: function($$v) {
                _vm.$set(_vm.searchState, "searchTerm", $$v);
              },
              expression: "searchState.searchTerm"
            }
          }, on))], 1)])];
        }
      }]),
      model: {
        value: _vm.searchState.showMenu,
        callback: function($$v) {
          _vm.$set(_vm.searchState, "showMenu", $$v);
        },
        expression: "searchState.showMenu"
      }
    }, [_c2("v-list", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.store.isYKSite && _vm.searchState.searchItems.length,
        expression: "store.isYKSite && searchState.searchItems.length"
      }],
      staticClass: "ac_tags_list",
      attrs: {
        "dense": ""
      }
    }, _vm._l(_vm.searchState.searchItems, function(item) {
      return _c2("v-list-item", {
        key: item,
        attrs: {
          "dense": ""
        },
        on: {
          "click": function($event) {
            return _vm.selectTag(item);
          }
        }
      }, [_c2("v-list-item-title", {
        domProps: {
          "textContent": _vm._s(item)
        }
      })], 1);
    }), 1)], 1), _c2("v-btn", {
      attrs: {
        "title": "\u641C\u7D22\u6807\u7B7E",
        "icon": ""
      },
      on: {
        "click": function($event) {
          return _vm.showTagsInput();
        }
      }
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiMagnify))])], 1)], 2) : _vm.store.showPoolList ? _c2("div", {
      staticClass: "align-center",
      staticStyle: {
        "display": "flex"
      }
    }, [_vm.store.showPoolList ? _c2("v-toolbar-title", {
      staticClass: "mr-3"
    }, [_vm._v("Pools")]) : _vm._e(), _c2("v-text-field", {
      attrs: {
        "hide-details": "",
        "append-icon": _vm.mdiMagnify
      },
      on: {
        "keyup": function($event) {
          if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter"))
            return null;
          return _vm.searchPool.apply(null, arguments);
        }
      },
      model: {
        value: _vm.poolQueryTerm,
        callback: function($$v) {
          _vm.poolQueryTerm = $$v;
        },
        expression: "poolQueryTerm"
      }
    }), _c2("v-btn", {
      staticClass: "ml-3",
      attrs: {
        "icon": "",
        "href": "/post?_wf=1"
      }
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiHome))])], 1), _c2("v-btn", {
      attrs: {
        "title": "\u4EBA\u6C14",
        "icon": ""
      },
      on: {
        "click": function($event) {
          return _vm.goToPopularPage();
        }
      }
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiFire))])], 1)], 1) : _vm._e(), _c2("v-spacer"), _vm.store.showPostList ? [_c2("v-menu", {
      attrs: {
        "transition": "slide-y-transition",
        "offset-y": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref4) {
          var on = _ref4.on, attrs = _ref4.attrs;
          return [_c2("v-btn", _vm._g(_vm._b({
            staticClass: "mr-6",
            attrs: {
              "small": ""
            }
          }, "v-btn", attrs, false), on), [_c2("v-icon", {
            attrs: {
              "left": ""
            }
          }, [_vm._v(_vm._s(_vm.mdiViewDashboardVariant))]), _c2("span", {
            staticStyle: {
              "margin-bottom": "2px"
            }
          }, [_vm._v(_vm._s(_vm.store.selectedColumn === "0" ? "\u81EA\u52A8" : `${_vm.store.selectedColumn}\u5217`))])], 1)];
        }
      }], null, false, 4102914836)
    }, [_c2("v-list", {
      attrs: {
        "dense": ""
      }
    }, _vm._l(_vm.cols, function(val, key) {
      return _c2("v-list-item", {
        key,
        attrs: {
          "dense": ""
        },
        on: {
          "click": function($event) {
            return _vm.selColumn(key);
          }
        }
      }, [_c2("v-list-item-title", {
        domProps: {
          "textContent": _vm._s(val)
        }
      })], 1);
    }), 1)], 1), _c2("span", {
      staticClass: "hidden-md-and-down"
    }, [_vm._v("\u5DF2\u9009\u62E9")]), _c2("span", {
      staticClass: "ml-1 mr-1",
      domProps: {
        "textContent": _vm._s(_vm.store.selectedImageList.length)
      }
    }), _c2("v-btn", {
      attrs: {
        "icon": ""
      },
      on: {
        "click": _vm.selectAll
      }
    }, [_c2("v-icon", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.isNoSelected,
        expression: "isNoSelected"
      }]
    }, [_vm._v(_vm._s(_vm.mdiCheckboxBlankOutline))]), _c2("v-icon", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.isOneOrMoreSelected,
        expression: "isOneOrMoreSelected"
      }]
    }, [_vm._v(_vm._s(_vm.mdiCheckboxIntermediate))]), _c2("v-icon", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.isAllSelected,
        expression: "isAllSelected"
      }]
    }, [_vm._v(_vm._s(_vm.mdiCheckboxMarked))])], 1), _c2("v-menu", {
      attrs: {
        "dense": "",
        "offset-y": "",
        "close-on-content-click": false
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref5) {
          var on = _ref5.on, attrs = _ref5.attrs;
          return [_c2("v-btn", _vm._g(_vm._b({
            attrs: {
              "title": "\u4E0B\u8F7D\u5217\u8868",
              "icon": ""
            }
          }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiDownload))])], 1)];
        }
      }], null, false, 2310245454)
    }, [_c2("v-list", {
      staticStyle: {
        "min-width": "300px",
        "max-height": "80vh",
        "overflow": "auto"
      },
      attrs: {
        "dense": "",
        "flat": ""
      }
    }, [_c2("v-subheader", {
      staticClass: "ml-2"
    }, [_c2("span", {
      staticClass: "mr-4"
    }, [_vm._v("\u4E0B\u8F7D\u5217\u8868")]), _c2("v-btn", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.store.selectedImageList.length > 0,
        expression: "store.selectedImageList.length > 0"
      }],
      attrs: {
        "small": ""
      },
      on: {
        "click": _vm.startDownload
      }
    }, [_vm._v(" \u5F00\u59CB\u4E0B\u8F7D ")]), _c2("v-btn", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.store.selectedImageList.length > 0,
        expression: "store.selectedImageList.length > 0"
      }],
      staticClass: "ml-2",
      attrs: {
        "small": ""
      },
      on: {
        "click": _vm.exportFileUrls
      }
    }, [_vm._v(" \u8F93\u51FA\u4E0B\u8F7D\u5730\u5740 ")])], 1), _c2("v-list-item-group", {
      attrs: {
        "color": "primary"
      }
    }, _vm._l(_vm.store.selectedImageList, function(item) {
      return _c2("v-list-item", {
        key: item.id,
        attrs: {
          "dense": "",
          "two-line": ""
        }
      }, [_c2("v-list-item-avatar", [!item.loading && !item.loaded ? _c2("v-btn", {
        attrs: {
          "icon": ""
        }
      }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiFileClockOutline))])], 1) : _vm._e(), item.loaded ? _c2("v-btn", {
        attrs: {
          "icon": "",
          "color": "green"
        }
      }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiCheckUnderlineCircle))])], 1) : _vm._e(), item.loading ? _c2("v-progress-circular", {
        attrs: {
          "rotate": -90,
          "size": 28,
          "value": _vm.loadingValue,
          "color": "pink"
        }
      }) : _vm._e()], 1), _c2("v-list-item-content", {
        staticStyle: {
          "max-width": "240px"
        }
      }, [_c2("v-list-item-title", {
        attrs: {
          "title": item.fileDownloadName
        },
        domProps: {
          "textContent": _vm._s(item.fileDownloadName)
        }
      }), _c2("v-list-item-subtitle", {
        attrs: {
          "title": item.fileUrl
        },
        domProps: {
          "textContent": _vm._s(item.fileUrl)
        }
      })], 1), _c2("v-list-item-action", [_c2("v-btn", {
        attrs: {
          "icon": ""
        },
        on: {
          "click": function($event) {
            return _vm.removeFromList(item.id);
          }
        }
      }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiDelete))])], 1)], 1)], 1);
    }), 1)], 1)], 1)] : _vm._e(), _c2("v-btn", {
      attrs: {
        "title": "\u5207\u6362\u6DF1\u8272\u6A21\u5F0F",
        "icon": ""
      },
      on: {
        "click": _vm.toggleDarkmode
      }
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiBrightness6))])], 1), _c2("v-btn", {
      attrs: {
        "title": "\u9000\u51FA\u7011\u5E03\u6D41\u6A21\u5F0F",
        "icon": ""
      },
      on: {
        "click": _vm.exitMasonry
      }
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiLocationExit))])], 1), _c2("v-progress-linear", {
      attrs: {
        "active": _vm.store.requestState,
        "height": 6,
        "color": "deep-purple accent-4",
        "indeterminate": "",
        "absolute": "",
        "bottom": ""
      }
    })], 2);
  };
  var staticRenderFns$7 = [];
  function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render2) {
      options.render = render2;
      options.staticRenderFns = staticRenderFns2;
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
        injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
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
  const __cssModules$8 = {};
  var __component__$8 = /* @__PURE__ */ normalizeComponent(__sfc_main$7, render$7, staticRenderFns$7, false, __vue2_injectStyles$8, null, null, null);
  function __vue2_injectStyles$8(context) {
    for (let o in __cssModules$8) {
      this[o] = __cssModules$8[o];
    }
  }
  var AppBar = /* @__PURE__ */ function() {
    return __component__$8.exports;
  }();
  const __sfc_main$6 = {};
  __sfc_main$6.setup = (__props, __ctx) => {
    const siteLinks = VueCompositionAPI2.ref(siteDomains);
    const userName = VueCompositionAPI2.ref("");
    const version = VueCompositionAPI2.ref(GM_info.script.version);
    const openLink = (link) => {
      window.open(link, "_blank", "noreferrer");
    };
    const dealLink = (link) => {
      if (link.includes("yande"))
        return "https://yande.re/post?_wf=1";
      if (link.includes("behoimi"))
        return "http://behoimi.org?_wf=1";
      return `https://${link}?_wf=1`;
    };
    const onComboboxChange = (val) => {
      localStorage.setItem("__blacklist", val.join(","));
    };
    const removeTagFromBlacklist = (item) => {
      store.blacklist.splice(store.blacklist.indexOf(item), 1);
      localStorage.setItem("__blacklist", store.blacklist.join(","));
    };
    VueCompositionAPI2.onMounted(async () => {
      if (store.isYKSite) {
        const name = await getUsername();
        if (name)
          userName.value = name;
      }
    });
    return {
      mdiAccount,
      mdiArrowRightCircleOutline,
      mdiFire,
      mdiGithub,
      mdiImageMultiple,
      mdiInformationOutline,
      mdiMessageAlertOutline,
      mdiShuffle,
      mdiStar,
      mdiWeb,
      store,
      siteLinks,
      userName,
      version,
      openLink,
      dealLink,
      onComboboxChange,
      removeTagFromBlacklist
    };
  };
  var render$6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c2 = _vm._self._c || _h;
    return _c2("v-navigation-drawer", {
      attrs: {
        "app": "",
        "temporary": ""
      },
      model: {
        value: _vm.store.showDrawer,
        callback: function($$v) {
          _vm.$set(_vm.store, "showDrawer", $$v);
        },
        expression: "store.showDrawer"
      }
    }, [_c2("v-list-item", [_c2("v-list-item-content", [_c2("v-list-item-title", {
      staticClass: "title"
    }, [_vm._v("Booru Masonry")]), _c2("v-list-item-subtitle", [_vm._v("Booru \u7AD9\u70B9\u7011\u5E03\u6D41\u5E03\u5C40\u6D4F\u89C8")])], 1)], 1), _c2("v-divider"), _vm.store.isYKSite ? _c2("v-list", {
      attrs: {
        "dense": "",
        "nav": ""
      }
    }, [_c2("v-list-item", [_c2("v-list-item-content", [_c2("v-list-item-title", {
      staticClass: "title"
    }, [_vm._v("\u5FEB\u6377\u65B9\u5F0F")])], 1)], 1), _vm.userName ? _c2("v-list-item", {
      attrs: {
        "link": "",
        "href": "/user/home"
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiAccount))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.userName))])], 1)], 1) : _vm._e(), _vm.userName ? _c2("v-list-item", {
      attrs: {
        "link": "",
        "href": `/post?tags=vote%3A3%3A${_vm.userName}+order%3Avote&_wf=1`
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiStar))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("\u6211\u7684\u6536\u85CF\u5939")])], 1)], 1) : _vm._e(), _c2("v-list-item", {
      attrs: {
        "link": "",
        "href": "/pool?page=1"
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiImageMultiple))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("\u56FE\u96C6 (Pool)")])], 1)], 1), _c2("v-list-item", {
      attrs: {
        "link": "",
        "href": "/post/popular_recent?period=1d"
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiFire))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("\u4EBA\u6C14\u4F5C\u54C1 (\u65E5)")])], 1)], 1), _c2("v-list-item", {
      attrs: {
        "link": "",
        "href": "/post/popular_recent?period=1w"
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiFire))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("\u4EBA\u6C14\u4F5C\u54C1 (\u5468)")])], 1)], 1), _c2("v-list-item", {
      attrs: {
        "link": "",
        "href": "/post/popular_recent?period=1m"
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiFire))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("\u4EBA\u6C14\u4F5C\u54C1 (\u6708)")])], 1)], 1), _c2("v-list-item", {
      attrs: {
        "link": "",
        "href": "/post/popular_recent?period=1y"
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiFire))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("\u4EBA\u6C14\u4F5C\u54C1 (\u5E74)")])], 1)], 1), _c2("v-list-item", {
      attrs: {
        "link": "",
        "href": "/post?tags=order%3Arandom&page=1"
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiShuffle))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("\u968F\u673A\u4F5C\u54C1")])], 1)], 1)], 1) : _vm._e(), _c2("v-list", {
      attrs: {
        "dense": "",
        "nav": ""
      }
    }, [_c2("v-list-item", [_c2("v-list-item-content", [_c2("v-list-item-title", {
      staticClass: "title"
    }, [_vm._v("\u7AD9\u70B9\u5217\u8868")])], 1)], 1), _vm._l(_vm.siteLinks, function(link) {
      return _c2("v-list-item", {
        key: link,
        attrs: {
          "href": _vm.dealLink(link)
        }
      }, [_c2("v-list-item-icon", {
        staticClass: "mr-2"
      }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiArrowRightCircleOutline))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(link.toUpperCase()))])], 1)], 1);
    }), _c2("v-divider"), _c2("v-list-item", {
      attrs: {
        "link": ""
      },
      on: {
        "click": function($event) {
          return _vm.openLink("https://www.nanoka.top/illust/pixiv/");
        }
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiArrowRightCircleOutline))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("Pixiv Ranking")])], 1)], 1), _c2("v-list-item", {
      attrs: {
        "link": ""
      },
      on: {
        "click": function($event) {
          return _vm.openLink("https://pixiv.kanata.ml");
        }
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiArrowRightCircleOutline))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("Pixiv Viewer")])], 1)], 1)], 2), _c2("v-list", {
      attrs: {
        "dense": "",
        "nav": ""
      }
    }, [_c2("v-list-item", {
      staticClass: "mb-0"
    }, [_c2("v-list-item-content", [_c2("v-list-item-title", {
      staticClass: "title"
    }, [_vm._v("\u6807\u7B7E\u9ED1\u540D\u5355")])], 1)], 1), _c2("v-list-item", {
      staticClass: "pa-0"
    }, [_c2("v-list-item-content", {
      staticClass: "pt-0"
    }, [_c2("v-combobox", {
      staticClass: "ma-0 pa-0",
      attrs: {
        "append-icon": null,
        "items": [],
        "hide-details": "",
        "hide-no-data": "",
        "multiple": "",
        "chips": ""
      },
      on: {
        "change": _vm.onComboboxChange
      },
      scopedSlots: _vm._u([{
        key: "selection",
        fn: function(_ref) {
          var item = _ref.item;
          return [_c2("v-chip", {
            attrs: {
              "label": "",
              "small": "",
              "outlined": "",
              "close": ""
            },
            on: {
              "click:close": function($event) {
                return _vm.removeTagFromBlacklist(item);
              }
            }
          }, [_c2("span", [_vm._v(_vm._s(item))])])];
        }
      }]),
      model: {
        value: _vm.store.blacklist,
        callback: function($$v) {
          _vm.$set(_vm.store, "blacklist", $$v);
        },
        expression: "store.blacklist"
      }
    })], 1)], 1)], 1), _c2("v-list", {
      attrs: {
        "dense": "",
        "nav": ""
      }
    }, [_c2("v-list-item", [_c2("v-list-item-content", [_c2("v-list-item-title", {
      staticClass: "title"
    }, [_vm._v("\u5173\u4E8E")])], 1)], 1), _c2("v-list-item", {
      attrs: {
        "link": ""
      },
      on: {
        "click": function($event) {
          return _vm.openLink("https://github.com/asadahimeka/yandere-masonry/blob/main/CHANGELOG.md");
        }
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiInformationOutline))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("v" + _vm._s(_vm.version))]), _c2("v-list-item-subtitle", [_vm._v("\u66F4\u65B0\u65E5\u5FD7")])], 1)], 1), _c2("v-list-item", {
      attrs: {
        "link": ""
      },
      on: {
        "click": function($event) {
          return _vm.openLink("https://booru.kanata.ml");
        }
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiWeb))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("v" + _vm._s(_vm.version))]), _c2("v-list-item-subtitle", [_vm._v("Web \u9884\u89C8\u7248\u672C")])], 1)], 1), _c2("v-list-item", {
      attrs: {
        "link": ""
      },
      on: {
        "click": function($event) {
          return _vm.openLink("https://github.com/asadahimeka/yandere-masonry/issues");
        }
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiMessageAlertOutline))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("\u53CD\u9988")]), _c2("v-list-item-subtitle", [_vm._v("\u95EE\u9898\u4E0E\u5EFA\u8BAE")])], 1)], 1), _c2("v-list-item", {
      attrs: {
        "link": ""
      },
      on: {
        "click": function($event) {
          return _vm.openLink("https://github.com/asadahimeka/yandere-masonry");
        }
      }
    }, [_c2("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiGithub))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("Github")]), _c2("v-list-item-subtitle", [_vm._v("\u6B22\u8FCE Star \u2606\u5F61")])], 1)], 1)], 1)], 1);
  };
  var staticRenderFns$6 = [];
  const __cssModules$7 = {};
  var __component__$7 = /* @__PURE__ */ normalizeComponent(__sfc_main$6, render$6, staticRenderFns$6, false, __vue2_injectStyles$7, null, null, null);
  function __vue2_injectStyles$7(context) {
    for (let o in __cssModules$7) {
      this[o] = __cssModules$7[o];
    }
  }
  var NavDrawer = /* @__PURE__ */ function() {
    return __component__$7.exports;
  }();
  const __vue2_script = {
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
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://lib.baomitu.com/dplayer/1.26.0/DPlayer.min.js";
          script.addEventListener("load", resolve, false);
          document.head.appendChild(script);
        });
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
        this.dp = new unsafeWindow.DPlayer(__spreadProps(__spreadValues({}, this.options), { container: this.$el }));
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
  let __vue2_render, __vue2_staticRenderFns;
  const __cssModules$6 = {};
  var __component__$6 = /* @__PURE__ */ normalizeComponent(__vue2_script, __vue2_render, __vue2_staticRenderFns, false, __vue2_injectStyles$6, null, null, null);
  function __vue2_injectStyles$6(context) {
    for (let o in __cssModules$6) {
      this[o] = __cssModules$6[o];
    }
  }
  var DPlayer = /* @__PURE__ */ function() {
    return __component__$6.exports;
  }();
  const __sfc_main$5 = {};
  __sfc_main$5.setup = (__props, __ctx) => {
    const showImageToolbar = VueCompositionAPI2.ref(true);
    const innerWidth = VueCompositionAPI2.ref(window.innerWidth);
    const innerHeight = VueCompositionAPI2.ref(window.innerHeight);
    const downloading = VueCompositionAPI2.ref(false);
    const scaleOn = VueCompositionAPI2.ref(false);
    const showTagChipGroup = VueCompositionAPI2.ref(localStorage.getItem("__showTags") == "1");
    const toggleTagsShow = () => {
      showTagChipGroup.value = !showTagChipGroup.value;
      localStorage.setItem("__showTags", showTagChipGroup.value ? "1" : "");
    };
    const imageSelected = VueCompositionAPI2.computed(() => {
      var _a2;
      return (_a2 = store.imageList[store.imageSelectedIndex]) != null ? _a2 : {};
    });
    const isVideo = VueCompositionAPI2.computed(() => [".mp4", ".webm"].some((e) => {
      var _a2;
      return (_a2 = imageSelected.value.fileUrl) == null ? void 0 : _a2.endsWith(e);
    }));
    const imgSrc = VueCompositionAPI2.computed(() => {
      var _a2, _b2;
      if (isVideo.value)
        return void 0;
      return (_b2 = (_a2 = imageSelected.value.sampleUrl) != null ? _a2 : imageSelected.value.fileUrl) != null ? _b2 : void 0;
    });
    const imgLasySrc = VueCompositionAPI2.computed(() => {
      var _a2;
      if (isVideo.value)
        return void 0;
      return (_a2 = imageSelected.value.previewUrl) != null ? _a2 : void 0;
    });
    const imageSelectedWidth = VueCompositionAPI2.computed(() => {
      const width = Number.parseInt(Math.min(innerWidth.value * 0.9, imageSelected.value.sampleWidth || innerWidth.value).toString());
      const height = Math.min(innerHeight.value * 0.9, imageSelected.value.sampleHeight || innerHeight.value);
      const width2 = Number.parseInt((height * imageSelected.value.aspectRatio).toString());
      return Math.min(width, width2);
    });
    const notYKSite = VueCompositionAPI2.computed(() => {
      return ["konachan", "yande"].every((e) => !location.host.includes(e));
    });
    const toggleToolbar = () => {
      showImageToolbar.value = !showImageToolbar.value;
    };
    const toTagsPage = (tag) => {
      if (notYKSite.value)
        return;
      window.open(`/post?tags=${tag}`, "_blank", "noreferrer");
    };
    const toDetailPage = () => {
      window.open(imageSelected.value.postView, "_blank", "noreferrer");
    };
    const toSourcePage = () => {
      const {
        sourceUrl
      } = imageSelected.value;
      if (!isURL(sourceUrl))
        return;
      window.open(sourceUrl, "_blank", "noreferrer");
    };
    const download = async (url, name) => {
      if (!url)
        return;
      try {
        downloading.value = true;
        await downloadFile(url, name);
      } catch (error) {
        showMsg({
          msg: `\u4E0B\u8F7D\u51FA\u9519: ${error}`,
          type: "error"
        });
      } finally {
        downloading.value = false;
      }
    };
    const addToList = () => {
      store.addToSelectedList(imageSelected.value);
    };
    const close = () => {
      store.showImageSelected = false;
    };
    const postDetail = VueCompositionAPI2.ref({});
    const addFavorite = async () => {
      if (notYKSite.value || postDetail.value.voted)
        return;
      const isSuccess = await addPostToFavorites(imageSelected.value.id);
      if (isSuccess)
        postDetail.value.voted = true;
    };
    const setPostDetail = async () => {
      if (store.isYKSite) {
        const result = await getPostDetail(imageSelected.value.id);
        if (result)
          postDetail.value = result;
      } else {
        postDetail.value = {
          voted: false,
          tags: imageSelected.value.tags.map((e) => ({
            tag: e,
            tagText: e,
            color: "#E87A90cc",
            type: "general"
          }))
        };
      }
    };
    const showPrevPost = async () => {
      if (store.imageSelectedIndex == 0)
        return;
      store.imageSelectedIndex--;
      await setPostDetail();
    };
    const showNextPost = async () => {
      if (store.imageSelectedIndex > store.imageList.length - 1)
        return;
      store.imageSelectedIndex++;
      await setPostDetail();
    };
    const onImageLoadError = () => {
      imageSelected.value.sampleUrl = null;
    };
    VueCompositionAPI2.watch(() => store.showImageSelected, async (val) => {
      if (!val) {
        scaleOn.value = false;
        postDetail.value = {};
      } else {
        await setPostDetail();
      }
    });
    VueCompositionAPI2.onMounted(() => {
      window.addEventListener("resize", () => {
        innerWidth.value = window.innerWidth;
        innerHeight.value = window.innerHeight;
      });
    });
    return {
      mdiChevronLeft,
      mdiChevronRight,
      mdiClose,
      mdiDownload,
      mdiHeart,
      mdiHeartPlusOutline,
      mdiLaunch,
      mdiLinkVariant,
      mdiMagnifyMinusOutline,
      mdiMagnifyPlusOutline,
      mdiPlaylistPlus,
      mdiTagMultiple,
      store,
      showImageToolbar,
      downloading,
      scaleOn,
      showTagChipGroup,
      toggleTagsShow,
      imageSelected,
      isVideo,
      imgSrc,
      imgLasySrc,
      imageSelectedWidth,
      notYKSite,
      toggleToolbar,
      toTagsPage,
      toDetailPage,
      toSourcePage,
      download,
      addToList,
      close,
      postDetail,
      addFavorite,
      showPrevPost,
      showNextPost,
      onImageLoadError
    };
  };
  __sfc_main$5.components = Object.assign({
    DPlayer
  }, __sfc_main$5.components);
  var render$5 = function() {
    var _vm$imageSelected$rat, _vm$imageSelected$fil, _vm$postDetail$tags;
    var _vm = this;
    var _h = _vm.$createElement;
    var _c2 = _vm._self._c || _h;
    return _c2("v-dialog", {
      attrs: {
        "content-class": _vm.scaleOn ? "img_detail_scale_on" : "",
        "width": _vm.imageSelectedWidth > 360 ? _vm.imageSelectedWidth : 360,
        "overlay-opacity": 0.7
      },
      model: {
        value: _vm.store.showImageSelected,
        callback: function($$v) {
          _vm.$set(_vm.store, "showImageSelected", $$v);
        },
        expression: "store.showImageSelected"
      }
    }, [_vm.store.showImageSelected ? _c2("v-img", {
      staticStyle: {
        "min-width": "300px"
      },
      attrs: {
        "src": _vm.imgSrc,
        "lazy-src": _vm.imgLasySrc,
        "aspect-ratio": _vm.imageSelected.aspectRatio
      },
      on: {
        "click": _vm.toggleToolbar,
        "error": _vm.onImageLoadError
      },
      scopedSlots: _vm._u([{
        key: "placeholder",
        fn: function() {
          return [_c2("v-row", {
            staticClass: "fill-height ma-0",
            attrs: {
              "align": "center",
              "justify": "center"
            }
          }, [_c2("v-progress-circular", {
            attrs: {
              "size": 100,
              "width": 6,
              "indeterminate": "",
              "color": "deep-purple"
            }
          })], 1)];
        },
        proxy: true
      }], null, false, 4094259188)
    }, [_c2("v-toolbar", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showImageToolbar,
        expression: "showImageToolbar"
      }],
      staticStyle: {
        "position": "absolute",
        "top": "0",
        "width": "100%",
        "z-index": "10"
      },
      attrs: {
        "color": "transparent",
        "height": "auto",
        "flat": ""
      }
    }, [_c2("v-chip", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.imageSelectedWidth > 400,
        expression: "imageSelectedWidth > 400"
      }],
      staticClass: "hidden-sm-and-down",
      attrs: {
        "small": "",
        "color": "#ee8888b3",
        "text-color": "#ffffff"
      },
      domProps: {
        "textContent": _vm._s(`${(_vm$imageSelected$rat = _vm.imageSelected.rating) === null || _vm$imageSelected$rat === void 0 ? void 0 : _vm$imageSelected$rat.toUpperCase()} ${_vm.imageSelected.id}`)
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.toDetailPage.apply(null, arguments);
        }
      }
    }), _c2("v-spacer"), !_vm.notYKSite ? _c2("v-tooltip", {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref) {
          var on = _ref.on, attrs = _ref.attrs;
          return [_c2("v-btn", _vm._g(_vm._b({
            staticClass: "mr-1",
            attrs: {
              "fab": "",
              "dark": "",
              "small": "",
              "color": "#ee8888b3"
            },
            on: {
              "click": function($event) {
                $event.stopPropagation();
                return _vm.addFavorite.apply(null, arguments);
              }
            }
          }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_vm.postDetail.voted ? _vm.mdiHeart : _vm.mdiHeartPlusOutline))])], 1)];
        }
      }], null, false, 2009326719)
    }, [_c2("span", [_vm._v(_vm._s(_vm.postDetail.voted ? "\u5DF2\u6536\u85CF" : "\u6536\u85CF"))])]) : _vm._e(), _c2("v-tooltip", {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref2) {
          var on = _ref2.on, attrs = _ref2.attrs;
          return [_c2("v-btn", _vm._g(_vm._b({
            staticClass: "mr-1",
            attrs: {
              "fab": "",
              "dark": "",
              "small": "",
              "color": "#ee8888b3"
            },
            on: {
              "click": function($event) {
                $event.stopPropagation();
                return _vm.toDetailPage.apply(null, arguments);
              }
            }
          }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiLinkVariant))])], 1)];
        }
      }], null, false, 3687422672)
    }, [_c2("span", [_vm._v("\u8BE6\u60C5")])]), _vm.imageSelected.sourceUrl ? _c2("v-tooltip", {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref3) {
          var on = _ref3.on, attrs = _ref3.attrs;
          return [_c2("v-btn", _vm._g(_vm._b({
            staticClass: "mr-1",
            attrs: {
              "fab": "",
              "dark": "",
              "small": "",
              "color": "#ee8888b3"
            },
            on: {
              "click": function($event) {
                $event.stopPropagation();
                return _vm.toSourcePage.apply(null, arguments);
              }
            }
          }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiLaunch))])], 1)];
        }
      }], null, false, 1660139414)
    }, [_c2("span", [_vm._v(_vm._s(`\u6765\u6E90 ${_vm.imageSelected.sourceUrl}`))])]) : _vm._e(), !_vm.isVideo ? _c2("v-tooltip", {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref4) {
          var on = _ref4.on, attrs = _ref4.attrs;
          return [_c2("v-btn", _vm._g(_vm._b({
            staticClass: "mr-1",
            attrs: {
              "fab": "",
              "dark": "",
              "small": "",
              "color": "#ee8888b3"
            },
            on: {
              "click": function($event) {
                $event.stopPropagation();
                _vm.scaleOn = !_vm.scaleOn;
              }
            }
          }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_vm.scaleOn ? _vm.mdiMagnifyMinusOutline : _vm.mdiMagnifyPlusOutline))])], 1)];
        }
      }], null, false, 3598500622)
    }, [_c2("span", [_vm._v(_vm._s(_vm.scaleOn ? "\u7F29\u5C0F" : "\u67E5\u770B\u539F\u56FE"))])]) : _vm._e(), _c2("v-menu", {
      attrs: {
        "dense": "",
        "open-on-hover": "",
        "offset-y": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref5) {
          var on = _ref5.on, attrs = _ref5.attrs;
          return [_c2("v-btn", _vm._g(_vm._b({
            directives: [{
              name: "show",
              rawName: "v-show",
              value: !_vm.downloading,
              expression: "!downloading"
            }],
            staticClass: "mr-1",
            attrs: {
              "fab": "",
              "dark": "",
              "small": "",
              "color": "#ee8888b3"
            }
          }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiDownload))])], 1)];
        }
      }], null, false, 1497311935)
    }, [_c2("v-list", {
      attrs: {
        "dense": "",
        "flat": ""
      }
    }, [_vm.imageSelected.sampleUrl ? _c2("v-list-item", {
      attrs: {
        "two-line": "",
        "link": "",
        "dense": ""
      }
    }, [_c2("v-list-item-content", {
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.download(_vm.imageSelected.sampleUrl, _vm.imageSelected.sampleDownloadName);
        }
      }
    }, [_c2("v-list-item-title", [_vm._v("\u4E0B\u8F7D\u7F29\u7565\u56FE")]), _c2("v-list-item-subtitle", {
      domProps: {
        "textContent": _vm._s(_vm.imageSelected.sampleDownloadText)
      }
    })], 1)], 1) : _vm._e(), _vm.imageSelected.jpegUrl ? _c2("v-list-item", {
      attrs: {
        "two-line": "",
        "link": "",
        "dense": ""
      }
    }, [_c2("v-list-item-content", {
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.download(_vm.imageSelected.jpegUrl, _vm.imageSelected.jpegDownloadName);
        }
      }
    }, [_c2("v-list-item-title", [_vm._v("\u4E0B\u8F7D\u9AD8\u6E05\u56FE")]), _c2("v-list-item-subtitle", {
      domProps: {
        "textContent": _vm._s(_vm.imageSelected.jpegDownloadText)
      }
    })], 1)], 1) : _vm._e(), _c2("v-list-item", {
      attrs: {
        "two-line": "",
        "link": "",
        "dense": ""
      }
    }, [_c2("v-list-item-content", {
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.download(_vm.imageSelected.fileUrl, _vm.imageSelected.fileDownloadName);
        }
      }
    }, [_c2("v-list-item-title", [_vm._v("\u4E0B\u8F7D\u539F\u6587\u4EF6")]), _c2("v-list-item-subtitle", {
      domProps: {
        "textContent": _vm._s(_vm.imageSelected.fileDownloadText)
      }
    })], 1)], 1)], 1)], 1), _c2("v-progress-circular", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.downloading,
        expression: "downloading"
      }],
      staticClass: "ml-1 mr-2",
      attrs: {
        "indeterminate": "",
        "color": "#ee8888b3"
      }
    }), _c2("v-tooltip", {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref6) {
          var on = _ref6.on, attrs = _ref6.attrs;
          return [_c2("v-btn", _vm._g(_vm._b({
            staticClass: "mr-1",
            attrs: {
              "fab": "",
              "dark": "",
              "small": "",
              "color": "#ee8888b3"
            },
            on: {
              "click": function($event) {
                $event.stopPropagation();
                return _vm.addToList.apply(null, arguments);
              }
            }
          }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiPlaylistPlus))])], 1)];
        }
      }], null, false, 3549934458)
    }, [_c2("span", [_vm._v("\u52A0\u5165\u4E0B\u8F7D\u5217\u8868")])]), _c2("v-tooltip", {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref7) {
          var on = _ref7.on, attrs = _ref7.attrs;
          return [_c2("v-btn", _vm._g(_vm._b({
            attrs: {
              "fab": "",
              "dark": "",
              "small": "",
              "color": "#ee8888b3"
            },
            on: {
              "click": function($event) {
                $event.stopPropagation();
                return _vm.close.apply(null, arguments);
              }
            }
          }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiClose))])], 1)];
        }
      }], null, false, 3797348669)
    }, [_c2("span", [_vm._v("\u5173\u95ED")])])], 1), _vm.isVideo ? _c2("d-player", {
      staticStyle: {
        "width": "100%"
      },
      attrs: {
        "options": {
          theme: "#ee8888",
          autoplay: true,
          video: {
            url: _vm.imageSelected.fileUrl
          }
        }
      }
    }) : _vm._e(), _c2("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.isVideo,
        expression: "!isVideo"
      }],
      staticClass: "img_scale_scroll"
    }, [_c2("img", {
      attrs: {
        "src": _vm.scaleOn ? (_vm$imageSelected$fil = _vm.imageSelected.fileUrl) !== null && _vm$imageSelected$fil !== void 0 ? _vm$imageSelected$fil : void 0 : void 0,
        "alt": ""
      }
    })]), _c2("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.isVideo && _vm.showImageToolbar,
        expression: "!isVideo && showImageToolbar"
      }],
      staticClass: "hidden-sm-and-down"
    }, [_c2("div", {
      staticStyle: {
        "position": "absolute",
        "bottom": "12px",
        "padding": "0 12px"
      }
    }, [_c2("v-chip", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm$postDetail$tags = _vm.postDetail.tags) === null || _vm$postDetail$tags === void 0 ? void 0 : _vm$postDetail$tags.length,
        expression: "postDetail.tags?.length"
      }],
      staticClass: "mr-1",
      attrs: {
        "small": "",
        "color": "#ee8888b3",
        "text-color": "#ffffff"
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.toggleTagsShow();
        }
      }
    }, [_c2("v-icon", {
      attrs: {
        "left": ""
      }
    }, [_vm._v(_vm._s(_vm.mdiTagMultiple))]), _c2("span", [_vm._v(_vm._s(_vm.showTagChipGroup ? "\u9690\u85CF" : "\u663E\u793A"))])], 1), _c2("v-chip-group", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showTagChipGroup,
        expression: "showTagChipGroup"
      }],
      attrs: {
        "column": ""
      }
    }, _vm._l(_vm.postDetail.tags || [], function(item, i) {
      return _c2("v-chip", {
        key: i,
        staticClass: "mr-1",
        attrs: {
          "small": "",
          "color": item.color,
          "text-color": "#ffffff"
        },
        domProps: {
          "textContent": _vm._s(item.tagText)
        },
        on: {
          "click": function($event) {
            $event.stopPropagation();
            return _vm.toTagsPage(item.tag);
          }
        }
      });
    }), 1)], 1), _c2("v-btn", {
      staticClass: "poa_left_center",
      attrs: {
        "fab": "",
        "dark": "",
        "small": "",
        "color": "#ee888863"
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.showPrevPost.apply(null, arguments);
        }
      }
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiChevronLeft))])], 1), _c2("v-btn", {
      staticClass: "poa_right_center",
      attrs: {
        "fab": "",
        "dark": "",
        "small": "",
        "color": "#ee888863"
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.showNextPost.apply(null, arguments);
        }
      }
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiChevronRight))])], 1)], 1)], 1) : _vm._e()], 1);
  };
  var staticRenderFns$5 = [];
  const __cssModules$5 = {};
  var __component__$5 = /* @__PURE__ */ normalizeComponent(__sfc_main$5, render$5, staticRenderFns$5, false, __vue2_injectStyles$5, null, null, null);
  function __vue2_injectStyles$5(context) {
    for (let o in __cssModules$5) {
      this[o] = __cssModules$5[o];
    }
  }
  var PostDetail = /* @__PURE__ */ function() {
    return __component__$5.exports;
  }();
  const __sfc_main$4 = {};
  __sfc_main$4.setup = (__props, __ctx) => {
    const showImageList = VueCompositionAPI2.ref(true);
    const showFab = VueCompositionAPI2.ref(false);
    const columnCount = VueCompositionAPI2.computed(() => {
      return store.selectedColumn === "0" ? {
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
      } : +store.selectedColumn;
    });
    VueCompositionAPI2.watch(() => store.selectedColumn, () => {
      showImageList.value = false;
      VueCompositionAPI2.nextTick(() => {
        showImageList.value = true;
      });
    });
    const showNoMore = VueCompositionAPI2.computed(() => !store.requestState && store.requestStop);
    const showLoadMore = VueCompositionAPI2.computed(() => !store.requestState && !store.requestStop);
    const ctxActPost = VueCompositionAPI2.ref();
    const showMenu = VueCompositionAPI2.ref(false);
    const x = VueCompositionAPI2.ref(0);
    const y = VueCompositionAPI2.ref(0);
    const maxHeightStyle = VueCompositionAPI2.computed(() => {
      const num = +store.selectedColumn;
      if (num == 0 || num > 3)
        return "max-height: 60vh;overflow: hidden";
      return "";
    });
    const getImgSrc = (img) => {
      var _a2, _b2, _c2, _d;
      if (columnCount.value < 6) {
        return (_b2 = (_a2 = img.sampleUrl) != null ? _a2 : img.fileUrl) != null ? _b2 : void 0;
      }
      return (_d = (_c2 = img.previewUrl) != null ? _c2 : img.fileUrl) != null ? _d : void 0;
    };
    const onCtxMenu = (ev, img) => {
      ev.preventDefault();
      showMenu.value = false;
      x.value = ev.clientX;
      y.value = ev.clientY;
      VueCompositionAPI2.nextTick(() => {
        ctxActPost.value = img;
        showMenu.value = true;
      });
    };
    const showImgModal = (index) => {
      store.imageSelectedIndex = index;
      store.showImageSelected = true;
    };
    const openDetail = () => {
      const img = ctxActPost.value;
      img && window.open(img.postView, "_blank", "noreferrer");
    };
    const addToSelectedList = () => {
      const img = ctxActPost.value;
      img && store.addToSelectedList(img);
    };
    const addFavorite = () => {
      const img = ctxActPost.value;
      img && addPostToFavorites(img.id);
    };
    const onImageLoadError = (url) => {
      const item = store.imageList.find((e) => e.previewUrl == url);
      if (!item)
        return;
      VueCompositionAPI2.set(item, "previewUrl", null);
      VueCompositionAPI2.set(item, "sampleUrl", null);
    };
    const scrollFn = throttleScroll((scroll) => {
      if (!showFab.value && scroll > 200)
        showFab.value = true;
      if (store.requestStop)
        return;
      if (store.requestState)
        return;
      notReachBottom() && searchPosts();
    }, () => {
      if (showFab.value)
        showFab.value = false;
    });
    VueCompositionAPI2.onMounted(async () => {
      await initPosts();
      window.addEventListener("scroll", scrollFn);
    });
    VueCompositionAPI2.onUnmounted(() => {
      window.removeEventListener("scroll", scrollFn);
    });
    return {
      mdiFileGifBox,
      mdiRefresh,
      mdiVideo,
      refreshPosts,
      searchPosts,
      store,
      showImageList,
      showFab,
      columnCount,
      showNoMore,
      showLoadMore,
      showMenu,
      x,
      y,
      maxHeightStyle,
      getImgSrc,
      onCtxMenu,
      showImgModal,
      openDetail,
      addToSelectedList,
      addFavorite,
      onImageLoadError
    };
  };
  __sfc_main$4.components = Object.assign({
    PostDetail
  }, __sfc_main$4.components);
  var render$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c2 = _vm._self._c || _h;
    return _vm.showImageList ? _c2("div", [_c2("masonry", {
      attrs: {
        "cols": _vm.columnCount,
        "gutter": "8px"
      }
    }, _vm._l(_vm.store.imageList, function(image, index) {
      return _c2("v-card", {
        key: index,
        staticClass: "mb-2",
        style: _vm.maxHeightStyle
      }, [_c2("v-img", {
        attrs: {
          "transition": "scroll-y-transition",
          "src": _vm.getImgSrc(image),
          "aspect-ratio": image.aspectRatio
        },
        on: {
          "click": function($event) {
            return _vm.showImgModal(index);
          },
          "contextmenu": function($event) {
            return _vm.onCtxMenu($event, image);
          },
          "error": _vm.onImageLoadError
        },
        scopedSlots: _vm._u([{
          key: "placeholder",
          fn: function() {
            return [_c2("v-row", {
              staticClass: "fill-height ma-0",
              attrs: {
                "align": "center",
                "justify": "center"
              }
            }, [_c2("v-progress-circular", {
              attrs: {
                "indeterminate": "",
                "color": "deep-purple"
              }
            })], 1)];
          },
          proxy: true
        }], null, true)
      }, [image.fileExt.toLowerCase() === "gif" ? _c2("v-icon", {
        staticStyle: {
          "position": "absolute",
          "right": "5px"
        }
      }, [_vm._v(" " + _vm._s(_vm.mdiFileGifBox) + " ")]) : _vm._e(), ["mp4", "webm"].includes(image.fileExt.toLowerCase()) ? _c2("v-icon", {
        staticStyle: {
          "position": "absolute",
          "right": "5px"
        }
      }, [_vm._v(" " + _vm._s(_vm.mdiVideo) + " ")]) : _vm._e()], 1)], 1);
    }), 1), _c2("div", {
      staticClass: "d-flex justify-center"
    }, [_c2("v-btn", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.store.requestState,
        expression: "store.requestState"
      }],
      attrs: {
        "color": "#ee8888",
        "text": ""
      }
    }, [_vm._v(" \u52A0\u8F7D\u4E2D... ")]), _c2("v-btn", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showLoadMore,
        expression: "showLoadMore"
      }],
      attrs: {
        "color": "#ee8888",
        "text": ""
      },
      on: {
        "click": function($event) {
          return _vm.searchPosts();
        }
      }
    }, [_vm._v(" \u52A0\u8F7D\u66F4\u591A ")]), _c2("v-btn", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showNoMore,
        expression: "showNoMore"
      }],
      attrs: {
        "color": "#ee8888",
        "text": ""
      }
    }, [_vm._v(" \u4E0B\u9762\u6CA1\u6709\u4E86... ")])], 1), _c2("v-menu", {
      attrs: {
        "position-x": _vm.x,
        "position-y": _vm.y,
        "absolute": "",
        "offset-y": ""
      },
      model: {
        value: _vm.showMenu,
        callback: function($$v) {
          _vm.showMenu = $$v;
        },
        expression: "showMenu"
      }
    }, [_c2("v-list", [_vm.store.isYKSite ? _c2("v-list-item", {
      on: {
        "click": _vm.addFavorite
      }
    }, [_c2("v-list-item-title", [_vm._v("\u52A0\u5165\u6536\u85CF")])], 1) : _vm._e(), _c2("v-list-item", {
      on: {
        "click": _vm.openDetail
      }
    }, [_c2("v-list-item-title", [_vm._v("\u65B0\u6807\u7B7E\u9875\u6253\u5F00")])], 1), _c2("v-list-item", {
      on: {
        "click": _vm.addToSelectedList
      }
    }, [_c2("v-list-item-title", [_vm._v("\u52A0\u5165\u4E0B\u8F7D\u5217\u8868")])], 1)], 1)], 1), _c2("v-fab-transition", [_c2("v-btn", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showFab,
        expression: "showFab"
      }],
      attrs: {
        "fab": "",
        "dark": "",
        "fixed": "",
        "bottom": "",
        "right": "",
        "color": "pink"
      },
      on: {
        "click": function($event) {
          return _vm.refreshPosts();
        }
      }
    }, [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiRefresh))])], 1)], 1), _c2("PostDetail")], 1) : _vm._e();
  };
  var staticRenderFns$4 = [];
  const __cssModules$4 = {};
  var __component__$4 = /* @__PURE__ */ normalizeComponent(__sfc_main$4, render$4, staticRenderFns$4, false, __vue2_injectStyles$4, null, null, null);
  function __vue2_injectStyles$4(context) {
    for (let o in __cssModules$4) {
      this[o] = __cssModules$4[o];
    }
  }
  var PostList = /* @__PURE__ */ function() {
    return __component__$4.exports;
  }();
  const __sfc_main$3 = {};
  __sfc_main$3.setup = (__props, __ctx) => {
    const columnCount = VueCompositionAPI2.ref({
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
    const noMore = VueCompositionAPI2.ref(false);
    const showNoMore = VueCompositionAPI2.computed(() => !store.requestState && noMore.value);
    const showLoadMore = VueCompositionAPI2.computed(() => !store.requestState && !noMore.value);
    const page2 = VueCompositionAPI2.ref(Number(new URLSearchParams(location.search).get("page")) || 1);
    const pools = VueCompositionAPI2.ref([]);
    const loadData = async (query) => {
      store.requestState = true;
      try {
        const results = await fetchPools(page2.value, query);
        if (Array.isArray(results) && results.length > 0) {
          pools.value = [...pools.value, ...results];
          const url = new URL(location.href);
          url.searchParams.set("page", page2.value.toString());
          history.replaceState("", "", url);
          page2.value++;
        } else {
          noMore.value = true;
        }
      } catch (error) {
        console.log("fetchPools error: ", error);
      } finally {
        store.requestState = false;
      }
    };
    const viewPool = (id) => {
      window.open(`/post?tags=pool%3A${id}&_wf=1`, "_blank");
    };
    const scrollFn = throttleScroll(() => {
      if (noMore.value)
        return;
      if (store.requestState)
        return;
      notReachBottom() && loadData();
    });
    VueCompositionAPI2.onMounted(async () => {
      await loadData();
      window.addEventListener("scroll", scrollFn);
      eventBus.$on("loadPoolsByQuery", (query) => {
        page2.value = 1;
        pools.value = [];
        loadData(query);
      });
    });
    VueCompositionAPI2.onUnmounted(() => {
      window.removeEventListener("scroll", scrollFn);
      eventBus.$off("loadPoolsByQuery");
    });
    return {
      mdiCalendarBlank,
      mdiCalendarEdit,
      mdiDownload,
      mdiLaunch,
      store,
      columnCount,
      showNoMore,
      showLoadMore,
      pools,
      loadData,
      viewPool
    };
  };
  var render$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c2 = _vm._self._c || _h;
    return _c2("div", [_c2("masonry", {
      attrs: {
        "cols": _vm.columnCount,
        "gutter": "8px"
      }
    }, _vm._l(_vm.pools, function(item) {
      return _c2("v-card", {
        key: item.id,
        staticClass: "mb-2"
      }, [_c2("v-img", {
        attrs: {
          "transition": "scroll-y-transition",
          "src": item.thumb,
          "height": "auto"
        }
      }), _c2("v-card-title", [_vm._v(_vm._s(item.name))]), _c2("v-card-subtitle", {
        staticClass: "pb-0"
      }, [_c2("v-tooltip", {
        attrs: {
          "bottom": ""
        },
        scopedSlots: _vm._u([{
          key: "activator",
          fn: function(_ref) {
            var on = _ref.on, attrs = _ref.attrs;
            return [_c2("span", _vm._g(_vm._b({
              staticClass: "d-inline-block text-truncate",
              staticStyle: {
                "max-width": "100%"
              }
            }, "span", attrs, false), on), [_vm._v(_vm._s(item.description))])];
          }
        }], null, true)
      }, [_c2("span", {
        staticStyle: {
          "display": "inline-block",
          "max-width": "500px"
        }
      }, [_vm._v(_vm._s(item.description))])])], 1), _c2("v-card-text", {
        staticClass: "pb-0"
      }, [_c2("v-icon", {
        attrs: {
          "small": ""
        }
      }, [_vm._v(_vm._s(_vm.mdiCalendarBlank))]), _c2("span", {
        staticClass: "ml-1 mr-4"
      }, [_vm._v(_vm._s(item.created_at))]), _c2("v-icon", {
        attrs: {
          "small": ""
        }
      }, [_vm._v(_vm._s(_vm.mdiCalendarEdit))]), _c2("span", {
        staticClass: "ml-1"
      }, [_vm._v(_vm._s(item.updated_at))])], 1), _c2("v-card-actions", [_c2("v-list-item", {
        staticClass: "grow"
      }, [_c2("v-list-item-avatar", [_c2("v-img", {
        staticClass: "elevation-6",
        attrs: {
          "alt": "",
          "src": `/data/avatars/${item.user_id}.jpg`,
          "lazy-src": "https://upload-bbs.mihoyo.com/upload/2022/08/13/190122060/f65e984cb2f5184ba167e461bfdeea55_8564255716639207386.png"
        }
      })], 1), _c2("v-row", {
        attrs: {
          "align": "center",
          "justify": "end"
        }
      }, [_c2("v-list-item-content", {
        staticClass: "ml-2"
      }, [_c2("v-list-item-title", [_c2("a", {
        attrs: {
          "href": `/pool/show/${item.id}`,
          "target": "_blank"
        }
      }, [_vm._v("Pool #" + _vm._s(item.id))])])], 1), _c2("v-chip", {
        staticClass: "mr-1"
      }, [_vm._v(_vm._s(item.post_count) + " \u5F20")]), _c2("v-tooltip", {
        attrs: {
          "bottom": ""
        },
        scopedSlots: _vm._u([{
          key: "activator",
          fn: function(_ref2) {
            var on = _ref2.on, attrs = _ref2.attrs;
            return [_c2("v-btn", _vm._g(_vm._b({
              attrs: {
                "icon": ""
              },
              on: {
                "click": function($event) {
                  return _vm.viewPool(item.id);
                }
              }
            }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiLaunch))])], 1)];
          }
        }], null, true)
      }, [_c2("span", [_vm._v("\u67E5\u770B")])]), _c2("v-tooltip", {
        attrs: {
          "bottom": ""
        },
        scopedSlots: _vm._u([{
          key: "activator",
          fn: function(_ref3) {
            var on = _ref3.on, attrs = _ref3.attrs;
            return [_c2("v-btn", _vm._g(_vm._b({
              attrs: {
                "icon": "",
                "href": `/pool/zip/${item.id}?jpeg=1`
              }
            }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_vm.mdiDownload))])], 1)];
          }
        }], null, true)
      }, [_c2("span", [_vm._v("\u4E0B\u8F7D")])])], 1)], 1)], 1)], 1);
    }), 1), _c2("div", {
      staticClass: "d-flex justify-center"
    }, [_c2("v-btn", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.store.requestState,
        expression: "store.requestState"
      }],
      attrs: {
        "color": "#ee8888",
        "text": ""
      }
    }, [_vm._v("\u52A0\u8F7D\u4E2D...")]), _c2("v-btn", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showLoadMore,
        expression: "showLoadMore"
      }],
      attrs: {
        "color": "#ee8888",
        "text": ""
      },
      on: {
        "click": function($event) {
          return _vm.loadData();
        }
      }
    }, [_vm._v("\u52A0\u8F7D\u66F4\u591A")]), _c2("v-btn", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showNoMore,
        expression: "showNoMore"
      }],
      attrs: {
        "color": "#ee8888",
        "text": ""
      }
    }, [_vm._v("\u6CA1\u4E86")])], 1)], 1);
  };
  var staticRenderFns$3 = [];
  const __cssModules$3 = {};
  var __component__$3 = /* @__PURE__ */ normalizeComponent(__sfc_main$3, render$3, staticRenderFns$3, false, __vue2_injectStyles$3, null, null, null);
  function __vue2_injectStyles$3(context) {
    for (let o in __cssModules$3) {
      this[o] = __cssModules$3[o];
    }
  }
  var PoolList = /* @__PURE__ */ function() {
    return __component__$3.exports;
  }();
  const __sfc_main$2 = {};
  __sfc_main$2.setup = (__props, __ctx) => {
    const showSnackbar = VueCompositionAPI2.ref(false);
    const snackbarText = VueCompositionAPI2.ref("");
    const snackbarType = VueCompositionAPI2.ref("");
    const snackbarTypeMap = VueCompositionAPI2.ref({
      success: ["success", mdiCheckCircle],
      error: ["red accent-2", mdiCloseCircle]
    });
    eventBus.$on("showSnackbar", (text, type) => {
      snackbarText.value = text;
      snackbarType.value = type || "";
      showSnackbar.value = true;
    });
    return {
      showSnackbar,
      snackbarText,
      snackbarType,
      snackbarTypeMap
    };
  };
  var render$2 = function() {
    var _vm$snackbarTypeMap$_, _vm$snackbarTypeMap$_2;
    var _vm = this;
    var _h = _vm.$createElement;
    var _c2 = _vm._self._c || _h;
    return _c2("v-snackbar", {
      attrs: {
        "top": "",
        "color": (_vm$snackbarTypeMap$_ = _vm.snackbarTypeMap[_vm.snackbarType]) === null || _vm$snackbarTypeMap$_ === void 0 ? void 0 : _vm$snackbarTypeMap$_[0],
        "timeout": 2e3,
        "min-width": 160
      },
      model: {
        value: _vm.showSnackbar,
        callback: function($$v) {
          _vm.showSnackbar = $$v;
        },
        expression: "showSnackbar"
      }
    }, [_c2("v-icon", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.snackbarType,
        expression: "snackbarType"
      }]
    }, [_vm._v(_vm._s((_vm$snackbarTypeMap$_2 = _vm.snackbarTypeMap[_vm.snackbarType]) === null || _vm$snackbarTypeMap$_2 === void 0 ? void 0 : _vm$snackbarTypeMap$_2[1]))]), _c2("span", {
      staticClass: "ml-2"
    }, [_vm._v(_vm._s(_vm.snackbarText))])], 1);
  };
  var staticRenderFns$2 = [];
  const __cssModules$2 = {};
  var __component__$2 = /* @__PURE__ */ normalizeComponent(__sfc_main$2, render$2, staticRenderFns$2, false, __vue2_injectStyles$2, null, null, null);
  function __vue2_injectStyles$2(context) {
    for (let o in __cssModules$2) {
      this[o] = __cssModules$2[o];
    }
  }
  var Snackbar = /* @__PURE__ */ function() {
    return __component__$2.exports;
  }();
  const __sfc_main$1 = {};
  __sfc_main$1.setup = (__props, __ctx) => {
    return {
      store
    };
  };
  __sfc_main$1.components = Object.assign({
    PostList,
    PoolList,
    Snackbar
  }, __sfc_main$1.components);
  var render$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c2 = _vm._self._c || _h;
    return _c2("v-container", {
      staticClass: "_vcont pa-2",
      attrs: {
        "fluid": ""
      }
    }, [_vm.store.showPostList ? _c2("PostList") : _vm._e(), _vm.store.showPoolList ? _c2("PoolList") : _vm._e(), _c2("Snackbar")], 1);
  };
  var staticRenderFns$1 = [];
  const __cssModules$1 = {};
  var __component__$1 = /* @__PURE__ */ normalizeComponent(__sfc_main$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
  function __vue2_injectStyles$1(context) {
    for (let o in __cssModules$1) {
      this[o] = __cssModules$1[o];
    }
  }
  var AppContainer = /* @__PURE__ */ function() {
    return __component__$1.exports;
  }();
  const __sfc_main = {};
  __sfc_main.setup = (__props, __ctx) => {
    const vuetify = useVuetify();
    VueCompositionAPI2.onMounted(() => {
      const mode = localStorage.getItem("__darkmode") || "dark";
      vuetify.theme.dark = mode === "dark";
    });
    return {};
  };
  __sfc_main.components = Object.assign({
    AppBar,
    NavDrawer,
    AppContainer
  }, __sfc_main.components);
  var render = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c2 = _vm._self._c || _h;
    return _c2("v-app", [_c2("AppBar"), _c2("NavDrawer"), _c2("v-main", {
      attrs: {
        "app": ""
      }
    }, [_c2("AppContainer")], 1)], 1);
  };
  var staticRenderFns = [];
  const __cssModules = {};
  var __component__ = /* @__PURE__ */ normalizeComponent(__sfc_main, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
  function __vue2_injectStyles(context) {
    for (let o in __cssModules) {
      this[o] = __cssModules[o];
    }
  }
  var App = /* @__PURE__ */ function() {
    return __component__.exports;
  }();
  function initApp() {
    Vue__default["default"].use(VueCompositionAPI__default["default"]);
    Vue__default["default"].use(VueMasonry__default["default"]);
    const vuetify = installVuetify();
    const app = new Vue__default["default"]({
      vuetify,
      render: (h) => h(App)
    });
    app.$mount("#app");
  }
  initApp();
  })(Vue, VueCompositionAPI, VueMasonry, Vuetify);});
})();
