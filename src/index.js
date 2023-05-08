/**
 @Author: Caven Chen
 **/
import { registerLib } from './global-api/lib-utils.js'

export { registerLib, getLib } from './global-api/lib-utils.js'

let _baseUrl = './libs/dc-sdk/resources/'
let _accessToken = ''

export const config = {
  set baseUrl(baseUrl) {
    _baseUrl = baseUrl
  },
  get baseUrl() {
    return _baseUrl
  },
  set accessToken(accessToken) {
    _accessToken = accessToken
  },
  get accessToken() {
    return _accessToken
  },
}

export function ready(options = {}) {
  if (options.baseUrl) {
    this.config.baseUrl = options.baseUrl
  }
  if (options.accessToken) {
    this.config.accessToken = options.accessToken
  }
  const { Cesium, turf } = this['__namespace']
  registerLib('Cesium', Cesium)
  registerLib('turf', turf)
  this['__cmdOut'] && this['__cmdOut']()
  return new Promise((resolve, reject) => {
    const modules = require('./modules')
    this.config.baseUrl &&
      Cesium &&
      Cesium.buildModuleUrl.setBaseUrl(this.config.baseUrl)
    Object.keys(modules).forEach((key) => {
      this[key] = modules[key]
    })
    resolve()
  })
}
