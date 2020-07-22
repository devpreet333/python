var container = L.DomUtil.get('map');
if(container != null){
  container._leaflet_id = null;
}



// Store our API endpoint inside queryUrl
var queryUrl1 = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=" +
  "2020-01-07&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL
d3.json(queryUrl1, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  var earthquakes = createFeatures(data.features);
  var queryUrl2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
  d3.json(queryUrl2, function(data) {
    // d3.json("Plates.json").then(function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    var plates = createFeatures1(data.features);
    console.log(data.features)
    createMap(earthquakes, plates)
  });
});





function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
   
    
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p><p>" + "Magnitude: " + feature.properties.mag + "</p>");
  }


  function createCircleMarker( feature, latlng ){
    // Change the values of these options to change the symbol's appearance
    
    let options = {
      radius: feature.properties.mag * 10,
      fillColor: circleColor(feature.properties.mag),
      color: "black",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }
    return L.circleMarker( latlng, options );
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: createCircleMarker,
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  // createMap(earthquakes);
  return(earthquakes)
}

function circleColor(magnitude) {
  if (magnitude <= 1){
    return ("#ffeead")
  }
  else if (magnitude <= 2){
    return ("#f2e394")
  }
  else if (magnitude <= 3){
    return ("#ffcc5c")
  }
  else if (magnitude <= 4){
    return ("#f2ae72")
  }
  else if (magnitude <= 5){
    return ("#d96459")
  }
  else {
    return ("#c83349")
  }

  
}
// d3.json("brand.json").then(function(data){
function createLegend(){

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + circleColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>'+'<br>' : '+');
    }

    return div;
  } 
  return(legend)
}

  

function createFeatures1(platesData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
  
  }

  function createLineMarker( feature, latlng ){
    // Change the values of these options to change the symbol's appearance
    let options = {
      color: '#3388ff'
      // radius: feature.properties.mag * 10,
      // fillColor: "lightgreen",
      // color: "black",
      // weight: 1,
      // opacity: 1,
      // fillOpacity: 0.8
    }
    return L.polyline( latlng, options );
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var plates = L.geoJSON(platesData, {
    pointToLayer: createLineMarker,
    // onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  // createMap(plates);
  return(plates)
}

function createMap(earthquakes, plates) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

// var earthquakes1 = L.layerGroup(earthquakes);
// var plates1 = L.layerGroup(plates);

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes,
    Plates : plates
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes, plates]
  });

  
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  legend = createLegend()
  legend.addTo(myMap);
}
