/*
 * @Author: Caven
 * @Date: 2020-04-22 09:44:30
 * @Last Modified by: Caven
 * @Last Modified time: 2020-07-27 10:39:47
 */

import { initMixin, initUse } from './global-api'

delete window.DC

let DC = {
  Author: 'Caven Chen <cavencj@gmail.com>',
  GitHub: 'https://github.com/Digital-Visual',
  Home: 'https://www.dvgis.cn',
  Version: '1.8.3',
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
