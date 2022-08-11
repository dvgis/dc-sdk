/**
 * @Author: Caven
 * @Date: 2022-08-11 18:52:22
 */

const cache = {}

export function registerLib(name, lib) {
  cache[name] = lib
}

export function getlib(name) {
  return cache[name]
}
