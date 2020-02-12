/*
 * @Author: Caven
 * @Date: 2020-01-15 20:31:46
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-12 02:05:03
 */
import Cesium from '@/namespace'

const MAP_URL =
  'http://t{s}.tianditu.gov.cn/{layer}_c/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer={layer}&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles&tk={key}'

class TdtImageryProvider extends Cesium.WebMapTileServiceImageryProvider {
  constructor(options = {}) {
    super({
      url: MAP_URL.replace(/\{layer\}/g, options.style || 'vec').replace(
        /\{key\}/g,
        options.key || ''
      ),
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'c',
      subdomains: [...Array(6).keys()].map(item => (item + 1).toString()),
      tileMatrixLabels: [...Array(18).keys()].map(item =>
        (item + 1).toString()
      ),
      tilingScheme: new Cesium.GeographicTilingScheme(),
      maximumLevel: 18
    })
  }
}

export default TdtImageryProvider
