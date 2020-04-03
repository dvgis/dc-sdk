/*
 * @Author: Caven
 * @Date: 2020-04-03 10:13:42
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-03 10:14:28
 */
;(function() {
  let initialized = false
  if (!DC) {
    console.error('missing dc sdk')
  }

  DC.init(() => {
    !initialized && require('./DC.Plot')
    initialized = true
  })
})()
