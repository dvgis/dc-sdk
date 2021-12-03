/**
 * @Author: Caven
 * @Date: 2020-02-27 00:35:35
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import { Layer } from '@dc-modules/layer'
import { createWebGLHeatmap } from './webgl-heatmap'

const WMP = new Cesium.WebMercatorProjection()

const DEF_OPTS = {
  radius: 30,
  height: 0,
  gradient: undefined,
  useGround: false,
  classificationType: 2
}

class HeatLayer extends Layer {
  constructor(id, options = {}) {
    super(id)
    this._options = {
      ...DEF_OPTS,
      ...options
    }
    this._isGround = this._options.useGround
    this._canvas = document.createElement('canvas')
    this._canvas.setAttribute('id', id)
    this._heat = undefined
    this._mRect = undefined
    this._rect = new Cesium.Rectangle()
    this._delegate = new Cesium.PrimitiveCollection()
    this._primitive = this._delegate.add(
      this._isGround
        ? new Cesium.GroundPrimitive({
            geometryInstances: new Cesium.GeometryInstance({
              geometry: {}
            }),
            classificationType: this._options.classificationType
          })
        : new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
              geometry: {}
            })
          })
    )
    this._scale = 1
    this._points = []
    this._positions = []
    this._state = State.INITIALIZED
  }

  get type() {
    return Layer.getLayerType('heat')
  }

  /**
   *
   * @private
   */
  _addedHook() {
    this._canvas.style.cssText = `
      visibility:hidden;
      width:${this._viewer.canvas.width}px;
      height:${this._viewer.canvas.height}px;
    `
    this._viewer.dcContainer.appendChild(this._canvas)
  }

  /**
   *
   * @returns {HTMLCanvasElement|undefined}
   * @private
   */
  _createGradientTexture() {
    if (!this._options.gradient) {
      return undefined
    }
    let canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 10
    let ctx = canvas.getContext('2d')
    let grd = ctx.createLinearGradient(0, 0, 200, 0)
    for (let key in this._options.gradient) {
      grd.addColorStop(+key, this._options.gradient[key])
    }
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, 200, 10)
    return canvas
  }

  /**
   *
   * @param position
   * @returns {{intensity: number, size: (*|number), x: number, y: number}}
   * @private
   */
  _parsePosition(position) {
    let point = WMP.project(
      Cesium.Cartographic.fromDegrees(position.lng, position.lat)
    )
    return {
      x: (point.x - this._mRect.west) / this._scale,
      y: (point.y - this._mRect.south) / this._scale,
      size: this._options.radius,
      intensity: position.value || Math.random()
    }
  }

  /**
   *
   * @param positions
   * @returns {*}
   * @private
   */
  _parsePositions(positions) {
    return positions.map(this._parsePosition.bind(this))
  }

  /**
   *
   * @private
   */
  _setRect() {
    Cesium.Rectangle.fromCartographicArray(
      this._positions.map(item =>
        Cesium.Cartographic.fromDegrees(item.lng, item.lat)
      ),
      this._rect
    )
  }

  /**
   *
   * @returns {{east, south, north, west}}
   * @private
   */
  _getMRect() {
    let mSouthwest = WMP.project(Cesium.Rectangle.southwest(this._rect))
    let mNortheast = WMP.project(Cesium.Rectangle.northeast(this._rect))
    return {
      west: mSouthwest.x,
      south: mSouthwest.y,
      east: mNortheast.x,
      north: mNortheast.y
    }
  }

  /**
   *
   * @returns {boolean}
   * @private
   */
  _update() {
    if (!this._points || !this._points.length) {
      return false
    }
    this._heat.adjustSize()
    this._heat.update()
    this._heat.display()
    if (this._primitive && this._primitive.geometryInstances) {
      this._primitive.geometryInstances.geometry = new Cesium.RectangleGeometry(
        {
          rectangle: this._rect,
          height: this._options.height
        }
      )
    }
    this._primitive.appearance = new Cesium.MaterialAppearance({
      material: new Cesium.Material({
        fabric: {
          type: 'Heat-Image',
          uniforms: {
            image: this._canvas
          },
          source: `
             uniform sampler2D image;
             czm_material czm_getMaterial(czm_materialInput materialInput){
               czm_material material = czm_getDefaultMaterial(materialInput);
               vec2 st = materialInput.st;
               vec4 colorImage = texture2D(image,st);
               if(colorImage.rgb == vec3(1.0) || colorImage.rgb == vec3(0.0)){
                  discard;
               }
               material.diffuse = colorImage.rgb;
               material.alpha = colorImage.a;
               return material;
             }
            `
        },
        translucent: function(material) {
          return true
        }
      }),
      flat: true
    })
  }

  /**
   *
   * @param positions
   */
  setPositions(positions) {
    this._positions = positions
    this._setRect()
    let mRect = this._getMRect()
    if (
      !this._mRect ||
      !mRect.west === this._mRect.west ||
      !mRect.south === this._mRect.south ||
      !mRect.east === this._mRect.east ||
      !mRect.north === this._mRect.north
    ) {
      this._mRect = mRect
      this._heat = createWebGLHeatmap({
        canvas: this._canvas,
        gradientTexture: this._createGradientTexture()
      })
      this._scale = Math.min(
        Math.abs(this._mRect.west - this._mRect.east) / this._canvas.width,
        Math.abs(this._mRect.north - this._mRect.south) / this._canvas.height
      )
    }
    this._points = this._parsePositions(this._positions)
    if (this._heat) {
      this._heat.blur()
      this._heat.addPoints(this._points)
      this._update()
    }
    return this
  }

  /**
   *
   * @param position
   */
  addPosition(position) {
    this._positions.push(position)
    this._setRect()
    let mRect = this._getMRect()
    if (
      !this._mRect ||
      !mRect.west === this._mRect.west ||
      !mRect.south === this._mRect.south ||
      !mRect.east === this._mRect.east ||
      !mRect.north === this._mRect.north
    ) {
      this._mRect = mRect
      this._heat = createWebGLHeatmap({
        canvas: this._canvas,
        gradientTexture: this._createGradientTexture()
      })
      this._scale = Math.min(
        Math.abs(this._mRect.west - this._mRect.east) / this._canvas.width,
        Math.abs(this._mRect.north - this._mRect.south) / this._canvas.height
      )
      this._heat.addPoints(this._points)
    }
    let point = this._parsePosition(position)
    this._points.push(point)
    if (this._heat) {
      this._heat.addPoint(point.x, point.y, point.size, point.intensity)
      this._update()
    }
    return this
  }
}

Layer.registerType('heat')

export default HeatLayer
