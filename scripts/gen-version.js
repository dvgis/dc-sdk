/**
 * @Author: Caven
 * @Date: 2021-03-12 17:56:03
 */

'use strict'

const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const pkgInfo = require('../package.json')
const chalk = require('chalk')
const version = pkgInfo.version

const packagesDir = path.resolve(__dirname, '..', 'packages')

fse.exists(packagesDir, exists => {
  if (exists) {
    const dirs = fs.readdirSync(path.resolve(__dirname, '..', 'packages')) || []
    dirs.forEach(item => {
      const filePath = path.resolve(packagesDir, `${item}/package.json`)
      fse.exists(filePath, exists => {
        if (exists) {
          let json = fse.readJsonSync(filePath)
          json.version = version
          if (json?.peerDependencies?.['@dvgis/dc-base']) {
            json.peerDependencies['@dvgis/dc-base'] = '^' + version
          }
          fse.writeJsonSync(filePath, json, { spaces: '\t' })
          // eslint-disable-next-line no-console
          console.log(
            chalk.green(`change ${item} version to ` + chalk.red(`v${version}`))
          )
        }
      })
    })
  }
})
