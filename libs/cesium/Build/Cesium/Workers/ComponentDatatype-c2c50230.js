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
define(["exports","./when-a55a8a4c","./Check-bc1d37d9","./WebGLConstants-4c11ee5f"],function(r,a,e,n){"use strict";var E={BYTE:n.WebGLConstants.BYTE,UNSIGNED_BYTE:n.WebGLConstants.UNSIGNED_BYTE,SHORT:n.WebGLConstants.SHORT,UNSIGNED_SHORT:n.WebGLConstants.UNSIGNED_SHORT,INT:n.WebGLConstants.INT,UNSIGNED_INT:n.WebGLConstants.UNSIGNED_INT,FLOAT:n.WebGLConstants.FLOAT,DOUBLE:n.WebGLConstants.DOUBLE,getSizeInBytes:function(r){switch(r){case E.BYTE:return Int8Array.BYTES_PER_ELEMENT;case E.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case E.SHORT:return Int16Array.BYTES_PER_ELEMENT;case E.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case E.INT:return Int32Array.BYTES_PER_ELEMENT;case E.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT;case E.FLOAT:return Float32Array.BYTES_PER_ELEMENT;case E.DOUBLE:return Float64Array.BYTES_PER_ELEMENT}},fromTypedArray:function(r){return r instanceof Int8Array?E.BYTE:r instanceof Uint8Array?E.UNSIGNED_BYTE:r instanceof Int16Array?E.SHORT:r instanceof Uint16Array?E.UNSIGNED_SHORT:r instanceof Int32Array?E.INT:r instanceof Uint32Array?E.UNSIGNED_INT:r instanceof Float32Array?E.FLOAT:r instanceof Float64Array?E.DOUBLE:void 0},validate:function(r){return a.defined(r)&&(r===E.BYTE||r===E.UNSIGNED_BYTE||r===E.SHORT||r===E.UNSIGNED_SHORT||r===E.INT||r===E.UNSIGNED_INT||r===E.FLOAT||r===E.DOUBLE)},createTypedArray:function(r,e){switch(r){case E.BYTE:return new Int8Array(e);case E.UNSIGNED_BYTE:return new Uint8Array(e);case E.SHORT:return new Int16Array(e);case E.UNSIGNED_SHORT:return new Uint16Array(e);case E.INT:return new Int32Array(e);case E.UNSIGNED_INT:return new Uint32Array(e);case E.FLOAT:return new Float32Array(e);case E.DOUBLE:return new Float64Array(e)}},createArrayBufferView:function(r,e,n,t){switch(n=a.defaultValue(n,0),t=a.defaultValue(t,(e.byteLength-n)/E.getSizeInBytes(r)),r){case E.BYTE:return new Int8Array(e,n,t);case E.UNSIGNED_BYTE:return new Uint8Array(e,n,t);case E.SHORT:return new Int16Array(e,n,t);case E.UNSIGNED_SHORT:return new Uint16Array(e,n,t);case E.INT:return new Int32Array(e,n,t);case E.UNSIGNED_INT:return new Uint32Array(e,n,t);case E.FLOAT:return new Float32Array(e,n,t);case E.DOUBLE:return new Float64Array(e,n,t)}},fromName:function(r){switch(r){case"BYTE":return E.BYTE;case"UNSIGNED_BYTE":return E.UNSIGNED_BYTE;case"SHORT":return E.SHORT;case"UNSIGNED_SHORT":return E.UNSIGNED_SHORT;case"INT":return E.INT;case"UNSIGNED_INT":return E.UNSIGNED_INT;case"FLOAT":return E.FLOAT;case"DOUBLE":return E.DOUBLE}}},t=Object.freeze(E);r.ComponentDatatype=t});
