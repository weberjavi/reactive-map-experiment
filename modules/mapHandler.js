'use strict'
import L from 'leaflet'
import {state, setSelectedPlace} from './store'

let colorCode = ['#BBCBD2', '#BBCBD2', '#BBCBD2', '#BBCBD2','#A5B9C3','#A5B9C3','#8EA8B4','#8EA8B4', '#7897A6', '#618697', '#4B7488', '#346379', '#1E526A','#08415C']

var map = L.map('map', {
    renderer: L.canvas()
}).setView([37, 10], 3);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
     id: 'javiabia.148f6b63',
    accessToken: 'pk.eyJ1IjoiamF2aWFiaWEiLCJhIjoiS1ZyQ3BQYyJ9.v8yJTbF879AQ_t6j5XafiQ'
}).addTo(map);

function addPlacesMarkers(placesArray) {
  let layerGroup = []
  placesArray.map(place => {
    layerGroup.push(
      L.circleMarker([place.geometry.coordinates[1],place.geometry.coordinates[0]], {
        color: colorCode[place.properties.rank_max],
        stroke: false,
        fillOpacity: .6,
        radius: place.properties.rank_max * .5,
        className: 'place-marker',
        properties: place.properties
      })
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
export {
  addPlacesMarkers
}
