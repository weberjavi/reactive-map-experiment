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
  setHue,
  setMinPopulation,
  setMaxPopulation
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
  setMinPopulation(populationSliderCorrection(Number(e.target.value)))
}

function updateMaxPop(e) {
  setMaxPopulation(populationSliderCorrection(Number(e.target.value)))
}

function populationSliderCorrection(value) {
  if (value <= 30) {
    return Math.round((value * 100000)/30)
  } else if (value > 30 && value <=80){
    return Math.round((value * 500000)/80)
  } else if (value > 80 && value <=140){
    return Math.round((value * 1000000)/140)
  } else if (value > 140 && value <=160){
    return Math.round((value * 2000000)/160)
  } else if (value > 160 && value <=180){
    return Math.round((value * 3000000)/180)
  } else if (value > 180 && value <=200){
    return Math.round((value * 4000000)/200)
  } else if (value > 200 && value <=220){
    return Math.round((value * 5000000)/220)
  } else if (value > 220 && value <=240){
    return Math.round((value * 7000000)/240)
  } else if (value > 240 && value <=260){
    return Math.round((value * 9000000)/260)
  } else if (value > 260 && value <=270){
    return Math.round((value * 13000000)/270)
  } else if (value > 270 && value <=280){
    return Math.round((value * 20000000)/280)
  } else if (value > 280 && value <=290){
    return Math.round((value * 25000000)/290)
  } else {
    return Math.round((value * 36000000)/300)
  }
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
