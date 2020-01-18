/*
 * @Author: Caven
 * @Date: 2019-12-31 17:50:13
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-15 13:03:13
 */

/**
 *  Dom工具类
 *  部分代码借鉴leaflet
 * https://github.com/Leaflet/Leaflet/tree/master/src/core
 */
DC.DomUtil = class {
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
   *
   * @param {*} el
   * @param {*} name
   * Adds `name` to the element's class attribute.
   */
  static addClass(el, name) {
    if (el.classList !== undefined) {
      let classes = DC.Util.splitWords(name)
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
        DC.Util.trim(
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
}
