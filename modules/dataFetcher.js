'use strict'

import {state} from './store'


function fetchPlacesData(url) {
  return fetch(url)
         .then(response => response.json())
}

export {fetchPlacesData}
