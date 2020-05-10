/*
 * @Author: Caven
 * @Date: 2020-04-03 10:13:42
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 10:56:45
 */

const install = function(DC) {
  if (!DC) {
    throw new Error('DC.Plot: Missing DC Base SDK')
  }
  require('./Plot')
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DC) {
  install(window.DC)
}

module.exports = {
  install
}
