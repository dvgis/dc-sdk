/**
 @Author: Caven Chen
 **/

import { Cesium } from '../../namespace'

const { EllipsoidTerrainProvider } = Cesium

class BaseLayerPicker {
  constructor(options) {
    if (!options.globe) {
      throw new Error('globe is required')
    }
    this._globe = options.globe
    this._imageryLayers = []
    this._terrainProviders = []
    this._selectedImageryLayer = undefined
    this._selectedTerrain = undefined
    this._count = 0
  }

  set selectedImageryLayer(imageryLayer) {
    if (!imageryLayer || !imageryLayer.layers) {
      new Error('imagery format error')
    }
    let imageryLayers = this._globe.imageryLayers
    if (!this._selectedImageryLayer) {
      for (let i = imageryLayer.layers.length - 1; i >= 0; i--) {
        imageryLayers.add(imageryLayer.layers[i], 0)
      }
    } else if (
      this._selectedImageryLayer &&
      imageryLayer.id !== this._selectedImageryLayer.id
    ) {
      imageryLayers.removeAll()
      for (let i = imageryLayer.layers.length - 1; i >= 0; i--) {
        imageryLayers.addImageryProvider(imageryLayer.layers[i], 0)
      }
    }
    this._selectedImageryLayer = imageryLayer
  }

  get selectedImageryLayer() {
    return this._selectedImageryLayer
  }

  set selectedTerrain(terrain) {
    if (this.selectedTerrain !== terrain) {
      this._globe.depthTestAgainstTerrain = !(
        terrain instanceof EllipsoidTerrainProvider
      )
      this._globe.terrainProvider = terrain
      this._selectedTerrain = terrain
    }
  }

  get selectedTerrain() {
    return this._selectedTerrain
  }

  /**
   *
   * @param imageryLayer
   * @returns {BaseLayerPicker}
   */
  addImageryLayer(imageryLayer) {
    let imageryLayers = []
    if (Array.isArray(imageryLayer)) {
      imageryLayers = imageryLayer.slice(0)
    } else {
      imageryLayers = [imageryLayer]
    }
    this._count++
    this._imageryLayers.push({
      id: `dc-imagery-${this._count}`,
      layers: imageryLayers,
    })
    return this
  }

  /**
   *
   * @param provider
   * @returns {BaseLayerPicker}
   */
  addTerrainProvider(provider) {
    this._terrainProviders.push(provider)
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

  /**
   *
   * @param index
   * @returns {BaseLayerPicker}
   */
  changeTerrain(index) {
    if (index > this._terrainProviders.length - 1) {
      throw new Error('index error')
    }
    this.selectedTerrain = this._terrainProviders[index]
    return this
  }
}

export default BaseLayerPicker
