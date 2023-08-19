/**
 * @Author : Caven Chen
 */
import { TileSetEventType } from '../EventType'
import Event from '../Event'

class TilesetEvent extends Event {
  constructor(tileset) {
    super(TileSetEventType)
    this._tileset = tileset
  }

  /**
   *
   * @param type
   * @param callback
   * @param context
   */
  on(type, callback, context) {
    this._tileset.then((tileset) => {
      switch (type) {
        case TileSetEventType.INITIAL_TILES_LOADED:
          tileset.initialTilesLoaded.addEventListener(callback, context || this)
          break
        case TileSetEventType.ALL_TILES_LOADED:
          tileset.allTilesLoaded.addEventListener(callback, context || this)
          break
        case TileSetEventType.LOAD_PROGRESS:
          tileset.loadProgress.addEventListener(callback, context || this)
          break
        case TileSetEventType.TILE_FAILED:
          tileset.tileFailed.addEventListener(callback, context || this)
          break
        case TileSetEventType.TILE_LOAD:
          tileset.tileLoad.addEventListener(callback, context || this)
          break
        case TileSetEventType.TILE_UNLOAD:
          tileset.tileUnload.addEventListener(callback, context || this)
          break
        case TileSetEventType.TILE_VISIBLE:
          tileset.tileVisible.addEventListener(callback, context || this)
          break
        default:
          break
      }
    })
    return null
  }

  off(type, callback, context) {
    this._tileset.then((tileset) => {
      switch (type) {
        case TileSetEventType.INITIAL_TILES_LOADED:
          tileset.initialTilesLoaded.removeEventListener(
            callback,
            context || this
          )
          break
        case TileSetEventType.ALL_TILES_LOADED:
          tileset.allTilesLoaded.removeEventListener(callback, context || this)
          break
        case TileSetEventType.LOAD_PROGRESS:
          tileset.loadProgress.removeEventListener(callback, context || this)
          break
        case TileSetEventType.TILE_FAILED:
          tileset.tileFailed.removeEventListener(callback, context || this)
          break
        case TileSetEventType.TILE_LOAD:
          tileset.tileLoad.removeEventListener(callback, context || this)
          break
        case TileSetEventType.TILE_UNLOAD:
          tileset.tileUnload.removeEventListener(callback, context || this)
          break
        case TileSetEventType.TILE_VISIBLE:
          tileset.tileVisible.removeEventListener(callback, context || this)
          break
        default:
          break
      }
    })
    return true
  }
}

export default TilesetEvent
