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
import javascriptObfuscator from 'gulp-javascript-obfuscator'
import startServer from './server.js'
import inlineImage from 'esbuild-plugin-inline-image'
import { sassPlugin } from 'esbuild-sass-plugin'
import { glsl } from 'esbuild-plugin-glsl'
import shell from 'shelljs'
import chalk from 'chalk'

const dc_common_path = './node_modules/@dvgis/dc-common'

const packageJson = fse.readJsonSync('./package.json')

const c_packageJson = fse.readJsonSync(
  path.join(dc_common_path, 'package.json')
)

const obfuscatorConfig = {
  compact: true, //压缩代码
  identifierNamesGenerator: 'hexadecimal', //标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
  renameGlobals: false, //是否启用全局变量和函数名称的混淆
  rotateStringArray: true, //通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
  selfDefending: true, //混淆后的代码,不能使用代码美化,同时需要配置 compact:true;
  stringArray: true, //删除字符串文字并将它们放在一个特殊的数组中
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  transformObjectKeys: false,
  unicodeEscapeSequence: false, //允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
}

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
              c_packageJson.devDependencies['@cesium/engine'].replace('^', '')
            )
            .replace('{{__AUTHOR__}}', packageJson.author)
            .replace('{{__HOME_PAGE__}}', packageJson.homepage)
            .replace('{{__REPOSITORY__}}', packageJson.repository)}
    }`

  const importNamespace = `
       import {Cesium , Supercluster } from '@dvgis/dc-common'
     `
  const exportNamespace = `
        export const __namespace = {
            Cesium :  Cesium,
            Supercluster: Supercluster
        }
     `

  // Build IIFE
  if (options.iife) {
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
    await esbuild.build({
      ...buildConfig,
      format: 'iife',
      globalName: 'DC',
      outfile: path.join('dist', 'modules-iife.js'),
    })
  }

  // Build Node、
  if (options.node) {
    await fse.outputFile(
      dcPath,
      `
            ${importNamespace}
            ${content}
            ${exportVersion}
            ${exportNamespace}
            ${cmdOutFunction}
            `,
      {
        encoding: 'utf8',
      }
    )
    await esbuild.build({
      ...buildConfig,
      format: 'esm',
      platform: 'node',
      define: {
        TransformStream: 'null',
      },
      external: ['@dvgis/dc-common'],
      outfile: path.join('dist', 'index.js'),
    })
  }

  // remove DC.js
  await fse.remove(dcPath)
}

async function combineJs(options) {
  // combine for iife
  if (options.iife) {
    if (options.obfuscate) {
      await gulp
        .src('dist/modules-iife.js')
        .pipe(javascriptObfuscator(obfuscatorConfig))
        .pipe(gulp.src(path.join(dc_common_path, 'dist', '__namespace.js')))
        .pipe(concat('dc.min.js'))
        .pipe(gulp.dest('dist'))
        .on('end', () => {
          addCopyright(options)
          deleteTempFile()
        })
    } else {
      await gulp
        .src([
          'dist/modules-iife.js',
          path.join(dc_common_path, 'dist', '__namespace.js'),
        ])
        .pipe(concat('dc.min.js'))
        .pipe(gulp.dest('dist'))
        .on('end', () => {
          addCopyright(options)
          deleteTempFile()
        })
    }
  }

  // combine for node
  if (options.node && options.obfuscate) {
    await gulp
      .src('dist/index.js')
      .pipe(
        javascriptObfuscator({
          ...obfuscatorConfig,
          target: 'browser-no-eval',
        })
      )
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

async function regenerate(option, content) {
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
        await regenerate({ iife: true })
        await startServer()
      })
      .on('change', async () => {
        let now = new Date().getTime()
        try {
          await regenerate({ iife: true })
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
  () => buildModules({ node: true }),
  () => combineJs({ node: true }),
  () => buildCSS({ minify: true }),
  copyAssets
)

export const build = gulp.series(
  () => buildModules({ iife: true }),
  () => combineJs({ iife: true }),
  () => buildModules({ node: true }),
  () => combineJs({ node: true }),
  () => buildCSS({ minify: true }),
  copyAssets
)

export const buildRelease = gulp.series(
  () => buildModules({ iife: true }),
  () => combineJs({ iife: true, obfuscate: true }),
  () => buildModules({ node: true }),
  () => combineJs({ node: true, obfuscate: true }),
  () => buildCSS({ minify: true }),
  copyAssets
)
