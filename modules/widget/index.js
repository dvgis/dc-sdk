/**
 * @Author:Caven
 * @Date:2020-03-05 21:53:35
 */

import Attribution from './type/Attribution'
import ContextMenu from './type/ContextMenu'
import LocationBar from './type/LocationBar'
import MapSplit from './type/MapSplit'
import MapSwitch from './type/MapSwitch'
import Popup from './type/Popup'
import Tooltip from './type/Tooltip'
import HawkeyeMap from './type/HawkeyeMap'
import Compass from './type/Compass'
import DistanceLegend from './type/DistanceLegend'
import ZoomController from './type/ZoomController'
import LoadingMask from './type/LoadingMask'

export default function createWidgets() {
  return {
    attribution: new Attribution(),
    popup: new Popup(),
    contextMenu: new ContextMenu(),
    tooltip: new Tooltip(),
    mapSwitch: new MapSwitch(),
    mapSplit: new MapSplit(),
    locationBar: new LocationBar(),
    hawkeyeMap: new HawkeyeMap(),
    compass: new Compass(),
    distanceLegend: new DistanceLegend(),
    zoomController: new ZoomController(),
    loadingMask: new LoadingMask()
  }
}
