import { sites } from '@himeka/booru'

const blackList = new Set(['e621.net', 'e926.net', 'hypnohub.net', 'derpibooru.org'])

export const siteDomains = Object.keys(sites).filter(e => !blackList.has(e))
