/**
 @author : Caven Chen
 @date : 2023-05-09
 */

import { Cesium } from '../../namespace/index.js'
const { DeveloperError, EllipsoidTerrainProvider } = Cesium

class BaseLayerPicker {
  constructor(options) {
    if (!options.globe) {
      throw new DeveloperError('globe is required')
    }
    this._globe = options.globe
    this._imageryProviders = []
    this._terrainProviders = []
    this._selectedImagery = undefined
    this._selectedTerrain = undefined
  }

  set selectedImagery(imagery) {
    if (!imagery || !imagery.providers) {
      new DeveloperError('imagery format error')
    }
    const imageryLayers = this._globe.imageryLayers
    if (!this._selectedImagery) {
      for (let i = imagery.providers.length - 1; i >= 0; i--) {
        imageryLayers.addImageryProvider(imagery.providers[i], 0)
      }
    } else if (
      this._selectedImagery &&
      imagery.id !== this._selectedImagery.id
    ) {
      imageryLayers.removeAll()
      for (let i = imagery.providers.length - 1; i >= 0; i--) {
        imageryLayers.addImageryProvider(imagery.providers[i], 0)
      }
    }
    this._selectedImagery = imagery
  }

  get selectedImagery() {
    return this._selectedImagery
  }

  set selectedTerrain(terrian) {
    if (this.selectedImagery !== terrian) {
      this._globe.depthTestAgainstTerrain = !(
        terrian instanceof EllipsoidTerrainProvider
      )
      this._globe.terrainProvider = terrian
      this._selectedTerrain = terrian
    }
  }

  get selectedTerrain() {
    return this._selectedTerrain
  }

  /**
   *
   * @param provider
   * @returns {BaseLayerPicker}
   */
  addImageryProvider(provider) {
    let providers = []
    let len = this._imageryProviders.length + 1
    if (Array.isArray(provider)) {
      providers = provider.slice(0)
    } else {
      providers = [provider]
    }
    this._imageryProviders.push({
      id: `dc-imagery-${len}`,
      providers,
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
  changeImagery(index) {
    if (index > this._imageryProviders.length - 1) {
      new DeveloperError('index error ')
      return this
    }
    this.selectedImagery = this._imageryProviders[index]
    return this
  }

  /**
   *
   * @param index
   * @returns {BaseLayerPicker}
   */
  changeTerrain(index) {
    if (index > this._terrainProviders.length - 1) {
      new DeveloperError('index error ')
      return this
    }
    this.selectedTerrain = this._terrainProviders[index]
  }
}

export default BaseLayerPicker
