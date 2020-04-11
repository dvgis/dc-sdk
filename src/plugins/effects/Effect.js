/*
 * @Author: Caven
 * @Date: 2020-01-14 18:33:33
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-10 23:16:43
 */

import EffectEvent from '@/core/event/EffectEvent'

class Effect {
  constructor(id) {
    this._id = id || DC.Util.uuid()
    this._viewer = undefined
    this._delegate = undefined
    this._state = undefined
    this._effectEvent = new EffectEvent()
    this.type = undefined
    this.on(DC.EffectEventType.ADD, this._addHandler, this)
    this.on(DC.EffectEventType.REMOVE, this._removeHandler, this)
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
  _addHandler(viewer) {
    this._viewer = viewer
    this._prepareDelegate()
    if (this._delegate) {
      this._viewer.delegate.scene.postProcessStages.add(this._delegate)
    }
    this._state = DC.EffectState.ADDED
  }

  /**
   * 效果添加的回调函数
   */
  _removeHandler() {
    if ((this._viewer, this._delegate)) {
      this._viewer.delegate.scene.postProcessStages.remove(this._delegate)
      this._delegate = undefined
    }
    this._state = DC.EffectState.REMOVED
  }

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
