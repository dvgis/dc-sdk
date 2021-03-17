/**
 * @Author: Caven
 * @Date: 2020-01-15 20:31:28
 */

import { Cesium } from '@dc-modules/namespace'
import ImageryType from '../ImageryType'
import AmapMercatorTilingScheme from '../tiling-scheme/AmapMercatorTilingScheme'

const IMG_URL =
  'https://webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'

const ELEC_URL =
  'http://webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'

const LOAD_MARK_URL =
  'https://webst{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'

class AmapImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    options['url'] =
      options.style === 'img'
        ? IMG_URL
        : options.style === 'load'
        ? LOAD_MARK_URL
        : ELEC_URL
    options['subdomains'] = options.subdomains || ['01', '02', '03', '04']
    if (options.crs === 'WGS84') {
      options['tilingScheme'] = new AmapMercatorTilingScheme()
    }
    super(options)
  }
}

ImageryType.AMAP = 'amap'

export default AmapImageryProvider
