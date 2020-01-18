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
define(["exports","./defined-2a4f2d00","./Check-e5651467","./freezeObject-a51e076f","./defaultValue-29c9b1af","./WebGLConstants-90dbfe2f"],function(r,e,n,t,a,E){"use strict";var N={BYTE:E.WebGLConstants.BYTE,UNSIGNED_BYTE:E.WebGLConstants.UNSIGNED_BYTE,SHORT:E.WebGLConstants.SHORT,UNSIGNED_SHORT:E.WebGLConstants.UNSIGNED_SHORT,INT:E.WebGLConstants.INT,UNSIGNED_INT:E.WebGLConstants.UNSIGNED_INT,FLOAT:E.WebGLConstants.FLOAT,DOUBLE:E.WebGLConstants.DOUBLE,getSizeInBytes:function(r){switch(r){case N.BYTE:return Int8Array.BYTES_PER_ELEMENT;case N.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case N.SHORT:return Int16Array.BYTES_PER_ELEMENT;case N.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case N.INT:return Int32Array.BYTES_PER_ELEMENT;case N.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT;case N.FLOAT:return Float32Array.BYTES_PER_ELEMENT;case N.DOUBLE:return Float64Array.BYTES_PER_ELEMENT}},fromTypedArray:function(r){return r instanceof Int8Array?N.BYTE:r instanceof Uint8Array?N.UNSIGNED_BYTE:r instanceof Int16Array?N.SHORT:r instanceof Uint16Array?N.UNSIGNED_SHORT:r instanceof Int32Array?N.INT:r instanceof Uint32Array?N.UNSIGNED_INT:r instanceof Float32Array?N.FLOAT:r instanceof Float64Array?N.DOUBLE:void 0},validate:function(r){return e.defined(r)&&(r===N.BYTE||r===N.UNSIGNED_BYTE||r===N.SHORT||r===N.UNSIGNED_SHORT||r===N.INT||r===N.UNSIGNED_INT||r===N.FLOAT||r===N.DOUBLE)},createTypedArray:function(r,e){switch(r){case N.BYTE:return new Int8Array(e);case N.UNSIGNED_BYTE:return new Uint8Array(e);case N.SHORT:return new Int16Array(e);case N.UNSIGNED_SHORT:return new Uint16Array(e);case N.INT:return new Int32Array(e);case N.UNSIGNED_INT:return new Uint32Array(e);case N.FLOAT:return new Float32Array(e);case N.DOUBLE:return new Float64Array(e)}},createArrayBufferView:function(r,e,n,t){switch(n=a.defaultValue(n,0),t=a.defaultValue(t,(e.byteLength-n)/N.getSizeInBytes(r)),r){case N.BYTE:return new Int8Array(e,n,t);case N.UNSIGNED_BYTE:return new Uint8Array(e,n,t);case N.SHORT:return new Int16Array(e,n,t);case N.UNSIGNED_SHORT:return new Uint16Array(e,n,t);case N.INT:return new Int32Array(e,n,t);case N.UNSIGNED_INT:return new Uint32Array(e,n,t);case N.FLOAT:return new Float32Array(e,n,t);case N.DOUBLE:return new Float64Array(e,n,t)}},fromName:function(r){switch(r){case"BYTE":return N.BYTE;case"UNSIGNED_BYTE":return N.UNSIGNED_BYTE;case"SHORT":return N.SHORT;case"UNSIGNED_SHORT":return N.UNSIGNED_SHORT;case"INT":return N.INT;case"UNSIGNED_INT":return N.UNSIGNED_INT;case"FLOAT":return N.FLOAT;case"DOUBLE":return N.DOUBLE}}},T=t.freezeObject(N);r.ComponentDatatype=T});
