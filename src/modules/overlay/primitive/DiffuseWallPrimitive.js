/**
 * @Author: Caven
 * @Date: 2021-06-04 20:38:39
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

const DEF_STYLE = {
  minRadius: 10,
  minHeight: 30,
  color: Cesium.Color.RED,
  slices: 128,
  speed: 10
}

class DiffuseWallPrimitive extends Overlay {
  constructor(center, radius, height) {
    super()
    this._center = Parse.parsePosition(center)
    this._delegate = undefined
    this._height = height
    this._radius = radius
    this._currentHeight = height || 0
    this._currentRadius = 10
    this._style = { ...DEF_STYLE }
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('diffuse_wall_primitive')
  }

  set center(position) {
    this._center = Parse.parsePosition(position)
    return this
  }

  get center() {
    return this._center
  }

  set radius(radius) {
    this._radius = radius
    return this
  }

  get radius() {
    return this._radius
  }

  set height(height) {
    this._height = height
    return this
  }

  get height() {
    return this._height
  }

  /**
   *
   * @returns {*}
   * @private
   */
  _getPositions() {
    let pnts = []
    let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
      Transform.transformWGS84ToCartesian(this._center)
    )
    for (let i = 0; i < this._style.slices; i++) {
      let angle = (i / this._style.slices) * Cesium.Math.TWO_PI
      let x = Math.cos(angle)
      let y = Math.sin(angle)
      let point = new Cesium.Cartesian3(
        x * this._currentRadius,
        y * this._currentRadius,
        0.0
      )
      pnts.push(
        Cesium.Matrix4.multiplyByPoint(
          modelMatrix,
          point,
          new Cesium.Cartesian3()
        )
      )
    }
    pnts.push(pnts[0])
    return pnts
  }

  /**
   *
   * @param length
   * @param hegiht
   * @returns {*[]}
   * @private
   */
  _getHeights(length, hegiht) {
    let heights = []
    for (let i = 0; i < length; i++) {
      heights.push(hegiht)
    }
    return heights
  }

  /**
   *
   * @param frameState
   * @returns {boolean}
   */
  update(frameState) {
    this._delegate = this._delegate && this._delegate.destroy()
    this._currentRadius += this._radius / this._style.speed / 20
    this._currentHeight -= this._height / this._style.speed / 20
    if (
      this._currentRadius > this._radius ||
      this._currentHeight < this._style.minHeight
    ) {
      this._currentRadius = this._style.minRadius
      this._currentHeight = this._height
    }
    if (!this._style.slices || this._style.slices < 3) {
      return false
    }
    let positions = this._getPositions()
    if (!positions || !positions.length) {
      return false
    }
    let geometry = new Cesium.WallGeometry({
      positions: positions,
      minimumHeights: this._getHeights(positions.length, 0),
      maximumHeights: this._getHeights(positions.length, this._currentHeight)
    })

    this._delegate = new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry
      }),
      appearance: new Cesium.MaterialAppearance({
        material: Cesium.Material.fromType('WallDiffuse', {
          color: this._style?.color
        }),
        flat: true
      }),
      asynchronous: false
    })
    this._delegate.update(frameState)
  }

  /**
   *
   * @param style
   * @returns {DiffuseWallPrimitive}
   */
  setStyle(style) {
    if (!style || Object.keys(style).length === 0) {
      return this
    }
    Util.merge(this._style, style)
    return this
  }

  /**
   * @return {*}
   */
  destroy() {
    return Cesium.destroyObject(this)
  }
}

Overlay.registerType('diffuse_wall_primitive')

export default DiffuseWallPrimitive
