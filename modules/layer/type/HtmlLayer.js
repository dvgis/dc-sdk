/**
 * @Author: Caven
 * @Date: 2020-02-12 21:43:33
 */
import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import { DomUtil } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Layer from '../Layer'

class HtmlLayer extends Layer {
  constructor(id) {
    super(id)
    this._delegate = DomUtil.create('div', 'html-layer', undefined)
    this._delegate.setAttribute('id', this._id)
    this._renderRemoveCallback = undefined
    this.type = Layer.getLayerType('html')
    this._state = State.INITIALIZED
  }

  set show(show) {
    this._show = show
    this._delegate.style.visibility = this._show ? 'visible' : 'hidden'
    this._cache.keys().forEach(key => {
      this._cache[key].show = show
    })
    return this
  }

  get show() {
    return this._show
  }

  /**
   * add handler
   * @param viewer
   * @private
   */
  _onAdd(viewer) {
    this._viewer = viewer
    this._viewer.dcContainer.appendChild(this._delegate)
    let scene = this._viewer.scene
    this._renderRemoveCallback = scene.postRender.addEventListener(() => {
      let cameraPosition = this._viewer.camera.positionWC
      this.eachOverlay(item => {
        if (item && item.position) {
          let position = Transform.transformWGS84ToCartesian(item.position)
          let windowCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            scene,
            position
          )
          let distance = Cesium.Cartesian3.distance(position, cameraPosition)
          item._updateStyle({ transform: windowCoord }, distance)
        }
      }, this)
    }, this)
    this._state = State.ADDED
  }

  /**
   * remove handler
   * @returns {boolean}
   * @private
   */
  _onRemove() {
    this._renderRemoveCallback && this._renderRemoveCallback()
    this._viewer.dcContainer.removeChild(this._delegate)
    this._state = State.REMOVED
  }

  /**
   * Clears all divIcons
   * @returns {HtmlLayer}
   */
  clear() {
    while (this._delegate.hasChildNodes()) {
      this._delegate.removeChild(this._delegate.firstChild)
    }
    this._cache = {}
    this._state = State.CLEARED
    return this
  }
}

Layer.registerType('html')

export default HtmlLayer
