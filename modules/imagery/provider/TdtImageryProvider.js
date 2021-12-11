/**
 * @Author: Caven
 * @Date: 2020-01-15 20:31:46
 */

import { Cesium } from '@dc-modules/namespace'
import ImageryType from '../ImageryType'

const MAP_URL =
  '//t{s}.tianditu.gov.cn/DataServer?T={style}_w&x={x}&y={y}&l={z}&tk={key}'

class TdtImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    super({
      url: [
        options.protocol || '',
        MAP_URL.replace(/\{style\}/g, options.style || 'vec').replace(
          /\{key\}/g,
          options.key || ''
        )
      ].join(''),
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 18
    })
  }
}

ImageryType.TDT = 'tdt'

export default TdtImageryProvider
