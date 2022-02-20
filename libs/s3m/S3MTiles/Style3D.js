
const  { Cesium }  = DC.Namespace

function Style3D() {
  this._fillForeColor = new Cesium.Color()
  this._lineColor = new Cesium.Color()
  this._lineWidth = 1.0
  this._bottomAltitude = 0
  this._pointSize = 1.0
  this._pointColor = new Cesium.Color()
}

Object.defineProperties(Style3D.prototype, {
  fillForeColor: {
    get: function() {
      return this._fillForeColor
    },
    set: function(value) {
      Cesium.Check.typeOf.object('fillForeColor value', value)
      Cesium.Color.clone(value, this._fillForeColor)
    }
  },
  bottomAltitude: {
    get: function() {
      return this._bottomAltitude
    },
    set: function(value) {
      Cesium.Check.typeOf.number('bottomAltitude value', value)
      if (this._bottomAltitude !== value) {
        this._bottomAltitude = value
        this._dirty = true
      }
    }
  },
  altitudeMode: {
    get: function() {
      return this._altitudeMode
    },
    set: function(value) {
      Cesium.Check.typeOf.number('altitudeMode value', value)
      this._altitudeMode = value
    }
  },
  lineColor: {
    get: function() {
      return this._lineColor
    },
    set: function(value) {
      Cesium.Check.typeOf.object('line color', value)
      Cesium.Color.clone(value, this._lineColor)
    }
  },
  lineWidth: {
    get: function() {
      return this._lineWidth
    },
    set: function(value) {
      Cesium.Check.typeOf.number('line width', value)
      this._lineWidth = value
    }
  },
  pointSize: {
    get: function() {
      return this._pointSize
    },
    set: function(value) {
      Cesium.Check.typeOf.number('point size', value)
      this._pointSize = value
    }
  },
  pointColor: {
    get: function() {
      return this._pointColor
    },
    set: function(value) {
      Cesium.Check.typeOf.object('point color', value)
      Cesium.Color.clone(value, this._pointColor)
    }
  }
})

export default Style3D
