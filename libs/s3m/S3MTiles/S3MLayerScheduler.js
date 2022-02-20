const  { Cesium }  = DC.Namespace

import ContentState from './Enum/ContentState.js';
import RangeMode from './Enum/RangeMode.js';
function S3MLayerScheduler (){
    this._stack = [];
}

function sortComparator(a, b) {
    if (b.distanceToCamera === 0 && a.distanceToCamera === 0) {
        return b.centerZDepth - a.centerZDepth;
    }

    return b.distanceToCamera - a.distanceToCamera;
}


function updateChildren(layer, tile, stack, frameState) {
    let i;
    let children = tile.children;
    let length = children.length;

    for (i = 0; i < length; ++i) {
        updateTile(frameState, layer, children[i]);
    }

    children.sort(sortComparator);

    let refines = true;
    let anyChildrenVisible = false;
    let minIndex = -1;
    let minimumPriority = Number.MAX_VALUE;
    let checkChildRefins = true;

    for (i = 0; i < length; ++i) {
        let child = children[i];
        if (child.foveatedFactor < minimumPriority) {
            minIndex = i;
            minimumPriority = child.foveatedFactor;
        }

        if (child.visible) {
            stack.push(child);
            anyChildrenVisible = true;
        } else {
            loadTile(layer, child, frameState);
            touchTile(layer, child, frameState);
            processTile(layer, child, frameState);
        }

        let childRefines = child.renderable;
        if(checkChildRefins){
            refines = refines && childRefines;
        }
    }

    if (!anyChildrenVisible) {
        refines = false;
    }

    if (minIndex !== -1) {
        let minPriorityChild = children[minIndex];
        minPriorityChild.wasMinPriorityChild = true;
        let priorityHolder = (tile.wasMinPriorityChild || tile.isRootTile) &&
        minimumPriority <= tile.priorityHolder.foveatedFactor ? tile.priorityHolder : tile;
        priorityHolder.foveatedFactor = Math.min(minPriorityChild.foveatedFactor, priorityHolder.foveatedFactor);
        priorityHolder.distanceToCamera = Math.min(minPriorityChild.distanceToCamera, priorityHolder.distanceToCamera);

        for (i = 0; i < length; ++i) {
            let child = children[i];
            child.priorityHolder = priorityHolder;
        }
    }

    return refines;
}

function selectTile(layer, tile, frameState) {
    if(tile.selectedFrame === frameState.frameNumber || !tile.renderable){
        return ;
    }

    layer._selectedTiles.push(tile);
    tile.selectedFrame = frameState.frameNumber;
}

function loadTile(layer, tile, frameState) {
    if(tile.requestedFrame === frameState.frameNumber || tile.contentState !== ContentState.UNLOADED) {
        return ;
    }

    layer._requestTiles.push(tile);
    tile.requestedFrame = frameState.frameNumber;
}

function processTile(layer, tile, frameState) {
    if(tile.processFrame === frameState.frameNumber || tile.contentState !== ContentState.READY || tile.renderable) {
        return ;
    }

    tile.processFrame = frameState.frameNumber;
    layer._processTiles.push(tile);
}

function touchTile(layer, tile, frameState) {
    if (tile.touchedFrame === frameState.frameNumber) {
        return;
    }

    layer._cache.touch(tile);
    tile.touchedFrame = frameState.frameNumber;
}

function updateVisibility(layer, tile, frameState) {
    if (tile.updatedVisibilityFrame === frameState.frameNumber) {
        return;
    }

    tile.updatedVisibilityFrame = frameState.frameNumber;
    tile.updateVisibility(frameState, layer);
}

function updateTileVisibility(frameState, layer, tile) {
    updateVisibility(layer, tile, frameState);
}

function updateMinimumMaximumPriority(layer, tile) {
    layer._maximumPriority.distance = Math.max(tile.distanceToCamera, layer._maximumPriority.distance);
    layer._minimumPriority.distance = Math.min(tile.distanceToCamera, layer._minimumPriority.distance);
    layer._maximumPriority.depth = Math.max(tile.depth, layer._maximumPriority.depth);
    layer._minimumPriority.depth = Math.min(tile.depth, layer._minimumPriority.depth);
    layer._maximumPriority.foveatedFactor = Math.max(tile.foveatedFactor, layer._maximumPriority.foveatedFactor);
    layer._minimumPriority.foveatedFactor = Math.min(tile.foveatedFactor, layer._minimumPriority.foveatedFactor);
    layer._maximumPriority.pixel = Math.max(tile.pixel, layer._maximumPriority.pixel);
    layer._minimumPriority.pixel = Math.min(tile.pixel, layer._minimumPriority.pixel);
}

function updateTile(frameState, layer, tile) {
    updateTileVisibility(frameState, layer, tile);
    tile.wasMinPriorityChild = false;
    tile.priorityHolder = tile;
    updateMinimumMaximumPriority(layer, tile);
    tile.shouldSelect = false;
    tile.selected = false;
}

function canTraverse(layer, tile) {
    if (tile.children.length === 0) {
        return false;
    }

    if(tile.lodRangeMode === RangeMode.Pixel){
        return tile.pixel / layer.lodRangeScale > tile.lodRangeData;
    }


    return tile.distanceToCamera * layer.lodRangeScale < tile.lodRangeData;
}

function traversal(layer, stack, frameState) {
    while(stack.length) {
        let tile = stack.pop();
        let parent = tile.parent;
        let parentRefines = !Cesium.defined(parent) || parent.refines;
        let refines = false;

        if (canTraverse(layer, tile)) {
            refines = updateChildren(layer, tile, stack, frameState) && parentRefines;
        }

        let stoppedRefining = !refines && parentRefines;

        loadTile(layer, tile, frameState);
        processTile(layer, tile, frameState);
        if (stoppedRefining) {
            selectTile(layer, tile, frameState);
        }

        touchTile(layer, tile, frameState);
        tile.refines = refines;
    }
}

function selectRootTiles(layer, stack, frameState) {
    stack.length = 0;
    for(let i = 0,j = layer._rootTiles.length;i < j;i++){
        let rootTile = layer._rootTiles[i];
        updateTile(frameState, layer, rootTile);
        if(!rootTile.visible) {
            continue ;
        }

        stack.push(rootTile);
    }
}

function updatePriority(layer, frameState) {
    let requestTiles = layer._requestTiles;
    let length = requestTiles.length;
    for (let i = 0; i < length; ++i) {
        requestTiles[i].updatePriority(layer, frameState);
    }
}

S3MLayerScheduler.prototype.schedule = function(layer, frameState) {
    let stack = this._stack;
    selectRootTiles(layer, stack, frameState);
    traversal(layer, stack, frameState);
    updatePriority(layer, frameState);
};

export default S3MLayerScheduler;
