# DC-SDK

<p>
<img src="https://img.shields.io/github/workflow/status/dvgis/dc-sdk/publish"/>
<img src="https://img.shields.io/badge/license-Apache%202-blue"/>
<img src="https://img.shields.io/npm/v/@dvgis/dc-sdk?color=orange&logo=npm" />
<img src="https://img.shields.io/npm/dm/@dvgis/dc-sdk?logo=npm"/>
</p>

[**🇨🇳 中文**](./README_zh.md) | [**🇬🇧English**](./README.md)

> DC-SDK is a 2D and 3D integrated WebGis application framework based on the secondary development of Cesium. This framework optimizes the usage mode of Cesium and adds some additional functions, aiming to build WebGis applications for developers quickly.

> [Home Page](http://dc.dvgis.cn)

```warningH
Tips：This SDK is JS+GIS framework package. Developers need to have some front-end technology and GIS related technology
```

## Installation

> CDN

```html
<!--Basic Package-->
<script src="libs/dc-sdk/dc.base.min.js"></script>
<!--Core Package-->
<script src="libs/dc-sdk/dc.core.min.js"></script>
<!--Main Style Sheet -->
<link href="libs/dc-sdk/dc.core.min.css" rel="stylesheet" type="text/css" />
```

> NPM / YARN

```shell
   yarn add @dvgis/dc-sdk
   npm install @dvgis/dc-sdk
```

```js
import DC from 'dvgis/dc-sdk/dist/dc.base.min' //Basic Package
import DcCore from 'dvgis/dc-sdk/dist/dc.core.min' //Core Package
import 'dvgis/dc-sdk/dist/dc.core.min.css' // Main Style Sheet
```

## Setting

> Vue

```js
// vue.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  // other settings
  chainWebpack: config => {
    config.resolve.alias.set('dvgis', path.resolve(__dirname, dvgisDist))
    config.plugin('copy').use(CopywebpackPlugin, [
      [
        {
          from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
          to: 'libs/dc-sdk/resources'
        }
      ]
    ])
  }
}
```

## Start

```js
global.DC = DC
DC.use(DcCore)
DC.ready(() => {
  let viewer = new DC.Viewer(divId) // divId is the Id attribute value of a div node. If it is not passed in, the 3D scene cannot be initialized
})
```

## Documentation

[DC Api](https://resource.dvgis.cn/dc-api)

[Cesium Api](https://cesium.com/docs/cesiumjs-ref-doc/)

## Demo

|  ![picture](http://dc.dvgis.cn/examples/images/baselayer/google.png) | ![picture](http://dc.dvgis.cn/examples/images/baselayer/baidu.png) | ![picture](http://dc.dvgis.cn/examples/images/baselayer/tdt.png) | ![picture](http://dc.dvgis.cn/examples/images/baselayer/arcgis.png) |
|  :-----------------------------------------------------------: | :-----------------------------------------------------------: | :------------------------------------------------------------------: | :--------------------------------------------------------------: |
|  ![picture](http://dc.dvgis.cn/examples/images/scene/globe_rotate.gif) | ![picture](http://dc.dvgis.cn/examples/images/model/factory.gif) | ![picture](http://dc.dvgis.cn/examples/images/layer/cluster_circle.gif) | ![picture](http://dc.dvgis.cn/examples/images/model/shp_custom_shader.gif) |
|  ![picture](http://dc.dvgis.cn/examples/images/overlay/polyline_image_trail.gif) | ![picture](http://dc.dvgis.cn/examples/images/overlay/wall_trail.gif) | ![picture](http://dc.dvgis.cn/examples/images/overlay/water.gif)  |  ![picture](http://dc.dvgis.cn/examples/images/overlay/plot-overlay.png)   |

[More>>](http://dc.dvgis.cn/#/examples)

## Ecosystem

|  Module | Status | Description | 
|  :------ | :------: | :------ | 
|  [dc-plugins](https://github.com/dvgis/dc-plugins) | <img src="https://img.shields.io/npm/v/@dvgis/dc-plugins?logo=npm" /> | dc plug-in module, including scene animation, roaming, and some additional materials | 
|  [dc-overlay](https://github.com/dvgis/dc-overlay) | <img src="https://img.shields.io/npm/v/@dvgis/dc-overlay?logo=npm" /> | dc overlay module, including ellipsoid, cylinder, corridor, water surface, etc | 
|  [dc-plot](https://github.com/dvgis/dc-plot) | <img src="https://img.shields.io/npm/v/@dvgis/dc-plot?logo=npm" /> | dc plotting module for plotting and editing overlay | 
|  [dc-chart](https://github.com/dvgis/dc-chart) | <img src="https://img.shields.io/npm/v/@dvgis/dc-chart?logo=npm" /> | dc chart module for adding ECharts functionality in 3d scenes | 
|  [dc-mapv](https://github.com/dvgis/dc-mapv) | <img src="https://img.shields.io/npm/v/@dvgis/dc-mapv?logo=npm" /> | dc big-data module for adding MAPV functions in 3d scenes | 
|  [dc-ui](https://github.com/dvgis/dc-ui) | <img src="https://img.shields.io/npm/v/@dvgis/dc-ui?logo=npm" /> | dc components for Vue | 

## QQ Group

<p>
<img src="http://dc.dvgis.cn/examples/images/base/q1.png?v=2"  style="width:60px;height:60px" title="数字视觉"/>
<img src="http://dc.dvgis.cn/examples/images/base/q2.png?v=3" style="width:60px;height:60px" title="Cesium开心农场"/>
</p>

## Support

> if dc-sdk can bring benefits to you, please support it ~
<p>
<img src="http://dc.dvgis.cn/examples/images/base/sponsor.jpg?v=2" style="width:60px;height:60px" title="数字视觉"/>
</p>

## Copyright

```warning
1. The framework is a basic platform, completely open source, which can be modified and reconstructed by any individual or institution without our authorization.
2. We are not responsible for any problems arising from the modification of the framework by individuals and organizations.
2. Some industrial plug-ins and tools will be added in the later stage, and the code will be open source appropriately.
3. The package released by us may be used permanently and free of charge by any person or organization subject to:
  1) complete package reference;
  2) reserve this copyright information in the console output
We reserve the right of final interpretation of this copyright information.
```

## Thanks
