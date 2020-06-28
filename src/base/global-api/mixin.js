/*
 * @Author: Caven
 * @Date: 2020-05-09 23:00:54
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-28 10:11:34
 */

const ignores = ['init', 'ready', 'use', 'mixin', 'Namespace', 'Initialized']

export function initMixin(DC) {
  DC.mixin = function(mixin) {
    for (let key in mixin) {
      !ignores.includes(key) && (DC[key] = mixin[key])
    }
    return this
  }
}
