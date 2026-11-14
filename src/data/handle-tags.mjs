import fs from 'node:fs/promises'

async function main() {
  const csv = await fs.readFile('./tags_cn.csv', 'utf8')

  // 基底：tag,中文
  const base = {}
  for (const line of csv.split('\n')) {
    if (!line) continue
    const i = line.indexOf(',')
    if (i < 0) continue
    base[line.slice(0, i)] = line.slice(i + 1)
  }

  const danJson0 = JSON.parse(await fs.readFile('./danbooru_tags_cn.json', 'utf8'))
  const yanJson = JSON.parse(await fs.readFile('./moebooru_tags_cn.json', 'utf8'))

  const danJson = Object.keys(danJson0).reduce((acc, cur) => {
    acc[cur.replaceAll(' ', '_')] = danJson0[cur]
    return acc
  }, {})

  let results1 = {}
  let results2 = {}
  for (const [tag, value] of Object.entries(base)) {
    if (!danJson[tag]) {
      results1[tag] = value
    }
    if (!yanJson[tag]) {
      results2[tag] = value
    }
  }

  results1 = {
    ...results1,
    ...danJson,
  }

  results1 = Object.keys(results1).reduce((acc, cur) => {
    acc[cur.replaceAll('_', ' ')] = results1[cur]
    return acc
  }, {})

  results2 = {
    ...results2,
    ...yanJson,
  }

  await fs.writeFile('./all_tags_cn_space.json', JSON.stringify(results1, null, 2))
  await fs.writeFile('./all_tags_cn_space.min.json', JSON.stringify(results1))
  await fs.writeFile('./all_tags_cn.json', JSON.stringify(results2, null, 2))
  await fs.writeFile('./all_tags_cn.min.json', JSON.stringify(results2))
}

main()
