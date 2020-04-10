/*
 * @Author: Caven
 * @Date: 2020-04-10 17:02:57
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-10 17:07:28
 */

let baseState = {
  INITIALIZED: 'initialized',
  ADDED: 'added',
  REMOVED: 'removed'
}

DC.LayerState = {
  ...baseState,
  CLEARED: 'cleared'
}

DC.OverlayState = {
  ...baseState
}

DC.EffectState = {
  ...baseState
}

DC.WidgetState = {
  INITIALIZED: 'initialized',
  INSTALLED: 'installed',
  ENABLED: 'enabled',
  DISABLED: 'disabled'
}

DC.RoamingState = {
  ...baseState
}
