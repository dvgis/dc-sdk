/**
 * @Author : Caven Chen
 */

const cache = {}

/**
 * register lib
 * @param name
 * @param lib
 */
export function registerLib(name, lib) {
  cache[name] = lib
}

/**
 * get lib
 * @param name
 * @return {*}
 */
export function getLib(name) {
  return cache[name]
}
