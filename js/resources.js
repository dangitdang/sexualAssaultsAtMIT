

//TODO: Generate html code
function chartGenerator(point){
    console.log(point)
    var data = [point.feature.properties.femaleUn,point.feature.properties.maleUn,point.feature.properties.femaleGrad,point.feature.properties.maleGrad];
    var names = ["Female Undergraduate","Male Undergraduate","Female Graduate","Male Graduate"];
    var svg = d3.select("#"+point.feature.properties.name.replace(" ",""))
                .append("svg")
                .attr("width",280)
                .attr("height",100);
    var xScale = d3.scale.linear()
                    .domain([0,100])
                    .range([0,100]);
    var yScale = d3.scale.ordinal()
                    .domain(data)
                    .rangeBands([0,100]);
    var bars = d3.selectAll("rect")
                    .data(data)
                    .enter().append("rect")
                    .attr("x",100)
                    .attr("y",yScale)
                    .attr("width", xScale)
                    .attr("height", yScale.rangeBand());

    bars.selectAll("text.score")
        .data(data)
        .enter().append("text")
        .attr("x", function(d) { return xScale(d) + 100;})
        .attr("y", function(d){ return yScale(d)+ yScale.rangeBand()/2;})
        .attr("dx",-5)
        .attr("dy",".36em")
        .attr("text-anchor","end")
        .text(String);

    bars.selectAll("text.names")
        .data(names)
        .enter().append("text")
        .attr("x",100/2)
        .attr("y", function(d,i) { return 20 * i;})
        .attr("dy",".36em")
        .attr("text-anchor","middle")
        .text(String);
}



function drawMap(){
    $(".vis").html("");
    $(".vis").append("<div id='map'></div>");
    L.mapbox.accessToken = 'pk.eyJ1IjoiZGFuZ2l0ZGFuZyIsImEiOiJvbkRuQjZJIn0.JhYT7GO_W1FRl6nRA7KMzw';
    var map = L.mapbox.map('map', 'dangitdang.ec8eaebd')
    .setView([42.3598, -71.0921], 15);


     d3.json('https://rawgit.com/dangitdang/sexualAssaultsAtMIT/master/data/resourses.geojson',
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
                        "<h2 style='padding:0, text-align:center'>"+feature.properties.name+"</h2>"+
                        "<p style='padding:0; font-size:1em'> How likely would you use this resouce the next time you're assaulted ?</p>"+
                        "<svg class=chart width='400'+ height='100'>"+
                        "<rect x='0' y='0' width='266.66666666666663' height='20'></rect>"+
                        "<rect x='0' y='20' width='133.33333333333331' height='20'></rect>"+
                        "<rect x='0' y='40' width='300' height='20'></rect>"+
                        "<rect x='0' y='60' width='400' height='20'></rect>"+
                        "<text x='266.66666666666663' y='10' dx='-5' dy='.36em' text-anchor='end'>8</text>"+
                        "<text x='133.33333333333331' y='30' dx='-5' dy='.36em' text-anchor='end'>4</text>"+
                        "<text x='300' y='50' dx='-5' dy='.36em' text-anchor='end'>9</text>"+
                        "<text x='400' y='70' dx='-5' dy='.36em' text-anchor='end'>12</text>"+
                        "</svg>",{
                            minWidth:300,
                            maxWidth:500
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
}
