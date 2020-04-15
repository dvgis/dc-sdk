/*
 * @Author: Caven
 * @Date: 2020-01-15 20:31:28
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-14 19:25:09
 */

import Cesium from '@/namespace'

const IMG_URL =
  'https://webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'

const ELEC_URL =
  'http://webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'

class AmapImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    options['url'] = options.style === 'img' ? IMG_URL : ELEC_URL
    if (!options.subdomains) {
      options['subdomains'] = ['01', '02', '03', '04']
    }
    super(options)
  }
}
export default AmapImageryProvider
