'use strict'
import {placesURL} from './config'
import {initMap,
        setMapLayers,
        activeSizeVizz,
        activeChloropetVizz} from './modules/mapHandler'
import {fetchPlacesData} from './modules/dataFetcher'
import {state} from './modules/store'
import {initState,
        initActiveDataLayer,
        setActiveDataLayer} from './modules/setters'
import {selectNode,
        toggleActiveDataLayer,
        toggleClassFromSelector} from './modules/DOMHelper'

fetchPlacesData(placesURL)
  .then(function(data) {
    initState(data.features)
    setMapLayers(state.allCities, state.capitalCities)
    initActiveDataLayer(state.mapLayers[0])
    initMap(state.activeDataLayer)
  })
  .catch(error => {
    console.log(error);
  })

  //MOUSE EVENTS

  selectNode('#toggleCapitals').onclick = toggleActiveDataLayer

  selectNode('#sizeVizzButton').onclick = activeSizeVizz

  selectNode('#chloropetVizzButton').onclick = activeChloropetVizz

  selectNode('.edit-button').onclick =  toggleClassFromSelector
