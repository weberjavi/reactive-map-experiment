'use strict'
import L from 'leaflet'
import {state} from './store'
import {setSelectedPlace} from './setters'

let mapboxMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'javiabia.148f6b63',
                    accessToken: 'pk.eyJ1IjoiamF2aWFiaWEiLCJhIjoiS1ZyQ3BQYyJ9.v8yJTbF879AQ_t6j5XafiQ'
                })

function setPlaceColor(population) {
  if (population < 1000) {
    return '#edf8fb'
  } else if (population < 10000) {
    return '#bfd3e6'
  } else if (population < 100000) {
    return '#9ebcda'
  } else if (population < 1000000) {
    return '#8c96c6'
  } else if (population < 10000000) {
    return '#8856a7'
  } else if (population < 50000000) {
    return '#810f7c'
  }
}

function creteLayersFromArray(placesArray) {
  let layers = []
  placesArray.map(place => {
    layers.push(
      L.circleMarker([place.geometry.coordinates[1],place.geometry.coordinates[0]], {
        color: setPlaceColor(place.properties.pop_max),
        stroke: false,
        fillOpacity: .7,
        radius: 5,
        className: 'place-marker',
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
      e.layer.setRadius(8)
      e.layer.setStyle({fillOpacity: .8, color: '#D9636C'})
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

function activeDataLayerChange(oldLayer, newLayer) {
  map.removeLayer(oldLayer)
  map.addLayer(newLayer)
}

export {
  initMap,
  activeDataLayerChange,
  setMapLayers
}








var map = L.map('map', {
    renderer: L.canvas(),
    layers: [mapboxMap]
}).setView([37, 10], 3);
