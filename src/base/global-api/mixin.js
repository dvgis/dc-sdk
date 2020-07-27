/*
 * @Author: Caven
 * @Date: 2020-05-09 23:00:54
 * @Last Modified by: Caven
 * @Last Modified time: 2020-07-27 16:31:22
 */

const ignores = [
  'init',
  'ready',
  'use',
  'mixin',
  'Namespace',
  'Initialized',
  'Version',
  'Author',
  'GitHub',
  'Home'
]

export function initMixin(DC) {
  DC.mixin = function(mixin) {
    for (let key in mixin) {
      !ignores.includes(key) && (DC[key] = mixin[key])
    }
    return this
  }
}
