/*
 * @Author: Caven
 * @Date: 2020-01-02 15:24:38
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-03 13:28:43
 */
class Event {
  constructor() {
    this._eventCache = {}
  }

  /**
   *
   */
  _registerEvent() {}

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   */
  _on(type, callback, context) {
    let event = this.getEvent(type)
    if (callback && event) {
      event.addEventListener(callback, context || this)
    }
  }

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   */
  _off(type, callback, context) {
    let event = this.getEvent(type)
    if (event && callback) {
      event.removeEventListener(callback, context || this)
    }
  }

  /**
   *
   * @param {*} type
   * @param {*} params
   */
  _fire(type, params) {
    let event = this.getEvent(type)
    if (event) {
      event.raiseEvent(params)
    }
  }

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   */
  on(type, callback, context) {
    this._on(type, callback, context)
    return this
  }

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   */
  off(type, callback, context) {
    this._off(type, callback, context)
    return this
  }

  /**
   *
   * @param {*} type
   * @param {*} params
   */
  fire(type, params) {
    this._fire(type, params)
    return this
  }

  /**
   * Gets events by type
   * @param {*} type
   */
  getEvent(type) {
    return this._eventCache[type] || undefined
  }
}

export default Event
