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
    this._layer = undefined
    this._anchorLayer = undefined
    this._layer = undefined
    this._plotEvent = undefined
    this._options = {}
  }

  _mountEntity() {}

  _mountAnchor() {}

  _onClick(e) {}

  _onMouseMove(e) {}

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

  computeMidPosition(p1, p2) {
    let c1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(p1)
    let c2 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(p2)
    let cm = new Cesium.EllipsoidGeodesic(c1, c2).interpolateUsingFraction(0.5)
    return Cesium.Ellipsoid.WGS84.cartographicToCartesian(cm)
  }

  start(plot) {
    this._viewer = plot.viewer
    this._tooltip = plot.viewer.tooltip
    this._layer = plot.overlayLayer
    this._anchorLayer = plot.anchorLayer
    this._plotEvent = plot.plotEvent
    this._options = plot.options
    this._clampToGround = plot.options.clampToGround ?? true
    this._mountEntity()
    this._mountAnchor()
    this.bindEvent()
  }
}

export default Edit
