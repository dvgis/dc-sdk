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
define(["exports","./when-a55a8a4c","./Check-bc1d37d9"],function(e,c,t){"use strict";var a=Object.freeze({NONE:0,TOP:1,ALL:2});e.GeometryOffsetAttribute=a,e.arrayFill=function(e,t,a,f){if("function"==typeof e.fill)return e.fill(t,a,f);for(var r=e.length>>>0,n=c.defaultValue(a,0),i=n<0?Math.max(r+n,0):Math.min(n,r),l=c.defaultValue(f,r),u=l<0?Math.max(r+l,0):Math.min(l,r);i<u;)e[i]=t,i++;return e}});
