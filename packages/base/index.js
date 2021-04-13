/**
 * @Author: Caven
 * @Date: 2021-03-12 16:45:45
 */

import { initMixin, initUse } from '@dc-modules/global-api'

let DC = {
  version: __VERSION__,
  accessToken: '',
  certified: false,
  author: __AUTHOR__,
  home_page: __HOME_PAGE__,
  Namespace: {},
  Initialized: false
}

// init global api
initMixin(DC)
initUse(DC)

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
        delete window['Cesium']
        callback && callback()
      })
      .catch(e => {})
  } else {
    callback && callback()
  }
}

export default DC
