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
    console.log('prev selected');
    console.log(place);
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

function toggleClassFromSelector() {
  console.log(selectNode('.edit-layers-board'));
  selectNode('.edit-layers-board').classList.toggle('edit-layers-board--active')
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
  updateCityName(selectedPlaceData.name)
  updateCityPopulation(selectedPlaceData.pop_max)
  updateCityCountry(selectedPlaceData.adm0name)
  updateCityRegion(selectedPlaceData.adm1name)
}

function updateCityName(name)  {
  updateNodeContent('#city-name', name)
}

function updateCityPopulation(population)  {
  updateNodeContent('#city-population', population)
}

function updateCityCountry(country)  {
  updateNodeContent('#city-country', country)
}

function updateCityRegion(region)  {
  updateNodeContent('#city-region', region)
}

export {selectNode,
        updateNodeContent,
        updateHeaderStyles,
        updateCityData,
        toggleActiveDataLayer,
        toggleClassFromSelector,
        previouslySelectedPlaceStyles}
