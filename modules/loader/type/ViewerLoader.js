/**
 * @Author: Caven
 * @Date: 2021-08-17 20:41:50
 */

class ViewerLoader {
  constructor() {}

  /**
   *
   * @param options
   * @returns {DC.Viewer}
   */
  loader(options = {}) {
    let viewer = new DC.Viewer(options.container || 'viewer-container')
    viewer.setOptions(options)
    return viewer
  }
}

export default ViewerLoader
