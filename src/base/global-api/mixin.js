/**
 * @Author: Caven
 * @Date: 2020-05-09 23:00:54
 */

const ignores = [
  'version',
  'author',
  'home_page',
  'init',
  'ready',
  'use',
  'mixin',
  'Namespace',
  'Initialized'
]

/**
 * Mix other plug-in attributes to DC
 * @param DC
 * @returns this
 */
export function initMixin(DC) {
  DC.mixin = function(mixin) {
    for (let key in mixin) {
      ignores.indexOf(key) < 0 && (DC[key] = mixin[key])
    }
    return this
  }
}
