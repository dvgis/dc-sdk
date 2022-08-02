/**
 * @Author: Caven
 * @Date: 2021-03-15 18:36:48
 */

const cahce = {}

export function setNamespace(name, lib) {
  cahce[name] = lib
}

export function getNamespace(name) {
  return cahce[name]
}

export const Cesium = getNamespace('Cesium')

export const mapv = getNamespace('mapv')

export const turf = getNamespace('turf')
