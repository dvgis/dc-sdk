/*
 * @Author: Caven
 * @Date: 2020-03-22 01:12:39
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-09 20:36:44
 */
DC.TopoJsonLayer = class extends DC.GeoJsonLayer {
  constructor(id, url, options = {}) {
    if (!url) {
      throw new Error('the url invalid')
    }
    super(id, url, options)
    this._state = DC.LayerState.INITIALIZED
    this.type = DC.LayerType.TOPOJSON
  }
}

DC.LayerType.TOPOJSON = 'topojson'
