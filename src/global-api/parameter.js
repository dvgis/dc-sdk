/**
 * @Author : Caven Chen
 */

const params = {}

/**
 * set param
 * @param name
 * @param value
 */
export function setParam(name, value) {
  params[name] = value
}

/**
 * get param
 * @param name
 * @return {*}
 */
export function getParam(name) {
  return params[name]
}
