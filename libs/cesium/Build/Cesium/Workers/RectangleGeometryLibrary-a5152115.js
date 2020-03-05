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
define(["exports","./when-a55a8a4c","./Check-bc1d37d9","./Math-73a8bd13","./Cartesian2-8c9f79ed","./Transforms-7a81c8c2","./GeometryAttribute-f9641809"],function(t,f,n,b,O,a,G){"use strict";var p=Math.cos,v=Math.sin,x=Math.sqrt,r={computePosition:function(t,n,a,r,e,o,s){var i=n.radiiSquared,g=t.nwCorner,h=t.boundingRectangle,c=g.latitude-t.granYCos*r+e*t.granXSin,u=p(c),C=v(c),l=i.z*C,d=g.longitude+r*t.granYSin+e*t.granXCos,S=u*p(d),w=u*v(d),M=i.x*S,X=i.y*w,Y=x(M*S+X*w+l*C);if(o.x=M/Y,o.y=X/Y,o.z=l/Y,a){var m=t.stNwCorner;f.defined(m)?(c=m.latitude-t.stGranYCos*r+e*t.stGranXSin,d=m.longitude+r*t.stGranYSin+e*t.stGranXCos,s.x=(d-t.stWest)*t.lonScalar,s.y=(c-t.stSouth)*t.latScalar):(s.x=(d-h.west)*t.lonScalar,s.y=(c-h.south)*t.latScalar)}}},R=new G.Matrix2,y=new O.Cartesian3,P=new O.Cartographic,W=new O.Cartesian3,_=new a.GeographicProjection;function T(t,n,a,r,e,o,s){var i=Math.cos(n),g=r*i,h=a*i,c=Math.sin(n),u=r*c,C=a*c;y=_.project(t,y),y=O.Cartesian3.subtract(y,W,y);var l=G.Matrix2.fromRotation(n,R);y=G.Matrix2.multiplyByVector(l,y,y),y=O.Cartesian3.add(y,W,y),--o,--s;var d=(t=_.unproject(y,t)).latitude,S=d+o*C,w=d-g*s,M=d-g*s+o*C,X=Math.max(d,S,w,M),Y=Math.min(d,S,w,M),m=t.longitude,f=m+o*h,p=m+s*u,v=m+s*u+o*h;return{north:X,south:Y,east:Math.max(m,f,p,v),west:Math.min(m,f,p,v),granYCos:g,granYSin:u,granXCos:h,granXSin:C,nwCorner:t}}r.computeOptions=function(t,n,a,r,e,o,s){var i,g,h,c,u,C=t.east,l=t.west,d=t.north,S=t.south,w=!1,M=!1;d===b.CesiumMath.PI_OVER_TWO&&(w=!0),S===-b.CesiumMath.PI_OVER_TWO&&(M=!0);var X=d-S;h=(u=C<l?b.CesiumMath.TWO_PI-l+C:C-l)/((i=Math.ceil(u/n)+1)-1),c=X/((g=Math.ceil(X/n)+1)-1);var Y=O.Rectangle.northwest(t,o),m=O.Rectangle.center(t,P);0===a&&0===r||(m.longitude<Y.longitude&&(m.longitude+=b.CesiumMath.TWO_PI),W=_.project(m,W));var f=c,p=h,v=O.Rectangle.clone(t,e),G={granYCos:f,granYSin:0,granXCos:p,granXSin:0,nwCorner:Y,boundingRectangle:v,width:i,height:g,northCap:w,southCap:M};if(0!==a){var x=T(Y,a,h,c,0,i,g);d=x.north,S=x.south,C=x.east,l=x.west,G.granYCos=x.granYCos,G.granYSin=x.granYSin,G.granXCos=x.granXCos,G.granXSin=x.granXSin,v.north=d,v.south=S,v.east=C,v.west=l}if(0!==r){a-=r;var R=O.Rectangle.northwest(v,s),y=T(R,a,h,c,0,i,g);G.stGranYCos=y.granYCos,G.stGranXCos=y.granXCos,G.stGranYSin=y.granYSin,G.stGranXSin=y.granXSin,G.stNwCorner=R,G.stWest=y.west,G.stSouth=y.south}return G},t.RectangleGeometryLibrary=r});
