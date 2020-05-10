/*
 * @Author: Caven
 * @Date: 2020-01-06 15:03:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 09:40:07
 */

import { Cesium } from '../../../namespace'
import { Util } from '../../utils'
import { center, distance } from '../../math'
import Transform from '../../transform/Transform'
import Parse from '../../parse/Parse'
import Overlay from '../Overlay'
import OverlayState from '../OverlayState'

class Polyline extends Overlay {
  constructor(positions) {
    if (!Util.checkPositions(positions)) {
      throw new Error('Polyline: the positions invalid')
    }
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new Cesium.Entity()
    this.type = Overlay.getOverlayType('polyline')
    this._state = OverlayState.INITIALIZED
  }

  set positions(positions) {
    if (!Util.checkPositions(positions)) {
      throw new Error('Polyline: the positions invalid')
    }
    this._positions = Parse.parsePositions(positions)
  }

  get positions() {
    return this._positions
  }

  get center() {
    return center(this._positions)
  }

  get distance() {
    return distance(this._positions)
  }

  _mountedHook() {
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.polyline = {
      ...this._style,
      positions: new Cesium.CallbackProperty(time => {
        return Transform.transformWGS84ArrayToCartesianArray(this._positions)
      })
    }
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
    this._delegate.polyline && Util.merge(this._delegate.polyline, this._style)
    return this
  }

  /**
   *
   * @param {*} entity
   */
  static fromEntity(entity) {
    let polyline = undefined
    if (entity.polyline) {
      let positions = Transform.transformCartesianArrayToWGS84Array(
        entity.polyline.positions.getValue(Cesium.JulianDate.now())
      )
      polyline = new Polyline(positions)
      polyline.attr = {
        ...entity.properties.getValue(Cesium.JulianDate.now())
      }
    }
    return polyline
  }
}

Overlay.registerType('polyline')

export default Polyline
