/*
 * @Author: Caven
 * @Date: 2019-12-27 14:29:05
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-30 21:17:32
 */
;(function() {
  let namespace = {}
  let initialized = false
  let DC = {
    Http: undefined,
    Version: '1.0.0',
    Config: {}
  }
  window.DC = DC
  function requireCesium() {
    return new Promise((resolve, reject) => {
      let Cesium = require('cesium/Cesium')
      namespace['Cesium'] = Cesium
      resolve()
    })
  }

  /**
   * 获取 namespace
   */
  DC.getNamespace = function() {
    return namespace
  }

  /**
   * 开始
   */
  DC.init = function(callback) {
    DC.ready(callback)
  }

  /**
   * 开始
   */
  DC.ready = function(callback) {
    try {
      if (!initialized) {
        requireCesium().then(() => {
          require('./DC.Loader')
          delete window.Cesium //删除winow下的Cesium
        })
      }
      callback && callback()
      initialized = true
    } catch (e) {
      delete window.Cesium
      initialized = false
    }
  }
})()
