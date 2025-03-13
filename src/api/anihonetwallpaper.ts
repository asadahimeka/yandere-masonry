export function isAnihonetwallpaperPage() {
  return location.hostname == 'anihonetwallpaper.com'
}

export async function fetchAnihonetwallpaperPosts(page: number, tags: string | null) {
  const htmlResp = await fetch(`https://anihonetwallpaper.com/page/${page}${tags ? `?s=${tags}` : ''}`)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('main .post_box ')].map(el => {
    const a = el.querySelector<HTMLAnchorElement>('.posttitle a')
    const img = el.querySelector<HTMLImageElement>('.thumbnail-image')
    const id = a?.href.match(/(\d+)/)?.[1]

    const previewUrl = img?.getAttribute('data-src')
    const width = img?.getAttribute('width')
    const height = img?.getAttribute('height')
    const tags = [...el.querySelectorAll<HTMLElement>('.itiran a[rel*=tag]')].map(e => e.innerText)

    const fileUrl = previewUrl?.includes('wp.com')
      ? previewUrl.replace(/i\d\.wp\.com\//, '').replace(/\?fit\=\d+\,\d+/, '')
      : previewUrl?.replace(/\-\d+x\d+\.(jpg|jpeg|png|webp)/, '.$1')

    return {
      id,
      postView: a?.href,
      previewUrl,
      fileUrl,
      tags,
      width: Number(width),
      height: Number(height),
      aspectRatio: Number(width) / Number(height),
      fileExt: 'jpg',
      fileDownloadName: `Anihonetwallpaper_${id}`,
      rating: '',
    } as any
  })
  return results
}
