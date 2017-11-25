'use strict'
import {state} from './store'
import {initMap,
        activeDataLayerChange,
        activeBubleVizz,
        activeChoroplethVizz,
        updateBubleOpacity,
        updateBubleSize,
        updateMapHue
      } from './mapHandler'
import {updateCityData,
        updateHeaderStyles,
        previouslySelectedPlaceStyles,
        toggleClassFromLegendSelector,
        toggleActiveClassFromLegend,
        updateDomHue
      } from './DOMHelper'

function notifyInitActiveDataLayer() {
  initMap(state.activeDataLayer)
}

function notifyActiveDataLayerChange(oldLayer, newLayer) {
  activeDataLayerChange(oldLayer, newLayer)
  toggleClassFromLegendSelector()
}

function notifyClickedPlace(place) {
  updateCityData(place.options.properties)
  updateHeaderStyles()
}

function notifySelectedPlaceChange() {
  previouslySelectedPlaceStyles(state.lastClickedPlace)
}

function notifyActiveVisualizationChange() {
  if (state.activeVisualization === 'CHOROPLETH') {
    activeChoroplethVizz()
    toggleClassFromLegendSelector()
    toggleActiveClassFromLegend()
  } else {
    activeBubleVizz()
    toggleClassFromLegendSelector()
    toggleActiveClassFromLegend()
  }
}

function notifyBaseOpacityChange() {
  updateBubleOpacity(state.activeDataLayer, state.baseOpacity)
}

function notifyBubleSizeChange() {
  updateBubleSize(state.activeDataLayer, state.baseMultiplier)
}

function notifyBaseHueChange() {
  updateDomHue(state.baseHue)
  updateMapHue(state.activeDataLayer, state.baseHue)
}

export {notifyInitActiveDataLayer,
        notifyActiveDataLayerChange,
        notifyClickedPlace,
        notifySelectedPlaceChange,
        notifyActiveVisualizationChange,
        notifyBaseOpacityChange,
        notifyBubleSizeChange,
        notifyBaseHueChange
      }
