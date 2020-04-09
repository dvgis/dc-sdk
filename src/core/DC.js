/*
 * @Author: Caven
 * @Date: 2019-12-27 14:29:05
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-08 19:44:15
 */
;(function() {
  let namespace = {}

  let initialized = false

  let DC = {
    Author: 'Caven Chen',
    GitHub: 'https://github.com/Digital-Visual',
    Version: '1.0.0',
    Config: {}
  }

  delete window.DC
  window.DC = DC

  require('../log')

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
          require('../thirdpart')
          require('./DC.Loader')
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
