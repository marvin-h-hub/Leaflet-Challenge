var map = L.map("map", {
    center: [39.8333, -98.5833],
    zoom: 5
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1Ijoic2hhcm9uOTYzIiwiYSI6ImNrYW4zb2c5cTB0eGYyeWxvbDd6Nm5zYW8ifQ.hpsECQj1iB5m_iz8AOGXhw"
  }).addTo(map);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function getColor(d) {
    return d > 5  ? '#8b2300' :
           d > 4  ? '#E53E00' :
           d > 3  ? '##E57248' :
           d > 2  ? '#00ffd7' :
           d > 1  ? '#CCC8A4' :
                    '#62bd62';
};

d3.json(link, function(response) {

    L.geoJson(response, {
        style: function(feature){
        return {
            radius: 3*feature.properties.mag,
            fillColor: getColor(feature.properties.mag),//"#ada093",
            color: "#001",
            weight: 0.75,
            opacity: 1,
            fillOpacity: 0.75
        };
        },


        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },

    onEachFeature: function(feature, layer) {
        lat_long = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
        layer.on({
        click: function(event) {
            layer.bindPopup("<h1>Coordinates is " + feature.geometry.coordinates + "</h1> <hr> <h2> magnitude is " + feature.properties.mag + "</h2>");
        }
      });
    }    
    }).addTo(map);



    var legend = L.control({position: 'topright'});

    legend.onAdd = function () {
    
        var div = L.DomUtil.create('div', 'info legend');
            grades = [0, 1, 2, 3, 4, 5];
            labels = [];
    
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
    
        return div;
    };
    
    legend.addTo(map);
})
    
  