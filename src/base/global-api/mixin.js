/*
 * @Author: Caven
 * @Date: 2020-05-09 23:00:54
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-09 23:20:56
 */
export function initMixin(DC) {
  DC.mixin = function(mixin) {
    for (let i in mixin) {
      DC[i] = mixin[i]
    }
    return this
  }
}
