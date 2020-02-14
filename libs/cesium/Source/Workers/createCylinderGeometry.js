/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-76089d4c', './Check-5cd4f88e', './Math-4da9b357', './Cartesian2-88a9081c', './defineProperties-7057a760', './Transforms-7fc36d34', './RuntimeError-bd79d86c', './WebGLConstants-e4e9c6cc', './ComponentDatatype-7dd74ff6', './GeometryAttribute-21a3ec3f', './GeometryAttributes-36724c9f', './IndexDatatype-7c4ae249', './GeometryOffsetAttribute-b8954087', './VertexFormat-c83968d5', './CylinderGeometryLibrary-c7a66703', './CylinderGeometry-956fd076'], function (when, Check, _Math, Cartesian2, defineProperties, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, GeometryAttributes, IndexDatatype, GeometryOffsetAttribute, VertexFormat, CylinderGeometryLibrary, CylinderGeometry) { 'use strict';

    function createCylinderGeometry(cylinderGeometry, offset) {
            if (when.defined(offset)) {
                cylinderGeometry = CylinderGeometry.CylinderGeometry.unpack(cylinderGeometry, offset);
            }
            return CylinderGeometry.CylinderGeometry.createGeometry(cylinderGeometry);
        }

    return createCylinderGeometry;

});
