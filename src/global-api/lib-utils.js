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
  if (name === 'echarts' && this.registerEcharts) {
    this.registerEcharts(lib)
  }
  return this
}

/**
 * get lib
 * @param name
 * @return {*}
 */
export function getLib(name) {
  return cache[name]
}
