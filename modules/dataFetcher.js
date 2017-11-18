'use strict'

import {state} from './store'
import {addPlacesMarkers} from './mapHandler'

const URL = 'https://xavijam.carto.com/api/v2/sql?q=SELECT*FROM ne_10m_populated_places_simple&format=GeoJSON'

fetch(URL)
  .then(response => response.json())
  .then(function(data) {
    state.allPopulatedPlaces = data.features
    state.countryCapitals = data.features.filter(city => city.properties.adm0cap === 1)
    addPlacesMarkers(state.allPopulatedPlaces)
  })
  .catch(error => {
    console.log(error);
  })
