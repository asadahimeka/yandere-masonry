import type { Ref } from 'vue'
import type { Post } from '@himeka/booru'
import { fetchDetailActions } from './site'
import { store } from '@/store'
import { type PostDetail, getPostDetail } from '@/api/moebooru'
import { getDanbooruTagDetail, isDanbooruPage } from '@/api/danbooru'
import i18n from '@/utils/i18n'

const isCNLang = i18n.locale.includes('zh')

export async function handlePostDetail(img: Ref<Post>) {
  const { fileUrl, sampleUrl, tags } = await fetchDetailActions
    .find(e => e.is())
    ?.detail(img.value.id) || {}
  if (tags?.length) img.value.tags = tags
  if (fileUrl) img.value.fileUrl = fileUrl
  if (sampleUrl) img.value.fileUrl = sampleUrl
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

  await handlePostDetail(imageSelected)

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
