/**
 * @Author: Caven
 * @Date: 2020-12-20 16:32:22
 */

class Animation {
  constructor(viewer) {
    this._viewer = viewer
    this._options = {}
  }

  _bindEvent() {}

  _unbindEvent() {}

  /**
   * Start globe rotate
   * @returns {Animation}
   */
  start() {
    if (this._options.duration) {
      let timer = setTimeout(() => {
        this._unbindEvent()
        this._options.callback &&
          this._options.callback.call(this._options.context || this)
        clearTimeout(timer)
      }, Number(this._options.duration) * 1e3)
    }
    this._bindEvent()
    return this
  }

  /**
   * Stop globe rotate
   * @returns {Animation}
   */
  stop() {
    this._unbindEvent()
    return this
  }
}

export default Animation
