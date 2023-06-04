/**
 * @Author : Caven Chen
 */

import { PlotEventType } from '../../event'

class Draw {
  constructor(style) {
    this._style = style
    this._viewer = undefined
    this._layer = undefined
    this._delegate = undefined
    this._options = {}
    this._positions = []
  }

  get drawTool() {
    return this._viewer.drawTool
  }

  /**
   * The hook for mount layer
   * Subclasses need to be overridden
   * @private
   */
  _mountedHook() {}

  /**
   *
   * @param position
   * @private
   */
  _onDrawAnchor(position) {}

  /**
   *
   * @param position
   * @private
   */
  _onAnchorMoving(position) {
    this._positions.pop()
    this._positions.push(position)
    this._options.onCalc && this._options.onCalc(this._positions)
  }

  /**
   *
   * @private
   */
  _onDrawStop() {
    this._unbindEvent()
    this._viewer.drawTool.deactivate()
    this._options.onDrawStop && this._options.onDrawStop(this._delegate)
  }

  /**
   *
   * @private
   */
  _bindEvent() {
    this.drawTool.on(PlotEventType.DRAW_ANCHOR, this._onDrawAnchor, this)
    this.drawTool.on(PlotEventType.ANCHOR_MOVING, this._onAnchorMoving, this)
    this.drawTool.on(PlotEventType.DRAW_STOP, this._onDrawStop, this)
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    this.drawTool.off(PlotEventType.DRAW_ANCHOR, this._onDrawAnchor, this)
    this.drawTool.off(PlotEventType.ANCHOR_MOVING, this._onAnchorMoving, this)
    this.drawTool.off(PlotEventType.DRAW_STOP, this._onDrawStop, this)
  }

  /**
   *
   * @param measure
   * @param options
   * @returns {Draw}
   */
  start(measure, options) {
    this._viewer = measure.viewer
    this._layer = measure.layer
    this._options = options
    this._viewer.editTool.deactivate()
    this._viewer.drawTool.activate(options)
    this._mountedHook()
    this._unbindEvent()
    this._bindEvent()
    return this
  }
}

export default Draw
