/**
 * @Author: Caven
 * @Date: 2021-03-13 12:09:44
 */

'use strict'

const webpack = require('webpack')
const packageInfo = require('../package.json')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function getTime() {
  let now = new Date()
  let m = now.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = now.getDate()
  d = d < 10 ? '0' + d : d
  return `${now.getFullYear()}-${m}-${d}`
}

module.exports = {
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
  ],
  plugins: [
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify('./libs/dc-sdk/resources/'),
      __VERSION__: JSON.stringify(packageInfo.version),
      __TIME__: JSON.stringify(getTime()),
      __AUTHOR__: JSON.stringify(packageInfo.author),
      __REPOSITORY__: JSON.stringify(packageInfo.repository),
      __HOME_PAGE__: JSON.stringify(packageInfo.homepage)
    })
  ]
}
