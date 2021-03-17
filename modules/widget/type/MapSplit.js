/**
 * @Author: Caven
 * @Date: 2020-03-04 15:38:40
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Icons from '@dc-modules/icons'
import { DomUtil } from '@dc-modules/utils'
import Widget from '../Widget'

class MapSplit extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'dc-slider')
    this._baseLayer = undefined
    this._moveActive = false
    this.type = Widget.getWidgetType('map_split')
    this._state = State.INITIALIZED
  }

  /**
   *
   * @private
   */
  _installHook() {
    Object.defineProperty(this._viewer, 'mapSplit', {
      value: this,
      writable: false
    })
  }

  /**
   *
   * @private
   */
  _bindEvent() {
    this._viewer.scene.imagerySplitPosition = 0.5
    this._wrapper.style.left = '50%'
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    if (this._baseLayer) {
      this._viewer.scene.imagerySplitPosition =
        this._baseLayer.splitDirection > 0 ? 1 : 0
    } else {
      this._viewer.scene.imagerySplitPosition = 0
    }
  }

  /**
   *
   * @private
   */
  _mountContent() {
    let splitter = DomUtil.parseDom(Icons.splitter, true, 'splitter')
    this._wrapper.appendChild(splitter)
    let handler = new Cesium.ScreenSpaceEventHandler(splitter)
    let self = this
    handler.setInputAction(() => {
      self._moveActive = true
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
    handler.setInputAction(() => {
      self._moveActive = true
    }, Cesium.ScreenSpaceEventType.PINCH_START)

    handler.setInputAction(movement => {
      self._moveHandler(movement)
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    handler.setInputAction(movement => {
      self._moveHandler(movement)
    }, Cesium.ScreenSpaceEventType.PINCH_MOVE)

    handler.setInputAction(() => {
      self._moveActive = false
    }, Cesium.ScreenSpaceEventType.LEFT_UP)
    handler.setInputAction(() => {
      self._moveActive = false
    }, Cesium.ScreenSpaceEventType.PINCH_END)
    this._ready = true
  }

  /**
   *
   * @param movement
   * @private
   */
  _moveHandler(movement) {
    if (!this._moveActive || !this._enable) {
      return
    }
    let relativeOffset = movement.endPosition.x
    let splitPosition =
      (this._wrapper.offsetLeft + relativeOffset) /
      this._wrapper.parentElement.offsetWidth
    this._wrapper.style.left = 100.0 * splitPosition + '%'
    this._viewer.scene.imagerySplitPosition = splitPosition
  }

  /**
   *
   * @param baseLayer
   * @param splitDirection
   * @returns {MapSplit}
   */
  addBaseLayer(baseLayer, splitDirection = 1) {
    if (!this._viewer || !this._enable) {
      return this
    }
    if (baseLayer) {
      this._baseLayer && this._viewer.imageryLayers.remove(this._baseLayer)
      this._baseLayer = this._viewer.imageryLayers.addImageryProvider(baseLayer)
      this._baseLayer.splitDirection = splitDirection || 0
      this._viewer.scene.imagerySplitPosition =
        this._wrapper.offsetLeft / this._wrapper.parentElement.offsetWidth
    }
    return this
  }
}

Widget.registerType('map_split')

export default MapSplit
