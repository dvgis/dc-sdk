/*
 * @Author: Caven
 * @Date: 2020-05-09 13:19:53
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-11 17:24:59
 */

import { MouseEventType, SceneEventType } from './event/EventType'
import { Layer, LayerType } from './layer'
import { Overlay, OverlayType } from './overlay'
import ImageryType from './imagery/ImageryType'
import State from './state/State'

DC.mixin({
  State: State,
  ImageryType: ImageryType,
  LayerType: LayerType,
  OverlayType: OverlayType,
  MouseEventType: MouseEventType,
  SceneEventType: SceneEventType,
  Layer: Layer,
  Overlay: Overlay
})
