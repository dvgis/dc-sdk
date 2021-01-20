/**
 * @Author:Caven
 * @Date:2020-03-05 21:53:35
 */

import Attribution from './Attribution'
import ContextMenu from './ContextMenu'
import LocationBar from './LocationBar'
import MapSplit from './MapSplit'
import MapSwitch from './MapSwitch'
import Popup from './Popup'
import Tooltip from './Tooltip'
import HawkeyeMap from './HawkeyeMap'
import Compass from './Compass'
import DistanceLegend from './DistanceLegend'
import ZoomController from './ZoomController'

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
    zoomController: new ZoomController()
  }
}
