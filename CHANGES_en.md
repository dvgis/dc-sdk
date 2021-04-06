# Change Log

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

