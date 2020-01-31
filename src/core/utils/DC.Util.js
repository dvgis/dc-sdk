/*
 * @Author: Caven
 * @Date: 2019-12-31 17:58:01
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-21 15:54:00
 */

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
/**
 *  工具类
 *  部分代码借鉴leaflet
 * https://github.com/Leaflet/Leaflet/tree/master/src/core
 */
DC.Util = class {
  /**
   *
   * @param {*} prefix
   * generate uuid
   */
  static uuid(prefix = 'D') {
    let uuid = []
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    let r
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = CHARS[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
    return prefix + '-' + uuid.join('')
  }

  /**
   *
   * @param {*} dest
   * @param {*} sources
   * Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter.
   */

  static merge(dest, ...sources) {
    let i, j, len, src
    for (j = 0, len = sources.length; j < len; j++) {
      src = sources[j]
      for (i in src) {
        dest[i] = src[i]
      }
    }
    return dest
  }

  /**
   *
   * @param {*} str
   * Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
   */
  static trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')
  }

  /**
   *
   * @param {*} str
   *  Trims and splits the string on whitespace and returns the array of parts.
   */
  static splitWords(str) {
    return this.trim(str).split(/\s+/)
  }
}
