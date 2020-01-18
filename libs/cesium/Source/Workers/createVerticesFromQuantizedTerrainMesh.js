/* This file is automatically rebuilt by the Cesium build process. */
define(['./defined-26bd4a03', './Check-da037458', './freezeObject-2d83f591', './defaultValue-f2e68450', './Math-fa6e45cb', './Cartesian2-2a723276', './defineProperties-6f7a50f2', './Transforms-a312718d', './RuntimeError-ad75c885', './WebGLConstants-497deb20', './ComponentDatatype-69643096', './when-ee12a2cb', './AttributeCompression-87682214', './IndexDatatype-3de60176', './IntersectionTests-a83a53f7', './Plane-c601d1ec', './WebMercatorProjection-f2dc467d', './createTaskProcessorWorker', './EllipsoidTangentPlane-d5dafbca', './OrientedBoundingBox-f789932a', './TerrainEncoding-3aaf3d8b'], function (defined, Check, freezeObject, defaultValue, _Math, Cartesian2, defineProperties, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, when, AttributeCompression, IndexDatatype, IntersectionTests, Plane, WebMercatorProjection, createTaskProcessorWorker, EllipsoidTangentPlane, OrientedBoundingBox, TerrainEncoding) { 'use strict';

    var maxShort = 32767;

        var cartesian3Scratch = new Cartesian2.Cartesian3();
        var scratchMinimum = new Cartesian2.Cartesian3();
        var scratchMaximum = new Cartesian2.Cartesian3();
        var cartographicScratch = new Cartesian2.Cartographic();
        var toPack = new Cartesian2.Cartesian2();
        var scratchNormal = new Cartesian2.Cartesian3();
        var scratchToENU = new Transforms.Matrix4();
        var scratchFromENU = new Transforms.Matrix4();

        function createVerticesFromQuantizedTerrainMesh(parameters, transferableObjects) {
            var quantizedVertices = parameters.quantizedVertices;
            var quantizedVertexCount = quantizedVertices.length / 3;
            var octEncodedNormals = parameters.octEncodedNormals;
            var edgeVertexCount = parameters.westIndices.length + parameters.eastIndices.length +
                                  parameters.southIndices.length + parameters.northIndices.length;
            var includeWebMercatorT = parameters.includeWebMercatorT;

            var rectangle = Cartesian2.Rectangle.clone(parameters.rectangle);
            var west = rectangle.west;
            var south = rectangle.south;
            var east = rectangle.east;
            var north = rectangle.north;

            var ellipsoid = Cartesian2.Ellipsoid.clone(parameters.ellipsoid);

            var exaggeration = parameters.exaggeration;
            var minimumHeight = parameters.minimumHeight * exaggeration;
            var maximumHeight = parameters.maximumHeight * exaggeration;

            var center = parameters.relativeToCenter;
            var fromENU = Transforms.Transforms.eastNorthUpToFixedFrame(center, ellipsoid);
            var toENU = Transforms.Matrix4.inverseTransformation(fromENU, new Transforms.Matrix4());

            var southMercatorY;
            var oneOverMercatorHeight;
            if (includeWebMercatorT) {
                southMercatorY = WebMercatorProjection.WebMercatorProjection.geodeticLatitudeToMercatorAngle(south);
                oneOverMercatorHeight = 1.0 / (WebMercatorProjection.WebMercatorProjection.geodeticLatitudeToMercatorAngle(north) - southMercatorY);
            }

            var uBuffer = quantizedVertices.subarray(0, quantizedVertexCount);
            var vBuffer = quantizedVertices.subarray(quantizedVertexCount, 2 * quantizedVertexCount);
            var heightBuffer = quantizedVertices.subarray(quantizedVertexCount * 2, 3 * quantizedVertexCount);
            var hasVertexNormals = defined.defined(octEncodedNormals);

            var uvs = new Array(quantizedVertexCount);
            var heights = new Array(quantizedVertexCount);
            var positions = new Array(quantizedVertexCount);
            var webMercatorTs = includeWebMercatorT ? new Array(quantizedVertexCount) : [];

            var minimum = scratchMinimum;
            minimum.x = Number.POSITIVE_INFINITY;
            minimum.y = Number.POSITIVE_INFINITY;
            minimum.z = Number.POSITIVE_INFINITY;

            var maximum = scratchMaximum;
            maximum.x = Number.NEGATIVE_INFINITY;
            maximum.y = Number.NEGATIVE_INFINITY;
            maximum.z = Number.NEGATIVE_INFINITY;

            var minLongitude = Number.POSITIVE_INFINITY;
            var maxLongitude = Number.NEGATIVE_INFINITY;
            var minLatitude = Number.POSITIVE_INFINITY;
            var maxLatitude = Number.NEGATIVE_INFINITY;

            for (var i = 0; i < quantizedVertexCount; ++i) {
                var rawU = uBuffer[i];
                var rawV = vBuffer[i];

                var u = rawU / maxShort;
                var v = rawV / maxShort;
                var height = _Math.CesiumMath.lerp(minimumHeight, maximumHeight, heightBuffer[i] / maxShort);

                cartographicScratch.longitude = _Math.CesiumMath.lerp(west, east, u);
                cartographicScratch.latitude = _Math.CesiumMath.lerp(south, north, v);
                cartographicScratch.height = height;

                minLongitude = Math.min(cartographicScratch.longitude, minLongitude);
                maxLongitude = Math.max(cartographicScratch.longitude, maxLongitude);
                minLatitude = Math.min(cartographicScratch.latitude, minLatitude);
                maxLatitude = Math.max(cartographicScratch.latitude, maxLatitude);

                var position = ellipsoid.cartographicToCartesian(cartographicScratch);

                uvs[i] = new Cartesian2.Cartesian2(u, v);
                heights[i] = height;
                positions[i] = position;

                if (includeWebMercatorT) {
                    webMercatorTs[i] = (WebMercatorProjection.WebMercatorProjection.geodeticLatitudeToMercatorAngle(cartographicScratch.latitude) - southMercatorY) * oneOverMercatorHeight;
                }

                Transforms.Matrix4.multiplyByPoint(toENU, position, cartesian3Scratch);

                Cartesian2.Cartesian3.minimumByComponent(cartesian3Scratch, minimum, minimum);
                Cartesian2.Cartesian3.maximumByComponent(cartesian3Scratch, maximum, maximum);
            }

            var westIndicesSouthToNorth = copyAndSort(parameters.westIndices, function(a, b) {
                return uvs[a].y - uvs[b].y;
            });
            var eastIndicesNorthToSouth = copyAndSort(parameters.eastIndices, function(a, b) {
                return uvs[b].y - uvs[a].y;
            });
            var southIndicesEastToWest = copyAndSort(parameters.southIndices, function(a, b) {
                return uvs[b].x - uvs[a].x;
            });
            var northIndicesWestToEast = copyAndSort(parameters.northIndices, function(a, b) {
                return uvs[a].x - uvs[b].x;
            });

            var orientedBoundingBox;
            var boundingSphere;

            if (exaggeration !== 1.0) {
                // Bounding volumes need to be recomputed since the tile payload assumes no exaggeration.
                boundingSphere = Transforms.BoundingSphere.fromPoints(positions);
                orientedBoundingBox = OrientedBoundingBox.OrientedBoundingBox.fromRectangle(rectangle, minimumHeight, maximumHeight, ellipsoid);
            }

            var occludeePointInScaledSpace;
            if (exaggeration !== 1.0 || minimumHeight < 0.0) {
                // Horizon culling point needs to be recomputed since the tile payload assumes no exaggeration.
                var occluder = new TerrainEncoding.EllipsoidalOccluder(ellipsoid);
                occludeePointInScaledSpace = occluder.computeHorizonCullingPointPossiblyUnderEllipsoid(center, positions, minimumHeight);
            }

            var hMin = minimumHeight;
            hMin = Math.min(hMin, findMinMaxSkirts(parameters.westIndices, parameters.westSkirtHeight, heights, uvs, rectangle, ellipsoid, toENU, minimum, maximum));
            hMin = Math.min(hMin, findMinMaxSkirts(parameters.southIndices, parameters.southSkirtHeight, heights, uvs, rectangle, ellipsoid, toENU, minimum, maximum));
            hMin = Math.min(hMin, findMinMaxSkirts(parameters.eastIndices, parameters.eastSkirtHeight, heights, uvs, rectangle, ellipsoid, toENU, minimum, maximum));
            hMin = Math.min(hMin, findMinMaxSkirts(parameters.northIndices, parameters.northSkirtHeight, heights, uvs, rectangle, ellipsoid, toENU, minimum, maximum));

            var aaBox = new EllipsoidTangentPlane.AxisAlignedBoundingBox(minimum, maximum, center);
            var encoding = new TerrainEncoding.TerrainEncoding(aaBox, hMin, maximumHeight, fromENU, hasVertexNormals, includeWebMercatorT);
            var vertexStride = encoding.getStride();
            var size = quantizedVertexCount * vertexStride + edgeVertexCount * vertexStride;
            var vertexBuffer = new Float32Array(size);

            var bufferIndex = 0;
            for (var j = 0; j < quantizedVertexCount; ++j) {
                if (hasVertexNormals) {
                    var n = j * 2.0;
                    toPack.x = octEncodedNormals[n];
                    toPack.y = octEncodedNormals[n + 1];

                    if (exaggeration !== 1.0) {
                        var normal = AttributeCompression.AttributeCompression.octDecode(toPack.x, toPack.y, scratchNormal);
                        var fromENUNormal = Transforms.Transforms.eastNorthUpToFixedFrame(positions[j], ellipsoid, scratchFromENU);
                        var toENUNormal = Transforms.Matrix4.inverseTransformation(fromENUNormal, scratchToENU);

                        Transforms.Matrix4.multiplyByPointAsVector(toENUNormal, normal, normal);
                        normal.z *= exaggeration;
                        Cartesian2.Cartesian3.normalize(normal, normal);

                        Transforms.Matrix4.multiplyByPointAsVector(fromENUNormal, normal, normal);
                        Cartesian2.Cartesian3.normalize(normal, normal);

                        AttributeCompression.AttributeCompression.octEncode(normal, toPack);
                    }
                }

                bufferIndex = encoding.encode(vertexBuffer, bufferIndex, positions[j], uvs[j], heights[j], toPack, webMercatorTs[j]);
            }

            var edgeTriangleCount = Math.max(0, (edgeVertexCount - 4) * 2);
            var indexBufferLength = parameters.indices.length + edgeTriangleCount * 3;
            var indexBuffer = IndexDatatype.IndexDatatype.createTypedArray(quantizedVertexCount + edgeVertexCount, indexBufferLength);
            indexBuffer.set(parameters.indices, 0);

            var percentage = 0.0001;
            var lonOffset = (maxLongitude - minLongitude) * percentage;
            var latOffset = (maxLatitude - minLatitude) * percentage;
            var westLongitudeOffset = -lonOffset;
            var westLatitudeOffset = 0.0;
            var eastLongitudeOffset = lonOffset;
            var eastLatitudeOffset = 0.0;
            var northLongitudeOffset = 0.0;
            var northLatitudeOffset = latOffset;
            var southLongitudeOffset = 0.0;
            var southLatitudeOffset = -latOffset;

            // Add skirts.
            var vertexBufferIndex = quantizedVertexCount * vertexStride;
            var indexBufferIndex = parameters.indices.length;
            indexBufferIndex = addSkirt(vertexBuffer, vertexBufferIndex, indexBuffer, indexBufferIndex, parameters.westIndices, encoding, heights, uvs, octEncodedNormals, ellipsoid, rectangle, parameters.westSkirtHeight, true, exaggeration, southMercatorY, oneOverMercatorHeight, westLongitudeOffset, westLatitudeOffset);
            vertexBufferIndex += parameters.westIndices.length * vertexStride;
            indexBufferIndex = addSkirt(vertexBuffer, vertexBufferIndex, indexBuffer, indexBufferIndex, parameters.southIndices, encoding, heights, uvs, octEncodedNormals, ellipsoid, rectangle, parameters.southSkirtHeight, false, exaggeration, southMercatorY, oneOverMercatorHeight, southLongitudeOffset, southLatitudeOffset);
            vertexBufferIndex += parameters.southIndices.length * vertexStride;
            indexBufferIndex = addSkirt(vertexBuffer, vertexBufferIndex, indexBuffer, indexBufferIndex, parameters.eastIndices, encoding, heights, uvs, octEncodedNormals, ellipsoid, rectangle, parameters.eastSkirtHeight, false, exaggeration, southMercatorY, oneOverMercatorHeight, eastLongitudeOffset, eastLatitudeOffset);
            vertexBufferIndex += parameters.eastIndices.length * vertexStride;
            addSkirt(vertexBuffer, vertexBufferIndex, indexBuffer, indexBufferIndex, parameters.northIndices, encoding, heights, uvs, octEncodedNormals, ellipsoid, rectangle, parameters.northSkirtHeight, true, exaggeration, southMercatorY, oneOverMercatorHeight, northLongitudeOffset, northLatitudeOffset);

            transferableObjects.push(vertexBuffer.buffer, indexBuffer.buffer);

            return {
                vertices : vertexBuffer.buffer,
                indices : indexBuffer.buffer,
                westIndicesSouthToNorth : westIndicesSouthToNorth,
                southIndicesEastToWest : southIndicesEastToWest,
                eastIndicesNorthToSouth : eastIndicesNorthToSouth,
                northIndicesWestToEast : northIndicesWestToEast,
                vertexStride : vertexStride,
                center : center,
                minimumHeight : minimumHeight,
                maximumHeight : maximumHeight,
                boundingSphere : boundingSphere,
                orientedBoundingBox : orientedBoundingBox,
                occludeePointInScaledSpace : occludeePointInScaledSpace,
                encoding : encoding,
                skirtIndex : parameters.indices.length
            };
        }

        function findMinMaxSkirts(edgeIndices, edgeHeight, heights, uvs, rectangle, ellipsoid, toENU, minimum, maximum) {
            var hMin = Number.POSITIVE_INFINITY;

            var north = rectangle.north;
            var south = rectangle.south;
            var east = rectangle.east;
            var west = rectangle.west;

            if (east < west) {
                east += _Math.CesiumMath.TWO_PI;
            }

            var length = edgeIndices.length;
            for (var i = 0; i < length; ++i) {
                var index = edgeIndices[i];
                var h = heights[index];
                var uv = uvs[index];

                cartographicScratch.longitude = _Math.CesiumMath.lerp(west, east, uv.x);
                cartographicScratch.latitude = _Math.CesiumMath.lerp(south, north, uv.y);
                cartographicScratch.height = h - edgeHeight;

                var position = ellipsoid.cartographicToCartesian(cartographicScratch, cartesian3Scratch);
                Transforms.Matrix4.multiplyByPoint(toENU, position, position);

                Cartesian2.Cartesian3.minimumByComponent(position, minimum, minimum);
                Cartesian2.Cartesian3.maximumByComponent(position, maximum, maximum);

                hMin = Math.min(hMin, cartographicScratch.height);
            }
            return hMin;
        }

        function addSkirt(vertexBuffer, vertexBufferIndex, indexBuffer, indexBufferIndex, edgeVertices, encoding, heights, uvs, octEncodedNormals, ellipsoid, rectangle, skirtLength, isWestOrNorthEdge, exaggeration, southMercatorY, oneOverMercatorHeight, longitudeOffset, latitudeOffset) {
            var start, end, increment;
            if (isWestOrNorthEdge) {
                start = edgeVertices.length - 1;
                end = -1;
                increment = -1;
            } else {
                start = 0;
                end = edgeVertices.length;
                increment = 1;
            }

            var previousIndex = -1;

            var hasVertexNormals = defined.defined(octEncodedNormals);
            var vertexStride = encoding.getStride();
            var vertexIndex = vertexBufferIndex / vertexStride;

            var north = rectangle.north;
            var south = rectangle.south;
            var east = rectangle.east;
            var west = rectangle.west;

            if (east < west) {
                east += _Math.CesiumMath.TWO_PI;
            }

            for (var i = start; i !== end; i += increment) {
                var index = edgeVertices[i];
                var h = heights[index];
                var uv = uvs[index];

                cartographicScratch.longitude = _Math.CesiumMath.lerp(west, east, uv.x) + longitudeOffset;
                cartographicScratch.latitude = _Math.CesiumMath.lerp(south, north, uv.y) + latitudeOffset;
                cartographicScratch.height = h - skirtLength;

                var position = ellipsoid.cartographicToCartesian(cartographicScratch, cartesian3Scratch);

                if (hasVertexNormals) {
                    var n = index * 2.0;
                    toPack.x = octEncodedNormals[n];
                    toPack.y = octEncodedNormals[n + 1];

                    if (exaggeration !== 1.0) {
                        var normal = AttributeCompression.AttributeCompression.octDecode(toPack.x, toPack.y, scratchNormal);
                        var fromENUNormal = Transforms.Transforms.eastNorthUpToFixedFrame(cartesian3Scratch, ellipsoid, scratchFromENU);
                        var toENUNormal = Transforms.Matrix4.inverseTransformation(fromENUNormal, scratchToENU);

                        Transforms.Matrix4.multiplyByPointAsVector(toENUNormal, normal, normal);
                        normal.z *= exaggeration;
                        Cartesian2.Cartesian3.normalize(normal, normal);

                        Transforms.Matrix4.multiplyByPointAsVector(fromENUNormal, normal, normal);
                        Cartesian2.Cartesian3.normalize(normal, normal);

                        AttributeCompression.AttributeCompression.octEncode(normal, toPack);
                    }
                }

                var webMercatorT;
                if (encoding.hasWebMercatorT) {
                    webMercatorT = (WebMercatorProjection.WebMercatorProjection.geodeticLatitudeToMercatorAngle(cartographicScratch.latitude) - southMercatorY) * oneOverMercatorHeight;
                }

                vertexBufferIndex = encoding.encode(vertexBuffer, vertexBufferIndex, position, uv, cartographicScratch.height, toPack, webMercatorT);

                if (previousIndex !== -1) {
                    indexBuffer[indexBufferIndex++] = previousIndex;
                    indexBuffer[indexBufferIndex++] = vertexIndex - 1;
                    indexBuffer[indexBufferIndex++] = index;

                    indexBuffer[indexBufferIndex++] = vertexIndex - 1;
                    indexBuffer[indexBufferIndex++] = vertexIndex;
                    indexBuffer[indexBufferIndex++] = index;
                }

                previousIndex = index;
                ++vertexIndex;
            }

            return indexBufferIndex;
        }

        function copyAndSort(typedArray, comparator) {
            var copy;
            if (typeof typedArray.slice === 'function') {
                copy = typedArray.slice();
                if (typeof copy.sort !== 'function') {
                    // Sliced typed array isn't sortable, so we can't use it.
                    copy = undefined;
                }
            }

            if (!defined.defined(copy)) {
                copy = Array.prototype.slice.call(typedArray);
            }

            copy.sort(comparator);

            return copy;
        }
    var createVerticesFromQuantizedTerrainMesh$1 = createTaskProcessorWorker(createVerticesFromQuantizedTerrainMesh);

    return createVerticesFromQuantizedTerrainMesh$1;

});
