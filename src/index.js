/**
 @Author: Caven Chen
 **/

import { setParam } from './global-api'
const DEF_BASE_URL = './libs/dc-sdk/resources/'
let _baseUrl = DEF_BASE_URL
let __isInitialized = false

export { registerLib, getLib } from './global-api'

export * from './modules'

export * from './modules/third-part'

export { Math } from './modules/math'

export { registerEcharts, ChartLayer } from './modules/chart'

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
  __isInitialized = true
  return new Promise((resolve, reject) => {
    setParam('isInitialized', true)
    setParam('baseUrl', this.config.baseUrl)
    resolve()
  }).catch((e) => {
    throw new Error(e.message)
  })
}
