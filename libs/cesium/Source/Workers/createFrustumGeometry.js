/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-76089d4c', './Check-5cd4f88e', './Math-4da9b357', './Cartesian2-88a9081c', './defineProperties-7057a760', './Transforms-7fc36d34', './RuntimeError-bd79d86c', './WebGLConstants-e4e9c6cc', './ComponentDatatype-7dd74ff6', './GeometryAttribute-21a3ec3f', './GeometryAttributes-36724c9f', './Plane-f6fa0f8f', './VertexFormat-c83968d5', './FrustumGeometry-2d888a7e'], function (when, Check, _Math, Cartesian2, defineProperties, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, GeometryAttributes, Plane, VertexFormat, FrustumGeometry) { 'use strict';

    function createFrustumGeometry(frustumGeometry, offset) {
            if (when.defined(offset)) {
                frustumGeometry = FrustumGeometry.FrustumGeometry.unpack(frustumGeometry, offset);
            }
            return FrustumGeometry.FrustumGeometry.createGeometry(frustumGeometry);
        }

    return createFrustumGeometry;

});
