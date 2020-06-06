/*
 * @Author: Caven
 * @Date: 2019-12-31 17:50:13
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-06 14:52:28
 */

import Util from './Util'

/**
 * Dom工具类
 * 部分代码借鉴leaflet
 * https://github.com/Leaflet/Leaflet/tree/master/src/core
 */
class DomUtil {
  /**
   * @function get(id: String|HTMLElement): HTMLElement
   * Returns an element given its DOM id, or returns the element itself
   *  if it was passed directly.
   * @param {*} id
   */
  static get(id) {
    return typeof id === 'string' ? document.getElementById(id) : id
  }

  /**
   * @function getStyle(el: HTMLElement, styleAttrib: String): String
   * Returns the value for a certain style attribute on an element,
   * including computed values or values set through CSS.
   * @param {*} el
   * @param {*} style
   */
  static getStyle(el, style) {
    var value = el.style[style] || (el.currentStyle && el.currentStyle[style])

    if ((!value || value === 'auto') && document.defaultView) {
      var css = document.defaultView.getComputedStyle(el, null)
      value = css ? css[style] : null
    }
    return value === 'auto' ? null : value
  }

  /**
   *
   * @param {*} tagName
   * @param {*} className
   * @param {*} container
   *  Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
   */
  static create(tagName, className, container) {
    var el = document.createElement(tagName)
    el.className = className || ''
    if (container) {
      container.appendChild(el)
    }
    return el
  }

  /**
   *t
   * @param {*} el
   * Removes `el` from its parent element
   */
  static remove(el) {
    var parent = el.parentNode
    if (parent) {
      parent.removeChild(el)
    }
  }

  /**
   *
   * @param {*} el
   * Removes all of `el`'s children elements from `el`
   */
  static empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild)
    }
  }

  /**
   * @function hasClass(el: HTMLElement, name: String): Boolean
   * Returns `true` if the element's class attribute contains `name`.
   * @param {*} el
   * @param {*} name
   */
  hasClass(el, name) {
    if (el.classList !== undefined) {
      return el.classList.contains(name)
    }
    var className = getClass(el)
    return (
      className.length > 0 &&
      new RegExp('(^|\\s)' + name + '(\\s|$)').test(className)
    )
  }

  /**
   *
   * @param {*} el
   * @param {*} name
   * Adds `name` to the element's class attribute.
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
   *
   * @param {*} el
   * @param {*} name
   * Removes `name` from the element's class attribute.
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
   *
   * @param {*} el
   * @param {*} name
   *  Sets the element's class.
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
   * @param {*} el
   * Returns the element's class.
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
   *
   * @param {*} path
   * @param {*} width
   * @param {*} height
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
   *
   * @param {*} domStr
   * @param {*} withWrapper
   */
  static parseDom(domStr, withWrapper, className) {
    withWrapper = withWrapper ?? false
    let el = document.createElement('div')
    el.className = className || ''
    el.innerHTML = domStr
    return withWrapper ? el : el.childNodes
  }
}

export default DomUtil
