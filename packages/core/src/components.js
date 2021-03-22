/**
 * @Author: Caven
 * @Date: 2021-03-13 17:17:19
 */

import { Cesium } from '@dc-modules/namespace'

/**
 * base
 */
import Position from '@dc-modules/position/Position'
import Parse from '@dc-modules/parse/Parse'
import { Util, DomUtil, PlotUtil } from '@dc-modules/utils'
import { Transform, CoordTransform } from '@dc-modules/transform'
import { MouseEventType, SceneEventType } from '@dc-modules/event'
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
} from '@dc-modules/math'
import Viewer from '@dc-modules/viewer/Viewer'

/**
 * imagery
 */
import { ImageryType, ImageryLayerFactory } from '@dc-modules/imagery'

/**
 * terrain
 */
import { TerrainType, TerrainFactory } from '@dc-modules/terrain'

/**
 * layer
 */
import {
  LayerType,
  Layer,
  ClusterLayer,
  CzmlLayer,
  GeoJsonLayer,
  HeatLayer,
  HtmlLayer,
  KmlLayer,
  LabelLayer,
  LayerGroup,
  PrimitiveLayer,
  TilesetLayer,
  TopoJsonLayer,
  VectorLayer
} from '@dc-modules/layer'

/**
 * overlay
 */
import {
  OverlayType,
  Overlay,
  CustomBillboard,
  CustomLabel,
  Model,
  Tileset,
  AttackArrow,
  DoubleArrow,
  FineArrow,
  GatheringPlace,
  TailedAttackArrow,
  ElecEllipsoidPrimitive,
  FlowLinePrimitive,
  ScanCirclePrimitive,
  TrailLinePrimitive,
  VideoPrimitive,
  WaterPrimitive,
  Billboard,
  Box,
  Circle,
  Corridor,
  Cylinder,
  DivIcon,
  Ellipse,
  Ellipsoid,
  Label,
  Plane,
  Point,
  Polygon,
  Polyline,
  PolylineVolume,
  Rectangle,
  Wall
} from '@dc-modules/overlay'

/**
 * material
 */
import {
  CircleBlurMaterialProperty,
  CircleDiffuseMaterialProperty,
  CircleFadeMaterialProperty,
  CirclePulseMaterialProperty,
  CircleScanMaterialProperty,
  CircleSpiralMaterialProperty,
  CircleVaryMaterialProperty,
  CircleWaveMaterialProperty,
  EllipsoidElectricMaterialProperty,
  EllipsoidTrailMaterialProperty,
  PolylineFlickerMaterialProperty,
  PolylineFlowMaterialProperty,
  PolylineImageTrailMaterialProperty,
  PolylineLightingMaterialProperty,
  PolylineLightingTrailMaterialProperty,
  PolylineTrailMaterialProperty,
  RadarLineMaterialProperty,
  RadarSweepMaterialProperty,
  RadarWaveMaterialProperty,
  WallImageTrailMaterialProperty,
  WallLineTrailMaterialProperty,
  WallTrailMaterialProperty,
  WaterMaterialProperty
} from '@dc-modules/material'

/**
 *
 * effect
 */
import Effect from '@dc-modules/effect/Effect'

/**
 * animation
 */
import {
  AroundView,
  AroundPoint,
  CircleScan,
  Flying,
  GlobeRotate,
  RadarScan
} from '@dc-modules/animation'

/**
 *
 * roaming
 */
import {
  RoamingViewMode,
  RoamingPath,
  RoamingController
} from '@dc-modules/roaming'

/**
 *
 * weather
 */
import Weather from '@dc-modules/weather/Weather'

/**
 *
 * plot
 */
import Plot from '@dc-modules/plot/Plot'

/**
 *
 * wind
 */
import WindLayer from '@dc-modules/wind/WindLayer'

/**
 * exts
 */
import { SkyBox } from '@dc-modules/exts'

/**
 * thirdPart
 */
import thirdPart from '@dc-modules/thirdpart'

Cesium.Math.area = area
Cesium.Math.bounds = bounds
Cesium.Math.mid = mid
Cesium.Math.center = center
Cesium.Math.distance = distance
Cesium.Math.heading = heading
Cesium.Math.isBetween = isBetween
Cesium.Math.parabola = parabola
Cesium.Math.curve = curve

const components = {
  /**
   * base
   */
  Position,
  Parse,
  Util,
  DomUtil,
  PlotUtil,
  Transform,
  CoordTransform,
  MouseEventType,
  SceneEventType,
  Math: Cesium.Math,
  Viewer,
  World: Viewer,
  Map: Viewer,
  /**
   * imagery
   */
  ImageryType,
  ImageryLayerFactory,
  /**
   * terrain
   */
  TerrainType,
  TerrainFactory,
  /**
   * layer
   */
  LayerType,
  Layer,
  ClusterLayer,
  CzmlLayer,
  GeoJsonLayer,
  HeatLayer,
  HtmlLayer,
  KmlLayer,
  LabelLayer,
  LayerGroup,
  PrimitiveLayer,
  TilesetLayer,
  TopoJsonLayer,
  VectorLayer,
  /**
   * overlay
   */
  OverlayType,
  Overlay,
  CustomBillboard,
  CustomLabel,
  Model,
  Tileset,
  AttackArrow,
  DoubleArrow,
  FineArrow,
  GatheringPlace,
  TailedAttackArrow,
  ElecEllipsoidPrimitive,
  FlowLinePrimitive,
  ScanCirclePrimitive,
  TrailLinePrimitive,
  VideoPrimitive,
  WaterPrimitive,
  Billboard,
  Box,
  Circle,
  Corridor,
  Cylinder,
  DivIcon,
  Ellipse,
  Ellipsoid,
  Label,
  Plane,
  Point,
  Polygon,
  Polyline,
  PolylineVolume,
  Rectangle,
  Wall,
  /**
   * material
   */
  CircleBlurMaterialProperty,
  CircleDiffuseMaterialProperty,
  CircleFadeMaterialProperty,
  CirclePulseMaterialProperty,
  CircleScanMaterialProperty,
  CircleSpiralMaterialProperty,
  CircleVaryMaterialProperty,
  CircleWaveMaterialProperty,
  EllipsoidElectricMaterialProperty,
  EllipsoidTrailMaterialProperty,
  PolylineFlickerMaterialProperty,
  PolylineFlowMaterialProperty,
  PolylineImageTrailMaterialProperty,
  PolylineLightingMaterialProperty,
  PolylineLightingTrailMaterialProperty,
  PolylineTrailMaterialProperty,
  RadarLineMaterialProperty,
  RadarSweepMaterialProperty,
  RadarWaveMaterialProperty,
  WallImageTrailMaterialProperty,
  WallLineTrailMaterialProperty,
  WallTrailMaterialProperty,
  WaterMaterialProperty,
  /**
   * effect
   */
  Effect,
  /**
   * animation
   */
  AroundView,
  AroundPoint,
  CircleScan,
  Flying,
  GlobeRotate,
  RadarScan,
  /**
   *
   * roaming
   */
  RoamingViewMode,
  RoamingPath,
  RoamingController,
  /**
   * weather
   */
  Weather,
  /**
   * plot
   */
  Plot,
  /**
   * wind
   */
  WindLayer,
  /**
   * exts
   */
  SkyBox,
  /**
   * thirdPart
   */
  ...thirdPart
}

export default components
