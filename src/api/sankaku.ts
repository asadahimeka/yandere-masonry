export const isSankakuSite = location.host.includes('sankaku')

export function isSankakuPage() {
  return (location.hostname == 'sankaku.app' && !location.pathname.includes('/ai-posts')) || location.hostname == 'chan.sankakucomplex.com'
}

const pageState: { next: string | null } = { next: null }
export async function fetchSankakuPosts(page: number, tags: string | null) {
  if (page == 1) pageState.next = null
  const url = new URL('https://capi-v2.sankakucomplex.com/posts/keyset')
  url.searchParams.set('lang', navigator.language || 'zh-CN')
  url.searchParams.set('default_threshold', '0')
  url.searchParams.set('hide_posts_in_books', 'in-larger-tags')
  url.searchParams.set('limit', '40')
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
    const fileExt = e.file_type.split('/').pop()
    return {
      id: e.id,
      postView: `https://chan.sankakucomplex.com/posts/${e.id}`,
      previewUrl: e.preview_url,
      sampleUrl: e.sample_url,
      fileUrl: e.file_url,
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
