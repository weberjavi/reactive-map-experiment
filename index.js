'use strict'
import {placesURL} from './config'
import {initMap} from './modules/mapHandler'
import {fetchPlacesData} from './modules/dataFetcher'
import {state} from './modules/store'
import {initState} from './modules/setters'
import eventsHandler from './modules/DOMeventsHandler'

fetchPlacesData(placesURL)
  .then(function(data) {
    initState(data.features)
    initMap(state.activeDataLayer)
  })
  .catch(error => {
    console.log(error);
  })
