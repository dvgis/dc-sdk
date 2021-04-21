/**
 * @Author: Caven
 * @Date: 2020-01-31 19:45:32
 */

import { Cesium } from '@dc-modules/namespace'
import { MouseEventType } from '@dc-modules/event'

class Draw {
  constructor() {
    this._viewer = undefined
    this._delegate = undefined
    this._floatingAnchor = undefined
    this._clampToGround = true
    this._tooltip = undefined
    this._tooltipMess = '单击选择点位'
    this._layer = undefined
    this._plotEvent = undefined
    this._options = {}
    this._positions = []
  }

  _mountEntity() {}

  _onClick(e) {}

  _onMouseMove(e) {
    this._tooltip.showAt(e.windowPosition, this._tooltipMess)
    if (this._floatingAnchor) {
      let position = this._clampToGround ? e.surfacePosition : e.position
      if (!position) {
        return false
      }
      this._floatingAnchor.position.setValue(position)
      this._positions.pop()
      this._positions.push(position)
    }
  }

  _onRightClick(e) {}

  bindEvent() {
    this._viewer.on(MouseEventType.CLICK, this._onClick, this)
    this._viewer.on(MouseEventType.MOUSE_MOVE, this._onMouseMove, this)
    this._viewer.on(MouseEventType.RIGHT_CLICK, this._onRightClick, this)
  }

  unbindEvent() {
    this._viewer.off(MouseEventType.CLICK, this._onClick, this)
    this._viewer.off(MouseEventType.MOUSE_MOVE, this._onMouseMove, this)
    this._viewer.off(MouseEventType.RIGHT_CLICK, this._onRightClick, this)
  }

  createAnchor(position, isCenter = false) {
    return this._layer.add({
      position: position,
      billboard: {
        image: isCenter ? this._options.icon_center : this._options.icon_anchor,
        width: this._options.icon_size[0],
        height: this._options.icon_size[1],
        eyeOffset: new Cesium.Cartesian3(0, 0, -500),
        heightReference:
          this._viewer.scene.mode === Cesium.SceneMode.SCENE3D &&
          this._clampToGround
            ? Cesium.HeightReference.CLAMP_TO_GROUND
            : Cesium.HeightReference.NONE
      }
    })
  }

  start(plot) {
    this._viewer = plot.viewer
    this._tooltip = plot.viewer.tooltip
    this._layer = plot.overlayLayer
    this._plotEvent = plot.plotEvent
    this._options = plot.options
    this._clampToGround = plot.options.clampToGround ?? true
    this._mountEntity()
    this.bindEvent()
  }
}

export default Draw
