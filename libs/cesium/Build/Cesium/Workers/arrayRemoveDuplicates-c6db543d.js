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
define(["exports","./when-0488ac89","./Check-78ca6843","./Math-8a4c9da1"],function(e,c,t,r){"use strict";var h=r.CesiumMath.EPSILON10;e.arrayRemoveDuplicates=function(e,t,r){if(c.defined(e)){r=c.defaultValue(r,!1);var a,n,i,f=e.length;if(f<2)return e;for(a=1;a<f&&!t(n=e[a-1],i=e[a],h);++a);if(a===f)return r&&t(e[0],e[e.length-1],h)?e.slice(1):e;for(var u=e.slice(0,a);a<f;++a)t(n,i=e[a],h)||(u.push(i),n=i);return r&&1<u.length&&t(u[0],u[u.length-1],h)&&u.shift(),u}}});
