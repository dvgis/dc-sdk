/**
 * @Author: Caven
 * @Date: 2019-12-27 17:18:52
 */

import ImageryLayerFactory from './imagery/ImageryLayerFactory'
import TerrainFactory from './terrain/TerrainFactory'
import Viewer from './viewer/Viewer'
import {
  LayerGroup,
  GeoJsonLayer,
  HtmlLayer,
  LabelLayer,
  TilesetLayer,
  TopoJsonLayer,
  VectorLayer
} from './layer'

import {
  Billboard,
  Circle,
  DivIcon,
  Label,
  Point,
  Polyline,
  Polygon,
  Model,
  Tileset
} from './overlay'

import {
  area,
  bounds,
  mid,
  center,
  distance,
  heading,
  isBetween,
  parabola,
  curve
} from './math'

const { Cesium } = DC.Namespace

const core = {
  ImageryLayerFactory,
  TerrainFactory,
  Viewer,
  World: Viewer,
  LayerGroup,
  GeoJsonLayer,
  HtmlLayer,
  LabelLayer,
  TilesetLayer,
  TopoJsonLayer,
  VectorLayer,
  Billboard,
  Circle,
  DivIcon,
  Label,
  Point,
  Polyline,
  Polygon,
  Model,
  Tileset,
  Math: {
    ...Cesium.Math,
    area,
    bounds,
    mid,
    center,
    distance,
    heading,
    isBetween,
    parabola,
    curve
  }
}

DC.mixin(core)
