# DC-SDK

<p>
<img src="https://img.shields.io/github/workflow/status/dvgis/dc-sdk/publish"/>
<img src="https://img.shields.io/badge/license-Apache%202-blue"/>
<img src="https://img.shields.io/npm/v/@dvgis/dc-sdk?color=orange&logo=npm" />
<img src="https://img.shields.io/npm/dm/@dvgis/dc-sdk?logo=npm"/>
</p>

[**🇨🇳 中文**](./README_zh.md) | [**🇬🇧English**](./README.md)

> DC-SDK 是基于 Cesium 进行二次开发的2、3D一体 WebGis 应用框架,该框架优化了 Cesium 的使用方式和增添了一些额外功能，旨在为开发者快速构建 WebGis 应用。

> [主页](http://dc.dvgis.cn)

```warning
Tips：本框架是 JS+GIS 的框架包。开发者需要有一定的前端技术和 GIS 相关技术
```

## 安装

> CDN

```html
<!--基础包-->
<script src="libs/dc-sdk/dc.base.min.js"></script>
<!--核心包-->
<script src="libs/dc-sdk/dc.core.min.js"></script>
<!--主要样式-->
<link href="libs/dc-sdk/dc.core.min.css" rel="stylesheet" type="text/css" />
```

> NPM / YARN

```shell
   yarn add @dvgis/dc-sdk
   npm install @dvgis/dc-sdk
```

```js
import DC from 'dvgis/dc-sdk/dist/dc.base.min' //基础包
import DcCore from  'dvgis/dc-sdk/dist/dc.core.min' //核心包
import 'dvgis/dc-sdk/dist/dc.core.min.css' // 主要样式
```

## 配置

> Vue

```js
// vue.config.js vue 文件

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  // 其他配置
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

## 开始

```js
global.DC = DC
DC.use(DcCore)
DC.ready(() => {
  let viewer = new DC.Viewer(divId) // divId 为一个div节点的Id属性值，如果不传入，会无法初始化3D场景
})
```

## 文档

[DC  Api](https://resource.dvgis.cn/dc-api)

[Cesium Api](https://cesium.com/docs/cesiumjs-ref-doc/)

## 示例

|  ![picture](http://dc.dvgis.cn/examples/images/baselayer/google.png) | ![picture](http://dc.dvgis.cn/examples/images/baselayer/baidu.png) | ![picture](http://dc.dvgis.cn/examples/images/baselayer/tdt.png) | ![picture](http://dc.dvgis.cn/examples/images/baselayer/arcgis.png) |
|  :-----------------------------------------------------------: | :-----------------------------------------------------------: | :------------------------------------------------------------------: | :--------------------------------------------------------------: |
|  ![picture](http://dc.dvgis.cn/examples/images/scene/globe_rotate.gif) | ![picture](http://dc.dvgis.cn/examples/images/model/factory.gif) | ![picture](http://dc.dvgis.cn/examples/images/layer/cluster_circle.gif) | ![picture](http://dc.dvgis.cn/examples/images/model/shp_custom_shader.gif) |
|  ![picture](http://dc.dvgis.cn/examples/images/overlay/polyline_image_trail.gif) | ![picture](http://dc.dvgis.cn/examples/images/overlay/wall_trail.gif) | ![picture](http://dc.dvgis.cn/examples/images/overlay/water.gif)  |  ![picture](http://dc.dvgis.cn/examples/images/overlay/plot-overlay.png)   |

[更多>>](http://dc.dvgis.cn/#/examples)

## 生态

|  模块名称 | 状态 | 描述 | 
|  :---- | :------: | :------ | 
| [dc-plugins](https://github.com/dvgis/dc-plugins) | <img src="https://img.shields.io/npm/v/@dvgis/dc-plugins?logo=npm" /> | DC插件模块，包括场景动画、漫游以及一些额外的材质 | 
| [dc-overlay](https://github.com/dvgis/dc-overlay) | <img src="https://img.shields.io/npm/v/@dvgis/dc-overlay?logo=npm" /> | DC要素模块，包括球体、柱体、军标、水面等 | 
| [dc-plot](https://github.com/dvgis/dc-plot) | <img src="https://img.shields.io/npm/v/@dvgis/dc-plot?logo=npm" /> | DC标绘模块，用于要素的标绘和编辑 | 
| [dc-chart](https://github.com/dvgis/dc-chart) | <img src="https://img.shields.io/npm/v/@dvgis/dc-chart?logo=npm" /> | DC图表模块，用于在三维场景中添加echarts功能 | 
| [dc-mapv](https://github.com/dvgis/dc-mapv) | <img src="https://img.shields.io/npm/v/@dvgis/dc-mapv?logo=npm" /> | DC大数据模块，用于在三维场景中添加mapv功能 | 
| [dc-ui](https://github.com/dvgis/dc-ui) | <img src="https://img.shields.io/npm/v/@dvgis/dc-ui?logo=npm" /> | DC组件开发框架，将DC功能Vue模块化| 

## QQ 群

<p>
<img src="http://dc.dvgis.cn/examples/images/base/q1.png?v=2" style="width:60px;height:60px" title="数字视觉"/>
<img src="http://dc.dvgis.cn/examples/images/base/q2.png?v=3" style="width:60px;height:60px" title="Cesium开心农场"/>
</p>

## 支持

> 如果dc-sdk能够给您带来效益，请支持一下呗~
<p>
<img src="http://dc.dvgis.cn/examples/images/base/sponsor.jpg?v=2" style="width:60px;height:60px" title="数字视觉"/>
</p>

## 版权声明

```warning
1.框架作为一个基础平台，代码开源，任何个人和机构可以修改、重构，无需经过我方授权。
2.任何个人和机构修改框架出现的问题，我方无需负责。
3.后期会添加一些行业性的插件和工具，代码会适量开源。
4.对于我方发布的程序包，任何个人和机构在遵守下列条件的前提下可以永久免费使用:
   1)程序包完整引用；
   2)保留此版权信息在控制台输出
我方保留对此版权信息的最终解释权。
```

## 谢谢
