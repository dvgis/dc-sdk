/**
 * @Author: Caven
 * @Date: 2020-01-18 18:22:23
 */

const path = require('path')
const webpack = require('webpack')
const packageInfo = require('./package.json')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const JavaScriptObfuscator = require('webpack-obfuscator')

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
  return `${now.getFullYear()}-${now.getMonth() +
    1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`
}

module.exports = env => {
  const IS_PROD = (env && env.production) || false
  const publicPath = IS_PROD ? '/' : '/'
  let plugins = [
    ...cesiumCopyPlugin,
    new MiniCssExtractPlugin({
      filename: IS_PROD ? '[name].min.css' : '[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify('./libs/dc-sdk/resources/'),
      'build.version': JSON.stringify(packageInfo.version),
      'build.time': JSON.stringify(getTime())
    })
  ]
  if (IS_PROD) {
    plugins.push(new OptimizeCssAssetsPlugin())
    plugins.push(new webpack.NoEmitOnErrorsPlugin())
    plugins.push(
      new JavaScriptObfuscator(
        {
          rotateStringArray: true
        },
        ['dc.base.min.js']
      )
    )
  }
  return {
    entry: {
      'dc.base': ['base'],
      'dc.core': ['entry', 'theme']
    },
    devtool: IS_PROD ? false : 'cheap-module-eval-source-map',
    output: {
      filename: IS_PROD ? '[name].min.js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: publicPath,
      sourcePrefix: ''
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
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 20000
          }
        },
        {
          test: /\.glsl$/,
          loader: 'webpack-glsl-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.json', '.css'],
      alias: {
        '@': resolve('src'),
        base: './src/base/index.js',
        entry: './src/core/index.js',
        theme: './src/themes/index.js',
        cesium: path.resolve(__dirname, cesiumBuild)
      }
    },
    plugins
  }
}
