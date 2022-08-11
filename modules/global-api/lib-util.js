/**
 * @Author: Caven
 * @Date: 2022-08-11 18:52:22
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
