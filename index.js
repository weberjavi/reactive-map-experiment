'use strict'
import {placesURL} from './config'
import {initMap,
        setMapLayers,
        activeSizeVizz,
        activeChloropetVizz,
        updateHue} from './modules/mapHandler'
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

  selectNode('.capitals-button').onclick = toggleActiveDataLayer

  selectNode('.bubles-button').onclick = activeSizeVizz

  selectNode('.chloropet-button').onclick = activeChloropetVizz


  selectNode('.hue-slider').onchange = onChangeFun

  // selectNode('.population-slider').onchange = onChangeFun
  //
  // selectNode('.population-slider2').onchange = onChangeFun

  function onChangeFun(e) {
    console.log(e.target.value);
    document.documentElement.style.setProperty('--h', e.target.value)
    updateHue(Number(e.target.value))
  }

  // selectNode('.edit-button').onclick =  toggleClassFromSelector
