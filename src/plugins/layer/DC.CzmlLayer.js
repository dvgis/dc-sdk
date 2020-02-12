/*
 * @Author: Caven
 * @Date: 2020-01-19 13:38:48
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-12 22:04:13
 */

import Cesium from '@/namespace'
import Layer from '../../core/layer/Layer'

DC.CzmlLayer = class extends Layer {
  constructor(id, url) {
    if (!url) {
      throw new Error('the url is empty')
    }
    super(id)
    this._delegate = Cesium.CzmlDataSource.load(url, {})
    this._state = DC.LayerState.INITIALIZED
    this.type = DC.LayerType.CZML
  }

  eachOverlay(method, context) {
    if (this._delegate) {
      this._delegate.then(dataSource => {
        let entities = dataSource.entities.values
        entities.forEach(item => {
          method.call(context, item)
        })
      })
      return this
    }
  }
}
