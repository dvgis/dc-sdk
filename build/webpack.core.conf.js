/**
 * @Author: Caven
 * @Date: 2020-01-18 19:22:23
 */

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const JavaScriptObfuscator = require('webpack-obfuscator')
const cesiumBuild = '../node_modules/cesium/Build/Cesium'
const common = require('./common')

module.exports = env => {
  const IS_PROD = (env && env.production) || false
  const publicPath = IS_PROD ? '/' : '/'
  let plugins = [
    new MiniCssExtractPlugin({
      filename: IS_PROD ? '[name].min.css' : '[name].css',
      allChunks: true
    }),
    ...common.plugins
  ]
  if (IS_PROD) {
    plugins.push(new OptimizeCssAssetsPlugin())
    plugins.push(new webpack.NoEmitOnErrorsPlugin())
    plugins.push(
      new JavaScriptObfuscator(
        {
          rotateStringArray: true
        },
        []
      )
    )
  }
  return {
    entry: {
      'dc.core': ['theme', 'entry']
    },
    devtool: IS_PROD ? false : 'cheap-module-eval-source-map',
    output: {
      filename: IS_PROD ? '[name].min.js' : '[name].js',
      path: path.resolve(
        __dirname,
        path.resolve(__dirname, '..', 'packages/core/dist')
      ),
      publicPath: publicPath,
      library: 'DcCore',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      unknownContextCritical: false,
      rules: common.rules
    },
    resolve: {
      extensions: ['.js', '.json', '.css'],
      alias: {
        '@dc-modules': path.resolve(__dirname, '..', 'modules'),
        entry: path.resolve(__dirname, '..', 'packages/core/index.js'),
        theme: path.resolve(__dirname, '..', 'modules/themes/index.js'),
        cesium: path.resolve(__dirname, cesiumBuild)
      }
    },
    plugins
  }
}
