/**
 * @Author: Caven
 * @Date: 2020-01-18 19:22:23
 */

const path = require('path')
const webpack = require('webpack')
const packageInfo = require('./package.json')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cesiumBuild = 'node_modules/cesium/Build/Cesium'

let cesiumCopyPlugin = [
  new CopyWebpackPlugin([
    { from: path.join(cesiumBuild, 'Assets'), to: 'resources/Assets' }
  ]),
  new CopyWebpackPlugin([
    { from: path.join(cesiumBuild, 'Workers'), to: 'resources/Workers' }
  ]),
  new CopyWebpackPlugin([
    { from: path.join(cesiumBuild, 'ThirdParty'), to: 'resources/ThirdParty' }
  ])
]

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

function getTime() {
  let now = new Date()
  let m = now.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = now.getDate()
  d = d < 10 ? '0' + d : d
  let h = now.getHours()
  h = h < 10 ? '0' + h : h
  let min = now.getMinutes()
  min = min < 10 ? '0' + min : min
  let s = now.getSeconds()
  s = s < 10 ? '0' + s : s
  return `${now.getFullYear()}-${m}-${d} ${h}:${min}:${s}`
}

module.exports = env => {
  const IS_PROD = (env && env.production) || false
  const publicPath = IS_PROD ? '/' : '/'
  let plugins = [
    ...cesiumCopyPlugin,
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify('./libs/dc-sdk/resources/'),
      'build.version': JSON.stringify(packageInfo.version),
      'build.time': JSON.stringify(getTime()),
      'build.author': JSON.stringify(packageInfo.author),
      'build.repository': JSON.stringify(packageInfo.repository),
      'build.homepage': JSON.stringify(packageInfo.homepage)
    })
  ]
  if (IS_PROD) {
    plugins.push(new webpack.NoEmitOnErrorsPlugin())
  }
  return {
    entry: {
      'dc.base': ['base']
    },
    devtool: IS_PROD ? false : 'source-map',
    output: {
      filename: IS_PROD ? '[name].min.js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: publicPath,
      library: 'DC',
      libraryExport: 'default',
      libraryTarget: 'umd'
    },
    amd: {
      toUrlUndefined: true
    },
    node: {
      fs: 'empty'
    },
    module: {
      unknownContextCritical: false,
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/transform-runtime'],
            compact: false,
            ignore: ['checkTree']
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.json', '.css'],
      alias: {
        '@': resolve('src'),
        base: './src/base/index.js',
        cesium: path.resolve(__dirname, cesiumBuild)
      }
    },
    plugins
  }
}
