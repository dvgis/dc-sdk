/*
 * @Author: Caven
 * @Date: 2019-12-31 16:58:31
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-15 14:16:56
 */

import { MouseEventType } from './EventType'
import Event from './Event'

const { Cesium } = DC.Namespace

/**
 * Mouse events in 3D scene, optimized Cesium event model
 */
class MouseEvent extends Event {
  constructor(viewer) {
    super()
    this._viewer = viewer
    this._selected = undefined
    this._setInputAction()
    this.on(MouseEventType.CLICK, this._clickHandler, this)
    this.on(MouseEventType.DB_CLICK, this._dbClickHandler, this)
    this.on(MouseEventType.RIGHT_CLICK, this._rightClickHandler, this)
    this.on(MouseEventType.MOUSE_MOVE, this._mouseMoveHandler, this)
  }

  /**
   *
   * Register Cesium mouse events
   *
   */
  _setInputAction() {
    let handler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas)
    Object.keys(Cesium.ScreenSpaceEventType).forEach(key => {
      let type = Cesium.ScreenSpaceEventType[key]
      this._cache[type] = new Cesium.Event()
      handler.setInputAction(movement => {
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
    if (scene.mode === Cesium.SceneMode.SCENE3D) {
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
      windowPosition: position,
      position: cartesian,
      surfacePosition: surfaceCartesian
    }
  }

  /**
   * Gets the Overlay id
   * @param {*} target
   */
  _getOverlayId(target) {
    let overlayId = undefined

    /**
     * Entity
     */
    if (target && target.id && target.id instanceof Cesium.Entity) {
      overlayId = target.id.overlayId
    }

    /**
     * Cesium3DTileFeature
     */
    if (target && target instanceof Cesium.Cesium3DTileFeature) {
      overlayId = target.tileset.overlayId
    }

    return overlayId
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

    /**
     * Entity
     */
    if (target && target.id && target.id instanceof Cesium.Entity) {
      layer = target.id.layer
      if (layer && layer.getOverlay) {
        overlay = layer.getOverlay(target.id.overlayId)
      }
    }

    /**
     * Cesium3DTileFeature
     */
    if (target && target instanceof Cesium.Cesium3DTileFeature) {
      layer = target.tileset.layer
      feature = target
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
   * @param {*} mouseInfo
   *
   */
  _raiseEvent(type, mouseInfo = {}, callback) {
    let event = undefined
    let targetInfo = this._getTargetInfo(mouseInfo.target)
    let overlay = targetInfo.overlay
    if (overlay && overlay.overlayEvent) {
      event = overlay.overlayEvent.getEvent(type)
    }
    // stopPropagation
    !event && (event = this._viewer.viewerEvent.getEvent(type))
    event &&
      event.numberOfListeners > 0 &&
      event.raiseEvent({
        ...targetInfo,
        ...mouseInfo
      })
    callback && callback()
  }

  /**
   *
   * Default click event handler
   * @param {*} movement
   *
   */
  _clickHandler(movement) {
    if (!movement || !movement.position) {
      return false
    }
    let mouseInfo = this._getMouseInfo(movement.position)
    this._raiseEvent(MouseEventType.CLICK, mouseInfo)
  }

  /**
   *
   * Default dbClick event handler
   * @param {*} movement
   *
   */
  _dbClickHandler(movement) {
    if (!movement || !movement.position) {
      return false
    }
    let mouseInfo = this._getMouseInfo(movement.position)
    this._raiseEvent(MouseEventType.DB_CLICK, mouseInfo)
  }

  /**
   *
   * Default rightclick event handler
   * @param {*} movement
   *
   */
  _rightClickHandler(movement) {
    if (!movement || !movement.position) {
      return false
    }
    let mouseInfo = this._getMouseInfo(movement.position)
    this._raiseEvent(MouseEventType.RIGHT_CLICK, mouseInfo)
  }

  /**
   *
   * Default mousemove event handler
   * @param {*} movement
   *
   */
  _mouseMoveHandler(movement) {
    if (!movement || !movement.endPosition) {
      return false
    }
    let mouseInfo = this._getMouseInfo(movement.endPosition)
    this._viewer.canvas.style.cursor = mouseInfo.target ? 'pointer' : 'default'
    this._raiseEvent(MouseEventType.MOUSE_MOVE, mouseInfo)

    // add event for overlay
    if (
      !this._selected ||
      this._getOverlayId(this._selected.target) !==
        this._getOverlayId(mouseInfo.target)
    ) {
      this._raiseEvent(MouseEventType.MOUSE_OUT, this._selected)
      this._raiseEvent(MouseEventType.MOUSE_OVER, mouseInfo, () => {
        this._selected = mouseInfo
      })
    }
  }
}

export default MouseEvent
