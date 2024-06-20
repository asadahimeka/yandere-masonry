export function isSankakuAIPage() {
  return /sankaku\.app.*\/ai-posts/.test(location.href)
}

export async function fetchSankakuAIPosts(page: number, tags: string | null) {
  const url = new URL('https://capi-v2.sankakucomplex.com/ai_posts')
  url.searchParams.set('lang', navigator.language || 'zh-CN')
  url.searchParams.set('limit', '40')
  url.searchParams.set('page', `${page}`)
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
  return json.data?.map((e: any) => {
    const fileExt = e.file_type.split('/').pop()
    return {
      id: e.id,
      postView: 'https://sankaku.app/ai-posts',
      previewUrl: e.preview_url,
      fileUrl: e.file_url,
      tags: e.tags.map((t: any) => t.name + t.name_ja ? `[${t.name_ja}]` : ''),
      width: e.width,
      height: e.height,
      aspectRatio: e.width / e.height,
      fileExt,
      fileDownloadName: `sankaku-ai-post ${e.id} ${e.tags.join(' ')}.${fileExt}`,
      fileDownloadText: `${e.width}×${e.height} [${(e.file_size / 1000).toFixed(0)} kB] ${fileExt.toUpperCase()}`,
      rating: e.rating,
      createdAt: e.created_at.s * 1000,
    } as any
  })
}
