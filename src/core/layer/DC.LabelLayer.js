/*
 * @Author: Caven
 * @Date: 2020-03-30 17:14:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-17 16:21:55
 */
import Cesium from '@/namespace'
import Layer from './Layer'

DC.LabelLayer = class extends Layer {
  constructor(id, url) {
    if (!url) {
      throw new Error('DC.LabelLayer：the url invalid')
    }
    super(id)
    this._dataSource = Cesium.GeoJsonDataSource.load(url)
    this._delegate = new Cesium.CustomDataSource(id)
    this._state = DC.LayerState.INITIALIZED
    this.type = DC.LayerType.LABEL
  }
}

DC.LayerType.LABEL = 'label'
