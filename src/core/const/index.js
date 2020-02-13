/*
 * @Author: Caven
 * @Date: 2020-01-03 10:09:19
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-12 23:59:29
 */
import Cesium from '@/namespace'

DC.MouseEventType = {
  CLICK: Cesium.ScreenSpaceEventType.LEFT_CLICK,
  RIGHT_CLICK: Cesium.ScreenSpaceEventType.RIGHT_CLICK,
  DB_CLICK: Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
  MOUSE_MOVE: Cesium.ScreenSpaceEventType.MOUSE_MOVE,
  WHEEL: Cesium.ScreenSpaceEventType.WHEEL,
  MOUSE_OVER: 'mouseover',
  MOUSE_OUT: 'mouseout'
}

DC.ViewerEventType = {
  ADD_LAYER: 'addLayer',
  REMOVE_LAYER: 'removeLayer',
  ADD_EFFECT: 'addEffect',
  REMOVE_EFFECT: 'removeEffect'
}

DC.LayerType = {
  VECTOR: 'vector',
  TILESET: 'tileset',
  CLUSTER: 'cluster',
  GEOJSON: 'geojson',
  KML: 'kml',
  CZML: 'czml',
  HTML: 'html',
  HEAT: 'heat'
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
  BILLBOARD: 'billboard',
  CIRCLE: 'circle',
  RECT: 'rect',
  LABEL: 'label'
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
  POPUP: 'Popup',
  CONTEXT_MENU: 'ContextMenu',
  TOOL_TIP: 'Tooltip',
  MAPSWITCH: 'MapSwitch'
}

DC.WidgetState = {
  INITIALIZED: 'initialized',
  INSTALLED: 'installed',
  ENABLED: 'enabled',
  DISABLED: 'disabled'
}
