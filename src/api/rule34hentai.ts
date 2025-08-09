export function isRule34HentaiPage() {
  return location.hostname == 'rule34hentai.net'
}

export async function fetchRule34HentaiPosts(page: number, tags: string | null) {
  if (!tags) {
    tags = location.pathname.match(/post\/list\/(.+)\/\d+/)?.[1] || ''
  }
  const url = `https://rule34hentai.net/post/list/${tags ? `${tags}/` : ''}${page}`
  const htmlResp = await fetch(url)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('#image-list .thumb')].map(el => {
    const img = el.querySelector('img')
    const id = el.getAttribute('data-post-id')
    const previewUrl = img?.src || ''
    const previewWidth = Number(img?.getAttribute('width'))
    const previewHeight = Number(img?.getAttribute('height'))
    const width = Number(el.getAttribute('data-width'))
    const height = Number(el.getAttribute('data-height'))
    const postTags = el.getAttribute('data-tags')?.split(/\s+/).filter(Boolean) || []
    const m = img?.title.split('//').map(e => e.trim()) || []
    const fileExt = m[3] || ''
    const fileSizeText = m[2] || ''
    const fileUrl = previewUrl.replace(/(.*)\/_thumbs\/(.*)\/thumb\..*/, `$1/_images/$2/${id}.${fileExt}`)

    return {
      id,
      postView: el.getAttribute('href'),
      previewUrl,
      previewWidth,
      previewHeight,
      fileUrl,
      fileSizeText,
      tags: postTags,
      width,
      height,
      aspectRatio: width / height,
      fileExt,
      fileDownloadName: `rule34hentai_${id}`,
      fileDownloadText: `${width}×${height} [${fileSizeText}] ${fileExt.toUpperCase()}`,
      rating: 'e',
    } as any
  })
  return results
}
