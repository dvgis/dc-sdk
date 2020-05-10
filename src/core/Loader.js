/*
 * @Author: Caven
 * @Date: 2019-12-27 17:18:52
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-09 23:54:17
 */
import { DomUtil, Util } from './utils'
import ImageryLayerFactory from './imagery/ImageryLayerFactory'
import TerrainFactory from './terrain/TerrainFactory'
import Position from './position/Position'
import Transform from './transform/Transform'
import Parse from './parse/Parse'
import Viewer from './viewer/Viewer'
import {
  GeoJsonLayer,
  HtmlLayer,
  LabelLayer,
  TilesetLayer,
  TopoJsonLayer,
  VectorLayer
} from './layer'

import {
  Billboard,
  Cricle,
  DivIcon,
  Label,
  Point,
  Polyline,
  Polygon,
  Model,
  Tileset
} from './overlay'

DC.mixin({
  DomUtil: DomUtil,
  Util: Util,
  ImageryLayerFactory: ImageryLayerFactory,
  TerrainFactory: TerrainFactory,
  Position: Position,
  T: Transform,
  P: Parse,
  Viewer: Viewer,
  GeoJsonLayer: GeoJsonLayer,
  HtmlLayer: HtmlLayer,
  LabelLayer: LabelLayer,
  TilesetLayer: TilesetLayer,
  TopoJsonLayer: TopoJsonLayer,
  VectorLayer: VectorLayer,
  Billboard: Billboard,
  Cricle: Cricle,
  DivIcon: DivIcon,
  Label: Label,
  Point: Point,
  Polyline: Polyline,
  Polygon: Polygon,
  Model: Model,
  Tileset: Tileset
})
