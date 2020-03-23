/*
 * @Author: Caven
 * @Date: 2020-01-14 18:22:10
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-23 13:57:51
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
