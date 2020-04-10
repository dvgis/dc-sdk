/*
 * @Author: Caven
 * @Date: 2019-12-27 14:29:05
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-10 13:26:03
 */
;(function() {
  let namespace = {}

  let initialized = false

  let isCesiumLoaded = false

  let DC = {
    Author: 'Caven Chen',
    GitHub: 'https://github.com/Digital-Visual',
    Version: '1.0.0',
    Config: {}
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
   *
   */
  DC.init = callback => {
    if (!isCesiumLoaded) {
      requireCesium().then(Cesium => {
        namespace['Cesium'] = Cesium
        delete window.Cesium
        isCesiumLoaded = true
        callback && callback()
      })
    } else {
      callback && callback()
    }
  }

  /**
   * 框架开始
   */
  DC.ready = callback => {
    try {
      if (!initialized) {
        DC.init(() => {
          require('../thirdpart')
          require('./DC.Loader')
          callback && callback()
          initialized = true
        })
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
