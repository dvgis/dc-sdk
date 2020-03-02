/*
 * @Author: Caven
 * @Date: 2020-01-15 19:17:52
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-02 16:36:39
 */
import Cesium from '@/namespace'

class Widget {
  constructor() {
    this._viewer = undefined
    this._position = undefined
    this._enable = false
    this._wapper = undefined
    this._state = DC.WidgetState.INSTALLED
    this.type = undefined
  }

  set enable(enable) {
    this._enable = enable
    this._state = this._enable
      ? DC.WidgetState.ENABLED
      : DC.WidgetState.DISABLED
  }

  get enable() {
    return this._enable
  }

  get state() {
    return this._state
  }

  /**
   *
   * @param {*} windowCoord
   * 更新 Widge 位置需要子类覆盖
   */
  _updateWindowCoord(windowCoord) {}

  /**
   *
   * @param {*} viewer
   */
  install(viewer) {
    this._viewer = viewer
    this._wapper && this._viewer.dcContainer.appendChild(this._wapper)
    this._state = DC.WidgetState.INSTALLED
    /**
     *  add postRender Listener
     */
    if (this._viewer && this._wapper) {
      let self = this
      let scene = this._viewer.scene
      scene.postRender.addEventListener(() => {
        if (
          self._position &&
          self._enable &&
          self._updateWindowCoord &&
          self._wapper.style.visibility === 'visible'
        ) {
          let windowCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            scene,
            self._position
          )
          self._updateWindowCoord(windowCoord)
        }
      })
    }
    /**
     * excute installHook
     */
    this._installHook && this._installHook()
  }

  /**
   *
   * @param {*} position
   */
  setPosition(position) {
    this._position = position
    this._wapper &&
      (this._wapper.style.cssText = `
    visibility:visible;
    `)
    return this
  }

  /**
   *
   * @param {*} content
   */
  setContent(content) {
    if (content && typeof content === 'string') {
      this._wapper.innerHTML = content
    } else if (content && content instanceof Element) {
      this._wapper.appendChild(content)
    }
    return this
  }

  /**
   *
   */
  hide() {
    this._wapper &&
      (this._wapper.style.cssText = `
    visibility:hidden;
    `)
  }
}

export default Widget
