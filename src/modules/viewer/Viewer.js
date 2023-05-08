/**
 @author : Caven Chen
 @date : 2023-05-06
 */

import CesiumViewer from '../exts/Viewer.js'
class Viewer {
  constructor(id, options = {}) {
    this._delegate = new CesiumViewer(id, options)
  }
}

export default Viewer
