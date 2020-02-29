/*
 * @Author: Caven
 * @Date: 2020-01-06 15:03:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-29 18:22:26
 */

import Overlay from '../Overlay'
import Cesium from '@/namespace'

DC.Polyline = class extends Overlay {
  constructor(positions) {
    if (
      !positions ||
      (typeof positions !== 'string' && !Array.isArray(positions))
    ) {
      throw new Error('the positions invalid')
    }
    super()
    this._positions = []
    this._preparePositions(positions)
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.POLYLINE
  }

  set positions(positions) {
    this._preparePositions(positions)
  }

  get positions() {
    return this._positions
  }

  get center() {
    let boundingSphere = Cesium.BoundingSphere.fromPoints(
      DC.T.transformWSG84ArrayToCartesianArray(this._positions)
    )
    return DC.T.transformCartesianToWSG84(boundingSphere.center)
  }

  get distance() {
    let result = 0
    for (var i = 0; i < this._positions.length - 1; i++) {
      let startCartographic = DC.T.transformWSG84ToCartographic(
        this._positions[i]
      )
      let endCartographic = DC.T.transformWSG84ToCartographic(
        this._positions[i + 1]
      )
      let geodesic = new Cesium.EllipsoidGeodesic()
      geodesic.setEndPoints(startCartographic, endCartographic)
      let s = geodesic.surfaceDistance
      s = Math.sqrt(
        Math.pow(s, 2) +
          Math.pow(endCartographic.height - startCartographic.height, 2)
      )
      result = result + s
    }
    return result > 0 ? result.toFixed(2) : result
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
      } else if (item instanceof DC.Position) {
        return item
      } else {
        return DC.Position.fromCoordString(item)
      }
    })
  }

  /**
   * prepare entity
   */
  _prepareDelegate() {
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.polyline = {
      ...this._style,
      positions: new Cesium.CallbackProperty(time => {
        return DC.T.transformWSG84ArrayToCartesianArray(this._positions)
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
    if (Object.keys(style).length == 0) {
      return
    }
    this._style = style
    this._delegate.polyline &&
      DC.Util.merge(this._delegate.polyline, this._style)
    return this
  }

  /**
   *
   * @param {*} entity
   */
  fromEntity(entity) {
    // this._positions =
  }
}

DC.OverlayType.POLYLINE = 'polyline'
