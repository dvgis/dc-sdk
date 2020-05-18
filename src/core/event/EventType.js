/*
 * @Author: Caven
 * @Date: 2020-04-10 17:02:28
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-18 13:12:38
 */

const { Cesium } = DC.Namespace

const baseEventType = {
  ADD: 'add',
  REMOVE: 'remove'
}

const MouseEventType = {
  CLICK: Cesium.ScreenSpaceEventType.LEFT_CLICK,
  RIGHT_CLICK: Cesium.ScreenSpaceEventType.RIGHT_CLICK,
  DB_CLICK: Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
  MOUSE_MOVE: Cesium.ScreenSpaceEventType.MOUSE_MOVE,
  WHEEL: Cesium.ScreenSpaceEventType.WHEEL,
  MOUSE_OVER: 'mouseover',
  MOUSE_OUT: 'mouseout',
  DRAG_START: 'dragStart',
  DRAG_END: 'dragEnd',
  EDIT_START: 'editStart',
  EDIT_END: 'editEnd'
}

const ViewerEventType = {
  ADD_LAYER: 'addLayer',
  REMOVE_LAYER: 'removeLayer',
  ADD_EFFECT: 'addEffect',
  REMOVE_EFFECT: 'removeEffect',
  CLICK: Cesium.ScreenSpaceEventType.LEFT_CLICK,
  RIGHT_CLICK: Cesium.ScreenSpaceEventType.RIGHT_CLICK,
  DB_CLICK: Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
  MOUSE_MOVE: Cesium.ScreenSpaceEventType.MOUSE_MOVE,
  WHEEL: Cesium.ScreenSpaceEventType.WHEEL
}

const SceneEventType = {
  CAMERA_MOVE_END: 'cameraMoveEnd',
  CAMERA_CHANGED: 'cameraChanged',
  PRE_RENDER: 'preRender',
  POST_RENDER: 'postRender',
  MORPH_COMPLETE: 'morphComplete',
  CLOCK_TICK: 'clockTick'
}

const LayerEventType = {
  ...baseEventType,
  CLEAR: 'clear'
}

const EffectEventType = {
  ...baseEventType
}

const OverlayEventType = {
  ...baseEventType,
  CLICK: Cesium.ScreenSpaceEventType.LEFT_CLICK,
  RIGHT_CLICK: Cesium.ScreenSpaceEventType.RIGHT_CLICK,
  DB_CLICK: Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
  MOUSE_OVER: 'mouseover',
  MOUSE_OUT: 'mouseout',
  DRAG_START: 'dragStart',
  DRAG_END: 'dragEnd',
  EDIT_START: 'editStart',
  EDIT_END: 'editEnd'
}

export {
  MouseEventType,
  ViewerEventType,
  SceneEventType,
  LayerEventType,
  EffectEventType,
  OverlayEventType
}
