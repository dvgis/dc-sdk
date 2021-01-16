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
  PrimitiveLayer,
  TilesetLayer,
  TopoJsonLayer,
  VectorLayer,
  CzmlLayer,
  KmlLayer
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
  center,
  curve,
  distance,
  heading,
  isBetween,
  mid,
  parabola
} from './math'

const { Cesium } = DC.Namespace

Cesium.Math.area = area
Cesium.Math.bounds = bounds
Cesium.Math.mid = mid
Cesium.Math.center = center
Cesium.Math.distance = distance
Cesium.Math.heading = heading
Cesium.Math.isBetween = isBetween
Cesium.Math.parabola = parabola
Cesium.Math.curve = curve

const core = {
  ImageryLayerFactory,
  TerrainFactory,
  Viewer,
  World: Viewer,
  LayerGroup,
  GeoJsonLayer,
  HtmlLayer,
  LabelLayer,
  PrimitiveLayer,
  TilesetLayer,
  TopoJsonLayer,
  VectorLayer,
  CzmlLayer,
  KmlLayer,
  Billboard,
  Circle,
  DivIcon,
  Label,
  Point,
  Polyline,
  Polygon,
  Model,
  Tileset,
  Math: Cesium.Math
}

DC.mixin(core)
