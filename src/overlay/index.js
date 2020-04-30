/*
 * @Author: Caven
 * @Date: 2020-04-09 20:02:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-30 12:09:26
 */

const install = function(DC) {
  if (!DC) {
    throw new Error('DC.Overlay: Missing DC Base SDK')
  }
  DC.init(() => {
    require('./DC.Overlay.Loader')
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(window.DC)
}

module.exports = {
  install
}
