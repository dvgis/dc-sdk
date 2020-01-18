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
define(["./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./defineProperties-c817531e","./Transforms-7d72c08c","./RuntimeError-51c34ab4","./WebGLConstants-90dbfe2f","./ComponentDatatype-418b1c61","./GeometryAttribute-75811f09","./when-1faa3867","./GeometryAttributes-f8548d3f","./IndexDatatype-2bcfc06b","./GeometryOffsetAttribute-fa4e7a11","./CylinderGeometryLibrary-f35c6b75"],function(h,e,t,f,i,v,r,A,a,n,O,R,o,G,V,C,L){"use strict";var g=new v.Cartesian2;function d(e){var t=(e=f.defaultValue(e,f.defaultValue.EMPTY_OBJECT)).length,i=e.topRadius,r=e.bottomRadius,a=f.defaultValue(e.slices,128),n=Math.max(f.defaultValue(e.numberOfVerticalLines,16),0);this._length=t,this._topRadius=i,this._bottomRadius=r,this._slices=a,this._numberOfVerticalLines=n,this._offsetAttribute=e.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}d.packedLength=6,d.pack=function(e,t,i){return i=f.defaultValue(i,0),t[i++]=e._length,t[i++]=e._topRadius,t[i++]=e._bottomRadius,t[i++]=e._slices,t[i++]=e._numberOfVerticalLines,t[i]=f.defaultValue(e._offsetAttribute,-1),t};var b={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};return d.unpack=function(e,t,i){t=f.defaultValue(t,0);var r=e[t++],a=e[t++],n=e[t++],o=e[t++],u=e[t++],s=e[t];return h.defined(i)?(i._length=r,i._topRadius=a,i._bottomRadius=n,i._slices=o,i._numberOfVerticalLines=u,i._offsetAttribute=-1===s?void 0:s,i):(b.length=r,b.topRadius=a,b.bottomRadius=n,b.slices=o,b.numberOfVerticalLines=u,b.offsetAttribute=-1===s?void 0:s,new d(b))},d.createGeometry=function(e){var t=e._length,i=e._topRadius,r=e._bottomRadius,a=e._slices,n=e._numberOfVerticalLines;if(!(t<=0||i<0||r<0||0===i&&0===r)){var o,u=2*a,s=L.CylinderGeometryLibrary.computePositions(t,i,r,a,!1),f=2*a;if(0<n){var d=Math.min(n,a);o=Math.round(a/d),f+=d}var b,l=V.IndexDatatype.createTypedArray(u,2*f),c=0;for(b=0;b<a-1;b++)l[c++]=b,l[c++]=b+1,l[c++]=b+a,l[c++]=b+1+a;if(l[c++]=a-1,l[c++]=0,l[c++]=a+a-1,l[c++]=a,0<n)for(b=0;b<a;b+=o)l[c++]=b,l[c++]=b+a;var m=new G.GeometryAttributes;m.position=new R.GeometryAttribute({componentDatatype:O.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:s}),g.x=.5*t,g.y=Math.max(r,i);var p=new A.BoundingSphere(v.Cartesian3.ZERO,v.Cartesian2.magnitude(g));if(h.defined(e._offsetAttribute)){t=s.length;var y=new Uint8Array(t/3),_=e._offsetAttribute===C.GeometryOffsetAttribute.NONE?0:1;C.arrayFill(y,_),m.applyOffset=new R.GeometryAttribute({componentDatatype:O.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:y})}return new R.Geometry({attributes:m,indices:l,primitiveType:R.PrimitiveType.LINES,boundingSphere:p,offsetAttribute:e._offsetAttribute})}},function(e,t){return h.defined(t)&&(e=d.unpack(e,t)),d.createGeometry(e)}});
