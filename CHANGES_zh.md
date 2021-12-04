# Change Log

### 2.8.0 - 2021-12-04

#### Breaking Changes 📣

- 升级 Cesium 到 1.88.0 版本

#### Additions 🎉

- 添加贴地图元图层
- 添加3Dtiles的替换和追加片元着色器两种模式
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

- 完善DivIcon的样式位置的设置
- 完善Popup的样式位置的设置
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
- 完善DivIcon的样式设定

### 2.4.2 - 2021-08-28

#### Fixes 🔧

- 隐藏图表图层当在地球背面 [#55](https://github.com/dvgis/dc-sdk/issues/55)
- 隐藏DivIcon当在地球背面时 [#56](https://github.com/dvgis/dc-sdk/issues/56)
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
- 移除Position舍弃函数
- 完善基础架构部分脚本

#### Additions 🎉

- 添加空间测量工具
- 添加标绘工具模块
- 添加函数 midCartesian，计算笛卡尔坐标系的中间点位

#### Fixes 🔧

- 完善Position复制功能
- 完善模型编辑工具对于3dtiles的位置编辑功能
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

- 开放部分Cesium内部属性
- 添加可视域分析
- 添加等高线分析

#### Fixes 🔧

- 完善相机通用工具
- 完善Tileset的heading-pitch-roll的设置

### 2.2.1 - 2021-05-22

#### Additions 🎉

- 添加相机视频图层、平面视频图层
- 添加平面视频覆盖物
- 添加模型图元覆盖物

#### Fixes 🔧

- 修改风向图层在2维中显示不正确的问题[#28](https://github.com/dvgis/dc-sdk/issues/28)
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

- 添加创建TMS、Grid、Mapbox、MapboxStyle的地图函数
- 添加剖切分析模块，包括：地球裁剪、地形裁剪
- 添加近地天地盒

#### Fixes 🔧

- 完善标绘功能和解决issue[#26](https://github.com/dvgis/dc-sdk/issues/26)
- 完善模型位置编辑工具
- 解决FeatureGridLayer显示和隐藏问题

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
