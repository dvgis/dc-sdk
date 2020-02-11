/*
 * @Author: Caven
 * @Date: 2020-01-21 16:10:47
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-11 16:18:17
 */

import Cesium from '@/namespace'

const ELEC_URL =
  'https://rt{s}.map.gtimg.com/tile?z={z}&x={x}&y={reverseY}&styleid=1000&scene=0&version=347'

class TencentImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    options['url'] = ELEC_URL
    options['subdomains'] = options.subdomains || ['0']
    super(options)
  }
}

export default TencentImageryProvider
