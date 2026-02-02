"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BooruClass: () => Booru,
  BooruError: () => BooruError,
  Derpibooru: () => Derpibooru,
  Post: () => Post,
  SearchResults: () => SearchResults,
  Site: () => Site,
  XmlBooru: () => XmlBooru,
  default: () => src_default,
  forSite: () => booruForSite,
  resolveSite: () => resolveSite,
  search: () => search,
  sites: () => sites
});
module.exports = __toCommonJS(src_exports);

// src/sites.json
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

// src/Constants.ts
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
  if (credentials?.query) {
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

// src/boorus/Booru.ts
var import_isomorphic_unfetch = require("isomorphic-unfetch");

// src/Utils.ts
var import_fast_xml_parser = require("fast-xml-parser");
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
var xmlParser = new import_fast_xml_parser.XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: ""
});
function jsonfy(xml) {
  if (typeof xml === "object")
    return xml;
  const data = xmlParser.parse(xml);
  if (data.html || data["!doctype"]) {
    const page = data.html || data["!doctype"]?.html;
    const message = [];
    if (page.body.h1) {
      message.push(page.body.h1);
    }
    if (page.body.p) {
      message.push(page.body.p["#text"]);
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

// src/structures/Post.ts
function parseImageUrl(url, data, booru, type = "file") {
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
    const directory = data.directory ?? `${data.hash.substr(0, 2)}/${data.hash.substr(2, 2)}`;
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
  return url?.split(".").pop() ?? "";
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
  booru;
  fileUrl;
  height;
  width;
  sampleUrl;
  sampleHeight;
  sampleWidth;
  previewUrl;
  previewHeight;
  previewWidth;
  id;
  available;
  tags;
  score;
  source;
  rating;
  createdAt;
  data;
  constructor(data, booru) {
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
    return this.data.jpeg_url ?? "";
  }
  get jpegWidth() {
    return this.data.jpeg_width ?? 0;
  }
  get jpegHeight() {
    return this.data.jpeg_height ?? 0;
  }
  get fileExt() {
    return this.data.file_ext ?? getFileExt(this.fileUrl);
  }
  get sampleSize() {
    return this.data.sample_file_size ?? 0;
  }
  get jpegSize() {
    return this.data.jpeg_file_size ?? 0;
  }
  get fileSize() {
    return this.data.file_size ?? 0;
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

// src/structures/SearchResults.ts
var SearchResults = class extends Array {
  booru;
  page;
  tags;
  options;
  posts;
  constructor(posts, tags, options, booru) {
    super(posts.length);
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

// src/boorus/Booru.ts
var Booru = class {
  domain;
  site;
  credentials;
  constructor(site, credentials) {
    const domain = resolveSite(site.domain);
    if (domain === null) {
      throw new Error(`Invalid site passed: ${site}`);
    }
    this.domain = domain;
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

// src/boorus/Derpibooru.ts
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

// src/boorus/XmlBooru.ts
var XmlBooru = class extends Booru_default {
  constructor(site, credentials) {
    super(site, credentials);
  }
};

// src/structures/Site.ts
var Site = class {
  domain;
  type;
  aliases;
  nsfw;
  api;
  paginate;
  random;
  tagQuery;
  tagJoin;
  insecure;
  defaultTags;
  constructor(data) {
    this.domain = data.domain;
    this.type = data.type ?? "json";
    this.aliases = data.aliases ?? [];
    this.nsfw = data.nsfw;
    this.api = data.api ?? {};
    this.paginate = data.paginate ?? "page";
    this.random = data.random ?? false;
    this.tagQuery = data.tagQuery ?? "tags";
    this.tagJoin = data.tagJoin ?? "+";
    this.insecure = data.insecure ?? false;
    this.defaultTags = data.defaultTags ?? [];
  }
};

// src/index.ts
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
var src_default = booruForSite;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BooruClass,
  BooruError,
  Derpibooru,
  Post,
  SearchResults,
  Site,
  XmlBooru,
  forSite,
  resolveSite,
  search,
  sites
});
