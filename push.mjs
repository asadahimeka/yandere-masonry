import { readFile } from 'node:fs/promises'
import { execSync } from 'node:child_process'

async function push() {
  const pkgStr = await readFile('./package.json', 'utf8')
  const { version } = JSON.parse(pkgStr)
  execSync('yarn build')
  execSync('git add .')
  execSync(`git commit -m "release ${version}"`)
  execSync('set https_proxy=http://127.0.0.1:1081')
  execSync('git push')
}

push()
