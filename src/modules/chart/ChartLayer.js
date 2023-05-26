/**
 @author : Caven Chen
 @date : 2023-05-23
 */

import { echarts } from '../../namespace'
import { Layer } from '../layer'
const { init } = echarts

class ChartLayer extends Layer {
  constructor(id, viewer) {
    super(id)
    this._viewer.canvas.setAttribute('tabIndex', '0')
    this._chartEl = this._createChartElement()
    this._chart = init(this._chartEl)
    this._show = true
    Object(this._chart.getZr()).viewer = viewer
  }

  get id() {
    return this._id
  }

  set show(show) {
    this._show = show
    this._chartEl.style.visibility = show ? 'visible' : 'hidden'
  }

  get show() {
    return this._show
  }

  /**
   *
   * @returns {HTMLDivElement}
   * @private
   */
  _createChartElement() {
    let canvas = this._viewer.scene.canvas
    let el = document.createElement('div')
    el.setAttribute('id', this._id)
    el.style.cssText = `position:absolute; top:0; left:0; width: ${canvas.clientWidth}px; height: ${canvas.clientHeight}px;pointer-events:none;`
    this._viewer.container.appendChild(el)
    return el
  }

  /**
   *
   * @param option
   * @returns {ChartLayer}
   */
  setOption(option = {}) {
    this._chart.setOption({ ...option, GLMap: {}, animation: false })
    return this
  }

  /**
   *
   * @returns {ChartLayer}
   */
  clear() {
    this._chart.clear()
    return this
  }

  /**
   *
   * @returns {ChartLayer}
   */
  resize() {
    this._chart.resize()
    return this
  }
}

export default ChartLayer
