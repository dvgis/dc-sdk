/**
 * @Author: Caven
 * @Date: 2021-03-12 16:45:45
 */

import { registerLib } from '@dc-modules/global-api'

const install = function(DC) {
  if (!DC) {
    throw new Error('Mapv: Missing DC Base')
  }

  registerLib('Cesium', DC.Namespace.Cesium)

  try {
    require('mapv-lib/mapv.min.js')
    DC.Namespace['mapv'] = window.mapv
    registerLib('mapv', DC.Namespace['mapv'])
    DC.mixin(require('./src/components.js').default)
    DC.mixin({
      MapvDataSet: window.mapv?.DataSet
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  } finally {
    delete window['mapv']
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(window.DC)
}

export default {
  name: 'dc-mapv',
  version: __VERSION__,
  compile_time: __TIME__,
  install
}
