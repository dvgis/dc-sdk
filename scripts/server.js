/**
 * @Author: Caven
 * @Date: 2023-03-11 19:54:31
 */

const fse = require('fs-extra')
const path = require('path')
const portfinder = require('portfinder')
const shell = require('shelljs')
const chalk = require('chalk')
const express = require('express')

let dist = path.resolve(__dirname, '..', 'packages/sdk/dist')
let examples = path.resolve(__dirname, '..', 'examples')

const server = express()

portfinder.setBasePort(8081)

fse.exists(dist, exists => {
  if (exists) {
    portfinder.getPort((err, port) => {
      server.listen(port)
      shell.echo(
        chalk.yellow(`the url is : http://localhost:${port}/info/start.html`)
      )
      server.use('/libs/dc-sdk/', express.static(dist))
      server.use(express.static(examples))
    })
  } else {
    shell.echo(chalk.red(`please run build first`))
  }
})
