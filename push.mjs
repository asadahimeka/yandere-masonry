import { readFile } from 'node:fs/promises'
import { execSync } from 'node:child_process'

function exec(cmd)  {
  console.log('Running:', cmd)
  const buf = execSync(cmd)
  console.log(buf.toString())
}

async function push() {
  const pkgStr = await readFile('./package.json', 'utf8')
  const { version } = JSON.parse(pkgStr)
  exec('yarn build')
  exec('git add .')
  exec(`git commit -m "release ${version}"`)
  exec('set https_proxy=http://127.0.0.1:1081')
  exec('git push')
}

push()
