import type { Ref } from 'vue'
import type { Post } from '@himeka/booru'
import { siteActions } from './site'
import { store } from '@/store'
import { type PostDetail, getPostDetail } from '@/api/moebooru'
import { getDanbooruTagDetail, isDanbooruPage } from '@/api/danbooru'
import { type MultiImagePost, eshuushuu } from '@/api'
import i18n from '@/utils/i18n'

const isCNLang = i18n.locale.includes('zh')

export async function handlePostDetail(img: Ref<Post>) {
  const { fileUrl, sampleUrl, tags, source, images, title, width, height } = await siteActions
    .find(e => e.is() && e.detail)
    ?.detail?.(img.value.id) || {}
  if (tags?.length) img.value.tags = tags
  if (source) img.value.source = source
  if (fileUrl) img.value.fileUrl = fileUrl
  if (sampleUrl) img.value.sampleUrl = sampleUrl
  if (images?.length) (img.value as MultiImagePost).images = images
  if (title) (img.value as MultiImagePost).title = title
  // 有的站点列表只能量到预览图（gsbooru 的 250px 缩略图），真实宽高在详情页才拿得到
  if (width && height) {
    const post = img.value as Post & { aspectRatio: number }
    post.width = width
    post.height = height
    post.aspectRatio = width / height
  }
}

/**
 * 给单个 Post 对象补详情（不经过 Ref）。
 *
 * 列表里的「快速下载」在拿不到任何地址时用它兜底 —— gsbooru / allgirl / hentaibooru
 * 这类站点的原图只写在单帖页里，列表阶段只能给封面。
 */
export function fillPostDetail(post: Post) {
  return handlePostDetail({ value: post } as Ref<Post>)
}

export async function setPostDetail(imageSelected: Ref<Post>, postDetail: Ref<PostDetail>) {
  if (store.isYKSite) {
    postDetail.value = {
      voted: false,
      tags: [],
    }
    const result = await getPostDetail(imageSelected.value.id)
    if (result) postDetail.value = result
    return
  }

  if (isDanbooruPage()) {
    postDetail.value = getDanbooruTagDetail(imageSelected.value)
    return
  }

  if (eshuushuu.is()) {
    postDetail.value = eshuushuu.tagDetail(imageSelected.value)
    return
  }

  // 详情请求失败不应该连带把标签也弄丢：标签本身来自列表数据
  try {
    await handlePostDetail(imageSelected)
  } catch (error) {
    console.log('handlePostDetail error:', error)
  }

  postDetail.value = {
    voted: false,
    tags: imageSelected.value.tags.map(tag => {
      const tagCN = window.__tagsCN?.[tag.replace(/_/g, ' ')]
      return {
        tag,
        tagText: isCNLang && tagCN ? `${tag} [ ${tagCN} ]` : tag,
        color: '#8F77B5',
        type: 'general',
      }
    }),
  }
}
