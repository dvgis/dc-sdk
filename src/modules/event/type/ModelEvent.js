/**
 * @Author : Caven Chen
 */
import { ModelEventType } from '../EventType'
import Event from '../Event'

class ModelEvent extends Event {
  constructor(model) {
    super(ModelEventType)
    this._model = model
  }

  /**
   *
   * @param type
   * @param callback
   * @param context
   */
  on(type, callback, context) {
    this._model.then((model) => {
      switch (type) {
        case ModelEventType.READY:
          model.readyEvent.addEventListener(callback, context || this)
          break
        case ModelEventType.TEX_READY:
          model.texturesReadyEvent.addEventListener(callback, context || this)
          break
        default:
          break
      }
    })
    return null
  }

  off(type, callback, context) {
    this._model.then((model) => {
      switch (type) {
        case ModelEventType.READY:
          model.readyEvent.removeEventListener(callback, context || this)
          break
        case ModelEventType.TEX_READY:
          model.texturesReadyEvent.removeEventListener(
            callback,
            context || this
          )
          break
        default:
          break
      }
    })
    return true
  }
}
export default ModelEvent
