'use strict'
import L from 'leaflet'
import {state} from './store'
import {setSelectedPlace} from './setters'
import {testPolyline} from '../config'

let mapboxMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'javiabia.148f6b63',
                    accessToken: 'pk.eyJ1IjoiamF2aWFiaWEiLCJhIjoiS1ZyQ3BQYyJ9.v8yJTbF879AQ_t6j5XafiQ'
                })

let baseHue = 195
let baseMultiplier = 1
let baseOpacity = 0.4

export function updateBubleOpacity(value) {
  baseOpacity = value
  if (state.activeVisualization !== 'CHOROPLETH') {
    state.activeDataLayer.eachLayer((layer) => {
      layer.setStyle({
        fillOpacity: baseOpacity
      })
    })
  }
}
export function updateBubleSize(value) {
  baseMultiplier = value
  if (state.activeVisualization !== 'CHOROPLETH') {
    state.activeDataLayer.eachLayer((layer) => {
      layer.setStyle({
        radius: setRadius(layer.options.properties.pop_max)
      })
    })
  }
}

export function updateHue(value) {
  baseHue = value
  if (state.activeVisualization === 'CHOROPLETH') {
    state.activeDataLayer.eachLayer((layer) => {
      layer.setStyle({
        color: setPlaceColor(layer.options.properties.pop_max),
        radius: 5,
        stroke: false
      })
    })
  }
}

function setPlaceColor(population) {
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

function normalizePopulation(population) {
  return (population - state.minPop) / (state.maxPop - state.minPop)
}

function creteLayersFromArray(placesArray) {
  let layers = []
  placesArray.map(place => {
    layers.push(
      L.circleMarker([place.geometry.coordinates[1],place.geometry.coordinates[0]], {
        color: setPlaceColor(place.properties.pop_max),
        stroke: false,
        fillOpacity: .4,
        radius: 5,
        className: 'place-marker',
        properties: place.properties,
        normalizedPop: normalizePopulation(place.properties.pop_max)
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

function setMapLayers(allPlacesArray, capitalPlacesArray) {
  let allPlacesLayer = buildPlacesLayer(allPlacesArray)
  let capitalPlacesLayer = buildPlacesLayer(capitalPlacesArray)
  state.mapLayers = [allPlacesLayer,capitalPlacesLayer]
}


function initMap(placesLayer) {
  placesLayer.addTo(map)
}

function updateStyle() {
  this.setStyle({opacity: this.properties.normalizedPop})
}

function setRadius(population) {
  let log = Math.log10(population) * baseMultiplier
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
      color: '#8c96c6',
      radius: setRadius(layer.options.properties.pop_max)
    })
  })
}

function activeChoroplethVizz() {
  state.activeDataLayer.eachLayer((layer) => {
    layer.setStyle({
      color: setPlaceColor(layer.options.properties.pop_max),
      radius: 5,
      stroke: false
    })
  })
}

function activeDataLayerChange(oldLayer, newLayer) {
  map.removeLayer(oldLayer)
  map.addLayer(newLayer)
}

export {
  initMap,
  activeDataLayerChange,
  setMapLayers,
  activeBubleVizz,
  activeChoroplethVizz
}

var polyline = L.polyline(testPolyline , {color: 'red'})



var map = L.map('map', {
    renderer: L.canvas(),
    layers: [mapboxMap]
}).setView([37, 10], 3);


map.addLayer(polyline)
// map.fitBounds(polyline.getBounds());
