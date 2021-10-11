/**
 * @Author: Caven
 * @Date: 2021-03-15 20:59:10
 */

'use strict'
const fse = require('fs-extra')
const path = require('path')
const shell = require('shelljs')
const chalk = require('chalk')
const pkgInfo = require('../package.json')
const version = pkgInfo.version

shell.echo(chalk.green('release packages start'))

const pkgs = ['base', 'core', 'chart', 'mapv', 'sdk']
const count = pkgs.length

pkgs.forEach(async (item, index) => {
  await fse.exists(
    path.resolve(__dirname, '..', `packages/${item}/dist`),
    async exists => {
      if (exists) {
        shell.cd(path.resolve(__dirname, '..', `packages/${item}`))
        try {
          let code = await shell.exec(
            `yarn publish --new-version ${version} --access public`
          ).code
          if (code !== 0) {
            shell.echo(
              chalk.red(` release @dvgis/dc-${item} v${version} failed`)
            )
          } else {
            shell.echo(
              chalk.yellow(` release @dvgis/dc-${item} v${version} success`)
            )
          }
        } catch (e) {
          shell.echo(chalk.red(` release @dvgis/dc-${item} v${version} failed`))
        }
        if (index === count - 1) {
          shell.echo(chalk.green('release packages end'))
        }
      } else {
        shell.echo(
          chalk.red(
            `no ${item} dist, release @dvgis/dc-${item} v${version} failed`
          )
        )
        if (index === count - 1) {
          shell.echo(chalk.green('release packages end'))
        }
      }
    }
  )
})
