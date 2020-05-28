/*
 * @Author: Caven
 * @Date: 2019-12-27 17:18:52
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-28 14:35:10
 */

import ImageryLayerFactory from './imagery/ImageryLayerFactory'
import TerrainFactory from './terrain/TerrainFactory'
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
  distance,
  heading,
  isBetween,
  parabola
} from './math'

const { Cesium } = DC.Namespace

Cesium.Math.area = area
Cesium.Math.bounds = bounds
Cesium.Math.center = center
Cesium.Math.distance = distance
Cesium.Math.heading = heading
Cesium.Math.isBetween = isBetween
Cesium.Math.parabola = parabola

const core = {
  ImageryLayerFactory,
  TerrainFactory,
  Viewer,
  World: Viewer,
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
  Math: Cesium.Math
}

DC.mixin(core)
