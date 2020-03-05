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
define(["exports","./when-a55a8a4c","./Check-bc1d37d9","./Math-73a8bd13"],function(e,h,t,r){"use strict";var c=r.CesiumMath.EPSILON10;e.arrayRemoveDuplicates=function(e,t,r){if(h.defined(e)){r=h.defaultValue(r,!1);var a,n,i,f=e.length;if(f<2)return e;for(a=1;a<f&&!t(n=e[a-1],i=e[a],c);++a);if(a===f)return r&&t(e[0],e[e.length-1],c)?e.slice(1):e;for(var u=e.slice(0,a);a<f;++a)t(n,i=e[a],c)||(u.push(i),n=i);return r&&1<u.length&&t(u[0],u[u.length-1],c)&&u.shift(),u}}});
