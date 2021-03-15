/**
 * @Author: Caven
 * @Date: 2020-03-30 17:14:00
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import { Label } from '@dc-modules/overlay'
import Layer from '../Layer'

class LabelLayer extends Layer {
  constructor(id, url = '') {
    super(id)
    this._dataSource = Cesium.GeoJsonDataSource.load(url)
    this._delegate = new Cesium.CustomDataSource(id)
    this._initLabel()
    this.type = Layer.registerType('label')
    this._state = State.INITIALIZED
  }

  _createLabel(entity) {
    if (entity.position && entity.name) {
      return Label.fromEntity(entity)
    }
  }

  _initLabel() {
    this._dataSource.then(dataSource => {
      let entities = dataSource.entities.values
      entities.forEach(item => {
        let label = this._createLabel(item)
        this.addOverlay(label)
      })
    })
  }
}

Layer.registerType('label')

export default LabelLayer
