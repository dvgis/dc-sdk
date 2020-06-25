/*
 * @Author: Caven
 * @Date: 2020-05-09 23:00:54
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-24 16:45:46
 */
export function initMixin(DC) {
  DC.mixin = function(mixin) {
    for (let key in mixin) {
      if (key === 'ready' || key === 'use' || key === 'mixin') {
        continue
      }
      DC[key] = mixin[key]
    }
    return this
  }
}
