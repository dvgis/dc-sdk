/*
 * @Author: Caven
 * @Date: 2020-01-09 09:10:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-19 10:43:19
 */
import Overlay from '../Overlay'
import Cesium from '@/namespace'

DC.Polygon = class extends Overlay {
  constructor(positions) {
    if (!positions || (typeof positions !== 'string' && !Array.isArray(positions))) {
      throw new Error('the positions invalid')
    }
    super()
    this._positions = []
    this._holes = []
    this._preparePositions(positions)
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.POLYGON
  }

  set positions(positions) {
    this._preparePositions(positions)
  }

  get positions() {
    return this._positions
  }

  set holes(holes) {
    if (holes && holes.length) {
      this._holes = holes.map(item => this._preparePositions(item))
    }
  }

  get holes() {
    return this._holes
  }

  get center() {
    let boundingSphere = Cesium.BoundingSphere.fromPoints(DC.T.transformWSG84ArrayToCartesianArray(this._positions))
    return DC.T.transformCartesianToWSG84(boundingSphere.center)
  }

  get area() {
    let result = 0
    if (this._positions) {
      let h = 0
      let ellipsoid = Cesium.Ellipsoid.WGS84
      let positions = [...this._positions]
      positions.push(positions[0])
      for (let i = 1; i < positions.length; i++) {
        let oel = ellipsoid.cartographicToCartesian(DC.T.transformWSG84ToCartographic(positions[i - 1]))
        let el = ellipsoid.cartographicToCartesian(DC.T.transformWSG84ToCartographic(positions[i]))
        h += oel.x * el.y - el.x * oel.y
      }
      result = Math.abs(h).toFixed(2)
    }
    return result
  }

  _preparePositions(positions) {
    if (typeof positions === 'string') {
      if (positions.indexOf('#') >= 0) {
        throw new Error('the positions invalid')
      }
      positions = positions.split(';')
    }
    this._positions = positions.map(item => {
      if (Array.isArray(item)) {
        return DC.Position.fromCoordArray(item)
      } else {
        return DC.Position.fromCoordString(item)
      }
    })
  }

  _prepareHierarchy() {
    let result = new Cesium.PolygonHierarchy()
    result.positions = DC.T.transformWSG84ArrayToCartesianArray(this._positions)
    result.holes = this._holes.map(item => new Cesium.PolygonHierarchy(DC.T.transformWSG84ArrayToCartesianArray(item)))
    return result
  }

  _prepareDelegate() {
    // 初始化Overlay参数
    this._delegate.polygon = {
      hierarchy: new Cesium.CallbackProperty(time => {
        return this._prepareHierarchy()
      })
    }
    this._delegate.layer = this._layer
    this._delegate.overlayId = this._id
  }

  _addCallback(layer) {
    this._layer = layer
    this._prepareDelegate()
    this._layer.delegate.entities.add(this._delegate)
    DC.Util.merge(this._delegate.polygon, this._style)
    this._state = DC.OverlayState.ADDED
  }

  _removeCallback() {
    if (this._layer) {
      this._layer.delegate.entities.remove(this._delegate)
      this._state = DC.OverlayState.REMOVED
    }
  }

  setStyle(style) {
    if (Object.keys(style).length == 0) {
      return
    }
    this._style = style
    this._delegate.polyline && DC.Util.merge(this._delegate.Polygon, this._style)
    return this
  }
}
