/**
 * @Author: Caven
 * @Date: 2021-03-12 16:45:45
 */

const install = function(DC) {
  if (!DC || !DC.init) {
    throw new Error('Mapv: Missing DC Base')
  }

  DC.init(() => {
    try {
      let mapv = require('mapv-lib')
      DC.Namespace['mapv'] = mapv
      const components = require('./src/components.js').default
      DC.mixin(components)
      DC.mixin({
        MapvDataSet: mapv?.DataSet
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(DC)
}

export default {
  version: __VERSION__,
  compile_time: __TIME__,
  install
}
