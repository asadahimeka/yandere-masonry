export function isHentaiBooruPage() {
  return location.hostname == 'booru.eu'
}

export async function fetchHentaiBooruPosts(page: number, tags: string | null) {
  document.onclick = function () {}
  document.onmouseup = function () {}
  ;(document as any).onclick_copy = function () {}
  ;(unsafeWindow as any).show_pop = function () {}
  ;(unsafeWindow as any).open = function (url: string) {
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.rel = 'noreferrer'
    a.click()
  }
  const url = `https://booru.eu/post/list${tags ? `/${tags}` : ''}/${page}`
  const htmlResp = await fetch(url)
  const doc = new DOMParser().parseFromString(await htmlResp.text(), 'text/html')
  const results = [...doc.querySelectorAll('.shm-image-list span.thumb')].map(el => {
    const a = el.querySelector('a')
    const img = el.querySelector('img')
    const id = a?.getAttribute('data-post-id')

    const previewUrl = img!.src
    const tags = a?.getAttribute('data-tags')?.split(/\s/).filter(Boolean) || []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, width, height] = img?.title.match(/\/\/\s+(\d+)x(\d+)\s+\/\//) || []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, size] = img?.title.match(/\/\/\s+\d+x\d+\s+\/\/\s+([\w\.]+)/) || []

    return {
      id,
      postView: a?.href,
      previewUrl,
      fileUrl: '',
      tags,
      width: Number(width),
      height: Number(height),
      aspectRatio: Number(width) / Number(height),
      fileExt: 'jpg',
      fileDownloadName: `HentaiBooru ${id} ${tags.join(' ')}`,
      fileDownloadText: `${width}×${height} [${size}]`,
      rating: '',
    } as any
  })
  return results
}

export async function getHentaiBooruDetail(id: string) {
  const resp = await fetch(`https://booru.eu/post/view/${id}`)
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html')
  return {
    fileUrl: doc.querySelector<HTMLImageElement>('#main_image')?.src,
  }
}
