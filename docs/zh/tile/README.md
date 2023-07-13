---
sidebar: auto
---

# 地图地形 🌎

构建地球表面的地形和图片，展现地球表面的真实状态

## DC.ImageryLayerFactory

> 地图工厂, 用于创建各类地图瓦片

### example

```js
let baseLayer = DC.ImageryLayerFactory.createAmapImageryLayer({
  style: 'img',
})
viewer.addBaseLayer(baseLayer, {
  name: '地图',
  iconUrl: '../preview.png',
})
```

### static methods

- **_createAmapImageryLayer(options)_**

  创建高德地图

  - 参数
    - `{Object} options`：属性
  - 返回值 `baseLayer`

- **_createBaiduImageryLayer(options)_**

  创建百度地图

  - 参数
    - `{Object} options`：属性
  - 返回值 `baseLayer`

- **_createGoogleImageryLayer(options)_**

  创建谷歌地图

  - 参数
    - `{Object} options`：属性
  - 返回值 `baseLayer`

- **_createTdtImageryLayer(options)_**

  创建天地图

  - 参数
    - `{Object} options`：属性
  - 返回值 `baseLayer`

- **_createTencentImageryLayer(options)_**

  创建腾讯地图

  - 参数
    - `{Object} options`：属性
  - 返回值 `baseLayer`

- **_createArcGisImageryLayer(options)_**

  创建 Arcgis 地图

  - 参数
    - `{Object} options`：属性，详情参考 [ArcGis](http://resource.dvgis.cn/cesium-docs/ArcGisMapServerImageryProvider.html#.ConstructorOptions)
  - 返回值 `baseLayer`

- **_createSingleTileImageryLayer(options)_**

  创建单图片地图

  - 参数
    - `{Object} options`：属性，详情参考 [Single](http://resource.dvgis.cn/cesium-docs/SingleTileImageryProvider.html#.ConstructorOptions)
  - 返回值 `baseLayer`

- **_createWMSImageryLayer(options)_**

  创建 WMS 地图

  - 参数
    - `{Object} options`：属性，详情参考 [WMS](http://resource.dvgis.cn/cesium-docs/WebMapServiceImageryProvider.html#.ConstructorOptions)
  - 返回值 `baseLayer`

- **_createWMTSImageryLayer(options)_**

  创建 WMTS 地图

  - 参数
    - `{Object} options`：属性，详情参考 [WMTS](http://resource.dvgis.cn/cesium-docs/WebMapTileServiceImageryProvider.html#.ConstructorOptions)
  - 返回值 `baseLayer`

- **_createXYZImageryLayer(options)_**

  创建 X/Y/Z 地图

  - 参数
    - `{Object} options`：属性，详情参考 [X/Y/Z](http://resource.dvgis.cn/cesium-docs/UrlTemplateImageryProvider.html#.ConstructorOptions)
  - 返回值 `baseLayer`

- **_createCoordImageryLayer(options)_**

  创建坐标系地图

  - 参数
    - `{Object} options`：属性
  - 返回值 `baseLayer`

- **_createGridImageryLayer(options)_**

  创建网格地图

  - 参数
    - `{Object} options`：属性，详情参考 [Grid](http://resource.dvgis.cn/cesium-docs/GridImageryProvider.html#.ConstructorOptions)
  - 返回值 `baseLayer`

- **_createMapboxImageryLayer(options)_**

  创建 Mapbox 地图

  - 参数
    - `{Object} options`：属性，详情参考 [Mapbox](http://resource.dvgis.cn/cesium-docs/MapboxImageryProvider.html#.ConstructorOptions)
  - 返回值 `baseLayer`

- **_createMapboxStyleImageryLayer(options)_**

  创建 Mapbox 样式地图

  - 参数
    - `{Object} options`：属性，详情参考 [Mapbox Style](http://resource.dvgis.cn/cesium-docs/MapboxStyleImageryProvider.html#.ConstructorOptions)
  - 返回值 `baseLayer`

- **_createTMSImageryLayer(options)_**

  创建 TMS 地图

  - 参数
    - `{Object} options`：属性，详情参考 [TMS](http://resource.dvgis.cn/cesium-docs/TileMapServiceImageryProvider.html#.ConstructorOptions)
  - 返回值 `baseLayer`

- **_createImageryLayer(type, options)_**

  根据类型创建地图

  - 参数
    - `{String} type`：类型，参考：DC.ImageryType
    - `{Object} options`：属性
  - 返回值 `baseLayer`

```json
//属性参数(可选)
{
  "url": "", //地址：arcgis/wmts/xyx/single 有效
  "style": "img", //样式：img、elec、ter。百度：normal、middlenight、dark，腾讯：img,1、4
  "key": "", //认证，仅天地图有效
  "subdomains": [],
  "crs":"WGS84",// 坐标系: WGS84 、BD09 、GCJ02，仅百度、高德有效
  "protocol":null,// http、https
  "tilingScheme":null, // 瓦片切片模式：GeographicTilingScheme , WebMercatorTilingScheme
  "rectangle": {
    "west": 0,
    "south": 0,
    "east": 0,
    "north":
  } // 瓦片范围，有west，south，east，north 单位为: 弧度，使用经纬度时需将转为弧度
}
```

## DC.TerrainFactory

> 地形工厂, 用于创建地形

### example

```js
let terrain = DC.TerrainFactory.createUrlTerrain({
  url: '****/***',
})
viewer.addTerrain(terrain)
```

### static methods

- **_createEllipsoidTerrain()_**

  创建默认地形

  returns `terrain`

- **_createUrlTerrain(options)_**

  根据 url 创建地形

  - 参数
    - `{Object} options`：属性
  - 返回值 `terrain`

- **_createGoogleTerrain(options)_**

  创建谷歌地形

  - 参数
    - `{Object} options`：属性
  - 返回值 `terrain`

- **_createArcgisTerrain(options)_**

  创建 Arcgis 地形

  - 参数
    - `{Object} options`：属性
  - 返回值 `terrain`

- **_createVRTerrain(options)_**

  创建 VR 地形

  - 参数
    - `{Object} options`：属性
  - 返回值 `terrain`

- **_createTerrain(type，options)_**

  根据类型创建地形

  - 参数
    - `{String} type`：类型，参考：DC.TerrainType
    - `{Object} options`：属性
  - 返回值 `terrain`

```json
//属性参数（可选）
{
  "url": "" // 服务地址
}
```
