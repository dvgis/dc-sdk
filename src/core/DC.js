/*
 * @Author: Caven
 * @Date: 2019-12-27 14:29:05
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-09 13:25:12
 */

const install = function(DC) {
  if (!DC) {
    throw new Error('DC.Overlay: Missing DC Base SDK')
  }

  DC.init(() => {
    require('../thirdpart')
    require('./DC.Loader.Base')
  })

  /**
   * 框架开始
   */
  DC.ready = callback => {
    try {
      if (!DC.Initialized) {
        DC.init(() => {
          require('./DC.Loader')
          DC.Initialized = true
          callback && callback()
        })
      } else {
        callback && callback()
      }
    } catch (e) {
      delete window.Cesium
      delete window.DC

      console.error(e)
    }
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(window.DC)
}

module.exports = {
  install
}
