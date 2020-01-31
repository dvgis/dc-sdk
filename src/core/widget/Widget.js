/*
 * @Author: Caven
 * @Date: 2020-01-15 19:17:52
 * @Last Modified by: Caven
<<<<<<< HEAD
 * @Last Modified time: 2020-01-15 20:14:22
 */
=======
 * @Last Modified time: 2020-01-21 12:13:45
 */
import Cesium from '@/namespace'

>>>>>>> 816784032383a4443bfb8de96a7b70447d385628
class Widget {
  constructor() {
    this._viewer = undefined
    this._position = undefined
    this._show = false
    this._wapper = undefined
    this._windowCoord = undefined
    this._state = undefined
    this.type = undefined
  }

  /**
   *
   * @param {*} windowCoord
   * 更新Widget位置需要子类覆盖
   */
  _updateWindowCoord(windowCoord) {}

  /**
   *
   * @param {*} viewer
   */
  setPosition(position) {
    this._position = position
    if (this._viewer) {
      let self = this
      let scene = this._viewer.scene
<<<<<<< HEAD
      scene.preRender.addEventListener(() => {
        let windowCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          scene,
          self._position
        )
=======
      scene.postRender.addEventListener(() => {
        let windowCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, self._position)
>>>>>>> 816784032383a4443bfb8de96a7b70447d385628
        this._setWindowCoord(windowCoord)
      })
    }
  }

  /**
   *
   * @param {*} viewer
   */
  install(viewer) {
    this._viewer = viewer
    this._wapper && this._viewer.dcContainer.appendChild(this._wapper)
    this._state = DC.WidgetState.INSTALLED
  }

  /**
   *
   * @param {*} position
   * 显示组件
   */
  show(position) {
    this._show = true
    position && position instanceof DC.Position && this.setPosition(position)
    this._wapper && (this._wapper.style.visibility = 'visible')
    this._state = DC.WidgetState.SHOW
  }

  /**
   * 隐藏组件
   */
  hide() {
    this._show = false
    this._wapper && (this._wapper.style.visibility = 'hidden')
    this._state = DC.WidgetState.HIDDEN
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
  }
}

export default Widget
