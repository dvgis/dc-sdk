/**
 * @Author: Caven
 * @Date: 2020-09-11 19:32:22
 */

import State from '@dc-modules/state/State'
import GeoJsonLayer from './GeoJsonLayer'

class TopoJsonLayer extends GeoJsonLayer {
  constructor(id, url, options = {}) {
    if (!url) {
      throw new Error('TopoJsonLayer：the url invalid')
    }
    super(id, url, options)
    this.type = GeoJsonLayer.getLayerType('topojson')
    this._state = State.INITIALIZED
  }
}

GeoJsonLayer.registerType('topojson')

export default TopoJsonLayer
