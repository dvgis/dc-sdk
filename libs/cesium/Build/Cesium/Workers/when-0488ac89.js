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
define(["exports"],function(n){"use strict";function r(n){return null!=n}var t=Object.freeze;r(t)||(t=function(n){return n});var e,u,h,o=t;function i(n,r){return null!=n?n:r}function j(n,r,t,e){return l(n).then(r,t,e)}function l(n){var r,t;return n instanceof a?n:c(n)?(r=m(),n.then(function(n){r.resolve(n)},function(n){r.reject(n)},function(n){r.progress(n)}),r.promise):(t=n,new a(function(n){try{return l(n?n(t):t)}catch(n){return p(n)}}))}function a(n){this.then=n}function p(t){return new a(function(n,r){try{return r?l(r(t)):p(t)}catch(n){return p(n)}})}function m(){var n,i,c,e,r,t;return n=new a(u),i=[],c=[],e=function(r,t,e){var u,o;return u=m(),o="function"==typeof e?function(n){try{u.progress(e(n))}catch(n){u.progress(n)}}:function(n){u.progress(n)},i.push(function(n){n.then(r,t).then(u.resolve,u.reject,o)}),c.push(o),u.promise},r=function(n){return g(c,n),n},t=function(n){return n=l(n),e=n.then,t=l,r=d,g(i,n),c=i=h,n},{then:u,resolve:o,reject:f,progress:s,promise:n,resolver:{resolve:o,reject:f,progress:s}};function u(n,r,t){return e(n,r,t)}function o(n){return t(n)}function f(n){return t(p(n))}function s(n){return r(n)}}function c(n){return n&&"function"==typeof n.then}function f(n,p,v,g,y){return w(2,arguments),j(n,function(n){var r,t,e,u,o,i,c,f,s,h;if(s=n.length>>>0,r=Math.max(0,Math.min(p,s)),e=[],t=s-r+1,u=[],o=m(),r)for(f=o.progress,c=function(n){u.push(n),--t||(i=c=d,o.reject(u))},i=function(n){e.push(n),--r||(i=c=d,o.resolve(e))},h=0;h<s;++h)h in n&&j(n[h],a,l,f);else o.resolve(e);return o.then(v,g,y);function l(n){c(n)}function a(n){i(n)}})}function s(n,r,t,e){return w(1,arguments),v(n,y).then(r,t,e)}function v(n,c){return j(n,function(n){var t,r,e,u,o,i;if(e=r=n.length>>>0,t=[],i=m(),e)for(u=function(n,r){j(n,c).then(function(n){t[r]=n,--e||i.resolve(t)},i.reject)},o=0;o<r;o++)o in n?u(n[o],o):--e;else i.resolve(t);return i.promise})}function g(n,r){for(var t,e=0;t=n[e++];)t(r)}function w(n,r){for(var t,e=r.length;n<e;)if(null!=(t=r[--e])&&"function"!=typeof t)throw new Error("arg "+e+" must be a function")}function d(){}function y(n){return n}i.EMPTY_OBJECT=o({}),j.defer=m,j.resolve=l,j.reject=function(n){return j(n,p)},j.join=function(){return v(arguments,y)},j.all=s,j.map=v,j.reduce=function(n,o){var r=u.call(arguments,1);return j(n,function(n){var u;return u=n.length,r[0]=function(n,t,e){return j(n,function(r){return j(t,function(n){return o(r,n,e,u)})})},e.apply(n,r)})},j.any=function(n,r,t,e){return f(n,1,function(n){return r?r(n[0]):n[0]},t,e)},j.some=f,j.chain=function(n,r,t){var e=2<arguments.length;return j(n,function(n){return n=e?t:n,r.resolve(n),n},function(n){return r.reject(n),p(n)},r.progress)},j.isPromise=c,a.prototype={always:function(n,r){return this.then(n,n,r)},otherwise:function(n){return this.then(h,n)},yield:function(n){return this.then(function(){return n})},spread:function(r){return this.then(function(n){return s(n,function(n){return r.apply(h,n)})})}},u=[].slice,e=[].reduce||function(n){var r,t,e,u,o;if(o=0,u=(r=Object(this)).length>>>0,(t=arguments).length<=1)for(;;){if(o in r){e=r[o++];break}if(++o>=u)throw new TypeError}else e=t[1];for(;o<u;++o)o in r&&(e=n(e,r[o],o,r));return e},n.defaultValue=i,n.defined=r,n.freezeObject=o,n.when=j});
