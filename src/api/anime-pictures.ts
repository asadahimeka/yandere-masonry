export function isAnimePicturesPage() {
  return location.hostname == 'anime-pictures.net'
}

export async function fetchAnimePicturesPosts(page: number, tags: string | null) {
  const url = new URL('https://api.anime-pictures.net/api/v3/posts')
  url.searchParams.set('page', `${page - 1}`)
  url.searchParams.set('lang', 'zh_CN')
  url.searchParams.set('ldate', '0')
  if (tags) {
    const { realTags, orders } = tags.split(/\s/).reduce((acc, cur) => {
      cur.startsWith('order_by:') ? acc.orders.push(cur) : acc.realTags.push(cur)
      return acc
    }, { realTags: [] as string[], orders: [] as string[] })
    realTags.length && url.searchParams.set('search_tag', realTags.join(' '))
    orders.length && url.searchParams.set('order_by', orders[0].split(':')[1])
  }
  const resp = await fetch(url.href)
  const json = await resp.json()
  return json.posts.map((e: any) => {
    return {
      id: e.id,
      postView: `https://anime-pictures.net/posts/${e.id}`,
      previewUrl: `https://opreviews.anime-pictures.net/${e.md5.slice(0, 3)}/${e.md5}_cp.${e.have_alpha ? 'png' : 'jpg'}.avif`,
      sampleUrl: `https://opreviews.anime-pictures.net/${e.md5.slice(0, 3)}/${e.md5}_bp.${e.have_alpha ? 'png' : 'jpg'}.avif`,
      fileUrl: '',
      tags: [],
      width: e.width,
      height: e.height,
      aspectRatio: e.width / e.height,
      fileExt: e.ext.slice(1),
      fileDownloadName: `anime-pictures_${e.id}_${e.width}×${e.height}`,
      fileDownloadText: `${e.width}×${e.height} [${(e.size / 1024 / 1024).toFixed(2)} MB] ${e.ext.slice(1).toUpperCase()}`,
      rating: e.erotics == 0 ? 's' : 'q',
      createdAt: new Date(`${e.pubtime.replace(' ', 'T')}Z`),
    } as any
  })
}

export async function getAnimePicturesDetail(id: string) {
  try {
    const resp = await fetch(`https://api.anime-pictures.net/api/v3/posts/${id}`)
    const json = await resp.json()
    return {
      tags: json.tags.map((t: any) => `${t.tag.tag}${t.tag.tag_jp ? `[${t.tag.tag_jp}]` : ''}`),
      fileUrl: `https://api.anime-pictures.net/pictures/get_image/${json.file_url}`,
    }
  } catch (error) {
    return { tags: [], fileUrl: '' }
  }
}
