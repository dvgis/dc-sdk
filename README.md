# DC-SDK

<p>
<img src="https://img.shields.io/github/workflow/status/dvgis/dc-sdk/publish"/>
<img src="https://img.shields.io/badge/license-Apache%202-blue"/>
<img src="https://img.shields.io/npm/v/@dvgis/dc-sdk?color=orange&logo=npm" />
<img src="https://img.shields.io/npm/dm/@dvgis/dc-sdk?logo=npm"/>
</p>

[**🇨🇳 中文**](./README_zh.md) | [**🇬🇧English**](./README.md)

> DC-SDK is based on Cesium for secondary development of 2, 3D all-in-one WebGis application framework, the framework optimizes the use of Cesium and add some additional features, designed for developers to quickly build WebGis applications.

## Home

> http://dc.dvgis.cn

```warningH
Tips：This SDK is JS+GIS framework package. Developers need to have some front-end technology and GIS related technology
```

## Installation

`CDN`

```html
<!--Basic Package-->
<script src="libs/dc-sdk/dc.base.min.js"></script>
<!--Core Package-->
<script src="libs/dc-sdk/dc.core.min.js"></script>
<!--Main Style Sheet -->
<link href="libs/dc-sdk/dc.core.min.css" rel="stylesheet" type="text/css" />
```

`NPM / YARN`

```shell
yarn add @dvgis/dc-sdk
npm install @dvgis/dc-sdk
```

```js
import DC from '@dvgis/dc-base' //Basic Package
import DcCore from '@dvgis/dc-core' //Core Package
import '@dvgis/dc-core/dist/dc.core.min.css' // Main Style Sheet
```

## Setting

`Webpack`

```js
 // webpack.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  // other settings
  plugins:[
    new CopyWebpackPlugin([
      {  
        from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
        to: 'libs/dc-sdk/resources' 
      }
    ])
  ]
}
```

`Vue2.x`

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

`Vue3.x`

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
      {
        patterns: [
          {
            from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
            to: path.join(__dirname, 'dist', 'libs/dc-sdk/resources'),
          },
        ],
      }
    ])
  }
}
```

## Start

```js
global.DC = DC
DC.use(DcCore) // node
DC.ready(() => {
  let viewer = new DC.Viewer(divId) // divId is the Id attribute value of a div node. If it is not passed in, the 3D scene cannot be initialized
})
```

## Documentation

[DC Sdk Api](https://resource.dvgis.cn/dc-api/v2.x)

[Cesium Api](https://cesium.com/docs/cesiumjs-ref-doc/)

## Demo

|  ![picture](http://dc.dvgis.cn/examples/images/baselayer/baidu.png?v=1) | ![picture](http://dc.dvgis.cn/examples/images/baselayer/tdt.png?v=1) | ![picture](http://dc.dvgis.cn/examples/images/baselayer/arcgis.png?v=2) | ![picture](http://dc.dvgis.cn/examples/images/mini-scene/china.gif) |
|  :-----------------------------------------------------------: | :-----------------------------------------------------------: | :------------------------------------------------------------------: | :--------------------------------------------------------------: |
|  ![picture](http://dc.dvgis.cn/examples/images/mini-scene/dfmz.gif) | ![picture](http://dc.dvgis.cn/examples/images/mini-scene/factory.gif?v=1) | ![picture](http://dc.dvgis.cn/examples/images/layer/cluster_circle.gif) | ![picture](http://dc.dvgis.cn/examples/images/model/shp_custom_shader.gif) |
|  ![picture](http://dc.dvgis.cn/examples/images/overlay/polyline_image_trail.gif) | ![picture](http://dc.dvgis.cn/examples/images/overlay/wall_trail.gif?v=1) | ![picture](http://dc.dvgis.cn/examples/images/overlay/water.gif?v=2)  |  ![picture](http://dc.dvgis.cn/examples/images/overlay/plot-overlay.png)   |

[More>>](http://dc.dvgis.cn/#/examples)

## Ecosystem

|  Module | Status | Description | 
|  :------ | :------: | :------ |
|  [dc-chart](https://github.com/dvgis/dc-chart) | <img src="https://img.shields.io/npm/v/@dvgis/dc-chart?logo=npm" /> | dc chart module for adding ECharts functionality in 3d scenes | 
|  [dc-mapv](https://github.com/dvgis/dc-mapv) | <img src="https://img.shields.io/npm/v/@dvgis/dc-mapv?logo=npm" /> | dc big-data module for adding MAPV functions in 3d scenes |  
|  [dc-ui](https://github.com/dvgis/dc-ui) | <img src="https://img.shields.io/npm/v/@dvgis/dc-ui?logo=npm" /> | dc components for Vue2.x | 
|  dc-analysis | <img src="https://img.shields.io/npm/v/@dvgis/dc-analysis?logo=npm" /> | dc analysis module, including camera-video, position-editor, measure, etc |
|  dc-ui-next | <img src="https://img.shields.io/npm/v/@dvgis/dc-ui-next?logo=npm" /> | dc components for Vue3.x |

## QQ Group

<p>
<img src="http://dc.dvgis.cn/examples/images/base/q1.png?v=2"  style="width:60px;height:60px" title="数字视觉"/>
<img src="http://dc.dvgis.cn/examples/images/base/q2.png?v=6" style="width:60px;height:60px" title="Cesium开心农场"/>
</p>


## Copyright

```warning
1. The framework is a basic platform, completely open source, which can be modified and reconstructed by any individual or institution without our authorization.
2. We are not responsible for any problems arising from the modification of the framework by individuals and organizations.
3. Some industrial plug-ins and tools will be added in the later stage, and the code will be open source appropriately.
4. The package released by us may be used permanently and free of charge by any person or organization subject to:
  1) complete package reference;
  2) reserve this copyright information in the console output
We reserve the right of final interpretation of this copyright information.
```

## Support

> if dc-sdk can bring benefits to you, please support it ~
<p>
<img src="http://dc.dvgis.cn/examples/images/base/sponsor.jpg?v=2" style="width:60px;height:60px" title="数字视觉"/>
</p>

## Thanks
