// ==UserScript==
// @name                 Yande.re 瀑布流浏览
// @version              0.2.21
// @description          Yande.re/Konachan 缩略图放大 & 双击翻页 & 瀑布流浏览模式
// @description:en       Yande.re/Konachan Masonry(Waterfall) Layout. Fork form yande-re-chinese-patch.
// @author               asadahimeka
// @namespace            me.asadahimeka.yanderemasonry
// @license              MIT
// @homepage             https://www.nanoka.top
// @source               https://github.com/asadahimeka/yandere-masonry
// @icon                 https://upload-bbs.mihoyo.com/upload/2022/05/23/260511332/f1f6267537a5aff959ee63ec2c9e4e52_4821140735490026106.jpg
// @supportURL           https://github.com/asadahimeka/yandere-masonry/issues
// @match                https://danbooru.donmai.us/*
// @match                https://konachan.com/*
// @match                https://konachan.net/*
// @match                https://yande.re/*
// @match                https://gelbooru.com/*
// @match                https://rule34.xxx/*
// @match                https://safebooru.org/*
// @match                https://tbib.org/*
// @match                https://xbooru.com/*
// @match                https://rule34.paheal.net/*
// @match                https://realbooru.com/*
// @run-at               document-body
// @grant                GM_addStyle
// @grant                GM_addElement
// @grant                GM_download
// @grant                GM_notification
// ==/UserScript==

var __defProp = Object.defineProperty;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(() => {
  var ydStyle = 'a.thumb{border-bottom:2px solid;border-color:#232322}a.thumb:visited{border-color:#ffaaae}#add-to-favs{zoom:1.7;margin:4px 0}li.tag-type-artist a[href^="/post"]:not(.no-browser-link):before{content:"[\\753b\\5e08]"}li.tag-type-copyright a[href^="/post"]:not(.no-browser-link):before{content:"[\\7248\\6743]"}li.tag-type-character a[href^="/post"]:not(.no-browser-link):before{content:"[\\89d2\\8272]"}li.tag-type-circle a[href^="/post"]:not(.no-browser-link):before{content:"[\\793e\\56e2]"}#post-list{display:flex}#post-list .sidebar,#post-popular .sidebar{float:none;width:auto;max-width:240px}#post-list .content,#post-popular .content{float:none;flex:1;padding-right:10px}#post-list ul#post-list-posts,#post-popular ul#post-list-posts{display:block;width:100%;margin:0 auto}#post-popular ul#post-list-posts{width:96vw}#post-list ul#post-list-posts li,#post-popular ul#post-list-posts li{float:none;display:inline-block;margin:0;transition:.2s ease-in-out}#post-list ul#post-list-posts li[data-macy-complete="1"] img.preview,#post-popular ul#post-list-posts li[data-macy-complete="1"] img.preview{max-width:100%}#post-list ul#post-list-posts .inner,#post-popular ul#post-list-posts .inner{width:100%!important;height:auto!important}#post-list img.preview,#post-popular img.preview{width:auto;height:auto;margin-top:0;margin-bottom:8px;border-radius:5px;box-sizing:border-box}#post-list a.directlink,#post-popular a.directlink{margin-top:5px}\n';
  var knStyle = "#lsidebar{display:none}#post-list ul#post-list-posts li{width:auto!important;margin:0 10px 10px 0;vertical-align:top}\n";
  var loadingStyle = "#loading{height:100%;width:100%;position:fixed;z-index:99999;margin-top:0;top:0px}#loading p{margin:100px auto;line-height:100px;font-family:Meiryo UI,MicroHei,Microsoft YaHei UI;font-size:18px;color:#9671d7}#loading-center{width:100%;height:100%;position:relative}#loading-center-absolute{position:absolute;left:50%;top:50%;height:150px;width:150px;margin-top:-75px;margin-left:-50px}.loading-object{width:20px;height:20px;background-color:#9671d7;float:left;margin-right:20px;margin-top:65px;border-radius:50%}#loading-object_one{animation:object_one 1.5s infinite}#loading-object_two{animation:object_two 1.5s infinite;animation-delay:.25s}#loading-object_three{animation:object_three 1.5s infinite;animation-delay:.5s}@keyframes object_one{75%{transform:scale(0)}}@keyframes object_two{75%{transform:scale(0)}}@keyframes object_three{75%{transform:scale(0)}}.img_detail_scale_on{width:auto!important;max-width:100vw!important;max-height:100vh!important;margin:0;padding:12px;overflow:auto}.img_detail_scale_on .v-image{display:block;max-height:100vh;margin:0 auto}.img_detail_scale_on .v-responsive__sizer,.img_detail_scale_on .v-image__image{display:none}.img_detail_scale_on .v-responsive__content{position:relative;width:auto!important;max-width:100vw!important;max-height:100vh;margin:0!important}.img_scale_scroll{display:none}.img_detail_scale_on .img_scale_scroll{display:block;max-width:100vw;max-height:calc(100vh - 30px);overflow:auto}.img_scale_scroll::-webkit-scrollbar{width:10px;height:10px}.img_scale_scroll::-webkit-scrollbar-track{background:#e6e6e6;border-left:1px solid #dadada}.img_scale_scroll::-webkit-scrollbar-thumb{background:#b0b0b0;border:solid 3px #e6e6e6;border-radius:7px}.img_scale_scroll::-webkit-scrollbar-thumb:hover{background:black}\n";
  async function prepareApp(callback) {
    if (doNotRun())
      return;
    addSiteStyle();
    bindDblclick();
    initMacy();
    setMoebooruLocale();
    const init = async () => {
      await initMasonry();
      callback == null ? void 0 : callback();
    };
    addEventListener("load", () => {
      const params = new URLSearchParams(location.search);
      params.get("_wf") ? init() : addMasonryButton(init);
    });
  }
  function doNotRun() {
    const mimeTypes = ["jpg", "jpeg", "png", "gif", "mp4", "webm", "json", "xml"];
    return mimeTypes.some((e) => location.pathname.endsWith("." + e));
  }
  async function initMacy() {
    try {
      if (location.href.includes("yande.re/post")) {
        await Promise.all([
          loadScript("https://lib.baomitu.com/macy/2.5.1/macy.min.js")
        ]);
        setTimeout(() => {
          new Macy({
            container: "#post-list-posts",
            trueOrder: false,
            waitForImages: false,
            columns: 5,
            margin: 16,
            breakAt: { 1800: 5, 1500: 4, 1200: 3, 900: 2, 700: 1 }
          });
        }, 100);
      }
    } catch (error) {
      console.log("init macy error:", error);
    }
  }
  async function initMasonry() {
    replaceHead();
    replaceBody();
    await loadDeps();
  }
  function addSiteStyle() {
    if (location.href.includes("yande.re")) {
      GM_addStyle(ydStyle);
    }
    if (location.href.includes("konachan")) {
      GM_addStyle(ydStyle + knStyle);
    }
  }
  function isYKSite() {
    return ["yande.re", "konachan"].some((e) => location.href.includes(e));
  }
  function setMoebooruLocale() {
    if (!isYKSite())
      return;
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
    if (isYKSite()) {
      document.addEventListener("dblclick", (e) => {
        const prev = document.querySelector("a.previous_page");
        const next = document.querySelector("a.next_page");
        const w = document.documentElement.offsetWidth || document.body.offsetWidth;
        const clickX = e.clientX;
        clickX > w / 2 ? next == null ? void 0 : next.click() : prev == null ? void 0 : prev.click();
      });
    }
  }
  function addMasonryButton(fn) {
    if (location.href.includes("safebooru")) {
      const oldBtn = document.querySelector("#enter-masonry");
      oldBtn == null ? void 0 : oldBtn.remove();
    }
    document.body.insertAdjacentHTML("beforeend", '<button id="enter-masonry" style="position:fixed;z-index:99;right:16px;top:10px">\u7011\u5E03\u6D41\u6A21\u5F0F</button>');
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
      loadScript("https://npm.elemecdn.com/@vue/composition-api@1.6.2"),
      loadScript("https://lib.baomitu.com/vuetify/2.6.6/vuetify.min.js"),
      loadScript("https://npm.elemecdn.com/vue-masonry-css@1.0.3/dist/vue-masonry.min.js")
    ]);
  }
  function replaceHead() {
    const el = document.querySelector('[name="csrf-token"]');
    const token = el == null ? void 0 : el.getAttribute("content");
    token && sessionStorage.setItem("csrf-token", token);
    document.head.innerHTML = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <meta name="referrer" content="no-referrer">
    <title>Booru Masonry</title>
    <link rel="stylesheet" href="https://npm.elemecdn.com/normalize.css/normalize.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="https://npm.elemecdn.com/@mdi/font@6.7.96/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="https://lib.baomitu.com/vuetify/2.6.6/vuetify.min.css">
    <style>${loadingStyle}::-webkit-scrollbar{width:0px}</style>
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
  var _a;
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
  const store = Vue__default["default"].observable({
    requestState: false,
    requestStop: false,
    showImageSelected: false,
    imageSelectedIndex: 0,
    showDrawer: false,
    showFab: false,
    currentPage: 1,
    imageList: [],
    selectedImageList: [],
    selectedColumn: (_a = localStorage.getItem("__masonry_col")) != null ? _a : "0",
    isYKSite: ["konachan", "yande.re"].some((e) => location.href.includes(e)),
    toggleDrawer() {
      store.showDrawer = !store.showDrawer;
    },
    addToSelectedList(item) {
      if (store.selectedImageList.some((e) => e.id === item.id))
        return;
      store.selectedImageList.push(item);
    }
  });
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var dist = {};
  var Constants = {};
  var require$$0 = {
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
      random: true
    },
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
      const tags = tagname.split(":");
      const prefix = tagname.charAt(0) === "/" ? "/" : "";
      if (tags[0] === "xmlns") {
        return "";
      }
      if (tags.length === 2) {
        tagname = prefix + tags[1];
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
    const tags = [];
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
              const otg = tags.pop();
              if (tagName !== otg.tagName) {
                let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                return getErrorObject("InvalidTag", "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.", getLineNumberForPosition(xmlData, tagStartPos));
              }
              if (tags.length == 0) {
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
              tags.push({ tagName, tagStartPos });
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
    } else if (tags.length == 1) {
      return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
    } else if (tags.length > 0) {
      return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
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
  function parseImageUrl(e, t, i) {
    var _a2;
    if (!e || e.trim() === "" || t.is_deleted)
      return null;
    if (e.startsWith("/data") && (e = `https://danbooru.donmai.us${e}`), e.startsWith("/cached") && (e = `https://danbooru.donmai.us${e}`), e.startsWith("/_images") && (e = `https://dollbooru.org${e}`), e.startsWith("//derpicdn.net") && (e = `https:${t.image}`), !t.file_url && t.directory !== void 0) {
      const r = (_a2 = t.directory) != null ? _a2 : `${t.hash.substr(0, 2)}/${t.hash.substr(2, 2)}`;
      e = `//${i.domain}/images/${r}/${t.image}`;
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
      this.fileUrl = parseImageUrl(e.file_url || e.image || (i ? e.source : void 0) || e.file && e.file.url || e.representations && e.representations.full, e, t), this.available = !i && this.fileUrl !== null, this.height = parseInt(e.height || e.image_height || e.file && e.file.height, 10), this.width = parseInt(e.width || e.image_width || e.file && e.file.width, 10), this.sampleUrl = parseImageUrl(e.sample_url || e.large_file_url || e.representations && e.representations.large || e.sample && e.sample.url, e, t), this.sampleHeight = parseInt(e.sample_height || e.sample && e.sample.height, 10), this.sampleWidth = parseInt(e.sample_width || e.sample && e.sample.width, 10), this.previewUrl = parseImageUrl(e.preview_url || e.preview_file_url && e.preview_file_url.replace(/(.*)preview(.*)jpg/, "$1720x720$2webp") || e.representations && e.representations.small || e.preview && e.preview.url, e, t), this.previewHeight = parseInt(e.preview_height || e.preview && e.preview.height, 10), this.previewWidth = parseInt(e.preview_width || e.preview && e.preview.width, 10), this.id = e.id ? e.id.toString() : "No ID available", this.tags = getTags(e), e.score && e.score.total ? this.score = e.score.total : this.score = e.score ? parseInt(e.score, 10) : e.score, this.source = e.source || e.sources || e.source_url, this.rating = e.rating || /(safe|suggestive|questionable|explicit)/i.exec(e.tags) || "u", Array.isArray(this.rating) && (this.rating = this.rating[0]), this.rating === "suggestive" && (this.rating = "q"), this.rating = this.rating.charAt(0), this.createdAt = null, typeof e.created_at == "object" ? this.createdAt = new Date(1e3 * e.created_at.s + e.created_at.n / 1e9) : typeof e.created_at == "number" ? this.createdAt = new Date(1e3 * e.created_at) : typeof e.change == "number" ? this.createdAt = new Date(1e3 * e.change) : this.createdAt = new Date(e.created_at || e.date);
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
  Post$1.default = Post;
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
  SearchResults$1.default = SearchResults;
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
      var _a2, _b, _c, _d, _e2, _f, _g, _h, _i;
      this.domain = a.domain, this.type = (_a2 = a.type) != null ? _a2 : "json", this.aliases = (_b = a.aliases) != null ? _b : [], this.nsfw = a.nsfw, this.api = (_c = a.api) != null ? _c : {}, this.paginate = (_d = a.paginate) != null ? _d : "page", this.random = (_e2 = a.random) != null ? _e2 : false, this.tagQuery = (_f = a.tagQuery) != null ? _f : "tags", this.tagJoin = (_g = a.tagJoin) != null ? _g : "+", this.insecure = (_h = a.insecure) != null ? _h : false, this.defaultTags = (_i = a.defaultTags) != null ? _i : [];
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
  const BOORU_PAGE_LIMIT = defaultLimitMap[location.host];
  const isPidSite = dist.sites[location.host].paginate === "pid";
  async function searchBooru(page, tags) {
    if (!tags || tags === "all")
      tags = "";
    if (location.href.includes("konachan.net"))
      tags += " rating:safe";
    return dist.search(location.host, tags, { page, limit: BOORU_PAGE_LIMIT });
  }
  function getFirstPageNo(params) {
    if (isPidSite) {
      const page = Number(params.get("pid")) || 0;
      return Math.trunc(page / BOORU_PAGE_LIMIT) + 1;
    }
    return Number(params.get("page")) || 1;
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
  const msgTypeImages = {
    success: "https://i0.hdslb.com/bfs/album/39212b6f4c0ab75ca8f508237e756ed03f60e030.png",
    error: "http://i0.hdslb.com/bfs/album/d84b69fded166425a21ebc1c6c8251f36c26ea49.png"
  };
  function showMsg({ msg = "", title = "Booru Masonry", type = "success" }) {
    GM_notification({
      title,
      text: msg,
      silent: true,
      timeout: 2e3,
      image: msgTypeImages[type]
    });
  }
  function isReachBottom() {
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
        scroll > position ? downFn(scroll, arg) : upFn(scroll, arg);
        position = scroll;
        ticking = false;
      });
    };
  }
  const __sfc_main$4 = {};
  __sfc_main$4.setup = (__props, __ctx) => {
    const title = VueCompositionAPI2.computed(() => {
      const {
        0: img,
        length
      } = store.imageList;
      if (img)
        return `${img.booru.domain.toUpperCase()} - ${length} Posts - Page ${store.currentPage}`;
      return "\u{1F682}";
    });
    const cols = VueCompositionAPI2.ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20].reduce((acc, cur) => {
      acc[cur] = cur === 0 ? "\u81EA\u52A8" : cur + " \u5217";
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
      await downloadFile("data:text/plain;charset=utf-8," + encodeURIComponent(urlText), "image-urls.txt");
    };
    const vuetify = useVuetify();
    const toggleDarkmode = () => {
      vuetify.theme.dark = !vuetify.theme.dark;
      localStorage.setItem("__darkmode", vuetify.theme.dark ? "dark" : "light");
    };
    const exitMasonry = () => {
      const url = new URL(location.href);
      url.searchParams.get("_wf") ? location.assign(location.origin) : location.reload();
    };
    return {
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
      startDownload,
      exportFileUrls,
      toggleDarkmode,
      exitMasonry
    };
  };
  var render$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("v-app-bar", {
      attrs: {
        "app": "",
        "dense": ""
      }
    }, [_c("v-app-bar-nav-icon", {
      on: {
        "click": _vm.store.toggleDrawer
      }
    }), _c("v-toolbar-title", {
      staticClass: "hidden-sm-and-down",
      domProps: {
        "textContent": _vm._s(_vm.title)
      }
    }), _c("v-spacer"), _c("v-menu", {
      attrs: {
        "transition": "slide-y-transition",
        "offset-y": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref) {
          var on = _ref.on, attrs = _ref.attrs;
          return [_c("v-btn", _vm._g(_vm._b({
            staticClass: "mr-6",
            attrs: {
              "small": ""
            }
          }, "v-btn", attrs, false), on), [_c("v-icon", {
            attrs: {
              "left": ""
            }
          }, [_vm._v("mdi-view-dashboard-variant")]), _c("span", {
            staticStyle: {
              "margin-bottom": "2px"
            }
          }, [_vm._v(_vm._s(_vm.store.selectedColumn === "0" ? "\u81EA\u52A8" : _vm.store.selectedColumn + "\u5217"))])], 1)];
        }
      }])
    }, [_c("v-list", {
      attrs: {
        "dense": ""
      }
    }, _vm._l(_vm.cols, function(val, key) {
      return _c("v-list-item", {
        key,
        attrs: {
          "dense": "",
          "link": ""
        }
      }, [_c("v-list-item-title", {
        domProps: {
          "textContent": _vm._s(val)
        },
        on: {
          "click": function($event) {
            return _vm.selColumn(key);
          }
        }
      })], 1);
    }), 1)], 1), _c("span", {
      staticClass: "hidden-sm-and-down"
    }, [_vm._v("\u5DF2\u9009\u62E9")]), _c("span", {
      staticClass: "ml-1 mr-1",
      domProps: {
        "textContent": _vm._s(_vm.store.selectedImageList.length)
      }
    }), _c("v-btn", {
      attrs: {
        "icon": ""
      },
      on: {
        "click": _vm.selectAll
      }
    }, [_c("v-icon", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.isNoSelected,
        expression: "isNoSelected"
      }]
    }, [_vm._v("mdi-checkbox-blank-outline")]), _c("v-icon", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.isOneOrMoreSelected,
        expression: "isOneOrMoreSelected"
      }]
    }, [_vm._v("mdi-checkbox-intermediate")]), _c("v-icon", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.isAllSelected,
        expression: "isAllSelected"
      }]
    }, [_vm._v("mdi-checkbox-marked")])], 1), _c("v-menu", {
      attrs: {
        "dense": "",
        "offset-y": "",
        "close-on-content-click": false
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref2) {
          var on = _ref2.on, attrs = _ref2.attrs;
          return [_c("v-btn", _vm._g(_vm._b({
            attrs: {
              "icon": ""
            }
          }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v("mdi-download")])], 1)];
        }
      }])
    }, [_c("v-list", {
      staticStyle: {
        "min-width": "300px",
        "max-height": "80vh",
        "overflow": "auto"
      },
      attrs: {
        "dense": "",
        "flat": ""
      }
    }, [_c("v-subheader", {
      staticClass: "ml-2"
    }, [_c("span", {
      staticClass: "mr-4"
    }, [_vm._v("\u4E0B\u8F7D\u5217\u8868")]), _c("v-btn", {
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
    }, [_vm._v(" \u5F00\u59CB\u4E0B\u8F7D ")]), _c("v-btn", {
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
    }, [_vm._v(" \u8F93\u51FA\u4E0B\u8F7D\u5730\u5740 ")])], 1), _c("v-list-item-group", {
      attrs: {
        "color": "primary"
      }
    }, _vm._l(_vm.store.selectedImageList, function(item) {
      return _c("v-list-item", {
        key: item.id,
        attrs: {
          "dense": "",
          "two-line": ""
        }
      }, [_c("v-list-item-avatar", [!item.loading && !item.loaded ? _c("v-btn", {
        attrs: {
          "icon": ""
        }
      }, [_c("v-icon", [_vm._v("mdi-file-clock-outline")])], 1) : _vm._e(), item.loaded ? _c("v-btn", {
        attrs: {
          "icon": "",
          "color": "green"
        }
      }, [_c("v-icon", [_vm._v("mdi-check-underline-circle")])], 1) : _vm._e(), item.loading ? _c("v-progress-circular", {
        attrs: {
          "rotate": -90,
          "size": 28,
          "value": _vm.loadingValue,
          "color": "pink"
        }
      }) : _vm._e()], 1), _c("v-list-item-content", {
        staticStyle: {
          "max-width": "240px"
        }
      }, [_c("v-list-item-title", {
        attrs: {
          "title": item.fileDownloadName
        },
        domProps: {
          "textContent": _vm._s(item.fileDownloadName)
        }
      }), _c("v-list-item-subtitle", {
        attrs: {
          "title": item.fileUrl
        },
        domProps: {
          "textContent": _vm._s(item.fileUrl)
        }
      })], 1), _c("v-list-item-action", [_c("v-btn", {
        attrs: {
          "icon": ""
        },
        on: {
          "click": function($event) {
            return _vm.removeFromList(item.id);
          }
        }
      }, [_c("v-icon", [_vm._v("mdi-delete")])], 1)], 1)], 1);
    }), 1)], 1)], 1), _c("v-btn", {
      attrs: {
        "icon": ""
      },
      on: {
        "click": _vm.toggleDarkmode
      }
    }, [_c("v-icon", [_vm._v("mdi-brightness-6")])], 1), _c("v-btn", {
      attrs: {
        "icon": ""
      },
      on: {
        "click": _vm.exitMasonry
      }
    }, [_c("v-icon", [_vm._v("mdi-exit-to-app")])], 1), _c("v-progress-linear", {
      attrs: {
        "active": _vm.store.requestState,
        "height": 6,
        "color": "deep-purple accent-4",
        "indeterminate": "",
        "absolute": "",
        "bottom": ""
      }
    })], 1);
  };
  var staticRenderFns$4 = [];
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
  const __cssModules$4 = {};
  var __component__$4 = /* @__PURE__ */ normalizeComponent(__sfc_main$4, render$4, staticRenderFns$4, false, __vue2_injectStyles$4, null, null, null);
  function __vue2_injectStyles$4(context) {
    for (let o in __cssModules$4) {
      this[o] = __cssModules$4[o];
    }
  }
  var AppBar = /* @__PURE__ */ function() {
    return __component__$4.exports;
  }();
  const blackList = /* @__PURE__ */ new Set(["e621.net", "e926.net", "hypnohub.net", "derpibooru.org"]);
  const siteDomains = Object.keys(dist.sites).filter((e) => !blackList.has(e));
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
        return;
      const response = await fetch(`/user.json?id=${id}`);
      const result = await response.json();
      const { name } = result[0];
      localStorage.setItem("__username", name);
      return name;
    } catch (error) {
      console.log("getUsername error:", error);
      return;
    }
  }
  async function checkPostIsVoted(id) {
    try {
      if (!id)
        return false;
      const username = await getUsername();
      if (!username)
        return false;
      const response = await fetch(`/favorite/list_users.json?id=${id}`);
      const result = await response.json();
      const users = result.favorited_users.split(",");
      return users.includes(username);
    } catch (error) {
      console.log("checkPostIsVoted error:", error);
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
      showMsg({ msg: "\u6536\u85CF\u5931\u8D25: " + response.status, type: "error" });
      return false;
    }
    const result = await response.json();
    if (result.success) {
      showMsg({ msg: "\u6536\u85CF\u6210\u529F" });
      return true;
    } else {
      showMsg({ msg: "\u6536\u85CF\u5931\u8D25: " + result.reason, type: "error" });
      return false;
    }
  }
  const __sfc_main$3 = {};
  __sfc_main$3.setup = (__props, __ctx) => {
    const siteLinks = VueCompositionAPI2.ref(siteDomains);
    const userName = VueCompositionAPI2.ref("");
    const openLink = (link) => {
      window.open(link, "_blank", "noreferrer");
    };
    VueCompositionAPI2.onMounted(async () => {
      const name = await getUsername();
      if (name)
        userName.value = name;
    });
    return {
      store,
      siteLinks,
      userName,
      openLink
    };
  };
  var render$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("v-navigation-drawer", {
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
    }, [_c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", {
      staticClass: "title"
    }, [_vm._v(" Booru Masonry ")]), _c("v-list-item-subtitle", [_vm._v("Booru sites waterfall layout.")])], 1)], 1), _c("v-divider"), _vm.store.isYKSite && _vm.userName ? _c("v-list", {
      attrs: {
        "dense": "",
        "nav": ""
      }
    }, [_c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", {
      staticClass: "title"
    }, [_vm._v(" My Account ")])], 1)], 1), _c("v-list-item", {
      attrs: {
        "link": "",
        "href": "/user/home"
      }
    }, [_c("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c("v-icon", [_vm._v("mdi-account")])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("Hello " + _vm._s(_vm.userName) + "!")])], 1)], 1), _c("v-list-item", {
      attrs: {
        "link": "",
        "href": `/post?tags=vote%3A3%3A${_vm.userName}+order%3Avote&_wf=1`
      }
    }, [_c("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c("v-icon", [_vm._v("mdi-star")])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("My Favorites")])], 1)], 1)], 1) : _vm._e(), _c("v-list", {
      attrs: {
        "dense": "",
        "nav": ""
      }
    }, [_c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", {
      staticClass: "title"
    }, [_vm._v(" Site List ")])], 1)], 1), _vm._l(_vm.siteLinks, function(link) {
      return _c("v-list-item", {
        key: link,
        attrs: {
          "href": `https://${link.includes("yande") ? link + "/post" : link}?_wf=1`
        }
      }, [_c("v-list-item-icon", {
        staticClass: "mr-2"
      }, [_c("v-icon", [_vm._v("mdi-arrow-right-circle-outline")])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v(_vm._s(link.toUpperCase()))])], 1)], 1);
    })], 2), _c("v-list", {
      attrs: {
        "dense": "",
        "nav": ""
      }
    }, [_c("v-list-item", [_c("v-list-item-content", [_c("v-list-item-title", {
      staticClass: "title"
    }, [_vm._v(" About ")])], 1)], 1), _c("v-list-item", [_c("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c("v-icon", [_vm._v("mdi-information-outline")])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("v0.2.21")])], 1)], 1), _c("v-list-item", {
      attrs: {
        "link": ""
      },
      on: {
        "click": function($event) {
          return _vm.openLink("https://github.com/asadahimeka/yandere-masonry");
        }
      }
    }, [_c("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c("v-icon", [_vm._v("mdi-github")])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("Github")]), _c("v-list-item-subtitle", [_vm._v("yandere-masonry")])], 1)], 1), _c("v-list-item", {
      attrs: {
        "link": ""
      },
      on: {
        "click": function($event) {
          return _vm.openLink("https://github.com/coderzhaoziwei/yande-re-chinese-patch");
        }
      }
    }, [_c("v-list-item-icon", {
      staticClass: "mr-2"
    }, [_c("v-icon", [_vm._v("mdi-source-fork")])], 1), _c("v-list-item-content", [_c("v-list-item-title", [_vm._v("Fork from")]), _c("v-list-item-subtitle", [_vm._v("yande-re-chinese-patch")])], 1)], 1)], 1)], 1);
  };
  var staticRenderFns$3 = [];
  const __cssModules$3 = {};
  var __component__$3 = /* @__PURE__ */ normalizeComponent(__sfc_main$3, render$3, staticRenderFns$3, false, __vue2_injectStyles$3, null, null, null);
  function __vue2_injectStyles$3(context) {
    for (let o in __cssModules$3) {
      this[o] = __cssModules$3[o];
    }
  }
  var NavDrawer = /* @__PURE__ */ function() {
    return __component__$3.exports;
  }();
  const __sfc_main$2 = {};
  __sfc_main$2.setup = (__props, __ctx) => {
    const showImageToolbar = VueCompositionAPI2.ref(true);
    const innerWidth = VueCompositionAPI2.ref(window.innerWidth);
    const innerHeight = VueCompositionAPI2.ref(window.innerHeight);
    const downloading = VueCompositionAPI2.ref(false);
    const scaleOn = VueCompositionAPI2.ref(false);
    const imageSelected = VueCompositionAPI2.computed(() => {
      var _a2;
      return (_a2 = store.imageList[store.imageSelectedIndex]) != null ? _a2 : {};
    });
    const isVideo = VueCompositionAPI2.computed(() => [".mp4", ".webm"].some((e) => {
      var _a2;
      return (_a2 = imageSelected.value.fileUrl) == null ? void 0 : _a2.endsWith(e);
    }));
    const imgSrc = VueCompositionAPI2.computed(() => {
      var _a2, _b;
      if (isVideo.value)
        return void 0;
      return (_b = (_a2 = imageSelected.value.sampleUrl) != null ? _a2 : imageSelected.value.fileUrl) != null ? _b : void 0;
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
    const booruDomain = VueCompositionAPI2.computed(() => imageSelected.value.booru.domain);
    const notYKSite = VueCompositionAPI2.computed(() => {
      return ["konachan", "yande"].every((e) => !booruDomain.value.includes(e));
    });
    const toggleToolbar = () => {
      showImageToolbar.value = !showImageToolbar.value;
    };
    const toTagsPage = (tag) => {
      if (notYKSite.value)
        return;
      window.open(`https://${booruDomain.value}/post?tags=${tag}`, "_blank", "noreferrer");
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
          msg: "\u4E0B\u8F7D\u51FA\u9519: " + error,
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
    const isPostVoted = VueCompositionAPI2.ref(false);
    const addFavorite = async () => {
      if (notYKSite.value || isPostVoted.value)
        return;
      const isSuccess = await addPostToFavorites(imageSelected.value.id);
      if (isSuccess)
        isPostVoted.value = true;
    };
    VueCompositionAPI2.watch(() => store.showImageSelected, async (val) => {
      if (!val) {
        scaleOn.value = false;
        isPostVoted.value = false;
      } else {
        const flag = await checkPostIsVoted(imageSelected.value.id);
        isPostVoted.value = flag;
      }
    });
    VueCompositionAPI2.onMounted(() => {
      window.addEventListener("resize", () => {
        innerWidth.value = window.innerWidth;
        innerHeight.value = window.innerHeight;
      });
    });
    return {
      store,
      showImageToolbar,
      downloading,
      scaleOn,
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
      isPostVoted,
      addFavorite
    };
  };
  var render$2 = function() {
    var _vm$imageSelected$fil, _vm$imageSelected$fil2;
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("v-dialog", {
      attrs: {
        "content-class": _vm.scaleOn ? "img_detail_scale_on" : "",
        "width": _vm.imageSelectedWidth > 300 ? _vm.imageSelectedWidth : 300,
        "overlay-opacity": 0.7
      },
      model: {
        value: _vm.store.showImageSelected,
        callback: function($$v) {
          _vm.$set(_vm.store, "showImageSelected", $$v);
        },
        expression: "store.showImageSelected"
      }
    }, [_vm.store.showImageSelected ? _c("v-img", {
      staticStyle: {
        "min-width": "300px"
      },
      attrs: {
        "src": _vm.imgSrc,
        "lazy-src": _vm.imgLasySrc,
        "aspect-ratio": _vm.imageSelected.aspectRatio
      },
      on: {
        "click": _vm.toggleToolbar
      },
      scopedSlots: _vm._u([{
        key: "placeholder",
        fn: function() {
          return [_c("v-row", {
            staticClass: "fill-height ma-0",
            attrs: {
              "align": "center",
              "justify": "center"
            }
          }, [_c("v-progress-circular", {
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
    }, [_c("v-toolbar", {
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
    }, [_c("v-chip", {
      staticClass: "hidden-sm-and-down",
      attrs: {
        "small": "",
        "color": "#ee8888b3",
        "text-color": "#ffffff"
      },
      domProps: {
        "textContent": _vm._s(_vm.imageSelected.rating.toUpperCase() + " " + _vm.imageSelected.id)
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.toDetailPage.apply(null, arguments);
        }
      }
    }), _c("v-spacer"), !_vm.notYKSite ? _c("v-tooltip", {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref) {
          var on = _ref.on, attrs = _ref.attrs;
          return [_c("v-btn", _vm._g(_vm._b({
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
          }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_vm.isPostVoted ? "mdi-heart" : "mdi-heart-plus-outline"))])], 1)];
        }
      }], null, false, 3867551738)
    }, [_c("span", [_vm._v(_vm._s(_vm.isPostVoted ? "\u5DF2\u6536\u85CF" : "\u6536\u85CF"))])]) : _vm._e(), _c("v-tooltip", {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref2) {
          var on = _ref2.on, attrs = _ref2.attrs;
          return [_c("v-btn", _vm._g(_vm._b({
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
          }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v("mdi-link-variant")])], 1)];
        }
      }], null, false, 1677429821)
    }, [_c("span", [_vm._v("\u8BE6\u60C5")])]), _vm.imageSelected.sourceUrl ? _c("v-tooltip", {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref3) {
          var on = _ref3.on, attrs = _ref3.attrs;
          return [_c("v-btn", _vm._g(_vm._b({
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
          }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v("mdi-launch")])], 1)];
        }
      }], null, false, 3813795830)
    }, [_c("span", [_vm._v(_vm._s("\u6765\u6E90 " + _vm.imageSelected.sourceUrl))])]) : _vm._e(), !_vm.isVideo ? _c("v-tooltip", {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref4) {
          var on = _ref4.on, attrs = _ref4.attrs;
          return [_c("v-btn", _vm._g(_vm._b({
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
          }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v(_vm._s(_vm.scaleOn ? "mdi-magnify-minus-outline" : "mdi-magnify-plus-outline"))])], 1)];
        }
      }], null, false, 2680521198)
    }, [_c("span", [_vm._v(_vm._s(_vm.scaleOn ? "\u7F29\u5C0F" : "\u67E5\u770B\u539F\u56FE"))])]) : _vm._e(), _c("v-menu", {
      attrs: {
        "dense": "",
        "open-on-hover": "",
        "offset-y": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref5) {
          var on = _ref5.on, attrs = _ref5.attrs;
          return [_c("v-btn", _vm._g(_vm._b({
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
          }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v("mdi-download")])], 1)];
        }
      }], null, false, 2659152063)
    }, [_c("v-list", {
      attrs: {
        "dense": "",
        "flat": ""
      }
    }, [_vm.imageSelected.sampleUrl ? _c("v-list-item", {
      attrs: {
        "two-line": "",
        "link": "",
        "dense": ""
      }
    }, [_c("v-list-item-content", {
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.download(_vm.imageSelected.sampleUrl, _vm.imageSelected.sampleDownloadName);
        }
      }
    }, [_c("v-list-item-title", [_vm._v("\u4E0B\u8F7D\u7F29\u7565\u56FE")]), _c("v-list-item-subtitle", {
      domProps: {
        "textContent": _vm._s(_vm.imageSelected.sampleDownloadText)
      }
    })], 1)], 1) : _vm._e(), _vm.imageSelected.jpegUrl ? _c("v-list-item", {
      attrs: {
        "two-line": "",
        "link": "",
        "dense": ""
      }
    }, [_c("v-list-item-content", {
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.download(_vm.imageSelected.jpegUrl, _vm.imageSelected.jpegDownloadName);
        }
      }
    }, [_c("v-list-item-title", [_vm._v("\u4E0B\u8F7D\u9AD8\u6E05\u56FE")]), _c("v-list-item-subtitle", {
      domProps: {
        "textContent": _vm._s(_vm.imageSelected.jpegDownloadText)
      }
    })], 1)], 1) : _vm._e(), _c("v-list-item", {
      attrs: {
        "two-line": "",
        "link": "",
        "dense": ""
      }
    }, [_c("v-list-item-content", {
      on: {
        "click": function($event) {
          $event.stopPropagation();
          return _vm.download(_vm.imageSelected.fileUrl, _vm.imageSelected.fileDownloadName);
        }
      }
    }, [_c("v-list-item-title", [_vm._v("\u4E0B\u8F7D\u539F\u6587\u4EF6")]), _c("v-list-item-subtitle", {
      domProps: {
        "textContent": _vm._s(_vm.imageSelected.fileDownloadText)
      }
    })], 1)], 1)], 1)], 1), _c("v-progress-circular", {
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
    }), _c("v-tooltip", {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref6) {
          var on = _ref6.on, attrs = _ref6.attrs;
          return [_c("v-btn", _vm._g(_vm._b({
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
          }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v("mdi-playlist-plus")])], 1)];
        }
      }], null, false, 3337236247)
    }, [_c("span", [_vm._v("\u52A0\u5165\u4E0B\u8F7D\u5217\u8868")])]), _c("v-tooltip", {
      attrs: {
        "bottom": ""
      },
      scopedSlots: _vm._u([{
        key: "activator",
        fn: function(_ref7) {
          var on = _ref7.on, attrs = _ref7.attrs;
          return [_c("v-btn", _vm._g(_vm._b({
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
          }, "v-btn", attrs, false), on), [_c("v-icon", [_vm._v("mdi-close")])], 1)];
        }
      }], null, false, 3254812189)
    }, [_c("span", [_vm._v("\u5173\u95ED")])])], 1), _c("v-chip-group", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.notYKSite && _vm.showImageToolbar,
        expression: "!notYKSite && showImageToolbar"
      }],
      staticClass: "hidden-sm-and-down",
      staticStyle: {
        "position": "absolute",
        "bottom": "24px",
        "padding": "0 12px"
      },
      attrs: {
        "column": ""
      }
    }, _vm._l(_vm.imageSelected.tags, function(tag, i) {
      return _c("v-chip", {
        key: tag + i,
        staticClass: "mr-1",
        attrs: {
          "small": "",
          "color": "#ee8888b3",
          "text-color": "#ffffff"
        },
        domProps: {
          "textContent": _vm._s(tag)
        },
        on: {
          "click": function($event) {
            $event.stopPropagation();
            return _vm.toTagsPage(tag);
          }
        }
      });
    }), 1), _c("div", {
      staticClass: "img_scale_scroll"
    }, [_c("img", {
      attrs: {
        "src": _vm.scaleOn ? (_vm$imageSelected$fil = _vm.imageSelected.fileUrl) !== null && _vm$imageSelected$fil !== void 0 ? _vm$imageSelected$fil : void 0 : void 0,
        "alt": ""
      }
    })]), _vm.isVideo ? _c("video", {
      staticStyle: {
        "width": "100%"
      },
      attrs: {
        "controls": "",
        "src": (_vm$imageSelected$fil2 = _vm.imageSelected.fileUrl) !== null && _vm$imageSelected$fil2 !== void 0 ? _vm$imageSelected$fil2 : void 0
      }
    }) : _vm._e()], 1) : _vm._e()], 1);
  };
  var staticRenderFns$2 = [];
  const __cssModules$2 = {};
  var __component__$2 = /* @__PURE__ */ normalizeComponent(__sfc_main$2, render$2, staticRenderFns$2, false, __vue2_injectStyles$2, null, null, null);
  function __vue2_injectStyles$2(context) {
    for (let o in __cssModules$2) {
      this[o] = __cssModules$2[o];
    }
  }
  var ImageDetail = /* @__PURE__ */ function() {
    return __component__$2.exports;
  }();
  const __sfc_main$1 = {};
  __sfc_main$1.setup = (__props, __ctx) => {
    const showImageList = VueCompositionAPI2.ref(true);
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
    const isYKSite2 = VueCompositionAPI2.computed(() => {
      return ["konachan", "yande"].some((e) => {
        var _a2;
        return (_a2 = store.imageList[0]) == null ? void 0 : _a2.booru.domain.includes(e);
      });
    });
    const maxHeightStyle = VueCompositionAPI2.computed(() => {
      const num = +store.selectedColumn;
      if (num == 0 || num > 3)
        return "max-height: 60vh;overflow: hidden";
      return "";
    });
    const getImgSrc = (img) => {
      var _a2, _b, _c, _d;
      if (columnCount.value < 6) {
        return (_b = (_a2 = img.sampleUrl) != null ? _a2 : img.fileUrl) != null ? _b : void 0;
      }
      return (_d = (_c = img.previewUrl) != null ? _c : img.fileUrl) != null ? _d : void 0;
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
    const params = new URLSearchParams(location.search);
    let page = getFirstPageNo(params);
    const tags = params.get("tags");
    const fetchData = async (refresh2) => {
      if (refresh2)
        page = 1;
      store.requestState = true;
      try {
        const results = await searchBooru(page, tags);
        if (Array.isArray(results) && results.length > 0) {
          store.currentPage = page;
          if (refresh2) {
            store.imageList = results;
            store.selectedImageList = [];
          } else {
            store.imageList = [...store.imageList, ...results];
          }
          pushPageState(page);
          page++;
        } else {
          store.requestStop = true;
        }
      } catch (error) {
        console.log("fetch error: " + error);
      } finally {
        store.requestState = false;
      }
    };
    const calcFetchTimes = () => {
      const vcont = document.querySelector("._vcont");
      const cnth = vcont == null ? void 0 : vcont.clientHeight;
      const doch = document.documentElement.clientHeight;
      return cnth ? Math.floor(doch / cnth) : 1;
    };
    const initData = async (refresh2) => {
      await fetchData(refresh2);
      const times = calcFetchTimes();
      for (let index = 0; index < times; index++) {
        await fetchData();
      }
    };
    const vuetify = useVuetify();
    const refresh = () => {
      vuetify.goTo(0);
      initData(true);
    };
    VueCompositionAPI2.onMounted(async () => {
      await initData();
      window.addEventListener("scroll", throttleScroll((scroll) => {
        if (!store.showFab && scroll > 200)
          store.showFab = true;
        if (store.requestStop)
          return;
        if (store.requestState)
          return;
        isReachBottom() && fetchData();
      }, () => {
        if (store.showFab)
          store.showFab = false;
      }));
    });
    return {
      store,
      showImageList,
      columnCount,
      showNoMore,
      showLoadMore,
      showMenu,
      x,
      y,
      isYKSite: isYKSite2,
      maxHeightStyle,
      getImgSrc,
      onCtxMenu,
      showImgModal,
      openDetail,
      addToSelectedList,
      addFavorite,
      fetchData,
      refresh
    };
  };
  __sfc_main$1.components = Object.assign({
    ImageDetail
  }, __sfc_main$1.components);
  var render$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.showImageList ? _c("v-container", {
      staticClass: "_vcont pa-2",
      attrs: {
        "fluid": ""
      }
    }, [_c("masonry", {
      attrs: {
        "cols": _vm.columnCount,
        "gutter": "8px"
      }
    }, _vm._l(_vm.store.imageList, function(image, index) {
      return _c("v-card", {
        key: index,
        staticClass: "mb-2",
        style: _vm.maxHeightStyle
      }, [_c("v-img", {
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
          }
        },
        scopedSlots: _vm._u([{
          key: "placeholder",
          fn: function() {
            return [_c("v-row", {
              staticClass: "fill-height ma-0",
              attrs: {
                "align": "center",
                "justify": "center"
              }
            }, [_c("v-progress-circular", {
              attrs: {
                "indeterminate": "",
                "color": "deep-purple"
              }
            })], 1)];
          },
          proxy: true
        }], null, true)
      })], 1);
    }), 1), _c("div", {
      staticClass: "d-flex justify-center"
    }, [_c("v-btn", {
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
    }, [_vm._v(" \u52A0\u8F7D\u4E2D... ")]), _c("v-btn", {
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
          return _vm.fetchData();
        }
      }
    }, [_vm._v(" \u52A0\u8F7D\u66F4\u591A ")]), _c("v-btn", {
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
    }, [_vm._v(" \u4E0B\u9762\u6CA1\u6709\u4E86... ")])], 1), _c("v-menu", {
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
    }, [_c("v-list", [_vm.isYKSite ? _c("v-list-item", {
      on: {
        "click": _vm.addFavorite
      }
    }, [_c("v-list-item-title", [_vm._v("\u52A0\u5165\u6536\u85CF")])], 1) : _vm._e(), _c("v-list-item", {
      on: {
        "click": _vm.openDetail
      }
    }, [_c("v-list-item-title", [_vm._v("\u65B0\u6807\u7B7E\u9875\u6253\u5F00")])], 1), _c("v-list-item", {
      on: {
        "click": _vm.addToSelectedList
      }
    }, [_c("v-list-item-title", [_vm._v("\u52A0\u5165\u4E0B\u8F7D\u5217\u8868")])], 1)], 1)], 1), _c("v-fab-transition", [_c("v-btn", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.store.showFab,
        expression: "store.showFab"
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
        "click": _vm.refresh
      }
    }, [_c("v-icon", [_vm._v("mdi-refresh")])], 1)], 1), _c("image-detail")], 1) : _vm._e();
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
    const changeTheme = () => {
      var _a2;
      const mode = (_a2 = localStorage.getItem("__darkmode")) != null ? _a2 : "dark";
      vuetify.theme.dark = mode === "dark";
    };
    VueCompositionAPI2.onMounted(() => {
      changeTheme();
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
    var _c = _vm._self._c || _h;
    return _c("v-app", [_c("AppBar"), _c("NavDrawer"), _c("v-main", {
      attrs: {
        "app": ""
      }
    }, [_c("AppContainer")], 1)], 1);
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
