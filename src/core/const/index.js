/*
 * @Author: Caven
 * @Date: 2020-01-03 10:09:19
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-29 18:15:18
 */
import Cesium from '@/namespace'

let baseEventType = {
  ADD: 'add',
  REMOVE: 'remove'
}

let baseState = {
  INITIALIZED: 'initialized',
  ADDED: 'added',
  REMOVED: 'removed'
}

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

DC.SceneEventType = {
  CAMERA_MOVE_END: 'cameraMoveEnd',
  CAMERA_CHANGED: 'cameraChanged',
  PRE_RENDER: 'preRender',
  POST_RENDER: 'postRender',
  MORPH_COMPLETE: 'morphComplete',
  CLOCK_TICK: 'clockTick'
}

DC.LayerType = {}

DC.LayerEventType = {
  ...baseEventType,
  ADD_OVERLAY: 'addOverlay',
  REMOVE_OVERLAY: 'removeOverlay',
  CLEAR: 'clear'
}

DC.LayerState = {
  ...baseState,
  CLEARED: 'cleared'
}

DC.OverlayType = {}

DC.OverlayEventType = {
  ...baseEventType
}

DC.OverlayState = {
  ...baseState
}

DC.EffectType = {}

DC.EffectEventType = {
  ...baseEventType
}

DC.EffectState = {
  ...baseState
}

DC.WidgetType = {}

DC.WidgetState = {
  INITIALIZED: 'initialized',
  INSTALLED: 'installed',
  ENABLED: 'enabled',
  DISABLED: 'disabled'
}
