import type { Post } from '@himeka/booru'

export type InlinePlayKind = 'video' | 'anim'

const VIDEO_EXTS = ['mp4', 'webm']

/** 动图（gif）的播放地址：gelbooru/realbooru 等站的 sampleUrl 直接指向 gif 原图，优先用它 */
function getInlineAnimSrc(post?: Post | null): string | null {
  const { sampleUrl, fileUrl } = post || {}
  if (sampleUrl && /\.gif($|\?)/i.test(sampleUrl)) return sampleUrl
  if (fileUrl && /\.gif($|\?)/i.test(fileUrl)) return fileUrl
  return null
}

/**
 * 列表内联播放的媒体类型。仅在列表阶段已具备完整媒体信息时返回非空：
 * 与列表页视频/gif 角标共用同一数据（fileExt + 可用播放地址），
 * 详情按需抓取的站点（sankaku、animepictures 等）天然不满足条件。
 */
export function getInlinePlayKind(post?: Post | null): InlinePlayKind | null {
  const ext = post?.fileExt?.toLowerCase()
  if (!ext) return null
  if (VIDEO_EXTS.includes(ext) && post?.fileUrl) return 'video'
  if (ext === 'gif' && getInlineAnimSrc(post)) return 'anim'
  return null
}

export function canInlinePlay(post?: Post | null): boolean {
  return !!getInlinePlayKind(post)
}

/** 内联播放地址；null 表示不可播放 */
export function getInlinePlaySrc(post?: Post | null): string | null {
  const ext = post?.fileExt?.toLowerCase()
  if (!ext) return null
  if (VIDEO_EXTS.includes(ext)) return post?.fileUrl || null
  if (ext === 'gif') return getInlineAnimSrc(post)
  return null
}
