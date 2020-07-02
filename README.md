# DC-SDK

<p>
<img src="https://img.shields.io/badge/license-Apache%202-blue"/>
<img src="https://img.shields.io/github/package-json/v/Digital-Visual/dc-sdk?color=orange&logo=github" />
<img src="https://img.shields.io/npm/dw/@dvgis/dc-sdk?logo=npm"/>
</p>

[**🇨🇳 中文**](./README_zh.md) | [**🇬🇧English**](./README.md)

> The SDK is a secondary development based on the open source project Cesium, which optimizes some operations of Cesium and enables developers to quickly develop 3D applications through the framework.

> [home](http://dc.dvgis.cn)

```warning
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
import 'dvgis/dc-sdk/dist/dc.base.min' //Basic Package
import 'dvgis/dc-sdk/dist/dc.core.min' //Core Package
import 'dvgis/dc-sdk/dist/dc.core.min.css' // Main Style Sheet
```

## Setting

> Vue

```js
// vue.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgis = './node_modules/@dvgis'

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
DC.ready(() => {
  let viewer = new DC.Viewer(divId) // divId is the Id attribute value of a div node. If it is not passed in, the 3D scene cannot be initialized
})
```

## Documentation

[Cesium Api](https://cesium.com/docs/cesiumjs-ref-doc/)

[DC-SDK Api](http://resource.dvgis.cn/dc-api)

## Demo

|     ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/info/start.png)     |                       ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/info/coord.png)                       |                  ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/baselayer/tencent.png)                  |     ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/baselayer/tdt.png)      |
| :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
|   ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/baselayer/amap.png)   |                    ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/baselayer/baidu.png)                     |                    ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/layer/vector.png)                     |     ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/layer/cluster.png)      |
|   ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/layer/geojson.png)    | <img src="https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/layer/tileset.png" alt="开始" width="200px" height="150px"/> | <img src="https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/layer/html.png" alt="开始" width="200px" height="150px"/> |   ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/overlay/point_icon.png)   |
| ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/overlay/point_base.png) |                     ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/overlay/circle.png)                     |              ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/overlay/polyline_material.png)              | ![picture](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/overlay/polygon_height.png) |

[More>>](http://dc.dvgis.cn/#/examples)

## Copyright statement

```warning
1. The framework is a basic platform, completely open source, which can be modified and reconstructed by any individual or institution without our authorization.
2. A series of targeted plug-ins and tools will be added later, and an appropriate amount of open source.
3. Free and permanent use by any person or institution subject to the following conditions:
  1) complete package reference;
  2) reserve this copyright information in the console output
We reserve the right of final interpretation of this copyright information.
```

## QQ Group

<p>

<img src="https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/base/q1.png" style="width:60px;height:60px"  title="Cesium*融合"/>

<img src="https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/base/q2.png"  style="width:60px;height:60px" title="Cesium开心农场"/>

</p>

## Thanks
