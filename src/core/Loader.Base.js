/**
 * @Author: Caven
 * @Date: 2020-05-09 13:19:53
 */

import { Util, DomUtil, PlotUtil } from './utils'
import { MouseEventType, SceneEventType, Event } from './event'
import { LayerType, Layer } from './layer'
import { Overlay, OverlayType } from './overlay'
import ImageryType from './imagery/ImageryType'
import WidgetType from './widget/WidgetType'
import State from './state/State'
import Position from './position/Position'
import Transform from './transform/Transform'
import Parse from './parse/Parse'

const base = {
  Util,
  DomUtil,
  PlotUtil,
  State,
  Event,
  ImageryType,
  LayerType,
  OverlayType,
  MouseEventType,
  SceneEventType,
  WidgetType,
  Layer,
  Overlay,
  Position,
  Transform,
  T: Transform,
  Parse,
  P: Parse
}

DC.mixin(base)
