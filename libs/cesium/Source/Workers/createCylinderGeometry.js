/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-e6e3e713', './Check-1df6b9a0', './Math-c5f6c994', './Cartesian2-1d7364fa', './Transforms-943e8463', './RuntimeError-717c34db', './WebGLConstants-7f7d68ac', './ComponentDatatype-2b8834a4', './GeometryAttribute-3a303898', './GeometryAttributes-6cf4559b', './IndexDatatype-e2961542', './GeometryOffsetAttribute-2677f2ec', './VertexFormat-3b318cdc', './CylinderGeometryLibrary-fc59caaf', './CylinderGeometry-bfff1d4a'], function (when, Check, _Math, Cartesian2, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, GeometryAttributes, IndexDatatype, GeometryOffsetAttribute, VertexFormat, CylinderGeometryLibrary, CylinderGeometry) { 'use strict';

    function createCylinderGeometry(cylinderGeometry, offset) {
            if (when.defined(offset)) {
                cylinderGeometry = CylinderGeometry.CylinderGeometry.unpack(cylinderGeometry, offset);
            }
            return CylinderGeometry.CylinderGeometry.createGeometry(cylinderGeometry);
        }

    return createCylinderGeometry;

});
