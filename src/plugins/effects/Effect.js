/*
 * @Author: Caven
 * @Date: 2020-01-14 18:33:33
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-20 14:20:41
 */

import EffectEvent from '@/core/event/EffectEvent'

class Effect {
  constructor(id) {
    this._id = id || DC.Util.uuid()
    this._viewer = undefined
    this._effectEvent = new EffectEvent()
    this._delegate = undefined
    this.type = undefined
    this.on(DC.EffectEventType.ADD, this._addCallback, this)
    this.on(DC.EffectEventType.REMOVE, this._removeCallback, this)
  }

  get id() {
    return this._id
  }

  get effectEvent() {
    return this._effectEvent
  }

  /**
   * 准备代理
   */
  _prepareDelegate() {}

  /**
   *
   * @param {*} viewer
   * 效果添加的回调函数,
   */
  _addCallback(viewer) {}

  /**
   * 效果添加的回调函数
   */
  _removeCallback() {}

  /**
   *
   * @param {*} viewer
   * 添加到Viewer
   */
  addToViewer(viewer) {
    viewer.addEffect(this)
    return this
  }

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   */
  on(type, callback, context) {
    this._effectEvent.on(type, callback, context || this)
    return this
  }

  /**
   *
   * @param {*} type
   * @param {*} callback
   * @param {*} context
   */
  off(type, callback, context) {
    this._effectEvent.off(type, callback, context || this)
    return this
  }

  /**
   *
   * @param {*} type
   * @param {*} param
   */
  fire(type, params) {
    this._effectEvent.fire(type, params)
    return this
  }
}

export default Effect
