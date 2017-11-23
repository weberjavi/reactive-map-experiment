'use strict'
import {state} from './store'
import {initMap, activeDataLayerChange} from './mapHandler'
import {updateCityData, updateHeaderStyles} from './DOMHelper'

function notifyInitActiveDataLayer() {
  initMap(state.activeDataLayer)
}

function notifyActiveDataLayerChange(oldLayer, newLayer) {
  activeDataLayerChange(oldLayer, newLayer)
}

function notifyClickedPlace(place) {
  updateCityData(place.options.properties)
  updateHeaderStyles()
}

export {notifyInitActiveDataLayer,
        notifyActiveDataLayerChange,
        notifyClickedPlace}
