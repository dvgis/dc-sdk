/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-e6e3e713', './Check-1df6b9a0', './Math-c5f6c994', './Cartesian2-1d7364fa', './Transforms-943e8463', './RuntimeError-717c34db', './WebGLConstants-7f7d68ac', './ComponentDatatype-2b8834a4', './GeometryAttribute-3a303898', './GeometryAttributes-6cf4559b', './GeometryOffsetAttribute-2677f2ec', './VertexFormat-3b318cdc', './BoxGeometry-19b036dd'], function (when, Check, _Math, Cartesian2, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, GeometryAttributes, GeometryOffsetAttribute, VertexFormat, BoxGeometry) { 'use strict';

    function createBoxGeometry(boxGeometry, offset) {
            if (when.defined(offset)) {
                boxGeometry = BoxGeometry.BoxGeometry.unpack(boxGeometry, offset);
            }
            return BoxGeometry.BoxGeometry.createGeometry(boxGeometry);
        }

    return createBoxGeometry;

});
