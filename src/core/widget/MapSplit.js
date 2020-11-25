/**
 * @Author: Caven
 * @Date: 2020-03-04 15:38:40
 */

import { DomUtil } from '../utils'
import Icon from '../icon'
import State from '../state/State'
import Widget from './Widget'

const { Cesium } = DC.Namespace

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
  _mountContent() {
    let splitter = DomUtil.parseDom(Icon.splitter, true, 'splitter')
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

  addBaseLayer(baseLayer, splitDirection) {
    if (!this._viewer || !this._enable) {
      return this
    }
    if (baseLayer) {
      if (this._baseLayer) {
        this._viewer.delegate.imageryLayers.remove(this._baseLayer)
      }
      this._baseLayer = this._viewer.delegate.imageryLayers.addImageryProvider(
        baseLayer
      )
      this._baseLayer.splitDirection = splitDirection || 0
      this._viewer.scene.imagerySplitPosition =
        this._wrapper.offsetLeft / this._wrapper.parentElement.offsetWidth
    }
    return this
  }
}

Widget.registerType('map_split')

export default MapSplit
