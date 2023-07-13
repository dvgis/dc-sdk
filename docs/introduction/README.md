---
sidebar: auto
---

# Tutorials 🌎

## Introduction

### What is DC-SDK

**_`DC-SDK`_** is based on the open source project **_`Cesium`_** for the second development of two three-dimensional **_`WebGis`_** application framework , the framework optimizes the use of **_`Cesium`_** and adds some additional features , designed for developers to quickly build **_`WebGis`_** application.

### What DC-SDK can do

- `Two and three dimensional scene visualization`

Support seamless switching between two and three dimensions, a set of code with multiple styles. The framework allows you to add maps, all kinds of vector data and models to the scene, making the scene closer to the real world.

- `Map management of major manufacturers`

Support Gaode, Baidu, Tencent, Sky Map, Google, MapBox and other manufacturers' map access, for some domestic maps can be offset processing.

- `Uniform management of various types of data`

The framework provides overlays corresponding to the layer management operation, through the layer can be targeted screening and overall control of the overlay.

- `All kinds of data animation and special effects`

Provide lines, surfaces, circles, models and other material effects and detailed animation, so that the material of the overlay can change over time.

- `Special effects for post 3D scenes`

Provide weather functions such as clouds, rain, snow, fog, etc. and some animations including surround around point, surround around ground, scan circle (radar), video fusion, floodlight, night vision, etc. and post effects.

- `Path roaming and fixed-point cruising`

Provide automatic roaming and cruising function according to the set route, which is convenient to locate and view multiple key areas.

- `Spatial analysis capability`

Provide various measurement functions such as distance, area and height, as well as 3D scene analysis functions such as view-shed and through-view.

- `Compatible with third-party map tool libraries`

Provide functional access to turf, heatmap, mapv, echarts and other common visualization libraries and open source libraries to avoid repeated learning and cost investment by users.

## Preparation

`Running Env`

DC-SDK is a development platform that relies on [`WebGL`](#webgl), which requires a `discrete graphics card` and a browser that supports `WebGL` on the development or running terminal. Recommended to use **_Chrome_**、**_Firefox_**

`Static File Server`

Static file servers are mainly used to publish map tiles, terrain, model data and other data services, such as: **_Apache Http Sever_**、**_Tomcat_** 、**_Nginx_**. Recommended to use **_Nginx_**

`Hardware Configuration`

> Hardware configuration description, the following hardware configuration is recommended for 3D scene viewing and development.

<table style="width:100%">
 <tr><td colspan=3 style="text-align:center;background:#3eaf7c;">PC Side</td></tr>
 <tr><td>Project</td><td>Standard</td><td>Recommended</td></tr>
 <tr><td>CPU</td><td>2.6GHz 64-bit processor</td><td>3.0GHz 64-bit processor</td></tr>
 <tr><td>RAM</td><td>8GB</td><td>32GB</td></tr>
 <tr><td>Graphics card model</td><td>NVIDIA GTX 1660 (or equivalent)</td><td>NVIDIA RTX 2080 (or equivalent)</td></tr>
 <tr><td>Video Memory</td><td>4GB</td><td>16G</td></tr>
 <tr><td>Optimal Resolution</td><td>FHD - 1920 * 1080</td><td>4K QFHD - 3840 * 2160</td></tr>
 <tr><td>Operating System</td><td colspan=2>64-bit Windows 8/10/11 or 64-bit Linux desktop distribution, or macOS 10.12.1 or higher</td></tr>
 <tr><td>Browser</td><td colspan=2>Google Chrome or Firefox latest version</td></tr>
</table

<table style="width:70%">
 <tr><td colspan=3 style="text-align:center;background:#3eaf7c;">Mobile devices</td></tr>
 <tr><td width="16%">Platform</td><td>Android</td><td>Apple</td></tr>
 <tr><td>Devices</td><td>Mobile devices compatible with Android OS, 2019 and up for mid-range and high-end models</td><td>IPhone 11 and above, IPad Pro 2019 and above</td></tr>
 <tr><td>OS</td><td>Android</td><td>IOS or IPadOS</td></tr>
 <tr><td>Browser</td><td colspan=2>WebGL-enabled browsers</td></tr>
</table>

### Installation

`NPM / YARN` **_`(Recommend)`_**

Installing with NPM or YARN is recommended and it works seamlessly with webpack.

```shell
yarn add @dvgis/dc-sdk
-------------------------
npm install @dvgis/dc-sdk
```

```js
import DC from '@dvgis/dc-sdk/dist/dc.base.min'
import DcCore from '@dvgis/dc-sdk/dist/dc.core.min'
import DcChart from '@dvgis/dc-sdk/dist/dc.chart.min'
import DcMapv from '@dvgis/dc-sdk/dist/dc.mapv.min'
import '@dvgis/dc-sdk/dist/dc.core.min.css'
```

`NPM / YARN` **_`(On-demand)`_**

```shell
yarn add @dvgis/dc-base
yarn add @dvgis/dc-core
yarn add @dvgis/dc-chart
yarn add @dvgis/dc-mapv
-------------------------
npm install @dvgis/dc-base
npm install @dvgis/dc-core
npm install @dvgis/dc-chart
npm install @dvgis/dc-mapv
```

```js
import DC from '@dvgis/dc-base'
import DcCore from '@dvgis/dc-core'
import DcChart from '@dvgis/dc-chart'
import DcMapv from '@dvgis/dc-mapv'
import '@dvgis/dc-core/dist/dc.core.min.css'
```

`CDN`

[Resources](https://github.com/dvgis/dc-sdk/releases)

```html
<script src="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.base.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.core.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.mapv.min.js"></script>
<link
  href="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.core.min.css"
  rel="stylesheet"
  type="text/css"
/>
```

::: danger
Please put the resources in the project root directory libs/dc-sdk, if you put it in other directory, the framework will not run properly.
:::

### Configuration

Since the DC framework sets `CESIUM_BASE_URL` to `. /libs/dc-sdk/resources/`, you need to copy `Cesium` related static resources files: `Assets`, `Workers`, `ThirdParty` to `libs/dc-sdk/resources` directory of the project to ensure that the 3D scene can be rendered properly. You can also use `DC.baseUrl` to set the static resource base related to `Cesium`.

> `NPM / YARN`

`Webpack` [Project Template](https://github.com/cavencj/dc-vue-app)

```js
// webpack.config.js
const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
        to: 'libs/dc-sdk/resources',
      },
    ]),
  ],
}
```

`Vue2.x` [Project Template](https://github.com/dvgis/dc-vue)

```js
// vue.config.js
const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'
module.exports = {
  chainWebpack: (config) => {
    config.plugin('copy').use(CopywebpackPlugin, [
      [
        {
          from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
          to: 'libs/dc-sdk/resources',
        },
      ],
    ])
  },
}
```

`Vue3.x` [Project Template](https://github.com/dvgis/dc-vue-next)

```js
// vue.config.js
const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'
module.exports = {
  chainWebpack: (config) => {
    config.plugin('copy').use(CopywebpackPlugin, [
      {
        patterns: [
          {
            from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
            to: path.join(__dirname, 'dist', 'libs/dc-sdk/resources'),
          },
        ],
      },
    ])
  },
}
```

`CDN`

Download the current version of the resource file directly through the [website](https://github.com/dvgis/dc-sdk/releases)

### Code hinting

By installing the code hinting toolkit, you can prompt and automate the framework's internal interfaces during development to better improve development efficiency

```shell
npm install @dvgis/types -D
-------------------------
yarn add @dvgis/types -D
```

### Get Started

> [Installation](#installation) and [Configuration](#configuration), then you can develop your own **_`WebGis`_** application

`Create container`

```html
<div class="viewer-container" id="viewer-container"></div>
<!-- The id attribute must be assigned a value, otherwise the 3D scene cannot be created -->
```

`Create viewer`

```js
global.DC = DC
DC.use(DcCore) // install core package
DC.use(DcChart) // install chart package
DC.use(DcMapv) // install mapv package
//The above code is not needed when using CDN method, it will be installed automatically.
DC.ready(() => {
  let viewer = new DC.Viewer('viewer-container')
})
```

`Result` [more](http://dc.dvgis.cn/#/examples)

<iframe src="https://dc.dvgis.cn/#/editor?type=info&example=start" frameborder="0" height="500px" width="100%" >
</iframe>

## Structure

> DC structure, it is recommended to be familiar with the overall structure diagram before use so that you can use it quickly.[view image](http://dc.dvgis.cn/examples/images/base/dc2.x.png)

<img src="http://dc.dvgis.cn/examples/images/base/dc2.x.png" style="width:100%;height:800px">

## Technology

### WebGL

WebGL is a JavaScript API for rendering interactive 2D and 3D graphics in any compatible web browser without the use of plug-ins. WebGL is fully integrated into all web standards of the browser and allows for the use of GPU acceleration of image processing and effects as part of the web Canvas. WebGL elements can be added to other HTML elements and blended with other parts of the web page or web page background. WebGL programs consist of handles written in JavaScript and shader code written in OpenGL Shading Language (**`GLSL`**).

### 3D Data Format

**`glb/gltf`**

GLTF stands for Graphics Language Transmission Format. This cross-platform format has become the standard for 3D objects on the Web. It was defined by Khronos, the 3D graphics standards organization behind OpenGL and Vulkan, making GLTF essentially a JPG format for 3D models: a common standard for Web exports.

**`OSGB`**

Open Scene Gragh Binary is the full name of OSGB, where Binary means binary. These data files are fragmented, numerous, and have large high-level pyramid files, making it difficult to form an efficient and standard web publishing scheme, and thus impossible to share data between different geographic regions and departments.

**`3dtiles`**

3D Tiles is an open specification for streaming large scale heterogeneous 3D geospatial datasets. 3D Tiles data can be generated from shp, osgb (oblique photography), 3dmax, and other data.

**`geojson`**

GeoJSON is a format for encoding various geographic data structures, based on the Javascript object representation of geospatial information data interchange format.
GeoJSON objects can represent geometry, features or feature collections.GeoJSON supports the following geometry types: point, line, surface, multipoint, polyline, polysurface and geometry collections. A feature in GeoJSON contains a geometric object and other attributes, and a feature set represents a set of features.

**`kml/czml`**

KML/CZML is a JSON format data describing time-dynamic graphic scenes, which describes lines, points, billboards (markers), models, and other graphic primitives, and specifies how they change over time.

:::tip
Data conversion can be done with the help of [CesiumLab](http://www.cesiumlab.com) or some other conversion tools.[view image](http://dc.dvgis.cn/examples/images/base/data_transform.png)
:::

<img src="http://dc.dvgis.cn/examples/images/base/data_transform.png" style="width:100%;height:500px">

### Coordinates

**`World coordinates (Cartesian3)`**

Cartesian coordinates, the coordinates of a point in a right-angle coordinate system in space with the center of the ellipsoid as the origin.

**`Geographic coordinates(Cartographic)`**

Geographical coordinate system with the origin of the coordinates at the center of mass of the ellipsoid.

Longitude: The two-sided angle between the geodetic meridian plane and the prime meridian plane at a point on the reference ellipsoid. East positive and west negative.

Latitude : The angle between the normal and the equatorial plane at a point on the reference ellipsoid. North positive and south negative.

**`Position`**

The geographic coordinate system with the origin of the coordinates at the center of mass of the ellipsoid. `DC extension`

Longitude: The angle between the geodetic meridian plane and the prime meridian plane at a point on the reference ellipsoid. East is positive and west is negative.

Latitude : The angle between the normal and the equatorial plane at a point on the reference ellipsoid. North is positive and south is negative.

Altitude : The distance from the surface of the Earth.

**`Screen coordinates (Cartesian2)`**

Browser window coordinates or windowPosition in mouse events

:::tip
The framework can use `DC.T` for all kinds of coordinate conversions
:::

### CRS

`WGS84`

An internationally adopted geocentric coordinate system. The coordinate origin is the center of mass of the Earth, and the Z-axis of its geocentric space-rectangular coordinate system points to the direction of the agreed Earth pole (CTP) defined by BIH (International Time Service) 1984.O. The X-axis points to the intersection of the zero meridian plane of BIH 1984.0 and the CTP equator, and the Y-axis is perpendicular to the Z-axis and X-axis to form a right-handed coordinate system, which is called the 1984 World Geodetic Coordinate System.

`CGCS2000`

2000 China Geodetic Coordinate System 2000 (CGCS2000), also called 2000 National Geodetic Coordinate System, is a new generation of geodetic coordinate system in China, which has been officially implemented in China at the beginning of 21st century. It is not much different from `WGS84`, which is used in domestic sky maps.

`GCJ02`

GCJ-02 is a coordinate system for GIS developed by the State Bureau of Surveying and Mapping of China (G for Guojia State, C for Cehui Surveying and Mapping, and J for Ju Bureau). It is actually an artificial bias processing of the real coordinate system, which encrypts the real coordinates into false coordinates according to a special algorithm, and this bias is not a linear bias, so the bias will be different from place to place. The encrypted coordinates are often called "Mars coordinate system".

`BD09`

BD09 latitude and longitude projection belongs to Baidu coordinate system, which is based on the standard latitude and longitude with GCJ-02 bias and Baidu's own bias algorithm, that is, it is biased twice on top of the standard latitude and longitude.

[ref](http://www.rivermap.cn/docs/show-1829.html)

:::tip
The framework can use `DC.CoordTransform` for all kinds of coordinate system conversion
:::

## Support

> If dc-sdk can bring you benefits, please support it!

<p style="display:flex">
<a href="https://www.paypal.com/paypalme/cavencj" target="_blank">
<img src="https://www.paypalobjects.com/images/shared/paypal-logo-129x32.svg" style="margin-top:10px;margin-right:20px" />
</a>
<img src="http://dc.dvgis.cn/examples/images/base/sponsor.jpg?v=2" title="数字视觉"/>
</p>
