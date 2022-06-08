const core = require('@actions/core')
const {exec} = require('@actions/exec')
const {installGitversion} = require('./installer')
const {readFile} = require('fs').promises
const path = require('path')
const semver = require('semver')

main().catch(err => {
  core.setFailed(err.message)
})

async function main() {
  checkPlatform()

  const gitversionSpec = core.getInput('gitversion-version', {required: true})
  const gitversionVersion = await getVersion(
    gitversionSpec,
    path.join(__dirname, 'gitversion-versions.txt')
  )
  let runGitversion = core.getInput('run-gitversion')
  runGitversion = runGitversion == null ? false : (runGitversion == 'true')

  let runGitversionArgs = core.getInput('run-gitversion-args')
  runGitversionArgs = runGitversionArgs == null ? [] : [runGitversionArgs]

  console.log(`##[group]Installing GitVersion ${gitversionVersion}`)
  await installGitversion(gitversionVersion)
  console.log(`##[endgroup]`)

  if (runGitversion) await exec('gitversion', runGitversionArgs)
}

function checkPlatform() {
  if (! (process.platform === 'linux' || process.platform === 'darwin'))
    throw new Error(
      '@actions/setup-gitversion only supports Ubuntu Linux or MacOS; current: ' + process.platform
    )
}

async function getVersion(spec, versionFile) {
  const range = semver.validRange(spec)
  const versions = (await readFile(versionFile)).toString().split('\n')
  const version = semver.maxSatisfying(versions, range)
  return version || spec
}
