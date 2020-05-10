/*
 * @Author: Caven
 * @Date: 2020-01-09 09:10:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 09:40:38
 */
import { Cesium } from '../../../namespace'
import { Util } from '../../utils'
import { center, area } from '../../math'
import Transform from '../../transform/Transform'
import Parse from '../../parse/Parse'
import Overlay from '../Overlay'
import OverlayState from '../OverlayState'

class Polygon extends Overlay {
  constructor(positions) {
    if (!Util.checkPositions(positions)) {
      throw new Error('Polygon: the positions invalid')
    }
    super()
    this._positions = Parse.parsePositions(positions)
    this._holes = []
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('polygon')
    this._state = OverlayState.INITIALIZED
  }

  set positions(positions) {
    if (!Util.checkPositions(positions)) {
      throw new Error('Polygon: the positions invalid')
    }
    this._positions = Parse.parsePositions(positions)
  }

  get positions() {
    return this._positions
  }

  set holes(holes) {
    if (holes && holes.length) {
      this._holes = holes.map(item => Parse.parsePositions(item))
    }
  }

  get holes() {
    return this._holes
  }

  get center() {
    return center(this._positions)
  }

  get area() {
    return area(this._positions)
  }

  /**
   *
   */
  _prepareHierarchy() {
    let result = new Cesium.PolygonHierarchy()
    result.positions = Transform.transformWGS84ArrayToCartesianArray(
      this._positions
    )
    result.holes = this._holes.map(
      item =>
        new Cesium.PolygonHierarchy(
          Transform.transformWGS84ArrayToCartesianArray(item)
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
    this._delegate.polygon && Util.merge(this._delegate.polygon, this._style)
    return this
  }

  /**
   *
   * @param {*} entity
   */
  static fromEntity(entity) {
    let polygon = undefined
    if (entity.polygon) {
      let positions = T.transformCartesianArrayToWGS84Array(
        item.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions
      )
      polygon = new Polygon(positions)
      polygon.attr = {
        ...entity.properties.getValue(Cesium.JulianDate.now())
      }
    }

    return polygon
  }
}

Overlay.registerType('polygon')

export default Polygon
