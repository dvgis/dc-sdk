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
define(["exports","./defined-2a4f2d00","./Check-e5651467","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e"],function(e,n,t,i,a,u,o){"use strict";function d(e){this._ellipsoid=i.defaultValue(e,u.Ellipsoid.WGS84),this._semimajorAxis=this._ellipsoid.maximumRadius,this._oneOverSemimajorAxis=1/this._semimajorAxis}o.defineProperties(d.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}}),d.mercatorAngleToGeodeticLatitude=function(e){return a.CesiumMath.PI_OVER_TWO-2*Math.atan(Math.exp(-e))},d.geodeticLatitudeToMercatorAngle=function(e){d.MaximumLatitude<e?e=d.MaximumLatitude:e<-d.MaximumLatitude&&(e=-d.MaximumLatitude);var t=Math.sin(e);return.5*Math.log((1+t)/(1-t))},d.MaximumLatitude=d.mercatorAngleToGeodeticLatitude(Math.PI),d.prototype.project=function(e,t){var i=this._semimajorAxis,a=e.longitude*i,o=d.geodeticLatitudeToMercatorAngle(e.latitude)*i,r=e.height;return n.defined(t)?(t.x=a,t.y=o,t.z=r,t):new u.Cartesian3(a,o,r)},d.prototype.unproject=function(e,t){var i=this._oneOverSemimajorAxis,a=e.x*i,o=d.mercatorAngleToGeodeticLatitude(e.y*i),r=e.z;return n.defined(t)?(t.longitude=a,t.latitude=o,t.height=r,t):new u.Cartographic(a,o,r)},e.WebMercatorProjection=d});
