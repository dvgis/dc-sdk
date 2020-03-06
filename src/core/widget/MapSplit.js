/*
 * @Author: Caven
 * @Date: 2020-03-04 15:38:40
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-06 00:06:37
 */
import Cesium from '@/namespace'
import Widget from './Widget'

class MapSplit extends Widget {
  constructor() {
    super()
    this._wapper = DC.DomUtil.create('div', 'dc-slider')
    this._baseLayer = undefined
    this._moveActive = false
  }

  _installHook() {
    let handler = new Cesium.ScreenSpaceEventHandler(this._wapper)
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
  }

  _moveHandler(movement) {
    if (!this._moveActive || !this._enable) {
      return
    }
    let relativeOffset = movement.endPosition.x
    let splitPosition =
      (this._wapper.offsetLeft + relativeOffset) /
      this._wapper.parentElement.offsetWidth
    this._wapper.style.left = 100.0 * splitPosition + '%'
    this._viewer.scene.imagerySplitPosition = splitPosition
  }

  install(viewer) {
    this._viewer = viewer
    this._wapper && this._viewer.dcContainer.appendChild(this._wapper)
    this._state = DC.WidgetState.INSTALLED
    this._installHook && this._installHook()
  }

  addBaseLayer(baseLayer, splitDirection) {
    if (!this._viewer || !this._enable) {
      return this
    }
    if (this._baseLayer) {
      this._viewer.delegate.imageryLayers.remove(this._baseLayer)
    }
    if (baseLayer) {
      this._baseLayer = this._viewer.delegate.imageryLayers.addImageryProvider(
        baseLayer
      )
      this._baseLayer.splitDirection = splitDirection || 0
      this._viewer.scene.imagerySplitPosition =
        this._wapper.offsetLeft / this._wapper.parentElement.offsetWidth
    }
    return this
  }
}

DC.WidgetType.MAPSPLIT = 'mapsplit'

export default MapSplit
