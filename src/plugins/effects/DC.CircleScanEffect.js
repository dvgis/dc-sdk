/*
 * @Author: Caven
 * @Date: 2020-02-24 14:11:22
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-28 23:23:10
 */

import Cesium from '@/namespace'
import Effect from './Effect'

let CircleScanShader = require('../shader/CircleScanShader.glsl')

DC.CircleScanEffect = class extends Effect {
  constructor(id, position, radius, color, duration) {
    if (!position || !(position instanceof DC.Position)) {
      throw new Error('the position invalid')
    }
    super(id)
    this._position = position
    this._radius = radius || 0
    this._color = Cesium.defaultValue(color, Cesium.Color.RED)
    this._duration = Cesium.defaultValue(duration, 1) * 1e3
    this._state = DC.EffectState.INITIALIZED
    this.type = DC.EffectType.CIRCLE_SCAN
  }

  /**
   * 准备代理
   */
  _prepareDelegate() {
    let cartesian3Center = DC.T.transformWSG84ToCartesian(this._position)
    let cartesian4Center = new Cesium.Cartesian4(
      cartesian3Center.x,
      cartesian3Center.y,
      cartesian3Center.z,
      1
    )
    let cartesian3Center1 = DC.T.transformWSG84ToCartesian(
      new DC.Position(
        this._position.lng,
        this._position.lat,
        this._position.alt + 500
      )
    )
    let cartesian4Center1 = new Cesium.Cartesian4(
      cartesian3Center1.x,
      cartesian3Center1.y,
      cartesian3Center1.z,
      1
    )

    let _time = new Date().getTime()
    this._delegate = new Cesium.PostProcessStage({
      name: this._id,
      fragmentShader: CircleScanShader,
      uniforms: {
        u_scanCenterEC: () => {
          return Cesium.Matrix4.multiplyByVector(
            this._viewer.delegate.camera._viewMatrix,
            cartesian4Center,
            new Cesium.Cartesian4()
          )
        },
        u_scanPlaneNormalEC: () => {
          let temp = Cesium.Matrix4.multiplyByVector(
            this._viewer.delegate.camera._viewMatrix,
            cartesian4Center,
            new Cesium.Cartesian4()
          )
          let temp1 = Cesium.Matrix4.multiplyByVector(
            this._viewer.delegate.camera._viewMatrix,
            cartesian4Center1,
            new Cesium.Cartesian4()
          )
          let _scratchCartesian3Normal = new Cesium.Cartesian3()
          _scratchCartesian3Normal.x = temp1.x - temp.x
          _scratchCartesian3Normal.y = temp1.y - temp.y
          _scratchCartesian3Normal.z = temp1.z - temp.z
          Cesium.Cartesian3.normalize(
            _scratchCartesian3Normal,
            _scratchCartesian3Normal
          )
          return _scratchCartesian3Normal
        },
        u_radius: () => {
          return (
            (this._radius * ((new Date().getTime() - _time) % this._duration)) /
            this._duration
          )
        },
        u_scanColor: this._color
      }
    })
  }
}
