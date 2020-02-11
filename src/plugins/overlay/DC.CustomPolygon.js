/*
 * @Author: Caven
 * @Date: 2020-02-06 13:11:58
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-06 20:46:58
 */
import Cesium from '@/namespace'
import '../../core/overlay/base/DC.Polygon'

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
    this._bottomOutline && (this._bottomOutline = show)
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
  setExtrudedHeight(extrudedHeight, duration) {
    if (this._delegate.polygon) {
      let now = Cesium.JulianDate.now()
      let oriValue = this._delegate.polygon.extrudedHeight
        ? this._delegate.polygon.extrudedHeight.getValue(now)
        : 0
      let rate = 0
      let stopTime = now
      if (duration) {
        rate = (extrudedHeight - oriValue) / duration
        stopTime = DC.JulianDate.addSeconds(
          now,
          duration,
          new Cesium.JulianDate()
        )
      }
      this._delegate.polygon.extrudedHeight = new Cesium.CallbackProperty(
        time => {
          let result = 0
          if (Cesium.JulianDate.greaterThan(stopTime, time)) {
            result =
              oriValue +
              (duration - Cesium.JulianDate.secondsDifference(stopTime, time)) *
                rate
          } else {
            result = extrudedHeight
          }
          return result
        }
      )
      if (this._topOutline && this._topOutline.show) {
        this._topOutline.polyline.positions = new Cesium.CallbackProperty(
          time => {
            let result = []
            if (Cesium.JulianDate.greaterThan(stopTime, time)) {
              result = this._computePolylinePositions(
                oriValue +
                  (duration -
                    Cesium.JulianDate.secondsDifference(stopTime, time)) *
                    rate
              )
            } else {
              result = this._computePolylinePositions(extrudedHeight)
            }
            return result
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
      this._topOutline.show = true
      this._topOutline.polyline.merge(lineStyle)
    }
    return this
  }

  /**
   *
   * @param {*} lineStyle
   */
  setBottomOutline(lineStyle) {
    if (this._bottomOutline) {
      this._bottomOutline.show = true
      this._bottomOutline.polyline.merge(lineStyle)
    }
    return this
  }
}
