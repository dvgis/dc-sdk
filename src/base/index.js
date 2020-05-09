/*
 * @Author: Caven
 * @Date: 2020-04-22 09:44:30
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-09 13:10:37
 */
;(function() {
  let isCesiumLoaded = false
  let DC = {
    Author: 'Caven Chen',
    GitHub: 'https://github.com/Digital-Visual',
    Home: 'https://www.dvgis.cn',
    Version: '1.5.0',
    Config: {},
    Namespace: {},
    Initialized: false
  }
  delete window.DC
  window.DC = DC

  require('../log')

  /**
   * load Cesium
   */
  function requireCesium() {
    return new Promise((resolve, reject) => {
      let Cesium = require('cesium/Cesium')
      resolve(Cesium)
    })
  }

  /**
   *
   */
  DC.init = callback => {
    if (!isCesiumLoaded) {
      requireCesium().then(Cesium => {
        DC.Namespace['Cesium'] = Cesium
        delete window.Cesium
        DC.LayerType = {}
        DC.OverlayType = {}
        DC.EffectType = {}
        DC.WidgetType = {}
        DC.ImageryType = {
          ARCGIS: 'arcgis',
          SINGLE_TILE: 'single_tile',
          WMTS: 'wmts',
          XYZ: 'xyz',
          COORD: 'Coord'
        }
        isCesiumLoaded = true
        callback && callback()
      })
    } else {
      callback && callback()
    }
  }

  /**
   *
   */
  DC.use = plugin => {
    plugin && plugin.install && plugin.install(DC)
  }
})()

module.exports = DC
