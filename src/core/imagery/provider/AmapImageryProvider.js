/*
 * @Author: Caven
 * @Date: 2020-01-15 20:31:28
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-31 15:04:49
 */

import Cesium from '@/namespace'

const IMG_URL = 'https://webst04.is.autonavi.com/appmaptile?style=6&x={z}&y={y}&z={z}'
const ELEC_URL = 'http://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'

class AmapImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    options['url'] = options.style === 'img' ? IMG_URL : ELEC_URL
    super(options)
  }
}
export default AmapImageryProvider
