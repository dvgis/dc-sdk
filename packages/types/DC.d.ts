/**
 * @Author: Caven
 * @Date: 2022-07-16 11:51:07
 */

declare interface ImageryProvider {
  defaultAlpha: Number | undefined
  defaultBrightness: Number | undefined
  defaultContrast: Number | undefined
  defaultDayAlpha: Number | undefined
  defaultGamma: Number | undefined
  defaultHue: Number | undefined
  defaultNightAlpha: Number | undefined
  defaultSaturation: Number | undefined
  readonly readyPromise: Promise<Boolean>
}

declare interface TerrainProvider {
  readonly readyPromise: Promise<Boolean>
}

declare interface Weather {
  readonly fog: any
  readonly rain: any
  readonly snow: any
  readonly cloud: any
}

declare interface Widget {

  enable: Boolean
  DEFAULT_MENU: Array<any>
  config:JSON

  setWrapper(wrapper: String | HTMLElement): Widget

  setContent(content: String | HTMLElement): Widget

  showAt(position: any, content: String | HTMLElement): Widget

  addBaseLayer(baseLayer:ImageryProvider,splitDirection?:Number): Widget

  addTileset(tileset:any): Widget
}

declare module 'dc' {

  export enum MouseEventType {
    LEFT_DOWN = 0,
    LEFT_UP = 1,
    CLICK = 2,
    DB_CLIC = 3,
    RIGHT_DOWN = 5,
    RIGHT_UP = 6,
    RIGHT_CLICK = 7,
    MOUSE_MOVE = 5,
    WHEEL = 16,
    MOUSE_OVER = 'mouseover',
    MOUSE_OUT = 'mouseout'
  }

  
  export enum SceneEventType {
    CAMERA_MOVE_END = 'cameraMoveEnd',
    CAMERA_CHANGED = 'cameraChanged',
    PRE_UPDATE = 'preUpdate',
    POST_UPDATE = 'postUpdate',
    PRE_RENDER = 'preRender',
    POST_RENDER = 'postRender',
    MORPH_COMPLETE = 'morphComplete',
    CLOCK_TICK = 'clockTick',
    RENDER_ERROR = 'renderError'
  }

  export enum ImageryType {
    AMAP = 'amap',
    BAIDU = 'baidu',
    GOOGLE = 'google',
    TDT = 'tdt',
    TENCENT = 'tencet',
    ARCGIS = 'arcgis',
    SINGLE_TILE = 'single_tile',
    WMS = 'wms',
    WMTS = 'wmts',
    XYZ = 'xyz',
    COORD = 'coord',
    GRID = 'grid',
    MAPBOX = 'mapbox',
    MAPBOX_STYLE = 'mapbox_style',
    TMS = 'tms'
  }

  export enum TerrainType {
    NONE = 'none',
    XYZ = 'xyz',
    ARCGIS = 'arcgis',
    GOOGLE = 'google',
    VR = 'vr'
  }

  export enum TrackViewMode {
    FP = '1',
    TP = '2',
    TRACKED = 'tracked',
    FREE = 'free'
  }

  export class DomUtil {

    static get(id: String): HTMLElement

    static getStyle(el: HTMLElement, style: JSON): any

    static create(tagName: String, className?: String, container?: HTMLElement): HTMLElement

    static remove(el: HTMLElement): void

    static empty(el: HTMLElement): void

    static hasClass(el: HTMLElement, name: String): Boolean

    static addClass(el: HTMLElement, name: String): void

    static removeClass(el: HTMLElement, name: String): void

    static setClass(el: HTMLElement, name: String): void

    static getClass(el: HTMLElement): String

    static createSvg(width: Number, height: Number, path: String, container?: HTMLElement): SVGElement

    static parseDom(domStr: String, withWrapper?: Boolean, className?: String): HTMLDivElement | Array<ChildNode>
  }

  export class Util {

    static uuid(prefix?: String): String

    static merge(dest: JSON, sources: any): JSON
  }

  export class Position {
    constructor(lng: Number, lat: Number, alt?: Number, heading?: Number, pitch?: Number, roll?: Number)

    lng: Number
    lat: Number
    alt: Number
    heading: Number
    pitch: Number
    roll: Number

    serialize(): Object;

    distance(target: Position): Number

    copy(): Position

    toArray(): Array<Number>

    toObject(): Object

    static fromArray(arr: Array<Number | String>): Position

    static fromString(str: String): Position

    static fromObject(obj: Object): Position

    static deserialize(valStr: JSON): Position
  }

  export class Parse {

    static parsePosition(position: String | Array<Number> | JSON | Position): Position

    static parsePositions(positions: String | Array<String | Array<Number> | JSON | Position>): Array<Position>

    static parsePointCoordToArray(position: String | Array<Number> | JSON | Position): Array<Number>

    static parsePolylineCoordToArray(positions: String | Array<String | Array<Number> | JSON | Position>): Array<Array<Number>>

    static parsePolygonCoordToArray(positions: String | Array<String | Array<Number> | JSON | Position>): Array<Array<Array<Number>>>
  }

  export class Transform {

    static transformCartesianToWGS84(cartesian: any): Position

    static transformWGS84ToCartesian(position: Position): any

    static transformWGS84ToCartographic(position: Position): any

    static transformCartesianArrayToWGS84Array(cartesianArr: Array<any>): Array<Position>

    static transformWGS84ArrayToCartesianArray(WGS84Arr: Array<Position>): Array<any>

    static transformWGS84ToMercator(position: Position): Position

    static transformMercatorToWGS84(position: Position): Position

    static transformWindowToWGS84(position: Position, viewer: Viewer): Position

    static transformWGS84ToWindow(position: Position, viewer: Viewer): any
  }

  export class Math {
    static toDegrees(radians: Number): Number

    static toRadians(degrees: Number): Number

    static log2(num: Number): Number

    static area(positions: Array<Position>): Number

    static bounds(positions: Array<Position>, expand?: Number): Number

    static center(positions: Array<Position>): Position

    static curve(positions: Array<Position>, options: JSON): Array<Position>

    static distance(positions: Array<Position>): Number

    static heading(start: Position, end: Position): Number

    static midPosition(start: Position, end: Position): Position

    static parabola(start: Position, end: Position, height?: Number, count?: Number): Array<Array<Number>>
  }

  export class JulianDate {
    constructor(julianDay?: Number, secondsOfDay?: Number, timeStandard?: any)

    static addDays(julianDate: JulianDate, days: Number, result?: JulianDate): JulianDate

    static addHours(julianDate: JulianDate, hours: Number, result?: JulianDate): JulianDate

    static addMinutes(julianDate: JulianDate, hours: Number, result?: JulianDate): JulianDate

    static addSeconds(julianDate: JulianDate, seconds: Number, result?: JulianDate): JulianDate

    static clone(julianDate: JulianDate, result?: JulianDate): JulianDate

    static daysDifference(left: JulianDate, right: JulianDate): Number

    static greaterThan(left: JulianDate, right: JulianDate): Boolean

    static greaterThanOrEquals(left: JulianDate, right: JulianDate): Boolean

    static lessThan(left: JulianDate, right: JulianDate): Boolean

    static lessThanOrEquals(left: JulianDate, right: JulianDate): Boolean

    static now(result?: JulianDate): Boolean

    static secondsDifference(left: JulianDate, right: JulianDate): Number
  }

  export class ImageryLayerFactory {

    static createAmapImageryLayer(options: JSON): ImageryProvider

    static createBaiduImageryLayer(options: JSON): ImageryProvider

    static createGoogleImageryLayer(options: JSON): ImageryProvider

    static createTdtImageryLayer(options: JSON): ImageryProvider

    static createTencentImageryLayer(options: JSON): ImageryProvider

    static createArcGisImageryLayer(options: JSON): ImageryProvider

    static createSingleTileImageryLayer(options: JSON): ImageryProvider

    static createWMSImageryLayer(options: JSON): ImageryProvider

    static createWMTSImageryLayer(options: JSON): ImageryProvider

    static createXYZImageryLayer(options: JSON): ImageryProvider

    static createCoordImageryLayer(options: JSON): ImageryProvider

    static createGridImageryLayer(options: JSON): ImageryProvider

    static createMapboxImageryLayer(options: JSON): ImageryProvider

    static createMapboxStyleImageryLayer(options: JSON): ImageryProvider

    static createTMSImageryLayer(options: JSON): ImageryProvider

    static createImageryLayer(type: ImageryType, options: JSON): ImageryProvider
  }

  export class TerrainFactory {

    static createEllipsoidTerrain(options: JSON): TerrainProvider

    static createUrlTerrain(options: JSON): TerrainProvider

    static createGoogleTerrain(options: JSON): TerrainProvider

    static createArcgisTerrain(options: JSON): TerrainProvider

    static createVRTerrain(options: JSON): TerrainProvider

    static createTerrain(type: TerrainType, options: JSON): TerrainProvider
  }

  export class Viewer {
    constructor(id: String | HTMLElement, options?: JSON)

    readonly delegate: any
    readonly dcContainer: HTMLElement
    readonly scene: any
    readonly camera: any
    readonly canvas: HTMLCanvasElement
    readonly dataSources: any
    readonly imageryLayers: any
    readonly terrainProvider: any
    readonly entities: any
    readonly postProcessStages: any
    readonly clock: any
    readonly cameraPosition: Position
    readonly resolution: Number
    readonly viewBounds: any
    readonly level: Number
    readonly weather:Weather
    readonly effect:Effect
    readonly compass:Widget
    readonly contextMenu:Widget
    readonly distanceLegend:Widget
    readonly hawkeyeMap:Widget
    readonly loadingMask:Widget
    readonly locationBar:Widget
    readonly mapSplit:Widget
    readonly mapSwitch:Widget
    readonly popup:Widget
    readonly sceneSplit:Widget
    readonly tilesetSplit:Widget
    readonly tooltip:Widget
    readonly zoomController:Widget

    setOptions(options: JSON): Viewer

    setPitchRange(min?: Number, Max?: Number): Viewer

    changeSceneMode(sceneMode: Number, duration?: Number): Viewer

    changeMouseMode(mouseMode: Number): Viewer

    addBaseLayer(baseLayers: any | Array<any>, options?: JSON): Viewer

    changeBaseLayer(index: Number): Viewer

    getImageryLayerInfo(windowPosition: any): Promise<any>

    addTerrain(terrain: any, options?: JSON): Viewer

    changeTerrain(index: Number): Viewer

    removeTerrain(): Viewer

    addLayerGroup(layerGroup: LayerGroup): Viewer

    removeLayerGroup(layerGroup: LayerGroup): Viewer

    getLayerGroup(id: String): LayerGroup

    addLayer(layer: Layer): Layer

    removeLayer(layer: Layer): Layer

    getLayer(id: String): Layer

    getLayers(): Array<Layer>

    eachLayer(method: Function, context: any): Viewer

    flyTo(targer: Overlay | Layer, duration?: Number): Viewer

    zoomTo(targer: Overlay | Layer): Viewer

    flyToPosition(position: String | Array<Number> | JSON | Position, completeCallback?: Function, duration?: Number): Viewer

    zoomToPosition(position: String | Array<Number> | JSON | Position, completeCallback?: Function): Viewer

    flyToBounds(bounds: String | Array<Number>, hpr: JSON, completeCallback?: Function, duration?: Number): Viewer

    zoomToBounds(bounds: String | Array<Number>, hpr: JSON, completeCallback?: Function): Viewer

    on(type: String | Number, callback: Function, context: any): Viewer

    off(type: String | Number, callback: Function, context: any): Viewer

    destroy(): Viewer

    exportScene(name: String): Viewer

    use(plugin: any): Viewer
  }

  export class LayerGroup {
    constructor(id: String)

    readonly id: String
    readonly type: String
    readonly state: String
    show: Boolean

    addLayer(layer: Layer): LayerGroup

    removeLayer(layer: Layer): LayerGroup

    getLayer(id: String): Layer

    getLayers(): Array<Layer>

    addTo(viewer: Viewer): LayerGroup

    remove(): LayerGroup
  }

  export class Layer {
    constructor(id: String)

    readonly layerId: String
    readonly id: String
    readonly delegate: any
    readonly state: String
    show: Boolean
    attr: Object

    addOverlay(overlay: Overlay): Layer

    addOverlays(overlays: Array<Overlay>): Layer

    removeOverlay(overlay: Overlay): Layer

    getOverlay(overlayId: String): Overlay

    getOverlayById(id: String): Overlay

    getOverlaysByAttr(attrName: String, attrVal: any): Overlay

    eachOverlay(method: Function, context: any): Layer

    getOverlays(): Array<Overlay>

    clear(): Layer

    remove(): Layer

    addTo(viewer: Viewer): Layer

    on(type: String | Number, callback: Function, context: any): Layer

    off(type: String | Number, callback: Function, context: any): Layer

    fire(type: String | Number, params: JSON): Layer
  }

  export class ClusterLayer extends Layer {
    constructor(id: String, options?: JSON)
  }

  export class CzmlLayer extends Layer {
    constructor(id: String, url: String, options?: JSON)
  }

  export class DynamicLayer extends Layer {
    constructor(id: String)
  }

  export class FeatureGridLayer extends Layer {
    constructor(id: String, url: String, options?: JSON)
  }

  export class GeoJsonLayer extends Layer {
    constructor(id: String, url: String, options?: JSON)
  }

  export class GpxLayer extends Layer {
    constructor(id: String, url: String, options?: JSON)
  }

  export class GroundPrimitiveLayer extends Layer {
    constructor(id: String)
  }

  export class HtmlLayer extends Layer {
    constructor(id: String)
  }

  export class KmlLayer extends Layer {
    constructor(id: String, url: String, options?: JSON)
  }

  export class LabelLayer extends Layer {
    constructor(id: String)
  }

  export class PrimitiveLayer extends Layer {
    constructor(id: String)

    readonly points: any
    readonly labels: any
    readonly billboards: any
    readonly polylines: any
    readonly clouds: any
  }

  export class TilesetLayer extends Layer {
    constructor(id: String, url: String, options?: JSON)
  }

  export class TopoJsonLayer extends Layer {
    constructor(id: String)
  }

  export class VectorLayer extends Layer {
    constructor(id: String)
  }

  export class HeatLayer extends Layer {
    constructor(id: String, options?: JSON)

    setPositions(positions: Array<Position>): HeatLayer

    addPosition(position: Position): HeatLayer
  }

  export class S3MLayer extends Layer {
    constructor(id: String, url: String, options: JSON)
  }

  export class ChartLayer extends Layer {
    constructor(id: String)

    readonly chart: any

    setOption(option: any): ChartLayer
  }

  export class WindLayer extends Layer {
    constructor(id: String, options: JSON)

    setData(data: any, options: JSON): WindLayer

    setOptions(options: JSON): WindLayer
  }

  export class MapvLayer extends Layer {
    constructor(id: String, options: JSON)

    setDataSet(dataSet: any): MapvLayer
  }

  export class Overlay {
    constructor();

    readonly overlayId: String
    readonly type: String
    readonly delegate: String
    readonly state: String
    id: String;
    allowDrillPicking: Boolean;
    contextMenu: Array<any>;

    setLabel(text: String, textStyle: JSON): Overlay

    setStyle(style: Object): Overlay

    remove(): Overlay

    addTo(layer: Layer): Overlay

    on(type: String | Number, callback: Function, context: any): Overlay

    off(type: String | Number, callback: Function, context: any): Overlay

    fire(type: String | Number, params: JSON): Overlay
  }

  export class CustomBillboard extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, icon: String)

    position: String | Array<Number> | JSON | Position
    icon: String
    size: Array<Number>

    setVLine(style: JSON): CustomBillboard

    setBottomCircle(radius: Number, style: JSON, rotateAmount?: Number): CustomBillboard
  }

  export class CustomLabel extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, text: String)

    position: String | Array<Number> | JSON | Position
    text: String

    setVLine(style: JSON): CustomLabel

    setBottomCircle(radius: Number, style: JSON, rotateAmount?: Number): CustomLabel
  }

  export class DynamicBillboard extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, icon: String)

    position: String | Array<Number> | JSON | Position
    icon: String
    size: Array<Number>
    maxCacheSize: Number

    addPosition(position: Position, interval: Number): DynamicBillboard
  }

  export class DynamicModel extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, modelUrl: String)

    position: String | Array<Number> | JSON | Position
    modelUrl: String
    maxCacheSize: Number

    addPosition(position: Position, interval: Number): DynamicModel
  }

  export class DivIcon extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, content: String | HTMLElement)

    position: String | Array<Number> | JSON | Position
    content: String | HTMLElement

    static fromEntity(entity: any, content: String | HTMLElement): DivIcon
  }

  export class Model extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, modelUrl: String)

    position: String | Array<Number> | JSON | Position
    modelUrl: String
    rotateAmount: Number

    static fromEntity(entity: any, modelUrl: String): DivIcon
  }

  export class Tileset extends Overlay {
    constructor(url: String, options?: JSON)

    readonly readyPromise: Promise<any>

    setPosition(position: Position): Tileset

    setHeadingPitchRoll(heading: Number, pitch: Number, roll: Number): Tileset

    clampToGround(): Tileset

    setHeight(height: Number, isAbsolute?: Boolean): Tileset

    setScale(sacle: Number): Tileset

    setProperties(properties: JSON): Tileset

    setCustomShader(fragmentShader: String): Tileset

    replaceFS(fragmentShader: String): Tileset

    setSplitDirection(splitDirection: Number): Tileset
  }

  export class AttackArrow extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class DoubleArrow extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class FineArrow extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class GatheringPlace extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class TailedAttackArrow extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class BillboardPrimitive extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, icon: String)

    position: String | Array<Number> | JSON | Position
    icon: String
    size: Array<Number>
  }

  export class BounceBillboardPrimitive extends BillboardPrimitive {
  }

  export class BounceLabelPrimitive extends LabelPrimitive {

  }

  export class CloudPrimitive extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position)

    position: String | Array<Number> | JSON | Position
  }

  export class DiffuseWallPrimitive extends Overlay {
    constructor(center: String | Array<Number> | JSON | Position, radius: Number, height: Number)

    position: String | Array<Number> | JSON | Position
    radius: Number
    height: Number
  }

  export class ElecEllipsoidPrimitive extends Overlay {
    constructor(center: String | Array<Number> | JSON | Position, radius: JSON)

    position: String | Array<Number> | JSON | Position
    radius: JSON
  }

  export class FlowLinePrimitive extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>, width?: Number)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class LabelPrimitive extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, text: String)

    position: String | Array<Number> | JSON | Position
    text: String
  }

  export class LightCylinderPrimitive extends Overlay {
    constructor(center: String | Array<Number> | JSON | Position, length: Number, topRadius: Number, bottomRadius: Number)

    center: String | Array<Number> | JSON | Position
    length: Number
    topRadius: Number
    bottomRadius: Number
  }

  export class ModelCollectionPrimitive extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>, modelUrl: String)

    readonly readyPromise: Promise<any>
    attrs: Array<any>
    positions: String | Array<String | Array<Number> | JSON | Position>
    modelUrl: String

    getModelInstance(instanceId: String): any

    getAttrByInstanceId(instanceId: String): any
  }

  export class ModelPrimitive extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, modelUrl: String)

    readonly readyPromise: Promise<any>
    position: String | Array<Number> | JSON | Position
    modelUrl: String

    getMaterial(name: String): any

    getMesh(name: String): any

    getNode(name: String): any

    getNodes(): Array<any>
  }

  export class PointPrimitive extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position)

    position: String | Array<Number> | JSON | Position
  }

  export class PolylinePrimitive extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class ScanCirclePrimitive extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, radius: Number)

    position: String | Array<Number> | JSON | Position
    radius: Number
  }

  export class TrailLinePrimitive extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>, width?: Number)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class VideoPrimitive extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>, video: HTMLVideoElement)

    positions: String | Array<String | Array<Number> | JSON | Position>
    video: HTMLVideoElement
  }

  export class WaterPrimitive extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>, holes?: Array<String | Array<Number> | JSON | Position>)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class Billboard extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, icon: String)

    position: String | Array<Number> | JSON | Position
    icon: String
    size: Array<Number>
  }


  export class Box extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, length: Number, width: Number, height: Number)

    position: String | Array<Number> | JSON | Position
    length: Number
    width: Number
    height: Number
  }

  export class Circle extends Overlay {
    constructor(center: String | Array<Number> | JSON | Position, radius: Number)

    position: String | Array<Number> | JSON | Position
    radius: Number
  }

  export class Corridor extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class Cylinder extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, length: Number, topRadius: Number, bottomRadius: Number)

    position: String | Array<Number> | JSON | Position
    length: Number
    topRadius: Number
    bottomRadius: Number
  }

  export class Ellipse extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, semiMajorAxis: Number, semiMinorAxis: Number)

    position: String | Array<Number> | JSON | Position
    semiMajorAxis: Number
    semiMinorAxis: Number
  }

  export class Ellipsoid extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, radius: JSON)

    position: String | Array<Number> | JSON | Position
    radius: JSON
  }

  export class Label extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, text: String)

    position: String | Array<Number> | JSON | Position
    text: String
  }

  export class Plane extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position, width: Number, height: Number, plane: Object)

    position: String | Array<Number> | JSON | Position
    width: Number
    height: Number
    distance: Number
  }

  export class Point extends Overlay {
    constructor(position: String | Array<Number> | JSON | Position)

    position: String | Array<Number> | JSON | Position
  }

  export class Polygon extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class Polyline extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class PolylineVolume extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>, shape?: Array<any>)

    positions: String | Array<String | Array<Number> | JSON | Position>
    shape: Array<any>
  }

  export class Rectangle extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class Wall extends Overlay {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>)

    positions: String | Array<String | Array<Number> | JSON | Position>
  }

  export class Animation {
    constructor(viewer: Viewer)

    readonly type: String

    start(): Animation

    stop: Animation
  }

  export class AroundPoint extends Animation {
    constructor(viewer: Viewer, position: Position, options: JSON)
  }

  export class AroundView extends Animation {
    constructor(viewer: Viewer, options: JSON)
  }

  export class CircleScan extends Animation {
    constructor(viewer: Viewer, position: Position, radius: Number, options: JSON)
  }

  export class Flying extends Animation {
    constructor(viewer: Viewer, options: JSON)
  }

  export class GlobeRotate extends Animation {
    constructor(viewer: Viewer, options: JSON)
  }

  export class RadarScan extends Animation {
    constructor(viewer: Viewer, position: Position, radius: Number, options: JSON)
  }

  export class Effect {
    readonly blackAndWhite: any
    readonly bloom: any
    readonly brightness: any
    readonly depthOfField: any
    readonly lensFlare: any
    readonly night: any
    readonly silhouette: any
  }

  export class GroundSkyBox {
    constructor(options: JSON)
  }

  export class TrackController {
    constructor(viewer: Viewer)

    readonly delegate: any
    readonly state: String

    addTrack(track: Track): TrackController

    getTrack(id: String): Track

    removeTrack(track: Track): TrackController

    getTracks(): Array<Track>

    play(): TrackController

    pause(): TrackController

    restore(): TrackController

    viewTrack(track: Track, viewOption: JSON): TrackController

    releaseTrack(track: Track): TrackController

    clear(): TrackController

  }

  export class Track {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>, duration: Number, callback: Function, options?: JSON)

    positions: String | Array<String | Array<Number> | JSON | Position>
    duration: Number

    addPosition(position: Position, duration: Number): Track

    setModel(modelPath: String, style: JSON): Track

    setBillboard(icon: String, style: JSON): Track

    setLabel(text: String, style: JSON): Track

    setPath(visible: Boolean, style: JSON): Track
  }

  export class CircleBlurMaterialProperty {
    constructor(options: JSON)
  }

  export class CircleDiffuseMaterialProperty {
    constructor(options: JSON)
  }

  export class CircleFadeMaterialProperty {
    constructor(options: JSON)
  }

  export class CirclePulseMaterialProperty {
    constructor(options: JSON)
  }

  export class CircleScanMaterialProperty {
    constructor(options: JSON)
  }

  export class CircleSpiralMaterialProperty {
    constructor(options: JSON)
  }

  export class CircleVaryMaterialProperty {
    constructor(options: JSON)
  }

  export class CircleWaveMaterialProperty {
    constructor(options: JSON)
  }

  export class EllipsoidElectricMaterialProperty {
    constructor(options: JSON)
  }

  export class EllipsoidTrailMaterialProperty {
    constructor(options: JSON)
  }

  export class PolylineEmissionMaterialProperty {
    constructor(options: JSON)
  }

  export class PolylineFlickerMaterialProperty {
    constructor(options: JSON)
  }

  export class PolylineFlowMaterialProperty {
    constructor(options: JSON)
  }

  export class PolylineImageTrailMaterialProperty {
    constructor(options: JSON)
  }

  export class PolylineLightingMaterialProperty {
    constructor(options: JSON)
  }

  export class PolylineLightingTrailMaterialProperty {
    constructor(options: JSON)
  }

  export class PolylineTrailMaterialProperty {
    constructor(options: JSON)
  }

  export class RadarLineMaterialProperty {
    constructor(options: JSON)
  }

  export class RadarSweepMaterialProperty {
    constructor(options: JSON)
  }

  export class RadarWaveMaterialProperty {
    constructor(options: JSON)
  }

  export class WallImageTrailMaterialProperty {
    constructor(options: JSON)
  }

  export class WallLineTrailMaterialProperty {
    constructor(options: JSON)
  }

  export class WaterMaterialProperty {
    constructor(options: JSON)
  }

  export class Plot {
    constructor(viewer: Viewer, options: JSON)

    readonly viewer: Viewer
    readonly layer: any
    readonly state: String

    draw(type: String, callback?: Function, style?: JSON, clampToModel?: Boolean): Plot

    edit(overlay: Overlay, callback?: Function, clampToModel?: Boolean): Plot

    stop(): Plot

    destroy(): Plot
  }


  export class RoamingController {
    constructor(viewer: Viewer)

    addPath(path: RoamingPath): RoamingController

    addPaths(paths: Array<RoamingPath>): RoamingController

    removePath(path: RoamingPath): RoamingController

    getPath(id: String): RoamingPath

    getPaths(): Array<RoamingPath>

    activate(path: RoamingPath, viewOption: JSON): RoamingController

    deactivate(): RoamingController

    clear(): RoamingController

  }

  export class RoamingPath {
    constructor(positions: String | Array<String | Array<Number> | JSON | Position>, duration: Number, pathMode?: String)

    positions: String | Array<String | Array<Number> | JSON | Position>
    duration: Number
    pathMode?: String
  }


  export function mixin(DC: any): void

  export function use(plugin: any): void

  export function init(callback: Function): void

  export function ready(callback: Function): void
}
