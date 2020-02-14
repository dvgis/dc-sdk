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
define(["exports","./Math-8a4c9da1"],function(r,b){"use strict";var t={computePositions:function(r,t,a,e,i){var n,o=.5*r,s=-o,c=e+e,u=new Float64Array(3*(i?2*c:c)),f=0,h=0,y=i?3*c:0,M=i?3*(c+e):3*e;for(n=0;n<e;n++){var d=n/e*b.CesiumMath.TWO_PI,m=Math.cos(d),v=Math.sin(d),l=m*a,p=v*a,C=m*t,P=v*t;u[h+y]=l,u[h+y+1]=p,u[h+y+2]=s,u[h+M]=C,u[h+M+1]=P,u[h+M+2]=o,h+=3,i&&(u[f++]=l,u[f++]=p,u[f++]=s,u[f++]=C,u[f++]=P,u[f++]=o)}return u}};r.CylinderGeometryLibrary=t});
