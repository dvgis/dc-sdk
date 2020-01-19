/*
 * @Author: Caven
 * @Date: 2020-01-03 10:09:19
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-19 10:38:14
 */
import Cesium from '../../namespace'

DC.MouseEventType = {
  CLICK: Cesium.ScreenSpaceEventType.LEFT_CLICK,
  RIGHT_CLICK: Cesium.ScreenSpaceEventType.RIGHT_CLICK,
  DB_CLICK: Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
  MOUSE_MOVE: Cesium.ScreenSpaceEventType.MOUSE_MOVE,
  WHEEL: Cesium.ScreenSpaceEventType.WHEEL
}

DC.ViewerEventType = {
  ADD_LAYER: 'addLayer',
  REMOVE_LAYER: 'removeLayer',
  ADD_IMAGERY_LAYER: 'addImageryLayer',
  CHANGE_IMAGERY_LAYER: 'changeImageryLayer',
  ADD_EFFECT: 'addEffect',
  REMOVE_EFFECT: 'removeEffect'
}

DC.LayerType = {
  VECTOR: 'vector',
  TILESET: 'tileset',
  KML: 'kml',
  CZML: 'czml',
  GEOJSON: 'geojson'
}

DC.LayerEventType = {
  ADD: 'add',
  CLEAR: 'clear',
  REMOVE: 'remove',
  ADD_OVERLAY: 'addOverlay',
  REMOVE_OVERLAY: 'removeOverlay'
}

DC.LayerState = {
  INITIALIZED: 'initialized',
  ADDED: 'added',
  REMOVED: 'removed',
  CLEARED: 'cleared'
}

DC.OverlayType = {
  POINT: 'point',
  POLYLINE: 'polyline',
  POLYGON: 'polygon',
  MODEL: 'model',
  BILLBOARD: 'billboard'
}

DC.OverlayEventType = {
  ADD: 'add',
  REMOVE: 'remove'
}

DC.OverlayState = {
  INITIALIZED: 'initialized',
  ADDED: 'added',
  REMOVED: 'removed'
}

DC.EffectType = {
  RAIN: 'rain',
  SNOW: 'snow'
}

DC.EffectEventType = {
  ADD: 'add',
  REMOVE: 'remove'
}

DC.EffectState = {
  INITIALIZED: 'initialized',
  ADDED: 'added',
  REMOVED: 'removed'
}

DC.WidgetType = {
  Popup: 'Popup',
  ContextMenu: 'ContextMenu'
}

DC.WidgetState = {
  INITIALIZED: 'initialized',
  INSTALLED: 'installed',
  UNINSTALLED: 'uninstalled',
  SHOW: 'show',
  HIDDEN: 'hidden'
}
