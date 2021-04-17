# Change Log

### 2.1.3 - 2021-04-17

#### Additions 🎉

- 开放部分Cesium内部函数

#### Fixes 🔧

- 部分军标无法使用[#24](https://github.com/dvgis/dc-sdk/issues/24)
- 重写logo的实现方式

#### Additions 🎉

- 添加DivIcon鼠标移入和移出功能
- 添加地图当前分辨率和视野范围属性

### 2.1.2 - 2021-04-10

#### Additions 🎉

- 添加DivIcon鼠标移入和移出功能
- 添加地图当前分辨率和视野范围属性

#### Fixes 🔧

- 修复绕点环绕和绕地环绕会多次点击会加速的问题[#22](https://github.com/dvgis/dc-sdk/issues/22)
- 修复覆盖物为倾斜摄影时，鼠标事件无法使用的问题[#23](https://github.com/dvgis/dc-sdk/issues/23)

### 2.1.1 - 2021-04-06

#### Fixes 🔧

- 修复部分模块版本号不统一的问题

### 2.1.0 - 2021-04-03

#### Breaking Changes 📣

- 升级Cesium到1.80.0版本

#### Additions 🎉

- 添加GeoTools工具类，主要利用Turf进行覆盖物的相关计算

#### Fixes 🔧

- 修改HtmlLayer设置show的错误问题
- 完善accessToken的认证规则

### 2.0.0 - 2021-03-27

#### Breaking Changes 📣

- 重构整个框架代码，将代码模块化处理
- 整合之前分散的模块
- 重构了各个模块包中对DC的依赖
- 重新开发了用户手册
- 支持自定安装和整体安装的方式引入DC

#### Additions 🎉

- 添加token认证功能。认证通过可以使用一些分析、点位编辑功能
- 添加turf模块的支持，可以通过 `const {turf} = DC.Namespace` 获取 turf

#### Fixes 🔧

- 修改 location bar 时间延迟问题
- 修改雷达扫描材质设置速度无效的问题
