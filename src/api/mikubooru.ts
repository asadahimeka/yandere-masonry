export const MIKUBOORU_HOST = 'booru.funmaker.moe'

const PAGE_SIZE = 40

// Hybooru has no safe/questionable/explicit enum; its rating filter is a 1-5 star count.
// 站点的 rating 区间只认数字，直接传 rating:s / rating:e 会被当成普通 tag（实测只命中 1 条）。
const ratingMap: Record<string, string> = {
  'rating:s': 'rating:1-2',
  'rating:q': 'rating:3',
  'rating:e': 'rating:4-5',
  'rating:safe': 'rating:1-2',
  'rating:questionable': 'rating:3',
  'rating:explicit': 'rating:4-5',
  'rating:general': 'rating:1-2',
}

// Hybooru 的 query 最多接受 40 段，超出会直接 400
const MAX_QUERY_PARTS = 40

function convertQuery(tags: string | null) {
  return (tags || '')
    .split(/\s+/)
    .map(token => {
      // rating 区间不支持取反（实测 -rating:1-2 会被静默忽略），只能丢弃
      if (token.startsWith('-')) {
        return ratingMap[token.slice(1)] ? '' : token
      }
      return ratingMap[token] || token
    })
    .filter(Boolean)
    .slice(0, MAX_QUERY_PARTS)
    .join(' ')
}

function originalUrl(sha256: string, extension: string) {
  return `${location.origin}/files/f${sha256}${extension}`
}

function thumbnailUrl(sha256: string) {
  return `${location.origin}/files/t${sha256}.thumbnail`
}

export function isMikubooru() {
  return location.host === MIKUBOORU_HOST
}

export async function fetchMikubooruPosts(page: number, tags: string | null) {
  const url = new URL('/api/post', location.origin)
  if (tags && tags !== 'all') {
    url.searchParams.set('query', convertQuery(tags))
  }
  url.searchParams.set('page', `${page - 1}`)
  url.searchParams.set('pageSize', `${PAGE_SIZE}`)
  url.searchParams.set('blurhash', 'true')
  const resp = await fetch(url.href)
  const json = await resp.json()
  return (json.posts || []).map((p: any) => {
    const width = p.width || 0
    const height = p.height || 0
    const fileExt = String(p.extension || '').replace(/^\./, '')
    const id = String(p.id)
    return {
      id,
      postView: `${location.origin}/posts/${p.id}`,
      previewUrl: thumbnailUrl(p.sha256),
      fileUrl: originalUrl(p.sha256, p.extension),
      sampleUrl: null,
      width,
      height,
      aspectRatio: height ? width / height : 1,
      // Tags are filled lazily through the detail action.
      tags: [],
      rating: 'u',
      fileExt,
      fileDownloadName: `mikubooru_${id}_${width}x${height}.${fileExt}`,
      score: 0,
      source: null,
      createdAt: p.posted ? new Date(p.posted) : null,
    } as any
  })
}

export async function getMikubooruDetail(id: string) {
  const resp = await fetch(`${location.origin}/api/post/${id}`)
  const post = await resp.json()
  if (!post) {
    return { fileUrl: null, sampleUrl: null, tags: [], source: null }
  }
  return {
    fileUrl: originalUrl(post.sha256, post.extension),
    sampleUrl: null,
    // tags values are global usage counts; only the keys are this post's tags.
    tags: Object.keys(post.tags || {}),
    source: post.sources?.[0] || null,
  }
}

export const mikubooru = {
  is: isMikubooru,
  posts: fetchMikubooruPosts,
  detail: getMikubooruDetail,
}
