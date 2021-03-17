/**
 * @Author: Caven
 * @Date: 2020-03-02 22:38:10
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'
import Parse from '@dc-modules/parse/Parse'

import Animation from '../Animation'

class AroundPoint extends Animation {
  constructor(viewer, position, options = {}) {
    super(viewer)
    this._position = Parse.parsePosition(position)
    this._options = options
    this._heading = viewer.camera.heading
    this._aroundAmount = 0.2
    this.type = 'around_point'
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    return this
  }

  set aroundAmount(aroundAmount) {
    this._aroundAmount = aroundAmount
    return this
  }

  /**
   *
   * @private
   */
  _bindEvent() {
    this._viewer.clock.onTick.addEventListener(this._onAround, this)
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.clock.onTick.removeEventListener(this._onAround, this)
  }

  /**
   *
   * @param scene
   * @param time
   * @private
   */
  _onAround(scene, time) {
    this._heading += Cesium.Math.toRadians(this._aroundAmount)
    if (this._heading >= Math.PI * 2 || this._heading <= -Math.PI * 2) {
      this._heading = 0
    }
    this._viewer.camera.lookAt(
      Transform.transformWGS84ToCartesian(this._position),
      new Cesium.HeadingPitchRange(
        this._heading,
        Cesium.Math.toRadians(this._options.pitch || 0),
        this._options.range || 1000
      )
    )
  }
}

export default AroundPoint
