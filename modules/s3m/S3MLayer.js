/**
 * @Author: Caven
 * @Date: 2022-02-20 13:46:53
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import { Layer } from '@dc-modules/layer'
import S3MTilesLayer from 's3m-lib/S3MTiles/S3MTilesLayer'

class S3MLayer extends Layer {
  constructor(id, url) {
    super(id)
  }
}
