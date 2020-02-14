/*
 * @Author: Caven
 * @Date: 2020-01-14 18:22:10
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-14 00:52:40
 */
;(function() {
  let initialized = false
  if (!DC) {
    console.error('missing dc sdk')
  }
  let namespace = DC.getNamespace()
  namespace['mapv'] = window.mapv || undefined
  delete window.mapv
  DC.init(() => {
    !initialized && require('./DC.Pulgins.Loader')
    initialized = true
  })
})()
