/* This file is automatically rebuilt by the Cesium build process. */
define(['./defined-26bd4a03', './Check-da037458', './freezeObject-2d83f591', './defaultValue-f2e68450', './Math-fa6e45cb', './Cartesian2-2a723276', './defineProperties-6f7a50f2', './Transforms-a312718d', './RuntimeError-ad75c885', './WebGLConstants-497deb20', './ComponentDatatype-69643096', './GeometryAttribute-bb8a556c', './when-ee12a2cb', './GeometryAttributes-eecc9f43', './GeometryOffsetAttribute-cb30cd97', './VertexFormat-fbb91dc7', './BoxGeometry-ae68b2b8'], function (defined, Check, freezeObject, defaultValue, _Math, Cartesian2, defineProperties, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, when, GeometryAttributes, GeometryOffsetAttribute, VertexFormat, BoxGeometry) { 'use strict';

    function createBoxGeometry(boxGeometry, offset) {
            if (defined.defined(offset)) {
                boxGeometry = BoxGeometry.BoxGeometry.unpack(boxGeometry, offset);
            }
            return BoxGeometry.BoxGeometry.createGeometry(boxGeometry);
        }

    return createBoxGeometry;

});
