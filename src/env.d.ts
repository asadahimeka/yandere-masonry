/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vuetify/lib/framework' {
  import 'vuetify/types'
  import Vuetify from 'vuetify'
  export default Vuetify
}

declare module 'vue-masonry-css' {
  import { PluginOption } from 'vite'
  import Vue from 'vue'
  export default {
    install(app: typeof Vue, options: PluginOption): void
  }
}

declare const Macy: any

declare const Cookie: {
  get: (name: string) => string,
  put: (name: string, value: string, days?: number) => void
}

/**
 * Creates an HTML element specified by 'tag_name' and applies all given 'attributes' and returns the injected HTML element.
 * If a 'parent_node' is given, then it is attached to it or to document head or body otherwise.
 *
 * For suitable 'attributes', please consult the appropriate documentation.
 *
 * ```js
 * GM_addElement('script', {
 *   src: 'https://example.com/script.js',
 *   type: 'text/javascript'
 * });
 * ```
 *
 * Note: this feature is experimental and the API may change.
 */
declare function GM_addElement(tagName: 'script', attributes: Record<string, any>): HTMLScriptElement;
