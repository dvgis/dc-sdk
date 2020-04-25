/*
 * @Author: Caven
 * @Date: 2020-01-09 09:10:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-24 15:01:54
 */
import Overlay from '../Overlay'
import Cesium from '@/namespace'

DC.Polygon = class extends Overlay {
  constructor(positions) {
    if (!DC.Util.checkPositions(positions)) {
      throw new Error('DC.Polygon: the positions invalid')
    }
    super()
    this._positions = DC.P.parsePositions(positions)
    this._holes = []
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.POLYGON
  }

  set positions(positions) {
    if (!DC.Util.checkPositions(positions)) {
      throw new Error('DC.Polygon: the positions invalid')
    }
    this._positions = DC.P.parsePositions(positions)
  }

  get positions() {
    return this._positions
  }

  set holes(holes) {
    if (holes && holes.length) {
      this._holes = holes.map(item => DC.P.parsePositions(item))
    }
  }

  get holes() {
    return this._holes
  }

  get center() {
    return DC.Math.center(this._positions)
  }

  get area() {
    return DC.Math.area(this._positions)
  }

  /**
   *
   */
  _prepareHierarchy() {
    let result = new Cesium.PolygonHierarchy()
    result.positions = DC.T.transformWGS84ArrayToCartesianArray(this._positions)
    result.holes = this._holes.map(
      item =>
        new Cesium.PolygonHierarchy(
          DC.T.transformWGS84ArrayToCartesianArray(item)
        )
    )
    return result
  }

  _mountedHook() {
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.polygon = {
      ...this._style,
      hierarchy: new Cesium.CallbackProperty(time => {
        return this._prepareHierarchy()
      })
    }
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    this._style = style
    this._delegate.polygon && DC.Util.merge(this._delegate.polygon, this._style)
    return this
  }

  /**
   *
   * @param {*} entity
   */
  static fromEntity(entity) {
    let polygon = undefined
    if (entity.polygon) {
      let positions = DC.T.transformCartesianArrayToWGS84Array(
        item.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions
      )
      polygon = new DC.Polygon(positions)
      polygon.attr = {
        ...entity.properties.getValue(Cesium.JulianDate.now())
      }
    }

    return polygon
  }
}

DC.OverlayType.POLYGON = 'polygon'
