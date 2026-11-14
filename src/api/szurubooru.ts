import { settings } from '@/store'

export const SZURU_DEMO_HOST = 'nekomaru.moe'

const PAGE_LIMIT = 40

const safetyRatingMap: Record<string, string> = {
  safe: 's',
  sketchy: 'q',
  unsafe: 'e',
}

// 兼容用户粘贴 "https://xxx/" 或裸域名
export function normalizeSzuruDomain(input: string) {
  const value = (input || '').trim()
  if (!value) return ''
  try {
    return new URL(value.includes('://') ? value : `https://${value}`).host
  } catch {
    return ''
  }
}

export function isConfiguredSzuruDomain(host: string) {
  return settings.szurubooruConfigs.some(c => normalizeSzuruDomain(c.domain) === host)
}

export function isSzurubooru() {
  return location.host === SZURU_DEMO_HOST
    || isConfiguredSzuruDomain(location.host)
}

function currentConfig() {
  if (location.host === SZURU_DEMO_HOST) {
    return settings.szurubooruConfigs.find(c => normalizeSzuruDomain(c.domain) === SZURU_DEMO_HOST)
  }
  return settings.szurubooruConfigs.find(c => normalizeSzuruDomain(c.domain) === location.host)
}

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { Accept: 'application/json' }
  const config = currentConfig()
  if (config?.username && config?.token) {
    try {
      headers.Authorization = `Token ${btoa(`${config.username}:${config.token}`)}`
    } catch (error) {
      console.warn('[YM] szurubooru auth encode failed:', error)
    }
  }
  return headers
}

function absUrl(url: string) {
  return new URL(url, location.origin).href
}

export async function fetchSzurubooruPosts(page: number, tags: string | null) {
  const url = new URL('/api/posts/', location.origin)
  url.searchParams.set('offset', `${(page - 1) * PAGE_LIMIT}`)
  url.searchParams.set('limit', `${PAGE_LIMIT}`)
  if (tags && tags !== 'all') {
    url.searchParams.set('query', tags)
  }
  const resp = await fetch(url.href, { headers: authHeaders() })
  const json = await resp.json()
  return (json.results || []).map((e: any) => {
    const fileExt = e.mimeType?.split('/')[1] || String(e.contentUrl || '').split('.').pop() || 'jpg'
    const width = e.canvasWidth || 0
    const height = e.canvasHeight || 0
    return {
      id: String(e.id),
      postView: `${location.origin}/post/${e.id}`,
      previewUrl: e.thumbnailUrl ? absUrl(e.thumbnailUrl) : null,
      sampleUrl: null,
      fileUrl: e.contentUrl ? absUrl(e.contentUrl) : null,
      tags: (e.tags || []).map((t: any) => t.names?.[0] || t),
      width,
      height,
      aspectRatio: height ? width / height : 1,
      fileExt,
      fileDownloadName: `szurubooru_${e.id}_${width}×${height}.${fileExt}`,
      rating: safetyRatingMap[e.safety] || 'u',
      score: e.score || 0,
      source: e.source || null,
      createdAt: e.creationTime ? new Date(e.creationTime) : null,
    } as any
  })
}

export const szurubooru = {
  is: isSzurubooru,
  posts: fetchSzurubooruPosts,
}
