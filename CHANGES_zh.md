# Change Log

### 3.3.0 - 2024-03-21

#### Breaking Changes 📣

- 升级 @cesium/engine 到 8.0.0 版本
- 优化打包方式，移除rollup的打包

#### Fixes 🔧

- 优化聚合图层计算间隔
- 解决栅格瓦片删除销毁问题
- 解决底图删除问题
- 解决单图片瓦片无法加载的问题

### 3.2.0 - 2023-09-25

#### Breaking Changes 📣

- 升级 @cesium/engine 到 4.0.0 版本
- 框架添加开发模式

#### Additions 🎉

- 添加 tileset 钩子事件的支持
- 添加 RasterTileLayer

#### Fixes 🔧

- 优化相机当前位置计算方式


### 3.1.0 - 2023-08-06

#### Breaking Changes 📣

- 升级 @cesium/engine 到 3.0.2 版本
- 文档搭建框架从 VuePress 变换至 VitePress

#### Additions 🎉

- 添加聚合图层鼠标事件的支持

#### Fixes 🔧

- 优化组件初始化功能，能够与第三方框架兼容
- 优化坐标转换功能

### 3.0.1 - 2023-07-30

#### Fixes 🔧

- 优化测量功能
- 优化谷歌地图
- 优化天气效果功能
- 优化中文文档
- 优化示例

### 3.0.0 - 2023-07-23

#### Breaking Changes 📣

- 升级 @cesium/engine 到 3.0.1 版本
- 框架依赖从 Cesium 换成 @cesium/engine，@cesium/widget 库不再使用，只同步`Viewer`相关代码
- 重构框架打包方式, `iife` 和 `node` 两种方式生成单独的框架包
- 重构框架库的目录结构
- 升级材质 `glsl` 到 3.0
- 移除`mapv`图层和`s3m`图层，同时移除了相应的依赖库
- 移除全局函数 `init`、`mixin`、`use`
- 移除`Namespace`全局属性，可通过全局函数`getLib`获取第三方库
- 修改框架 `cdn` 和 `node` 的引入方式，框架使用一个整体包的方式进行加载
- 修改框架入口函数，将使用`ready().then()`作为框架入口
- 修改效果类构造函数，需将`viewer`作为参数传递
- 修改场景 dom 结构，移除了无用的 dom

#### Additions 🎉

- 框架库添加示例代码
- 框架库添加文档代码
- 添加经纬度图层

#### Fixes 🔧

- 优化聚合图层，使用第三方库 `supercluster` 进行聚合计算
- 优化热区图层
- 修复升级 Cesium 框架导致的一系列问题

### 2.17.0 - 2022-10-29

#### Breaking Changes 📣

- 升级 Cesium 到 1.98.1 版本
- 移除 ModelCollectionPrimitive

#### Fixes 🔧

- 修复 locationbar 鼠标移动的坐标错误
- 修复 transform 中坐标转换的问题
- 修复瓦片蒙层问题

### 2.16.2 - 2022-09-13

#### Additions 🎉

- 开放部分 Cesium 原生类

#### Fixes 🔧

- 优化场景导出功能
- 优化地形加载功能[#126](https://github.com/dvgis/dc-sdk/issues/126)

### 2.16.1 - 2022-08-21

#### Additions 🎉

- 添加可视域的混合度参数

#### Fixes 🔧

- 优化 Model Instance
- 优化 heading 函数

### 2.16.0 - 2022-08-14

#### Breaking Changes 📣

- 升级 Cesium 到 1.96.0 版本
- 舍弃 init 函数
- 修改 Cesium 引入方式

#### Fixes 🔧

- 优化 parabola 函数，计算结果添加结束点
- 优化 name space 模块的使用方式
- 修复 CDN 方式下，重复使用 use 导致框架无法使用的问题
- 修复升级 Cesium 产生的问题

### 2.15.0 - 2022-07-16

#### Breaking Changes 📣

- 升级 Cesium 到 1.95.0 版本

#### Additions 🎉

- 添加 flyToBounds 和 zoomToBounds 函数
- 添加代码提示模块
- 添加场景渲染错误订阅事件

#### Fixes 🔧

- 优化定位栏海拔数值[#109](https://github.com/dvgis/dc-sdk/issues/109)
- 修复历史轨迹多次恢复时间错误的问题
- 修复历史轨迹播放结束显示错误的问题[#107](https://github.com/dvgis/dc-sdk/issues/107)
- 修复标绘编辑时锚点数量错误和无法设置大小的问题

### 2.14.0 - 2022-06-04

#### Breaking Changes 📣

- 升级 Cesium 到 1.94.2 版本

#### Additions 🎉

- 添加发光圆锥覆盖物

#### Fixes 🔧

- 优化覆盖物添加和移除功能
- 修复历史轨迹清除功能无效问题 [#102](https://github.com/dvgis/dc-sdk/issues/102)
- 修复编辑圆无法使用问题 [#104](https://github.com/dvgis/dc-sdk/issues/104)
- 修复移除 Cesium.when 导致部分分析功能无法使用问题 [#105](https://github.com/dvgis/dc-sdk/issues/105)

### 2.13.0 - 2022-05-08

#### Breaking Changes 📣

- 升级 Cesium 到 1.93.0 版本

#### Additions 🎉

- 添加场景卷帘效果
- 添加 s3m 高度偏移设置 [#98](https://github.com/dvgis/dc-sdk/issues/98)
- 添加标绘线添加最大锚点数 [#99](https://github.com/dvgis/dc-sdk/issues/99)
- 添加历史轨迹添加模型朝向设置(heading 偏移) [#100](https://github.com/dvgis/dc-sdk/issues/100)

#### Fixes 🔧

- 修复 plot 标绘坐标为空的问题 [#95](https://github.com/dvgis/dc-sdk/issues/95)

### 2.12.0 - 2022-04-10

#### Breaking Changes 📣

- 升级 Cesium 到 1.92.0 版本

#### Additions 🎉

- 添加 3dtiles 卷帘效果
- 添加 LocationBar 的 FPS 和 MS 参数
- 添加自定义 logo 的功能(需通过认证)

#### Fixes 🔧

- 修复 Cesium.when 去除产生的问题
- 完善地图卷帘效果

### 2.11.0 - 2022-03-12

#### Breaking Changes 📣

- 升级 Cesium 到 1.91.0 版本

#### Additions 🎉

- 添加 MSAA (抗锯齿的一种) 的支持
- 添加 GPX 图层
- 添加 S3M 图层(作为单独包)

#### Fixes 🔧

- 解决 node-sass 安装的问题

### 2.10.0 - 2022-02-20

#### Breaking Changes 📣

- 升级 Cesium 到 1.90.0 版本

#### Additions 🎉

- 添加地图过滤色的功能
- 添加框架对于 vite 的支持

#### Fixes 🔧

- 解决 Mapv 模块打包的问题

### 2.9.0 - 2022-01-08

#### Breaking Changes 📣

- 升级 Cesium 到 1.89.0 版本

#### Additions 🎉

- 添加 protocol 参数设置当创建部分地图瓦片
- 添加部分工具类类名简写

#### Fixes 🔧

- 解决右击菜单内容为空依旧显示的问题
- 解决覆盖物样式设置覆盖问题
- 解决部分覆盖物设置标签无效的问题

### 2.8.0 - 2021-12-04

#### Breaking Changes 📣

- 升级 Cesium 到 1.88.0 版本

#### Additions 🎉

- 添加贴地图元图层
- 添加 3Dtiles 的替换和追加片元着色器两种模式
- 添加水面图元洞面参数
- 添加热区图层对贴地的支持

#### Fixes 🔧

- 完善图元图层清除或移除功能
- 完善历史轨迹功能

### 2.7.0 - 2021-11-13

#### Breaking Changes 📣

- 升级 Cesium 到 1.87.0 版本

#### Additions 🎉

- 添加覆盖物云
- 添加获取图层组函数

#### Fixes 🔧

- 完善标绘功能

### 2.6.1 - 2021-10-23

#### Breaking Changes 📣

- 升级 Cesium 到 1.86.1 版本

#### Fixes 🔧

- 完善 DivIcon 的样式位置的设置
- 完善 Popup 的样式位置的设置
- 完善添加地形名称的设置 [#74](https://github.com/dvgis/dc-sdk/pull/74)

### 2.6.0 - 2021-10-10

#### Breaking Changes 📣

- 升级 Cesium 到 1.86.0 版本

#### Fixes 🔧

- 完善地图切换组件样式 [#70](https://github.com/dvgis/dc-sdk/pull/70)
- 完善相机环绕功能 [#72](https://github.com/dvgis/dc-sdk/issues/72)

### 2.5.0 - 2021-09-04

#### Breaking Changes 📣

- 升级 Cesium 到 1.85.0 版本

#### Fixes 🔧

- 修复漫游无法设置参数以及失效相机无法移动的问题 [#65](https://github.com/dvgis/dc-sdk/issues/65)
- 修复热区图层渐变设置失效的问题 [#66](https://github.com/dvgis/dc-sdk/issues/66)
- 完善 DivIcon 的样式设定

### 2.4.2 - 2021-08-28

#### Fixes 🔧

- 隐藏图表图层当在地球背面 [#55](https://github.com/dvgis/dc-sdk/issues/55)
- 隐藏 DivIcon 当在地球背面时 [#56](https://github.com/dvgis/dc-sdk/issues/56)
- 完善模型位置编辑工具 [#57](https://github.com/dvgis/dc-sdk/issues/57)
- 完善地形裁剪分析 [#58](https://github.com/dvgis/dc-sdk/issues/58)

### 2.4.1 - 2021-08-21

#### Additions 🎉

- 添加图层鼠标事件的支持 [#53](https://github.com/dvgis/dc-sdk/issues/54)
- 添加部分鼠标默认事件 [#54](https://github.com/dvgis/dc-sdk/issues/54)
- 添加获取瓦片信息的函数

#### Fixes 🔧

- 完善标绘功能

### 2.4.0 - 2021-08-07

#### Breaking Changes 📣

- 升级 Cesium 到 1.84.0 版本

#### Additions 🎉

- 添加跳动图元覆盖物
- 添加模型集合图元

#### Fixes 🔧

- 完善类型属性
- 完善鼠标事件的管理
- 完善 once 事件

### 2.3.2 - 2021-07-25

#### Additions 🎉

- 添加模型图元获取节点相关函数 [#51](https://github.com/dvgis/dc-sdk/issues/51)

#### Fixes 🔧

- 完善历史轨迹恢复功能 [#50](https://github.com/dvgis/dc-sdk/issues/50)

### 2.3.1 - 2021-07-19

#### Breaking Changes 📣

- 重构标绘功能
- 移除 Position 舍弃函数
- 完善基础架构部分脚本

#### Additions 🎉

- 添加空间测量工具
- 添加标绘工具模块
- 添加函数 midCartesian，计算笛卡尔坐标系的中间点位

#### Fixes 🔧

- 完善 Position 复制功能
- 完善模型编辑工具对于 3dtiles 的位置编辑功能
- 完善函数 area
- 完善扇形的点位计算功能

### 2.3.0 - 2021-07-03

#### Breaking Changes 📣

- 升级 Cesium 到 1.83.0 版本

#### Additions 🎉

- 添加鼠标模式的常量
- 添加地球地形夸张的属性设置

#### Fixes 🔧

- 完善字符串坐标转换功能

### 2.2.5 - 2021-06-26

#### Additions 🎉

- 添加线和面的旋转转换计算

#### Fixes 🔧

- 完善历史轨迹的插值方式
- 完善标绘模块在模型上标绘的功能
- 修复可视域分析变换参数时闪烁的问题[#37](https://github.com/dvgis/dc-sdk/issues/37)
- 修复 DivIcon 无法获取当前坐标默认设置为 (0,0,0) 的问题[#38](https://github.com/dvgis/dc-sdk/issues/38)

### 2.2.4 - 2021-06-12

#### Breaking Changes 📣

- 重构漫游功能，漫游功能分为第一人称漫游和键盘漫游[#34](https://github.com/dvgis/dc-sdk/issues/34)
- 原有的漫游功能变为历史轨迹，完善其暂停和播放[#35](https://github.com/dvgis/dc-sdk/issues/35)

#### Fixes 🔧

- 完善 heading 函数
- 完善扩散墙功能
- 修复 RadarScan 缺少 Cesium 的问题[#33](https://github.com/dvgis/dc-sdk/issues/33)

### 2.2.3 - 2021-06-05

#### Breaking Changes 📣

- 修改`CESIUM_BASE_URL`设置，可通过全局属性`baseUrl`进行赋值设置，默认为`./libs/dc-sdk/resources/`

#### Additions 🎉

- 添加各类基本图元要素如：点、线、图标、文本
- 添加扩散墙图元

#### Fixes 🔧

- 完善场景销毁功能
- 完善图元的鼠标和右击菜单事件

### 2.2.2 - 2021-05-29

#### Additions 🎉

- 开放部分 Cesium 内部属性
- 添加可视域分析
- 添加等高线分析

#### Fixes 🔧

- 完善相机通用工具
- 完善 Tileset 的 heading-pitch-roll 的设置

### 2.2.1 - 2021-05-22

#### Additions 🎉

- 添加相机视频图层、平面视频图层
- 添加平面视频覆盖物
- 添加模型图元覆盖物

#### Fixes 🔧

- 修改风向图层在 2 维中显示不正确的问题[#28](https://github.com/dvgis/dc-sdk/issues/28)
- 修复视频融合功能辅助视锥无法显示的问题[#29](https://github.com/dvgis/dc-sdk/issues/29)
- 完善视频图元功能
- 修复场景时间暂停后无法使用动画功能的问题[#31](https://github.com/dvgis/dc-sdk/issues/31)

### 2.2.0 - 2021-05-09

#### Breaking Changes 📣

- 升级 Cesium 到 1.81.0 版本
- 重写 HeatLayer 的实现方式

#### Additions 🎉

- 添加动态图层
- 添加动态模型和动态图标覆盖物
- 添加模型管理功能，用于模型的展开、合并
- 添加日照分析、通视分析功能

### 2.1.4 - 2021-04-24

#### Additions 🎉

- 添加创建 TMS、Grid、Mapbox、MapboxStyle 的地图函数
- 添加剖切分析模块，包括：地球裁剪、地形裁剪
- 添加近地天地盒

#### Fixes 🔧

- 完善标绘功能和解决 issue[#26](https://github.com/dvgis/dc-sdk/issues/26)
- 完善模型位置编辑工具
- 解决 FeatureGridLayer 显示和隐藏问题

### 2.1.3 - 2021-04-17

#### Additions 🎉

- 开放部分 Cesium 内部函数
- 添加 FeatureGridLayer

#### Fixes 🔧

- 修复部分军标无法使用的问题[#24](https://github.com/dvgis/dc-sdk/issues/24)
- 重写 logo 的实现方式

### 2.1.2 - 2021-04-10

#### Additions 🎉

- 添加 DivIcon 鼠标移入和移出功能
- 添加地图当前分辨率和视野范围属性

#### Fixes 🔧

- 修复绕点环绕和绕地环绕会多次点击会加速的问题[#22](https://github.com/dvgis/dc-sdk/issues/22)
- 修复覆盖物为倾斜摄影时，鼠标事件无法使用的问题[#23](https://github.com/dvgis/dc-sdk/issues/23)

### 2.1.1 - 2021-04-06

#### Fixes 🔧

- 修复部分模块版本号不统一的问题

### 2.1.0 - 2021-04-03

#### Breaking Changes 📣

- 升级 Cesium 到 1.80.0 版本

#### Additions 🎉

- 添加 GeoTools 工具类，主要利用 Turf 进行覆盖物的相关计算

#### Fixes 🔧

- 修改 HtmlLayer 设置 show 的错误问题
- 完善 accessToken 的认证规则

### 2.0.0 - 2021-03-27

#### Breaking Changes 📣

- 重构整个框架代码，将代码模块化处理
- 整合之前分散的模块
- 重构了各个模块包中对 DC 的依赖
- 重新开发了用户手册
- 支持自定安装和整体安装的方式引入 DC

#### Additions 🎉

- 添加 token 认证功能。认证通过可以使用一些分析、点位编辑功能
- 添加 turf 模块的支持，可以通过 `const {turf} = DC.Namespace` 获取 turf

#### Fixes 🔧

- 修改 location bar 时间延迟问题
- 修改雷达扫描材质设置速度无效的问题
