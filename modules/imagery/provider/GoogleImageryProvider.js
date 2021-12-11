/**
 * @Author: Caven
 * @Date: 2020-01-21 16:06:14
 */

import { Cesium } from '@dc-modules/namespace'
import ImageryType from '../ImageryType'

const TILE_URL = {
  img: '//mt{s}.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali',
  elec:
    '//mt{s}.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile',
  ter:
    '//mt{s}.google.cn/vt/lyrs=t@131,r@227000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galile'
}

class GoogleImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    options['url'] =
      options.url ||
      [
        options.protocol || '',
        TILE_URL[options.style] || TILE_URL['elec']
      ].join('')
    options['subdomains'] = options.subdomains || ['1', '2', '3']
    super(options)
  }
}

ImageryType.GOOGLE = 'google'

export default GoogleImageryProvider
