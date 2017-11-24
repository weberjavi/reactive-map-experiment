'use strict'

import {state} from './store'
import {notifyInitActiveDataLayer,
        notifyActiveDataLayerChange,
        notifyClickedPlace,
        notifyActiveVisualizationChange} from './eventBus'
import {previouslySelectedPlaceStyles} from './DOMHelper'

// INIT FUNCTIONS

function initState(data) {
  setAllCitiesDataSet(data)
  setCapitalCitiesDataSet(data)
  calculateMaxAndMinPop(data)
}

function initActiveDataLayer(data) {
  state.activeDataLayer = data
}

// SETTER FUNCTIONS

function setAllCitiesDataSet(data) {
  state.allCities = data
}

function setCapitalCitiesDataSet(data) {
  let capitals = data.filter(place => {
    return place.properties.adm0cap === 1
  })
  state.capitalCities = capitals
}

function calculateMaxAndMinPop(data) {
  let sorted = data.filter((city) => {
    return city.properties.pop_max > 0
  })
  .sort((a, b) => {
      return parseFloat(a.properties.pop_max) - parseFloat(b.properties.pop_max)
  })
  setMinPop(sorted[1].properties.pop_max)
  setMaxPop(sorted[sorted.length - 1].properties.pop_max)
}

function setMaxPop(amount) {
  state.maxPop = amount
}

function setMinPop(amount) {
  state.minPop = amount
}

function setActiveDataLayer(e, newLayer) {
  notifyActiveDataLayerChange(state.activeDataLayer, newLayer)
  state.activeDataLayer = newLayer
}

function setActiveVisualization(e) {
  state.activeVisualization = e.target.innerText
  notifyActiveVisualizationChange()
}

function setSelectedPlace(place) {
  previouslySelectedPlaceStyles(state.lastClickedPlace)
  state.lastClickedPlaceColor = place.options.color
  state.lastClickedPlace = place
  state.selectedPlace = place
  notifyClickedPlace(place)
}

function setActiveLegend(legendSelected) {
  state.activeLegend = legendSelected
}

export {
  initState,
  initActiveDataLayer,
  setActiveDataLayer,
  setSelectedPlace,
  setActiveVisualization
 }
