/*
 * @Author: Caven
 * @Date: 2020-01-14 18:33:33
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-19 11:11:08
 */

import EffectEvent from '../../core/event/EffectEvent'

class Effect {
  constructor() {
    this._viewer = undefined
    this._effectEvent = new EffectEvent()
    this._delegate = undefined
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
  addToViewer(viewer) {}
}
