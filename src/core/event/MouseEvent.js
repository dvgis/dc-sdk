/*
 * @Author: Caven
 * @Date: 2019-12-31 16:58:31
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-15 14:11:04
 */

import Cesium from '../../namespace'

import Event from './Event'

class MouseEvent extends Event {
  constructor(viewer) {
    super()
    this._viewer = viewer
    this._handler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas)
    this._registerEvent()
  }

  /**
   * 注册全局鼠标事件
   */
  _registerEvent() {
    for (let key in Cesium.ScreenSpaceEventType) {
      let type = Cesium.ScreenSpaceEventType[key]
      this._eventCache[type] = new Cesium.Event()
      this._handler.setInputAction(movement => {
        this._eventCache[type].raiseEvent(movement)
      }, type)
    }
    this.on('click', this._clickCallback, this)
    this.on('rightclick', this._rightClickCallback, this)
    this.on('mousemove', this._mouseMoveCallback, this)
    this.on('dbclick', this._dbclickCallback, this)
  }

  /**
   *
   * @param {*} target
   * 获取鼠标事件的目标信息
   */
  _getTargetInfo(target) {
    let overlay = undefined
    let layer = undefined
    let feature = undefined
    if (target.id && target.id instanceof Cesium.Entity) {
      layer = target.id.layer
      if (layer) {
        overlay = layer.getOverlay(target.id.id)
      }
      //todo
    } else if (target.id instanceof Cesium.Cesium3DTileFeature) {
      // todo
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
      let result = this._getTargetInfo(target)
      let overlay = result.overlay
      if (overlay && overlay.overlayEvent) {
        let event = overlay.overlayEvent.getEvent(type)
        if (event && event.numberOfListeners > 0) {
          event.raiseEvent({
            layer: result.layer,
            overlay: overlay,
            feature: result.feature,
            position: position
          })
          stopPropagation = true
        }
      }
    }
    if (!stopPropagation) {
      let event = this._viewer.viewerEvent.getEvent(type)
      if (event && event.numberOfListeners > 0) {
        event.raiseEvent({ position: position })
      }
    }
  }

  /**
   *
   * @param {*} movement
   * 单击默认事件
   */
  _clickCallback(movement) {
    if (!movement || !movement.position) {
      return
    }
    let target = this._viewer.scene.pick(movement.position)
    let cartesian = this._viewer.scene.pickPosition(movement.position)
    this._raiseEvent('click', target, cartesian)
  }

  /**
   *
   * @param {*} movement
   * 双击默认事件
   */
  _dbclickCallback(movement) {
    if (!movement || !movement.position) {
      return
    }
    let target = this._viewer.scene.pick(movement.position)
    let cartesian = this._viewer.scene.pickPosition(movement.position)
    this._raiseEvent('dbclick', target, cartesian)
  }

  /**
   * @param {*} movement
   * 右击默认事件
   */
  _rightClickCallback(movement) {
    if (!movement || !movement.position) {
      return
    }
    let target = this._viewer.scene.pick(movement.position)
    let cartesian = this._viewer.scene.pickPosition(movement.position)
    this._raiseEvent('rightclick', target, cartesian)
  }

  _mouseMoveCallback(movement) {
    if (!movement || !movement.endPosition) {
      return
    }
    let target = this._viewer.scene.pick(movement.endPosition)
    let cartesian = this._viewer.scene.pickPosition(movement.endPosition)
    this._raiseEvent('mousemove', target, cartesian)
  }
}

export default MouseEvent
