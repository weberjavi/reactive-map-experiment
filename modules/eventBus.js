'use strict'
import {state} from './store'
import {initMap,
        activeDataLayerChange,
        activeBubleVizz,
        activeChoroplethVizz} from './mapHandler'
import {updateCityData,
        updateHeaderStyles,
        toggleClassFromLegendSelector,
        toggleActiveClassFromLegend} from './DOMHelper'

function notifyInitActiveDataLayer() {
  initMap(state.activeDataLayer)
}

function notifyActiveDataLayerChange(oldLayer, newLayer) {
  activeDataLayerChange(oldLayer, newLayer)
  toggleClassFromLegendSelector()
}

function notifyClickedPlace(place) {
  updateCityData(place.options.properties)
  updateHeaderStyles()
}

function notifyActiveVisualizationChange() {
  if (state.activeVisualization === 'CHOROPLETH') {
    activeChoroplethVizz()
    toggleClassFromLegendSelector()
    toggleActiveClassFromLegend()
  } else {
    activeBubleVizz()
    toggleClassFromLegendSelector()
    toggleActiveClassFromLegend()
  }
}

export {notifyInitActiveDataLayer,
        notifyActiveDataLayerChange,
        notifyClickedPlace,
        notifyActiveVisualizationChange}
