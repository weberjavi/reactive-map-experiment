'use strict'
import {state} from './store'

import {initMap,
  initMapLayers,
  toggleCapitalsView,
  activeBubleVizz,
  activeChoroplethVizz,
  updateBubleOpacity,
  updateBubleSize,
  updateMapHue,
  triggerMapPopulationFilter
} from './mapHandler'

import {
  updateCityData,
  updateHeaderStyles,
  previouslySelectedPlaceStyles,
  toggleClassFromLegendSelector,
  toggleActiveClassFromLegend,
  updateDomHue,
  updateCapitalsButtonClass,
  initPopSliderMinMaxValues,
  updatePopSliderValues
} from './DOMHelper'


function notifyStateInitialization() {
  initMapLayers(state.allCities, state.capitalCities)
  initPopSliderMinMaxValues(state.minPop, state.maxPop)
}

function notifyInitActiveDataLayer() {
  initMap(state.activeDataLayer)
}

function notifyActiveDataLayerChange(oldLayer, newLayer) {
  updateCapitalsButtonClass(state.capitalCitiesActive)
  toggleCapitalsView(oldLayer, newLayer)
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

function notifyPopulationFilterChange() {
  triggerMapPopulationFilter(state.activeDataLayer, state.minPop, state.maxPop)
  updatePopSliderValues(state.minPop, state.maxPop)
}

export {
  notifyStateInitialization,
  notifyInitActiveDataLayer,
  notifyActiveDataLayerChange,
  notifyClickedPlace,
  notifySelectedPlaceChange,
  notifyActiveVisualizationChange,
  notifyBaseOpacityChange,
  notifyBubleSizeChange,
  notifyBaseHueChange,
  notifyPopulationFilterChange
}
