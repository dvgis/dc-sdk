/*
 * @Author: Caven
 * @Date: 2020-03-22 01:12:39
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 10:41:54
 */

import GeoJsonLayer from './GeoJsonLayer'
import State from '../state/State'

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
