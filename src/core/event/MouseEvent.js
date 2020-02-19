/*
 * @Author: Caven
 * @Date: 2019-12-31 16:58:31
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-19 16:24:09
 */

import Cesium from '@/namespace'
import Event from './Event'

class MouseEvent extends Event {
  constructor(viewer) {
    super()
    this._viewer = viewer
    this._handler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas)
    this._registerEvent()
    this.on(Cesium.ScreenSpaceEventType.LEFT_CLICK, this._clickCallback, this)
    this.on(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
      this._dbclickCallback,
      this
    )
    this.on(
      Cesium.ScreenSpaceEventType.RIGHT_CLICK,
      this._rightClickCallback,
      this
    )
    this.on(
      Cesium.ScreenSpaceEventType.MOUSE_MOVE,
      this._mouseMoveCallback,
      this
    )
  }

  /**
   * Register Cesium mouse events
   */
  _registerEvent() {
    for (let key in Cesium.ScreenSpaceEventType) {
      let type = Cesium.ScreenSpaceEventType[key]
      this._eventCache[type] = new Cesium.Event()
      this._handler.setInputAction(movement => {
        this._eventCache[type].raiseEvent(movement)
      }, type)
    }
  }

  /**
   *
   * @param {*} target
   * gets the target information for the mouse event
   */
  _getTargetInfo(target) {
    let overlay = undefined
    let layer = undefined
    let feature = undefined
    if (target.id && target.id instanceof Cesium.Entity) {
      layer = target.id.layer
      if (layer && layer.getOverlay) {
        overlay = layer.getOverlay(target.id.overlayId)
      }
    } else if (target instanceof Cesium.Cesium3DTileFeature) {
      feature = target
      layer = target.tileset.layer
      if (layer && layer.getOverlay) {
        overlay = layer.getOverlay(target.tileset.overlayId)
        let propertyNames = feature.getPropertyNames()
        propertyNames.forEach(item => {
          overlay.attr[item] = feature.getProperty(item)
        })
      }
    }
    return { layer: layer, overlay: overlay, feature: feature }
  }

  /**
   * @param {*} type
   * @param {*} target
   */
  _raiseEvent(type, target, position = null) {
    let stopPropagation = false
    if (target) {
      let targetInfo = this._getTargetInfo(target)
      let overlay = targetInfo.overlay
      if (overlay && overlay.overlayEvent) {
        let event = overlay.overlayEvent.getEvent(type)
        if (event && event.numberOfListeners > 0) {
          event.raiseEvent({
            layer: targetInfo.layer,
            overlay: overlay,
            feature: targetInfo.feature,
            position: position
          })
          stopPropagation = true
        }
      }
    }
    if (!stopPropagation) {
      let event = this._viewer.viewerEvent.getEvent(type)
      if (event && event.numberOfListeners > 0) {
        event.raiseEvent({ position: position, overlay: undefined })
      }
    }
  }

  /**
   *
   * @param {*} movement
   * default click event callback
   */
  _clickCallback(movement) {
    if (!movement || !movement.position) {
      return
    }
    let target = this._viewer.scene.pick(movement.position)
    let cartesian = this._viewer.scene.pickPosition(movement.position)
    this._raiseEvent(Cesium.ScreenSpaceEventType.LEFT_CLICK, target, cartesian)
  }

  /**
   *
   * @param {*} movement
   * default dbclick event callback
   */
  _dbclickCallback(movement) {
    if (!movement || !movement.position) {
      return
    }
    let target = this._viewer.scene.pick(movement.position)
    let cartesian = this._viewer.scene.pickPosition(movement.position)
    this._raiseEvent(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
      target,
      cartesian
    )
  }

  /**
   * @param {*} movement
   * default rightclick event callback
   */
  _rightClickCallback(movement) {
    if (!movement || !movement.position) {
      return
    }
    let target = this._viewer.scene.pick(movement.position)
    let cartesian = this._viewer.scene.pickPosition(movement.position)
    this._raiseEvent(Cesium.ScreenSpaceEventType.RIGHT_CLICK, target, cartesian)
  }

  /**
   *
   * @param {*} movement
   * default mousemove event callback
   */
  _mouseMoveCallback(movement) {
    if (!movement || !movement.endPosition) {
      return
    }
    let target = this._viewer.scene.pick(movement.endPosition)
    this._viewer.canvas.style.cursor = target ? 'pointer' : 'default'
    let cartesian = this._viewer.scene.pickPosition(movement.endPosition)
    this._raiseEvent(Cesium.ScreenSpaceEventType.MOUSE_MOVE, target, cartesian)
  }
}

export default MouseEvent
