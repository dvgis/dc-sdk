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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-7d72c08c","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./GeometryAttribute-75811f09","./when-1faa3867","./GeometryAttributes-f8548d3f","./VertexFormat-e2e35139"],function(n,e,t,o,r,p,a,c,i,m,f,y,u,s,l){"use strict";function b(e){e=o.defaultValue(e,o.defaultValue.EMPTY_OBJECT);var t=o.defaultValue(e.vertexFormat,l.VertexFormat.DEFAULT);this._vertexFormat=t,this._workerName="createPlaneGeometry"}b.packedLength=l.VertexFormat.packedLength,b.pack=function(e,t,r){return r=o.defaultValue(r,0),l.VertexFormat.pack(e._vertexFormat,t,r),t};var A=new l.VertexFormat,F={vertexFormat:A};b.unpack=function(e,t,r){t=o.defaultValue(t,0);var a=l.VertexFormat.unpack(e,t,A);return n.defined(r)?(r._vertexFormat=l.VertexFormat.clone(a,r._vertexFormat),r):new b(F)};var d=new p.Cartesian3(-.5,-.5,0),v=new p.Cartesian3(.5,.5,0);return b.createGeometry=function(e){var t,r,a=e._vertexFormat,n=new s.GeometryAttributes;if(a.position){if((r=new Float64Array(12))[0]=d.x,r[1]=d.y,r[2]=0,r[3]=v.x,r[4]=d.y,r[5]=0,r[6]=v.x,r[7]=v.y,r[8]=0,r[9]=d.x,r[10]=v.y,r[11]=0,n.position=new y.GeometryAttribute({componentDatatype:f.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:r}),a.normal){var o=new Float32Array(12);o[0]=0,o[1]=0,o[2]=1,o[3]=0,o[4]=0,o[5]=1,o[6]=0,o[7]=0,o[8]=1,o[9]=0,o[10]=0,o[11]=1,n.normal=new y.GeometryAttribute({componentDatatype:f.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:o})}if(a.st){var i=new Float32Array(8);i[0]=0,i[1]=0,i[2]=1,i[3]=0,i[4]=1,i[5]=1,i[6]=0,i[7]=1,n.st=new y.GeometryAttribute({componentDatatype:f.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:i})}if(a.tangent){var m=new Float32Array(12);m[0]=1,m[1]=0,m[2]=0,m[3]=1,m[4]=0,m[5]=0,m[6]=1,m[7]=0,m[8]=0,m[9]=1,m[10]=0,m[11]=0,n.tangent=new y.GeometryAttribute({componentDatatype:f.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:m})}if(a.bitangent){var u=new Float32Array(12);u[0]=0,u[1]=1,u[2]=0,u[3]=0,u[4]=1,u[5]=0,u[6]=0,u[7]=1,u[8]=0,u[9]=0,u[10]=1,u[11]=0,n.bitangent=new y.GeometryAttribute({componentDatatype:f.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:u})}(t=new Uint16Array(6))[0]=0,t[1]=1,t[2]=2,t[3]=0,t[4]=2,t[5]=3}return new y.Geometry({attributes:n,indices:t,primitiveType:y.PrimitiveType.TRIANGLES,boundingSphere:new c.BoundingSphere(p.Cartesian3.ZERO,Math.sqrt(2))})},function(e,t){return n.defined(t)&&(e=b.unpack(e,t)),b.createGeometry(e)}});
