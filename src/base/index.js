/**
 * @Author: Caven
 * @Date: 2020-04-22 19:44:30
 */

import { initMixin, initUse } from './global-api'

delete window.DC

let DC = {
  Author: 'Caven Chen <cavencj@gmail.com>',
  GitHub: 'https://github.com/dvgis/dc-sdk',
  Home: 'https://www.dvgis.cn',
  Version: build.version,
  Namespace: {},
  Initialized: false
}

window.DC = DC
;(function() {
  require('../log')
  initMixin(window.DC)
  initUse(window.DC)
  let cesiumLoaded = false
  DC.init = callback => {
    if (!cesiumLoaded) {
      new Promise((resolve, reject) => {
        let Cesium = require('cesium/Cesium')
        resolve(Cesium)
      }).then(Cesium => {
        DC.Namespace['Cesium'] = Cesium
        cesiumLoaded = true
        delete window.Cesium
        callback && callback()
      })
    } else {
      callback && callback()
    }
  }
})()

export default DC
