# DC-Mapv

<p>
<img src="https://img.shields.io/badge/license-Apache%202-blue"/>
<img src="https://img.shields.io/github/package-json/v/dvgis/dc-mapv?color=orange&logo=github" />
<img src="https://img.shields.io/npm/dw/@dvgis/dc-mapv?logo=npm"/>
</p>

[**🇨🇳 中文**](./README_zh.md) | [**🇬🇧English**](./README.md)

> DC-Mapv 是 DC-SDK 与 百度 Mapv 融合的产品。主要用于在 3D 场景中展现大数据。

> [主页](http://dc.dvgis.cn)

```warning
Tips：This SDK is JS+GIS framework package. Developers need to have some front-end technology and GIS related technology
```

## 安装

> CDN

```html
<!--基础包-->
<script src="libs/dc-sdk/dc.base.min.js"></script>
<!--核心包-->
<script src="libs/dc-sdk/dc.core.min.js"></script>
<!--Mapv 包-->
<script src="libs/dc-sdk/dc.mapv.min.js"></script>
<!--主要样式-->
<link href="libs/dc-sdk/dc.core.min.css" rel="stylesheet" type="text/css" />
```

> NPM / YARN

```node
   yarn add @dvgis/dc-sdk  @dvgis/dc-mapv 
   npm install @dvgis/dc-sdk  @dvgis/dc-mapv 
```

```js
import DC from  'dvgis/dc-sdk/dist/dc.base.min' //基础包
import DcCore from 'dvgis/dc-sdk/dist/dc.core.min' //核心包
import DcMapv from  'dvgis/dc-mapv/dist/dc.plugins.min' //Mapv 包
import 'dvgis/dc-sdk/dist/dc.core.min.css' // 主要样式
```

## 配置

> Vue

```js
// vue.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgis = './node_modules/@dvgis'

module.exports = {
  // 其他配置
  chainWebpack: (config) => {
    config.resolve.alias.set('dvgis', path.resolve(__dirname, dvgisDist))
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

## 文档

[Cesium Api](https://cesium.com/docs/cesiumjs-ref-doc/)

[Mapv Api](https://github.com/huiyan-fe/mapv/blob/master/API.md)

[DC-Mapv Api](http://resource.dvgis.cn/dc-api/mapv/)

## 示例

|  ![pic](http://dc.dvgis.cn/examples/images/datav/m_point.png)  |  ![pic](http://dc.dvgis.cn/examples/images/datav/m_point_d.gif)   |  ![pic](http://dc.dvgis.cn/examples/images/datav/m_point_i.png)   |   ![pic](http://dc.dvgis.cn/examples/images/datav/m_grid.png)   |
| :------------------------------------------------------------: | :---------------------------------------------------------------: | :---------------------------------------------------------------: | :-------------------------------------------------------------: |
|  ![pic](http://dc.dvgis.cn/examples/images/datav/m_grid_d.gif)   | ![pic](http://dc.dvgis.cn/examples/images/datav/m_honeycomb.png)  | ![pic](http://dc.dvgis.cn/examples/images/datav/m_honeycomb_d.gif) | ![pic](http://dc.dvgis.cn/examples/images/datav/m_polyline.png) |
| ![pic](http://dc.dvgis.cn/examples/images/datav/m_polyline_d.gif) | ![pic](http://dc.dvgis.cn/examples/images/datav/m_polyline_i.png) |                                                                                                                |

[More>>](http://dc.dvgis.cn/#/examples)

## 版权声明

```warning
1.框架是一个基本平台，完全开源，任何个人和机构可以修改、重构，无需经过我方授权。
2.后期会添加一系列针对性的插件和工具，会适量的开源。
3.任何个人和机构在遵守下列条件的前提下可以永久免费使用:
   1)程序包完整引用；
   2)保留此版权信息在控制台输出 
我方保留对此版权信息的最终解释权。
```

## 感谢
