const {exec} = require('@actions/exec')
const path = require('path')

module.exports = {installGitversion}

/**
 * Install OTP.
 *
 * @param {string} version
 */
async function installGitversion(version) {
  if (process.platform === 'linux') {
    await exec(path.join(__dirname, 'install-gitversion-ubuntu'), [version])
    return
  }
  
  if (process.platform === 'darwin') {
    await exec(path.join(__dirname, 'install-gitversion-darwin'), [version])
    return
  }

  throw new Error(
    'unexpected platform: ' + process.platform
  )
}
