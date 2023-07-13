---
sidebar: auto
---

# 教程 🌎

## 简介

### DC-SDK 是什么

**_`DC-SDK`_** 是基于开源项目 **_`Cesium`_** 进行二次开发的二三维一体的 **_`WebGis`_** 应用框架，该框架优化了部分 **_`Cesium`_** 的使用方式和增添一些通用功能，旨在为开发者快速构建 **_`WebGis`_** 应用。

### DC-SDK 能做什么

- `二、三维场景可视化`

支持二三维无缝切换，一套代码多种风格。通过框架可以添加地图、各类矢量数据和模型到场景中，使场景更加贴近真实世界。

- `各大厂商的地图管理`

支持高德、百度、腾讯、天地图、Google、MapBox 等厂商的地图接入，对于国内部分地图可进行偏移处理。

- `各类数据的统一管理`

框架提供覆盖物对应的图层管理操作，通过图层可对覆盖物进行针对性的筛选和整体的控制。

- `各类数据动画和特效`

提供线、面、圆、模型等的材质效果和细节动画，让覆盖物的材质能够随着时间变化。

- `三维场景后期的特效`

提供云、雨、雪、雾等天气功能和包括绕点环绕、绕地环绕、扫描圈(雷达)、视频融合、泛光、夜视等一些动画以及后期特效。

- `路径漫游和定点巡航`

提供根据设定的路线进行自动漫游和巡航功能，方便重点区域定位查看。

- `空间分析能力`

提供测距、面积、高度等各种量算功能以及可视域、通视等三维场景分析功能。

- `兼容第三方地图工具库`

提供对 turf、heatmap、mapv、echarts 等常用可视化库和开源库的功能接入集成，避免用户的重复学习和成本投入。

## 准备工作

`运行环境`

DC-SDK 是依赖于[`WebGL`](#webgl)运行的一套开发平台，需要开发或运行终端配置 `独立显卡` 和安装支持 `WebGL` 的浏览器，推荐使用 **_Chrome(谷歌)_**、**_Firefox(火狐)_**

`静态服务器`

静态服务器主要用于发布地图瓦片、地形、模型数据等数据服务，如：**_Apache Http Sever_**、**_Tomcat_** 、**_Nginx_**，推荐使用 **_Nginx_**

`硬件配置`

> 硬件配置说明，建议使用如下的硬件配置进行三维场景的浏览和开发。

<table style="width:100%">
 <tr><td colspan=3 style="text-align:center;background:#3eaf7c;">PC端</td></tr>
 <tr><td>项目</td><td>标准配置</td><td>推荐配置</td></tr>
 <tr><td>CPU</td><td>2.6GHz 64位 处理器</td><td>3.0GHz 64位 处理器</td></tr>
 <tr><td>内存</td><td>8GB</td><td>32GB</td></tr>
 <tr><td>显卡型号</td><td>NVIDIA GTX 1660 (或同级别)</td><td>NVIDIA RTX 2080 (或同级别)</td></tr>
 <tr><td>显存</td><td>4GB</td><td>16G</td></tr>
 <tr><td>最优分辨率</td><td>FHD - 1920 * 1080</td><td>4K QFHD - 3840 * 2160</td></tr>
 <tr><td>操作系统</td><td colspan=2>64 位 Windows 8/10/11 或 64 位 Linux 桌面发行版，或 macOS 10.12.1以上版本</td></tr>
 <tr><td>浏览器</td><td colspan=2>Google Chrome 或 Firefox 当前最新版本</td></tr>
</table>

<table style="width:78.7%">
 <tr><td colspan=3 style="text-align:center;background:#3eaf7c;">移动设备</td></tr>
 <tr><td width="16%">平台</td><td>Android</td><td>Apple</td></tr>
 <tr><td>设备</td><td>兼容 Android 操作系统的移动设备，2019年及以上的中高端型号</td><td>IPhone 11 及以上型号，IPad Pro 2019 及以上型号</td></tr>
 <tr><td>操作系统</td><td>Android</td><td>IOS 或 IPadOS</td></tr>
 <tr><td>浏览器</td><td colspan=2>支持 WebGL 的浏览器</td></tr>
</table>

### 框架安装

`NPM / YARN` **_`(推荐使用)`_**

NPM / YARN 的方式安装，它能更好地和 `webpack` 打包工具配合使用。

```shell
npm install @dvgis/dc-sdk
-------------------------
yarn add @dvgis/dc-sdk
```

```js
import * as DC from '@dvgis/dc-sdk' //基础包
import '@dvgis/dc-sdk/dist/dc.core.min.css' // 主要样式
```


`CDN`

[下载链接](https://github.com/dvgis/dc-sdk/releases)

```html
<script src="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.min.js"></script>
<link
  href="https://cdn.jsdelivr.net/npm/@dvgis/dc-sdk/dist/dc.min.css"
  rel="stylesheet"
  type="text/css"
/>
```

### 应用配置

由于 DC 框架中将 `CESIUM_BASE_URL` 设置为 `./libs/dc-sdk/resources/`，这样需将 `Cesium` 相关的静态资源文件: `Assets`、`Workers` 、`ThirdParty` 复制到工程的 `libs/dc-sdk/resources` 目录下以保证三维场景能够正常呈现,也可通过 `DC.baseUrl` 进行 `Cesium` 相关的静态资源路基设置

> `NPM / YARN`

`Webpack` [工程模板](https://github.com/cavencj/dc-vue-app)

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

`Vue2.x` [工程模板](https://github.com/dvgis/dc-vue)

```js
// vue.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  // 其他配置
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

`Vue3.x` [工程模板](https://github.com/dvgis/dc-vue-next)

```js
// vue.config.js

const path = require('path')
const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgisDist = './node_modules/@dvgis'

module.exports = {
  // 其他配置
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

直接通过[网站](https://github.com/dvgis/dc-sdk/releases)下载当前版本的资源文件

### 代码提示

通过安装代码提示工具包，能够在开发过程中提示和自动完成框架内部的接口，更好地提高开发效率

```shell
npm install @dvgis/types -D
-------------------------
yarn add @dvgis/types -D
```

### 快速上手

> [框架安装](#框架安装) 和 [配置](#应用配置) 后，就可以开发属于自己的 **_`WebGis`_** 应用了

`构建三维容器`

```html
<div class="viewer-container" id="viewer-container"></div>
<!-- id属性必须赋值，否则无法创建三维场景 -->
```

`构建三维场景`

```js
DC.ready().then(() => {
  let viewer = new DC.Viewer('viewer-container')
})
```

`运行效果` [更多示例](http://dc.dvgis.cn/#/examples)

<iframe src="https://dc.dvgis.cn/#/editor?type=info&example=start" frameborder="0" height="500px" width="100%" >
</iframe>

## 总架构图

> DC 架构图，建议使用前先熟悉整体架构图，以便能够快速使用。[查看大图](http://dc.dvgis.cn/examples/images/base/dc2.x.png)

<img src="http://dc.dvgis.cn/examples/images/base/dc2.x.png" style="width:100%;height:800px">

## 技术扩展

### WebGL

WebGL 是一种 JavaScript API，用于在不使用插件的情况下在任何兼容的网页浏览器中呈现交互式 2D 和 3D 图形。WebGL 完全集成到浏览器的所有网页标准中，可将影像处理和效果的 GPU 加速使用方式当做网页 Canvas 的一部分。WebGL 元素可以加入其他 HTML 元素之中并与网页或网页背景的其他部分混合。WebGL 程序由 JavaScript 编写的句柄和 OpenGL Shading Language（ **`GLSL`** ）编写的着色器代码组成。

### 三维数据格式

**`glb/gltf`**

GLTF 代表 Graphics Language Transmission Format（图形语言传输格式）。这种跨平台格式已成为 Web 上的 3D 对象标准。它由 OpenGL 和 Vulkan 背后的 3D 图形标准组织 Khronos 所定义，这使得 GLTF 基本上成为 3D 模型的 JPG 格式：Web 导出的通用标准。

**`OSGB`**

倾斜摄影三维模型数据的组织方式一般是二进制存贮的、带有嵌入式链接纹理数据（.jpg）的 OSGB 格式。Open Scene Gragh Binary 是 OSGB 的全称，这里的 Binary 是二进制的意思。此类数据文件碎、数量多、高级别金字塔文件大等特点难以形成高效、标准的网络发布方案，从而无法实现不同地域、不同部门之间数据共享。

**`3d-tiles`**

3D Tiles 是用于流式传输大规模异构 3D 地理空间数据集的开放规范。3D Tiles 数据可以通过 shp、osgb(倾斜摄影)、3dmax 等数据生成。

**`GeoJson`**

GeoJSON 是一种对各种地理数据结构进行编码的格式，基于 Javascript 对象表示法的地理空间信息数据交换格式。GeoJSON 对象可以表示几何、特征或者特征集合。GeoJSON 支持下面几何类型：点、线、面、多点、多线、多面和几何集合。GeoJSON 里的特征包含一个几何对象和其他属性，特征集合表示一系列特征。

**`kml/czml`**

KML/CZML 是一个 JSON 格式的数据,描述 time-dynamic（时间、动态）图形场景,它描述了线、点、广告牌(标记)、模型、和其他图形原语,并指定他们如何随时间变化。

:::tip
数据转换可借助于 [CesiumLab](http://www.cesiumlab.com) 或者其他一些转换工具。[查看大图](http://dc.dvgis.cn/examples/images/base/data_transform.png)
:::
<img src="http://dc.dvgis.cn/examples/images/base/data_transform.png" style="width:100%;height:500px">

### 三维坐标

**`世界坐标(Cartesian3)`**

笛卡尔坐标，以椭球中心为原点的空间直角坐标系中的一个点的坐标。

**`地理坐标(Cartographic)`**

地理坐标系，坐标原点在椭球的质心。

经度：参考椭球面上某点的大地子午面与本初子午面间的两面角。东正西负。

纬度 ：参考椭球面上某点的法线与赤道平面的夹角。北正南负。

**`地理坐标(Position)`**

地理坐标系，坐标原点在椭球的质心。`DC扩展`

经度：参考椭球面上某点的大地子午面与本初子午面间的两面角。东正西负。

纬度 ：参考椭球面上某点的法线与赤道平面的夹角。北正南负。

高度 ：和地球表面的距离

**`屏幕坐标(Cartesian2)`**

浏览器窗口坐标或者鼠标事件中 windowPosition

:::tip
框架中可以使用 `DC.T` 进行各类坐标的转换
:::

### 地理坐标系

`WGS84`

一种国际上采用的地心坐标系。坐标原点为地球质心，其地心空间直角坐标系的 Z 轴指向 BIH （国际时间服务机构）1984.O 定义的协议地球极（CTP)方向，X 轴指向 BIH 1984.0 的零子午面和 CTP 赤道的交点，Y 轴与 Z 轴、X 轴垂直构成右手坐标系，称为 1984 年世界大地坐标系统。

`CGCS2000`

2000 中国大地坐标系(China Geodetic Coordinate System 2000，CGCS2000)，又称之为 2000 国家大地坐标系，是中国新一代大地坐标系，21 世纪初已在中国正式实施。其与 `WGS84` 相差不大，国内天地图就是采用该坐标系。

`GCJ02`

GCJ-02 是由中国国家测绘局（G 表示 Guojia 国家，C 表示 Cehui 测绘，J 表示 Ju 局）制订的地理信息系统的坐标系统。它其实就是对真实坐标系统进行人为的加偏处理，按照特殊的算法，将真实的坐标加密成虚假的坐标，而这个加偏并不是线性的加偏，所以各地的偏移情况都会有所不同。而加密后的坐标也常被大家称为“火星坐标系统”。

`BD09`

BD09 经纬度投影属于百度坐标系，它是在标准经纬度的基础上进行 GCJ-02 加偏之后，再加上百度自身的加偏算法，也就是在标准经纬度的基础之上进行了两次加偏。

[参考](http://www.rivermap.cn/docs/show-1829.html)

:::tip
框架中可以使用 `DC.CoordTransform` 进行各类坐标系的转换
:::

## 群聊

<p>
<img src="http://dc.dvgis.cn/examples/images/base/q3.png?v=1" title="数字视觉" width="240px" height="332px"/>
<img src="http://dc.dvgis.cn/examples/images/base/q1.png?v=2" title="数字视觉(已满)"  width="240px" height="332px"/>
<img src="http://dc.dvgis.cn/examples/images/base/q2.png?v=6" title="Cesium开心农场"  width="240px" height="332px"/>
</p>

## 感谢

> 以下列表为 DC 平台的赞助或打赏人员，排名不分先后，如果有什么隐私问题，请联系我

`donkie` `Wchino` `莫慌` `凌风` `老戴` `蔺星`

## 支持

> 如果 dc-sdk 能够给您带来效益，请支持一下呗~

<p style="display:flex">
<a href="https://www.paypal.com/paypalme/cavencj" target="_blank">
<img src="https://www.paypalobjects.com/images/shared/paypal-logo-129x32.svg" style="margin-top:10px;margin-right:20px" />
</a>
<img src="http://dc.dvgis.cn/examples/images/base/sponsor.jpg?v=2" title="数字视觉"/>
</p>
