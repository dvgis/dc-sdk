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
define(["exports","./when-0488ac89","./Check-78ca6843","./Math-8a4c9da1","./WebGLConstants-66e14a3b"],function(e,r,t,N,n){"use strict";var E={UNSIGNED_BYTE:n.WebGLConstants.UNSIGNED_BYTE,UNSIGNED_SHORT:n.WebGLConstants.UNSIGNED_SHORT,UNSIGNED_INT:n.WebGLConstants.UNSIGNED_INT,getSizeInBytes:function(e){switch(e){case E.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case E.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case E.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT}},fromSizeInBytes:function(e){switch(e){case 2:return E.UNSIGNED_SHORT;case 4:return E.UNSIGNED_INT;case 1:return E.UNSIGNED_BYTE}},validate:function(e){return r.defined(e)&&(e===E.UNSIGNED_BYTE||e===E.UNSIGNED_SHORT||e===E.UNSIGNED_INT)},createTypedArray:function(e,r){return new(e>=N.CesiumMath.SIXTY_FOUR_KILOBYTES?Uint32Array:Uint16Array)(r)},createTypedArrayFromArrayBuffer:function(e,r,t,n){return new(e>=N.CesiumMath.SIXTY_FOUR_KILOBYTES?Uint32Array:Uint16Array)(r,t,n)}},a=r.freezeObject(E);e.IndexDatatype=a});
