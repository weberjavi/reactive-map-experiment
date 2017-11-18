'use strict'
import {updateNode} from './DOMHelper'

let state = {
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
}

function updateCityData(selectedPlaceData) {
  updateCityName(selectedPlaceData.name)
  updateCityPopulation(selectedPlaceData.pop_max)
  updateCityCountry(selectedPlaceData.adm0name)
  updateCityRegion(selectedPlaceData.adm1name)
}

function updateCityName(name)  {
  updateNode('#city-name', name)
}

function updateCityPopulation(population)  {
  updateNode('#city-population', population)
}

function updateCityCountry(country)  {
  updateNode('#city-country', country)
}

function updateCityRegion(region)  {
  updateNode('#city-region', region)
}

export {state, setSelectedPlace}
