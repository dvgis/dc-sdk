/*
 * @Author: Caven
 * @Date: 2020-04-09 20:02:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-14 19:05:43
 */
;(function() {
  let initialized = false
  if (!DC) {
    console.error('DC.Overlay: Missing DC Sdk')
  }
  DC.init(() => {
    isCesiumLoaded && !initialized && require('./DC.Overlay.Loader')
    initialized = true
  })
})()
