import { Plugin } from 'vite';

declare type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

declare const grants: readonly ["unsafeWindow", "GM_addStyle", "GM_addElement", "GM_deleteValue", "GM_listValues", "GM_addValueChangeListener", "GM_removeValueChangeListener", "GM_setValue", "GM_getValue", "GM_log", "GM_getResourceText", "GM_getResourceURL", "GM_registerMenuCommand", "GM_unregisterMenuCommand", "GM_openInTab", "GM_xmlhttpRequest", "GM_download", "GM_getTab", "GM_saveTab", "GM_getTabs", "GM_notification", "GM_setClipboard", "GM_info"];
declare type Grant = typeof grants[number];
declare const tmHeaderKeys: readonly ["name", "name:en", "name:zh", "name:zh-cn", "version", "description", "description:en", "description:zh", "description:zh-cn", "author", "namespace", "license", "match", "include", "require", "homepage", "homepageURL", "website", "source", "icon", "iconURL", "defaulticon", "icon64", "icon64URL", "updateURL", "downloadURL", "supportURL", "contributionURL", "contributionAmount", "compatible", "incompatible", "exclude", "resource", "connect", "run-at", "grant", "noframes", "unwrap", "nocompat", "antifeature"];
declare type RunAt = 'document-start' | 'document-body' | 'document-end' | 'document-idle' | 'context-menu';
declare type AntiFeature = 'ads' | 'tracking' | 'miner' | 'membership' | 'payment' | 'referral-link';
declare type TmHeaderKey = typeof tmHeaderKeys[number];
declare type BareTmHeaderConfig = Partial<Record<TmHeaderKey, string | string[]>>;
declare type TmHeaderConfig = Merge<BareTmHeaderConfig, {
    noframes?: boolean;
    nocompat?: boolean;
    unwrap?: boolean;
    grant?: Grant | Grant[];
    'run-at'?: RunAt | RunAt[];
    antifeature?: AntiFeature | AntiFeature[];
}>;

interface TMPluginOptions {
    entry?: string;
    autoGrant?: boolean;
    headers?: TmHeaderConfig;
    externalGlobals?: string[] | Record<string, string | string[]>;
}
declare function tampermonkeyPlugin(options?: TMPluginOptions): Plugin[];

declare function defineTmHeader(options: TmHeaderConfig): TmHeaderConfig;

export { tampermonkeyPlugin as default, defineTmHeader };
