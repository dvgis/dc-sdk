/*
 * @Author: Caven
 * @Date: 2020-02-13 20:19:54
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-15 16:23:23
 */
import Layer from '@/core/layer/Layer'

const mapv = DC.getNamespace().mapv

DC.MapvDataSet = mapv ? mapv.DataSet : undefined

DC.MapvLayer = class extends Layer {
  constructor(id, option = {}) {
    if (!mapv) {
      throw new Error('miss mapv lib')
    }
    super(id)
    this._option = option
    this._dataSet = undefined
    this._delegate = undefined
    this.type = DC.LayerType.MAPV
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

  /**
   *
   * @param {*} veiwer
   * the layer added handler function
   * subclasses need to be overridden
   */

  _addHandler(viewer) {
    this._viewer = viewer
    this._delegate = new mapv.cesiumMapLayer(
      this._viewer.delegate,
      this._dataSet || new DC.MapvDataSet([]),
      this._option
    )
    viewer.delegate.scene.canvas.setAttribute('tabIndex', 0)
    this._state = DC.LayerState.ADDED
  }

  /**
   * the layer removed handler function
   * subclasses need to be overridden
   */
  _removeHandler() {
    this._delegate && this._delegate.remove()
    this._state = DC.LayerState.REMOVED
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

DC.LayerType.MAPV = 'mapv'
