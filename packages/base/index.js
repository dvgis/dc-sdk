/**
 * @Author: Caven
 * @Date: 2021-03-12 16:45:45
 */

import { initMixin, initUse } from '@dc-modules/global-api'
import * as turf from '@turf/turf'

let DC = {
  version: __VERSION__,
  accessToken: '',
  baseUrl: './libs/dc-sdk/resources/',
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
        // set Cesium to Namespace
        DC.Namespace['Cesium'] = Cesium
        cesiumLoaded = true
        delete window['Cesium']
        // set turf to Namespace
        DC.Namespace['turf'] = turf
        callback && callback()
      })
      .catch(e => {})
  } else {
    callback && callback()
  }
}

export default DC
