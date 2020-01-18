/*
 * @Author: Caven
 * @Date: 2020-01-07 08:51:56
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-15 13:01:38
 */
import Cesium from '../../../namespace'
import Overlay from '../Overlay'

DC.Tileset = class extends Overlay {
  constructor(url, options = {}) {
    super()
    this._delegate = new Cesium.Cesium3DTileset({
      url: url,
      ...options
    })
    this._state = DC.OverlayState.INITIALIZED
  }

  _addCallback(layer) {
    this._layer = layer
    this._layer.delegate.add(this._delegate)
    DC.Util.merge(this._delegate, this._style)
    this._state = DC.OverlayState.ADDED
  }

  _removeCallback() {
    if (this._layer) {
      this._layer.delegate.remove(this._delegate)
      this._state = DC.OverlayState.REMOVED
    }
  }

  setStyle(style) {
    if (Object.keys(style).length == 0) {
      return
    }
    this._style = style
    this._delegate && DC.Util.merge(this._delegate, this._style)
  }

  remove() {
    if (this._layer) {
      this._layer.layerEvent.fire(DC.LayerEventType.REMOVE_OVERLAY, this)
    }
  }
}
