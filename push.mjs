import { readFile } from 'node:fs/promises'
import { exec as _exec } from 'node:child_process'
import { promisify } from 'node:util'

async function exec(cmd) {
  console.log('Running:', cmd)
  const res = await promisify(_exec)(cmd)
  if (res.stdout) console.log(res.stdout)
  if (res.stderr) console.log(res.stderr)
}

async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function push() {
  const pkgStr = await readFile('./package.json', 'utf8')
  const { version } = JSON.parse(pkgStr)
  await exec('git add .')
  await exec(`git commit -m "release v${version}"`)
  await exec('set http_proxy=http://127.0.0.1:1081')
  await exec('set https_proxy=http://127.0.0.1:1081')
  await sleep(1500)
  await exec('git push')
}

push()
