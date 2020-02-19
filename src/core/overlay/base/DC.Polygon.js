/*
 * @Author: Caven
 * @Date: 2020-01-09 09:10:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-18 11:03:30
 */
import Overlay from '../Overlay'
import Cesium from '@/namespace'

DC.Polygon = class extends Overlay {
  constructor(positions) {
    if (
      !positions ||
      (typeof positions !== 'string' && !Array.isArray(positions))
    ) {
      throw new Error('the positions invalid')
    }
    super()
    this._positions = this._preparePositions(positions)
    this._holes = []

    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.POLYGON
  }

  set positions(positions) {
    this._positions = this._preparePositions(positions)
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
    let boundingSphere = Cesium.BoundingSphere.fromPoints(
      DC.T.transformWSG84ArrayToCartesianArray(this._positions)
    )
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
        let oel = ellipsoid.cartographicToCartesian(
          DC.T.transformWSG84ToCartographic(positions[i - 1])
        )
        let el = ellipsoid.cartographicToCartesian(
          DC.T.transformWSG84ToCartographic(positions[i])
        )
        h += oel.x * el.y - el.x * oel.y
      }
      result = Math.abs(h).toFixed(2)
    }
    return result
  }

  /**
   * prepare entity
   */
  _preparePositions(positions) {
    if (typeof positions === 'string') {
      if (positions.indexOf('#') >= 0) {
        throw new Error('the positions invalid')
      }
      positions = positions.split(';')
    }
    return positions.map(item => {
      if (Array.isArray(item)) {
        return DC.Position.fromCoordArray(item)
      } else if (item instanceof DC.Position) {
        return item
      } else {
        return DC.Position.fromCoordString(item)
      }
    })
  }

  _prepareHierarchy() {
    let result = new Cesium.PolygonHierarchy()
    result.positions = DC.T.transformWSG84ArrayToCartesianArray(this._positions)
    result.holes = this._holes.map(
      item =>
        new Cesium.PolygonHierarchy(
          DC.T.transformWSG84ArrayToCartesianArray(item)
        )
    )
    return result
  }

  /**
   * prepare entity
   */
  _prepareDelegate() {
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.polygon = {
      ...this._style,
      hierarchy: new Cesium.CallbackProperty(time => {
        return this._prepareHierarchy()
      })
    }
    this._delegate.layer = this._layer
    this._delegate.overlayId = this._id
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return
    }
    this._style = style
    this._delegate.polygon && this._delegate.polygon.merge(style)
    return this
  }

  /**
   *
   * @param {*} entity
   */
  static fromEntity(entity) {}
}
