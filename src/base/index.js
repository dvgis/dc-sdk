/*
 * @Author: Caven
 * @Date: 2020-04-22 09:44:30
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 08:07:56
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
  new Promise((resolve, reject) => {
    let Cesium = require('cesium/Cesium')
    resolve(Cesium)
  }).then(Cesium => {
    window.DC.Namespace['Cesium'] = Cesium
    delete window.Cesium
  })
})()

export default DC
