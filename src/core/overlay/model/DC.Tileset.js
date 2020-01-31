/*
 * @Author: Caven
 * @Date: 2020-01-07 08:51:56
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-31 20:49:28
 */
import Cesium from '@/namespace'
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
    this._state = DC.OverlayState.ADDED
  }

  _removeCallback() {
    if (this._layer) {
      this._layer.delegate.remove(this._delegate)
      this._state = DC.OverlayState.REMOVED
    }
  }

  setStyle(style) {
    if (style && style instanceof Cesium.TilesetStyle) {
      this._style = style
      this._delegate && (this._delegate.style = this._style)
    }
    return this
  }
}
