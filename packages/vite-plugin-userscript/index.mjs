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
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// src/common/constant.ts
var DEV_MODE = "development";
var PROD_MODE = "production";
var GM_ADD_STYLE = "GM_addStyle";
var DEFAULT_NPM_CDN = "https://unpkg.com";
var INTRO_FOR_PLACEHOLDER = 'console.warn("__TEMPLATE_INJECT_CSS_PLACEHOLDER_NOT_WORK__")';
var grants = [
  "unsafeWindow",
  "GM_addStyle",
  "GM_addElement",
  "GM_deleteValue",
  "GM_listValues",
  "GM_addValueChangeListener",
  "GM_removeValueChangeListener",
  "GM_setValue",
  "GM_getValue",
  "GM_log",
  "GM_getResourceText",
  "GM_getResourceURL",
  "GM_registerMenuCommand",
  "GM_unregisterMenuCommand",
  "GM_openInTab",
  "GM_xmlhttpRequest",
  "GM_download",
  "GM_getTab",
  "GM_saveTab",
  "GM_getTabs",
  "GM_notification",
  "GM_setClipboard",
  "GM_info"
];
var tmHeaderKeys = [
  "name",
  "name:en",
  "name:zh",
  "name:zh-cn",
  "version",
  "description",
  "description:en",
  "description:zh",
  "description:zh-cn",
  "author",
  "namespace",
  "license",
  "match",
  "include",
  "require",
  "homepage",
  "homepageURL",
  "website",
  "source",
  "icon",
  "iconURL",
  "defaulticon",
  "icon64",
  "icon64URL",
  "updateURL",
  "downloadURL",
  "supportURL",
  "contributionURL",
  "contributionAmount",
  "compatible",
  "incompatible",
  "exclude",
  "resource",
  "connect",
  "run-at",
  "grant",
  "noframes",
  "unwrap",
  "nocompat",
  "antifeature"
];

// src/lib/client-code.ts
function generateClientCode({ address, port }, entry) {
  return `
  const url = 'http://${address}:${port}'

  const originFetch = unsafeWindow.fetch
  const ping = '/__vite_ping'
  unsafeWindow.fetch = function(input, init) {
    if (input === ping) {
      input = url + ping
    }
    return originFetch(input, init)
  }

  ${grants.map((item) => `unsafeWindow.${item} = ${item}`).join("\n  ")}

  function createModuleScript(path) {
    if (typeof GM_addElement == 'function') {
      return GM_addElement('script', {
        type: 'module',
        src: url + '/' + path
      })
    } else {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = url + '/' + path
      document.body.appendChild(script)
      return script
    }
  }

  createModuleScript('@vite/client')
  createModuleScript('${entry != null ? entry : "src/main.ts"}')
`;
}

// src/common/utils.ts
import fs from "fs";
import path from "path";
var root = process.cwd();
function readJSON(filePath) {
  const json = fs.readFileSync(filePath, "utf8");
  return JSON.parse(json);
}
function readPackageJSON() {
  const packagePath = path.resolve(root, "package.json");
  return readJSON(packagePath);
}
function buildName(name) {
  return name.replace(/(^|-)([A-Za-z])/g, (m) => m.replace("-", "").toUpperCase());
}
function buildGlobalName(input) {
  if (!input)
    return input;
  if (Array.isArray(input)) {
    const result = {};
    for (const name of input) {
      result[name] = buildName(name);
    }
    return result;
  }
  const globals = {};
  for (const [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      globals[key] = value[0];
    } else {
      globals[key] = value;
    }
  }
  return globals;
}
function buildDefaultCDN(packageName) {
  const packagePath = path.resolve(root, `node_modules/${packageName}/package.json`);
  if (fs.existsSync(packagePath)) {
    const { version = "latest" } = readJSON(packagePath);
    return `${DEFAULT_NPM_CDN}/${packageName}@${version}`;
  }
  return `${DEFAULT_NPM_CDN}/${packageName}`;
}
function buildRequireCDN(input) {
  if (!input)
    return [];
  if (Array.isArray(input)) {
    return input.map((name) => buildDefaultCDN(name)).filter(Boolean);
  }
  const requireCDNs = [];
  for (const [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      value[1] && requireCDNs.push(value[1]);
      continue;
    }
    requireCDNs.push(buildDefaultCDN(key));
  }
  return requireCDNs;
}
function defaultEntry() {
  const tsconfigFile = path.resolve(root, "vite.config.ts");
  const extension = fs.existsSync(tsconfigFile) ? "ts" : "js";
  return path.resolve(root, `src/main.${extension}`);
}
function getDefinedConfig() {
  const jsonPath = path.resolve(root, "header.config.json");
  if (fs.existsSync(jsonPath)) {
    return readJSON(jsonPath);
  }
  const jsPath = path.resolve(root, "header.config.js");
  if (fs.existsSync(jsPath)) {
    return __require(jsPath);
  }
  const txtPath = path.resolve(root, "header.config.txt");
  if (fs.existsSync(txtPath)) {
    return fs.readFileSync(txtPath, "utf8");
  }
  return readPackageJSON().tmHeader;
}

// src/lib/grants.ts
import { full as walkFull } from "acorn-walk";
var grantsSet = new Set(grants);
var usedGrants = /* @__PURE__ */ new Set();
function parseGrant(autoGrant) {
  if (autoGrant === false)
    return {};
  return {
    name: "tm-userscript-grant",
    moduleParsed(moduleInfo) {
      if (/\.(ts|js|vue)$/.test(moduleInfo.id) && moduleInfo.ast) {
        walkFull(moduleInfo.ast, (node) => {
          if (node.type === "CallExpression") {
            const calleeName = node.callee.name;
            if (calleeName && grantsSet.has(calleeName)) {
              usedGrants.add(calleeName);
            }
          }
          if (node.type === "Identifier" && grantsSet.has(node.name)) {
            usedGrants.add(node.name);
          }
        });
      }
    }
  };
}
function addUsedGrants(tmConfig, isDevelopment = false) {
  if (isDevelopment) {
    tmConfig.grant = grants;
    return;
  }
  if (!Array.isArray(tmConfig.grant)) {
    tmConfig.grant = [tmConfig.grant].filter(Boolean);
  }
  tmConfig.grant = [.../* @__PURE__ */ new Set([...tmConfig.grant, ...usedGrants])];
}
function addExtraTmGrant(tmConfig) {
  if (!Array.isArray(tmConfig.grant)) {
    tmConfig.grant = [tmConfig.grant].filter(Boolean);
  }
  if (!tmConfig.grant.includes(GM_ADD_STYLE)) {
    tmConfig.grant.push(GM_ADD_STYLE);
  }
  return tmConfig;
}

// src/lib/tm-header.ts
function generateTmHeader(mode, input, hasCss, headers) {
  var _a, _b, _c;
  const definedConfig = (_a = headers != null ? headers : getDefinedConfig()) != null ? _a : {};
  if (typeof definedConfig == "string")
    return definedConfig;
  const packageJson = readPackageJSON();
  const config = {};
  for (const key of tmHeaderKeys) {
    const value = (_b = definedConfig[key]) != null ? _b : packageJson[key];
    if (value)
      config[key] = value;
  }
  config.require = [
    ...Array.isArray(config.require) ? config.require : [(_c = config.require) != null ? _c : ""],
    ...buildRequireCDN(input)
  ].filter(Boolean);
  if (mode === DEV_MODE) {
    addUsedGrants(config, true);
    config.name = "[ Dev ] - " + config.name;
  } else {
    hasCss && addExtraTmGrant(config);
    addUsedGrants(config);
  }
  const definedMetaKeys = Object.keys(config);
  const maxKeyLength = Math.max(...definedMetaKeys.map((k) => k.length));
  const definedMetaBlock = definedMetaKeys.flatMap((key) => {
    const value = config[key];
    const spaces = Array.from({ length: maxKeyLength - key.length + 8 }).join(" ");
    const dealMeta = (v) => {
      if (Array.isArray(v))
        return v.map((element) => dealMeta(element));
      if (typeof v == "boolean" && v === true)
        return `// @${key}`;
      return `// @${key}${spaces}${v}`;
    };
    return dealMeta(value);
  });
  return [
    "// ==UserScript==",
    ...definedMetaBlock,
    "// ==/UserScript=="
  ].join("\n");
}

// src/lib/build-options.ts
var getRollupOptions = (input) => {
  const external = Array.isArray(input) ? input : Object.keys(input != null ? input : {});
  const globals = buildGlobalName(input);
  return {
    external,
    output: {
      globals,
      intro: INTRO_FOR_PLACEHOLDER,
      inlineDynamicImports: true
    }
  };
};
var getLibraryOptions = (entry) => {
  const { name: packageName } = readPackageJSON();
  if (!packageName) {
    const error = "props `name` in package.json is required!";
    console.error(error);
    throw new Error(error);
  }
  const name = buildName(packageName);
  return {
    name,
    entry: entry != null ? entry : defaultEntry(),
    formats: ["iife"],
    fileName: () => `${packageName}.user.js`
  };
};

// src/lib/plugin.ts
function generateDevelopmentCode(address, input, entry, headers) {
  if (!address)
    return "\u5904\u7406\u5927\u5931\u8D25\u4E86\u55F7...";
  const tmHeader = generateTmHeader(DEV_MODE, input, true, headers);
  const code = generateClientCode(address, entry);
  return `${tmHeader}

(function () {
${code}
})()`;
}
function getAddress(address) {
  return typeof address == "object" ? address : void 0;
}
var DEV_TAMPERMONKEY_PATH = "/_development.user.js";
var showInstallLog = (address) => {
  const url = `http://${address.address}:${address.port}${DEV_TAMPERMONKEY_PATH}`;
  setTimeout(() => {
    console.log("\x1B[36m%s\x1B[0m", `> [TMPlugin] - click link to install userscript: ${url}`);
  });
};
function tampermonkeyPlugin(options = {}) {
  const { entry, externalGlobals, autoGrant, headers } = options;
  const { moduleParsed } = parseGrant(autoGrant);
  return [
    {
      name: "tm-userscript-builder",
      moduleParsed,
      configureServer(server) {
        return () => {
          var _a;
          (_a = server.httpServer) == null ? void 0 : _a.on("listening", () => {
            var _a2;
            const address = getAddress((_a2 = server.httpServer) == null ? void 0 : _a2.address());
            address && showInstallLog(address);
          });
          server.middlewares.use((request, response, next) => {
            var _a2;
            if (request.url === DEV_TAMPERMONKEY_PATH) {
              const address = getAddress((_a2 = server.httpServer) == null ? void 0 : _a2.address());
              const developmentCode = generateDevelopmentCode(address, externalGlobals, entry, headers);
              response.setHeader("Cache-Control", "no-store");
              response.write(developmentCode);
            }
            next();
          });
        };
      },
      config(config) {
        var _a;
        let hmr = (_a = config.server) == null ? void 0 : _a.hmr;
        if (typeof hmr === "boolean" || !hmr)
          hmr = {};
        hmr.protocol = "ws";
        hmr.host = "127.0.0.1";
        config.server = __spreadProps(__spreadValues({}, config.server), {
          hmr
        });
        config.build = {
          target: 'es2020',
          lib: getLibraryOptions(entry),
          rollupOptions: getRollupOptions(externalGlobals),
          minify: false,
          sourcemap: false,
          cssCodeSplit: false
        };
      }
    },
    {
      name: "tm-userscript-inject",
      apply: "build",
      enforce: "post",
      generateBundle(_options, bundle) {
        const bundleKeys = Object.keys(bundle);
        const cssBundles = bundleKeys.filter((key) => key.endsWith(".css"));
        const jsBundles = bundleKeys.filter((key) => key.endsWith(".js"));
        const cssList = [];
        for (const css of cssBundles) {
          const chunk = bundle[css];
          if (chunk.type === "asset" && typeof chunk.source == "string") {
            delete bundle[css];
            cssList.push(chunk.source);
            continue;
          }
        }
        const hadCss = cssList.length > 0;
        const tmHeader = generateTmHeader(PROD_MODE, externalGlobals, hadCss, headers);
        for (const js of jsBundles) {
          const chunk = bundle[js];
          if (chunk.type === "chunk") {
            let chunkCode = chunk.code;
            for (const [moduleKey, moduleValue] of Object.entries(chunk.modules)) {
              if (/\.(c|le|sc)ss$/.test(moduleKey) && moduleValue.code) {
                const cssCode = moduleValue.code.replaceAll("'", '"').replaceAll("#__PURE__", "@__PURE__");
                chunkCode = chunkCode.replace(cssCode, "");
              }
            }
            chunk.code = tmHeader + "\n\n" + chunkCode.replace(INTRO_FOR_PLACEHOLDER, hadCss ? `${GM_ADD_STYLE}(\`
${cssList.join("\n")}  \`)` : "");
          }
        }
      }
    }
  ];
}

// src/index.ts
function defineTmHeader(options) {
  return options;
}
export {
  tampermonkeyPlugin as default,
  defineTmHeader
};
