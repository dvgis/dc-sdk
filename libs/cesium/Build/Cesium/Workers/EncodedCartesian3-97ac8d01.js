/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
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
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./when-0488ac89","./Check-78ca6843","./Cartesian2-cc1e6450"],function(e,h,n,i){"use strict";function a(){this.high=i.Cartesian3.clone(i.Cartesian3.ZERO),this.low=i.Cartesian3.clone(i.Cartesian3.ZERO)}a.encode=function(e,n){var i;return h.defined(n)||(n={high:0,low:0}),0<=e?(i=65536*Math.floor(e/65536),n.high=i,n.low=e-i):(i=65536*Math.floor(-e/65536),n.high=-i,n.low=e+i),n};var r={high:0,low:0};a.fromCartesian=function(e,n){h.defined(n)||(n=new a);var i=n.high,o=n.low;return a.encode(e.x,r),i.x=r.high,o.x=r.low,a.encode(e.y,r),i.y=r.high,o.y=r.low,a.encode(e.z,r),i.z=r.high,o.z=r.low,n};var t=new a;a.writeElements=function(e,n,i){a.fromCartesian(e,t);var o=t.high,h=t.low;n[i]=o.x,n[i+1]=o.y,n[i+2]=o.z,n[i+3]=h.x,n[i+4]=h.y,n[i+5]=h.z},e.EncodedCartesian3=a});
