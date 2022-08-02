/**
 * @Author: Caven
 * @Date: 2022-08-02 19:28:40
 */

const cahce = {}

export function add(name, lib) {
  cahce[name] = lib
}

export function get(name) {
  return cahce[name]
}

export function getCesium() {
  return cahce['Cesium']
}

export function getTurf() {
  return cahce['turf']
}

export function getMapv() {
  return cahce['mapv']
}
