'use strict'

import {state} from './store'
import {setActiveDataLayer} from './setters'


function selectNode(selector) {
  return document.querySelector(selector)
}

function updateNodeContent(selector, data) {
  selectNode(selector).innerHTML = data
}

function previouslySelectedPlaceStyles(place) {
  if (place) {
    place.setStyle({fillOpacity: .6, radius: 5, color: state.lastClickedPlaceColor})
  }
}

function updateHeaderStyles() {
  addClassToNodesList('.big-data', 'big-data-visible')
  addClassToNodesList('.small-data', 'small-data-visible')
  addClassToNodesList('.label', 'label-visible')
}

function addClassToNodesList(targetSelector, newClass) {
  document.querySelectorAll(targetSelector).forEach(node => {
    node.classList.add(newClass);
  })
}

function toggleClassFromLegendSelector() {
  if (state.activeVisualization === 'CHOROPLETH') {
    selectNode('.choropleth-button').classList.add('legend-button--selected')
    selectNode('.bubles-button').classList.remove('legend-button--selected')
  } else {
    selectNode('.choropleth-button').classList.remove('legend-button--selected')
    selectNode('.bubles-button').classList.add('legend-button--selected')
  }
}

function toggleActiveClassFromLegend() {
  if (state.activeVisualization === 'CHOROPLETH') {
    selectNode('.choropleth-legend').classList.add('legend-active')
    selectNode('.bubles-legend').classList.remove('legend-active')
    selectNode('.chl-edit-controls').classList.add('edit-controls-active')
    selectNode('.bubles-edit-controls').classList.remove('edit-controls-active')
  } else {
    selectNode('.choropleth-legend').classList.remove('legend-active')
    selectNode('.bubles-legend').classList.add('legend-active')
    selectNode('.chl-edit-controls').classList.remove('edit-controls-active')
    selectNode('.bubles-edit-controls').classList.add('edit-controls-active')
  }
}

function toggleActiveDataLayer() {
  if (state.capitalCitiesActive) {
    state.capitalCitiesActive = false
    setActiveDataLayer(state.mapLayers[0])
  } else {
    state.capitalCitiesActive = true
    setActiveDataLayer(state.mapLayers[1])
  }
}

function updateCityData(selectedPlaceData) {
  updateNodeContent('#city-name', selectedPlaceData.name)
  updateNodeContent('#city-population', selectedPlaceData.pop_max)
  updateNodeContent('#city-country', selectedPlaceData.adm0name)
  updateNodeContent('#city-region', selectedPlaceData.adm1name)
}

function updateDomHue(baseHue) {
  document.documentElement.style.setProperty('--h', baseHue)
}

export {
  selectNode,
  updateNodeContent,
  updateHeaderStyles,
  updateCityData,
  toggleActiveDataLayer,
  toggleActiveClassFromLegend,
  toggleClassFromLegendSelector,
  previouslySelectedPlaceStyles,
  updateDomHue
}
