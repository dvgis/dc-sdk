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
define(['./defined-2a4f2d00', './Check-e5651467', './freezeObject-a51e076f', './defaultValue-29c9b1af', './Math-9620d065', './Cartesian2-8defcb50', './defineProperties-c817531e', './Transforms-02186f8d', './RuntimeError-51c34ab4', './WebGLConstants-90dbfe2f', './ComponentDatatype-30d0acd7', './GeometryAttribute-4163fce2', './when-1faa3867', './GeometryAttributes-f8548d3f', './IndexDatatype-85d10a10', './GeometryOffsetAttribute-37c3dade', './VertexFormat-ba88c609', './EllipsoidGeometry-000e235b'], function (defined, Check, freezeObject, defaultValue, _Math, Cartesian2, defineProperties, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, when, GeometryAttributes, IndexDatatype, GeometryOffsetAttribute, VertexFormat, EllipsoidGeometry) { 'use strict';

    function createEllipsoidGeometry(ellipsoidGeometry, offset) {
            if (defined.defined(offset)) {
                ellipsoidGeometry = EllipsoidGeometry.EllipsoidGeometry.unpack(ellipsoidGeometry, offset);
            }
            return EllipsoidGeometry.EllipsoidGeometry.createGeometry(ellipsoidGeometry);
        }

    return createEllipsoidGeometry;

});
