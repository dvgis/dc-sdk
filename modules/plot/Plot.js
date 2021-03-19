/**
 * @Author: Caven
 * @Date: 2020-08-29 19:26:06
 */

import { Cesium } from '@dc-modules/namespace'
import { OverlayType } from '@dc-modules/overlay'

import DrawPoint from './draw/DrawPoint'
import DrawPolyline from './draw/DrawPolyline'
import DrawPolygon from './draw/DrawPolygon'
import DrawCircle from './draw/DrawCircle'
import DrawRectangle from './draw/DrawRectangle'
import DrawBillboard from './draw/DrawBillboard'
import DrawAttackArrow from './draw/DrawAttackArrow'
import DrawDoubleArrow from './draw/DrawDoubleArrow'
import DrawFineArrow from './draw/DrawFineArrow'
import DrawGatheringPlace from './draw/DrawGatheringPlace'
import DrawTailedAttackArrow from './draw/DrawTailedAttackArrow'

import EditPoint from './edit/EditPoint'
import EditPolyline from './edit/EditPolyline'
import EditPolygon from './edit/EditPolygon'
import EditCircle from './edit/EditCircle'
import EditRectangle from './edit/EditRectangle'
import EditBillboard from './edit/EditBillboard'
import EditAttackArrow from './edit/EditAttackArrow'
import EditDoubleArrow from './edit/EditDoubleArrow'
import EditFineArrow from './edit/EditFineArrow'
import EditGatheringPlace from './edit/EditGatheringPlace'
import EditTailedAttackArrow from './edit/EditTailedAttackArrow'

const IMG_CIRCLE_RED = require('@dc-modules/images/circle_red.png')

const IMG_CIRCLE_BLUE = require('@dc-modules/images/circle_blue.png')

const IMG_CIRCLE_YELLOW = require('@dc-modules/images/circle_yellow.png')

const DEF_OPTS = {
  icon_center: IMG_CIRCLE_YELLOW,
  icon_anchor: IMG_CIRCLE_RED,
  icon_midAnchor: IMG_CIRCLE_BLUE,
  icon_size: [12, 12],
  clampToGround: true
}

class Plot {
  constructor(viewer, options = {}) {
    this._viewer = viewer
    this._options = {
      ...DEF_OPTS,
      ...options
    }
    this._plotEvent = new Cesium.Event()
    this._callback = undefined
    this._drawWorker = undefined
    this._editWorker = undefined
    this._overlayLayer = new Cesium.CustomDataSource('plot-overlay-layer')
    this._viewer.dataSources.add(this._overlayLayer)
    this._anchorLayer = new Cesium.CustomDataSource('plot-overlay-layer')
    this._viewer.dataSources.add(this._anchorLayer)
    this._state = undefined
  }

  get viewer() {
    return this._viewer
  }

  get options() {
    return this._options
  }

  get plotEvent() {
    return this._plotEvent
  }

  get overlayLayer() {
    return this._overlayLayer.entities
  }

  get anchorLayer() {
    return this._anchorLayer.entities
  }

  get state() {
    return this._state
  }

  _completeCallback(overlay) {
    this._drawWorker = undefined
    this._editWorker = undefined
    this._viewer.tooltip.enable = false
    this._overlayLayer.entities.removeAll()
    this._anchorLayer.entities.removeAll()
    this._callback && this._callback.call(this, overlay)
  }

  _bindEvent(callback) {
    this._plotEvent.removeEventListener(this._completeCallback, this)
    this._callback = callback
    this._plotEvent.addEventListener(this._completeCallback, this)
  }

  _createDrawWorker(type, style) {
    switch (type) {
      case OverlayType.POINT:
        this._drawWorker = new DrawPoint(style)
        break
      case OverlayType.POLYLINE:
        this._drawWorker = new DrawPolyline(style)
        break
      case OverlayType.POLYGON:
        this._drawWorker = new DrawPolygon(style)
        break
      case OverlayType.CIRCLE:
        this._drawWorker = new DrawCircle(style)
        break
      case OverlayType.RECTANGLE:
        this._drawWorker = new DrawRectangle(style)
        break
      case OverlayType.BILLBOARD:
        this._drawWorker = new DrawBillboard(style)
        break
      case OverlayType.ATTACK_ARROW:
        this._drawWorker = new DrawAttackArrow(style)
        break
      case OverlayType.DOUBLE_ARROW:
        this._drawWorker = new DrawDoubleArrow(style)
        break
      case OverlayType.FINE_ARROW:
        this._drawWorker = new DrawFineArrow(style)
        break
      case OverlayType.TAILED_ATTACK_ARROW:
        this._drawWorker = new DrawTailedAttackArrow(style)
        break
      case OverlayType.GATHERING_PLACE:
        this._drawWorker = new DrawGatheringPlace(style)
        break
      default:
        break
    }
  }

  _createEditWorker(overlay) {
    switch (overlay.type) {
      case OverlayType.POINT:
        this._editWorker = new EditPoint(overlay)
        break
      case OverlayType.POLYLINE:
        this._editWorker = new EditPolyline(overlay)
        break
      case OverlayType.POLYGON:
        this._editWorker = new EditPolygon(overlay)
        break
      case OverlayType.CIRCLE:
        this._editWorker = new EditCircle(overlay)
        break
      case OverlayType.RECTANGLE:
        this._editWorker = new EditRectangle(overlay)
        break
      case OverlayType.BILLBOARD:
        this._editWorker = new EditBillboard(overlay)
        break
      case OverlayType.ATTACK_ARROW:
        this._editWorker = new EditAttackArrow(overlay)
        break
      case OverlayType.DOUBLE_ARROW:
        this._editWorker = new EditDoubleArrow(overlay)
        break
      case OverlayType.FINE_ARROW:
        this._editWorker = new EditFineArrow(overlay)
        break
      case OverlayType.TAILED_ATTACK_ARROW:
        this._editWorker = new EditTailedAttackArrow(overlay)
        break
      case OverlayType.GATHERING_PLACE:
        this._editWorker = new EditGatheringPlace(overlay)
        break
      default:
        break
    }
  }

  draw(type, callback, style) {
    this._state = 'draw'
    if (this._drawWorker) {
      this._drawWorker.unbindEvent()
      this._drawWorker = undefined
    }
    this._viewer.tooltip.enable = true
    this._bindEvent(callback)
    this._createDrawWorker(type, style)
    this._drawWorker && this._drawWorker.start(this)
  }

  edit(overlay, callback) {
    this._state = 'edit'
    if (this._editWorker) {
      this._editWorker.unbindEvent()
      this._editWorker = undefined
    }
    this._viewer.tooltip.enable = true
    this._bindEvent(callback)
    this._createEditWorker(overlay)
    this._editWorker && this._editWorker.start(this)
  }

  destroy() {
    this._plotEvent.removeEventListener(this._completeCallback, this)
    this._viewer.dataSources.remove(this._overlayLayer)
    this._viewer.dataSources.remove(this._anchorLayer)
    this._viewer = undefined
    this._plotEvent = undefined
  }
}

export default Plot
