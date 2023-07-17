/**
 * @Author : Caven Chen
 */

import { Cesium } from '../../namespace'
const { EllipsoidTerrainProvider, ImageryLayer } = Cesium

class BaseLayerPicker {
  constructor(options) {
    if (!options.globe) {
      throw new Error('globe is required')
    }
    this._globe = options.globe
    this._imageryLayers = []
    this._selectedImageryLayer = undefined
    this._count = 0
  }

  set selectedImageryLayer(imageryLayer) {
    if (!imageryLayer || !imageryLayer.layers) {
      new Error('imagery format error')
    }
    let imageryLayers = this._globe.imageryLayers
    if (!this._selectedImageryLayer) {
      for (let i = imageryLayer.layers.length - 1; i >= 0; i--) {
        let layer = imageryLayer.layers[i]
        if (layer) {
          imageryLayers.add(
            ImageryLayer.fromProviderAsync(layer, imageryLayer.options),
            0
          )
        }
      }
    } else if (
      this._selectedImageryLayer &&
      imageryLayer.id !== this._selectedImageryLayer.id
    ) {
      imageryLayers.removeAll()
      for (let i = imageryLayer.layers.length - 1; i >= 0; i--) {
        let layer = imageryLayer.layers[i]
        if (layer) {
          imageryLayers.add(
            ImageryLayer.fromProviderAsync(layer, imageryLayer.options),
            0
          )
        }
      }
    }
    this._selectedImageryLayer = imageryLayer
  }

  get selectedImageryLayer() {
    return this._selectedImageryLayer
  }

  /**
   *
   * @param imageryLayer
   * @param options
   * @returns {BaseLayerPicker}
   */
  addImageryLayer(imageryLayer, options = {}) {
    let imageryLayers = []
    if (Array.isArray(imageryLayer)) {
      imageryLayers = imageryLayer.slice(0)
    } else {
      imageryLayers = [imageryLayer]
    }
    this._count++
    this._imageryLayers.push({
      id: `imagery-no-${this._count}`,
      layers: imageryLayers,
      options: options,
    })
    return this
  }

  /**
   *
   * @param index
   * @returns {BaseLayerPicker}
   */
  changeImageryLayer(index) {
    if (index > this._imageryLayers.length - 1) {
      throw new Error('index error')
    }
    this.selectedImageryLayer = this._imageryLayers[index]
    return this
  }
}

export default BaseLayerPicker
