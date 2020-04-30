/*
 * @Author: Caven
 * @Date: 2019-12-27 14:29:05
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-30 12:08:44
 */

/**
 * 框架开始
 */
DC.ready = callback => {
  try {
    if (!DC.Initialized) {
      DC.init(() => {
        require('../thirdpart')
        require('./DC.Loader')
        callback && callback()
        DC.Initialized = true
      })
    } else {
      callback && callback()
    }
  } catch (e) {
    delete window.Cesium
    DC.Initialized = false
    console.error(e)
  }
}

module.exports = {}
