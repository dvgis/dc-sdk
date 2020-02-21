/*
 * @Author: Caven
 * @Date: 2020-02-06 13:11:58
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-21 10:28:04
 */
import Cesium from '@/namespace'
import '@/core/overlay/base/DC.Polygon'

DC.CustomPolygon = class extends DC.Polygon {
  constructor(positions) {
    super(positions)
    this._topOutline = undefined
    this._bottomOutline = undefined
    this._topOutline = new Cesium.Entity({
      polyline: {
        positions: this._computePolylinePositions(0)
      },
      show: false
    })
    this._bottomOutline = new Cesium.Entity({
      polyline: {
        positions: this._computePolylinePositions(0)
      },
      show: false
    })
  }

  set show(show) {
    this._show = show
    this._delegate && (this._delegate.show = show)
    this._topOutline && (this._topOutline.show = show)
    this._bottomOutline && (this._bottomOutline.show = show)
  }

  get show() {
    return this._show
  }

  /**
   *
   * @param {*} height
   */
  _computePolylinePositions(height) {
    let positions = this._positions.slice(0)
    positions.push(positions[0])
    positions.forEach(item => {
      item.alt = height
    })
    return DC.T.transformWSG84ArrayToCartesianArray(positions)
  }

  /**
   *
   * @param {*} layer
   */
  _addCallback(layer) {
    this._layer = layer
    this._prepareDelegate()
    if (this._layer && this._layer.delegate && this._layer.delegate.entities) {
      this._layer.delegate.entities.add(this._delegate)
      this._layer.delegate.entities.add(this._topOutline)
      this._layer.delegate.entities.add(this._bottomOutline)
      this._state = DC.OverlayState.ADDED
    }
  }

  /**
   *
   */
  _removeCallback() {
    if (this._layer && this._layer.delegate && this._layer.delegate.entities) {
      this._layer.delegate.entities.remove(this._delegate)
      this._layer.delegate.entities.remove(this._topOutline)
      this._layer.delegate.entities.remove(this._bottomOutline)
      this._state = DC.OverlayState.REMOVED
    }
  }

  /**
   *
   * @param {*} extrudedHeight
   * @param {*} duration
   */
  setExtrudedHeight(extrudedHeight, duration = 0) {
    if (this._delegate.polygon) {
      this._delegate.polygon.extrudedHeight = new Cesium.CallbackProperty(
        time => {
          return extrudedHeight
        }
      )
      if (this._topOutline && this._topOutline.show) {
        this._topOutline.polyline.positions = new Cesium.CallbackProperty(
          time => {
            return this._computePolylinePositions(extrudedHeight)
          }
        )
      }
    }
    return this
  }

  /**
   *
   * @param {*} lineStyle
   */
  setTopOutline(lineStyle) {
    if (this._topOutline) {
      this._topOutline.show = Cesium.defaultValue(lineStyle.show, true)
      delete lineStyle.show
      if (!lineStyle || Object.keys(lineStyle).length === 0) {
        return
      }
      DC.Util.merge(this._topOutline.polyline, lineStyle)
    }
    return this
  }

  /**
   *
   * @param {*} lineStyle
   */
  setBottomOutline(lineStyle) {
    if (this._bottomOutline) {
      this._bottomOutline.show = Cesium.defaultValue(lineStyle.show, true)
      delete lineStyle.show
      if (!lineStyle || Object.keys(lineStyle).length === 0) {
        return
      }
      DC.Util.merge(this._bottomOutline.polyline, lineStyle)
    }
    return this
  }
}
