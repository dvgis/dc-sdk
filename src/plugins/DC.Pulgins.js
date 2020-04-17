/*
 * @Author: Caven
 * @Date: 2020-01-14 18:22:10
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-17 16:47:34
 */
;(function() {
  let initialized = false
  if (!DC) {
    console.error('DC.Plugins: Missing DC Sdk')
  }
  DC.Namespace['mapv'] = window.mapv || undefined
  delete window.mapv

  DC.init(() => {
    !initialized && require('./DC.Pulgins.Loader')
    initialized = true
  })
})()
