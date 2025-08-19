export function isSankakuIdolPage() {
  return location.hostname == 'www.idolcomplex.com'
}

const pageState: { next: string | null } = { next: null }
export async function fetchSankakuIdolPosts(page: number, tags: string | null) {
  if (page == 1) pageState.next = null
  const url = new URL('https://i.sankakuapi.com/v2/posts/keyset')
  url.searchParams.set('lang', navigator.language || 'zh-CN')
  url.searchParams.set('default_threshold', '1')
  url.searchParams.set('hide_posts_in_books', 'in-larger-tags')
  url.searchParams.set('limit', '40')
  url.searchParams.set('page', `${page}`)
  pageState.next && url.searchParams.set('next', `${pageState.next}`)
  tags && url.searchParams.set('tags', tags)
  const resp = await fetch(url.href, {
    headers: {
      'api-version': '2',
      'client-type': 'non-premium',
      'platform': 'web-app',
      'priority': 'u=1, i',
    },
  })
  const json = await resp.json()
  pageState.next = json.meta.next
  return json.data.filter((e: any) => e.preview_url).map((e: any) => {
    const fileExt = e.file_ext
    return {
      id: e.id,
      postView: `https://www.idolcomplex.com/posts/${e.id}`,
      previewUrl: e.preview_url,
      fileUrl: '',
      tags: e.tags.map((t: any) => t.name + (t.name_ja ? `[${t.name_ja}]` : '')),
      width: e.width,
      height: e.height,
      aspectRatio: e.width / e.height,
      fileExt,
      fileDownloadName: `sankaku ${e.id} ${e.tags.join(' ')}.${fileExt}`,
      fileDownloadText: `${e.width}×${e.height} [${(e.file_size / 1000).toFixed(0)} kB] ${fileExt.toUpperCase()}`,
      rating: e.rating,
      createdAt: e.created_at.s * 1000,
    } as any
  })
}

export async function getSankakuIdolDetail(id: string) {
  const resp = await fetch(`https://i.sankakuapi.com/posts/${id}/fu?lang=${navigator.language || 'zh-CN'}`, {
    headers: {
      'api-version': '2',
      'client-type': 'non-premium',
      'platform': 'web-app',
      'priority': 'u=1, i',
    },
  })
  const json = await resp.json()
  return {
    sampleUrl: json.data.sample_url,
    fileUrl: json.data.file_url,
  }
}
