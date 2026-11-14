import type { Ref } from 'vue'
import type { Post } from '@himeka/booru'
import { fetchDetailActions } from './site'
import { store } from '@/store'
import { type PostDetail, getPostDetail } from '@/api/moebooru'
import { getDanbooruTagDetail, isDanbooruPage } from '@/api/danbooru'
import { eshuushuu } from '@/api'
import i18n from '@/utils/i18n'

const isCNLang = i18n.locale.includes('zh')

export async function handlePostDetail(img: Ref<Post>) {
  const { fileUrl, sampleUrl, tags, source } = await fetchDetailActions
    .find(e => e.is())
    ?.detail(img.value.id) || {}
  if (tags?.length) img.value.tags = tags
  if (source) img.value.source = source
  if (fileUrl) img.value.fileUrl = fileUrl
  if (sampleUrl) img.value.sampleUrl = sampleUrl
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
