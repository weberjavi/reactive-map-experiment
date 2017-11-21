'use strict'
import {placesURL} from './config'
import {initMap} from './modules/mapHandler'
import {fetchPlacesData} from './modules/dataFetcher'
import {state} from './modules/store'

fetchPlacesData(placesURL)
  .then(function(data) {
    state.allPopulatedPlaces = data.features
    state.placesMapLayerData = state.allPopulatedPlaces 
    initMap(state.placesMapLayerData)
  })
  .catch(error => {
    console.log(error);
  })
