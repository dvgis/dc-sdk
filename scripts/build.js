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

shell.rm('-rf', path.resolve(__dirname, '..', 'packages/sdk/dist/*'))

const pkgs = ['base', 'core', 'chart', 'mapv']
const count = pkgs.length

pkgs.forEach(async (item, index) => {
  await fse.exists(
    path.resolve(__dirname, '..', `packages/${item}/dist`),
    exists => {
      if (exists) {
        shell.cp(
          '-R',
          path.resolve(__dirname, '..', `packages/${item}/dist/*`),
          path.resolve(__dirname, '..', 'packages/sdk/dist')
        )
        shell.echo(chalk.yellow(`copy ${item} success`))
        if (index === count - 1) {
          shell.echo(chalk.green('build sdk end'))
          shell.exit(0)
        }
      } else {
        shell.echo(chalk.red(`no ${item} dist`))
        if (index === count - 1) {
          shell.echo(chalk.green('build sdk end'))
          shell.exit(0)
        }
      }
    }
  )
})
