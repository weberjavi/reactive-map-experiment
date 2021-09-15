'use strict'
import L from 'leaflet'
import {state} from './store'
import {setSelectedPlace} from './setters'
import {testPolyline} from '../config'

let mapboxMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'javiabia/148f6b63',
                    accessToken: 'pk.eyJ1IjoiamF2aWFiaWEiLCJhIjoiS1ZyQ3BQYyJ9.v8yJTbF879AQ_t6j5XafiQ'
                })

export function updateBubleOpacity(activeLayer, opacity) {
    activeLayer.eachLayer((layer) => {
      layer.setStyle({
        fillOpacity: opacity
      })
    })
}
export function updateBubleSize(activeLayer, multiplier) {
  if (state.activeVisualization !== 'CHOROPLETH') {
    activeLayer.eachLayer((layer) => {
      layer.setStyle({
        radius: setRadius(layer.options.properties.pop_max, multiplier),
        color: '#555',
        weight: .5,
        stroke: true
      })
    })
  }
}
export function updateMapHue(activeLayer, baseHue) {
  if (state.activeVisualization === 'CHOROPLETH') {
    activeLayer.eachLayer((layer) => {
      layer.setStyle({
        color: setPlaceColor(layer.options.properties.pop_max, baseHue),
        radius: 5,
        stroke: false
      })
    })
  }
}
export function triggerMapPopulationFilter(activeLayer, min, max) {
  activeLayer.eachLayer((layer) => {
    var population = layer.options.properties.pop_max
    if (population >= min && population <= max) {
      layer._path.classList.remove('display-none')
    } else {
      layer._path.classList.add('display-none')
    }
  })
}
export function updateVisiblePopulationPlaces(min, max) {
    state.activeDataLayer.eachLayer((layer) => {
      var population = layer.options.properties.pop_max
      if (population >= min && population <= max) {
        layer._path.classList.remove('display-none')
      } else {
        layer._path.classList.add('display-none')
      }
    })
}

function setPlaceColor(population, baseHue = 195) {
  if (population > 15000000) {
    return `hsl(${baseHue + 30},100%, 20%)`
  } else if (population > 5000000) {
    return `hsl(${baseHue + 30},100%, 40%)`
  } else if (population > 1000000) {
    return `hsl(${baseHue + 30},100%, 60%)`
  } else if (population > 500000) {
    return `hsl(${baseHue},100%, 50%)`
  } else if (population > 100000) {
    return `hsl(${baseHue},100%, 65%)`
  } else if (population > 10000) {
    return `hsl(${baseHue},100%, 80%)`
  } else {
    return `hsl(${baseHue},100%, 95%)`
  }
}

function initMapStyles(activeLayer) {
  activeLayer.eachLayer((layer) => {
    layer.setStyle({
      color: setPlaceColor(layer.options.properties.pop_max, state.baseHue),
      radius: 5,
      stroke: false,
      fillOpacity: .4
    })
  })
}


function creteLayersFromArray(placesArray) {
  let layers = []
  placesArray.map(place => {
    layers.push(
      L.circleMarker([place.geometry.coordinates[1],place.geometry.coordinates[0]], {
        properties: place.properties
      }).bindTooltip(`${place.properties.name}`, {className: 'custom-tooltip'})
    )
  })
  return layers
}

/**
 * Adds on click functionality to all layers
 * @param  {Array} layers Array containing circleMarker objects
 *                        created on createLayersFromArray function
 * @return {featureGroup}    Extends leaflet layer group and helps handling layers
 *                           as a whole
 */
function createFeatureGroup(layers) {
  return L.featureGroup(layers)
    .on('click', function(e){
      setSelectedPlace(e.layer)
      e.layer.setRadius(14)
      e.layer.setStyle({fillOpacity: 1})
      map.flyTo([e.layer.options.properties.latitude, e.layer.options.properties.longitude], 6)
    })
}

function buildPlacesLayer(placesArray) {
  let layers = creteLayersFromArray(placesArray)
  return createFeatureGroup(layers)
}

function initMapLayers(allPlacesArray, capitalPlacesArray) {
  let allPlacesLayer = buildPlacesLayer(allPlacesArray)
  let capitalPlacesLayer = buildPlacesLayer(capitalPlacesArray)
  state.mapLayers = [allPlacesLayer,capitalPlacesLayer]
}


function initMap(placesLayer) {
  initMapStyles(placesLayer)
  placesLayer.addTo(map)
}

function setRadius(population, multiplier = 1) {
  let log = Math.log10(population) * multiplier
  if (log <= 0) {
    return 0
  } else if (log >= 7) {
    return log * 3
  } else if (log >= 6.5) {
    return log * 2
  } else if(log >= 6){
    return log * 1.5
  } else if(log >= 5){
    return log * 1.2
  } else if(log >= 4){
    return log
  } else {
    return log * 0.75
  }

}

function activeBubleVizz() {
  state.activeDataLayer.eachLayer((layer) => {
    layer.setStyle({
      stroke: true,
      weight: .5,
      color: '#555',
      radius: setRadius(layer.options.properties.pop_max, state.baseMultiplier)
    })
  })
}

function activeChoroplethVizz() {
  state.activeDataLayer.eachLayer((layer) => {
    layer.setStyle({
      color: setPlaceColor(layer.options.properties.pop_max, state.baseHue),
      radius: 5,
      stroke: false
    })
  })
}

function toggleCapitalsView(oldLayer, newLayer) {
  map.removeLayer(oldLayer)
  updateBubleOpacity(newLayer, state.baseOpacity)
  if (state.activeVisualization === 'CHOROPLETH') {
    updateMapHue(newLayer, state.baseHue)
  } else {
    updateBubleSize(newLayer, state.baseMultiplier)
  }
  map.addLayer(newLayer)
  triggerMapPopulationFilter(newLayer, state.minPop, state.maxPop)
}

export {
  initMap,
  toggleCapitalsView,
  initMapLayers,
  activeBubleVizz,
  activeChoroplethVizz
}

var polyline = L.polyline(testPolyline , {color: 'red'})



var map = L.map('map', {
    layers: [mapboxMap]
}).setView([37, 10], 3);


map.addLayer(polyline)
// map.fitBounds(polyline.getBounds());
