'use strict'

import {updateVisiblePopulationPlaces} from './mapHandler'
import {state} from './store'

import {
  selectNode,
  toggleActiveDataLayer
} from './DOMHelper'

import {
  setActiveVisualization,
  setOpacity,
  setBubleSize,
  setHue
} from './setters'



// METHODS

function onChangeDataColor(e) {
  setHue(Number(e.target.value))
}

function onChangeBublesSize(e) {
  setBubleSize(Number(e.target.value))
}

function onChangeBublesOpacity(e) {
  setOpacity(Number(e.target.value))
}

function updateMinPop(e) {
  // slider width 300px
  updateVisiblePopulationPlaces(Number(e.target.value), 36670000)
  selectNode('.min-pop-data').innerHTML = e.target.value
}

function updateMaxPop(e) {
  selectNode('.max-pop-data').innerHTML = e.target.value
}


// EVENTS
selectNode('.hue-slider').onchange = onChangeDataColor

selectNode('.bubles-size-slider').onchange = onChangeBublesSize

selectNode('.bubles-opacity-slider').onchange = onChangeBublesOpacity

selectNode('.capitals-button').onclick = toggleActiveDataLayer

selectNode('.bubles-button').onclick = setActiveVisualization

selectNode('.choropleth-button').onclick = setActiveVisualization


selectNode('.population-slider').onchange = updateMaxPop

selectNode('.population-slider2').onchange = updateMinPop
