/*
 * @Author: Caven
 * @Date: 2020-01-14 18:22:10
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-09 20:28:49
 */
;(function() {
  let initialized = false
  if (!DC) {
    console.error('DC.Plugins: Missing DC Sdk')
  }
  let namespace = DC.getNamespace()
  namespace['mapv'] = window.mapv || undefined
  delete window.mapv

  DC.init(() => {
    !initialized && require('./DC.Pulgins.Loader')
    initialized = true
  })
})()
