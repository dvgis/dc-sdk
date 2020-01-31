/*
 * @Author: Caven
 * @Date: 2020-01-14 18:22:10
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-30 22:32:12
 */
;(function() {
  let initialized = false
  if (!DC) {
    throw new Error('missing dc sdk')
  }
  DC.init(() => {
    !initialized && require('./DC.Pulgins.Loader')
    initialized = true
  })
})()
