/**
 * @Author: Caven
 * @Date: 2020-04-11 18:58:17
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class Corridor extends Overlay {
  constructor(positions) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new Cesium.Entity({ corridor: {} })
    this.type = Overlay.getOverlayType('corridor')
    this._state = State.INITIALIZED
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.corridor.positions = Transform.transformWGS84ArrayToCartesianArray(
      this._positions
    )
    return this
  }

  get positions() {
    return this._positions
  }

  _mountedHook() {
    /**
     *  set the location
     */
    this.positions = this._positions
  }

  /**
   *
   * @param {*} text
   * @param {*} textStyle
   */
  setLabel(text, textStyle) {
    return this
  }

  /**
   * Sets Style
   * @param style
   * @returns {Corridor}
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    delete style['positions']
    this._style = style
    Util.merge(this._delegate.corridor, this._style)
    return this
  }

  /**
   * Parses from entity
   * @param entity
   * @returns {Corridor|any}
   */
  static fromEntity(entity) {
    let corridor = undefined
    let now = Cesium.JulianDate.now()
    if (entity.polyline) {
      let positions = Transform.transformCartesianArrayToWGS84Array(
        entity.polyline.positions.getValue(now)
      )
      corridor = new Corridor(positions)
      corridor.attr = {
        ...entity?.properties?.getValue(now)
      }
    }
    return corridor
  }
}

Overlay.registerType('corridor')

export default Corridor
