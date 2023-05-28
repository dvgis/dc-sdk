/**
 @Author: Caven Chen
 **/
import { getLib, registerLib } from './global-api/lib-utils.js'

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
  if (options['baseUrl']) {
    this.config.baseUrl = options['baseUrl']
  }
  if (options['accessToken']) {
    this.config.accessToken = options['accessToken']
  }

  if (options['Cesium']) {
    registerLib('Cesium', options['Cesium'])
  } else {
    registerLib('Cesium', this['__namespace']['Cesium'])
  }

  if (options['echarts']) {
    registerLib('echarts', options['echarts'])
  }

  // if (options['turf']) {
  //   registerLib('turf', options['turf'])
  // }

  this['__cmdOut'] && this['__cmdOut']()

  return new Promise((resolve, reject) => {
    const Cesium = getLib('Cesium')
    if (!Cesium) {
      throw new Error('missing Cesium Lib')
    }
    this.config.baseUrl && Cesium.buildModuleUrl.setBaseUrl(this.config.baseUrl)

    // register common modules
    const modules = require('./modules')
    Object.keys(modules).forEach((key) => {
      this[key] = modules[key]
    })
    // register third part modules
    const { THIRD_PART } = require('./modules/third-part')
    Object.keys(THIRD_PART).forEach((key) => {
      this[key] = THIRD_PART[key]
    })
    // register math module
    if (this['Math']) {
      const funcs = require('./modules/math')
      Object.keys(funcs).forEach((key) => {
        this['Math'][key] = funcs[key]
      })
    }
    // register chart module
    if (getLib('echarts')) {
      const modules = require('./modules/chart')
      Object.keys(modules).forEach((key) => {
        this[key] = modules[key]
      })
    }
    // register turf module
    if (getLib('turf')) {
      // todo
    }

    resolve()
  }).catch((e) => {
    throw new Error(e.message)
  })
}
