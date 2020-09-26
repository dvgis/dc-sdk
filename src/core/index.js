/**
 * @Author: Caven
 * @Date: 2019-12-27 14:29:05
 */

const install = function(DC) {
  if (!DC) {
    throw new Error('Missing Base SDK')
  }

  DC.init(() => {
    require('./Loader.Base')
  })

  /**
   * start
   */
  DC.ready = callback => {
    try {
      if (!DC.Initialized) {
        new Promise((resolve, reject) => {
          require('../thirdpart')
          require('./Loader')
          resolve()
        }).then(() => {
          DC.Initialized = true
          callback && callback()
        })
      } else {
        callback && callback()
      }
    } catch (e) {
      // eslint-disable-next-line no-console
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
