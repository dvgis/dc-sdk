/**
 * @Author: Caven
 * @Date: 2020-04-22 19:44:30
 */

import { initMixin, initUse } from './global-api'

let DC = {
  Author: build.author,
  GitHub: build.repository,
  Home: build.homepage,
  Version: build.version,
  Namespace: {},
  Initialized: false
}

initMixin(DC)
initUse(DC)

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

require('../log')

export default DC
