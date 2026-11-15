#!/usr/bin/env node
// Zero-dependency structural sentinel for 16knote.com / 16k.club.
// Node 18+ (native fetch). Run: node scripts/check-16k.mjs

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
const SAMPLE = 20
const failures = []

function fail(scope, assertion, expected, actual) {
  failures.push({ scope, assertion, expected, actual })
}

function show(value) {
  const text = typeof value === 'string' ? value : JSON.stringify(value)
  return text.length > 300 ? `${text.slice(0, 300)}...` : text
}

async function request(url, accept) {
  const res = await fetch(url, {
    headers: { 'user-agent': UA, accept },
    redirect: 'follow',
    signal: AbortSignal.timeout(30000),
  })
  return res
}

async function getText(url) {
  const res = await request(url, 'text/html,application/xhtml+xml')
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`)
  return res.text()
}

function cardChunks(html, classNeedle) {
  const re = new RegExp(`class="[^"]*\\b${classNeedle}\\b[^"]*"`, 'g')
  const starts = []
  let m
  while ((m = re.exec(html))) starts.push(m.index)
  return starts.map((start, i) => html.slice(start, starts[i + 1] ?? html.length))
}

function cardId(chunk) {
  const m = chunk.match(/href="(?:[^"]*\/)?post\/(\d+)\/?"/)
  return m?.[1] ?? null
}

function cardBadgeText(chunk, badgeClass) {
  const re = new RegExp(`class="[^"]*\\b${badgeClass}\\b[^"]*"[^>]*>([^<]*)`)
  const m = chunk.match(re)
  return m ? m[1].trim() : null
}

function cardThumb(chunk) {
  const m = chunk.match(/<img[^>]*\bsrc="([^"]+)"/)
  return m?.[1] ?? null
}

// null => no badge element (means 1); non-digit text (mp4 / 番号 / empty) => 1
function parseBadge(text) {
  if (text === null) return 1
  if (/^\d+$/.test(text)) return Number(text)
  return 1
}

function stripQuery(url) {
  return url.split(/[?#]/)[0]
}

function countNoteMedia(html) {
  return (html.match(/<figure[^>]*class="[^"]*\bpost-media\b[^"]*"[^>]*>/g) ?? []).length
}

function clubMediaBlocks(html) {
  const tags = []
  const re = /<div\b[^>]*>/g
  let m
  while ((m = re.exec(html))) {
    const tag = m[0]
    if (/class="[^"]*\btext-center\b[^"]*"/.test(tag) && /margin-bottom:\s*0\.5rem/.test(tag)) {
      tags.push({ index: m.index, end: m.index + tag.length })
    }
  }
  return tags.map((tag, i) => html.slice(tag.end, tags[i + 1]?.index ?? html.length))
}

function imgDataSrcs(fragment) {
  const out = []
  const re = /<img[^>]*\bdata-src="([^"]+)"/g
  let m
  while ((m = re.exec(fragment))) out.push(m[1])
  return out
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length)
  let next = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++
      out[index] = await fn(items[index], index)
    }
  })
  await Promise.all(workers)
  return out
}

async function checkSite({ name, listUrl, cardClass, badgeClass, detailUrl, thumbUrl, skipDetail = false }) {
  let html
  try {
    html = await getText(listUrl)
  } catch (error) {
    fail(name, 'list page reachable', 'HTTP 200', error.message)
    return null
  }

  const chunks = cardChunks(html, cardClass).slice(0, SAMPLE)
  if (chunks.length < SAMPLE) {
    fail(name, 'list page card count', `>= ${SAMPLE}`, `${chunks.length} (${cardClass})`)
  }

  const cards = []
  for (const chunk of chunks) {
    const id = cardId(chunk)
    if (!id) {
      fail(name, 'card id from href', 'post/<id>', show(chunk.slice(0, 200)))
      continue
    }
    cards.push({
      id,
      badge: parseBadge(cardBadgeText(chunk, badgeClass)),
      thumb: cardThumb(chunk),
    })
  }

  if (!cards.length) return null

  if (!skipDetail) {
    await mapLimit(cards, 5, async card => {
      let detail
      try {
        detail = await getText(detailUrl(card.id))
      } catch (error) {
        fail(`${name}#${card.id}`, 'detail page reachable', 'HTTP 200', error.message)
        return
      }

      if (thumbUrl.kind === 'note') {
        const media = countNoteMedia(detail)
        if (media !== card.badge) {
          fail(`${name}#${card.id}`, 'detail media count == list badge', card.badge, media)
        }
        const blocks = detail.split(/<figure[^>]*class="[^"]*\bpost-media\b[^"]*"[^>]*>/).slice(1)
        for (const [index, block] of blocks.entries()) {
          for (const src of imgDataSrcs(block)) {
            const path = stripQuery(src).toLowerCase()
            if (!path.endsWith('.jpg') && !path.endsWith('.webp')) {
              fail(
                `${name}#${card.id}`,
                `media block ${index + 1} img[data-src] ends with .jpg/.webp`,
                '.jpg or .webp',
                src,
              )
            }
          }
        }
      } else {
        const blocks = clubMediaBlocks(detail)
        if (blocks.length !== card.badge) {
          fail(`${name}#${card.id}`, 'detail media count == list badge', card.badge, blocks.length)
        }
        for (const [index, block] of blocks.entries()) {
          if (!/<img\b/.test(block)) continue
          if (!/<img[^>]*\bdata-src="/.test(block)) {
            fail(`${name}#${card.id}`, `media block ${index + 1} has img[data-src]`, 'at least 1', '0')
          }
        }
      }
    })
  }

  return cards
}

async function checkNoteThumb(card) {
  if (!card.thumb) {
    fail('16knote thumb', 'list thumbnail src present', 'img[src]', 'missing')
    return
  }
  const url = `${stripQuery(card.thumb)}?w=400`
  try {
    const res = await request(url, 'image/*')
    const type = res.headers.get('content-type') ?? ''
    if (res.status !== 200) {
      fail('16knote thumb', `GET ${url}`, '200', String(res.status))
    }
    if (!type.startsWith('image/')) {
      fail('16knote thumb', `content-type of ${url}`, 'image/*', type || '(empty)')
    }
  } catch (error) {
    fail('16knote thumb', `GET ${url}`, 'HTTP 200 image/*', error.message)
  }
}

async function checkClubNoThumb(card) {
  if (!card.thumb) {
    fail('16k.club thumb', 'list thumbnail src present', 'img[src]', 'missing')
    return
  }
  const url = `https://16k.club/cdn-cgi/image/width=400/${card.thumb}`
  try {
    const res = await request(url, 'image/*')
    if (res.status !== 404) {
      fail('16k.club thumb', `GET ${url}`, '404 (no thumbnail service)', String(res.status))
    }
  } catch (error) {
    fail('16k.club thumb', `GET ${url}`, 'HTTP 404', error.message)
  }
}

const noteCards = await checkSite({
  name: '16knote',
  listUrl: 'https://16knote.com/?p=1&size=90',
  cardClass: 'waterfall-item',
  badgeClass: 'waterfall-tag',
  detailUrl: id => `https://16knote.com/post/${id}/`,
  thumbUrl: { kind: 'note' },
})

const clubCards = await checkSite({
  name: '16k.club',
  listUrl: 'https://16k.club/?p=1&size=90',
  cardClass: 'grid-item',
  badgeClass: 'badge',
  detailUrl: id => `https://16k.club/post/${id}/`,
  thumbUrl: { kind: 'club' },
})

if (noteCards?.[0]) await checkNoteThumb(noteCards[0])
if (clubCards?.[0]) await checkClubNoThumb(clubCards[0])

if (failures.length) {
  console.error(`\n${failures.length} 16k structure assertion(s) failed:\n`)
  for (const item of failures) {
    console.error(`- [${item.scope}] ${item.assertion}`)
    console.error(`    expected: ${show(item.expected)}`)
    console.error(`    actual:   ${show(item.actual)}`)
  }
  process.exit(1)
}

console.log('all 16k structure assertions passed')
