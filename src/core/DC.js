/*
 * @Author: Caven
 * @Date: 2019-12-27 14:29:05
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-19 21:10:19
 */
;(function() {
  let namespace = {}

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
      requireCesium().then(() => {
        require('./DC.Loader')
        delete window.Cesium //删除winow下的Cesium
        callback && callback()
      })
    } catch (e) {
      delete window.Cesium
    }
  }
})()
