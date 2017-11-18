'use strict'
import L from 'leaflet'
import {state} from './store'

let colorCode = ['#BBCBD2', '#BBCBD2', '#BBCBD2', '#BBCBD2','#A5B9C3','#A5B9C3','#8EA8B4','#8EA8B4', '#7897A6', '#618697', '#4B7488', '#346379', '#1E526A','#08415C']

var map = L.map('map').setView([44, 2], 3);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
     id: 'javiabia.148f6b63',
    //id: 'javiabia.Festival_Metamovida',
    accessToken: 'pk.eyJ1IjoiamF2aWFiaWEiLCJhIjoiS1ZyQ3BQYyJ9.v8yJTbF879AQ_t6j5XafiQ'
}).addTo(map);

function addPlacesMarkers(placesArray) {
  let layerGroup = []
  placesArray.map(place => {
    layerGroup.push(
      L.circleMarker([place.geometry.coordinates[1],place.geometry.coordinates[0]], {
        color: colorCode[place.properties.rank_max],
        // fillColor: colorCode[place.properties.scalerank],
        stroke: false,
        fillOpacity: .6,
        radius: place.properties.rank_max * .5,
        className: 'populationRank' + place.properties.scalerank,
        properties: place.properties
      })
    )
  })
  var cities = L.featureGroup(layerGroup)
                  .on('click', function(e){console.log(e.layer.options.properties)})
                  .addTo(map)
}
export {
  addPlacesMarkers
}
