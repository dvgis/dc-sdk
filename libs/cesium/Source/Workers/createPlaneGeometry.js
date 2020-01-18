/* This file is automatically rebuilt by the Cesium build process. */
define(['./defined-26bd4a03', './Check-da037458', './freezeObject-2d83f591', './defaultValue-f2e68450', './Math-fa6e45cb', './Cartesian2-2a723276', './defineProperties-6f7a50f2', './Transforms-a312718d', './RuntimeError-ad75c885', './WebGLConstants-497deb20', './ComponentDatatype-69643096', './GeometryAttribute-bb8a556c', './when-ee12a2cb', './GeometryAttributes-eecc9f43', './VertexFormat-fbb91dc7'], function (defined, Check, freezeObject, defaultValue, _Math, Cartesian2, defineProperties, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, when, GeometryAttributes, VertexFormat) { 'use strict';

    /**
         * Describes geometry representing a plane centered at the origin, with a unit width and length.
         *
         * @alias PlaneGeometry
         * @constructor
         *
         * @param {Object} options Object with the following properties:
         * @param {VertexFormat} [options.vertexFormat=VertexFormat.DEFAULT] The vertex attributes to be computed.
         *
         * @example
         * var planeGeometry = new Cesium.PlaneGeometry({
         *   vertexFormat : Cesium.VertexFormat.POSITION_ONLY
         * });
         */
        function PlaneGeometry(options) {
            options = defaultValue.defaultValue(options, defaultValue.defaultValue.EMPTY_OBJECT);

            var vertexFormat = defaultValue.defaultValue(options.vertexFormat, VertexFormat.VertexFormat.DEFAULT);

            this._vertexFormat = vertexFormat;
            this._workerName = 'createPlaneGeometry';
        }

        /**
         * The number of elements used to pack the object into an array.
         * @type {Number}
         */
        PlaneGeometry.packedLength = VertexFormat.VertexFormat.packedLength;

        /**
         * Stores the provided instance into the provided array.
         *
         * @param {PlaneGeometry} value The value to pack.
         * @param {Number[]} array The array to pack into.
         * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
         *
         * @returns {Number[]} The array that was packed into
         */
        PlaneGeometry.pack = function(value, array, startingIndex) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('value', value);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            startingIndex = defaultValue.defaultValue(startingIndex, 0);

            VertexFormat.VertexFormat.pack(value._vertexFormat, array, startingIndex);

            return array;
        };

        var scratchVertexFormat = new VertexFormat.VertexFormat();
        var scratchOptions = {
            vertexFormat: scratchVertexFormat
        };

        /**
         * Retrieves an instance from a packed array.
         *
         * @param {Number[]} array The packed array.
         * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
         * @param {PlaneGeometry} [result] The object into which to store the result.
         * @returns {PlaneGeometry} The modified result parameter or a new PlaneGeometry instance if one was not provided.
         */
        PlaneGeometry.unpack = function(array, startingIndex, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            startingIndex = defaultValue.defaultValue(startingIndex, 0);

            var vertexFormat = VertexFormat.VertexFormat.unpack(array, startingIndex, scratchVertexFormat);

            if (!defined.defined(result)) {
                return new PlaneGeometry(scratchOptions);
            }

            result._vertexFormat = VertexFormat.VertexFormat.clone(vertexFormat, result._vertexFormat);

            return result;
        };

        var min = new Cartesian2.Cartesian3(-0.5, -0.5, 0.0);
        var max = new Cartesian2.Cartesian3( 0.5,  0.5, 0.0);

        /**
         * Computes the geometric representation of a plane, including its vertices, indices, and a bounding sphere.
         *
         * @param {PlaneGeometry} planeGeometry A description of the plane.
         * @returns {Geometry|undefined} The computed vertices and indices.
         */
        PlaneGeometry.createGeometry = function(planeGeometry) {
            var vertexFormat = planeGeometry._vertexFormat;

            var attributes = new GeometryAttributes.GeometryAttributes();
            var indices;
            var positions;

            if (vertexFormat.position) {
                // 4 corner points.  Duplicated 3 times each for each incident edge/face.
                positions = new Float64Array(4 * 3);

                // +z face
                positions[0]  = min.x;
                positions[1]  = min.y;
                positions[2]  = 0.0;
                positions[3]  = max.x;
                positions[4]  = min.y;
                positions[5]  = 0.0;
                positions[6]  = max.x;
                positions[7]  = max.y;
                positions[8]  = 0.0;
                positions[9]  = min.x;
                positions[10] = max.y;
                positions[11] = 0.0;

                attributes.position = new GeometryAttribute.GeometryAttribute({
                    componentDatatype : ComponentDatatype.ComponentDatatype.DOUBLE,
                    componentsPerAttribute : 3,
                    values : positions
                });

                if (vertexFormat.normal) {
                    var normals = new Float32Array(4 * 3);

                    // +z face
                    normals[0]  = 0.0;
                    normals[1]  = 0.0;
                    normals[2]  = 1.0;
                    normals[3]  = 0.0;
                    normals[4]  = 0.0;
                    normals[5]  = 1.0;
                    normals[6]  = 0.0;
                    normals[7]  = 0.0;
                    normals[8]  = 1.0;
                    normals[9]  = 0.0;
                    normals[10] = 0.0;
                    normals[11] = 1.0;

                    attributes.normal = new GeometryAttribute.GeometryAttribute({
                        componentDatatype : ComponentDatatype.ComponentDatatype.FLOAT,
                        componentsPerAttribute : 3,
                        values : normals
                    });
                }

                if (vertexFormat.st) {
                    var texCoords = new Float32Array(4 * 2);

                    // +z face
                    texCoords[0]  = 0.0;
                    texCoords[1]  = 0.0;
                    texCoords[2]  = 1.0;
                    texCoords[3]  = 0.0;
                    texCoords[4]  = 1.0;
                    texCoords[5]  = 1.0;
                    texCoords[6]  = 0.0;
                    texCoords[7]  = 1.0;

                    attributes.st = new GeometryAttribute.GeometryAttribute({
                        componentDatatype : ComponentDatatype.ComponentDatatype.FLOAT,
                        componentsPerAttribute : 2,
                        values : texCoords
                    });
                }

                if (vertexFormat.tangent) {
                    var tangents = new Float32Array(4 * 3);

                    // +z face
                    tangents[0]  = 1.0;
                    tangents[1]  = 0.0;
                    tangents[2]  = 0.0;
                    tangents[3]  = 1.0;
                    tangents[4]  = 0.0;
                    tangents[5]  = 0.0;
                    tangents[6]  = 1.0;
                    tangents[7]  = 0.0;
                    tangents[8]  = 0.0;
                    tangents[9]  = 1.0;
                    tangents[10] = 0.0;
                    tangents[11] = 0.0;

                    attributes.tangent = new GeometryAttribute.GeometryAttribute({
                        componentDatatype : ComponentDatatype.ComponentDatatype.FLOAT,
                        componentsPerAttribute : 3,
                        values : tangents
                    });
                }

                if (vertexFormat.bitangent) {
                    var bitangents = new Float32Array(4 * 3);

                    // +z face
                    bitangents[0] = 0.0;
                    bitangents[1] = 1.0;
                    bitangents[2] = 0.0;
                    bitangents[3] = 0.0;
                    bitangents[4] = 1.0;
                    bitangents[5] = 0.0;
                    bitangents[6] = 0.0;
                    bitangents[7] = 1.0;
                    bitangents[8] = 0.0;
                    bitangents[9] = 0.0;
                    bitangents[10] = 1.0;
                    bitangents[11] = 0.0;

                    attributes.bitangent = new GeometryAttribute.GeometryAttribute({
                        componentDatatype : ComponentDatatype.ComponentDatatype.FLOAT,
                        componentsPerAttribute : 3,
                        values : bitangents
                    });
                }

                // 2 triangles
                indices = new Uint16Array(2 * 3);

                // +z face
                indices[0] = 0;
                indices[1] = 1;
                indices[2] = 2;
                indices[3] = 0;
                indices[4] = 2;
                indices[5] = 3;
            }

            return new GeometryAttribute.Geometry({
                attributes : attributes,
                indices : indices,
                primitiveType : GeometryAttribute.PrimitiveType.TRIANGLES,
                boundingSphere : new Transforms.BoundingSphere(Cartesian2.Cartesian3.ZERO, Math.sqrt(2.0))
            });
        };

    function createPlaneGeometry(planeGeometry, offset) {
            if (defined.defined(offset)) {
                planeGeometry = PlaneGeometry.unpack(planeGeometry, offset);
            }
            return PlaneGeometry.createGeometry(planeGeometry);
        }

    return createPlaneGeometry;

});
