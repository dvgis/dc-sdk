/**
 * @Author : Caven Chen
 */

import { Cesium } from '../../../namespace'
import ImageryType from '../ImageryType'

/**
 *
 * 地址：https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}
 * 底图类型：
 *  m 标准路线图 lyrs=m
 *  r 某种改变的路线图（路线不明显） lyrs=r
 *  s 影像层（卫星图） lyrs=s
 *  y 带标签的卫星图 lyrs=y
 *  h 标签层（路名、地名等） lyrs=h
 *  t 地形图 lyrs=t
 *  p 带标签的地形图 lyrs=p
 *
 */
const TILE_URL = {
  img: 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
  elec: 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=m&x={x}&y={y}&z={z}',
  ter: 'https://gac-geo.googlecnapps.cn/maps/vt?lyrs=t@131,r&x={x}&y={y}&z={z}',
}

class GoogleImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    options['url'] =
      options.url ||
      [
        options.protocol || '',
        TILE_URL[options.style] || TILE_URL['elec'],
      ].join('')
    options['subdomains'] = options.subdomains || ['1', '2', '3']
    super(options)
  }
}

ImageryType.GOOGLE = 'google'

export default GoogleImageryProvider
