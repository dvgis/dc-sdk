/*
 * @Author: Caven
 * @Date: 2020-01-15 19:17:52
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-10 13:24:04
 */
import Cesium from '@/namespace'

class Widget {
  constructor() {
    this._viewer = undefined
    this._position = undefined
    this._enable = false
    this._wrapper = undefined
    this._positionChangeAble = false
    this._state = DC.WidgetState.INSTALLED
    this.type = undefined
  }

  set enable(enable) {
    this._enable = enable
    this._state = this._enable
      ? DC.WidgetState.ENABLED
      : DC.WidgetState.DISABLED
    this._enableHook && this._enableHook()
  }

  get enable() {
    return this._enable
  }

  get state() {
    return this._state
  }

  /**
   * When enable modifies the hook executed, the subclass copies it as required
   */
  _enableHook() {
    if (!this._wrapper.parentNode && this._viewer) {
      this._wrapper && this._viewer.dcContainer.appendChild(this._wrapper)
    }
    this._wrapper &&
      (this._wrapper.style.visibility = this._enable ? 'visible' : 'hidden')
  }

  /**
   * updating the Widge location requires subclass overrides
   * @param {*} windowCoord
   */
  _updateWindowCoord(windowCoord) {}

  /**
   *
   */
  _installHook() {}

  /**
   *
   * @param {*} viewer
   *
   */
  install(viewer) {
    this._viewer = viewer
    this._state = DC.WidgetState.INSTALLED
    /**
     *  add postRender Listener
     */
    if (this._viewer && this._wrapper && this._positionChangeAble) {
      let self = this
      let scene = this._viewer.scene
      scene.postRender.addEventListener(() => {
        if (
          self._position &&
          self._enable &&
          self._updateWindowCoord &&
          self._wrapper.style.visibility === 'visible'
        ) {
          let windowCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            scene,
            self._position
          )
          windowCoord && self._updateWindowCoord(windowCoord)
        }
      })
    }

    /**
     * excute installHook
     */
    this._installHook && this._installHook()
  }

  /**
   * Setting widget content
   * @param {*} content
   */
  setContent(content) {
    if (content && typeof content === 'string') {
      this._wrapper.innerHTML = content
    } else if (content && content instanceof Element) {
      this._wrapper.appendChild(content)
    }
    return this
  }

  /**
   * hide widget
   */
  hide() {
    this._wrapper &&
      (this._wrapper.style.cssText = `
    visibility:hidden;
    `)
  }
}

export default Widget
