/**
 @Author: Caven Chen
 **/

import { setParam, registerLib } from './global-api'

import { registerEcharts } from './modules/chart'

const DEF_BASE_URL = './libs/dc-sdk/resources/'
let _baseUrl = DEF_BASE_URL
let __isInitialized = false

export { registerLib, getLib } from './global-api'

export * from './modules'

export * from './modules/third-part'

export { Math } from './modules/math'

export { ChartLayer } from './modules/chart'

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
  return new Promise((resolve, reject) => {
    //reset CESIUM_BASE_URL
    if (options['baseUrl']) {
      this.config.baseUrl = options['baseUrl']
    }
    //register echarts lib
    if (options['echarts']) {
      registerEcharts(options['echarts'])
      registerLib('echarts', options['echarts'])
    }

    //register echarts lib
    if (options['turf']) {
      registerLib('turf', options['turf'])
    }

    __isInitialized = true
    setParam('isInitialized', true)
    setParam('baseUrl', this.config.baseUrl)
    resolve()
  }).catch((e) => {
    throw new Error(e.message)
  })
}
