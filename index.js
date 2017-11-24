'use strict'
import {placesURL} from './config'
import {initMap,
        setMapLayers,
        activeSizeVizz,
        activeChloropetVizz,
        updateHue,
        updateBubleSize,
        updateBubleOpacity} from './modules/mapHandler'
import {fetchPlacesData} from './modules/dataFetcher'
import {state} from './modules/store'
import {initState,
        initActiveDataLayer,
        setActiveDataLayer,
        setActiveVisualization} from './modules/setters'
import {selectNode,
        toggleActiveDataLayer,
        toggleClassFromLegendSelector} from './modules/DOMHelper'

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

  // selectNode('.capitals-button').onclick = toggleActiveDataLayer

  selectNode('.bubles-button').onclick = setActiveVisualization

  selectNode('.choropleth-button').onclick = setActiveVisualization

  selectNode('.hue-slider').onchange = onChangeFun

  selectNode('.bubles-size-slider').onchange = onChangeBublesSize

  selectNode('.bubles-opacity-slider').onchange = onChangeBublesOpacity

  // selectNode('.population-slider').onchange = onChangeFun
  //
  // selectNode('.population-slider2').onchange = onChangeFun

  function onChangeFun(e) {
    document.documentElement.style.setProperty('--h', e.target.value)
    updateHue(Number(e.target.value))
  }

  function onChangeBublesSize(e) {
    console.log(e.target.value);
    updateBubleSize(Number(e.target.value))
  }

  function onChangeBublesOpacity(e) {
    console.log(e.target.value);
    updateBubleOpacity(Number(e.target.value))
  }

  // selectNode('.edit-button').onclick =  toggleClassFromSelector
