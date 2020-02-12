/*
 * @Author: Caven
 * @Date: 2020-01-14 18:22:10
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-13 00:50:28
 */
;(function() {
  let initialized = false
  if (!DC) {
    console.error('missing dc sdk')
  }
  DC.init(() => {
    !initialized && require('./DC.Pulgins.Loader')
    initialized = true
  })
})()
