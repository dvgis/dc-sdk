/**
 * @Author: Caven
 * @Date: 2021-03-13 16:52:10
 */

'use strict'

const path = require('path')
const webpack = require('webpack')
const packageInfo = require('../package.json')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cesiumBuild = '../node_modules/cesium/Build/Cesium'
const common = require('./common')

let cesiumCopyPlugin = [
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, cesiumBuild, 'Assets'),
      to: 'resources/Assets'
    },
    {
      from: path.resolve(__dirname, cesiumBuild, 'Workers'),
      to: 'resources/Workers'
    },
    {
      from: path.resolve(__dirname, cesiumBuild, 'ThirdParty'),
      to: 'resources/ThirdParty'
    }
  ])
]

function getTime() {
  let now = new Date()
  let m = now.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = now.getDate()
  d = d < 10 ? '0' + d : d
  return `${now.getFullYear()}-${m}-${d}`
}

module.exports = env => {
  const IS_PROD = (env && env.production) || false
  const publicPath = IS_PROD ? '/' : '/'
  let plugins = [
    ...cesiumCopyPlugin,
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify('./libs/dc-sdk/resources/'),
      __VERSION__: JSON.stringify(packageInfo.version),
      __TIME__: JSON.stringify(getTime()),
      __AUTHOR__: JSON.stringify(packageInfo.author),
      __REPOSITORY__: JSON.stringify(packageInfo.repository),
      __HOME_PAGE__: JSON.stringify(packageInfo.homepage)
    })
  ]
  if (IS_PROD) {
    plugins.push(new webpack.NoEmitOnErrorsPlugin())
  }
  return {
    entry: {
      'dc.base': [path.resolve(__dirname, '..', 'packages/base/index.js')]
    },
    devtool: IS_PROD ? false : 'cheap-module-eval-source-map',
    output: {
      filename: IS_PROD ? '[name].min.js' : '[name].js',
      path: path.resolve(__dirname, '..', 'packages/base/dist'),
      publicPath: publicPath,
      library: 'DC',
      libraryExport: 'default',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    amd: {
      toUrlUndefined: true
    },
    node: {
      fs: 'empty'
    },
    module: {
      unknownContextCritical: false,
      rules: common.rules
    },
    resolve: {
      extensions: ['.js', '.json', '.css'],
      alias: {
        '@dc-modules': path.resolve(__dirname, '..', 'modules'),
        cesium: path.resolve(__dirname, cesiumBuild)
      }
    },
    plugins
  }
}
