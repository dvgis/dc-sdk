/*
 * @Author: Caven
 * @Date: 2020-04-03 10:13:42
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-22 13:18:04
 */

const install = function(DC) {
  if (!DC) {
    throw new Error('DC.Plot: Missing DC Base SDK')
  }
  DC.init(() => {
    require('./DC.Plot')
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(window.DC)
}

export default {
  install
}
