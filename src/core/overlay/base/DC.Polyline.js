/*
 * @Author: Caven
 * @Date: 2020-01-06 15:03:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-31 21:03:27
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
    this._positions = DC.P.parsePositions(positions)
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.POLYLINE
  }

  set positions(positions) {
    this._positions = DC.P.parsePositions(positions)
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
    return DC.Math.getDistance(this._positions)
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
      return this
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
  static fromEntity(entity) {
    let polyline = undefined
    if (entity.polyline) {
      let positions = DC.T.transformCartesianArrayToWSG84Array(
        entity.polyline.positions.getValue(Cesium.JulianDate.now())
      )
      polyline = new DC.Polyline(positions)
      polyline.attr = {
        ...entity.properties.getValue(Cesium.JulianDate.now())
      }
    }
    return polyline
  }
}

DC.OverlayType.POLYLINE = 'polyline'
