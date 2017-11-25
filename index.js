'use strict'

import {placesURL} from './config'
import {fetchPlacesData} from './modules/dataFetcher'
import {initState} from './modules/setters'
import {initMap} from './modules/mapHandler'
import {state} from './modules/store'
import eventsHandler from './modules/DOMeventsHandler'

fetchPlacesData(placesURL)
  .then(function(data) {
    initState(data.features)
    initMap(state.activeDataLayer)
  })
  .catch(error => {
    console.log(error);
  })
