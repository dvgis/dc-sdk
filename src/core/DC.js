/*
 * @Author: Caven
 * @Date: 2019-12-27 14:29:05
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-13 00:45:23
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

  let requireCesium = () => {
    return new Promise((resolve, reject) => {
      let Cesium = require('cesium/Cesium')
      namespace['Cesium'] = Cesium
      resolve()
    })
  }

  /**
   *
   */
  DC.noConflict = (newVal = 'DC') => {
    delete window[newVal]
    window[newVal] = window.DC
  }

  /**
   *  namespace
   */
  DC.getNamespace = () => {
    return namespace
  }

  /**
   *  start
   */
  DC.init = callback => {
    DC.ready(callback)
  }

  /**
   * start
   */
  DC.ready = callback => {
    try {
      if (!initialized) {
        requireCesium().then(() => {
          require('./DC.Loader')
          require('../thirdpart')
          delete window.Cesium //删除winow下的Cesium
          callback && callback()
        })
        initialized = true
      } else {
        callback && callback()
      }
    } catch (e) {
      delete window.Cesium
      initialized = false
      console.error(e)
    }
  }
})()
