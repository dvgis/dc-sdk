/**
 * @Author: Caven
 * @Date: 2021-03-13 13:15:38
 */

const install = function(DC) {
  if (!DC) {
    throw new Error('Missing DC Base Package')
  }

  /**
   * start
   */
  DC.ready = callback => {
    try {
      if (!DC.Initialized) {
        DC.init(() => {
          try {
            const components = require('./src/components.js').default
            DC.mixin(components)
            DC.Initialized = true
            callback && callback()
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e)
            DC.Initialized = false
          }
        })
      } else {
        callback && callback()
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      DC.Initialized = false
      throw e
    }
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(window.DC)
}

export default {
  version: __VERSION__,
  compile_time: __TIME__,
  install
}
