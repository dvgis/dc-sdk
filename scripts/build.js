/**
 * @Author: Caven
 * @Date: 2021-03-15 20:59:10
 */

'use strict'
const fse = require('fs-extra')
const path = require('path')
const shell = require('shelljs')
const chalk = require('chalk')

shell.echo(chalk.green('build sdk start'))

let outoutDir = path.resolve(__dirname, '..', 'packages/sdk/dist')

fse.ensureDirSync(outoutDir)

fse.emptyDirSync(outoutDir)

const pkgs = ['base', 'core', 'chart', 'mapv']

const count = pkgs.length

pkgs.forEach((item, index) => {
  fse.exists(
    path.resolve(__dirname, '..', `packages/${item}/dist`),
    async exists => {
      if (exists) {
        fse.copySync(
          path.resolve(__dirname, '..', `packages/${item}/dist`),
          outoutDir
        )
        shell.echo(chalk.yellow(`copy ${item} success`))
        if (index === count - 1) {
          await shell.echo(chalk.green('build sdk end'))
        }
      } else {
        shell.echo(chalk.red(`no ${item} dist`))
        if (index === count - 1) {
          shell.echo(chalk.green('build sdk end'))
        }
      }
    }
  )
})
