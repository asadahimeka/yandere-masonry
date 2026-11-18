import type { Post } from '@himeka/booru'

export interface PostImage {
  fileUrl: string
  previewUrl: string
  width: number
  height: number
}

export interface MultiImagePost extends Post {
  images?: PostImage[]
  title?: string
  mediaCount?: number
}

/** 详情抓取结果（多图站点通用契约） */
export interface MultiImageDetail {
  fileUrl?: string | null
  sampleUrl?: string | null
  tags?: string[]
  source?: string | null
  images?: PostImage[]
  title?: string
  /** 详情页才知道的真实宽高（列表阶段只能量到预览图时用它回填卡片） */
  width?: number
  height?: number
}

/**
 * 站点行为契约：`is` 必选，列表抓取（posts）与详情抓取（detail）按能力可选。
 * 所有站点适配器统一注册在 `src/store/actions/site.ts` 的 `siteActions`。
 */
export interface SiteAdapter {
  is: () => boolean
  posts?: (page: number, tags: string | null) => Promise<Post[]>
  detail?: (id: string) => Promise<MultiImageDetail>
}

/** 多图站点适配器契约（posts 与 detail 均必选的强约束版） */
export interface MultiImageAdapter extends SiteAdapter {
  is: () => boolean
  posts: (page: number, tags: string | null) => Promise<Post[]>
  detail: (id: string) => Promise<MultiImageDetail>
}

/*
 * 多图站点适配器必须遵守的约定（均为 16k 实现中真实踩过并修复的坑）：
 *
 * 1. `images: []` 必须在列表对象里预置 —— Vue 2 不追踪观察后新增的属性，
 *    否则详情回填时赋值不会触发渲染，多图缩略图条将永远不显示。
 * 2. `fileDownloadName` 末尾不能是 `.数字` 形式 —— 否则 `downloadFile` 的
 *    `/\.\w+$/` 会误判为已有扩展名，不会补 `.jpg`。
 * 3. `fileExt` 必须在列表阶段给出 —— 列表页的 mp4/gif 角标依赖它。
 * 4. 多图帖下载须针对当前选中那张，不是固定第一张。
 */

/** 三个访问器：从 Post 上取多图信息 */
export function getPostImages(post?: Post | null): PostImage[] {
  return (post as MultiImagePost | undefined | null)?.images ?? []
}

export function getMediaCount(post?: Post | null): number {
  const typed = post as MultiImagePost | undefined | null
  if (!typed) return 0
  if (typeof typed.mediaCount === 'number') return typed.mediaCount
  return typed.images?.length ?? 0
}

export function getPostTitle(post?: Post | null): string {
  return (post as MultiImagePost | undefined | null)?.title ?? ''
}
