/**
 @author : Caven Chen
 **/

'use strict'

import fse from 'fs-extra'
import path from 'path'
import gulp from 'gulp'
import esbuild from 'esbuild'
import concat from 'gulp-concat'
import clean from 'gulp-clean'
import startServer from './server.js'
import inlineImage from 'esbuild-plugin-inline-image'
import { sassPlugin } from 'esbuild-sass-plugin'
import { glsl } from 'esbuild-plugin-glsl'
import GlobalsPlugin from 'esbuild-plugin-globals'
import shell from 'shelljs'
import chalk from 'chalk'

const dc_common_path = './node_modules/@dvgis/dc-common'

const packageJson = fse.readJsonSync('./package.json')

const c_packageJson = fse.readJsonSync(
  path.join(dc_common_path, 'package.json')
)

const buildConfig = {
  entryPoints: ['src/DC.js'],
  bundle: true,
  color: true,
  legalComments: `inline`,
  logLimit: 0,
  target: `es2019`,
  minify: false,
  sourcemap: false,
  write: true,
  logLevel: 'info',
  plugins: [
    inlineImage({
      limit: -1,
    }),
    glsl(),
    sassPlugin(),
  ],
  external: ['@dvgis/dc-common'],
}

function getTime() {
  let now = new Date()
  let m = now.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = now.getDate()
  d = d < 10 ? '0' + d : d
  return `${now.getFullYear()}-${m}-${d}`
}

async function buildCSS(options) {
  await esbuild.build({
    ...buildConfig,
    minify: options.minify,
    entryPoints: ['src/themes/index.scss'],
    outfile: path.join('dist', 'dc.min.css'),
  })
}

async function buildModules(options) {
  const dcPath = path.join('src', 'DC.js')

  const content = await fse.readFile(path.join('src', 'index.js'), 'utf8')

  await fse.ensureFile(dcPath)

  const exportVersion = `export const VERSION = '${packageJson.version}'`

  const cmdOut_content = await fse.readFile(
    path.join('src', 'copyright', 'cmdOut.js'),
    'utf8'
  )

  const cmdOutFunction = `
        function __cmdOut() {
          ${cmdOut_content
            .replace('{{__VERSION__}}', packageJson.version)
            .replace('{{__TIME__}}', getTime())
            .replace(
              '{{__ENGINE_VERSION__}}',
              c_packageJson.dependencies['@cesium/engine'].replace('^', '')
            )
            .replace('{{__AUTHOR__}}', packageJson.author)
            .replace('{{__HOME_PAGE__}}', packageJson.homepage)
            .replace('{{__REPOSITORY__}}', packageJson.repository)}
    }`

  await fse.outputFile(
    dcPath,
    `
              ${content}
              ${cmdOutFunction}
              ${exportVersion}
            `,
    {
      encoding: 'utf8',
    }
  )
  // Build IIFE
  if (options.iife) {
    await esbuild.build({
      ...buildConfig,
      format: 'iife',
      globalName: 'DC',
      plugins: [
        ...buildConfig.plugins,
        GlobalsPlugin({
          '@dvgis/dc-common': 'DC_Common',
        }),
      ],
      minify: options.minify,
      outfile: path.join('dist', 'modules-iife.js'),
    })
  }

  // Build Node、
  if (options.node) {
    await esbuild.build({
      ...buildConfig,
      format: 'esm',
      platform: 'node',
      define: {
        TransformStream: 'null',
      },
      minify: options.minify,
      outfile: path.join('dist', 'index.js'),
    })
  }

  // remove DC.js
  await fse.remove(dcPath)
}

async function combineJs(options) {
  // combine for iife
  if (options.iife) {
    await gulp
      .src([
        path.join(dc_common_path, 'dist', 'dc.common.min.js'),
        'dist/modules-iife.js',
      ])
      .pipe(concat('dc.min.js'))
      .pipe(gulp.dest('dist'))
      .on('end', () => {
        addCopyright(options)
        deleteTempFile()
      })
  }

  // combine for node
  if (options.node) {
    await gulp
      .src('dist/index.js')
      .pipe(gulp.dest('dist'))
      .on('end', () => {
        addCopyright(options)
      })
  }
}

async function copyAssets() {
  await fse.emptyDir('dist/resources')
  await gulp
    .src(dc_common_path + '/dist/resources/**', { nodir: true })
    .pipe(gulp.dest('dist/resources'))
}

async function addCopyright(options) {
  let header = await fse.readFile(
    path.join('src', 'copyright', 'header.js'),
    'utf8'
  )
  header = header
    .replace('{{__VERSION__}}', packageJson.version)
    .replace('{{__AUTHOR__}}', packageJson.author)
    .replace('{{__REPOSITORY__}}', packageJson.repository)

  if (options.iife) {
    let filePath = path.join('dist', 'dc.min.js')
    const content = await fse.readFile(filePath, 'utf8')
    await fse.outputFile(filePath, `${header}${content}`, { encoding: 'utf8' })
  }

  if (options.node) {
    let filePath = path.join('dist', 'index.js')
    const content = await fse.readFile(filePath, 'utf8')
    await fse.outputFile(filePath, `${header}${content}`, { encoding: 'utf8' })
  }
}

async function deleteTempFile() {
  await gulp.src(['dist/modules-iife.js'], { read: false }).pipe(clean())
}

async function regenerate(option) {
  await fse.remove('dist/dc.min.js')
  await fse.remove('dist/dc.min.css')
  await buildModules(option)
  await combineJs(option)
  await buildCSS(option)
}

export const server = gulp.series(startServer)

export const dev = gulp.series(
  () => copyAssets(),
  () => {
    shell.echo(chalk.yellow('============= start dev =============='))
    const watcher = gulp.watch('src', {
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 1000,
        pollInterval: 100,
      },
    })
    watcher
      .on('ready', async () => {
        await regenerate({ iife: true, minify: false })
        await startServer()
      })
      .on('change', async () => {
        let now = new Date().getTime()
        try {
          await regenerate({ iife: true, minify: false })
          shell.echo(
            chalk.green(`regenerate lib takes ${new Date().getTime() - now} ms`)
          )
        } catch (e) {
          shell.error(e)
        }
      })
    return watcher
  }
)

export const buildIIFE = gulp.series(
  () => buildModules({ iife: true }),
  () => combineJs({ iife: true }),
  () => buildCSS({ minify: true }),
  copyAssets
)

export const buildNode = gulp.series(
  () => buildModules({ node: true, minify: true }),
  () => combineJs({ node: true }),
  () => buildCSS({ minify: true }),
  copyAssets
)

export const build = gulp.series(
  () => buildModules({ iife: true, minify: true }),
  () => combineJs({ iife: true }),
  () => buildModules({ node: true, minify: true }),
  () => combineJs({ node: true }),
  () => buildCSS({ minify: true }),
  copyAssets
)

export const buildRelease = gulp.series(
  () => buildModules({ iife: true, minify: true }),
  () => combineJs({ iife: true }),
  () => buildModules({ node: true, minify: true }),
  () => combineJs({ node: true }),
  () => buildCSS({ minify: true }),
  copyAssets
)
