/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
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
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./Math-7782f09e","./Cartesian2-ba70b51f","./Transforms-7d72c08c"],function(n,i,e,a,t,o,r){"use strict";function s(n,e){this.normal=o.Cartesian3.clone(n),this.distance=e}s.fromPointNormal=function(n,e,a){var t=-o.Cartesian3.dot(e,n);return i.defined(a)?(o.Cartesian3.clone(e,a.normal),a.distance=t,a):new s(e,t)};var c=new o.Cartesian3;s.fromCartesian4=function(n,e){var a=o.Cartesian3.fromCartesian4(n,c),t=n.w;return i.defined(e)?(o.Cartesian3.clone(a,e.normal),e.distance=t,e):new s(a,t)},s.getPointDistance=function(n,e){return o.Cartesian3.dot(n.normal,e)+n.distance};var l=new o.Cartesian3;s.projectPointOntoPlane=function(n,e,a){i.defined(a)||(a=new o.Cartesian3);var t=s.getPointDistance(n,e),r=o.Cartesian3.multiplyByScalar(n.normal,t,l);return o.Cartesian3.subtract(e,r,a)};var f=new o.Cartesian3;s.transform=function(n,e,a){return r.Matrix4.multiplyByPointAsVector(e,n.normal,c),o.Cartesian3.normalize(c,c),o.Cartesian3.multiplyByScalar(n.normal,-n.distance,f),r.Matrix4.multiplyByPoint(e,f,f),s.fromPointNormal(f,c,a)},s.clone=function(n,e){return i.defined(e)?(o.Cartesian3.clone(n.normal,e.normal),e.distance=n.distance,e):new s(n.normal,n.distance)},s.equals=function(n,e){return n.distance===e.distance&&o.Cartesian3.equals(n.normal,e.normal)},s.ORIGIN_XY_PLANE=a.freezeObject(new s(o.Cartesian3.UNIT_Z,0)),s.ORIGIN_YZ_PLANE=a.freezeObject(new s(o.Cartesian3.UNIT_X,0)),s.ORIGIN_ZX_PLANE=a.freezeObject(new s(o.Cartesian3.UNIT_Y,0)),n.Plane=s});
