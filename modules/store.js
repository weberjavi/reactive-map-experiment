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
  lastClickedPlaceColor: '',
  baseHue: 195,
  baseMultiplier: 1,
  baseOpacity: .4
}

export {state}
