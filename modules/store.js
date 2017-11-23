'use strict'

let state = {
  editLayersOpen: false,
  distancesSectionActive: false,
  capitalCitiesActive: false,
  allCities: [],
  capitalCities: [],
  mapLayers: [],
  activeDataLayer: [],
  allMax: null,
  allMin: null,
  selectedPlace: {},
  lastClickedPlace: null,
  lastClickedPlaceColor: ''
}

export {state}
