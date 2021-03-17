/**
 * @Author: Caven
 * @Date: 2020-11-30 20:19:19
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import { Util } from '@dc-modules/utils'

const IMG = require('@dc-modules/images/cloud.jpg')

class Cloud {
  constructor() {
    this._id = Util.uuid()
    this._viewer = undefined
    this._delegate = undefined
    this._rotateAmount = 0
    this._enable = false
    this.type = 'cloud'
    this._heading = 0
    this._state = State.INITIALIZED
  }

  set enable(enable) {
    if (!this._viewer.scene.mode === Cesium.SceneMode.SCENE3D) {
      return this
    }
    this._enable = this._delegate.show = enable
    if (this._enable) {
      this._viewer.scene.postUpdate.addEventListener(this._onRotate, this)
    } else {
      this._viewer.scene.postUpdate.removeEventListener(this._onRotate, this)
    }
    return this
  }

  get enable() {
    return this._enable
  }

  set rotateAmount(rotateAmount) {
    this._rotateAmount = rotateAmount
    return this
  }

  get rotateAmount() {
    return this._rotateAmount
  }

  /**
   *
   * @param scene
   * @param time
   * @private
   */
  _onRotate(scene, time) {
    if (this._rotateAmount === 0) {
      return
    }
    this._heading += this._rotateAmount
    if (this._heading >= 360 || this._heading <= -360) {
      this._heading = 0
    }
    this._delegate.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
      new Cesium.Cartesian3(),
      new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(this._heading), 0, 0)
    )
  }

  /**
   *
   * @private
   */
  _createPrimitive() {
    this._delegate = new Cesium.Primitive({
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material: new Cesium.Material({
          fabric: {
            type: 'Image',
            uniforms: {
              color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
              image: IMG
            },
            components: {
              alpha:
                'texture2D(image, fract(repeat * materialInput.st)).r * color.a',
              diffuse: 'vec3(1.0)'
            },
            translucent: true,
            aboveGround: true
          }
        })
      })
    })
    this._delegate.geometryInstances = new Cesium.GeometryInstance({
      geometry: new Cesium.EllipsoidGeometry({
        vertexFormat: Cesium.VertexFormat.POSITION_AND_ST,
        radii: this._viewer.scene.globe.ellipsoid.radii
      }),
      id: this._id
    })
    this._delegate.show = this._enable
    this._viewer.scene.primitives.add(this._delegate)
  }

  /**
   *
   * @param viewer
   * @returns {Cloud}
   */
  addTo(viewer) {
    if (!viewer) {
      return this
    }
    this._viewer = viewer
    this._createPrimitive()
    this._state = State.ADDED
    return this
  }
}

export default Cloud
