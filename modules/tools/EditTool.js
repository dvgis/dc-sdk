/**
 * @Author: Caven
 * @Date: 2021-07-14 20:28:10
 */

import { Cesium } from '@dc-modules/namespace'
import { MouseEventType, PlotEventType, PlotEvent } from '@dc-modules/event'

const IMG_CIRCLE_RED = require('@dc-modules/images/circle_red.png')

const IMG_CIRCLE_BLUE = require('@dc-modules/images/circle_blue.png')

const IMG_CIRCLE_YELLOW = require('@dc-modules/images/circle_yellow.png')

const DEF_OPTS = {
  icon_center: IMG_CIRCLE_YELLOW,
  icon_anchor: IMG_CIRCLE_RED,
  icon_midAnchor: IMG_CIRCLE_BLUE,
  icon_size: [12, 12],
  clampToModel: true
}

class EditTool {
  constructor() {
    this._viewer = undefined
    this._anchorLayer = new Cesium.CustomDataSource('edit-anchor-layer')
    this._options = {}
    this._plotEvent = new PlotEvent()
    this._tooltipMess = undefined
    this._pickedAnchor = undefined
    this._isMoving = false
    this._anchors = []
  }

  set tooltipMess(tooltipMess) {
    this._tooltipMess = tooltipMess
    return this
  }

  /**
   *
   * @param e
   * @returns {boolean}
   * @private
   */
  _onClick(e) {
    if (this._isMoving) {
      let position =
        this._options.clampToModel && e.position
          ? e.position
          : e.surfacePosition
      if (!position) {
        return false
      }
      if (
        this._pickedAnchor &&
        this._pickedAnchor.position &&
        this._pickedAnchor.properties
      ) {
        let properties = this._pickedAnchor.properties.getValue(
          Cesium.JulianDate.now()
        )
        this._pickedAnchor.position.setValue(position)
        this._plotEvent.fire(PlotEventType.EDIT_ANCHOR_STOP, {
          index: properties.index,
          position: position
        })
      }
      this._isMoving = false
    } else {
      if (!e.target || !e.target.id) {
        return false
      }
      this._pickedAnchor = e.target.id
      this._isMoving = true
    }
  }

  /**
   *
   * @param e
   * @private
   */
  _onMouseMove(e) {
    this._viewer.tooltip.showAt(e.windowPosition, this._tooltipMess)
    if (!this._isMoving) {
      return false
    }
    let position =
      this._options.clampToModel && e.position ? e.position : e.surfacePosition
    if (!position) {
      return false
    }
    if (
      this._pickedAnchor &&
      this._pickedAnchor.position &&
      this._pickedAnchor.properties
    ) {
      let properties = this._pickedAnchor.properties.getValue(
        Cesium.JulianDate.now()
      )
      this._pickedAnchor.position.setValue(position)
      this._plotEvent.fire(PlotEventType.ANCHOR_MOVING, {
        index: properties.index,
        position: position
      })
    }
  }

  /**
   *
   * @param e
   * @private
   */
  _onRightClick(e) {
    this._plotEvent.fire(
      PlotEventType.DRAW_STOP,
      this._options.clampToModel && e.position ? e.position : e.surfacePosition
    )
  }

  /**
   *
   * @param position
   * @param index
   * @param isCenter
   * @param isMid
   * @private
   */
  _onAddAnchor({ position, index, isCenter = false, isMid = false }) {
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
          !this._options.clampToModel
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
   * @private
   */
  _onClearAnchor() {
    this._anchorLayer.entities.removeAll()
  }

  /**
   *
   * @private
   */
  _bindEvent() {
    this._viewer.on(MouseEventType.CLICK, this._onClick, this)
    this._viewer.on(MouseEventType.MOUSE_MOVE, this._onMouseMove, this)
    this._viewer.on(MouseEventType.RIGHT_CLICK, this._onRightClick, this)
    this.on(PlotEventType.ADD_ANCHOR, this._onAddAnchor, this)
    this.on(PlotEventType.CLEAR_ANCHOR, this._onClearAnchor, this)
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    this._viewer.off(MouseEventType.CLICK, this._onClick, this)
    this._viewer.off(MouseEventType.MOUSE_MOVE, this._onMouseMove, this)
    this._viewer.off(MouseEventType.RIGHT_CLICK, this._onRightClick, this)
    this.off(PlotEventType.ADD_ANCHOR, this._onAddAnchor, this)
    this.off(PlotEventType.CLEAR_ANCHOR, this._onClearAnchor, this)
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
   * @param type
   * @param callback
   * @param context
   * @returns {EditTool}
   */
  on(type, callback, context) {
    this._plotEvent.on(type, callback, context || this)
    this._plotEvent.on(type, callback, context || this)
    return this
  }

  /**
   *
   * @param type
   * @param callback
   * @param context
   * @returns {EditTool}
   */
  off(type, callback, context) {
    this._plotEvent.off(type, callback, context || this)
    this._plotEvent.off(type, callback, context || this)
    return this
  }

  /**
   *
   * @param type
   * @param parmas
   * @returns {EditTool}
   */
  fire(type, parmas) {
    this._plotEvent.fire(type, parmas)
    return this
  }

  /**
   *
   * @param options
   * @returns {EditTool}
   */
  activate(options = {}) {
    this._viewer.tooltip.enable = true
    this._options = { ...DEF_OPTS, ...options }
    this._unbindEvent()
    this._bindEvent()
    this.fire(PlotEventType.DRAW_START, this._options)
    return this
  }

  /**
   *
   * @returns {EditTool}
   */
  deactivate() {
    this._unbindEvent()
    this._viewer.tooltip.enable = false
    this._anchorLayer.entities.removeAll()
    return this
  }

  /**
   *
   * @param viewer
   */
  install(viewer) {
    this._viewer = viewer
    this._viewer.dataSources.add(this._anchorLayer)
    Object.defineProperty(this._viewer, 'editTool', {
      value: this,
      writable: false
    })
  }
}

export default EditTool
