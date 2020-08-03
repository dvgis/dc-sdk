/**
 * @Author: Caven
 * @Date: 2020-01-15 20:31:46
 */

import ImageryType from '../ImageryType'

const { Cesium } = DC.Namespace

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

ImageryType.TDT = 'tdt'

export default TdtImageryProvider
