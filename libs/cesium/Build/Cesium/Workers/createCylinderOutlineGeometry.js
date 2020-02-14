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
define(["./when-0488ac89","./Check-78ca6843","./Math-8a4c9da1","./Cartesian2-cc1e6450","./defineProperties-c6a70625","./Transforms-fa4f10bc","./RuntimeError-4d6e0952","./WebGLConstants-66e14a3b","./ComponentDatatype-9252f28f","./GeometryAttribute-3345e440","./GeometryAttributes-3227db5b","./IndexDatatype-8575c917","./GeometryOffsetAttribute-22febf92","./CylinderGeometryLibrary-3d1c0916"],function(h,e,t,v,i,A,r,a,R,G,O,V,C,L){"use strict";var g=new v.Cartesian2;function f(e){var t=(e=h.defaultValue(e,h.defaultValue.EMPTY_OBJECT)).length,i=e.topRadius,r=e.bottomRadius,a=h.defaultValue(e.slices,128),n=Math.max(h.defaultValue(e.numberOfVerticalLines,16),0);this._length=t,this._topRadius=i,this._bottomRadius=r,this._slices=a,this._numberOfVerticalLines=n,this._offsetAttribute=e.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}f.packedLength=6,f.pack=function(e,t,i){return i=h.defaultValue(i,0),t[i++]=e._length,t[i++]=e._topRadius,t[i++]=e._bottomRadius,t[i++]=e._slices,t[i++]=e._numberOfVerticalLines,t[i]=h.defaultValue(e._offsetAttribute,-1),t};var d={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};return f.unpack=function(e,t,i){t=h.defaultValue(t,0);var r=e[t++],a=e[t++],n=e[t++],o=e[t++],u=e[t++],s=e[t];return h.defined(i)?(i._length=r,i._topRadius=a,i._bottomRadius=n,i._slices=o,i._numberOfVerticalLines=u,i._offsetAttribute=-1===s?void 0:s,i):(d.length=r,d.topRadius=a,d.bottomRadius=n,d.slices=o,d.numberOfVerticalLines=u,d.offsetAttribute=-1===s?void 0:s,new f(d))},f.createGeometry=function(e){var t=e._length,i=e._topRadius,r=e._bottomRadius,a=e._slices,n=e._numberOfVerticalLines;if(!(t<=0||i<0||r<0||0===i&&0===r)){var o,u=2*a,s=L.CylinderGeometryLibrary.computePositions(t,i,r,a,!1),f=2*a;if(0<n){var d=Math.min(n,a);o=Math.round(a/d),f+=d}var c,l=V.IndexDatatype.createTypedArray(u,2*f),m=0;for(c=0;c<a-1;c++)l[m++]=c,l[m++]=c+1,l[m++]=c+a,l[m++]=c+1+a;if(l[m++]=a-1,l[m++]=0,l[m++]=a+a-1,l[m++]=a,0<n)for(c=0;c<a;c+=o)l[m++]=c,l[m++]=c+a;var b=new O.GeometryAttributes;b.position=new G.GeometryAttribute({componentDatatype:R.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:s}),g.x=.5*t,g.y=Math.max(r,i);var p=new A.BoundingSphere(v.Cartesian3.ZERO,v.Cartesian2.magnitude(g));if(h.defined(e._offsetAttribute)){t=s.length;var y=new Uint8Array(t/3),_=e._offsetAttribute===C.GeometryOffsetAttribute.NONE?0:1;C.arrayFill(y,_),b.applyOffset=new G.GeometryAttribute({componentDatatype:R.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:y})}return new G.Geometry({attributes:b,indices:l,primitiveType:G.PrimitiveType.LINES,boundingSphere:p,offsetAttribute:e._offsetAttribute})}},function(e,t){return h.defined(t)&&(e=f.unpack(e,t)),f.createGeometry(e)}});
