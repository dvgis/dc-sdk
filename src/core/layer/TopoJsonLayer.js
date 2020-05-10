/*
 * @Author: Caven
 * @Date: 2020-03-22 01:12:39
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 09:02:45
 */

import GeoJsonLayer from './GeoJsonLayer'
import LayerState from './LayerState'

class TopoJsonLayer extends GeoJsonLayer {
  constructor(id, url, options = {}) {
    if (!url) {
      throw new Error('TopoJsonLayer：the url invalid')
    }
    super(id, url, options)
    this.type = GeoJsonLayer.getLayerType('topojson')
    this._state = LayerState.INITIALIZED
  }
}

GeoJsonLayer.registerType('topojson')

export default TopoJsonLayer
