/**
 * @Author: Caven
 * @Date: 2019-12-30 09:35:51
 */

const { Cesium } = DC.Namespace

const thirdPart = {
  Cartesian2: Cesium.Cartesian2,
  Cartesian3: Cesium.Cartesian3,
  SceneMode: Cesium.SceneMode,
  HeightReference: Cesium.HeightReference,
  ClassificationType: Cesium.ClassificationType,
  ShadowMode: Cesium.ShadowMode,
  TilesetStyle: Cesium.Cesium3DTileStyle,
  CallbackProperty: Cesium.CallbackProperty,
  JulianDate: Cesium.JulianDate,
  Color: Cesium.Color,
  Rect: Cesium.Rectangle,
  ColorMaterialProperty: Cesium.ColorMaterialProperty,
  ImageMaterialProperty: Cesium.ImageMaterialProperty,
  PolylineDashMaterialProperty: Cesium.PolylineDashMaterialProperty,
  PolylineGlowMaterialProperty: Cesium.PolylineGlowMaterialProperty,
  PolylineOutlineMaterialProperty: Cesium.PolylineOutlineMaterialProperty,
  PolylineArrowMaterialProperty: Cesium.PolylineArrowMaterialProperty
}

DC.mixin(thirdPart)
