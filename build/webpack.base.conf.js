/**
 * @Author: Caven
 * @Date: 2021-03-13 16:52:10
 */

'use strict'

const path = require('path')
const webpack = require('webpack')
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

module.exports = env => {
  const IS_PROD = (env && env.production) || false
  const publicPath = IS_PROD ? '/' : '/'
  let plugins = [...cesiumCopyPlugin, ...common.plugins]
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
