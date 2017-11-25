'use strict'
import {placesURL} from './config'
import {initMap,
        setMapLayers
       } from './modules/mapHandler'
import {fetchPlacesData} from './modules/dataFetcher'
import {state} from './modules/store'
import {initState,
        initActiveDataLayer,
        setActiveDataLayer,
        setActiveVisualization,
        setOpacity,
        setBubleSize,
        setHue
      } from './modules/setters'
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

  selectNode('.capitals-button').onclick = toggleActiveDataLayer

  selectNode('.bubles-button').onclick = setActiveVisualization

  selectNode('.choropleth-button').onclick = setActiveVisualization

  selectNode('.hue-slider').onchange = onChangeDataColor

  selectNode('.bubles-size-slider').onchange = onChangeBublesSize

  selectNode('.bubles-opacity-slider').onchange = onChangeBublesOpacity

  // selectNode('.population-slider').onchange = onChangeFun
  //
  // selectNode('.population-slider2').onchange = onChangeFun

  function onChangeDataColor(e) {
    setHue(Number(e.target.value))
  }

  function onChangeBublesSize(e) {
    setBubleSize(Number(e.target.value))
  }

  function onChangeBublesOpacity(e) {
    setOpacity(Number(e.target.value))
  }

  // selectNode('.edit-button').onclick =  toggleClassFromSelector
