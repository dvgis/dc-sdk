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
define(["exports","./defined-2a4f2d00","./Math-7782f09e","./Cartesian2-ba70b51f","./EllipsoidTangentPlane-8dc9a637","./PolygonPipeline-75c02603","./PolylinePipeline-90090425"],function(e,C,A,w,b,E,O){"use strict";var i={};var M=new w.Cartographic,L=new w.Cartographic;var F=new Array(2),H=new Array(2),T={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};i.computePositions=function(e,i,t,n,r,o){var a=function(e,i,t,n){var r=i.length;if(!(r<2)){var o=C.defined(n),a=C.defined(t),l=!0,s=new Array(r),h=new Array(r),g=new Array(r),p=i[0];s[0]=p;var d=e.cartesianToCartographic(p,M);a&&(d.height=t[0]),l=l&&d.height<=0,h[0]=d.height,g[0]=o?n[0]:0;for(var P,u,c=1,v=1;v<r;++v){var f=i[v],y=e.cartesianToCartographic(f,L);a&&(y.height=t[v]),l=l&&y.height<=0,P=d,u=y,A.CesiumMath.equalsEpsilon(P.latitude,u.latitude,A.CesiumMath.EPSILON14)&&A.CesiumMath.equalsEpsilon(P.longitude,u.longitude,A.CesiumMath.EPSILON14)?d.height<y.height&&(h[c-1]=y.height):(s[c]=f,h[c]=y.height,g[c]=o?n[v]:0,w.Cartographic.clone(y,d),++c)}if(!(l||c<2))return s.length=c,h.length=c,g.length=c,{positions:s,topHeights:h,bottomHeights:g}}}(e,i,t,n);if(C.defined(a)){if(i=a.positions,t=a.topHeights,n=a.bottomHeights,3<=i.length){var l=b.EllipsoidTangentPlane.fromPoints(i,e).projectPointsOntoPlane(i);E.PolygonPipeline.computeWindingOrder2D(l)===E.WindingOrder.CLOCKWISE&&(i.reverse(),t.reverse(),n.reverse())}var s,h,g=i.length,p=g-2,d=A.CesiumMath.chordLength(r,e.maximumRadius),P=T;if(P.minDistance=d,P.ellipsoid=e,o){var u,c=0;for(u=0;u<g-1;u++)c+=O.PolylinePipeline.numberOfPoints(i[u],i[u+1],d)+1;s=new Float64Array(3*c),h=new Float64Array(3*c);var v=F,f=H;P.positions=v,P.height=f;var y=0;for(u=0;u<g-1;u++){v[0]=i[u],v[1]=i[u+1],f[0]=t[u],f[1]=t[u+1];var m=O.PolylinePipeline.generateArc(P);s.set(m,y),f[0]=n[u],f[1]=n[u+1],h.set(O.PolylinePipeline.generateArc(P),y),y+=m.length}}else P.positions=i,P.height=t,s=new Float64Array(O.PolylinePipeline.generateArc(P)),P.height=n,h=new Float64Array(O.PolylinePipeline.generateArc(P));return{bottomPositions:h,topPositions:s,numCorners:p}}},e.WallGeometryLibrary=i});
