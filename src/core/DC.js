/*
 * @Author: Caven
 * @Date: 2019-12-27 14:29:05
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-10 10:47:17
 */
;(function() {
  let namespace = {}
  let initialized = false
  let DC = {
    Http: undefined,
    Version: '1.0.0',
    Config: {}
  }

  delete window.DC

  window.DC = DC

  function requireCesium() {
    return new Promise((resolve, reject) => {
      let Cesium = require('cesium/Cesium')
      namespace['Cesium'] = Cesium
      resolve()
    })
  }

  /**
   *  namespace
   */
  DC.getNamespace = function() {
    return namespace
  }

  /**
   *  start
   */
  DC.init = function(callback) {
    DC.ready(callback)
  }

  /**
   * start
   */
  DC.ready = function(callback) {
    try {
      if (!initialized) {
        requireCesium().then(() => {
          require('./DC.Loader')
          delete window.Cesium //删除winow下的Cesium
        })
        initialized = true
      }
      callback && callback()
    } catch (e) {
      delete window.Cesium
      initialized = false
    }
  }
})()
