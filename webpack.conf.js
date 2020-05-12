/*
 * @Author: Caven
 * @Date: 2020-01-18 18:22:23
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 19:56:04
 */

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopywebpackPlugin = require('copy-webpack-plugin')
const cesiumBuild = 'node_modules/cesium/Build/Cesium'
const cesiumSource = 'node_modules/cesium/Source'

let cesiumCopyPlugin = [
  new CopywebpackPlugin([
    { from: path.join(cesiumBuild, 'Workers'), to: 'resources/Workers' }
  ]),
  new CopywebpackPlugin([
    { from: path.join(cesiumBuild, 'Assets'), to: 'resources/Assets' }
  ]),
  new CopywebpackPlugin([
    { from: path.join(cesiumBuild, 'Widgets'), to: 'resources/Widgets' }
  ]),
  new CopywebpackPlugin([
    { from: path.join(cesiumBuild, 'ThirdParty'), to: 'resources/ThirdParty' }
  ])
]

function resolve(dir) {
  return path.join(__dirname, '.', dir)
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
      CESIUM_BASE_URL: JSON.stringify('./libs/dc-sdk/resources/')
    })
  ]
  if (IS_PROD) {
    plugins.push(new OptimizeCssAssetsPlugin())
    plugins.push(new webpack.NoEmitOnErrorsPlugin())
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
      toUrlUndefinded: true
    },
    node: {
      fs: 'empty'
    },
    module: {
      unknownContextCritical: false,
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          include: path.resolve(__dirname, cesiumSource),
          use: [
            {
              loader: 'strip-pragma-loader',
              options: {
                pragmas: {
                  debug: false
                }
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env'],
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
        cesium: path.resolve(__dirname, cesiumSource)
      }
    },
    plugins
  }
}
