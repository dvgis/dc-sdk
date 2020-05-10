/*
 * @Author: Caven
 * @Date: 2020-01-14 18:22:10
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 10:54:57
 */

const install = function(DC) {
  if (!DC) {
    throw new Error('DC.Plugins: Missing DC Base SDK')
  }
  if (window.mapv) {
    DC.Namespace['mapv'] = window.mapv
    delete window.mapv
  }
  require('./Pulgins.Loader')
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(DC)
}

module.exports = {
  install
}
