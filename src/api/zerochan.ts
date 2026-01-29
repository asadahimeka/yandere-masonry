export function isZerochanPage() {
  return location.hostname == 'www.zerochan.net'
}

let isChallengePass = false
function openApiWindow() {
  return new Promise<void>(resolve => {
    const win = window.open('https://www.zerochan.net/?p=1&json', '', 'width=500,height=500')
    win?.addEventListener('load', () => {
      isChallengePass = true
      win.close()
      resolve()
    })
    setTimeout(() => {
      if (!isChallengePass) {
        win?.close()
        resolve()
      }
    }, 5000)
  })
}

export async function fetchZerochanPosts(page: number, tags: string | null) {
  if (!isChallengePass) {
    await openApiWindow()
  }
  const resp = await fetch(`https://www.zerochan.net/${tags || ''}?p=${page}&json`)
  const json = await resp.json()
  return json.items.map((e: any) => {
    const primary = escape(e.tag.replace(/\s/g, '.'))
    return {
      id: e.id,
      postView: `https://www.zerochan.net/${e.id}`,
      previewUrl: e.thumbnail,
      sampleUrl: `https://s1.zerochan.net/${primary}.600.${e.id}.jpg`,
      fileUrl: `https://static.zerochan.net/${primary}.full.${e.id}.png`,
      tags: e.tags,
      width: e.width,
      height: e.height,
      aspectRatio: e.width / e.height,
      fileExt: 'jpg',
      fileDownloadName: `zerochan ${e.id} ${e.tags.join(' ')}`,
      fileDownloadText: `${e.width}×${e.height}`,
      rating: '',
      sourceUrl: e.source,
    } as any
  })
}

export async function getZerochanFileUrl(id: string) {
  const resp = await fetch(`https://www.zerochan.net/${id}?json`)
  const json = await resp.json()
  return json.full
}

export const zerochan = {
  is: isZerochanPage,
  posts: fetchZerochanPosts,
}
