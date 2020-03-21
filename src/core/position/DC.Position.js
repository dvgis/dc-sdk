/*
 * @Author: Caven
 * @Date: 2019-12-27 14:35:02
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-22 00:15:31
 */

import Cesium from '@/namespace'

DC.Position = class {
  constructor(lng, lat, alt, heading, pitch, roll) {
    this._lng = lng || 0
    this._lat = lat || 0
    this._alt = alt || 0
    this._heading = heading || 0
    this._pitch = pitch || 0
    this._roll = roll || 0
  }

  set lng(lng) {
    this._lng = lng
  }

  get lng() {
    return this._lng
  }

  set lat(lat) {
    this._lat = lat
  }

  get lat() {
    return this._lat
  }

  set alt(alt) {
    this._alt = alt
  }

  get alt() {
    return this._alt
  }

  set heading(heading) {
    this._heading = heading
  }

  get heading() {
    return this._heading
  }

  set pitch(pitch) {
    this._pitch = pitch
  }

  get pitch() {
    return this._pitch
  }

  set roll(roll) {
    this._roll = roll
  }

  get roll() {
    return this._roll
  }

  serialize() {
    let position = new DC.Position(
      this._lng,
      this._lat,
      this._alt,
      this._heading,
      this._pitch,
      this._roll
    )
    return JSON.stringify(position)
  }

  /**
   *
   * @param {*} target
   */
  distance(target) {
    if (!target || !(target instanceof DC.Position)) {
      return 0
    }
    return Cesium.Cartesian3.distance(
      DC.T.transformWSG84ToCartesian(this),
      DC.T.transformWSG84ToCartesian(target)
    )
  }

  /**
   *
   * @param {*} src
   */
  static copy(src) {
    let position = new DC.Position()
    if (src) {
      position.lng = src.lng || 0
      position.lat = src.lat || 0
      position.alt = src.alt || 0
      position.heading = src.heading || 0
      position.pitch = src.pitch || 0
      position.roll = src.roll || 0
    }
    return position
  }

  /**
   *
   * @param {*} valStr
   * 反序列化
   */
  static deserialize(valStr) {
    let position = new DC.Position()
    let obj = JSON.parse(valStr)
    if (obj) {
      position.lng = obj.lng || 0
      position.lat = obj.lat || 0
      position.alt = obj.alt || 0
      position.heading = obj.heading || 0
      position.pitch = obj.pitch || 0
      position.roll = obj.roll || 0
    }
    return position
  }

  /**
   *
   * @param {*} str
   */
  static fromCoordString(str) {
    let position = new DC.Position()
    if (str && typeof str === 'string') {
      position = this.fromCoordArray(str.split(','))
    }
    return position
  }

  /**
   *
   * @param {*} arr
   */
  static fromCoordArray(arr) {
    let position = new DC.Position()
    if (Array.isArray(arr)) {
      position.lng = arr[0] || 0
      position.lat = arr[1] || 0
      position.alt = arr[2] || 0
    }
    return position
  }
}
