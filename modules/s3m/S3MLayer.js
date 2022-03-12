/**
 * @Author: Caven
 * @Date: 2022-02-20 13:46:53
 */

import State from '@dc-modules/state/State'
import { Layer } from '@dc-modules/layer'
import S3MTilesLayer from 's3m-lib/S3MTiles/S3MTilesLayer'
import ClusterLayer from '../layer/type/ClusterLayer'

class S3MLayer extends Layer {
  constructor(id, url, options = {}) {
    super(id)
    this._url = url
    this._options = options
  }

  get type() {
    return Layer.getLayerType('s3m')
  }

  _onAdd(viewer) {
    this._viewer = viewer
    delete this._options['context']
    delete this._options['url']
    this._delegate = new S3MTilesLayer({
      context: this._viewer.scene.context,
      url: this._url,
      ...this._options
    })
    this._viewer.scene.primitives.add(this._delegate)
    this._addedHook && this._addedHook()
    this._state = State.ADDED
  }

  _onRemove() {
    if (!this._delegate) {
      return
    }
    this._viewer.scene.primitives.remove(this._delegate)
    this._removedHook && this._removedHook()
    this._state = State.REMOVED
  }
}

Layer.registerType('s3m')

export default S3MLayer
