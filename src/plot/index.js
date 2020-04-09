/*
 * @Author: Caven
 * @Date: 2020-04-03 10:13:42
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-09 20:29:17
 */
;(function() {
  let initialized = false

  if (!DC) {
    console.error('DC.Plot: Missing DC Sdk')
  }

  DC.init(() => {
    !initialized && require('./DC.Plot')
    initialized = true
  })
})()
