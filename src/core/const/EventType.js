/*
 * @Author: Caven
 * @Date: 2020-04-10 17:02:28
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-10 17:07:09
 */
import Cesium from '@/namespace'

const baseEventType = {
  ADD: 'add',
  REMOVE: 'remove'
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

DC.LayerEventType = {
  ...baseEventType,
  ADD_OVERLAY: 'addOverlay',
  REMOVE_OVERLAY: 'removeOverlay',
  CLEAR: 'clear'
}

DC.OverlayEventType = {
  ...baseEventType
}

DC.EffectEventType = {
  ...baseEventType
}

DC.RoamingEventType = {
  ...baseEventType,
  ACTIVE: 'active'
}
