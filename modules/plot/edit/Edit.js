/**
 * @Author: Caven
 * @Date: 2020-08-30 23:50:53
 */

import { Cesium } from '@dc-modules/namespace'
import { MouseEventType } from '@dc-modules/event'

class Edit {
  constructor() {
    this._viewer = undefined
    this._overlay = undefined
    this._anchors = []
    this._delegate = undefined
    this._pickedAnchor = undefined
    this._isMoving = false
    this._clampToGround = true
    this._tooltip = undefined
    this._tooltipMess = '点击锚点移动,右击结束编辑'
    this._layer = undefined
    this._anchorLayer = undefined
    this._layer = undefined
    this._plotEvent = undefined
    this._options = {}
    this._positions = []
  }

  _mountEntity() {}

  _mountAnchor() {}

  _onClick(e) {}

  _onMouseMove(e) {
    this._tooltip.showAt(e.windowPosition, this._tooltipMess)
    if (!this._isMoving) {
      return false
    }
    if (this._pickedAnchor && this._pickedAnchor.position) {
      let properties = this._pickedAnchor.properties.getValue(
        Cesium.JulianDate.now()
      )
      let position = this._clampToGround ? e.surfacePosition : e.position
      if (!position) {
        return false
      }
      this._pickedAnchor.position.setValue(position)
      this._positions[properties.index] = position
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

  /**
   *
   * @param position
   * @param index
   * @param isMid
   * @param isCenter
   */
  createAnchor(position, index, isMid = false, isCenter = false) {
    let image = isMid
      ? this._options.icon_midAnchor
      : isCenter
      ? this._options.icon_center
      : this._options.icon_anchor
    let anchor = this._anchorLayer.add({
      position: position,
      billboard: {
        image: image,
        width: 12,
        height: 12,
        eyeOffset: new Cesium.ConstantProperty(
          new Cesium.Cartesian3(0, 0, -500)
        ),
        heightReference:
          this._viewer.scene.mode === Cesium.SceneMode.SCENE3D &&
          this._clampToGround
            ? Cesium.HeightReference.CLAMP_TO_GROUND
            : Cesium.HeightReference.NONE
      },
      properties: {
        isMid: isMid,
        index: index
      }
    })
    this._anchors.push(anchor)
  }

  /**
   *
   * @param p1
   * @param p2
   * @returns {Cartesian3}
   */
  computeMidPosition(p1, p2) {
    let c1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(p1)
    let c2 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(p2)
    let cm = new Cesium.EllipsoidGeodesic(c1, c2).interpolateUsingFraction(0.5)
    return Cesium.Ellipsoid.WGS84.cartographicToCartesian(cm)
  }

  /**
   *
   * @param plot
   * @param clampToGround
   */
  start(plot, clampToGround) {
    this._viewer = plot.viewer
    this._tooltip = plot.viewer.tooltip
    this._layer = plot.overlayLayer
    this._anchorLayer = plot.anchorLayer
    this._plotEvent = plot.plotEvent
    this._options = plot.options
    this._clampToGround = clampToGround
    this._mountEntity()
    this._mountAnchor()
    this.bindEvent()
  }
}

export default Edit
