/**
 * @Author: Caven
 * @Date: 2020-05-09 13:19:53
 */

import { Util, DomUtil, PlotUtil } from './utils'
import { MouseEventType, SceneEventType, Event } from './event'
import { LayerType, Layer } from './layer'
import { OverlayType, Overlay } from './overlay'
import ImageryType from './imagery/ImageryType'
import TerrainType from './terrain/TerrainType'
import WidgetType from './widget/WidgetType'
import MouseMode from './option/MouseMode'
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
  TerrainType,
  LayerType,
  OverlayType,
  MouseEventType,
  SceneEventType,
  WidgetType,
  MouseMode,
  Layer,
  Overlay,
  Position,
  Transform,
  T: Transform,
  Parse,
  P: Parse
}

DC.mixin(base)
