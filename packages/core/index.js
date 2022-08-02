/**
 * @Author: Caven
 * @Date: 2021-03-13 13:15:38
 */

import { add } from '@dc-modules/namespace/NSManager'

const install = function(DC) {
  if (!DC || !DC.init) {
    throw new Error('Missing DC Base Package')
  }

  add('Cesium', DC.Namespace.Cesium)
  add('turf', DC.Namespace.turf)

  /**
   * start
   */
  DC.ready = callback => {
    try {
      if (!DC.Initialized) {
        // load components
        try {
          DC.mixin(require('./src/components.js').default)
          require('@dc-modules/copy-right')
          if (DC.baseUrl) {
            const { Cesium } = DC.Namespace
            Cesium && Cesium.buildModuleUrl.setBaseUrl(DC.baseUrl)
          }
          DC.Initialized = true
          callback && callback()
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e)
          DC.Initialized = false
        }
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
  name: 'dc-core',
  version: __VERSION__,
  compile_time: __TIME__,
  install
}
