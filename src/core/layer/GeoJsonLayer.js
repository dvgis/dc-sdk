/*
 * @Author: Caven
 * @Date: 2020-01-13 10:13:53
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 22:37:07
 */

import { Layer, VectorLayer } from './index'
import { Billboard, Polyline, Polygon } from '../overlay'
import State from '../state/State'

const { Cesium } = DC.Namespace

class GeoJsonLayer extends Layer {
  constructor(id, url, options = {}) {
    if (!url) {
      throw new Error('GeoJsonLayer：the url invalid')
    }
    super(id)
    this._delegate = Cesium.GeoJsonDataSource.load(url, options)
    this.type = Layer.getLayerType('geojson')
    this._state = State.INITIALIZED
  }

  set show(show) {
    this._show = show
    this._delegate &&
      this._delegate.then(dataSource => {
        dataSource.show = this._show
      })
  }

  get show() {
    return this._show
  }

  _createBillboard(entity) {
    if (entity.position && entity.billboard) {
      return Billboard.fromEntity(entity)
    }
  }

  _createPolyline(entity) {
    if (entity.polyline) {
      return Polyline.fromEntity(entity)
    }
  }

  _createPolygon(entity) {
    if (entity.polygon) {
      return Polygon.fromEntity(entity)
    }
  }

  /**
   *
   * @param {*} method
   * @param {*} context
   */
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

  /**
   *
   */
  toVectorLayer() {
    let layer = new VectorLayer(this._id)
    let self = this
    this.eachOverlay(item => {
      if (item.billboard) {
        layer.addOverlay(self._createBillboard(item))
      } else if (item.polyline) {
        layer.addOverlay(self._createPolyline(item))
      } else if (item.polygon) {
        layer.addOverlay(self._createPolygon(item))
      }
    })
    return layer
  }
}

Layer.registerType('geojson')

export default GeoJsonLayer
