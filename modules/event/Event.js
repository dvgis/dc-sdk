/**
 * @Author: Caven
 * @Date: 2020-01-02 15:24:38
 */

class Event {
  constructor() {
    this._cache = {}
    this._registerEvent()
  }

  /**
   * Event registration
   * Subclasses need to override
   * @private
   */
  _registerEvent() {}

  /**
   * @param type
   * @param callback
   * @param context
   * @returns {any}
   * @private
   */
  _on(type, callback, context) {
    let event = this.getEvent(type)
    let removeCallback = undefined
    if (event && callback) {
      removeCallback = event.addEventListener(callback, context || this)
    }
    return removeCallback
  }

  /**
   * @param type
   * @param callback
   * @param context
   * @returns {boolean}
   * @private
   */
  _off(type, callback, context) {
    let event = this.getEvent(type)
    let removed = false
    if (event && callback) {
      removed = event.removeEventListener(callback, context || this)
    }
    return removed
  }

  /**
   * @param type
   * @param params
   * @private
   */
  _fire(type, params) {
    let event = this.getEvent(type)
    if (event) {
      event.raiseEvent(params)
    }
  }

  /**
   * Subscribe event
   * @param type
   * @param callback
   * @param context
   * @returns remove callback function
   */
  on(type, callback, context) {
    return this._on(type, callback, context)
  }

  /**
   * Subscribe once event
   * @param type
   * @param callback
   * @param context
   */
  once(type, callback, context) {
    let removeCallback = this._on(type, callback, context)
    removeCallback && removeCallback()
  }

  /**
   * Unsubscribe event
   * @param type
   * @param callback
   * @param context
   * @returns Boolean
   */
  off(type, callback, context) {
    return this._off(type, callback, context)
  }

  /**
   * Trigger subscription event
   * @param type
   * @param params
   */
  fire(type, params) {
    this._fire(type, params)
  }

  /**
   * Returns events by type
   * @param type
   * @returns Event
   */
  getEvent(type) {
    return this._cache[type] || undefined
  }
}

export default Event
