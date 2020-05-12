/*
 * @Author: Caven
 * @Date: 2020-05-09 13:19:53
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 09:27:35
 */

import { DomUtil, Util } from './utils'
import { MouseEventType, SceneEventType, Event } from './event'
import { Layer, LayerType } from './layer'
import { Overlay, OverlayType } from './overlay'
import ImageryType from './imagery/ImageryType'
import State from './state/State'
import Position from './position/Position'
import Transform from './transform/Transform'
import Parse from './parse/Parse'

DC.mixin({
  DomUtil,
  Util,
  State,
  Event,
  ImageryType,
  LayerType,
  OverlayType,
  MouseEventType,
  SceneEventType,
  Layer,
  Overlay,
  Position,
  Transform,
  T: Transform,
  Parse,
  P: Parse
})
