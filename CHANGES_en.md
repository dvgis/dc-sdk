# Change Log

### 2.8.0 - 2021-12-04

#### Breaking Changes 📣

- Upgrade Cesium to version 1.88.0

#### Additions 🎉

- Add ground primitive layer
- Add both replacement and append FS modes for 3Dtiles
- Add water primitive holes param
- Add hot layer support for classificationType

#### Fixes 🔧

- Improve the function of clearing or removing the primitive layer 
- Improve the history track function

### 2.7.0 - 2021-11-13

#### Breaking Changes 📣

- Upgrade Cesium to version 1.87.0

#### Additions 🎉

- Add overlay clouds
- Add get LayerGroup function

#### Fixes 🔧

- Improve the plot module

### 2.6.1 - 2021-10-23

#### Breaking Changes 📣

- Upgrade Cesium to version 1.86.0

#### Fixes 🔧

- Improve the DivIcon style
- Improve the Popup config
- Improve the terrian name option  [#74](https://github.com/dvgis/dc-sdk/pull/74)

### 2.6.0 - 2021-10-10

#### Breaking Changes 📣

- Upgrade Cesium to version 1.86.0

#### Fixes 🔧

- Improve the MapSwitch [#70](https://github.com/dvgis/dc-sdk/issues/70)
- Improve the AroundView [#72](https://github.com/dvgis/dc-sdk/issues/72)

### 2.5.0 - 2021-09-04

#### Breaking Changes 📣

- Upgrade Cesium to version 1.85.0

#### Fixes 🔧

- Fix the problem that roaming cannot set parameters and the failed camera cannot move [#65](https://github.com/dvgis/dc-sdk/issues/65)
- Fix the problem that the gradient setting of heat layer [#66](https://github.com/dvgis/dc-sdk/issues/66)
- Improve the DivIcon style

### 2.4.2 - 2021-08-28

#### Fixes 🔧

- Hide the chart layer at the back [#55](https://github.com/dvgis/dc-sdk/issues/55)
- Hide the div icon at the back [#56](https://github.com/dvgis/dc-sdk/issues/56)
- Improve the position editor [#57](https://github.com/dvgis/dc-sdk/issues/57)
- Improve the terrain clipping [#58](https://github.com/dvgis/dc-sdk/issues/58)

### 2.4.1 - 2021-08-21

#### Additions 🎉

- Add support for layer mouse events [#53](https://github.com/dvgis/dc-sdk/issues/54)
- Add partial mouse default events [#54](https://github.com/dvgis/dc-sdk/issues/54)
- Add function to get tile information

#### Fixes 🔧

- Improve the plot function

### 2.4.0 - 2021-08-07

#### Breaking Changes 📣

- Upgrade Cesium to version 1.84.0

#### Additions 🎉

- Add bounce primitive overlays
- Add model collection primitive

#### Fixes 🔧

- Refine type property
- Improve mouse event
- Improve once event

### 2.3.2 - 2021-07-25

#### Additions 🎉

- Add model primitive to get node-related functions [#51](https://github.com/dvgis/dc-sdk/issues/51)

#### Fixes 🔧

- Improve the history track restore function [#50](https://github.com/dvgis/dc-sdk/issues/50)

### 2.3.1 - 2021-07-19

#### Breaking Changes 📣

- Refactored plotting function
- Remove Position rounding function
- Refine the infrastructure part of the script

#### Additions 🎉

- Add spatial measurement tools
- Add the plotting tool module
- Add function midCartesian to calculate the middle point of Cartesian3

#### Fixes 🔧

- Improve the Position copy function
- Improve the model editing tool for 3dtiles position editing function
- Improve the function area
- Improve the function of calculating the point position of a sector


### 2.3.0 - 2021-07-03

#### Breaking Changes 📣

- Upgrade Cesium to version 1.83.0

#### Additions 🎉

- Add constants for mouse mode
- Add property settings for globe terrain exaggeration

#### Fixes 🔧

- Improve the parsePositions for string coords

### 2.2.5 - 2021-06-26

#### Additions 🎉

- Adds line and face rotation conversion calculations

#### Fixes 🔧

- Improve the interpolation of history track
- Improve the function of plot for above the overlay
- Fix the problem of flickering when analyzing transformation parameters in the viewable field [#37](https://github.com/dvgis/dc-sdk/issues/37)
- Fix the problem that DivIcon cannot get the current coordinates set to (0,0,0) by default [#38](https://github.com/dvgis/dc-sdk/issues/38)

### 2.2.4 - 2021-06-12

#### Breaking Changes 📣

- Refactored the roaming function into first-person roaming and keyboard roaming [#34](https://github.com/dvgis/dc-sdk/issues/34)
- Original roaming function becomes history track, refine its pause and play [#35](https://github.com/dvgis/dc-sdk/issues/35)

#### Fixes 🔧

- Improve heading function
- Improve diffuse wall primitive
- Fixes RadarScan missing Cesium issue [#33](https://github.com/dvgis/dc-sdk/issues/33)

### 2.2.3 - 2021-06-05

#### Breaking Changes 📣

- Modify the `CESIUM_BASE_URL` setting, which can be set via the global property `baseUrl`, which defaults to `. /libs/dc-sdk/resources/`

#### Additions 🎉

- Add various base primitive such as point, line, billboard, text
- Add diffuse wall primitive

#### Fixes 🔧

- Improve the viewer destroy 
- Refine mouse and context-menu events for primitive

### 2.2.2 - 2021-05-29

#### Additions 🎉

- Open some Cesium internal properties
- Add viewshed analysis
- Add contour line analysis

#### Fixes 🔧

- Improve camera general tools
- Improve the heading-pitch-roll setting of Tileset

### 2.2.1 - 2021-05-22

#### Additions 🎉

- Add camera video layer and plane video layer
- Add plane video overlay
- Add model primitive overlay

#### Fixes 🔧

- Improve the wind layer add fix the issue[#28](https://github.com/dvgis/dc-sdk/issues/28)
- Repair the problem that the auxiliary view cone of video fusion function cannot be displayed[#29](https://github.com/dvgis/dc-sdk/issues/29)
- Improve the video primitive 
- Repair the problem that the animation function cannot be used after the scene time is stoped[#31](https://github.com/dvgis/dc-sdk/issues/31)

### 2.2.0 - 2021-05-09

#### Breaking Changes 📣

- Upgrade Cesium to version 1.81.0
- Rewrite the HeatLayer

#### Additions 🎉

- Add dynamic layer
- Add dynamic model and dynamic billbard
- Add model management functions for model expansion and merging
- Add daylight 、through-view function

### 2.1.4 - 2021-04-24

#### Additions 🎉

- Add map functions for creating TMS, Grid, Mapbox, MapboxStyle
- Add clipping module, including: globe clipping, terrain clipping
- Add GroundSkyBox

#### Fixes 🔧

- Improve the plot module and fix the issue[#26](https://github.com/dvgis/dc-sdk/issues/26)
- Improve the position editor module
- Fix the FeatureGridLayer show and hide issue

### 2.1.3 - 2021-04-17

#### Additions 🎉

- Open section Cesium internal functions
- Add FeatureGridLayer

#### Fixes 🔧

- Fix the plot bugs[#24](https://github.com/dvgis/dc-sdk/issues/24)
- Rewritten logo

### 2.1.2 - 2021-04-10

#### Additions 🎉

- Add DivIcon mouse-over and mouse-out functions
- Add resolution and viewBounds properties

#### Fixes 🔧

- Fix the problem that AroundPoint and AroundView will be accelerated by multiple starts[#22](https://github.com/dvgis/dc-sdk/issues/22)
- Fix the problem that mouse events do not work when the overlay is OSGB[#23](https://github.com/dvgis/dc-sdk/issues/23)

### 2.1.1 - 2021-04-06

#### Fixes 🔧

- Repair the problem that some modules version numbers are not uniform

### 2.1.0 - 2021-04-03

#### Breaking Changes 📣

- Upgrade Cesium to version 1.80.0

#### Additions 🎉

- Add GeoTools class, mainly using Turf for overlay related calculations

#### Fixes 🔧

- Modify the HtmlLayer set show error problem
- Improve the authentication rules of accessToken

### 2.0.0 - 2021-03-27

#### Breaking Changes 📣

- Refactor the entire framework code and modularize the code
- Consolidated previously scattered modules
- Refactored the dependencies on DC in each module package
- Redeveloped the user manual
- Support for custom installation and full installation of DC

#### Additions 🎉

- Added token authentication function. Authentication can use some analysis and point editor functions
- Add support for turf module, you can get turf by `const { turf } = DC.Namespace`.

#### Fixes 🔧

- Fix location bar time delay issue
- Fixed the problem of invalid speed setting for radar scan material
