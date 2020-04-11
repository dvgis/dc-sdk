/*
 * @Author: Caven
 * @Date: 2019-12-31 16:58:31
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-11 19:42:29
 */

import Cesium from '@/namespace'
import Event from './Event'

/**
 * Mouse events in 3D scene, optimized Cesium event model
 */
class MouseEvent extends Event {
  constructor(viewer) {
    super()
    this._viewer = viewer
    this._handler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas)
    this._registerEvent()
    this.on(Cesium.ScreenSpaceEventType.LEFT_CLICK, this._clickHandler, this)
    this.on(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
      this._dbClickHandler,
      this
    )
    this.on(
      Cesium.ScreenSpaceEventType.RIGHT_CLICK,
      this._rightClickHandler,
      this
    )
    this.on(
      Cesium.ScreenSpaceEventType.MOUSE_MOVE,
      this._mouseMoveHandler,
      this
    )
  }

  /**
   *
   * Register Cesium mouse events
   *
   */
  _registerEvent() {
    Object.keys(Cesium.ScreenSpaceEventType).forEach(key => {
      let type = Cesium.ScreenSpaceEventType[key]
      this._cache[type] = new Cesium.Event()
      this._handler.setInputAction(movement => {
        this._cache[type].raiseEvent(movement)
      }, type)
    })
  }

  /**
   *
   * Gets the mouse information for the mouse event
   * @param {*} position
   *
   */
  _getMouseInfo(position) {
    let scene = this._viewer.scene
    let target = scene.pick(position)
    let cartesian = undefined
    if (scene.pickPositionSupported) {
      cartesian = scene.pickPosition(position)
    }
    let surfaceCartesian = undefined
    if (scene.mode === DC.SceneMode.SCENE3D) {
      let ray = scene.camera.getPickRay(position)
      surfaceCartesian = scene.globe.pick(ray, scene)
    } else {
      surfaceCartesian = scene.camera.pickEllipsoid(
        position,
        Cesium.Ellipsoid.WGS84
      )
    }
    return {
      target: target,
      cartesian: cartesian,
      windowCartesian: position,
      surfaceCartesian: surfaceCartesian
    }
  }

  /**
   *
   * Gets the target information for the mouse event
   * @param {*} target
   *
   */
  _getTargetInfo(target) {
    let overlay = undefined
    let layer = undefined
    let feature = undefined
    if (target && target.id && target.id instanceof Cesium.Entity) {
      layer = target.id.layer
      if (layer && layer.getOverlay) {
        overlay = layer.getOverlay(target.id.overlayId)
      }
    } else if (target && target instanceof Cesium.Cesium3DTileFeature) {
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
   *
   * @param {*} type
   * @param {*} target
   *
   */
  _raiseEvent(type, target, position, windowPosition, surfacePosition) {
    let stopPropagation = false
    let targetInfo = this._getTargetInfo(target)
    let overlay = targetInfo.overlay
    if (overlay && overlay.overlayEvent) {
      let event = overlay.overlayEvent.getEvent(type)
      if (event && event.numberOfListeners > 0) {
        event.raiseEvent({
          layer: targetInfo.layer,
          overlay: overlay,
          feature: targetInfo.feature,
          target: target,
          position: position,
          windowPosition: windowPosition,
          surfacePosition: surfacePosition
        })
        stopPropagation = true
      }
    }
    if (!stopPropagation) {
      let event = this._viewer.viewerEvent.getEvent(type)
      if (event && event.numberOfListeners > 0) {
        event.raiseEvent({
          layer: undefined,
          overlay: undefined,
          feature: undefined,
          target: target,
          position: position,
          windowPosition: windowPosition,
          surfacePosition: surfacePosition
        })
      }
    }
  }

  /**
   *
   * Default click event handler
   * @param {*} movement
   *
   */
  _clickHandler(movement) {
    if (!movement || !movement.position) {
      return
    }
    let result = this._getMouseInfo(movement.position)
    this._raiseEvent(
      Cesium.ScreenSpaceEventType.LEFT_CLICK,
      result.target,
      result.cartesian,
      result.windowCartesian,
      result.surfaceCartesian
    )
  }

  /**
   *
   * Default dbClick event handler
   * @param {*} movement
   *
   */
  _dbClickHandler(movement) {
    if (!movement || !movement.position) {
      return
    }
    let result = this._getMouseInfo(movement.position)
    this._raiseEvent(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
      result.target,
      result.cartesian,
      result.windowCartesian,
      result.surfaceCartesian
    )
  }

  /**
   *
   * Default rightclick event handler
   * @param {*} movement
   *
   */
  _rightClickHandler(movement) {
    if (!movement || !movement.position) {
      return
    }
    let result = this._getMouseInfo(movement.position)
    this._raiseEvent(
      Cesium.ScreenSpaceEventType.RIGHT_CLICK,
      result.target,
      result.cartesian,
      result.windowCartesian,
      result.surfaceCartesian
    )
  }

  /**
   *
   * Default mousemove event handler
   * @param {*} movement
   *
   */
  _mouseMoveHandler(movement) {
    if (!movement || !movement.endPosition) {
      return
    }
    let result = this._getMouseInfo(movement.endPosition)
    this._viewer.canvas.style.cursor = result.target ? 'pointer' : 'default'
    this._raiseEvent(
      Cesium.ScreenSpaceEventType.MOUSE_MOVE,
      result.target,
      result.cartesian,
      result.windowCartesian,
      result.surfaceCartesian
    )
  }
}

export default MouseEvent
