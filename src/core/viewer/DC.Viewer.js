/*
 * @Author: Caven
 * @Date: 2019-12-27 17:13:24
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-15 20:53:39
 */

import Cesium from '../../namespace'
import ViewerStyle from '../style/ViewerStyle'
import MouseEvent from '../event/MouseEvent'
import ViewerEvent from '../event/ViewerEvent'
import Popup from '../widget/Popup'
import ContextMenu from '../widget/ContextMenu'

const DEF_OPTS = {
  animation: false, //是否创建动画小器件，左下角仪表
  baseLayerPicker: false, //是否显示图层选择器
  fullscreenButton: false, //是否显示全屏按钮
  geocoder: false, //是否显示geocoder小器件，右上角查询按钮
  homeButton: false, //是否显示Home按钮
  infoBox: false, //是否显示信息框
  sceneModePicker: false, //是否显示3D/2D选择器
  selectionIndicator: false, //是否显示选取指示器组件
  timeline: false, //是否显示时间轴
  navigationHelpButton: false, //是否显示右上角的帮助按钮
  navigationInstructionsInitiallyVisible: false
}

DC.Viewer = class {
  constructor(id, options = {}) {
    if (!id) {
      throw Error('the id empty')
    }
    this._delegate = new Cesium.Viewer(id, {
      ...options,
      ...DEF_OPTS
    }) // 初始化 viewer
    new MouseEvent(this) // 注册全局鼠标事件
    this._style = new ViewerStyle(this) // 设置viewer样式
    this._viewerEvent = new ViewerEvent() //注册viewer事件
    this._dcContainer = DC.DomUtil.create(
      'div',
      'dc-container',
      document.getElementById(id)
    ) //添加自定义容器
    this._layerCache = {}
    this.on(
      DC.ViewerEventType.ADD_IMAGERY_LAYER,
      this._addImageryLayerCallback,
      this
    )
    this.on(
      DC.ViewerEventType.CHANGE_IMAGERY_LAYER,
      this._changeImageryLayerCallback,
      this
    )
    this.on(DC.ViewerEventType.ADD_LAYER, this._addLayerCallback, this) //添加图层事件监听
    this.on(DC.ViewerEventType.REMOVE_LAYER, this._removeLayerCallback, this) //移除图层事件监听
    this.on(DC.ViewerEventType.ADD_EFFECT, this._addEffectCallback, this) //添加效果事件监听
    this.on(DC.ViewerEventType.REMOVE_EFFECT, this._removeEffectCallback, this) //移除效果事件监听
    //添加默认组件
    this._popup = new Popup()
    this._contextMenu = new ContextMenu()
    this.use(this._popup).use(this._contextMenu)
  }

  get delegate() {
    return this._delegate
  }

  get dcContainer() {
    return this._dcContainer
  }

  get scene() {
    return this._delegate.scene
  }

  get camera() {
    return this._delegate.camera
  }

  get canvas() {
    return this._delegate.scene.canvas
  }

  get viewerEvent() {
    return this._viewerEvent
  }

  get popup() {
    return this._popup
  }

  get contextMenu() {
    return this._contextMenu
  }

  _addImageryLayerCallback(imagerLayer) {}

  _changeImageryLayerCallback(index) {}

  _addLayerCallback(layer) {
    if (layer && layer.layerEvent && layer.state !== DC.LayerState.ADDED) {
      !this._layerCache[layer.type] && (this._layerCache[layer.type] = {})
      layer.layerEvent.fire(DC.LayerEventType.ADD, this)
      this._layerCache[layer.type][layer.id] = layer
    }
  }

  _removeLayerCallback(layer) {
    if (layer && layer.layerEvent && layer.state !== DC.LayerState.REMOVED) {
      layer.layerEvent.fire(DC.LayerEventType.REMOVE, this)
      if (
        this._layerCache[layer.type] &&
        this._layerCache[layer.type][layer.id]
      ) {
        delete this._layerCache[layer.type][layer.id]
      }
    }
  }

  _addEffectCallback(effect) {}

  _removeEffectCallback(effect) {}

  setStyle(style = {}) {}

  addLayer(layer) {
    this._viewerEvent.fire(DC.ViewerEventType.ADD_LAYER, layer)
    return this
  }

  removeLayer(layer) {
    this._viewerEvent.fire(DC.ViewerEventType.ADD_LAYER, layer)
    return this
  }

  getLayer(id) {
    let layer = undefined
    for (let type in this._layerCache) {
      let cache = this._layerCache[type]
      for (let layerId in cache) {
        if (layerId === id) {
          layer = cache[layerId]
          break
        }
      }
      if (layer) {
        break
      }
    }
    return layer
  }

  eachLayer(method, context) {
    for (let type in this._layerCache) {
      let cache = this._layerCache[type]
      for (let layerId in cache) {
        method.call(context, cache[layerId])
      }
    }
  }

  addEffect(effect) {}

  removeEffect(effect) {}

  flyTo(target) {
    this._delegate.flyTo(target.delegate || target)
    return this
  }

  zoomTo(target) {
    this._delegate.zoomTo(target.delegate || target)
    return this
  }

  flyToPosition(position, completeCallback) {
    if (position instanceof DC.Position) {
      this._delegate.flyTo({
        destination: DC.T.transformWSG84ToCartesian(position),
        orientation: {
          heading: Cesium.Math.toRadians(position.heading),
          pitch: Cesium.Math.toRadians(position.pitch),
          roll: Cesium.Math.toRadians(position.roll)
        },
        complete: completeCallback
      })
    }
    return this
  }

  on(type, callback, context) {
    this._viewerEvent.on(type, callback, context)
    return this
  }

  off(type, callback, context) {
    this._viewerEvent.off(type, callback, context)
    return this
  }

  use(plugin) {
    if (plugin && plugin.install) {
      plugin.install(this)
    }
    return this
  }
}
