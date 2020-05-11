/*
 * @Author: Caven
 * @Date: 2019-12-27 17:18:52
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-12 00:45:45
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
  Cricle,
  DivIcon,
  Label,
  Point,
  Polyline,
  Polygon,
  Model,
  Tileset
} from './overlay'

import { area, bounds, center, distance, heading, isBetween } from './math'

const { Cesium } = DC.Namespace

Cesium.Math.area = area
Cesium.Math.bounds = bounds
Cesium.Math.center = center
Cesium.Math.distance = distance
Cesium.Math.heading = heading
Cesium.Math.isBetween = isBetween

DC.mixin({
  ImageryLayerFactory,
  TerrainFactory,
  Viewer,
  GeoJsonLayer,
  HtmlLayer,
  LabelLayer,
  TilesetLayer,
  TopoJsonLayer,
  VectorLayer,
  Billboard,
  Cricle,
  DivIcon,
  Label,
  Point,
  Polyline,
  Polygon,
  Model,
  Tileset
})

DC.Math = Cesium.Math
