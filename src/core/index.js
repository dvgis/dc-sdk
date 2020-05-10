/*
 * @Author: Caven
 * @Date: 2019-12-27 14:29:05
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 08:38:53
 */

const install = function(DC) {
  if (!DC) {
    throw new Error('Missing Base SDK')
  }

  require('./Loader.Base')

  /**
   * 框架开始
   */
  DC.ready = callback => {
    try {
      if (!DC.Initialized) {
        require('../thirdpart')
        require('./Loader')
        DC.Initialized = true
      }
      callback && callback()
    } catch (e) {
      delete window.DC
      console.error(e)
    }
  }
}

/* istanbul ignore if */

if (typeof window !== 'undefined' && window.DC) {
  install(window.DC)
}

export default {
  install
}
