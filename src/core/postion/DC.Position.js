/*
 * @Author: Caven
 * @Date: 2019-12-27 14:35:02
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-15 13:02:26
 */

DC.Position = class {
  constructor(lng, lat, alt = 0, heading = 0, pitch = 0, roll = 0) {
    this._lng = lng
    this._lat = lat
    this._alt = alt
    this._heading = heading
    this._pitch = pitch
    this._roll = roll
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

  static fromCoordString(str) {
    let position = new DC.Position()
    if (str && typeof str === 'string') {
      let temp = str.split(',')
      if (temp && temp.length) {
        position.lng = temp[0] || 0
        position.lat = temp[1] || 0
        position.alt = temp[2] || 0
      }
    }
    return position
  }

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
