'use strict'
import {updateNodeContent, updateHeaderStyles} from './DOMHelper'

let state = {
  editLayersOpen: false,
  distancesSectionActive: false,
  allPopulatedPlaces: [],
  countryCapitals: [],
  selectedPlace: {},
  lastClickedPlace: null
}

function setSelectedPlace(place) {
  if (state.lastClickedPlace) {
    state.lastClickedPlace.setStyle({fillOpacity: .6, radius: state.lastClickedPlace.options.properties.rank_max * .5})
  }
  state.lastClickedPlace = place
  state.selectedPlace = place
  console.log('selectedPlace');
  console.log(state.selectedPlace);
  updateCityData(place.options.properties)
  updateHeaderStyles()
}

function updateCityDataViewState() {

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

export {state, setSelectedPlace}
