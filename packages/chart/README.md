# DC-Chart

<p>
<img src="https://img.shields.io/badge/license-Apache%202-blue"/>
<img src="https://img.shields.io/github/package-json/v/dvgis/dc-chart?color=orange&logo=github" />
<img src="https://img.shields.io/npm/dw/@dvgis/dc-chart?logo=npm"/>
</p>

[**🇨🇳 中文**](./README_zh.md) | [**🇬🇧English**](./README.md)

> DC-Chart is a product of integration of dc-sdk and Echarts. Mainly used to add statistical charts of Echarts to 3D scenes. Gis the statistical chart

> [Home Page](http://dc.dvgis.cn)

```warning
Tips：This SDK is JS+GIS framework package. Developers need to have some front-end technology and GIS related technology
```

## Installation

> CDN

```html
<!--Echarts Package-->
<script src="***/echarts.min.js"></script>
<!--Basic Package-->
<script src="libs/dc-sdk/dc.base.min.js"></script>
<!--Core Package-->
<script src="libs/dc-sdk/dc.core.min.js"></script>
<!--Chart Package-->
<script src="libs/dc-chart/dc.chart.min.js"></script>
<!--Main Style Sheet -->
<link href="libs/dc-sdk/dc.core.min.css" rel="stylesheet" type="text/css" />
```

> NPM / YARN

```shell
   yarn add echarts @dvgis/dc-sdk @dvgis/dc-plugins
   npm install echarts @dvgis/dc-sdk @dvgis/dc-plugins
```

```js
global.echarts = require('echarts') //Echarts Package
import DC from 'dvgis/dc-sdk/dist/dc.base.min' //Basic Package
import DcCore from 'dvgis/dc-sdk/dist/dc.core.min' //Core Package
import DcChart from  'dvgis/dc-chart/dist/dc.chart.min' //Chart Package
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
DC.use(DcCore)
DC.use(DcChart)
DC.ready(() => {
  let viewer = new DC.Viewer(divId) // divId is the Id attribute value of a div node. If it is not passed in, the 3D scene cannot be initialized
})
```

## Documentation

[DC Api](https://resource.dvgis.cn/dc-api)

[Cesium Api](https://cesium.com/docs/cesiumjs-ref-doc/)

## Demo

| ![picture](http://dc.dvgis.cn/examples/images/datav/e_pm2.5.png) | ![picture](http://dc.dvgis.cn/examples/images/datav/e_pm2.5_2.png) | ![picture](http://dc.dvgis.cn/examples/images/datav/e_plane.gif) | ![picture](http://dc.dvgis.cn/examples/images/datav/e_airline.gif) |
| :----------------------------------------------------------: | :-------------------------------------------------------------: | :----------------------------------------------------------: | :-------------------------------------------------------------: |
| ![picture](http://dc.dvgis.cn/examples/images/datav/e_rk.gif)  | ![picture](http://dc.dvgis.cn/examples/images/datav/e_qx.gif)    |  ![picture](http://dc.dvgis.cn/examples/images/datav/e_wl.gif)   |                                                                                                             |

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

## Thanks
