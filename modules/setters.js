'use strict'

import {state} from './store'
import {
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
} from './eventBus'

// INIT FUNCTIONS

function initState(data) {
  _setAllCitiesDataSet(data)
  _setCapitalCitiesDataSet(data)
  _calculateMaxAndMinPop(data)
  notifyStateInitialization()
  _setInitialActiveDataLayer()
}

function _setInitialActiveDataLayer() {
  state.activeDataLayer = state.mapLayers[0]
}

// PRIVATE SETTER FUNCTIONS

function _setAllCitiesDataSet(data) {
  state.allCities = data
}

function _setCapitalCitiesDataSet(data) {
  let capitals = data.filter(place => {
    return place.properties.adm0cap === 1
  })
  state.capitalCities = capitals
}

function _calculateMaxAndMinPop(data) {
  let sorted = data.filter((city) => {
    return city.properties.pop_max > 0
  })
  .sort((a, b) => {
      return parseFloat(a.properties.pop_max) - parseFloat(b.properties.pop_max)
  })
  _setMinPop(sorted[1].properties.pop_max)
  _setMaxPop(sorted[sorted.length - 1].properties.pop_max)
}

function _setMaxPop(amount) {
  state.maxPop = amount
}

function _setMinPop(amount) {
  state.minPop = amount
}

// PUBLIC SETTER FUNCTIONS

function setActiveDataLayer(newLayer) {
  state.capitalCitiesActive != state.capitalCitiesActive
  notifyActiveDataLayerChange(state.activeDataLayer, newLayer)
  state.activeDataLayer = newLayer
}

function setActiveVisualization(e) {
  state.activeVisualization = e.target.innerText
  notifyActiveVisualizationChange()
}

function setSelectedPlace(place) {
  notifySelectedPlaceChange()
  state.lastClickedPlaceColor = place.options.color
  state.lastClickedPlace = place
  state.selectedPlace = place
  notifyClickedPlace(place)
}

function setOpacity(value) {
  state.baseOpacity = value
  notifyBaseOpacityChange()
}

function setBubleSize(value) {
  state.baseMultiplier = value
  notifyBubleSizeChange()
}

function setHue(value) {
  state.baseHue = value
  notifyBaseHueChange()
}

function setMinPopulation(value) {
  state.minPop = value
  notifyPopulationFilterChange()
}

function setMaxPopulation(value) {
  state.maxPop = value
  notifyPopulationFilterChange()
}

export {
  initState,
  setActiveDataLayer,
  setSelectedPlace,
  setActiveVisualization,
  setOpacity,
  setBubleSize,
  setHue,
  setMinPopulation,
  setMaxPopulation
 }
