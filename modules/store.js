'use strict'

let state = {
  editLayersOpen: false,
  distancesSectionActive: false,
  capitalCitiesActive: false,
  allCities: [],
  capitalCities: [],
  mapLayers: [],
  activeDataLayer: [],
  activeVisualization: 'CHOROPLETH',
  maxPop: null,
  minPop: null,
  selectedPlace: {},
  lastClickedPlace: null,
  lastClickedPlaceColor: ''
}

export {state}
