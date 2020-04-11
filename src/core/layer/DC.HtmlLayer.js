/*
 * @Author: Caven
 * @Date: 2020-02-12 21:43:33
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-11 11:44:02
 */

import Cesium from '@/namespace'
import Layer from './Layer'

DC.HtmlLayer = class extends Layer {
  constructor(id) {
    super(id)
    this._delegate = DC.DomUtil.create('div', 'html-layer')
    this._delegate.setAttribute('id', this._id)
    this._state = DC.LayerState.INITIALIZED
    this.type = DC.LayerType.HTML
    this._renderRemoveCallback = undefined
  }

  set show(show) {
    this._show = show
    this._delegate.style.visibility = this._show ? 'visible' : 'hidden'
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
    this._viewer.dcContainer.appendChild(this._delegate)
    let scene = this._viewer.scene
    this._renderRemoveCallback = scene.postRender.addEventListener(() => {
      this.eachOverlay(item => {
        if (item && item.position) {
          let windowCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            scene,
            DC.T.transformWSG84ToCartesian(item.position)
          )
          windowCoord && item._updateWindowCoord(windowCoord)
        }
      })
    }, this)
    this._state = DC.LayerState.ADDED
  }

  /**
   * the layer removed handler function
   * subclasses need to be overridden
   */
  _removeHandler() {
    this._renderRemoveCallback && this._renderRemoveCallback()
    this._viewer.dcContainer.removeChild(this._delegate)
    this._state = DC.LayerState.REMOVED
  }

  clear() {
    this._cache = {}
    let childs = this._delegate.childNodes
    for (let i = childs.length - 1; i >= 0; i--) {
      this._delegate.removeChild(childs[i])
    }
    this._state = DC.LayerState.CLEARED
    return this
  }
}

DC.LayerType.HTML = 'html'
