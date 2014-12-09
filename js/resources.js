

//TODO: Generate html code
function chartGenerator(feature){
    var chart = "<svg class=chart width='450'+ height='100'>"+
    "<rect x='130' y='0' width='"  + (feature.properties.femaleUn*3)+"' height='20'></rect>"+
    "<rect x='130' y='20' width='" + (feature.properties.maleUn*3) +"' height='20'></rect>"+
    "<rect x='130' y='40' width='" +(feature.properties.femaleGrad*3) +"' height='20'></rect>"+
    "<rect x='130' y='60' width='" +(feature.properties.maleGrad*3) +"' height='20'></rect>"+
    "<text x='" + (130+feature.properties.femaleUn*3)+"' y='10' dx='-5' dy='.36em' text-anchor='end'>" +feature.properties.femaleUn+"</text>"+
    "<text x='" + (130+feature.properties.maleUn*3) +"' y='30' dx='-5' dy='.36em' text-anchor='end'>"+ feature.properties.maleUn+"</text>"+
    "<text x='" + (130+feature.properties.femaleGrad*3) +"' y='50' dx='-5' dy='.36em' text-anchor='end'>" + feature.properties.femaleGrad+"</text>"+
    "<text x='" + (130+feature.properties.maleGrad*3) +"' y='70' dx='-5' dy='.36em' text-anchor='end'>" + feature.properties.maleGrad+"</text>"+
    "<text x='0' y='10' dy='.36em' text-anchor='left' class='name'>Female Undergraduate</text>"+
    "<text x='0' y='30' dy='.36em' text-anchor='left' class='name'>Male Undergraduate</text>"+
    "<text x='0' y='50' dy='.36em' text-anchor='left' class='name'>Female Graduate</text>"+
    "<text x='0' y='70' dy='.36em' text-anchor='left' class='name'>Male Graduate</text>"+
    "</svg>";
    return chart;
}



function drawMap(){
    $(".vis").html("");
    $(".vis").append("<div id='map'></div>");
    L.mapbox.accessToken = 'pk.eyJ1IjoiZGFuZ2l0ZGFuZyIsImEiOiJvbkRuQjZJIn0.JhYT7GO_W1FRl6nRA7KMzw';
    var map = L.mapbox.map('map', 'dangitdang.ec8eaebd')
    .setView([42.3598, -71.0921], 15);


     d3.json('https://cdn.rawgit.com/dangitdang/sexualAssaultsAtMIT/master/data/resourses.geojson',
             function(err, data){
                 console.log(data);
                 var radiusScale = d3.scale.linear().domain([0,100])
                                        .range([5,15]);
                function dataPoint(feature, latlng){
                    return L.circleMarker(latlng,{
                        radius: radiusScale(feature.properties.average),
                        fillColor: "#f55",
                        fillOpacity:0.7,
                        weight: 0.5,
                        color: '#fff'
                    }).bindPopup(
                        "<h2 class='popUpTitle'>"+feature.properties.name+"</h2>"+
                        "<p class='popUpInfo'> Percent of student indicating that they likely use this resouce the next time they're assaulted</p>"+
                        chartGenerator(feature),{
                            minWidth:300,
                            maxWidth:450
                            }
                    );
                }
                var resourceLayer = L.geoJson(null, {pointToLayer: dataPoint})
                                      .addTo(map);
                 resourceLayer.addData(data);
                 resourceLayer.on('mouseover',function(e){
                     e.layer.openPopup();
                 });
                 resourceLayer.on('mouseout',function(e){
                     e.layer.closePopup();
                });
             });
    d3.select("#info")
        .select(".attInfo")
        .text("Hover over a data point to learn more!");
    d3.select("#info").classed("hidden",false);
}
