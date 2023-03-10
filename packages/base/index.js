/**
 * @Author: Caven
 * @Date: 2021-03-12 16:45:45
 */

import * as turf from '@turf/turf'

import { initMixin, initUse } from '@dc-modules/global-api'

import { CesiumViewer, GroundSkyBox, BaseLayerPicker } from '@dc-modules/exts'

const Cesium = require('@cesium/engine')

Cesium['Viewer'] = CesiumViewer
Cesium['GroundSkyBox'] = GroundSkyBox
Cesium['BaseLayerPicker'] = BaseLayerPicker

let DC = {
  version: __VERSION__,
  accessToken: '',
  baseUrl: './libs/dc-sdk/resources/',
  author: __AUTHOR__,
  home_page: __HOME_PAGE__,
  Namespace: { Cesium, turf },
  Initialized: false
}

// init global api
initMixin(DC)
initUse(DC)

DC.init = callback => {
  callback && callback()
}

export default DC
