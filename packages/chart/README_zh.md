# DC-Chart

<p>
<img src="https://img.shields.io/badge/license-Apache%202-blue"/>
<img src="https://img.shields.io/github/package-json/v/dvgis/dc-chart?color=orange&logo=github" />
<img src="https://img.shields.io/npm/dw/@dvgis/dc-chart?logo=npm"/>
</p>

[**🇨🇳 中文**](./README_zh.md) | [**🇬🇧English**](./README.md)

> DC-Chart 是 DC-SDK 与 Echarts 融合的产品。主要用于在 3D 场景中添加 echarts 的统计图表。将统计图表 Gis 化

> [主页](http://dc.dvgis.cn)

```warning
Tips：本框架是 JS+GIS 的框架包。开发者需要有一定的前端技术和 GIS 相关技术
```

## 安装

> CDN

```html
<!--Echarts包-->
<script src="***/echarts.min.js"></script>
<!--基础包-->
<script src="libs/dc-sdk/dc.base.min.js"></script>
<!--核心包-->
<script src="libs/dc-sdk/dc.core.min.js"></script>
<!--图表包-->
<script src="libs/dc-chart/dc.chart.min.js"></script>
<!--主要样式-->
<link href="libs/dc-sdk/dc.core.min.css" rel="stylesheet" type="text/css" />
```


> NPM / YARN

```shell
   yarn add echarts @dvgis/dc-sdk @dvgis/dc-chart
   npm install echarts @dvgis/dc-sdk @dvgis/dc-chart
```

```js
global.echarts = require('echarts') //Echarts包
import DC from 'dvgis/dc-sdk/dist/dc.base.min' //基础包
import DcCore from 'dvgis/dc-sdk/dist/dc.core.min' //核心包
import DcChart from  'dvgis/dc-chart/dist/dc.chart.min' //图表包
import 'dvgis/dc-sdk/dist/dc.core.min.css' //主要样式
```

> JS 包的导入顺序不能随便， echarts/dc.core > dc.chart

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
DC.use(DcCore)
DC.use(DcChart)
DC.ready(() => {
  let viewer = new DC.Viewer(divId) // divId 为一个div节点的Id属性值，如果不传入，会无法初始化3D场景
})
```

## 文档

[DC Api](https://resource.dvgis.cn/dc-api)

[Cesium Api](https://cesium.com/docs/cesiumjs-ref-doc/)

## 示例

| ![图片](http://dc.dvgis.cn/examples/images/datav/e_pm2.5.png) | ![图片](http://dc.dvgis.cn/examples/images/datav/e_pm2.5_2.png) | ![图片](http://dc.dvgis.cn/examples/images/datav/e_plane.gif) | ![图片](http://dc.dvgis.cn/examples/images/datav/e_airline.gif) |
| :----------------------------------------------------------: | :-------------------------------------------------------------: | :----------------------------------------------------------: | :-------------------------------------------------------------: |
| ![图片](http://dc.dvgis.cn/examples/images/datav/e_rk.gif)  | ![图片](http://dc.dvgis.cn/examples/images/datav/e_qx.gif)    |  ![图片](http://dc.dvgis.cn/examples/images/datav/e_wl.gif)   |                                                                                                             |

[更多>>](http://dc.dvgis.cn/#/examples)

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
