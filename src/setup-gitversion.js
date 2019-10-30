const core = require('@actions/core')
const {exec} = require('@actions/exec')
const {installElixir, installOTP: installGitversion} = require('./installer')
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
  runGitversion = runGitversion == null ? true : runGitversion

  console.log(`##[group]Installing GitVersion ${gitversionVersion}`)
  await installGitversion(gitversionVersion)
  console.log(`##[endgroup]`)

  if (runGitversion) await exec('GitVersion')
}

function checkPlatform() {
  if (process.platform !== 'linux')
    throw new Error(
      '@actions/setup-gitversion only supports Ubuntu Linux at this time'
    )
}

async function getVersion(spec, versionFile) {
  const range = semver.validRange(spec)
  const versions = (await readFile(versionFile)).toString().split('\n')
  const version = semver.maxSatisfying(versions, range)
  return version || spec
}
