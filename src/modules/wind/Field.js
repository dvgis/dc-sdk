/**
 * @Author: Caven
 * @Date: 2021-01-18 20:13:30
 */

import Vector from './Vector'

class Field {
  constructor(params) {
    this.grid = []
    this.xmin = params.xmin
    this.xmax = params.xmax
    this.ymin = params.ymin
    this.ymax = params.ymax
    this.cols = params.cols // 列数
    this.rows = params.rows // 行数
    this.us = params.us //
    this.vs = params.vs
    this.deltaX = params.deltaX // x 方向增量
    this.deltaY = params.deltaY // y方向增量
    if (this.deltaY < 0 && this.ymin < this.ymax) {
      // eslint-disable-next-line no-console
      console.warn('[wind-core]: The data is flipY')
    } else {
      this.ymin = Math.min(params.ymax, params.ymin)
      this.ymax = Math.max(params.ymax, params.ymin)
    }
    this.isFields = true
    let cols = Math.ceil((this.xmax - this.xmin) / params.deltaX) // 列
    let rows = Math.ceil((this.ymax - this.ymin) / params.deltaY) // 行
    if (cols !== this.cols || rows !== this.rows) {
      // eslint-disable-next-line no-console
      console.warn('[wind-core]: The data grid not equal')
    }
    // Math.floor(ni * Δλ) >= 360;
    this.isContinuous = Math.floor(this.cols * params.deltaX) >= 360
    this.wrappedX = 'wrappedX' in params ? params.wrappedX : this.xmax > 180 // [0, 360] --> [-180, 180];
    this.grid = this.buildGrid()
    this.range = this.calculateRange()
  }
  // from https://github.com/sakitam-fdd/wind-layer/blob/95368f9433/src/windy/windy.js#L110
  buildGrid() {
    let grid = []
    let p = 0
    let _a = this,
      rows = _a.rows,
      cols = _a.cols,
      us = _a.us,
      vs = _a.vs
    for (let j = 0; j < rows; j++) {
      let row = []
      for (let i = 0; i < cols; i++, p++) {
        let u = us[p]
        let v = vs[p]
        let valid = this.isValid(u) && this.isValid(v)
        row[i] = valid ? new Vector(u, v) : null
      }
      if (this.isContinuous) {
        row.push(row[0])
      }
      grid[j] = row
    }
    return grid
  }

  /**
   *
   */
  release() {
    this.grid = []
  }

  /***
   *
   * @returns {(*)[]}
   */
  extent() {
    return [this.xmin, this.ymin, this.xmax, this.ymax]
  }

  /**
   * Bilinear interpolation for Vector
   * https://en.wikipedia.org/wiki/Bilinear_interpolation
   * @param   {Number} x
   * @param   {Number} y
   * @param   {Number[]} g00
   * @param   {Number[]} g10
   * @param   {Number[]} g01
   * @param   {Number[]} g11
   * @returns {Vector}
   */
  bilinearInterpolateVector(x, y, g00, g10, g01, g11) {
    let rx = 1 - x
    let ry = 1 - y
    let a = rx * ry
    let b = x * ry
    let c = rx * y
    let d = x * y
    let u = g00.u * a + g10.u * b + g01.u * c + g11.u * d
    let v = g00.v * a + g10.v * b + g01.v * c + g11.v * d
    return new Vector(u, v)
  }

  /**
   * calculate vector value range
   */
  calculateRange() {
    if (!this.grid || !this.grid[0]) {
      return
    }
    let rows = this.grid.length
    let cols = this.grid[0].length
    // const vectors = [];
    let min
    let max
    // @from: https://stackoverflow.com/questions/13544476/how-to-find-max-and-min-in-array-using-minimum-comparisons
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        let vec = this.grid[j][i]
        if (vec !== null) {
          let val = vec.m || vec.magnitude()
          // vectors.push();
          if (min === undefined) {
            min = val
          } else if (max === undefined) {
            max = val
            // update min max
            // 1. Pick 2 elements(a, b), compare them. (say a > b)
            min = Math.min(min, max)
            max = Math.max(min, max)
          } else {
            // 2. Update min by comparing (min, b)
            // 3. Update max by comparing (max, a)
            min = Math.min(val, min)
            max = Math.max(val, max)
          }
        }
      }
    }
    return [min, max]
  }
  /**
   *
   * @param x
   * @private
   */
  isValid(x) {
    return x !== null && x !== undefined
  }

  getWrappedLongitudes() {
    let xmin = this.xmin
    let xmax = this.xmax
    if (this.wrappedX) {
      if (this.isContinuous) {
        xmin = -180
        xmax = 180
      } else {
        xmax = this.xmax - 360
        xmin = this.xmin - 360
      }
    }
    return [xmin, xmax]
  }

  contains(lon, lat) {
    let _a = this.getWrappedLongitudes(),
      xmin = _a[0],
      xmax = _a[1]
    let longitudeIn = lon >= xmin && lon <= xmax
    let latitudeIn
    if (this.deltaY >= 0) {
      latitudeIn = lat >= this.ymin && lat <= this.ymax
    } else {
      latitudeIn = lat >= this.ymax && lat <= this.ymin
    }
    return longitudeIn && latitudeIn
  }

  /**
   *
   * @param a
   * @param n
   * @returns {number}
   */
  floorMod(a, n) {
    return a - n * Math.floor(a / n)
  }

  /**
   *
   * @param lon
   * @param lat
   */
  getDecimalIndexes(lon, lat) {
    let i = this.floorMod(lon - this.xmin, 360) / this.deltaX // calculate longitude index in wrapped range [0, 360)
    let j = (this.ymax - lat) / this.deltaY // calculate latitude index in direction +90 to -90
    return [i, j]
  }

  /**
   * Nearest value at lon-lat coordinates
   *
   * @param lon
   * @param lat
   */
  valueAt(lon, lat) {
    if (!this.contains(lon, lat)) {
      return null
    }
    let indexes = this.getDecimalIndexes(lon, lat)
    let ii = Math.floor(indexes[0])
    let jj = Math.floor(indexes[1])
    let ci = this.clampColumnIndex(ii)
    let cj = this.clampRowIndex(jj)
    return this.valueAtIndexes(ci, cj)
  }
  /**
   * Get interpolated grid value lon-lat coordinates
   * @param lon
   * @param lat
   */
  interpolatedValueAt(lon, lat) {
    if (!this.contains(lon, lat)) {
      return null
    }
    let _a = this.getDecimalIndexes(lon, lat),
      i = _a[0],
      j = _a[1]
    return this.interpolatePoint(i, j)
  }

  hasValueAt(lon, lat) {
    let value = this.valueAt(lon, lat)
    return value !== null
  }

  /**
   *
   * @param i
   * @param j
   */
  interpolatePoint(i, j) {
    //         1      2           After converting λ and φ to fractional grid indexes i and j, we find the
    //        fi  i   ci          four points 'G' that enclose point (i, j). These points are at the four
    //         | =1.4 |           corners specified by the floor and ceiling of i and j. For example, given
    //      ---G--|---G--- fj 8   i = 1.4 and j = 8.3, the four surrounding grid points are (1, 8), (2, 8),
    //    j ___|_ .   |           (1, 9) and (2, 9).
    //  =8.3   |      |
    //      ---G------G--- cj 9   Note that for wrapped grids, the first column is duplicated as the last
    //         |      |           column, so the index ci can be used without taking a modulo.
    let indexes = this.getFourSurroundingIndexes(i, j)
    let fi = indexes[0],
      ci = indexes[1],
      fj = indexes[2],
      cj = indexes[3]
    let values = this.getFourSurroundingValues(fi, ci, fj, cj)
    if (values) {
      let g00 = values[0],
        g10 = values[1],
        g01 = values[2],
        g11 = values[3]
      // @ts-ignore
      return this.bilinearInterpolateVector(i - fi, j - fj, g00, g10, g01, g11)
    }
    return null
  }
  /**
   * Check the column index is inside the field,
   * adjusting to min or max when needed
   * @private
   * @param   {Number} ii - index
   * @returns {Number} i - inside the allowed indexes
   */
  clampColumnIndex(ii) {
    let i = ii
    if (ii < 0) {
      i = 0
    }
    let maxCol = this.cols - 1
    if (ii > maxCol) {
      i = maxCol
    }
    return i
  }

  /**
   * Check the row index is inside the field,
   * adjusting to min or max when needed
   * @private
   * @param   {Number} jj index
   * @returns {Number} j - inside the allowed indexes
   */
  clampRowIndex(jj) {
    let j = jj
    if (jj < 0) {
      j = 0
    }
    let maxRow = this.rows - 1
    if (jj > maxRow) {
      j = maxRow
    }
    return j
  }

  /**
   * from: https://github.com/IHCantabria/Leaflet.CanvasLayer.Field/blob/master/src/Field.js#L252
   * @private
   * @param   {Number} i - decimal index
   * @param   {Number} j - decimal index
   * @returns {Array} [fi, ci, fj, cj]
   */
  getFourSurroundingIndexes(i, j) {
    let fi = Math.floor(i) // 左
    let ci = fi + 1 // 右
    // duplicate colum to simplify interpolation logic (wrapped value)
    if (this.isContinuous && ci >= this.cols) {
      ci = 0
    }
    ci = this.clampColumnIndex(ci)
    let fj = this.clampRowIndex(Math.floor(j)) // 上 纬度方向索引（取整）
    let cj = this.clampRowIndex(fj + 1) // 下
    return [fi, ci, fj, cj]
  }

  /**
   * from https://github.com/IHCantabria/Leaflet.CanvasLayer.Field/blob/master/src/Field.js#L277
   * Get four surrounding values or null if not available,
   * from 4 integer indexes
   * @private
   * @param   {Number} fi
   * @param   {Number} ci
   * @param   {Number} fj
   * @param   {Number} cj
   * @returns {Array}
   */
  getFourSurroundingValues(fi, ci, fj, cj) {
    let row
    if ((row = this.grid[fj])) {
      let g00 = row[fi] // << left
      let g10 = row[ci] // right >>
      if (this.isValid(g00) && this.isValid(g10) && (row = this.grid[cj])) {
        // lower row vv
        let g01 = row[fi] // << left
        let g11 = row[ci] // right >>
        if (this.isValid(g01) && this.isValid(g11)) {
          return [g00, g10, g01, g11] // 4 values found!
        }
      }
    }
    return null
  }

  /**
   * Value for grid indexes
   * @param   {Number} i - column index (integer)
   * @param   {Number} j - row index (integer)
   * @returns {Vector|Number}
   */
  valueAtIndexes(i, j) {
    return this.grid[j][i] // <-- j,i !!
  }

  /**
   * Lon-Lat for grid indexes
   * @param   {Number} i - column index (integer)
   * @param   {Number} j - row index (integer)
   * @returns {Number[]} [lon, lat]
   */
  lonLatAtIndexes(i, j) {
    let lon = this.longitudeAtX(i)
    let lat = this.latitudeAtY(j)
    return [lon, lat]
  }

  /**
   * Longitude for grid-index
   * @param   {Number} i - column index (integer)
   * @returns {Number} longitude at the center of the cell
   */
  longitudeAtX(i) {
    let halfXPixel = this.deltaX / 2.0
    let lon = this.xmin + halfXPixel + i * this.deltaX
    if (this.wrappedX) {
      lon = lon > 180 ? lon - 360 : lon
    }
    return lon
  }

  /**
   * Latitude for grid-index
   * @param j
   * @returns {number}
   */
  latitudeAtY(j) {
    let halfYPixel = this.deltaY / 2.0
    return this.ymax - halfYPixel - j * this.deltaY
  }

  /**
   *
   * @param o
   * @param width
   * @param height
   * @param unproject
   * @returns {{}}
   */
  randomize(o, width, height, unproject) {
    if (o === void 0) {
      o = {}
    }
    let i = (Math.random() * (width || this.cols)) | 0
    let j = (Math.random() * (height || this.rows)) | 0
    let coords = unproject([i, j])
    if (coords !== null) {
      o.x = coords[0]
      o.y = coords[1]
    } else {
      o.x = this.longitudeAtX(i)
      o.y = this.latitudeAtY(j)
    }
    return o
  }

  /**
   * check is custom field
   */
  checkFields() {
    return this.isFields
  }
}

export default Field
