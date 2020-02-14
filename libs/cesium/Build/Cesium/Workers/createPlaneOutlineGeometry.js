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
define(["./when-0488ac89","./Check-78ca6843","./Math-8a4c9da1","./Cartesian2-cc1e6450","./defineProperties-c6a70625","./Transforms-fa4f10bc","./RuntimeError-4d6e0952","./WebGLConstants-66e14a3b","./ComponentDatatype-9252f28f","./GeometryAttribute-3345e440","./GeometryAttributes-3227db5b"],function(r,e,t,a,n,i,o,c,u,s,y){"use strict";function p(){this._workerName="createPlaneOutlineGeometry"}p.packedLength=0,p.pack=function(e,t){return t},p.unpack=function(e,t,n){return r.defined(n)?n:new p};var m=new a.Cartesian3(-.5,-.5,0),f=new a.Cartesian3(.5,.5,0);return p.createGeometry=function(){var e=new y.GeometryAttributes,t=new Uint16Array(8),n=new Float64Array(12);return n[0]=m.x,n[1]=m.y,n[2]=m.z,n[3]=f.x,n[4]=m.y,n[5]=m.z,n[6]=f.x,n[7]=f.y,n[8]=m.z,n[9]=m.x,n[10]=f.y,n[11]=m.z,e.position=new s.GeometryAttribute({componentDatatype:u.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n}),t[0]=0,t[1]=1,t[2]=1,t[3]=2,t[4]=2,t[5]=3,t[6]=3,t[7]=0,new s.Geometry({attributes:e,indices:t,primitiveType:s.PrimitiveType.LINES,boundingSphere:new i.BoundingSphere(a.Cartesian3.ZERO,Math.sqrt(2))})},function(e,t){return r.defined(t)&&(e=p.unpack(e,t)),p.createGeometry(e)}});
