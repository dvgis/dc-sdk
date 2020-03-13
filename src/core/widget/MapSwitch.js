/*
 * @Author: Caven
 * @Date: 2020-02-11 18:34:46
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-12 17:57:28
 */
import Widget from './Widget'

class MapSwitch extends Widget {
  constructor() {
    super()
    this._wapper = DC.DomUtil.create('div', 'dc-map-switch')
    this._config = undefined
    this._cache = []
    this.type = DC.WidgetType.MAPSWITCH
  }

  /**
   * 当enable修改后执行的钩子，子类根据需求复写
   */
  _enableHook() {
    if (!this._wapper.parentNode && this._viewer) {
      this._wapper && this._viewer.dcContainer.appendChild(this._wapper)
    }
  }

  _installHook() {
    this.enable = true
    let self = this
    this._wapper.onmouseover = () => {
      let width = 80
      if (self._cache.length > 0) {
        width = self._cache.length * 85.7
      }
      this._wapper.style.width = `${width}px`
    }
    this._wapper.onmouseout = () => {
      self._wapper.style.width = `80px`
    }
  }

  _addItem(map) {
    let mapEl = DC.DomUtil.create('div', 'map-item', this._wapper)
    let index = this._cache.length ? this._cache.length - 1 : 0
    mapEl.setAttribute('data-index', index)
    mapEl.onclick = e => {
      let old = document.getElementsByClassName('map-item active')
      if (old && old.length) {
        old[0].className = 'map-item'
      }
      if (this._viewer) {
        e.target.className = 'map-item active'
        this._viewer.changeBaseLayer(
          Number(e.target.getAttribute('data-index') || 0)
        )
      }
    }
    if (map.iconUrl) {
      mapEl.style.cssText = `
       background:url(${map.iconUrl});
    `
    }
    let span = DC.DomUtil.create('span', '', mapEl)
    span.innerHTML = map.name || '地图'
  }

  addMap(map = {}) {
    if (this._enable) {
      this._cache.push(map)
      this._addItem(map)
      if (this._cache.length > 1) {
        this._wapper.style.visibility = 'visible'
      }
    }
  }
}

DC.WidgetType.MAPSWITCH = 'mapswitch'

export default MapSwitch
