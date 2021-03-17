/**
 * @Author: Caven
 * @Date: 2021-03-15 18:36:48
 */

const getCesium = () => {
  return DC.Namespace?.Cesium
}

const getMapv = () => {
  return DC.Namespace?.mapv
}

export const Cesium = getCesium()

export const mapv = getMapv()
