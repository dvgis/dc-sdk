/**
 * @Author: Caven
 * @Date: 2020-02-02 15:55:53
 */

const install = function(DC, echarts) {
  echarts = echarts || global.echarts

  if (!echarts) {
    throw new Error('Chart: missing charts lib')
  }

  if (!DC || !DC.init) {
    throw new Error('Chart: Missing DC Base')
  }

  DC.init(() => {
    try {
      DC.mixin(require('./src/components.js').default)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC && window.echarts) {
  install(window.DC, window.echarts)
}

export default {
  name: 'dc-chart',
  version: __VERSION__,
  compile_time: __TIME__,
  install
}
