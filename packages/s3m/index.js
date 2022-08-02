/**
 * @Author: Caven
 * @Date: 2021-03-12 16:45:45
 */

import { add } from '@dc-modules/namespace/NSManager'

const install = function(DC) {
  if (!DC || !DC.init) {
    throw new Error('Mapv: Missing DC Base')
  }

  add('Cesium', DC.Namespace.Cesium)

  try {
    DC.mixin(require('./src/components.js').default)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(window.DC)
}

export default {
  name: 'dc-s3m',
  version: __VERSION__,
  compile_time: __TIME__,
  install
}
