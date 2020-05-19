# DC-SDK

[**🇨🇳 中文**](./README_zh.md) | [**🇬🇧English**](./README.md)

> 该 SDK 是基于开源项目 Cesium 进行的二次开发，优化了 Cesium 一些操作，通过该框架开发者可以快速的开发 3D 应用。
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
import 'dvgis/dc-sdk/dist/dc.base.min' //基础包
import 'dvgis/dc-sdk/dist/dc.core.min' //核心包
import 'dvgis/dc-sdk/dist/dc.core.min.css' // 主要样式
```

## 配置

> Vue

```js
// vue.config.js vue 文件

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgis = './node_modules/@dvgis'

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
DC.ready(() => {
  let viewer = new DC.Viewer(divId) // divId 为一个div节点的Id属性值，如果不传入，会无法初始化3D场景
})
```

## 文档

[Cesium-Api](https://cesium.com/docs/cesiumjs-ref-doc/)

[DC-SDK-Api](http://dc.dvgis.cn/#/docs)

## 示例

|     ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/info/start.png)     |                        ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/info/coord.png)                         |                   ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/baselayer/tencent.png)                    |     ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/baselayer/tdt.png)      |
| :------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: |
|   ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/baselayer/amap.png)   |                      ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/baselayer/baidu.png)                      |                      ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/layer/vector.png)                      |     ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/layer/cluster.png)      |
|   ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/layer/geojson.png)    | <img src="https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/layer/tileset.png" alt="开始" width="200px" height="150px"/> | <img src="https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/layer/html.png" alt="开始" width="200px" height="150px"/> |   ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/overlay/point_icon.png)   |
| ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/overlay/point_base.png) |                      ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/overlay/circle.png)                       |               ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/overlay/polyline_material.png)                | ![图片](https://raw.githubusercontent.com/Digital-Visual/dc-sdk-examples/master/images/overlay/polygon_height.png) |

[更多>>](http://dc.cavencj.cn/home/#/examples)

## 版权声明

```warning
1.框架是一个基本平台，完全开源，任何个人和机构可以修改、重构，无需经过我方授权。
2.后期会添加一系列针对性的插件和工具，会适量的开源。
3.任何个人和机构在遵守下列条件的前提下可以永久免费使用:
   1)程序包完整引用；
   2)保留此版权信息在控制台输出 我方保留对此版权信息的最终解释权。
```

## 感谢
