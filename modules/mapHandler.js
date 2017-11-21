'use strict'
import L from 'leaflet'
import {state, setSelectedPlace} from './store'

let colorCode = ['#BBCBD2', '#BBCBD2', '#BBCBD2', '#BBCBD2','#A5B9C3','#A5B9C3','#8EA8B4','#8EA8B4', '#7897A6', '#618697', '#4B7488', '#346379', '#1E526A','#08415C']

var map = L.map('map', {
    renderer: L.canvas()
}).setView([37, 10], 3);

function setPlaceColor(population) {
  if (population < 1000) {
    return '#9AB8C5'
  } else if (population < 10000) {
    return '#6794A9'
  } else if (population < 100000) {
    return '#407289'
  } else if (population < 1000000) {
    return '#2D5060'
  } else if (population < 10000000) {
    return '#1A2E37'
  } else if (population < 50000000) {
    return '#000'
  }
}



L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
     id: 'javiabia.148f6b63',
    accessToken: 'pk.eyJ1IjoiamF2aWFiaWEiLCJhIjoiS1ZyQ3BQYyJ9.v8yJTbF879AQ_t6j5XafiQ'
}).addTo(map);

function initMap(placesArray) {
  let layerGroup = []
  placesArray.map(place => {
    layerGroup.push(
      L.circleMarker([place.geometry.coordinates[1],place.geometry.coordinates[0]], {
        color: setPlaceColor(place.properties.pop_max),
        stroke: false,
        fillOpacity: .6,
        radius: place.properties.rank_max * .7,
        className: 'place-marker',
        properties: place.properties
      }).bindTooltip(`${place.properties.name}`, {className: 'custom-tooltip'})
    )
  })
  var cities = L.featureGroup(layerGroup)
                  .on('click', function(e){
                    setSelectedPlace(e.layer)
                    e.layer.setRadius(8)
                    e.layer.setStyle({fillOpacity: .8, color: '#D9636C'})
                    map.flyTo([e.layer.options.properties.latitude, e.layer.options.properties.longitude], 6)
                  })
                  .addTo(map)
}

function reloadMap(newData) {
  console.log(newData);
}
export {
  initMap,
  reloadMap
}
