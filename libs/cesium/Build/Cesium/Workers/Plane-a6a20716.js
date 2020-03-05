/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./when-a55a8a4c","./Check-bc1d37d9","./Math-73a8bd13","./Cartesian2-8c9f79ed","./Transforms-7a81c8c2"],function(n,i,a,e,o,t){"use strict";function s(n,a){this.normal=o.Cartesian3.clone(n),this.distance=a}s.fromPointNormal=function(n,a,e){var t=-o.Cartesian3.dot(a,n);return i.defined(e)?(o.Cartesian3.clone(a,e.normal),e.distance=t,e):new s(a,t)};var r=new o.Cartesian3;s.fromCartesian4=function(n,a){var e=o.Cartesian3.fromCartesian4(n,r),t=n.w;return i.defined(a)?(o.Cartesian3.clone(e,a.normal),a.distance=t,a):new s(e,t)},s.getPointDistance=function(n,a){return o.Cartesian3.dot(n.normal,a)+n.distance};var c=new o.Cartesian3;s.projectPointOntoPlane=function(n,a,e){i.defined(e)||(e=new o.Cartesian3);var t=s.getPointDistance(n,a),r=o.Cartesian3.multiplyByScalar(n.normal,t,c);return o.Cartesian3.subtract(a,r,e)};var l=new o.Cartesian3;s.transform=function(n,a,e){return t.Matrix4.multiplyByPointAsVector(a,n.normal,r),o.Cartesian3.normalize(r,r),o.Cartesian3.multiplyByScalar(n.normal,-n.distance,l),t.Matrix4.multiplyByPoint(a,l,l),s.fromPointNormal(l,r,e)},s.clone=function(n,a){return i.defined(a)?(o.Cartesian3.clone(n.normal,a.normal),a.distance=n.distance,a):new s(n.normal,n.distance)},s.equals=function(n,a){return n.distance===a.distance&&o.Cartesian3.equals(n.normal,a.normal)},s.ORIGIN_XY_PLANE=Object.freeze(new s(o.Cartesian3.UNIT_Z,0)),s.ORIGIN_YZ_PLANE=Object.freeze(new s(o.Cartesian3.UNIT_X,0)),s.ORIGIN_ZX_PLANE=Object.freeze(new s(o.Cartesian3.UNIT_Y,0)),n.Plane=s});
