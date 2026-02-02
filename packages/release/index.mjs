import chalk from 'chalk'
import semver from 'semver'
import enquirer from 'enquirer'
import { execa } from 'execa'
import { resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

process.env.FORCE_COLOR = 1

const __dirname = process.cwd()

const pkgRoot = resolve(__dirname, '.')
const pkgPath = resolve(pkgRoot, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
const currentVersion = pkg.version

async function release({ gitAdd = true, gitTag = true, gitPush = true, targetVersion, preid, isDryRun = false, skipBuild = false } = {}) {
  const preId = preid || (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0])
  const versionIncrements = [
    'patch',
    'minor',
    'major',
    ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : []),
  ]

  const inc = (i) => semver.inc(currentVersion, i, preId)
  const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })
  const dryRun = (bin, args, opts = {}) => console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
  const runIfNotDry = isDryRun ? dryRun : run
  const step = (msg) => console.log(chalk.cyan(msg))

  if (!targetVersion) {
    // no explicit version, offer suggestions
    const { release } = await enquirer.prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements
        .map((i) => `${i} (${inc(i)})`)
        .concat(['custom']),
    })

    if (release === 'custom') {
      targetVersion = (
        await enquirer.prompt({
          type: 'input',
          name: 'version',
          message: 'Input custom version',
          initial: currentVersion,
        })
      ).version
    } else {
      targetVersion = release.match(/\((.*)\)/)[1]
    }
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }

  const { yes } = await enquirer.prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  })

  if (!yes) {
    return
  }

  // update versions
  step('\nUpdating version...')
  updateVersions(targetVersion)

  // build all packages with types
  step('\nBuilding packages...')
  if (!skipBuild && !isDryRun) {
    await run('npm', ['run', 'build', '--release'])
  } else {
    console.log(`(skipped)`)
  }

  if (gitAdd) {
    const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
    if (stdout) {
      step('\nCommitting changes...')
      await runIfNotDry('git', ['add', '-A'])
      await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`])
    } else {
      console.log('No changes to commit.')
    }
  }

  // push to GitHub
  if (gitTag) {
    await runIfNotDry('git', ['tag', `v${targetVersion}`])
    await runIfNotDry('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  }
  if (gitPush) {
    step('\nPushing to GitHub...')
    await runIfNotDry('git', ['push'])
  }

  if (isDryRun) {
    console.log(`\nDry run finished - run git diff to see package changes.`)
  }
  console.log()
}

function updateVersions(version) {
  pkg.version = version
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

export { release }
