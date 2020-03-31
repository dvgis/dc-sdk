/*
 * @Author: Caven
 * @Date: 2020-03-30 17:14:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-30 17:34:12
 */
import Cesium from '@/namespace'
import Layer from './Layer'

DC.LabelLayer = class extends Layer {
  constructor(id, url) {
    if (!url) {
      throw new Error('the url invalid')
    }
    super(id)
    this._dataSource = Cesium.GeoJsonDataSource.load(url)
    this._delegate = new Cesium.CustomDataSource(id)
    this._state = DC.LayerState.INITIALIZED
    this.type = DC.LayerType.LABEL
  }

  _addCallback(viewer) {}
}

DC.LayerType.LABEL = 'label'
