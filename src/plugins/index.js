/*
 * @Author: Caven
 * @Date: 2020-01-14 18:22:10
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 00:00:16
 */

const install = function(DC) {
  if (!DC || !DC.init) {
    throw new Error('Plot: Missing DC Base')
  }

  if (!DC.ready) {
    throw new Error('Plot: Missing DC Core')
  }

  if (window.mapv) {
    DC.Namespace['mapv'] = window.mapv
    delete window.mapv
  }

  DC.init(() => {
    require('./Pulgins.Loader')
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(DC)
}

module.exports = {
  install
}
