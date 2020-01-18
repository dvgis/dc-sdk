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
define(["exports","./defined-2a4f2d00","./Check-e5651467","./defaultValue-29c9b1af","./Cartesian2-ba70b51f","./Transforms-7d72c08c"],function(t,o,e,r,a,d){"use strict";function x(t,e,n,i){this.x=r.defaultValue(t,0),this.y=r.defaultValue(e,0),this.width=r.defaultValue(n,0),this.height=r.defaultValue(i,0)}x.packedLength=4,x.pack=function(t,e,n){return n=r.defaultValue(n,0),e[n++]=t.x,e[n++]=t.y,e[n++]=t.width,e[n]=t.height,e},x.unpack=function(t,e,n){return e=r.defaultValue(e,0),o.defined(n)||(n=new x),n.x=t[e++],n.y=t[e++],n.width=t[e++],n.height=t[e],n},x.fromPoints=function(t,e){if(o.defined(e)||(e=new x),!o.defined(t)||0===t.length)return e.x=0,e.y=0,e.width=0,e.height=0,e;for(var n=t.length,i=t[0].x,h=t[0].y,r=t[0].x,a=t[0].y,d=1;d<n;d++){var u=t[d],f=u.x,c=u.y;i=Math.min(f,i),r=Math.max(f,r),h=Math.min(c,h),a=Math.max(c,a)}return e.x=i,e.y=h,e.width=r-i,e.height=a-h,e};var u=new d.GeographicProjection,f=new a.Cartographic,c=new a.Cartographic;x.fromRectangle=function(t,e,n){if(o.defined(n)||(n=new x),!o.defined(t))return n.x=0,n.y=0,n.width=0,n.height=0,n;var i=(e=r.defaultValue(e,u)).project(a.Rectangle.southwest(t,f)),h=e.project(a.Rectangle.northeast(t,c));return a.Cartesian2.subtract(h,i,h),n.x=i.x,n.y=i.y,n.width=h.x,n.height=h.y,n},x.clone=function(t,e){if(o.defined(t))return o.defined(e)?(e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height,e):new x(t.x,t.y,t.width,t.height)},x.union=function(t,e,n){o.defined(n)||(n=new x);var i=Math.min(t.x,e.x),h=Math.min(t.y,e.y),r=Math.max(t.x+t.width,e.x+e.width),a=Math.max(t.y+t.height,e.y+e.height);return n.x=i,n.y=h,n.width=r-i,n.height=a-h,n},x.expand=function(t,e,n){n=x.clone(t,n);var i=e.x-n.x,h=e.y-n.y;return i>n.width?n.width=i:i<0&&(n.width-=i,n.x=e.x),h>n.height?n.height=h:h<0&&(n.height-=h,n.y=e.y),n},x.intersect=function(t,e){var n=t.x,i=t.y,h=e.x,r=e.y;return n>h+e.width||n+t.width<h||i+t.height<r||i>r+e.height?d.Intersect.OUTSIDE:d.Intersect.INTERSECTING},x.equals=function(t,e){return t===e||o.defined(t)&&o.defined(e)&&t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height},x.prototype.clone=function(t){return x.clone(this,t)},x.prototype.intersect=function(t){return x.intersect(this,t)},x.prototype.equals=function(t){return x.equals(this,t)},t.BoundingRectangle=x});
