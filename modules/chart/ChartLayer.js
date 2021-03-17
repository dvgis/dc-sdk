/**
 * @Author: Caven
 * @Date: 2020-02-02 15:59:37
 */

import State from '@dc-modules/state/State'
import { DomUtil } from '@dc-modules/utils'
import { Layer } from '@dc-modules/layer'

class ChartLayer extends Layer {
  constructor(id, option) {
    super(id)
    this._option = option
    this._delegate = DomUtil.create('div', 'dc-chart')
    this._setWrapperStyle()
    this._chart = undefined
    this.type = Layer.getLayerType('chart')
    this._state = State.INITIALIZED
  }

  get chart() {
    return this._chart
  }

  set show(show) {
    this._show = show
    if (this._delegate) {
      this._delegate.style.visibility = show ? 'visible' : 'hidden'
    }
  }

  get show() {
    return this._show
  }

  /**
   *
   * @private
   */
  _setWrapperStyle() {
    this._delegate.style.position = 'absolute'
    this._delegate.style.top = '0px'
    this._delegate.style.left = '0px'
    this._delegate.style.pointerEvents = 'none'
    this._delegate.setAttribute('id', this._id)
  }

  /**
   *
   * @param viewer
   */
  _onAdd(viewer) {
    if (!viewer || !echarts) {
      return
    }
    this._viewer = viewer
    this._delegate.style.width = viewer.canvas.width + 'px'
    this._delegate.style.height = viewer.canvas.height + 'px'
    viewer.dcContainer.appendChild(this._delegate)
    echarts.viewer = viewer
    viewer.scene.canvas.setAttribute('tabIndex', 0)
    this._chart = echarts.init(this._delegate)
    this._option && this._chart.setOption(this._option)
    this._state = State.ADDED
  }

  /**
   *
   * @private
   */
  _onRemove() {
    if (this._delegate && this._viewer) {
      this._viewer.dcContainer.removeChild(this._delegate)
      this._chart.dispose()
      this._state = State.REMOVED
    }
  }

  /**
   *
   * @param option
   * @returns {ChartLayer}
   */
  setOption(option) {
    this._option = option
    this._chart && this._chart.setOption(this._option)
    return this
  }
}

Layer.registerType('chart')

export default ChartLayer
