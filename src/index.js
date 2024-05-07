/**
 @Author: Caven Chen
 **/
import { getLib, registerLib } from './global-api/lib-utils.js'

export { registerLib, getLib } from './global-api/lib-utils.js'

const DEF_BASE_URL = './libs/dc-sdk/resources/'

let _baseUrl = DEF_BASE_URL

let __isInitialized = false

export const config = {
  set baseUrl(baseUrl) {
    _baseUrl = baseUrl
  },
  get baseUrl() {
    return _baseUrl
  },
}

export function ready(options = {}) {
  if (__isInitialized) {
    return Promise.resolve()
  }
  __cmdOut && __cmdOut()
  if (options['baseUrl']) {
    this.config.baseUrl = options['baseUrl']
  }

  if (options['Cesium']) {
    registerLib('Cesium', options['Cesium'])
    if (this.config.baseUrl === DEF_BASE_URL) {
      this.config.baseUrl = ''
    }
  } else {
    registerLib('Cesium', this['__namespace']['Cesium'])
  }

  if (options['echarts']) {
    registerLib('echarts', options['echarts'])
  }

  if (options['Supercluster']) {
    registerLib('Supercluster', options['Supercluster'])
  } else {
    registerLib('Supercluster', this['__namespace']['Supercluster'])
  }

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
      const maths = require('./modules/math')
      Object.keys(maths).forEach((key) => {
        this['Math'][key] = maths[key]
      })
    }
    // register chart module
    if (getLib('echarts')) {
      const modules = require('./modules/chart')
      Object.keys(modules).forEach((key) => {
        this[key] = modules[key]
      })
    }
    __isInitialized = true
    resolve()
  }).catch((e) => {
    throw new Error(e.message)
  })
}
