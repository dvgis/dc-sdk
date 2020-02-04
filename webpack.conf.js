/*
 * @Author: Caven
 * @Date: 2020-01-18 18:22:23
 * @Last Modified by: Caven
<<<<<<< HEAD
 * @Last Modified time: 2020-02-03 17:28:39
=======
 * @Last Modified time: 2020-01-31 15:49:20
>>>>>>> 9de64d53260a4e8c311a15a85bbd18a16c4ea8b5
 */

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopywebpackPlugin = require('copy-webpack-plugin')
const cesiumBuild = './libs/cesium/Build/Cesium'
const cesiumSource = './libs/cesium/Source'

let cesiumCopyPlugin = [
  new CopywebpackPlugin([{ from: path.join(cesiumBuild, 'Workers'), to: 'resources/Workers' }]),
  new CopywebpackPlugin([{ from: path.join(cesiumBuild, 'Assets'), to: 'resources/Assets' }]),
  new CopywebpackPlugin([{ from: path.join(cesiumBuild, 'Widgets'), to: 'resources/Widgets' }]),
  new CopywebpackPlugin([{ from: path.join(cesiumBuild, 'ThirdParty'), to: 'resources/ThirdParty' }])
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
      'dc.core': ['entry', 'thirdpart', 'theme']
    },
    devtool: IS_PROD ? false : 'cheap-module-eval-source-map',
    output: {
      filename: IS_PROD ? '[name].min.js' : '[name].js',
      path: path.resolve(__dirname, 'dist/dc-sdk'),
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
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.json', '.css'],
      alias: {
        '@': resolve('src'),
        entry: './src/core/DC.js',
        theme: './src/themes/index.js',
        thirdpart: './src/thirdpart/index.js',
        cesium: path.resolve(__dirname, cesiumSource)
      }
    },
    plugins
  }
}
