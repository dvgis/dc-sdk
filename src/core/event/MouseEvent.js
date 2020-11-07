/**
 * @Author: Caven
 * @Date: 2019-12-31 16:58:31
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
    this.on(MouseEventType.WHEEL, this._mouseWheelHandler, this)
  }

  /**
   * Register Cesium mouse events
   * @private
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
   * @param position
   * @private
   *
   */
  _getMouseInfo(position) {
    let scene = this._viewer.scene
    let target = scene.pick(position)
    let cartesian = undefined
    if (scene.pickPositionSupported) {
      cartesian = scene.pickPosition(position)
    }
    let surfaceCartesian
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
   * Gets the drill pick overlays for the mouse event
   * @param position
   * @returns {[]}
   * @private
   */
  _getDrillInfos(position) {
    let drillInfos = []
    let scene = this._viewer.scene
    let targets = scene.drillPick(position)
    if (targets && targets.length) {
      targets.forEach(target => {
        drillInfos.push(this._getTargetInfo(target))
      })
    }
    return drillInfos
  }

  /**
   * Return the Overlay id
   * @param target
   * @returns {any}
   * @private
   */
  _getOverlayId(target) {
    let overlayId = undefined

    // for Entity
    if (target && target.id && target.id instanceof Cesium.Entity) {
      overlayId = target.id.overlayId
    }

    // for Cesium3DTileFeature
    if (target && target instanceof Cesium.Cesium3DTileFeature) {
      overlayId = target.tileset.overlayId
    }

    return overlayId
  }

  /**
   * Returns the target information for the mouse event
   * @param target
   * @returns {{overlay: any, feature: any, layer: any}}
   * @private
   */
  _getTargetInfo(target) {
    let overlay = undefined
    let layer = undefined
    let feature = undefined

    // for Entity
    if (target && target.id && target.id instanceof Cesium.Entity) {
      layer = this._viewer
        .getLayers()
        .filter(item => item.layerId === target.id.layerId)[0]
      if (layer && layer.getOverlay) {
        overlay = layer.getOverlay(target.id.overlayId)
      }
    }

    // for Cesium3DTileFeature
    if (target && target instanceof Cesium.Cesium3DTileFeature) {
      layer = this._viewer
        .getLayers()
        .filter(item => item.layerId === target.tileset.layerId)[0]
      feature = target
      if (layer && layer.getOverlay) {
        overlay = layer.getOverlay(target.tileset.overlayId)
        if (feature && feature.getPropertyNames) {
          let propertyNames = feature.getPropertyNames()
          propertyNames.forEach(item => {
            overlay.attr[item] = feature.getProperty(item)
          })
        }
      }
    }

    return { layer: layer, overlay: overlay, feature: feature }
  }

  /**
   * Trigger subscription event
   * @param type
   * @param mouseInfo
   * @private
   */
  _raiseEvent(type, mouseInfo = {}) {
    let event = undefined
    let targetInfo = this._getTargetInfo(mouseInfo.target)
    let overlay = targetInfo?.overlay
    // get Overlay Event
    if (overlay && overlay.overlayEvent) {
      event = overlay.overlayEvent.getEvent(type)
    }

    // get Viewer Event
    if (!event || event.numberOfListeners === 0) {
      event = this._viewer.viewerEvent.getEvent(type)
    }
    event &&
      event.numberOfListeners > 0 &&
      event.raiseEvent({
        ...targetInfo,
        ...mouseInfo
      })

    // get Drill Pick Event
    if (overlay && overlay.allowDrillPicking) {
      let drillInfos = this._getDrillInfos(mouseInfo.windowPosition)
      drillInfos.forEach(drillInfo => {
        let dillOverlay = drillInfo?.overlay
        if (
          dillOverlay?.overlayId !== overlay.overlayId &&
          dillOverlay?.overlayEvent
        ) {
          event = dillOverlay.overlayEvent.getEvent(type)
          event &&
            event.numberOfListeners > 0 &&
            event.raiseEvent({
              ...drillInfo,
              ...mouseInfo
            })
        }
      })
    }
  }

  /**
   * Default click event handler
   * @param movement
   * @returns {boolean}
   * @private
   */
  _clickHandler(movement) {
    if (!movement || !movement.position) {
      return false
    }
    let mouseInfo = this._getMouseInfo(movement.position)
    this._raiseEvent(MouseEventType.CLICK, mouseInfo)
  }

  /**
   * Default dbClick event handler
   * @param movement
   * @returns {boolean}
   * @private
   */
  _dbClickHandler(movement) {
    if (!movement || !movement.position) {
      return false
    }
    let mouseInfo = this._getMouseInfo(movement.position)
    this._raiseEvent(MouseEventType.DB_CLICK, mouseInfo)
  }

  /**
   * Default rightClick event handler
   * @param movement
   * @returns {boolean}
   * @private
   */
  _rightClickHandler(movement) {
    if (!movement || !movement.position) {
      return false
    }
    let mouseInfo = this._getMouseInfo(movement.position)
    this._raiseEvent(MouseEventType.RIGHT_CLICK, mouseInfo)
  }

  /**
   * Default mousemove event handler
   * @param movement
   * @returns {boolean}
   * @private
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
      this._raiseEvent(MouseEventType.MOUSE_OVER, mouseInfo)
      this._selected = mouseInfo
    }
  }

  /**
   * Default mouse wheel event handler
   * @param movement
   * @private
   */
  _mouseWheelHandler(movement) {
    this._raiseEvent(MouseEventType.WHEEL, { movement })
  }
}

export default MouseEvent
