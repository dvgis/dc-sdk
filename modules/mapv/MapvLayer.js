/**
 * @Author: Caven
 * @Date: 2020-09-19 13:26:20
 */

import { mapv } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import { Layer } from '@dc-modules/layer'

class MapvLayer extends Layer {
  constructor(id, option = {}) {
    if (!mapv) {
      throw new Error('MapvLayer：miss mapv lib')
    }
    super(id)
    this._option = option
    this._dataSet = undefined
    this._delegate = undefined
    this.type = Layer.getLayerType('mapv')
  }

  set show(show) {
    this._show = show
    if (this._delegate) {
      this._show ? this._delegate.show() : this._delegate.hide()
    }
  }

  get show() {
    return this._show
  }

  get state() {
    return this._state
  }

  /**
   *
   * @param {*} viewer
   * the layer added handler function
   * subclasses need to be overridden
   */
  _onAdd(viewer) {
    this._viewer = viewer
    this._delegate = new mapv.cesiumMapLayer(
      this._viewer.delegate,
      this._dataSet || new mapv.DataSet([]),
      this._option
    )
    viewer.scene.canvas.setAttribute('tabIndex', 0)
    this._state = State.ADDED
  }

  /**
   * the layer removed handler function
   * subclasses need to be overridden
   */
  _onRemove() {
    this._delegate && this._delegate.remove()
    this._state = State.REMOVED
  }

  /**
   *
   * @param {*} dataSet
   */
  setDataSet(dataSet) {
    this._dataSet = dataSet
    this._delegate &&
      this._delegate.update({ data: this._dataSet, option: this._option })
  }
}

Layer.registerType('mapv')

export default MapvLayer
