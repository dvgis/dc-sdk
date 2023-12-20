/**
 * @Author : Caven Chen
 */

import express from 'express'
import portfinder from 'portfinder'
import fse from 'fs-extra'
import shell from 'shelljs'
import chalk from 'chalk'

export default function start() {
  let dist = 'dist'
  const server = express()
  portfinder.setBasePort(8081)
  fse.exists(dist, (exists) => {
    if (exists) {
      portfinder.getPort((err, port) => {
        server.listen(port)
        shell.echo('\nExamples running at: ')
        shell.echo('- Local:  ' + chalk.yellow(`http://localhost:${port}`))
        shell.echo('\n')
        server.use('/libs/dc-sdk/', express.static(dist))
        server.use(express.static('examples'))
      })
    } else {
      shell.echo(chalk.red(`please run build first`))
    }
  })
}
