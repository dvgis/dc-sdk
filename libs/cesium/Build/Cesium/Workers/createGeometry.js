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
define(["./when-0488ac89","./Check-78ca6843","./Math-8a4c9da1","./Cartesian2-cc1e6450","./defineProperties-c6a70625","./Transforms-fa4f10bc","./RuntimeError-4d6e0952","./WebGLConstants-66e14a3b","./ComponentDatatype-9252f28f","./GeometryAttribute-3345e440","./GeometryAttributes-3227db5b","./AttributeCompression-fe1560e2","./GeometryPipeline-587f449d","./EncodedCartesian3-97ac8d01","./IndexDatatype-8575c917","./IntersectionTests-12255a09","./Plane-466db411","./PrimitivePipeline-0d9185c5","./WebMercatorProjection-c0de4fbc","./createTaskProcessorWorker"],function(u,e,r,t,n,a,i,o,s,c,f,d,b,m,p,l,y,P,k,v){"use strict";var C={};function h(e){var r=C[e];return u.defined(r)||("object"==typeof exports?C[r]=r=require("Workers/"+e):require(["Workers/"+e],function(e){C[r=e]=e})),r}return v(function(e,r){for(var t=e.subTasks,n=t.length,a=new Array(n),i=0;i<n;i++){var o=t[i],s=o.geometry,c=o.moduleName;if(u.defined(c)){var f=h(c);a[i]=f(s,o.offset)}else a[i]=s}return u.when.all(a,function(e){return P.PrimitivePipeline.packCreateGeometryResults(e,r)})})});
