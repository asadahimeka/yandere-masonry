# vite-plugin-tm-userscript

![](https://img.shields.io/github/package-json/v/asadahimeka/vite-plugin-tm-userscript)
![](https://img.shields.io/badge/license-MIT-green)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/vite-plugin-tm-userscript/dev/tsup)
![](https://img.shields.io/github/package-json/dependency-version/asadahimeka/vite-plugin-tm-userscript/dev/typescript)

English | [中文](https://github.com/asadahimeka/vite-plugin-tm-userscript/blob/master/README-ZH.md)

> Recommended to use [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)
>
> 推荐使用功能更丰富的 [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)

Tampermonkey userscript developing & build plugin based on `vite`.

## Features

- Configure Tampermonkey's Userscript Header via a separate config file or the `tmHeader` field in `package.json`
- Automatically add used `grant` when building for production
- Import all `grant` by default in development mode, and add all `grant` methods to `unsafeWindow`
- Through simple configuration, the imported external package can be `require` and automatically imported UNPKG CDN, see the plugin configuration below for details

## Usage

### Install

```bash
yarn add vite-plugin-tm-userscript -D
# OR
npm install vite-plugin-tm-userscript -D
```

### Configure `vite.config.ts`

```js
import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Userscript({
      externalGlobals: ['vue']
    })
  ]
})
```

### Configure Userscript Header

There are five ways to configure `Userscript Header`, the priority is as follows

1. Plugin option `headers`
2. `header.config.json`
3. `header.config.js`
4. `header.config.txt`
5. `tmHeader` field in `package.json`

Among them, `header.config.txt` uses Tampermonkey header annotation configuration, will not be processed, directly inserted into the script header

The other four formats are configured in json format, and multiple attribute configurations such as `match` are represented by an array, and `grant` and `require` are automatically added after processing

See [`example/header.config.js`](https://github.com/asadahimeka/vite-plugin-tm-userscript/blob/master/example/header.config.js) for example configuration

For specific property configuration, see [Tampermonkey Documentation](https://www.tampermonkey.net/documentation.php)

## Plugin Configuration

```ts
export interface TMPluginOptions {
  entry?: string;
  autoGrant?: boolean;
  headers?: TmHeaderConfig;
  externalGlobals?: string[] | Record<string, string | string[]>;
}
```

### `headers`

See [Configure Userscript Header](#configure-userscript-header)

For example

```js
// vite.config.js
import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.js',
      headers: {
        name: 'Test',
        namespace: 'https://www.nanoka.top',
        author: 'asadahimeka',
        description: 'No description',
        source: 'https://github.com/asadahimeka/userscripts',
        supportURL: 'https://github.com/asadahimeka/userscripts/issues',
        license: 'MIT',
        match: 'https://test.com/*',
        require: 'https://lib.baomitu.com/arrive/2.4.1/arrive.min.js',
        'run-at': 'document-start',
      },
    }),
  ],
})
```

### `externalGlobals`

Configure external packages, such as `vue`, `axios`, etc., to reduce the package size, and automatically declare `require`

Three configuration forms, CDN can be customized, if CDN is not configured, UNPKG CDN is used by default

```js
// 1
Userscript({
  externalGlobals: ['jquery']
})

// 2
Userscript({
  externalGlobals: {
    'jquery': 'jQuery'
  }
})

// 3
Userscript({
  externalGlobals: {
    'jquery': ['jQuery', 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js']
  }
})

// =>

return {
  rollupOptions: {
    external: ['jquery']
    output: {
      globals: {
        jquery: 'jQuery'
      }
    }
  }
}

// @require https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
```

### `autoGrant`

`boolean` type, defaults to `true`

Automatically analyze the Tampermonkey `grant` used in the code and add it to the Userscript Header declaration

### `entry`

Entry file, default is `src/main.js` or `src/main.ts`

## Example

See the [`example`](https://github.com/asadahimeka/vite-plugin-tm-userscript/tree/master/example) folder

## Notice

### Vite Configuration Additional Instructions

Production build mode will force the configuration of `config.build`:

- Camel case of the `name` (**required**) attribute of the package name `package.json` to build, and the file name to build is also related to it
- The file packaging format is `iife`, no compression, no separation of `css` files
- Additionally configured `rollupOptions` to support other features

### Disable CSP(Content-Security-Policy)

In development mode, the script of `vite` needs to be injected through the `script` tag. Some websites have enabled `CSP(Content-Security-Policy)`, resulting in an error. You can install the `Chrome` plugin [Disable Content-Security-Policy](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden) or [Always Disable Content-Security-Policy](https://chrome.google.com/webstore/detail/always-disable-content-se/ffelghdomoehpceihalcnbmnodohkibj), to disable `CSP(Content-Security-Policy)`, **open the plug-in during development (remember to close it at other times to ensure the security of web browsing)**.

Also, you can change Tampermonkey options(open `extension://iikmkjmpaadaobahmlepeloendndfphd/options.html#nav=settings`) at `Security`, set `Modify existing content security policy (CSP) headers` to `Remove entirely (possibly unsecure)`.

## Alternatives

[gorilla](https://github.com/apsking/gorilla)

[vite-plugin-tampermonkey](https://github.com/Thinker-ljn/vite-plugin-tampermonkey)

[vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)

## License

Forked from [vite-plugin-tampermonkey](https://www.npmjs.com/package/vite-plugin-tampermonkey).

Licensed under the MIT license.
