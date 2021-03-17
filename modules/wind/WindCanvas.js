/**
 * @Author: Caven
 * @Date: 2021-01-18 17:46:40
 */

class WindCanvas {
  constructor(ctx) {
    this.options = {}
    this.particles = []
    this.ctx = ctx
    this.animationLoop = undefined
    this.animate = this.animate.bind(this)
  }

  /**
   *
   * @param m
   * @param min
   * @param max
   * @param colorScale
   * @returns {number}
   * @private
   */
  _indexFor(m, min, max, colorScale) {
    return Math.max(
      0,
      Math.min(
        colorScale.length - 1,
        Math.round(((m - min) / (max - min)) * (colorScale.length - 1))
      )
    )
  }

  /**
   *
   * @private
   */
  _moveParticles() {
    if (!this.particles || !this.particles.length) {
      return
    }
    let width = this.ctx.canvas.width
    let height = this.ctx.canvas.height
    let particles = this.particles
    let maxAge = this.options.maxAge
    let velocityScale =
      typeof this.options.velocityScale === 'function'
        ? this.options.velocityScale()
        : this.options.velocityScale
    for (let i = 0; i < particles.length; i++) {
      let particle = particles[i]
      if (particle.age > maxAge) {
        particle.age = 0
        this.field.randomize(particle, width, height, this.unProject)
      }
      let x = particle.x
      let y = particle.y
      let vector = this.field.interpolatedValueAt(x, y)
      if (vector === null) {
        particle.age = maxAge
      } else {
        let xt = x + vector.u * velocityScale
        let yt = y + vector.v * velocityScale
        if (this.field.hasValueAt(xt, yt)) {
          particle.xt = xt
          particle.yt = yt
          particle.m = vector.m
        } else {
          particle.x = xt
          particle.y = yt
          particle.age = maxAge
        }
      }
      particle.age++
    }
  }

  /**
   *
   * @private
   */
  _drawParticles() {
    if (!this.particles || !this.particles.length) {
      return
    }
    let particles = this.particles
    let prev = this.ctx.globalCompositeOperation
    this.ctx.globalCompositeOperation = 'destination-in'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.globalCompositeOperation = prev
    this.ctx.globalAlpha = this.options.globalAlpha
    this.ctx.fillStyle = 'rgba(0, 0, 0, ' + this.options.globalAlpha + ')'
    this.ctx.lineWidth = this.options.lineWidth ? this.options.lineWidth : 1
    this.ctx.strokeStyle = this.options.colorScale
      ? this.options.colorScale
      : '#fff'
    let i = 0
    let len = particles.length
    if (this.field && len > 0) {
      let min = void 0
      let max = void 0
      if (this.options.minVelocity && this.options.maxVelocity) {
        min = this.options.minVelocity
        max = this.options.maxVelocity
      } else {
        let _a = this.field.range
        min = _a[0]
        max = _a[1]
      }
      for (; i < len; i++) {
        this[
          this.options.useCoordsDraw
            ? '_drawCoordsParticle'
            : '_drawPixelParticle'
        ](particles[i], min, max)
      }
    }
  }

  /**
   *
   * @param particle
   * @param min
   * @param max
   */
  _drawPixelParticle(particle, min, max) {
    let pointPrev = [particle.x, particle.y]
    let pointNext = [particle.xt, particle.yt]
    if (
      pointNext &&
      pointPrev &&
      pointNext[0] &&
      pointNext[1] &&
      pointPrev[0] &&
      pointPrev[1] &&
      particle.age <= this.options.maxAge
    ) {
      this._drawStroke(pointPrev, pointNext, particle, min, max)
    }
  }

  /**
   *
   * @param particle
   * @param min
   * @param max
   */
  _drawCoordsParticle(particle, min, max) {
    let source = [particle.x, particle.y]
    let target = [particle.xt, particle.yt]
    if (
      target &&
      source &&
      target[0] &&
      target[1] &&
      source[0] &&
      source[1] &&
      this.intersectsCoordinate(target) &&
      particle.age <= this.options.maxAge
    ) {
      let pointPrev = this.project(source)
      let pointNext = this.project(target)
      this._drawStroke(pointPrev, pointNext, particle, min, max)
    }
  }

  /**
   *
   * @param pointPrev
   * @param pointNext
   * @param particle
   * @param min
   * @param max
   * @private
   */
  _drawStroke(pointPrev, pointNext, particle, min, max) {
    if (pointPrev && pointNext) {
      this.ctx.beginPath()
      this.ctx.moveTo(pointPrev[0], pointPrev[1])
      this.ctx.lineTo(pointNext[0], pointNext[1])
      if (typeof this.options.colorScale === 'function') {
        this.ctx.strokeStyle = this.options.colorScale(particle.m)
      } else if (Array.isArray(this.options.colorScale)) {
        let colorIdx = this._indexFor(
          particle.m,
          min,
          max,
          this.options.colorScale
        )
        this.ctx.strokeStyle = this.options.colorScale[colorIdx]
      }
      if (typeof this.options.lineWidth === 'function') {
        this.ctx.lineWidth = this.options.lineWidth(particle.m)
      }
      particle.x = particle.xt
      particle.y = particle.yt
      this.ctx.stroke()
    }
  }

  /**
   *
   * @returns {[]|*[]}
   * @private
   */
  _prepareParticlePaths() {
    let width = this.ctx.canvas.width
    let height = this.ctx.canvas.height
    let particleCount =
      typeof this.options.paths === 'function'
        ? this.options.paths(this)
        : this.options.paths
    let particles = []
    if (!this.field) {
      return []
    }
    for (let i = 0; i < particleCount; i++) {
      particles.push(
        this.field.randomize(
          {
            age: Math.floor(Math.random() * this.options.maxAge)
          },
          width,
          height,
          this.unProject
        )
      )
    }
    return particles
  }

  /**
   *
   */
  project() {
    throw new Error('project must be overriden')
  }

  /**
   *
   */
  unProject() {
    throw new Error('unProject must be overriden')
  }

  /**
   *
   * @param coordinates
   */
  intersectsCoordinate(coordinates) {
    throw new Error('must be override')
  }

  /**
   *
   */
  prerender() {
    if (!this.field) {
      return
    }
    this.particles = this._prepareParticlePaths()
    if (!this.starting && !this.forceStop) {
      this.starting = true
      this._then = Date.now()
      this.animate()
    }
  }

  /**
   *
   * @returns {WindCanvas}
   */
  render() {
    this._moveParticles()
    this._drawParticles()
    return this
  }

  clearCanvas() {
    this.stop()
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.forceStop = false
  }

  /**
   *
   */
  start() {
    this.starting = true
    this.forceStop = false
    this._then = Date.now()
    this.animate()
  }

  /**
   *
   */
  stop() {
    cancelAnimationFrame(this.animationLoop)
    this.starting = false
    this.forceStop = true
  }

  /**
   *
   */
  animate() {
    if (this.animationLoop) {
      cancelAnimationFrame(this.animationLoop)
    }
    this.animationLoop = requestAnimationFrame(this.animate)
    let now = Date.now()
    let delta = now - this._then
    if (delta > this.options.frameRate) {
      this._then = now - (delta % this.options.frameRate)
      this.render()
    }
  }

  /**
   *
   * @param field
   * @returns {WindCanvas}
   */
  setData(field) {
    this.field = field
    return this
  }

  /**
   *
   * @param options
   * @returns {WindCanvas}
   */
  setOptions(options) {
    this.options = options
    if (!this.options?.maxAge && this.options?.particleAge) {
      this.options.maxAge = Number(this.options.particleAge)
    }
    if (!this.options?.paths && this.options?.particleMultiplier) {
      this.options.paths = Math.round(
        this.options.width *
          this.options.height *
          Number(this.options.particleMultiplier)
      )
    }
    return this
  }
}

export default WindCanvas
