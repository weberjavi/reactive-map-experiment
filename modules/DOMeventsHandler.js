'use strict'

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


// EVENTS
selectNode('.hue-slider').onchange = onChangeDataColor

selectNode('.bubles-size-slider').onchange = onChangeBublesSize

selectNode('.bubles-opacity-slider').onchange = onChangeBublesOpacity

selectNode('.capitals-button').onclick = toggleActiveDataLayer

selectNode('.bubles-button').onclick = setActiveVisualization

selectNode('.choropleth-button').onclick = setActiveVisualization
