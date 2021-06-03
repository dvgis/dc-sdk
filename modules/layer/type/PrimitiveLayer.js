/**
 * @Author: Caven
 * @Date: 2020-10-11 18:16:47
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Layer from '../Layer'

class PrimitiveLayer extends Layer {
  constructor(id) {
    super(id)
    this._delegate = new Cesium.PrimitiveCollection()
    this._points = this._delegate.add(new Cesium.PointPrimitiveCollection())
    this._labels = this._delegate.add(new Cesium.LabelCollection())
    this._billboards = this._delegate.add(new Cesium.BillboardCollection())
    this._polylines = this._delegate.add(new Cesium.PolylineCollection())
    this.type = Layer.getLayerType('primitive')
    this._state = State.INITIALIZED
  }

  get points() {
    return this._points
  }

  get labels() {
    return this._labels
  }

  get billboards() {
    return this._billboards
  }

  get polylines() {
    return this._polylines
  }

  /**
   * Clears all primitives
   * @returns {PrimitiveLayer}
   */
  clear() {
    this._delegate && this._delegate.removeAll()
    this._points = this._delegate.add(new Cesium.PointPrimitiveCollection())
    this._labels = this._delegate.add(new Cesium.LabelCollection())
    this._billboards = this._delegate.add(new Cesium.BillboardCollection())
    this._polylines = this._delegate.add(new Cesium.PolylineCollection())
    this._cache = {}
    this._state = State.CLEARED
    return this
  }
}

Layer.registerType('primitive')

export default PrimitiveLayer
