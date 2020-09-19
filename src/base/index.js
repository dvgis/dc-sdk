/**
 * @Author: Caven
 * @Date: 2020-04-22 19:44:30
 */

import { initMixin, initUse } from './global-api'

// global namespace
let DC = {
  version: __VERSION__,
  author: __AUTHOR__,
  home_page: __HOME_PAGE__,
  Namespace: {},
  Initialized: false
}

// init global api
initMixin(DC)
initUse(DC)
require('../LICENSE')

// load Cesium
let cesiumLoaded = false
DC.init = callback => {
  if (!cesiumLoaded) {
    new Promise((resolve, reject) => {
      let Cesium = require('cesium/Cesium')
      resolve(Cesium)
    })
      .then(Cesium => {
        DC.Namespace['Cesium'] = Cesium
        cesiumLoaded = true
        delete window.Cesium
        callback && callback()
      })
      .catch(e => {})
  } else {
    callback && callback()
  }
}

export default DC
