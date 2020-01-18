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
define(["exports","./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af"],function(e,t,f,a,c){"use strict";var r=a.freezeObject({NONE:0,TOP:1,ALL:2});e.GeometryOffsetAttribute=r,e.arrayFill=function(e,t,f,a){if("function"==typeof e.fill)return e.fill(t,f,a);for(var r=e.length>>>0,i=c.defaultValue(f,0),l=i<0?Math.max(r+i,0):Math.min(i,r),n=c.defaultValue(a,r),u=n<0?Math.max(r+n,0):Math.min(n,r);l<u;)e[l]=t,l++;return e}});
