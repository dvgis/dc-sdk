/**
 * @Author: Caven
 * @Date: 2020-04-10 17:02:28
 */

import { Cesium } from '@dc-modules/namespace'

const BaseEventType = {
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
  MOUSE_OUT: 'mouseout'
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
  PRE_UPDATE: 'preUpdate',
  POST_UPDATE: 'postUpdate',
  PRE_RENDER: 'preRender',
  POST_RENDER: 'postRender',
  MORPH_COMPLETE: 'morphComplete',
  CLOCK_TICK: 'clockTick'
}

const OverlayEventType = {
  ...BaseEventType,
  CLICK: Cesium.ScreenSpaceEventType.LEFT_CLICK,
  RIGHT_CLICK: Cesium.ScreenSpaceEventType.RIGHT_CLICK,
  DB_CLICK: Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
  MOUSE_MOVE: Cesium.ScreenSpaceEventType.MOUSE_MOVE,
  MOUSE_OVER: 'mouseover',
  MOUSE_OUT: 'mouseout',
  POSITION_UPDATE: 'positionUpdate'
}

const LayerGroupEventType = BaseEventType

const LayerEventType = {
  ...BaseEventType,
  CLICK: Cesium.ScreenSpaceEventType.LEFT_CLICK
}

const RoamingEventType = {
  ...BaseEventType,
  POST_UPDATE: 'postUpdate',
  ACTIVE: 'active',
  RELEASE: 'release'
}

export {
  MouseEventType,
  ViewerEventType,
  SceneEventType,
  LayerGroupEventType,
  LayerEventType,
  OverlayEventType,
  RoamingEventType
}
