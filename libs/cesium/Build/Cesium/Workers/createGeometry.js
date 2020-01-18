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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-7d72c08c","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./GeometryAttribute-75811f09","./when-1faa3867","./GeometryAttributes-f8548d3f","./AttributeCompression-5601f533","./GeometryPipeline-6fb2c91a","./EncodedCartesian3-4813be74","./IndexDatatype-2bcfc06b","./IntersectionTests-59cef209","./Plane-b1ca737b","./PrimitivePipeline-28a5eea5","./WebMercatorProjection-1ecca5ba","./createTaskProcessorWorker"],function(b,e,r,t,a,n,i,o,f,c,s,u,d,m,l,p,y,P,k,v,C,h,G){"use strict";var W={};function A(e){var r=W[e];return b.defined(r)||("object"==typeof exports?W[r]=r=require("Workers/"+e):require(["Workers/"+e],function(e){W[r=e]=e})),r}return G(function(e,r){for(var t=e.subTasks,a=t.length,n=new Array(a),i=0;i<a;i++){var o=t[i],f=o.geometry,c=o.moduleName;if(b.defined(c)){var s=A(c);n[i]=s(f,o.offset)}else n[i]=f}return d.when.all(n,function(e){return C.PrimitivePipeline.packCreateGeometryResults(e,r)})})});
