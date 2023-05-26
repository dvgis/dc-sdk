/**
 @author : Caven Chen
 @date : 2023-05-06
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
