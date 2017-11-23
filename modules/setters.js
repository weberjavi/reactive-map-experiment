import {state} from './store'
import {notifyInitActiveDataLayer,
        notifyActiveDataLayerChange,
        notifyClickedPlace} from './eventBus'
import {previouslySelectedPlaceStyles} from './DOMHelper'

// INIT FUNCTIONS

function initState(data) {
  setAllCitiesDataSet(data)
  setCapitalCitiesDataSet(data)
}

function initActiveDataLayer(data) {
  state.activeDataLayer = data
}

// SETTER FUNCTIONS

function setAllCitiesDataSet(data) {
  state.allCities = data
}

function setCapitalCitiesDataSet(data) {
  let capitals = data.filter(place => {
    return place.properties.adm0cap === 1
  })
  state.capitalCities = capitals
}

function setActiveDataLayer(newLayer) {
  notifyActiveDataLayerChange(state.activeDataLayer, newLayer)
  state.activeDataLayer = newLayer
}

function setSelectedPlace(place) {
  console.log(place.options.color);
  previouslySelectedPlaceStyles(state.lastClickedPlace)
  state.lastClickedPlaceColor = place.options.color
  state.lastClickedPlace = place
  state.selectedPlace = place
  console.log('selectedPlace');
  console.log(state.selectedPlace.options.color);
  notifyClickedPlace(place)
}







export {
  initState,
  initActiveDataLayer,
  setActiveDataLayer,
  setSelectedPlace
 }
