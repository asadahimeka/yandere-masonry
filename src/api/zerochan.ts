export function isZerochanPage() {
  return location.hostname == 'www.zerochan.net'
}

const ZEROCHAN_ORIGIN = 'https://www.zerochan.net'
const CHALLENGE_SVG_PATTERN = /totally-innocent-logo-image\.svg\?[^"'\s]+/

// 校验失败且无法识别时不再重试，否则每次翻页都要多等一轮请求
let isChallengeUnknown = false

async function requestZerochan(url: string) {
  const resp = await fetch(url)
  if (resp.status !== 503) {
    return resp
  }
  if (isChallengeUnknown) {
    return resp
  }
  // 先 clone 再读取，未命中校验时原始 resp 的 body 仍可交给调用方解析
  const html = await resp.clone().text()
  const svgMatch = html.match(CHALLENGE_SVG_PATTERN)
  if (!svgMatch) {
    isChallengeUnknown = true
    return resp
  }
  // 校验页靠 onload 请求 SVG 来下发 xbotcheck cookie，同源 fetch 会一并保存；
  // 原先的 window.open 不在用户手势内，常被拦截并白白等待超时
  await fetch(`${ZEROCHAN_ORIGIN}/${svgMatch[0]}`)
  return fetch(url)
}

// 线上列表接口会把合法 JSON 包在一个多余的 "{" 和整页 HTML 里，按花括号配对截出真正的对象
export function extractJsonPayload(text: string): string {
  const trimmed = text.trimStart()
  const body = /^\{\s*(?=\{)/.test(trimmed) ? trimmed.replace(/^\{\s*/, '') : trimmed
  let depth = 0
  let inString = false
  let escaped = false
  for (let i = 0; i < body.length; i++) {
    const char = body[i]
    if (escaped) {
      escaped = false
      continue
    }
    if (char === '\\') {
      escaped = true
      continue
    }
    if (char === '"') {
      inString = !inString
      continue
    }
    if (inString) {
      continue
    }
    if (char === '{') {
      depth++
    } else if (char === '}') {
      depth--
      if (depth === 0) {
        return body.slice(0, i + 1)
      }
    }
  }
  return body
}

export async function fetchZerochanPosts(page: number, tags: string | null) {
  const resp = await requestZerochan(`${ZEROCHAN_ORIGIN}/${tags || ''}?p=${page}&json`)
  const raw = await resp.text()
  let json: any
  try {
    json = JSON.parse(extractJsonPayload(raw))
  } catch {
    throw new Error(
      `zerochan JSON endpoint returned a broken response (HTTP ${resp.status}): ${raw.slice(0, 120)}`,
    )
  }
  if (!Array.isArray(json.items)) {
    throw new TypeError(
      `zerochan JSON endpoint returned no items (HTTP ${resp.status}): ${raw.slice(0, 120)}`,
    )
  }
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
  const resp = await requestZerochan(`${ZEROCHAN_ORIGIN}/${id}?json`)
  const raw = await resp.text()
  const json = JSON.parse(extractJsonPayload(raw))
  return json.full
}

export const zerochan = {
  is: isZerochanPage,
  posts: fetchZerochanPosts,
}
