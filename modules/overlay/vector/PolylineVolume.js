/**
 * @Author: Caven
 * @Date: 2020-04-14 20:10:34
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class PolylineVolume extends Overlay {
  constructor(positions, shape) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._shape = shape || []
    this._delegate = new Cesium.Entity({ polylineVolume: {} })
    this.type = Overlay.getOverlayType('polyline_volume')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.polylineVolume.positions = Transform.transformWGS84ArrayToCartesianArray(
      this._positions
    )
    return this
  }

  get positions() {
    return this._positions
  }

  set shape(shape) {
    this._shape = shape || []
    this._delegate.polylineVolume.shape = this._shape
    return this
  }

  get shape() {
    return this._shape
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.positions = this._positions

    /**
     *  initialize the Overlay parameter
     */
    this.shape = this._shape
  }

  /**
   * @param text
   * @param textStyle
   * @returns {PolylineVolume}
   */
  setLabel(text, textStyle) {
    return this
  }

  /**
   * Sets style
   * @param style
   * @returns {PolylineVolume}
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    delete style['positions'] && delete style['shape']
    this._style = style
    Util.merge(this._delegate.polylineVolume, this._style)
    return this
  }

  /**
   * Parses from entity
   * @param entity
   * @param shape
   * @returns {PolylineVolume|any}
   */
  static fromEntity(entity, shape) {
    let polylineVolume = undefined
    let now = Cesium.JulianDate.now()
    if (entity.polyline) {
      let positions = Transform.transformCartesianArrayToWGS84Array(
        entity.polyline.positions.getValue(now)
      )
      polylineVolume = new PolylineVolume(positions, shape)
      polylineVolume.attr = {
        ...entity?.properties?.getValue(now)
      }
    }
    return polylineVolume
  }
}

Overlay.registerType('polyline_volume')

export default PolylineVolume
