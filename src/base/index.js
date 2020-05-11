/*
 * @Author: Caven
 * @Date: 2020-04-22 09:44:30
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 23:50:26
 */

import { initMixin, initUse } from './global-api'

let DC = {
  Author: 'Caven Chen',
  GitHub: 'https://github.com/Digital-Visual',
  Home: 'https://www.dvgis.cn',
  Version: '1.5.0',
  Namespace: {},
  Initialized: false
}
delete window.DC
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
