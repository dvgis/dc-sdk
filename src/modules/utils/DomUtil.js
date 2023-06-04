/**
 * @Author : Caven Chen
 */

import Util from './Util'

/**
 * Dom Utils
 * some code reference leaflet
 * https://github.com/Leaflet/Leaflet/tree/master/src/core
 */
class DomUtil {
  /**
   * Returns an element given its DOM id, or returns the element itself
   *  if it was passed directly.
   * @param id
   * @returns {HTMLElement|*}
   */
  static get(id) {
    return typeof id === 'string' ? document.getElementById(id) : id
  }

  /**
   * Returns the value for a certain style attribute on an element,
   * including computed values or values set through CSS.
   * @param el
   * @param style
   * @returns {null|*}
   */
  static getStyle(el, style) {
    let value = el.style[style] || (el.currentStyle && el.currentStyle[style])

    if ((!value || value === 'auto') && document.defaultView) {
      let css = document.defaultView.getComputedStyle(el, null)
      value = css ? css[style] : null
    }
    return value === 'auto' ? null : value
  }

  /**
   * Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
   * @param tagName
   * @param className
   * @param container
   * @returns {HTMLElement}
   */
  static create(tagName, className, container = null) {
    let el = document.createElement(tagName)
    el.className = className || ''
    if (container) {
      container.appendChild(el)
    }
    return el
  }

  /**
   * Removes `el` from its parent element
   * @param {*} el
   */
  static remove(el) {
    let parent = el.parentNode
    if (parent) {
      parent.removeChild(el)
    }
  }

  /**
   * Removes all of `el`'s children elements from `el`
   * @param {*} el
   */
  static empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild)
    }
  }

  /**
   * Returns `true` if the element's class attribute contains `name`.
   * @param {*} el
   * @param {*} name
   */
  static hasClass(el, name) {
    if (el.classList !== undefined) {
      return el.classList.contains(name)
    }
    let className = this.getClass(el)
    return (
      className.length > 0 &&
      new RegExp('(^|\\s)' + name + '(\\s|$)').test(className)
    )
  }

  /**
   * @function Adds `name` to the element's class attribute.
   * @param {*} el
   * @param {*} name
   */
  static addClass(el, name) {
    if (el.classList !== undefined) {
      let classes = Util.splitWords(name)
      for (let i = 0, len = classes.length; i < len; i++) {
        el.classList.add(classes[i])
      }
    } else if (!this.hasClass(el, name)) {
      let className = this.getClass(el)
      this.setClass(el, (className ? className + ' ' : '') + name)
    }
  }

  /**
   * @function Removes `name` from the element's class attribute.
   * @param {*} el
   * @param {*} name
   */
  static removeClass(el, name) {
    if (el.classList !== undefined) {
      el.classList.remove(name)
    } else {
      this.setClass(
        el,
        Util.trim(
          (' ' + this.getClass(el) + ' ').replace(' ' + name + ' ', ' ')
        )
      )
    }
  }

  /**
   * Sets the element's class.
   * @param {*} el
   * @param {*} name
   */
  static setClass(el, name) {
    if (el.className.baseVal === undefined) {
      el.className = name
    } else {
      // in case of SVG element
      el.className.baseVal = name
    }
  }

  /**
   * @function Returns the element's class.
   * @param {*} el
   */
  static getClass(el) {
    // Check if the element is an SVGElementInstance and use the correspondingElement instead
    // (Required for linked SVG elements in IE11.)
    if (el.correspondingElement) {
      el = el.correspondingElement
    }
    return el.className.baseVal === undefined
      ? el.className
      : el.className.baseVal
  }

  /**
   * Creates svg
   * @param width
   * @param height
   * @param path
   * @param container
   * @returns {SVGElement}
   */
  static createSvg(width, height, path, container) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg:svg')
    svg.setAttribute('class', 'svg-path')
    svg.setAttribute('width', width)
    svg.setAttribute('height', height)
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    let pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    pathEl.setAttribute('d', path)
    svg.appendChild(pathEl)
    if (container) {
      container.appendChild(svg)
    }
    return svg
  }

  /**
   * Parses string to Dom
   * @param domStr
   * @param withWrapper
   * @param className
   * @returns {HTMLDivElement|NodeListOf<ChildNode>}
   */
  static parseDom(domStr, withWrapper, className) {
    withWrapper = withWrapper ?? false
    let el = document.createElement('div')
    el.className = className || ''
    el.innerHTML = domStr
    return withWrapper ? el : el.childNodes
  }

  /**
   * enter full screen
   * @param el
   */
  static enterFullscreen(el) {
    if (!el) {
      return
    }
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen()
    }
  }

  /**
   * exit full screen
   */
  static exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }

  /**
   * Creates video
   * @param url
   * @param className
   * @param container
   * @returns {HTMLElement}
   */
  static createVideo(url, className, container = null) {
    let videoEl = this.create('video', className, container)
    let map4 = this.create('source', '', videoEl)
    map4.setAttribute('src', url)
    map4.setAttribute('type', 'video/map4')
    let mov = this.create('source', '', videoEl)
    mov.setAttribute('src', url)
    mov.setAttribute('type', 'video/quicktime')
    return videoEl
  }
}

export default DomUtil
