// ==UserScript==
// @name                 Yande.re 瀑布流浏览
// @name:en              Yande.re Masonry
// @name:zh              Yande.re 瀑布流浏览
// @version              0.29.0
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
  var prepareStyle = "#enter-masonry{position:fixed;z-index:99;right:16px;top:10px;height:30px;padding:6px 10px;font-size:13px;border:0;border-radius:6px;color:#fff;outline:0;background:linear-gradient(to right,#ff758c 0%,#ff7eb3 100%);opacity:1;transform:scale(1);transition:opacity,transform .2s;cursor:pointer}#enter-masonry:hover{opacity:.8;transform:scale(1.05)}#locale-select{position:fixed;z-index:99;right:110px;top:12px;font-size:13px;padding:5px;background:#ee9ca7;background:linear-gradient(to left,#ffdde1,#ee9ca7);border:none;border-radius:6px}#wf-type-select{position:fixed;z-index:99;right:190px;top:12px;font-size:13px;padding:5px;background:#ee9ca7;background:linear-gradient(to left,#ffdde1,#ee9ca7);border:none;border-radius:6px}\n";
  var ydStyle = 'a.thumb{padding-bottom:5px;border-bottom:2px solid;border-color:#232322}a.thumb:visited{border-color:#ffaaae}#add-to-favs{zoom:1.7;margin:4px 0}li.tag-type-artist a[href^="/post"]:not(.no-browser-link):before{content:"[\\753b\\5e08] "}li.tag-type-copyright a[href^="/post"]:not(.no-browser-link):before{content:"[\\7248\\6743] "}li.tag-type-character a[href^="/post"]:not(.no-browser-link):before{content:"[\\89d2\\8272] "}li.tag-type-circle a[href^="/post"]:not(.no-browser-link):before{content:"[\\793e\\56e2] "}#post-list{display:flex}#post-list .sidebar,#post-popular .sidebar{float:none;width:auto;max-width:240px}#post-list .content,#post-popular .content{float:none;flex:1;padding-right:10px}#post-list ul#post-list-posts,#post-popular ul#post-list-posts{display:block;width:100%;margin:0 auto}#post-popular ul#post-list-posts{width:96vw}#post-list ul#post-list-posts li,#post-popular ul#post-list-posts li{float:none;display:inline-block;margin:0;transition:.2s ease-in-out}#post-list ul#post-list-posts li[data-macy-complete="1"] img.preview,#post-popular ul#post-list-posts li[data-macy-complete="1"] img.preview{max-width:100%}#post-list ul#post-list-posts .inner,#post-popular ul#post-list-posts .inner{width:100%!important;height:auto!important}#post-list img.preview,#post-popular img.preview{width:100%;height:auto;margin-top:0;border-radius:5px;box-sizing:border-box}#post-list a.directlink,#post-popular a.directlink{margin-top:5px}.mm-masonry{--gap: 24;--col-width: 240}.mm-masonry{--_col-width: var(--col-width, 280);--_col-width-px: calc(var(--_col-width) * 1px);--_gap: calc(var(--gap, 20) * 1px);display:var(--display, grid)!important;grid-template-columns:repeat(auto-fill,minmax(var(--_col-width-px),1fr));grid-auto-rows:1px;column-gap:var(--_gap)}.mm-masonry__item{--img-proportional-height: calc(var(--h) * var(--_col-width) / (var(--w)));grid-row-end:span var(--img-proportional-height, 240);overflow:hidden}.mm-masonry__item:not(:last-child){margin-bottom:var(--_gap)}#post-list ul#post-list-posts .mm-masonry__item .inner,#post-popular ul#post-list-posts .mm-masonry__item .inner{height:100%!important}.mm-masonry__img{width:100%!important;height:100%!important;object-fit:cover}.justified-container{display:flex!important;flex-wrap:wrap}.justified-container:after{content:"";flex-grow:999999999}.justified-item{position:relative}.justified-item img.preview{position:absolute;top:0;left:0;width:100%;vertical-align:bottom;object-fit:cover}\n';
  var knStyle = "#lsidebar{display:none}#post-popular ul#post-list-posts{display:flex;justify-content:center;flex-wrap:wrap}#post-list ul#post-list-posts li,#post-popular ul#post-list-posts li{width:auto!important;margin:0 10px 10px 0;vertical-align:top}\n";
  var customStyle = '#loading{height:100%;width:100%;position:fixed;z-index:99999;margin-top:0;top:0}#loading p{margin:100px auto;line-height:100px;font-family:Meiryo UI,MicroHei,Microsoft YaHei UI;font-size:18px;color:#9671d7}#loading-center{width:100%;height:100%;position:relative}#loading-center-absolute{position:absolute;left:50%;top:50%;height:150px;width:150px;margin-top:-75px;margin-left:-50px}.loading-object{width:20px;height:20px;background-color:#9671d7;float:left;margin-right:20px;margin-top:65px;border-radius:50%}#loading-object_one{animation:object_one 1.5s infinite}#loading-object_two{animation:object_two 1.5s infinite;animation-delay:.25s}#loading-object_three{animation:object_three 1.5s infinite;animation-delay:.5s}@keyframes object_one{75%{transform:scale(0)}}@keyframes object_two{75%{transform:scale(0)}}@keyframes object_three{75%{transform:scale(0)}}.img_detail_loading{position:absolute;top:0;left:0;z-index:1;display:flex;justify-content:center;align-items:center;width:100%;height:100%;margin:0}.img_detail_loading:after{content:"";position:absolute;z-index:1;top:0;left:0;width:100%;height:100%;backdrop-filter:blur(2px)}.img_detail_loading .v-progress-circular{position:absolute;z-index:10}.img_detail_loading img{object-fit:cover}.img_scale_scroll{display:block;width:100vw;height:100vh;overflow:auto;user-select:none}.img_detail_scale{display:block;margin:0 auto;user-select:none;transition:.2s}.img_detail_cont{position:relative;display:flex;justify-content:center;align-items:center;width:100%;height:100%;background-color:#212121}.theme--light .img_detail_cont{background-color:#fff}.img_scale_normal{display:flex;justify-content:center;align-items:center;height:100%}.img_detail_sample{display:block;max-width:100vw;max-height:100vh;margin:0 auto}.img_detail_btns{position:absolute;top:0;left:0;width:100%;height:100%}::-webkit-scrollbar{width:0px}.nav_drawer .v-navigation-drawer__content::-webkit-scrollbar,.img_scale_scroll::-webkit-scrollbar{width:10px!important;height:10px!important}.nav_drawer .v-list-group__items .v-list-item{padding-left:10px!important}.nav_drawer .v-list .v-list-group--active.primary--text{color:inherit!important}.img_scale_scroll::-webkit-scrollbar-track{background:#e6e6e6;border-left:1px solid #dadada}.nav_drawer .v-navigation-drawer__content::-webkit-scrollbar-thumb{background:#b0b0b0;border:solid 3px #fff;border-radius:7px}.theme--dark .nav_drawer .v-navigation-drawer__content::-webkit-scrollbar-thumb{border:solid 3px #363636}.img_scale_scroll::-webkit-scrollbar-thumb{background:#b0b0b0;border:solid 3px #e6e6e6;border-radius:7px}.nav_drawer .v-navigation-drawer__content::-webkit-scrollbar-thumb:hover,.img_scale_scroll::-webkit-scrollbar-thumb:hover{background:black}.theme--dark .nav_drawer .v-navigation-drawer__content::-webkit-scrollbar-thumb:hover{background:#ddd}.v-date-picker-table>table>thead>tr>th{padding:0}.v-date-picker-table>table>thead>tr>th:nth-child(1):before{content:"\\65e5"}.v-date-picker-table>table>thead>tr>th:nth-child(2):before{content:"\\4e00"}.v-date-picker-table>table>thead>tr>th:nth-child(3):before{content:"\\4e8c"}.v-date-picker-table>table>thead>tr>th:nth-child(4):before{content:"\\4e09"}.v-date-picker-table>table>thead>tr>th:nth-child(5):before{content:"\\56db"}.v-date-picker-table>table>thead>tr>th:nth-child(6):before{content:"\\4e94"}.v-date-picker-table>table>thead>tr>th:nth-child(7):before{content:"\\516d"}.poa_left_center{position:absolute;left:10px;top:50%;transform:translateY(-50%)}.poa_right_center{position:absolute;right:10px;top:50%;transform:translateY(-50%)}.v-list-item__title.title{line-height:1.2!important}.blacklist_combobox [role=combobox]{padding:0!important}.blacklist_combobox .v-chip{margin-bottom:4px!important}.preload_num{width:32px;height:30px;margin:0;padding-left:4px;border:1px solid #bbb;color:inherit;appearance:none!important;-webkit-appearance:none!important;-moz-appearance:textfield}.dplayer-notice-list,.dplayer-bezel-icon{opacity:0!important;visibility:hidden!important}.wf-grid .posts-image-card .v-responsive__sizer{padding-bottom:100%!important}.flexbin{display:flex!important;overflow:hidden;flex-wrap:wrap;margin:2.5px;transition:.2s}.flexbin:after{content:"";flex-grow:999999999;min-width:15vw;height:0}.flexbin .posts-image-card{position:relative;display:block!important;height:15vw!important;margin:2.5px!important;padding-bottom:0!important;flex-grow:1;transition:.2s}.flexbin .post-image{position:initial!important;width:auto!important;height:15vw!important;object-fit:cover;max-width:100%;min-width:100%;vertical-align:bottom;transition:.2s}.flexbin .post-image:before{content:"Loading..."}@media (max-width: 1280px){.flexbin:after{min-width:20vw!important}.flexbin .posts-image-card,.flexbin .post-image{height:20vw!important}}@media (max-width: 980px){.flexbin:after{min-width:30vw!important}.flexbin .posts-image-card,.flexbin .post-image{height:30vw!important}}@media (max-width: 768px){.flexbin:after{min-width:40vw!important}.flexbin .posts-image-card,.flexbin .post-image{height:40vw!important}}@media (max-width: 570px){.flexbin:after{min-width:60vw!important}.flexbin .posts-image-card,.flexbin .post-image{height:60vw!important}}.justified-container{display:flex!important;flex-wrap:wrap;gap:8px}.justified-container:after{content:"";flex-grow:999999999}.justified-container .posts-image-card{position:relative;margin-bottom:0!important;background-color:#dcdcdc}.justified-container .post-image{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:4px;vertical-align:bottom;object-fit:cover}.theme--light .img_detail_btn_color .v-chip.primary,.theme--light .img_detail_btn_color .v-btn.primary{background-color:#8e24aab3!important;border-color:#8e24aab3!important}.theme--dark .img_detail_btn_color .v-chip.primary,.theme--dark .img_detail_btn_color .v-btn.primary{background-color:#ba68c8b3!important;border-color:#ba68c8b3!important}.theme--light .v-app-bar{background-color:#fff!important}.site_icon{width:20px;height:20px;object-fit:cover}.theme--light .sel_menu_btn{min-height:32px;padding:0 16px;background-color:#ba68c833!important;border-width:0;border-radius:4px;font-weight:600!important;color:#8e24aa!important;text-transform:none;box-shadow:none!important}.theme--light .nav_drawer .sel_menu_btn .v-icon{color:#8e24aa!important}.theme--light .sel_menu_btn .v-btn__content{line-height:1!important}.theme--light .nav_drawer .v-icon,.theme--light .nav_drawer .v-btn--icon,.theme--light .v-app-bar .v-icon,.theme--light .v-app-bar .v-btn--icon{color:#000000de!important}\n';
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
    }
    await sleep(1e3);
    setMasonryMode(async () => {
      removeOldListeners();
      await initMasonry();
      callback == null ? void 0 : callback();
    });
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function doNotRun() {
    const mimeTypes = ["jpg", "jpeg", "png", "gif", "mp4", "webm", "json", "xml"];
    return mimeTypes.some((e) => location.pathname.endsWith(`.${e}`));
  }
  function isMoebooru() {
    return ["yande.re", "konachan", "lolibooru", "sakugabooru"].some((e) => location.href.includes(e));
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
    const wfType = localStorage.getItem("__wfType") || "masonry";
    (_a2 = wfTypeActions[wfType]) == null ? void 0 : _a2.call(wfTypeActions, listEl);
  }
  function addWfTypeSelect() {
    if (!location.href.includes("yande.re/post"))
      return;
    const params2 = new URLSearchParams(location.search);
    if (params2.get("_wf"))
      return;
    const type = localStorage.getItem("__wfType") || "masonry";
    document.body.insertAdjacentHTML("beforeend", `<select id="wf-type-select">${Object.keys(wfTypeActions).map((e) => `<option ${type == e ? "selected" : ""} value="${e}">${e}</option>`).join("")}</select>`);
    const sel = document.querySelector("#wf-type-select");
    sel == null ? void 0 : sel.addEventListener("change", function() {
      const { value } = this;
      if (!value)
        return;
      localStorage.setItem("__wfType", value);
      setTimeout(() => {
        location.reload();
      }, 200);
    });
  }
  async function initMasonry() {
    replaceHead();
    replaceBody();
    await loadDeps();
  }
  function addSiteStyle() {
    GM_addStyle(prepareStyle);
    if (location.href.includes("yande.re")) {
      GM_addStyle(ydStyle);
    }
    if (location.href.includes("konachan")) {
      GM_addStyle(ydStyle + knStyle);
    }
  }
  const locales = ["de", "en", "es", "ja", "ru", "zh_CN", "zh_TW"];
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
    const browserLang = navigator.language;
    const locale = locales.find((e) => e == browserLang.replace("-", "_") || e == browserLang.split("-")[0]);
    if (!locale)
      return;
    url.searchParams.set("locale", locale);
    location.assign(url);
  }
  function addMoeLocaleSelect() {
    const params2 = new URLSearchParams(location.search);
    if (params2.get("_wf"))
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
    const response = await fetch("https://raw.githubusercontent.com/asadahimeka/yandere-masonry/main/src/data/tags_cn.json");
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
    const btnText = navigator.language.includes("zh") ? "\u7011\u5E03\u6D41\u6A21\u5F0F" : "Browsing";
    document.body.insertAdjacentHTML("beforeend", `<button id="enter-masonry">${btnText}</button>`);
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
  async function loadDeps() {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/vue/2.7.14/vue.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.7.0/vuetify.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/8.28.2/vue-i18n.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/fast-xml-parser/4.0.11/fxparser.min.js");
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="https://fonts.loli.net/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.7.0/vuetify.min.css">
    <style>${customStyle}</style>
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
  prepareApp(() => {(function(Vue2, Vuetify2, VueI18n2, fastXmlParser) {
  var _a, _b, _c;
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
  var props = {
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
    props,
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
  const qWcqQRsE9nN43MaZ2BmN9$3 = "Web \u9884\u89C8\u7248";
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
  const A16qoBulYQJLbHe9mqNwm$3 = "\u5305\u542B\u88F8\u9732\u6216\u6027\u63CF\u5199\u5185\u5BB9";
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
    "LZbI8am7nD-LiemZzroFF": "\u9002\u9AD8\u4E0D\u7B49\u5BBD"
  };
  const UxxldE9xRwmQctrvba5Y8$2 = "\u8A2D\u7F6E";
  const A16qoBulYQJLbHe9mqNwm$2 = "\u5305\u542B\u88F8\u9732\u6216\u6027\u63CF\u5BEB\u5167\u5BB9";
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
  const qWcqQRsE9nN43MaZ2BmN9$2 = "Web \u9810\u89BD\u7248";
  const rXjhc8VuGloy1wZ09noNB$2 = "\u5C0F\u65BC7\u5217\u6642\u5217\u8868\u6703\u52A0\u8F09\u5927\u5716";
  const tGi6xYfvStBmR8qduEmKX$2 = "\u67E5\u770B";
  const u8mEnSo4mxDRUbj7FeAll$2 = "\u5207\u63DB\u6DF1\u8272\u6A21\u5F0F";
  const uxIs3XkeVzkrEX985zHk3$2 = "\u81EA\u52D5";
  const vfUg8xP6WptIhSL0E9b9D$2 = "\u7B49\u5BEC\u7B49\u9AD8";
  const w95XGurDhDfOfw7XH4JFW$2 = "\u8A73\u60C5\u5F48\u7A97\u4F7F\u7528A/D/\u2190/\u2192\u5207\u63DB\u5716\u7247";
  const wI4KHHIe3zNRziW4lDZrp$2 = "\u4E0B\u8F09\u6A23\u54C1\u5716";
  const ze1PaiGdX4ufmoOLv_xw6$2 = "\u6309\u5E74";
  const zs8YTCc8d8XFUgRnp7m_w$2 = "\u6211\u7684\u6536\u85CF\u593E";
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
    "LZbI8am7nD-LiemZzroFF": "\u9069\u9AD8\u4E0D\u7B49\u5BEC",
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
    zs8YTCc8d8XFUgRnp7m_w: zs8YTCc8d8XFUgRnp7m_w$2
  };
  const UxxldE9xRwmQctrvba5Y8$1 = "Settings";
  const A16qoBulYQJLbHe9mqNwm$1 = "Contains nudity or sexual descriptions";
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
  const qWcqQRsE9nN43MaZ2BmN9$1 = "Web Preview";
  const rXjhc8VuGloy1wZ09noNB$1 = "When the list is less than 7 columns, the list will load a large image";
  const tGi6xYfvStBmR8qduEmKX$1 = "View";
  const u8mEnSo4mxDRUbj7FeAll$1 = "Toggle dark mode";
  const uxIs3XkeVzkrEX985zHk3$1 = "Auto";
  const vfUg8xP6WptIhSL0E9b9D$1 = "Equal width and height";
  const w95XGurDhDfOfw7XH4JFW$1 = "Use A/D/\u2190/\u2192 to switch images in the detail pop-up window";
  const wI4KHHIe3zNRziW4lDZrp$1 = "Download sample image";
  const ze1PaiGdX4ufmoOLv_xw6$1 = "By year";
  const zs8YTCc8d8XFUgRnp7m_w$1 = "My favorites";
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
    "LZbI8am7nD-LiemZzroFF": "Appropriate height and different width",
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
    "jMod2JozzAnwHuD-3KuPb": "Enter the tags below and press Enter to add",
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
    zs8YTCc8d8XFUgRnp7m_w: zs8YTCc8d8XFUgRnp7m_w$1
  };
  const UxxldE9xRwmQctrvba5Y8 = "\u8A2D\u5B9A";
  const A16qoBulYQJLbHe9mqNwm = "\u30CC\u30FC\u30C9\u3084\u6027\u7684\u306A\u63CF\u5199\u304C\u542B\u307E\u308C\u308B";
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
  const qWcqQRsE9nN43MaZ2BmN9 = "\u30A6\u30A7\u30D6\u30D7\u30EC\u30D3\u30E5\u30FC";
  const rXjhc8VuGloy1wZ09noNB = "\u30EA\u30B9\u30C8\u304C 7 \u5217\u672A\u6E80\u306E\u5834\u5408\u3001\u30EA\u30B9\u30C8\u306B\u306F\u5927\u304D\u306A\u753B\u50CF\u304C\u30ED\u30FC\u30C9\u3055\u308C\u307E\u3059\u3002";
  const tGi6xYfvStBmR8qduEmKX = "\u898B\u308B";
  const u8mEnSo4mxDRUbj7FeAll = "\u30C0\u30FC\u30AF\u30E2\u30FC\u30C9\u3092\u5207\u308A\u66FF\u3048\u308B";
  const uxIs3XkeVzkrEX985zHk3 = "\u81EA\u52D5";
  const vfUg8xP6WptIhSL0E9b9D = "\u5E45\u3068\u9AD8\u3055\u304C\u7B49\u3057\u3044";
  const w95XGurDhDfOfw7XH4JFW = "A/D/\u2190/\u2192\u3067\u8A73\u7D30\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u30A6\u30A3\u30F3\u30C9\u30A6\u306E\u753B\u50CF\u3092\u5207\u308A\u66FF\u3048\u307E\u3059";
  const wI4KHHIe3zNRziW4lDZrp = "\u30B5\u30F3\u30D7\u30EB\u753B\u50CF\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9";
  const ze1PaiGdX4ufmoOLv_xw6 = "\u5E74\u5225";
  const zs8YTCc8d8XFUgRnp7m_w = "\u79C1\u306E\u304A\u6C17\u306B\u5165\u308A";
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
    "LZbI8am7nD-LiemZzroFF": "\u9069\u5207\u306A\u9AD8\u3055\u3068\u7570\u306A\u308B\u5E45",
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
    "jMod2JozzAnwHuD-3KuPb": "\u4EE5\u4E0B\u306E\u30E9\u30D9\u30EB\u3092\u5165\u529B\u3057\u3001Enter \u30AD\u30FC\u3092\u62BC\u3057\u3066\u8FFD\u52A0\u3057\u307E\u3059",
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
    zs8YTCc8d8XFUgRnp7m_w
  };
  Vue__default["default"].use(VueI18n__default["default"]);
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
  const language = localStorage.getItem("__LANG") || langMap[navigator.language];
  console.log("language: ", language);
  const i18n = new VueI18n__default["default"]({
    locale: language || "en",
    fallbackLocale: "en",
    messages: {
      "zh-Hans": zhHans,
      "zh-Hant": zhHant,
      en,
      ja
    }
  });
  const ykFlag = ["konachan", "yande.re"].some((e) => location.href.includes(e));
  const poolFlag = location.pathname == "/pool";
  const store = Vue__default["default"].observable({
    requestState: false,
    requestStop: false,
    showImageSelected: false,
    imageSelectedIndex: 0,
    showDrawer: false,
    showSettings: false,
    showFab: false,
    currentPage: 1,
    imageList: [],
    blacklist: ((_a = localStorage.getItem("__blacklist")) == null ? void 0 : _a.split(",").filter(Boolean)) || [],
    selectedImageList: [],
    selectedColumn: (_b = localStorage.getItem("__masonry_col")) != null ? _b : "0",
    isYKSite: ykFlag,
    showPostList: !poolFlag,
    showPoolList: ykFlag && poolFlag,
    showNSFWContents: localStorage.getItem("__showNSFW") !== "0",
    isListenWheelEvent: localStorage.getItem("__listenWheel") !== "0",
    isFullImgPreload: !!localStorage.getItem("__fullImgPreload"),
    imgPreloadNum: Number(localStorage.getItem("__imgPreloadNum")) || 1,
    isFullscreen: false,
    settings: {
      masonryLayout: localStorage.getItem("__masonryLayout") || "masonry",
      isListenKeyupEvent: localStorage.getItem("__listenKeyup") !== "0",
      credentialQuery: localStorage.getItem("__credentialQuery") || ""
    },
    toggleDrawer() {
      store.showDrawer = !store.showDrawer;
    },
    addToSelectedList(item) {
      if (store.selectedImageList.some((e) => e.id === item.id))
        return;
      Object.assign(item, { fileNameWithTags: `${location.hostname} ${item.id} ${item.tags.join(" ")}` });
      store.selectedImageList.push(item);
    }
  });
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
  const _sfc_main$a = {
    data() {
      return {
        wfType: store.settings.masonryLayout || "masonry"
      };
    },
    computed: {
      isMasonry() {
        return ["masonry", "grid", "1"].includes(this.wfType);
      },
      wfClass() {
        return {
          "wf-grid": this.wfType == "grid"
        };
      },
      columnCount() {
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
      }
    }
  };
  var _sfc_render$a = function render() {
    var _vm = this, _c2 = _vm._self._c;
    return _c2("div", { class: _vm.wfClass }, [_vm.isMasonry ? _c2("masonry", { attrs: { "cols": _vm.columnCount, "gutter": "8px" } }, [_vm._t("default")], 2) : _c2("div", { staticClass: "justified-container" }, [_vm._t("default")], 2)], 1);
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
  var WfLayout = __component__$a.exports;
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
  var mdiDelete = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
  var mdiDownload = "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z";
  var mdiFileClockOutline = "M4 2A2 2 0 0 0 2 4V20A2 2 0 0 0 4 22H12.41A7 7 0 0 0 16 23A7 7 0 0 0 23 16A7 7 0 0 0 18 9.3V8L12 2H4M4 4H11V9H16A7 7 0 0 0 9 16A7 7 0 0 0 10.26 20H4V4M16 11A5 5 0 0 1 21 16A5 5 0 0 1 16 21A5 5 0 0 1 11 16A5 5 0 0 1 16 11M15 12V17L18.61 19.16L19.36 17.94L16.5 16.25V12H15Z";
  var mdiFileGifBox = "M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M10 10.5H7.5V13.5H8.5V12H10V13.7C10 14.4 9.5 15 8.7 15H7.3C6.5 15 6 14.3 6 13.7V10.4C6 9.7 6.5 9 7.3 9H8.6C9.5 9 10 9.7 10 10.3V10.5M13 15H11.5V9H13V15M17.5 10.5H16V11.5H17.5V13H16V15H14.5V9H17.5V10.5Z";
  var mdiFire = "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z";
  var mdiFitToScreenOutline = "M17 4H20C21.1 4 22 4.9 22 6V8H20V6H17V4M4 8V6H7V4H4C2.9 4 2 4.9 2 6V8H4M20 16V18H17V20H20C21.1 20 22 19.1 22 18V16H20M7 18H4V16H2V18C2 19.1 2.9 20 4 20H7V18M16 10V14H8V10H16M18 8H6V16H18V8Z";
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
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
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
    if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
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
    if (!duration || _typeof(duration) !== "object")
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
    if (!duration || _typeof(duration) !== "object")
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
      GM_download({
        url,
        name,
        onload: () => resolve(),
        onerror: (err) => reject(new Error(err.error)),
        ...options
      });
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
    constructor(message) {
      super(message instanceof Error ? message.message : message);
      if (message instanceof Error) {
        this.stack = message.stack;
      } else {
        Error.captureStackTrace(this, BooruError);
      }
      this.name = "BooruError";
    }
  };
  function expandTags(tags2) {
    return tags2.map((v) => {
      const ex = expandedTags[v.toLowerCase()];
      return encodeURIComponent(ex ? ex : v);
    });
  }
  function searchURI(site, tags2 = [], limit = 100, page2 = 1, credentials) {
    if (site.paginate === "pid")
      page2 -= 1;
    let credentialsQuery = "";
    if (credentials == null ? void 0 : credentials.query) {
      const q = credentials.query;
      credentialsQuery = q.startsWith("&") ? q : "&" + q;
    }
    return `http${site.insecure ? "" : "s"}://${site.domain}${site.api.search}${site.tagQuery}=${expandTags(tags2).join(site.tagJoin)}&limit=${limit}&${site.paginate}=${page2}${credentialsQuery}`;
  }
  var defaultOptions = {
    headers: {
      Accept: "application/json, application/xml;q=0.9, */*;q=0.8",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.52"
    }
  };
  function resolveSite(domain) {
    if (typeof domain !== "string") {
      return null;
    }
    domain = domain.toLowerCase();
    for (const site in sites) {
      if (site === domain || sites[site].domain === domain || sites[site].aliases.includes(domain)) {
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
      const page2 = data.html || ((_a2 = data["!doctype"]) == null ? void 0 : _a2.html);
      const message = [];
      if (page2.body.h1) {
        message.push(page2.body.h1);
      }
      if (page2.body.p) {
        message.push(page2.body.p["#text"]);
      }
      throw new BooruError(
        `The Booru sent back an error: '${message.join(": ")}'`
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
    let tags2 = [];
    if (Array.isArray(data.tags)) {
      tags2 = data.tags;
    } else if (data.tags && data.tags.general) {
      tags2 = Object.values(data.tags).reduce(
        (acc, v) => acc = acc.concat(v),
        []
      );
    } else if (typeof data.tags === "string") {
      tags2 = fromTagString(data.tags);
    } else if (typeof data.tag_string === "string") {
      tags2 = fromTagString(data.tag_string);
    }
    return tags2.filter((v) => v !== "");
  }
  function fromTagString(tags2) {
    return tags2.split(" ").map((v) => v.replace(/,/g, ""));
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
    constructor(posts, tags2, options, booru) {
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
      this.tags = tags2;
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
    tagged(tags2, { invert = false } = {}) {
      if (!Array.isArray(tags2)) {
        tags2 = [tags2];
      }
      const posts = [];
      for (const p of this) {
        const m = compareArrays(tags2, p.tags).length;
        if (!invert && m > 0 || invert && m === 0) {
          posts.push(p);
        }
      }
      return new SearchResults(posts, this.tags, this.options, this.booru);
    }
    blacklist(tags2) {
      return this.tagged(tags2, { invert: true });
    }
  };
  var Booru = class {
    constructor(site, credentials) {
      __publicField(this, "domain");
      __publicField(this, "site");
      __publicField(this, "credentials");
      const domain = resolveSite(site.domain);
      if (domain === null) {
        throw new Error(`Invalid site passed: ${site}`);
      }
      this.domain = domain;
      this.site = site;
      this.credentials = credentials;
    }
    async search(tags2, {
      limit = 1,
      random = false,
      page: page2 = 1,
      showUnavailable = false,
      credentials
    } = {}) {
      const fakeLimit = random && !this.site.random ? 100 : 0;
      try {
        const searchResult = await this.doSearchRequest(tags2, {
          limit,
          random,
          page: page2,
          showUnavailable,
          credentials: credentials || this.credentials
        });
        return this.parseSearchResult(searchResult, {
          fakeLimit,
          tags: tags2,
          limit,
          random,
          page: page2,
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
    async doSearchRequest(tags2, {
      uri = null,
      limit = 1,
      random = false,
      page: page2 = 1,
      credentials
    } = {}) {
      if (!Array.isArray(tags2))
        tags2 = [tags2];
      let fakeLimit;
      if (random) {
        if (this.site.random) {
          tags2.push("order:random");
        } else {
          fakeLimit = 100;
        }
      }
      if (this.site.defaultTags) {
        tags2 = tags2.concat(this.site.defaultTags.filter((v) => !tags2.includes(v)));
      }
      const fetchuri = uri || this.getSearchUrl({ tags: tags2, limit: fakeLimit || limit, page: page2, credentials });
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
      tags: tags2 = [],
      limit = 100,
      page: page2 = 1,
      credentials
    }) {
      return searchURI(this.site, tags2, limit, page2, credentials);
    }
    parseSearchResult(result, {
      fakeLimit,
      tags: tags2,
      limit,
      random,
      page: page2,
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
      const options = { limit, random, page: page2, showUnavailable };
      if (tags2 === void 0) {
        tags2 = [];
      }
      if (!Array.isArray(tags2)) {
        tags2 = [tags2];
      }
      if (!showUnavailable) {
        posts = posts.filter((p) => p.available);
      }
      return new SearchResults(posts, tags2, options, this);
    }
  };
  var Booru_default = Booru;
  var Derpibooru = class extends Booru_default {
    constructor(site, credentials) {
      super(site, credentials);
    }
    search(tags2, { limit = 1, random = false, page: page2 = 0 } = {}) {
      if (!Array.isArray(tags2)) {
        tags2 = [tags2];
      }
      if (tags2[0] === void 0) {
        tags2[0] = "*";
      }
      page2 += 1;
      const uri = this.getSearchUrl({ tags: tags2, limit, page: page2 }) + (random && this.site.random === "string" ? `&${this.site.random}` : "") + (this.credentials ? `&key=${this.credentials.token}` : "");
      return super.doSearchRequest(tags2, { limit, random, page: page2, uri }).then(
        (r) => super.parseSearchResult(r, { fakeLimit: 0, tags: tags2, limit, random, page: page2 })
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
      var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i;
      this.domain = data.domain;
      this.type = (_a2 = data.type) != null ? _a2 : "json";
      this.aliases = (_b2 = data.aliases) != null ? _b2 : [];
      this.nsfw = data.nsfw;
      this.api = (_c2 = data.api) != null ? _c2 : {};
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
  function search(site, tags2 = [], { limit = 1, random = false, page: page2 = 1, credentials } = {}) {
    const rSite = resolveSite(site);
    if (typeof limit === "string") {
      limit = parseInt(limit, 10);
    }
    if (rSite === null) {
      throw new BooruError("Site not supported");
    }
    if (!Array.isArray(tags2) && typeof tags2 !== "string") {
      throw new BooruError("`tags` should be an array or string");
    }
    if (typeof limit !== "number" || Number.isNaN(limit)) {
      throw new BooruError("`limit` should be an int");
    }
    const booruSite = new Site(sites[rSite]);
    if (!booruCache[rSite]) {
      booruCache[rSite] = booruFrom(booruSite);
    }
    return booruCache[rSite].search(tags2, { limit, random, page: page2, credentials });
  }
  const blackList = /* @__PURE__ */ new Set(["e621.net", "e926.net", "hypnohub.net", "derpibooru.org"]);
  const siteDomains = Object.keys(sites).filter((e) => !blackList.has(e));
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
  const isPidSite = ((_c = sites[location.host]) == null ? void 0 : _c.paginate) === "pid";
  async function searchBooru(page2, tags2) {
    if (!tags2 || tags2 === "all")
      tags2 = "";
    return search(location.host, tags2, { page: page2, limit: BOORU_PAGE_LIMIT, credentials: { query: store.settings.credentialQuery } });
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
    circle: [i18n.t("ZtQHZx-pEjmu_o3dQD1fc"), "#00bbbbcc"],
    artist: [i18n.t("Ym0HIEu9Q80qXB31LuC6c"), "#FFB11Bf1"],
    copyright: [i18n.t("juT6gwLOg5r1h2vFpFf6P"), "#C1328Ede"],
    character: [i18n.t("aonlPAu9kEkkwNvQg0DBk"), "#00aa00cc"],
    general: ["", "#E87A90cc"],
    faults: ["", "#AB3B3Ada"]
  };
  const isCNLang = i18n.locale.includes("zh");
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
            isCNLang && tagCN && ` [ ${tagCN} ]`
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
  async function fetchPostsByPath(postsKey, page2) {
    const url = new URL(location.href);
    url.pathname += ".json";
    page2 && url.searchParams.set("page", page2.toString());
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
  function pushPageState(pageNo, latePageQuery = false) {
    if (latePageQuery && pageNo > 1)
      pageNo -= 1;
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
  const searchPosts = async (latePageQuery = false) => {
    var _a2;
    store.requestState = true;
    try {
      const posts = await ((_a2 = fetchActions.find((e) => e.test())) == null ? void 0 : _a2.action());
      if (Array.isArray(posts) && posts.length > 0) {
        store.currentPage = page;
        store.imageList = [
          ...store.imageList,
          ...store.showNSFWContents ? posts : posts.filter((e) => ["s", "g"].includes(e.rating))
        ];
        pushPageState(page, latePageQuery);
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
    await searchPosts(true);
    if (store.requestStop)
      return;
    if (location.href.includes("safebooru"))
      return;
    await searchPosts(true);
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
  var _sfc_main$9 = /* @__PURE__ */ Vue2.defineComponent({
    __name: "AppBar",
    setup(__props) {
      const title = Vue2.computed(() => {
        return `${location.host.toUpperCase()} - ${store.imageList.length} Posts - Page `;
      });
      const isNoSelected = Vue2.computed(() => store.selectedImageList.length === 0);
      const isOneOrMoreSelected = Vue2.computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length < store.imageList.length);
      const isAllSelected = Vue2.computed(() => store.selectedImageList.length > 0 && store.selectedImageList.length === store.imageList.length);
      const loadingValue = Vue2.ref(0);
      const selectAll = () => {
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
      };
      const removeFromList = (id) => {
        store.selectedImageList = store.selectedImageList.filter((e) => {
          if (e.loading)
            return true;
          return e.id !== id;
        });
      };
      const tagsQuery = new URLSearchParams(location.search).get("tags");
      const searchState = Vue2.reactive({
        showInput: !!tagsQuery,
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
      const userName = Vue2.ref("");
      Vue2.onMounted(async () => {
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
      const poolQueryTerm = Vue2.ref("");
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
      const downloadUrlKey = Vue2.ref("fileUrl");
      const downloadNameMap = {
        fileUrl: "fileDownloadName",
        jpegUrl: "jpegDownloadName"
      };
      const downloadNameKey = Vue2.computed(() => {
        return downloadNameMap[downloadUrlKey.value] || "fileDownloadName";
      });
      const isGelbooru = location.host.includes("gelbooru");
      const startDownload = async () => {
        try {
          const len = store.selectedImageList.length;
          if (isGelbooru) {
            for (let index = 0; index < len; index++) {
              const item = store.selectedImageList[index];
              const downloadUrl = item[downloadUrlKey.value] || item.fileUrl;
              const downloadName = item[downloadNameKey.value];
              if (!downloadUrl)
                continue;
              download(downloadUrl, `${downloadName}.${downloadUrl.split(".").pop()}`);
            }
            return;
          }
          for (let index = 0; index < len; index++) {
            const item = store.selectedImageList[index];
            const downloadUrl = item[downloadUrlKey.value] || item.fileUrl;
            const downloadName = store.isYKSite ? item.fileNameWithTags : item[downloadNameKey.value];
            if (!downloadUrl)
              continue;
            if (item.loaded)
              continue;
            Vue2.set(item, "loading", true);
            await download(downloadUrl, `${downloadName}.${downloadUrl.split(".").pop()}`);
            Vue2.set(item, "loading", false);
            Vue2.set(item, "loaded", true);
          }
        } catch (error) {
          const msg = error;
          showMsg({ msg, type: "error" });
        }
      };
      const exportFileUrls = async () => {
        const urlText = store.selectedImageList.map((e) => e[downloadUrlKey.value] || e.fileUrl).join("\n");
        await downloadFile(`data:text/plain;charset=utf-8,${store.isYKSite ? decodeURIComponent(urlText) : urlText}`, "image-urls.txt");
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
      const toggleFullscreen = async () => {
        try {
          if (document.fullscreenElement) {
            await document.exitFullscreen();
          } else {
            await document.documentElement.requestFullscreen();
          }
        } catch (error) {
          console.log("toggleFullscreen error: ", error);
        }
      };
      const currentLang = Vue2.ref(i18n.locale);
      const langList = [
        { value: "zh-Hans", label: "\u7B80\u4F53\u4E2D\u6587" },
        { value: "zh-Hant", label: "\u7E41\u9AD4\u4E2D\u6587" },
        { value: "ja", label: "\u65E5\u672C\u8A9E" },
        { value: "en", label: "English" }
      ];
      const selectLang = (val) => {
        currentLang.value = val;
        i18n.locale = val;
        localStorage.setItem("__LANG", val);
      };
      Vue2.onMounted(() => {
        document.addEventListener("fullscreenchange", () => {
          store.isFullscreen = !!document.fullscreenElement;
        });
      });
      return { __sfc: true, title, isNoSelected, isOneOrMoreSelected, isAllSelected, loadingValue, selectAll, removeFromList, tagsQuery, searchState, onSearchTermInput, selectTag, userName, fetchTaggedPosts, showTagsInput, onSearchTermKeydown, showPopAction, periodMap, periodByDateMap, getRecentPeriod, isPopularRecent, getPopTitle, popTitle, isPopSearchByDate, recentPeriod, periodComputedMap, showPopDatePicker, popSearchDate, fetchPopularPosts, selPeriod, loadPrevPeriod, loadNextPeriod, goToPopularPage, showPool, poolQueryTerm, searchPool, download, downloadUrlKey, downloadNameMap, downloadNameKey, isGelbooru, startDownload, exportFileUrls, vuetify, toggleDarkmode, keyActions, goToPage, exitMasonry, toggleFullscreen, currentLang, langList, selectLang, mdiBrightness6, mdiCalendar, mdiCalendarSearch, mdiCheckUnderlineCircle, mdiCheckboxBlankOutline, mdiCheckboxIntermediate, mdiCheckboxMarked, mdiChevronLeft, mdiChevronRight, mdiCog, mdiDelete, mdiDownload, mdiFileClockOutline, mdiFire, mdiFullscreen, mdiFullscreenExit, mdiHome, mdiImageMultiple, mdiLocationExit, mdiMagnify, mdiShuffle, mdiStar, mdiTranslate, store };
    }
  });
  var _sfc_render$9 = function render() {
    var _vm = this, _c2 = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c2("v-app-bar", { attrs: { "app": "", "dense": "", "flat": "", "elevation": 2 } }, [_c2("v-app-bar-nav-icon", { on: { "click": function($event) {
      return _setup.store.toggleDrawer();
    } } }), _setup.store.isYKSite && _setup.showPopAction ? _c2("div", { staticClass: "align-center hidden-sm-and-down", staticStyle: { "display": "flex" } }, [_c2("v-toolbar-title", { staticClass: "mr-4", domProps: { "textContent": _vm._s(_setup.popTitle) } }), _c2("v-switch", { attrs: { "hide-details": "", "label": _setup.isPopSearchByDate ? _vm.$t("nd4UjZy2ILsc-iW9iu7xR") : _vm.$t("elkBQ9moOZ-KMcy5bt_Ts") }, model: { value: _setup.isPopSearchByDate, callback: function($$v) {
      _setup.isPopSearchByDate = $$v;
    }, expression: "isPopSearchByDate" } }), _c2("v-menu", { attrs: { "transition": "slide-y-transition", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "ml-4", attrs: { "small": "" } }, "v-btn", attrs, false), on), [_c2("v-icon", { attrs: { "left": "" } }, [_vm._v(_vm._s(_setup.mdiCalendarSearch))]), _c2("span", { staticStyle: { "margin-bottom": "2px" } }, [_vm._v(_vm._s(_setup.periodComputedMap[_setup.recentPeriod][0]))])], 1)];
    } }], null, false, 638520899) }, [_c2("v-list", { attrs: { "dense": "" } }, _vm._l(_setup.periodComputedMap, function(val, key) {
      return _c2("v-list-item", { key, attrs: { "dense": "" }, on: { "click": function($event) {
        return _setup.selPeriod(key);
      } } }, [_c2("v-list-item-title", [_c2("v-icon", { attrs: { "left": "" } }, [_vm._v(_vm._s(val[1]))]), _c2("span", [_vm._v(_vm._s(val[0]))])], 1)], 1);
    }), 1)], 1), _c2("v-menu", { attrs: { "close-on-content-click": false, "transition": "scale-transition", "offset-y": "", "min-width": "auto" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("div", { directives: [{ name: "show", rawName: "v-show", value: _setup.isPopSearchByDate, expression: "isPopSearchByDate" }], staticClass: "ml-1 align-center", staticStyle: { "display": "flex", "width": "211px" } }, [_c2("v-btn", { attrs: { "icon": "" }, on: { "click": function($event) {
        return _setup.loadPrevPeriod();
      } } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiChevronLeft))])], 1), _c2("v-text-field", _vm._g(_vm._b({ attrs: { "prepend-icon": _setup.mdiCalendar, "readonly": "", "hide-details": "" }, model: { value: _setup.popSearchDate, callback: function($$v) {
        _setup.popSearchDate = $$v;
      }, expression: "popSearchDate" } }, "v-text-field", attrs, false), on)), _c2("v-btn", { attrs: { "icon": "" }, on: { "click": function($event) {
        return _setup.loadNextPeriod();
      } } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiChevronRight))])], 1)], 1)];
    } }], null, false, 4183596848), model: { value: _setup.showPopDatePicker, callback: function($$v) {
      _setup.showPopDatePicker = $$v;
    }, expression: "showPopDatePicker" } }, [_c2("v-date-picker", { attrs: { "no-title": "", "locale": "zh-cn", "weekday-format": () => "" }, on: { "input": function($event) {
      _setup.showPopDatePicker = false;
    } }, model: { value: _setup.popSearchDate, callback: function($$v) {
      _setup.popSearchDate = $$v;
    }, expression: "popSearchDate" } })], 1), _c2("v-btn", { staticClass: "ml-3", attrs: { "icon": "", "href": "/post?_wf=1" } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiHome))])], 1)], 1) : _setup.store.showPostList ? _c2("div", { staticClass: "align-center hidden-sm-and-down", staticStyle: { "display": "flex" } }, [_c2("v-toolbar-title", { staticClass: "hidden-md-and-down", domProps: { "textContent": _vm._s(_setup.title) } }), _c2("input", { staticClass: "ml-1 mr-2 text-center rounded", style: { width: "40px", height: "30px", border: "1px solid #bbb", color: "inherit" }, domProps: { "value": _setup.store.currentPage }, on: { "keyup": function($event) {
      return _setup.goToPage($event);
    } } }), _setup.store.isYKSite ? [_setup.userName ? _c2("v-btn", { attrs: { "title": _vm.$t("HzMBcS2oNGVIoLiHWprim"), "icon": "" }, on: { "click": function($event) {
      return _setup.fetchTaggedPosts(`vote:3:${_setup.userName} order:vote`);
    } } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiStar))])], 1) : _vm._e(), _c2("v-btn", { attrs: { "title": _vm.$t("DXEhXAQbkiCMU_l252jo_"), "icon": "" }, on: { "click": function($event) {
      return _setup.showPool();
    } } }, [_c2("v-icon", { attrs: { "size": 20 } }, [_vm._v(_vm._s(_setup.mdiImageMultiple))])], 1), _c2("v-btn", { attrs: { "title": _vm.$t("9juZMc0gPIgvMPKVORpJ1"), "icon": "" }, on: { "click": function($event) {
      return _setup.goToPopularPage();
    } } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiFire))])], 1), _c2("v-btn", { attrs: { "title": _vm.$t("6acPWiYq2-OdySa2_xqDu"), "icon": "" }, on: { "click": function($event) {
      return _setup.fetchTaggedPosts("order:random");
    } } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiShuffle))])], 1)] : _vm._e(), _c2("v-menu", { attrs: { "max-width": 200, "max-height": "80vh", "transition": "slide-y-transition", "nudge-bottom": "5px", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on }) {
      return [_c2("v-slide-x-transition", [_c2("div", { directives: [{ name: "show", rawName: "v-show", value: _setup.searchState.showInput, expression: "searchState.showInput" }], staticClass: "ml-4", staticStyle: { "width": "200px" } }, [_c2("v-text-field", _vm._g({ attrs: { "hide-details": "" }, on: { "input": _setup.onSearchTermInput, "click": function($event) {
        _setup.searchState.showMenu = true;
      }, "blur": function($event) {
        _setup.searchState.showMenu = false;
      }, "keydown": _setup.onSearchTermKeydown }, model: { value: _setup.searchState.searchTerm, callback: function($$v) {
        _vm.$set(_setup.searchState, "searchTerm", $$v);
      }, expression: "searchState.searchTerm" } }, on))], 1)])];
    } }]), model: { value: _setup.searchState.showMenu, callback: function($$v) {
      _vm.$set(_setup.searchState, "showMenu", $$v);
    }, expression: "searchState.showMenu" } }, [_c2("v-list", { directives: [{ name: "show", rawName: "v-show", value: _setup.store.isYKSite && _setup.searchState.searchItems.length, expression: "store.isYKSite && searchState.searchItems.length" }], staticClass: "ac_tags_list", attrs: { "dense": "" } }, _vm._l(_setup.searchState.searchItems, function(item) {
      return _c2("v-list-item", { key: item, attrs: { "dense": "" }, on: { "click": function($event) {
        return _setup.selectTag(item);
      } } }, [_c2("v-list-item-title", { domProps: { "textContent": _vm._s(item) } })], 1);
    }), 1)], 1), _c2("v-btn", { attrs: { "title": _vm.$t("ZztrWbSaaaas3v0cHtSmh"), "icon": "" }, on: { "click": function($event) {
      return _setup.showTagsInput();
    } } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiMagnify))])], 1)], 2) : _setup.store.showPoolList ? _c2("div", { staticClass: "align-center", staticStyle: { "display": "flex" } }, [_setup.store.showPoolList ? _c2("v-toolbar-title", { staticClass: "mr-3" }, [_vm._v("Pools")]) : _vm._e(), _c2("v-text-field", { attrs: { "hide-details": "", "append-icon": _setup.mdiMagnify }, on: { "keyup": function($event) {
      if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter"))
        return null;
      return _setup.searchPool.apply(null, arguments);
    } }, model: { value: _setup.poolQueryTerm, callback: function($$v) {
      _setup.poolQueryTerm = $$v;
    }, expression: "poolQueryTerm" } }), _c2("v-btn", { staticClass: "ml-3", attrs: { "icon": "", "href": "/post?_wf=1" } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiHome))])], 1), _c2("v-btn", { attrs: { "title": _vm.$t("9juZMc0gPIgvMPKVORpJ1"), "icon": "" }, on: { "click": function($event) {
      return _setup.goToPopularPage();
    } } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiFire))])], 1)], 1) : _vm._e(), _c2("v-spacer"), _setup.store.showPostList ? [_c2("span", { directives: [{ name: "show", rawName: "v-show", value: _setup.store.selectedImageList.length, expression: "store.selectedImageList.length" }], staticClass: "hidden-md-and-down ml-1 mr-1", staticStyle: { "margin-top": "2px" } }, [_vm._v(" " + _vm._s(_setup.store.selectedImageList.length) + " ")]), _c2("v-btn", { staticClass: "hidden-md-and-down", attrs: { "icon": "" }, on: { "click": _setup.selectAll } }, [_c2("v-icon", { directives: [{ name: "show", rawName: "v-show", value: _setup.isNoSelected, expression: "isNoSelected" }] }, [_vm._v(_vm._s(_setup.mdiCheckboxBlankOutline))]), _c2("v-icon", { directives: [{ name: "show", rawName: "v-show", value: _setup.isOneOrMoreSelected, expression: "isOneOrMoreSelected" }] }, [_vm._v(_vm._s(_setup.mdiCheckboxIntermediate))]), _c2("v-icon", { directives: [{ name: "show", rawName: "v-show", value: _setup.isAllSelected, expression: "isAllSelected" }] }, [_vm._v(_vm._s(_setup.mdiCheckboxMarked))])], 1), _c2("v-menu", { attrs: { "dense": "", "offset-y": "", "close-on-content-click": false }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ attrs: { "title": _vm.$t("OKs1ePekQA4Ona839U114"), "icon": "" } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiDownload))])], 1)];
    } }], null, false, 2630575932) }, [_c2("v-list", { staticStyle: { "min-width": "300px", "max-height": "80vh", "overflow": "auto" }, attrs: { "dense": "", "flat": "" } }, [_c2("v-subheader", { staticClass: "ml-2" }, [_c2("span", { staticClass: "mr-4" }, [_vm._v(_vm._s(_vm.$t("OKs1ePekQA4Ona839U114")))]), _c2("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.store.selectedImageList.length > 0, expression: "store.selectedImageList.length > 0" }], attrs: { "small": "" }, on: { "click": _setup.startDownload } }, [_vm._v(" " + _vm._s(_vm.$t("cKn4cfAxzdgh_HD6OFibB")) + " ")]), _c2("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.store.selectedImageList.length > 0, expression: "store.selectedImageList.length > 0" }], staticClass: "ml-2", attrs: { "small": "" }, on: { "click": _setup.exportFileUrls } }, [_vm._v(" " + _vm._s(_vm.$t("J2Ckb_-LITfmww4aEksqk")) + " ")])], 1), _setup.store.isYKSite ? _c2("v-radio-group", { staticClass: "mt-1 ml-3", attrs: { "hide-details": "", "dense": "", "row": "" }, model: { value: _setup.downloadUrlKey, callback: function($$v) {
      _setup.downloadUrlKey = $$v;
    }, expression: "downloadUrlKey" } }, [_c2("v-radio", { attrs: { "label": _vm.$t("aVqN9TBRCbNGsW3Y2D2Nm"), "value": "jpegUrl" } }), _c2("v-radio", { attrs: { "label": _vm.$t("jDjashxA-oBPo19DXI504"), "value": "fileUrl" } })], 1) : _vm._e(), _c2("v-list-item-group", { attrs: { "color": "primary" } }, _vm._l(_setup.store.selectedImageList, function(item) {
      return _c2("v-list-item", { key: item.id, attrs: { "dense": "", "two-line": "" } }, [_c2("v-list-item-avatar", [!item.loading && !item.loaded ? _c2("v-btn", { attrs: { "icon": "" } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiFileClockOutline))])], 1) : _vm._e(), item.loaded ? _c2("v-btn", { attrs: { "icon": "", "color": "green" } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiCheckUnderlineCircle))])], 1) : _vm._e(), item.loading ? _c2("v-progress-circular", { attrs: { "rotate": -90, "size": 28, "value": _setup.loadingValue, "color": "pink" } }) : _vm._e()], 1), _c2("v-list-item-content", { staticStyle: { "max-width": "240px" } }, [_c2("v-list-item-subtitle", { attrs: { "title": item.fileNameWithTags }, domProps: { "textContent": _vm._s(item.fileNameWithTags) } }), _c2("v-list-item-subtitle", { attrs: { "title": item[_setup.downloadUrlKey] }, domProps: { "textContent": _vm._s(item[_setup.downloadUrlKey]) } })], 1), _c2("v-list-item-action", [_c2("v-btn", { attrs: { "icon": "" }, on: { "click": function($event) {
        return _setup.removeFromList(item.id);
      } } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiDelete))])], 1)], 1)], 1);
    }), 1)], 1)], 1)] : _vm._e(), _c2("v-btn", { attrs: { "title": _vm.$t("u8mEnSo4mxDRUbj7FeAll"), "icon": "" }, on: { "click": _setup.toggleDarkmode } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiBrightness6))])], 1), _c2("v-btn", { attrs: { "title": _vm.$t("OrwwNKZ7I70-ecpspE8d_"), "icon": "" }, on: { "click": _setup.toggleFullscreen } }, [_c2("v-icon", { attrs: { "size": 30 } }, [_vm._v(_vm._s(_setup.store.isFullscreen ? _setup.mdiFullscreenExit : _setup.mdiFullscreen))])], 1), _c2("v-menu", { attrs: { "transition": "slide-y-transition", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ attrs: { "title": "Language", "icon": "" } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiTranslate))])], 1)];
    } }]) }, [_c2("v-list", { attrs: { "dense": "" } }, [_c2("v-list-item-group", { attrs: { "color": "primary" }, model: { value: _setup.currentLang, callback: function($$v) {
      _setup.currentLang = $$v;
    }, expression: "currentLang" } }, _vm._l(_setup.langList, function(lang) {
      return _c2("v-list-item", { key: lang.value, attrs: { "value": lang.value, "dense": "" }, on: { "click": function($event) {
        return _setup.selectLang(lang.value);
      } } }, [_c2("v-list-item-title", [_vm._v(_vm._s(lang.label))])], 1);
    }), 1)], 1)], 1), _c2("v-btn", { attrs: { "title": _vm.$t("UxxldE9xRwmQctrvba5Y8"), "icon": "" }, on: { "click": function($event) {
      _setup.store.showSettings = true;
    } } }, [_c2("v-icon", { attrs: { "size": 22 } }, [_vm._v(_vm._s(_setup.mdiCog))])], 1), _c2("v-btn", { attrs: { "title": _vm.$t("ClZdL9hGweOokP7Mn_Ptq"), "icon": "" }, on: { "click": _setup.exitMasonry } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiLocationExit))])], 1), _c2("v-progress-linear", { attrs: { "active": _setup.store.requestState, "height": 6, "color": "deep-purple accent-4", "indeterminate": "", "absolute": "", "bottom": "" } })], 2);
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
  var AppBar = __component__$9.exports;
  var _sfc_main$8 = /* @__PURE__ */ Vue2.defineComponent({
    __name: "NavDrawer",
    setup(__props) {
      const siteLinks = Vue2.ref(siteDomains);
      const userName = Vue2.ref("");
      const version = Vue2.ref(GM_info.script.version);
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
      const dealFavicon = (link) => {
        if (link.includes("konachan"))
          return "https://upload-bbs.miyoushe.com/upload/2023/01/14/190122060/cbd0b71ead30e0777e5b023170ba415c_4819570566325089051.png";
        if (link.includes("behoimi"))
          return "https://upload-bbs.miyoushe.com/upload/2023/01/14/190122060/d3b97f45046795c87c12ad5704074f32_1333245617164582614.png";
        return `https://${link}/favicon.ico`;
      };
      const actSiteIndex = Vue2.computed(() => {
        return siteDomains.findIndex((e) => location.host.includes(e));
      });
      const showSettingDrawer = () => {
        store.showDrawer = false;
        store.showSettings = true;
      };
      Vue2.onMounted(async () => {
        if (store.isYKSite) {
          const name = await getUsername();
          if (name)
            userName.value = name;
        }
      });
      return { __sfc: true, siteLinks, userName, version, openLink, dealLink, dealFavicon, actSiteIndex, showSettingDrawer, mdiAccount, mdiFire, mdiGithub, mdiImageMultiple, mdiInformationOutline, mdiMessageAlertOutline, mdiShuffle, mdiStar, mdiWeb, store };
    }
  });
  var _sfc_render$8 = function render() {
    var _vm = this, _c2 = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c2("v-navigation-drawer", { staticClass: "nav_drawer", attrs: { "app": "", "temporary": "" }, model: { value: _setup.store.showDrawer, callback: function($$v) {
      _vm.$set(_setup.store, "showDrawer", $$v);
    }, expression: "store.showDrawer" } }, [_c2("v-list-item", [_c2("v-list-item-avatar", [_c2("img", { attrs: { "width": "40", "src": "https://upload-bbs.mihoyo.com/upload/2022/09/07/190122060/8505ff4b535cb1487b521d73c7f71d63_865024295271530650.png", "alt": "", "loading": "lazy" } })]), _c2("v-list-item-content", [_c2("v-list-item-title", { staticClass: "title" }, [_vm._v("Booru Masonry")]), _c2("v-list-item-subtitle", { attrs: { "title": _vm.$t("l8CbIALt_VWUnzBl_Rmgf") } }, [_vm._v(_vm._s(_vm.$t("l8CbIALt_VWUnzBl_Rmgf")))])], 1)], 1), _c2("v-divider"), _setup.store.isYKSite ? _c2("v-list", { attrs: { "dense": "", "nav": "" } }, [_c2("v-list-group", { attrs: { "value": true, "no-action": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function() {
      return [_c2("v-list-item-content", [_c2("v-list-item-title", { staticClass: "title" }, [_vm._v(_vm._s(_vm.$t("CacM8tispuPNrSxxpt9GX")))])], 1)];
    }, proxy: true }], null, false, 765759728) }, [_setup.userName ? _c2("v-list-item", { attrs: { "link": "", "href": "/user/home" } }, [_c2("v-list-item-icon", { staticClass: "mr-2" }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiAccount))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_setup.userName))])], 1)], 1) : _vm._e(), _setup.userName ? _c2("v-list-item", { attrs: { "link": "", "href": `/post?tags=vote%3A3%3A${_setup.userName}+order%3Avote&_wf=1` } }, [_c2("v-list-item-icon", { staticClass: "mr-2" }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiStar))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("zs8YTCc8d8XFUgRnp7m_w")))])], 1)], 1) : _vm._e(), _c2("v-list-item", { attrs: { "link": "", "href": "/pool?page=1" } }, [_c2("v-list-item-icon", { staticClass: "mr-2" }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiImageMultiple))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("DXEhXAQbkiCMU_l252jo_")))])], 1)], 1), _c2("v-list-item", { attrs: { "link": "", "href": "/post/popular_recent?period=1d" } }, [_c2("v-list-item-icon", { staticClass: "mr-2" }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiFire))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("7Cgsr4PUMbezDXNfWdvWH")))])], 1)], 1), _c2("v-list-item", { attrs: { "link": "", "href": "/post?tags=order%3Arandom&page=1" } }, [_c2("v-list-item-icon", { staticClass: "mr-2" }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiShuffle))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("StU1-52QJmNFKQ5soJCyG")))])], 1)], 1)], 1)], 1) : _vm._e(), _c2("v-list", { attrs: { "dense": "", "nav": "" } }, [_c2("v-list-group", { attrs: { "value": true, "no-action": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function() {
      return [_c2("v-list-item-content", [_c2("v-list-item-title", { staticClass: "title" }, [_vm._v(_vm._s(_vm.$t("e2_EYvweJsVoIZlIWkPRV")))])], 1)];
    }, proxy: true }]) }, [_c2("v-list-item-group", { attrs: { "value": _setup.actSiteIndex, "color": "primary" } }, [_vm._l(_setup.siteLinks, function(link) {
      return _c2("v-list-item", { key: link, attrs: { "href": _setup.dealLink(link) } }, [_c2("v-list-item-icon", { staticClass: "mr-2" }, [_c2("img", { staticClass: "site_icon", attrs: { "src": _setup.dealFavicon(link), "loading": "lazy" } })]), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(link.toUpperCase()))])], 1)], 1);
    }), _c2("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://www.nanoka.top/illust/pixiv/");
    } } }, [_c2("v-list-item-icon", { staticClass: "mr-2" }, [_c2("img", { staticClass: "site_icon", attrs: { "src": "https://www.nanoka.top/images/favicon.ico", "loading": "lazy" } })]), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("Pixiv Ranking")])], 1)], 1), _c2("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://pixiv.kanata.ml");
    } } }, [_c2("v-list-item-icon", { staticClass: "mr-2" }, [_c2("img", { staticClass: "site_icon", attrs: { "src": "https://pixiv.kanata.ml/favicon.ico", "loading": "lazy" } })]), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("Pixiv Viewer")])], 1)], 1)], 2)], 1)], 1), _c2("v-list", { attrs: { "dense": "", "nav": "" } }, [_c2("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.showSettingDrawer();
    } } }, [_c2("v-list-item-content", [_c2("v-list-item-title", { staticClass: "title" }, [_vm._v(_vm._s(_vm.$t("UxxldE9xRwmQctrvba5Y8")))])], 1)], 1)], 1), _c2("v-list", { attrs: { "dense": "", "nav": "" } }, [_c2("v-list-group", { attrs: { "value": true, "no-action": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function() {
      return [_c2("v-list-item-content", [_c2("v-list-item-title", { staticClass: "title" }, [_vm._v(_vm._s(_vm.$t("PT74UDfKA45vTVTst_-hD")))])], 1)];
    }, proxy: true }]) }, [_c2("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://github.com/asadahimeka/yandere-masonry/blob/main/CHANGELOG.md");
    } } }, [_c2("v-list-item-icon", { staticClass: "mr-2" }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiInformationOutline))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("v" + _vm._s(_setup.version))]), _c2("v-list-item-subtitle", [_vm._v(_vm._s(_vm.$t("iJ0h220tvMmUhkfIMYI-W")))])], 1)], 1), _c2("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://booru.kanata.ml");
    } } }, [_c2("v-list-item-icon", { staticClass: "mr-2" }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiWeb))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("qWcqQRsE9nN43MaZ2BmN9")))]), _c2("v-list-item-subtitle", [_vm._v(_vm._s(_vm.$t("jerGO2OCuW9TdnEnGYRWd")))])], 1)], 1), _c2("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://github.com/asadahimeka/yandere-masonry/issues");
    } } }, [_c2("v-list-item-icon", { staticClass: "mr-2" }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiMessageAlertOutline))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("23iEYyiQlLVhFIqGbj527")))]), _c2("v-list-item-subtitle", [_vm._v(_vm._s(_vm.$t("4g1TUy2kwQrdOs-w4JobB")))])], 1)], 1), _c2("v-list-item", { attrs: { "link": "" }, on: { "click": function($event) {
      return _setup.openLink("https://github.com/asadahimeka/yandere-masonry");
    } } }, [_c2("v-list-item-icon", { staticClass: "mr-2" }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiGithub))])], 1), _c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v("Github")]), _c2("v-list-item-subtitle", [_vm._v(_vm._s(_vm.$t("7Xq5puLNcT0mAvoxElqdf")))])], 1)], 1)], 1)], 1)], 1);
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
  var NavDrawer = __component__$8.exports;
  var _sfc_main$7 = /* @__PURE__ */ Vue2.defineComponent({
    __name: "SettingsDrawer",
    setup(__props) {
      const onComboboxChange = (val) => {
        localStorage.setItem("__blacklist", val.join(","));
      };
      const removeTagFromBlacklist = (item) => {
        store.blacklist.splice(store.blacklist.indexOf(item), 1);
        localStorage.setItem("__blacklist", store.blacklist.join(","));
      };
      const nsfwValue = Vue2.ref(store.showNSFWContents);
      const setNSFWShow = (val) => {
        const flag = val !== "0";
        store.showNSFWContents = flag;
        nsfwValue.value = flag;
        localStorage.setItem("__showNSFW", val);
        location.reload();
      };
      const onNSFWSwitchChange = (val) => {
        setNSFWShow(val ? "1" : "0");
      };
      const onWheelSwitchChange = (val) => {
        localStorage.setItem("__listenWheel", val ? "1" : "0");
        location.reload();
      };
      const onKeyupSwitchChange = (val) => {
        localStorage.setItem("__listenKeyup", val ? "1" : "0");
        location.reload();
      };
      const onImgPreloadChange = (val) => {
        localStorage.setItem("__fullImgPreload", val ? "1" : "");
        location.reload();
      };
      const layoutTypes = Vue2.ref([
        ["masonry", `Masonry/${i18n.t("6jPGehET9TViankl5-SRu")}`],
        ["grid", `Grid/${i18n.t("vfUg8xP6WptIhSL0E9b9D")}`],
        ["flexbin", `Justified/${i18n.t("LZbI8am7nD-LiemZzroFF")}`]
      ]);
      const actLayout = Vue2.computed(() => {
        var _a2, _b2, _c2;
        return (_c2 = (_b2 = (_a2 = layoutTypes.value.find((e) => e[0] === store.settings.masonryLayout)) == null ? void 0 : _a2[1]) == null ? void 0 : _b2.split("/")) == null ? void 0 : _c2[0];
      });
      const actLayoutIndex = Vue2.computed(() => {
        return layoutTypes.value.findIndex((e) => e[0] === store.settings.masonryLayout);
      });
      const onMasonryLayoutChange = (val) => {
        localStorage.setItem("__masonryLayout", val);
        location.reload();
      };
      const onCredentialQueryChange = (val) => {
        localStorage.setItem("__credentialQuery", val);
      };
      const onPreloadNumBlur = (ev) => {
        const input = ev.target;
        if (input.validationMessage) {
          input.value = "1";
          store.imgPreloadNum = 1;
          localStorage.setItem("__imgPreloadNum", "1");
        } else {
          const num = Number(input.value) || 1;
          store.imgPreloadNum = num;
          localStorage.setItem("__imgPreloadNum", num.toString());
        }
      };
      const colList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20];
      const cols = Vue2.ref(colList.reduce((acc, cur) => {
        acc[cur] = cur === 0 ? i18n.t("uxIs3XkeVzkrEX985zHk3").toString() : `${cur} ${i18n.t("dU7ou5kVM0s9DMju5e2tS")}`;
        return acc;
      }, {}));
      const actCol = Vue2.computed(() => {
        return colList.findIndex((e) => e.toString() === store.selectedColumn);
      });
      const selColumn = (val) => {
        store.selectedColumn = val;
        localStorage.setItem("__masonry_col", val);
      };
      return { __sfc: true, onComboboxChange, removeTagFromBlacklist, nsfwValue, setNSFWShow, onNSFWSwitchChange, onWheelSwitchChange, onKeyupSwitchChange, onImgPreloadChange, layoutTypes, actLayout, actLayoutIndex, onMasonryLayoutChange, onCredentialQueryChange, onPreloadNumBlur, colList, cols, actCol, selColumn, mdiChevronDown, mdiClose, store };
    }
  });
  var _sfc_render$7 = function render() {
    var _vm = this, _c2 = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c2("v-navigation-drawer", { staticClass: "nav_drawer", attrs: { "width": 400, "app": "", "temporary": "", "right": "" }, model: { value: _setup.store.showSettings, callback: function($$v) {
      _vm.$set(_setup.store, "showSettings", $$v);
    }, expression: "store.showSettings" } }, [_c2("v-list-item", [_c2("v-list-item-content", [_c2("v-list-item-title", { staticClass: "title" }, [_vm._v(_vm._s(_vm.$t("UxxldE9xRwmQctrvba5Y8")))])], 1), _c2("v-list-item-icon", { on: { "click": function($event) {
      _setup.store.showSettings = false;
    } } }, [_c2("v-btn", { attrs: { "icon": "" } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiClose))])], 1)], 1)], 1), _c2("v-divider"), _c2("v-list", { attrs: { "dense": "", "nav": "" } }, [_c2("v-list-item", { staticClass: "mb-0" }, [_c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("_Efl8k8uYQj9iJmj3kwbd")))]), _c2("v-list-item-subtitle", { attrs: { "title": _vm.$t("jMod2JozzAnwHuD-3KuPb") } }, [_vm._v(_vm._s(_vm.$t("jMod2JozzAnwHuD-3KuPb")))])], 1)], 1), _c2("v-list-item", { staticClass: "pa-0" }, [_c2("v-list-item-content", { staticClass: "pt-0" }, [_c2("v-combobox", { staticClass: "blacklist_combobox ma-0 pa-0", attrs: { "append-icon": null, "items": [], "hide-details": "", "hide-no-data": "", "multiple": "", "outlined": "", "dense": "", "chips": "" }, on: { "change": _setup.onComboboxChange }, scopedSlots: _vm._u([{ key: "selection", fn: function({ item }) {
      return [_c2("v-chip", { attrs: { "label": "", "small": "", "outlined": "", "close": "" }, on: { "click:close": function($event) {
        return _setup.removeTagFromBlacklist(item);
      } } }, [_c2("span", [_vm._v(_vm._s(item))])])];
    } }]), model: { value: _setup.store.blacklist, callback: function($$v) {
      _vm.$set(_setup.store, "blacklist", $$v);
    }, expression: "store.blacklist" } })], 1)], 1), _c2("v-list-item", { staticClass: "mb-0" }, [_c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("RstKmO7YVQMpaDoucxUel")))]), _c2("v-list-item-subtitle", { attrs: { "title": _vm.$t("1F-R4qChHIzZaohu5GJzl") } }, [_vm._v(_vm._s(_vm.$t("1F-R4qChHIzZaohu5GJzl")))])], 1)], 1), _c2("v-list-item", { staticClass: "pa-0" }, [_c2("v-list-item-content", { staticClass: "pt-0" }, [_c2("v-text-field", { staticClass: "blacklist_combobox ma-0 pa-0", attrs: { "hide-details": "", "outlined": "", "dense": "" }, on: { "change": _setup.onCredentialQueryChange }, model: { value: _setup.store.settings.credentialQuery, callback: function($$v) {
      _vm.$set(_setup.store.settings, "credentialQuery", $$v);
    }, expression: "store.settings.credentialQuery" } })], 1)], 1), _c2("v-list-item", [_c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("Lm_HFVHpv4XCjilV3NLKu")))]), _c2("v-list-item-subtitle", { attrs: { "title": _vm.$t("A16qoBulYQJLbHe9mqNwm") } }, [_vm._v(_vm._s(_vm.$t("A16qoBulYQJLbHe9mqNwm")))])], 1), _c2("v-list-item-action", [_c2("v-switch", { attrs: { "color": "deep-orange darken-1" }, on: { "change": _setup.onNSFWSwitchChange }, model: { value: _setup.nsfwValue, callback: function($$v) {
      _setup.nsfwValue = $$v;
    }, expression: "nsfwValue" } })], 1)], 1), _c2("v-list-item", [_c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("_nQfaNuwbvPAIFKOY6_7u")))]), _c2("v-list-item-subtitle", { attrs: { "title": _vm.$t("SIUUZ4wqJTOilEdcX3EOi") } }, [_vm._v(_vm._s(_vm.$t("SIUUZ4wqJTOilEdcX3EOi")))])], 1), _c2("v-list-item-action", [_c2("v-switch", { on: { "change": _setup.onWheelSwitchChange }, model: { value: _setup.store.isListenWheelEvent, callback: function($$v) {
      _vm.$set(_setup.store, "isListenWheelEvent", $$v);
    }, expression: "store.isListenWheelEvent" } })], 1)], 1), _c2("v-list-item", [_c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("fVE5taO6GDTPbILat4GCt")))]), _c2("v-list-item-subtitle", { attrs: { "title": _vm.$t("w95XGurDhDfOfw7XH4JFW") } }, [_vm._v(_vm._s(_vm.$t("w95XGurDhDfOfw7XH4JFW")))])], 1), _c2("v-list-item-action", [_c2("v-switch", { on: { "change": _setup.onKeyupSwitchChange }, model: { value: _setup.store.settings.isListenKeyupEvent, callback: function($$v) {
      _vm.$set(_setup.store.settings, "isListenKeyupEvent", $$v);
    }, expression: "store.settings.isListenKeyupEvent" } })], 1)], 1), _c2("v-list-item", [_c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("kFcteLMfnoezhOwuTlLFC")))]), _c2("v-list-item-subtitle", { attrs: { "title": _vm.$t("FT1uJs8XG__n5qBvuFsH4") } }, [_vm._v(_vm._s(_vm.$t("FT1uJs8XG__n5qBvuFsH4")))])], 1), _c2("v-list-item-action", [_c2("v-switch", { on: { "change": _setup.onImgPreloadChange }, model: { value: _setup.store.isFullImgPreload, callback: function($$v) {
      _vm.$set(_setup.store, "isFullImgPreload", $$v);
    }, expression: "store.isFullImgPreload" } })], 1)], 1), _setup.store.isFullImgPreload ? _c2("v-list-item", [_c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("G3b7rbyQEj3_rgzVsNJZY")))]), _c2("v-list-item-subtitle", { attrs: { "title": _vm.$t("iRt9V9wNQASic3D7-wTZo") } }, [_vm._v(_vm._s(_vm.$t("iRt9V9wNQASic3D7-wTZo")))])], 1), _c2("v-list-item-action", { staticClass: "pl-1" }, [_c2("input", { staticClass: "text-center rounded preload_num", attrs: { "type": "number", "min": "0", "max": "5" }, domProps: { "value": _setup.store.imgPreloadNum }, on: { "blur": _setup.onPreloadNumBlur } })])], 1) : _vm._e(), _c2("v-list-item", [_c2("v-list-item-content", [_c2("v-list-item-title", { attrs: { "title": _vm.$t("kop_-39vkeg-bz2wztJ9O") } }, [_vm._v(_vm._s(_vm.$t("kop_-39vkeg-bz2wztJ9O")))]), _c2("v-list-item-subtitle", { attrs: { "title": "Masonry/Grid/Justified" } }, [_vm._v("Masonry/Grid/Justified")])], 1), _c2("v-list-item-action", [_c2("v-menu", { attrs: { "transition": "slide-y-transition", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "sel_menu_btn", staticStyle: { "max-width": "100px" }, attrs: { "small": "" } }, "v-btn", attrs, false), on), [_vm._v(" " + _vm._s(_setup.actLayout) + " "), _c2("v-icon", { attrs: { "size": 16 } }, [_vm._v(_vm._s(_setup.mdiChevronDown))])], 1)];
    } }]) }, [_c2("v-list", { attrs: { "dense": "" } }, [_c2("v-list-item-group", { attrs: { "value": _setup.actLayoutIndex, "color": "primary" } }, _vm._l(_setup.layoutTypes, function(item) {
      return _c2("v-list-item", { key: item[0], attrs: { "dense": "" }, on: { "click": function($event) {
        return _setup.onMasonryLayoutChange(item[0]);
      } } }, [_c2("v-list-item-title", { domProps: { "textContent": _vm._s(item[1]) } })], 1);
    }), 1)], 1)], 1)], 1)], 1), _setup.store.settings.masonryLayout !== "flexbin" ? _c2("v-list-item", [_c2("v-list-item-content", [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("tt_YdgKCA_5m-aSTSMPQ_")))]), _c2("v-list-item-subtitle", { attrs: { "title": _vm.$t("rXjhc8VuGloy1wZ09noNB") } }, [_vm._v(_vm._s(_vm.$t("rXjhc8VuGloy1wZ09noNB")))])], 1), _c2("v-list-item-action", [_c2("v-menu", { attrs: { "transition": "slide-y-transition", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "sel_menu_btn", attrs: { "small": "" } }, "v-btn", attrs, false), on), [_c2("span", { staticStyle: { "margin-bottom": "2px" } }, [_vm._v(_vm._s(_setup.store.selectedColumn === "0" ? _vm.$t("uxIs3XkeVzkrEX985zHk3") : _setup.store.selectedColumn + _vm.$t("dU7ou5kVM0s9DMju5e2tS")))]), _c2("v-icon", { attrs: { "size": 16 } }, [_vm._v(_vm._s(_setup.mdiChevronDown))])], 1)];
    } }], null, false, 2104038103) }, [_c2("v-list", { attrs: { "dense": "" } }, [_c2("v-list-item-group", { attrs: { "value": _setup.actCol, "color": "primary" } }, _vm._l(_setup.cols, function(val, key) {
      return _c2("v-list-item", { key, attrs: { "dense": "" }, on: { "click": function($event) {
        return _setup.selColumn(key);
      } } }, [_c2("v-list-item-title", { domProps: { "textContent": _vm._s(val) } })], 1);
    }), 1)], 1)], 1)], 1)], 1) : _vm._e()], 1)], 1);
  };
  var _sfc_staticRenderFns$7 = [];
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
  var SettingsDrawer = __component__$7.exports;
  const _sfc_main$6 = {
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
        await loadScript("https://unpkg.com/dplayer@1.27.0/dist/DPlayer.min.js");
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
  const _sfc_render$6 = null;
  const _sfc_staticRenderFns$6 = null;
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
  var DPlayer = __component__$6.exports;
  var _sfc_main$5 = /* @__PURE__ */ Vue2.defineComponent({
    __name: "PostDetail",
    setup(__props) {
      const showImageToolbar = Vue2.ref(true);
      const imgLoading = Vue2.ref(true);
      const innerWidth = Vue2.ref(window.innerWidth);
      const innerHeight = Vue2.ref(window.innerHeight);
      const downloading = Vue2.ref(false);
      const scaleOn = Vue2.ref(false);
      const showTagChipGroup = Vue2.ref(localStorage.getItem("__showTags") == "1");
      const toggleTagsShow = () => {
        showTagChipGroup.value = !showTagChipGroup.value;
        localStorage.setItem("__showTags", showTagChipGroup.value ? "1" : "");
      };
      const imageSelected = Vue2.computed(() => {
        var _a2;
        return (_a2 = store.imageList[store.imageSelectedIndex]) != null ? _a2 : {};
      });
      const isVideo = Vue2.computed(() => [".mp4", ".webm"].some((e) => {
        var _a2;
        return (_a2 = imageSelected.value.fileUrl) == null ? void 0 : _a2.endsWith(e);
      }));
      const imgSrc = Vue2.computed(() => {
        var _a2, _b2;
        if (isVideo.value)
          return void 0;
        return (_b2 = (_a2 = imageSelected.value.sampleUrl) != null ? _a2 : imageSelected.value.fileUrl) != null ? _b2 : void 0;
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
      const toggleToolbar = () => {
        if (scaleOn.value)
          return;
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
        const { sourceUrl } = imageSelected.value;
        if (!isURL(sourceUrl))
          return;
        window.open(sourceUrl, "_blank", "noreferrer");
      };
      const download = async (url, name) => {
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
        try {
          downloading.value = true;
          await downloadFile(url, `${name}.${url.split(".").pop()}`);
          downloading.value = false;
        } catch (error) {
          downloading.value = false;
          showMsg({ msg: `${i18n.t("FAqj5ONm50QMfIt9Vq2p1")}: ${error}`, type: "error" });
        }
      };
      const addToList = () => {
        store.addToSelectedList(imageSelected.value);
      };
      const close = () => {
        store.showImageSelected = false;
      };
      const onDtlContClick = (ev) => {
        const el = ev.target;
        if (el.className.includes("img_detail_cont")) {
          close();
        }
      };
      const postDetail = Vue2.ref({});
      const addFavorite = async () => {
        if (notYKSite.value || postDetail.value.voted)
          return;
        const isSuccess = await addPostToFavorites(imageSelected.value.id);
        if (isSuccess)
          postDetail.value.voted = true;
      };
      const setPostDetail = async () => {
        if (store.isYKSite) {
          postDetail.value = {
            voted: false,
            tags: []
          };
          const result = await getPostDetail(imageSelected.value.id);
          if (result)
            postDetail.value = result;
        } else {
          postDetail.value = {
            voted: false,
            tags: imageSelected.value.tags.map((e) => ({
              tag: e,
              tagText: e,
              color: "#8F77B5",
              type: "general"
            }))
          };
        }
      };
      const preloadImgEl = new Image();
      const preloadImg = (src) => {
        console.log("preloadImg: ", src);
        return new Promise((resolve, reject) => {
          preloadImgEl.src = src;
          preloadImgEl.onload = resolve;
          preloadImgEl.onerror = reject;
        });
      };
      const preloadNextImg = async () => {
        if (!store.isFullImgPreload)
          return;
        if (isVideo.value)
          return;
        for (let index = 1; index <= store.imgPreloadNum; index++) {
          console.log("index: ", index);
          const next = store.imageList[store.imageSelectedIndex + index];
          if (!next)
            break;
          const imgSrc2 = (scaleOn.value ? next.jpegUrl : next.sampleUrl) || next.fileUrl;
          await preloadImg(imgSrc2 || "");
        }
      };
      const isVideoShow = Vue2.ref(true);
      const toggleVideoShow = async () => {
        isVideoShow.value = false;
        await Vue2.nextTick();
        isVideoShow.value = true;
      };
      const showPreviewThumb = Vue2.ref(true);
      const showPrevPost = async () => {
        if (store.imageSelectedIndex == 0)
          return;
        if (showPreviewThumb.value) {
          showPreviewThumb.value = false;
        }
        imgLoading.value = true;
        store.imageSelectedIndex--;
        isVideo.value && toggleVideoShow();
        await setPostDetail();
      };
      const showNextPost = async () => {
        if (showPreviewThumb.value) {
          showPreviewThumb.value = false;
        }
        if (store.imageSelectedIndex >= store.imageList.length - 1) {
          if (store.requestState || store.requestStop)
            return;
          await searchPosts();
        }
        imgLoading.value = true;
        store.imageSelectedIndex++;
        isVideo.value && toggleVideoShow();
        await setPostDetail();
        preloadNextImg();
      };
      const onImageLoadError = () => {
        imgLoading.value = false;
        imageSelected.value.sampleUrl = null;
      };
      const scaleImgSrc = Vue2.computed(() => {
        return scaleOn.value ? imageSelected.value.jpegUrl || imageSelected.value.fileUrl || void 0 : void 0;
      });
      const onScaleImgError = () => {
        imageSelected.value.data.jpeg_url = null;
      };
      const scaleImgStyleMap = {
        FitToPage: { maxWidth: "100vw", maxHeight: "100vh" },
        FitToWidth: { width: "100vw" },
        FitToHeight: { height: "100vh" },
        Original: {}
      };
      const imgScaleState = Vue2.ref("Original");
      const imgRotateDeg = Vue2.ref(0);
      const rotateImg = () => {
        imgScaleState.value = "FitToPage";
        imgRotateDeg.value += 90;
      };
      const scaleImgStyle = Vue2.computed(() => ({
        ...scaleImgStyleMap[imgScaleState.value],
        "transform": `rotate(${imgRotateDeg.value}deg)`,
        "transform-origin": "center center"
      }));
      let clearDragEv;
      const zoomInImg = async () => {
        scaleOn.value = true;
        if (imageSelected.value.sampleUrl) {
          imgLoading.value = true;
        }
        await Vue2.nextTick();
        clearDragEv = dragElement(".img_scale_scroll", ".img_detail_scale");
      };
      const zoomOutImg = () => {
        scaleOn.value = false;
        imgRotateDeg.value = 0;
        clearDragEv == null ? void 0 : clearDragEv();
      };
      const reqFullscreen = async () => {
        try {
          if (document.fullscreenElement)
            return;
          const img = document.querySelector(".img_detail_scale");
          await (img == null ? void 0 : img.requestFullscreen());
        } catch (error) {
          console.log("toggleFullscreen error: ", error);
        }
      };
      Vue2.watch(() => store.showImageSelected, async (val) => {
        if (val) {
          imgLoading.value = true;
          await setPostDetail();
          preloadNextImg();
        } else {
          scaleOn.value = false;
          postDetail.value = {};
          await Vue2.nextTick();
          showPreviewThumb.value = true;
        }
      });
      const onResize = () => {
        innerWidth.value = window.innerWidth;
        innerHeight.value = window.innerHeight;
      };
      const isTriggerEvent = Vue2.computed(() => {
        if (!store.showImageSelected)
          return false;
        if (isVideo.value)
          return false;
        if (scaleOn.value && imgScaleState.value !== "FitToPage")
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
        }
      }, 500, true);
      Vue2.onMounted(() => {
        window.addEventListener("resize", onResize);
        store.isListenWheelEvent && window.addEventListener("wheel", onWheel);
        store.settings.isListenKeyupEvent && window.addEventListener("keyup", onKeyup);
      });
      Vue2.onUnmounted(() => {
        window.removeEventListener("resize", onResize);
        store.isListenWheelEvent && window.removeEventListener("wheel", onWheel);
        store.settings.isListenKeyupEvent && window.removeEventListener("keyup", onKeyup);
      });
      return { __sfc: true, showImageToolbar, imgLoading, innerWidth, innerHeight, downloading, scaleOn, showTagChipGroup, toggleTagsShow, imageSelected, isVideo, imgSrc, imgLasySrc, imageSelectedWidth, notYKSite, toggleToolbar, toTagsPage, toDetailPage, toSourcePage, download, addToList, close, onDtlContClick, postDetail, addFavorite, setPostDetail, preloadImgEl, preloadImg, preloadNextImg, isVideoShow, toggleVideoShow, showPreviewThumb, showPrevPost, showNextPost, onImageLoadError, scaleImgSrc, onScaleImgError, scaleImgStyleMap, imgScaleState, imgRotateDeg, rotateImg, scaleImgStyle, clearDragEv, zoomInImg, zoomOutImg, reqFullscreen, onResize, isTriggerEvent, onWheel, onKeyup, mdiChevronLeft, mdiChevronRight, mdiClose, mdiDownload, mdiFitToScreenOutline, mdiFullscreen, mdiHeart, mdiHeartPlusOutline, mdiLaunch, mdiLinkVariant, mdiLoupe, mdiMagnifyMinusOutline, mdiMagnifyPlusOutline, mdiPlaylistPlus, mdiRotateRight, mdiTableSplitCell, mdiTagMultiple, DPlayer, store };
    }
  });
  var _sfc_render$5 = function render() {
    var _a2, _b2;
    var _vm = this, _c2 = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c2("v-dialog", { attrs: { "fullscreen": "" }, model: { value: _setup.store.showImageSelected, callback: function($$v) {
      _vm.$set(_setup.store, "showImageSelected", $$v);
    }, expression: "store.showImageSelected" } }, [_setup.store.showImageSelected ? _c2("div", { staticClass: "img_detail_cont", on: { "click": _setup.onDtlContClick } }, [_setup.isVideo ? [_setup.isVideoShow ? _c2(_setup.DPlayer, { style: `width: ${_setup.imageSelectedWidth > _setup.imageSelected.width ? _setup.imageSelected.width : _setup.imageSelectedWidth}px`, attrs: { "options": { theme: "#8E24AA", autoplay: true, loop: true, video: { url: _setup.imageSelected.fileUrl } } } }) : _vm._e()] : _c2("div", { class: { img_scale_scroll: _setup.scaleOn, img_scale_normal: !_setup.scaleOn }, attrs: { "draggable": "false" } }, [_c2("v-row", { directives: [{ name: "show", rawName: "v-show", value: _setup.imgLoading, expression: "imgLoading" }], staticClass: "img_detail_loading" }, [_setup.showPreviewThumb && !_setup.scaleOn ? _c2("img", { attrs: { "src": _setup.imgLasySrc, "width": _setup.imageSelectedWidth, "alt": "" } }) : _vm._e(), _c2("v-progress-circular", { attrs: { "size": 100, "width": 6, "indeterminate": "", "color": "deep-purple" } })], 1), !_setup.scaleOn ? _c2("img", { staticClass: "img_detail_sample", attrs: { "src": _setup.imgSrc, "width": _setup.imgLoading ? 0 : _setup.imageSelectedWidth, "alt": "" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.toggleToolbar.apply(null, arguments);
    }, "load": function($event) {
      _setup.imgLoading = false;
    }, "error": _setup.onImageLoadError } }) : _vm._e(), _setup.scaleOn ? _c2("img", { staticClass: "img_detail_scale", style: _setup.scaleImgStyle, attrs: { "src": _setup.scaleImgSrc, "alt": "", "draggable": "false" }, on: { "load": function($event) {
      _setup.imgLoading = false;
    }, "error": _setup.onScaleImgError } }) : _vm._e()], 1)], 2) : _vm._e(), _c2("v-toolbar", { directives: [{ name: "show", rawName: "v-show", value: _setup.showImageToolbar && _setup.scaleOn && !_setup.isVideo, expression: "showImageToolbar && scaleOn && !isVideo" }], staticClass: "img_detail_btn_color", staticStyle: { "position": "absolute", "top": "0", "width": "100%", "z-index": "10" }, attrs: { "color": "transparent", "height": "auto", "flat": "" } }, [_c2("v-spacer"), _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "mr-1 hidden-sm-and-down", attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        _setup.imgScaleState = "FitToPage";
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiFitToScreenOutline))])], 1)];
    } }]) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("M-wISnLiQgM_DURMwKZGT")))])]), _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        _setup.imgScaleState = "FitToWidth";
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiTableSplitCell))])], 1)];
    } }]) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("ad8lEoWap_nT9U69WBKen")))])]), _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        _setup.imgScaleState = "FitToHeight";
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", { staticStyle: { "transform": "rotate(90deg)" } }, [_vm._v(_vm._s(_setup.mdiTableSplitCell))])], 1)];
    } }]) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("GjMNbm97OgVvpIYlkOisE")))])]), _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        _setup.imgScaleState = "Original";
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiLoupe))])], 1)];
    } }]) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("KkkM-iz8RCVQoTrTfhS5j")))])]), !_setup.store.isFullscreen ? _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.reqFullscreen.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiFullscreen))])], 1)];
    } }], null, false, 1192459052) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("XvOYJ5gHo37M1XztPl18z")))])]) : _vm._e(), _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.rotateImg.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiRotateRight))])], 1)];
    } }]) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("_bQs7o9oQSo7ao1G0cp3d")))])]), _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "mr-1 hidden-sm-and-down", attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.zoomOutImg();
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiMagnifyMinusOutline))])], 1)];
    } }]) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("lPPsX2CZbXwC-EGN79Rki")))])]), _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.close.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiClose))])], 1)];
    } }]) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("t83UAY18UebTg1_-zFGP3")))])])], 1), _c2("v-toolbar", { directives: [{ name: "show", rawName: "v-show", value: _setup.showImageToolbar && !_setup.scaleOn, expression: "showImageToolbar && !scaleOn" }], staticClass: "img_detail_btn_color", staticStyle: { "position": "absolute", "top": "0", "width": "100%", "z-index": "10" }, attrs: { "color": "transparent", "height": "auto", "flat": "" } }, [_c2("v-chip", { attrs: { "small": "", "color": "primary" }, domProps: { "textContent": _vm._s(`${(_a2 = _setup.imageSelected.rating) == null ? void 0 : _a2.toUpperCase()} ${_setup.imageSelected.id}`) }, on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.toDetailPage.apply(null, arguments);
    } } }), _c2("v-spacer"), !_setup.notYKSite ? _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.addFavorite.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.postDetail.voted ? _setup.mdiHeart : _setup.mdiHeartPlusOutline))])], 1)];
    } }], null, false, 4039738219) }, [_c2("span", [_vm._v(_vm._s(_setup.postDetail.voted ? _vm.$t("pEU9Y9K7DsODkocCDwq_O") : _vm.$t("2ZPEAvLkCbV3mC0iJAw9K")))])]) : _vm._e(), _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.toDetailPage.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiLinkVariant))])], 1)];
    } }]) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("caFFJlrS1wa_F86uKPykd")))])]), _setup.imageSelected.sourceUrl ? _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.toSourcePage.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiLaunch))])], 1)];
    } }], null, false, 3970738434) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("qSF4OLshg2EEX4CwtBE6r")) + " " + _vm._s(_setup.imageSelected.sourceUrl))])]) : _vm._e(), !_setup.isVideo ? _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.zoomInImg();
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiMagnifyPlusOutline))])], 1)];
    } }], null, false, 826778205) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("B_ptN5O-9PhmG5ymGGtc6")))])]) : _vm._e(), _c2("v-menu", { attrs: { "dense": "", "open-on-hover": "", "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ directives: [{ name: "show", rawName: "v-show", value: !_setup.downloading, expression: "!downloading" }], staticClass: "mr-1", attrs: { "fab": "", "small": "", "color": "primary" } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiDownload))])], 1)];
    } }]) }, [_c2("v-list", { attrs: { "dense": "", "flat": "" } }, [_setup.imageSelected.sampleUrl ? _c2("v-list-item", { attrs: { "two-line": "", "link": "", "dense": "" } }, [_c2("v-list-item-content", { on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.download(_setup.imageSelected.sampleUrl, _setup.imageSelected.sampleDownloadName);
    } } }, [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("wI4KHHIe3zNRziW4lDZrp")))]), _c2("v-list-item-subtitle", { domProps: { "textContent": _vm._s(_setup.imageSelected.sampleDownloadText) } })], 1)], 1) : _vm._e(), _setup.imageSelected.jpegUrl ? _c2("v-list-item", { attrs: { "two-line": "", "link": "", "dense": "" } }, [_c2("v-list-item-content", { on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.download(_setup.imageSelected.jpegUrl, _setup.imageSelected.jpegDownloadName);
    } } }, [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("k4YzDnBtd_S2UpAQucGxF")))]), _c2("v-list-item-subtitle", { domProps: { "textContent": _vm._s(_setup.imageSelected.jpegDownloadText) } })], 1)], 1) : _vm._e(), _c2("v-list-item", { attrs: { "two-line": "", "link": "", "dense": "" } }, [_c2("v-list-item-content", { on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.download(_setup.imageSelected.fileUrl, _setup.imageSelected.fileDownloadName);
    } } }, [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("VpuyxZtIoDF9-YyOm0tK_")))]), _c2("v-list-item-subtitle", { domProps: { "textContent": _vm._s(_setup.imageSelected.fileDownloadText) } })], 1)], 1)], 1)], 1), _c2("v-progress-circular", { directives: [{ name: "show", rawName: "v-show", value: _setup.downloading, expression: "downloading" }], staticClass: "ml-1 mr-2", attrs: { "indeterminate": "", "color": "primary" } }), _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ staticClass: "mr-1", attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.addToList.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiPlaylistPlus))])], 1)];
    } }]) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("hVmfDxXoj8vkgVQabEOSr")))])]), _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
      return [_c2("v-btn", _vm._g(_vm._b({ attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.close.apply(null, arguments);
      } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiClose))])], 1)];
    } }]) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("t83UAY18UebTg1_-zFGP3")))])])], 1), _c2("div", { directives: [{ name: "show", rawName: "v-show", value: _setup.showImageToolbar, expression: "showImageToolbar" }], staticClass: "img_detail_btn_color hidden-sm-and-down" }, [_c2("div", { directives: [{ name: "show", rawName: "v-show", value: !_setup.isVideo, expression: "!isVideo" }], staticStyle: { "position": "absolute", "z-index": "10", "bottom": "12px", "padding": "0 12px" } }, [_c2("v-chip", { directives: [{ name: "show", rawName: "v-show", value: (_b2 = _setup.postDetail.tags) == null ? void 0 : _b2.length, expression: "postDetail.tags?.length" }], staticClass: "mr-1", attrs: { "small": "", "color": "primary" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.toggleTagsShow();
    } } }, [_c2("v-icon", { attrs: { "left": "" } }, [_vm._v(_vm._s(_setup.mdiTagMultiple))]), _c2("span", [_vm._v(_vm._s(_setup.showTagChipGroup ? _vm.$t("gM92sLo0Cqfl2rCaXlOhc") : _vm.$t("l5W-EtJ_ar-SY2lF4H5Zm")))])], 1), _c2("v-chip-group", { directives: [{ name: "show", rawName: "v-show", value: _setup.showTagChipGroup, expression: "showTagChipGroup" }], attrs: { "column": "" } }, _vm._l(_setup.postDetail.tags || [], function(item, i) {
      return _c2("v-chip", { key: i, staticClass: "mr-1", attrs: { "small": "", "color": item.color, "text-color": "#ffffff" }, domProps: { "textContent": _vm._s(item.tagText) }, on: { "click": function($event) {
        $event.stopPropagation();
        return _setup.toTagsPage(item.tag);
      } } });
    }), 1)], 1), _c2("v-btn", { staticClass: "poa_left_center", staticStyle: { "z-index": "10" }, attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.showPrevPost.apply(null, arguments);
    } } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiChevronLeft))])], 1), _c2("v-btn", { staticClass: "poa_right_center", staticStyle: { "z-index": "10" }, attrs: { "fab": "", "small": "", "color": "primary" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _setup.showNextPost.apply(null, arguments);
    } } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiChevronRight))])], 1)], 1)], 1);
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
      const showImageList = Vue2.ref(true);
      const showFab = Vue2.ref(false);
      Vue2.watch(
        () => store.selectedColumn,
        () => {
          showImageList.value = false;
          Vue2.nextTick(() => {
            showImageList.value = true;
          });
        }
      );
      const showNoMore = Vue2.computed(() => !store.requestState && store.requestStop);
      const showLoadMore = Vue2.computed(() => !store.requestState && !store.requestStop);
      const ctxActPost = Vue2.ref();
      const showMenu = Vue2.ref(false);
      const x = Vue2.ref(0);
      const y = Vue2.ref(0);
      const maxHeightStyle = Vue2.computed(() => {
        const num = +store.selectedColumn;
        if (num == 0 || num > 3)
          return "max-height: 60vh;overflow: hidden";
        return "";
      });
      const getImgSrc = (img) => {
        const num = +store.selectedColumn;
        if (num != 0 && num < 7) {
          return (img == null ? void 0 : img.sampleUrl) || (img == null ? void 0 : img.fileUrl) || void 0;
        }
        return (img == null ? void 0 : img.previewUrl) || (img == null ? void 0 : img.fileUrl) || void 0;
      };
      const onCtxMenu = (ev, img) => {
        ev.preventDefault();
        showMenu.value = false;
        x.value = ev.clientX;
        y.value = ev.clientY;
        Vue2.nextTick(() => {
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
      const downloadCtxPost = async () => {
        if (!ctxActPost.value)
          return;
        const { fileUrl, fileDownloadName } = ctxActPost.value;
        if (!fileUrl)
          return;
        try {
          await downloadFile(fileUrl, `${fileDownloadName}.${fileUrl.split(".").pop()}`);
        } catch (error) {
          showMsg({ msg: `${i18n.t("FAqj5ONm50QMfIt9Vq2p1")}: ${error}`, type: "error" });
        }
      };
      const onImageLoadError = (url) => {
        const item = store.imageList.find((e) => e.previewUrl == url);
        if (!item)
          return;
        Vue2.set(item, "previewUrl", null);
        Vue2.set(item, "sampleUrl", null);
      };
      const scrollFn = throttleScroll((scroll) => {
        if (!showFab.value && scroll > 200)
          showFab.value = true;
        if (store.requestStop)
          return;
        if (store.requestState)
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
      return { __sfc: true, showImageList, showFab, showNoMore, showLoadMore, ctxActPost, showMenu, x, y, maxHeightStyle, getImgSrc, onCtxMenu, showImgModal, openDetail, addToSelectedList, addFavorite, downloadCtxPost, onImageLoadError, scrollFn, mdiFileGifBox, mdiRefresh, mdiVideo, PostDetail, refreshPosts, searchPosts, store };
    }
  });
  var _sfc_render$4 = function render() {
    var _vm = this, _c2 = _vm._self._c, _setup = _vm._self._setupProxy;
    return _setup.showImageList ? _c2("div", [_c2("wf-layout", _vm._l(_setup.store.imageList, function(image, index) {
      return _c2("v-card", { key: index, staticClass: "mb-2 posts-image-card", style: _setup.store.settings.masonryLayout === "flexbin" ? `width:${image.width * 300 / image.height}px;flex-grow:${image.width * 300 / image.height}` : _setup.maxHeightStyle }, [_setup.store.settings.masonryLayout === "flexbin" ? [_c2("div", { style: `padding-bottom:${image.height / image.width * 100}%` }), _c2("img", { staticClass: "post-image", attrs: { "alt": "", "loading": "lazy", "src": _setup.getImgSrc(image) }, on: { "click": function($event) {
        return _setup.showImgModal(index);
      }, "contextmenu": function($event) {
        return _setup.onCtxMenu($event, image);
      }, "error": function($event) {
        return _setup.onImageLoadError(image.previewUrl || "");
      } } })] : _c2("v-img", { attrs: { "transition": "scroll-y-transition", "src": _setup.getImgSrc(image), "aspect-ratio": image == null ? void 0 : image.aspectRatio }, on: { "click": function($event) {
        return _setup.showImgModal(index);
      }, "contextmenu": function($event) {
        return _setup.onCtxMenu($event, image);
      }, "error": _setup.onImageLoadError }, scopedSlots: _vm._u([{ key: "placeholder", fn: function() {
        return [_c2("v-row", { staticClass: "fill-height ma-0", attrs: { "align": "center", "justify": "center" } }, [_c2("v-progress-circular", { attrs: { "indeterminate": "", "color": "deep-purple" } })], 1)];
      }, proxy: true }], null, true) }, [(image == null ? void 0 : image.fileExt.toLowerCase()) === "gif" ? _c2("v-icon", { staticStyle: { "position": "absolute", "right": "5px" } }, [_vm._v(" " + _vm._s(_setup.mdiFileGifBox) + " ")]) : _vm._e(), ["mp4", "webm"].includes(image == null ? void 0 : image.fileExt.toLowerCase()) ? _c2("v-icon", { staticStyle: { "position": "absolute", "right": "5px" } }, [_vm._v(" " + _vm._s(_setup.mdiVideo) + " ")]) : _vm._e()], 1)], 2);
    }), 1), _c2("div", { staticClass: "d-flex justify-center" }, [_c2("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.store.requestState, expression: "store.requestState" }], attrs: { "color": "primary", "text": "" } }, [_vm._v(" " + _vm._s(_vm.$t("RN4dt81l_fZMWODsskZob")) + "... ")]), _c2("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.showLoadMore, expression: "showLoadMore" }], attrs: { "color": "primary", "text": "" }, on: { "click": function($event) {
      return _setup.searchPosts();
    } } }, [_vm._v(" " + _vm._s(_vm.$t("fC8XNfCl04zK7vgeaRZMQ")) + " ")]), _c2("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.showNoMore, expression: "showNoMore" }], attrs: { "color": "primary", "text": "" } }, [_vm._v(" " + _vm._s(_vm.$t("Z4pa8GhgE63OGGvCqAld0")) + "... ")])], 1), _c2("v-menu", { attrs: { "position-x": _setup.x, "position-y": _setup.y, "absolute": "", "offset-y": "" }, model: { value: _setup.showMenu, callback: function($$v) {
      _setup.showMenu = $$v;
    }, expression: "showMenu" } }, [_c2("v-list", [_setup.store.isYKSite ? _c2("v-list-item", { on: { "click": _setup.addFavorite } }, [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("Dnnio9m9RZA6bkTLytc99")))])], 1) : _vm._e(), _c2("v-list-item", { on: { "click": _setup.downloadCtxPost } }, [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("VpuyxZtIoDF9-YyOm0tK_")))])], 1), _c2("v-list-item", { on: { "click": _setup.openDetail } }, [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("EsiorRgoeHI8h7IHMLDA4")))])], 1), _c2("v-list-item", { on: { "click": _setup.addToSelectedList } }, [_c2("v-list-item-title", [_vm._v(_vm._s(_vm.$t("hVmfDxXoj8vkgVQabEOSr")))])], 1)], 1)], 1), _c2("v-fab-transition", [_c2("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.showFab, expression: "showFab" }], attrs: { "fab": "", "dark": "", "fixed": "", "bottom": "", "right": "", "color": "pink" }, on: { "click": function($event) {
      return _setup.refreshPosts();
    } } }, [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiRefresh))])], 1)], 1), _c2(_setup.PostDetail)], 1) : _vm._e();
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
      const showNoMore = Vue2.computed(() => !store.requestState && noMore.value);
      const showLoadMore = Vue2.computed(() => !store.requestState && !noMore.value);
      const page2 = Vue2.ref(Number(new URLSearchParams(location.search).get("page")) || 1);
      const pools = Vue2.ref([]);
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
      Vue2.onMounted(async () => {
        await loadData();
        window.addEventListener("scroll", scrollFn);
        eventBus.$on("loadPoolsByQuery", (query) => {
          page2.value = 1;
          pools.value = [];
          loadData(query);
        });
      });
      Vue2.onUnmounted(() => {
        window.removeEventListener("scroll", scrollFn);
        eventBus.$off("loadPoolsByQuery");
      });
      return { __sfc: true, columnCount, noMore, showNoMore, showLoadMore, page: page2, pools, loadData, viewPool, scrollFn, mdiCalendarBlank, mdiCalendarEdit, mdiDownload, mdiLaunch, store };
    }
  });
  var _sfc_render$3 = function render() {
    var _vm = this, _c2 = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c2("div", [_c2("masonry", { attrs: { "cols": _setup.columnCount, "gutter": "8px" } }, _vm._l(_setup.pools, function(item) {
      return _c2("v-card", { key: item.id, staticClass: "mb-2" }, [_c2("v-img", { attrs: { "transition": "scroll-y-transition", "src": item.thumb, "height": "auto" } }), _c2("v-card-title", [_vm._v(_vm._s(item.name))]), _c2("v-card-subtitle", { staticClass: "pb-0" }, [_c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
        return [_c2("span", _vm._g(_vm._b({ staticClass: "d-inline-block text-truncate", staticStyle: { "max-width": "100%" } }, "span", attrs, false), on), [_vm._v(_vm._s(item.description))])];
      } }], null, true) }, [_c2("span", { staticStyle: { "display": "inline-block", "max-width": "500px" } }, [_vm._v(_vm._s(item.description))])])], 1), _c2("v-card-text", { staticClass: "pb-0" }, [_c2("v-icon", { attrs: { "small": "" } }, [_vm._v(_vm._s(_setup.mdiCalendarBlank))]), _c2("span", { staticClass: "ml-1 mr-4" }, [_vm._v(_vm._s(item.created_at))]), _c2("v-icon", { attrs: { "small": "" } }, [_vm._v(_vm._s(_setup.mdiCalendarEdit))]), _c2("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(item.updated_at))])], 1), _c2("v-card-actions", [_c2("v-list-item", { staticClass: "grow" }, [_c2("v-list-item-avatar", [_c2("v-img", { staticClass: "elevation-6", attrs: { "alt": "", "src": `/data/avatars/${item.user_id}.jpg`, "lazy-src": "https://upload-bbs.mihoyo.com/upload/2022/08/13/190122060/f65e984cb2f5184ba167e461bfdeea55_8564255716639207386.png" } })], 1), _c2("v-row", { attrs: { "align": "center", "justify": "end" } }, [_c2("v-list-item-content", { staticClass: "ml-2" }, [_c2("v-list-item-title", [_c2("a", { attrs: { "href": `/pool/show/${item.id}`, "target": "_blank" } }, [_vm._v("Pool #" + _vm._s(item.id))])])], 1), _c2("v-chip", { staticClass: "mr-1" }, [_vm._v(_vm._s(item.post_count) + " " + _vm._s(_vm.$t("xJJTEE3nZ4HVXGFfiN-LC")))]), _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
        return [_c2("v-btn", _vm._g(_vm._b({ attrs: { "icon": "" }, on: { "click": function($event) {
          return _setup.viewPool(item.id);
        } } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiLaunch))])], 1)];
      } }], null, true) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("tGi6xYfvStBmR8qduEmKX")))])]), _c2("v-tooltip", { attrs: { "bottom": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on, attrs }) {
        return [_c2("v-btn", _vm._g(_vm._b({ attrs: { "icon": "", "href": `/pool/zip/${item.id}?jpeg=1` } }, "v-btn", attrs, false), on), [_c2("v-icon", [_vm._v(_vm._s(_setup.mdiDownload))])], 1)];
      } }], null, true) }, [_c2("span", [_vm._v(_vm._s(_vm.$t("Xtk-NnMgSQZmheJ87nbRV")))])])], 1)], 1)], 1)], 1);
    }), 1), _c2("div", { staticClass: "d-flex justify-center" }, [_c2("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.store.requestState, expression: "store.requestState" }], attrs: { "color": "primary", "text": "" } }, [_vm._v(_vm._s(_vm.$t("RN4dt81l_fZMWODsskZob")) + "...")]), _c2("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.showLoadMore, expression: "showLoadMore" }], attrs: { "color": "primary", "text": "" }, on: { "click": function($event) {
      return _setup.loadData();
    } } }, [_vm._v(_vm._s(_vm.$t("fC8XNfCl04zK7vgeaRZMQ")))]), _c2("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _setup.showNoMore, expression: "showNoMore" }], attrs: { "color": "primary", "text": "" } }, [_vm._v(_vm._s(_vm.$t("4hOFoP4M3ZkL3RiN7XOc8")))])], 1)], 1);
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
    var _a2, _b2;
    var _vm = this, _c2 = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c2("v-snackbar", { attrs: { "top": "", "color": (_a2 = _setup.snackbarTypeMap[_setup.snackbarType]) == null ? void 0 : _a2[0], "timeout": 2e3, "min-width": 160 }, model: { value: _setup.showSnackbar, callback: function($$v) {
      _setup.showSnackbar = $$v;
    }, expression: "showSnackbar" } }, [_c2("v-icon", { directives: [{ name: "show", rawName: "v-show", value: _setup.snackbarType, expression: "snackbarType" }] }, [_vm._v(_vm._s((_b2 = _setup.snackbarTypeMap[_setup.snackbarType]) == null ? void 0 : _b2[1]))]), _c2("span", { staticClass: "ml-2" }, [_vm._v(_vm._s(_setup.snackbarText))])], 1);
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
    var _vm = this, _c2 = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c2("v-container", { staticClass: "_vcont pa-2", attrs: { "fluid": "" } }, [_setup.store.showPostList ? _c2(_setup.PostList) : _vm._e(), _setup.store.showPoolList ? _c2(_setup.PoolList) : _vm._e(), _c2(_setup.Snackbar)], 1);
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
      Vue2.onMounted(() => {
        const mode = localStorage.getItem("__darkmode") || "dark";
        vuetify.theme.dark = mode === "dark";
      });
      return { __sfc: true, vuetify, AppBar, NavDrawer, SettingsDrawer, AppContainer };
    }
  });
  var _sfc_render = function render() {
    var _vm = this, _c2 = _vm._self._c, _setup = _vm._self._setupProxy;
    return _c2("v-app", [_c2(_setup.AppBar), _c2(_setup.NavDrawer), _c2("v-main", { attrs: { "app": "" } }, [_c2(_setup.AppContainer), _c2(_setup.SettingsDrawer)], 1)], 1);
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
