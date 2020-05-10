/*
 * @Author: Caven
 * @Date: 2020-05-09 13:19:53
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-10 11:05:39
 */

import { MouseEventType, SceneEventType } from './event/EventType'
import { Layer, LayerType } from './layer'
import { Overlay, OverlayType } from './overlay'
import ImageryType from './imagery/ImageryType'

DC.mixin({
  ImageryType: ImageryType,
  LayerType: LayerType,
  OverlayType: OverlayType,
  MouseEventType: MouseEventType,
  SceneEventType: SceneEventType,
  Layer: Layer,
  Overlay: Overlay
})
