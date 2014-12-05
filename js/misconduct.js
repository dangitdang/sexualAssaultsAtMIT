var rapedData = [
    {
        "Situation": "raped",
        "Population": "femaleUn",
        "Percentage": 5,
        "Number": 38
    },
    {
        "Situation": "raped",
        "Population": "maleUn",
        "Percentage": 1,
        "Number": 5
    },
    {
        "Situation": "raped",
        "Population": "femaleGr",
        "Percentage": 1,
        "Number": 5
    },
    {
        "Situation": "raped",
        "Population": "maleGr",
        "Percentage": 0,
        "Number": 2
    }
];
var stalkedData = [{
    "Situation": "stalked",
    "Population": "femaleUn",
    "Percentage": 14,
    "Number": 109
},
{
    "Situation": "stalked",
    "Population": "maleUn",
    "Percentage": 2,
    "Number": 16
},
{
    "Situation": "stalked",
    "Population": "femaleGr",
    "Percentage": 9,
    "Number": 58
},
{
    "Situation": "stalked",
    "Population": "maleGr",
    "Percentage": 3,
    "Number": 27
}];
var abusiveData = [{
    "Situation": "abusiveRelationship",
    "Population": "femaleUn",
    "Percentage": 8,
    "Number": 67
},
{
    "Situation": "abusiveRelationship",
    "Population": "maleUn",
    "Percentage": 4,
    "Number": 28
},
{
    "Situation": "abusiveRelationship",
    "Population": "femaleGr",
    "Percentage": 4,
    "Number": 26
},
{
    "Situation": "abusiveRelationship",
    "Population": "maleGr",
    "Percentage": 2,
    "Number": 24
}];
var harassedData = [{
    "Situation": "harassed",
    "Population": "femaleUn",
    "Percentage": 15,
    "Number": 122
},
{
    "Situation": "harassed",
    "Population": "maleUn",
    "Percentage": 4,
    "Number": 25
},
{
    "Situation": "harassed",
    "Population": "femaleGr",
    "Percentage": 7,
    "Number": 47
},
{
    "Situation": "harassed",
    "Population": "maleGr",
    "Percentage": 2,
    "Number": 22
}];
var assaultedData =[{
    "Situation": "assaulted",
    "Population": "femaleUn",
    "Percentage": 10,
    "Number": 81
},
{
    "Situation": "assaulted",
    "Population": "maleUn",
    "Percentage": 2,
    "Number": 13
},
{
    "Situation": "assaulted",
    "Population": "femaleGr",
    "Percentage": 3,
    "Number": 19
},
{
    "Situation": "assaulted",
    "Population": "maleGr",
    "Percentage": 1,
    "Number": 6
}];
function drawAssaulted(){
    drawData(assaultedData);
}
function drawHarrassed(){
    drawData(harassedData);
}
function drawRaped(){
    drawData(rapedData);
}
function drawAbusive(){
    drawData(abusiveData);
}
function drawStalked(){
    drawData(stalkedData);
}
var width = 680,
    height = 680,
    padding = 6, // separation between nodes
    maxRadius = 12;


function drawData(data){
    $(".facts").remove();
    d3.selectAll("svg").remove();
    var n = 400, // total number of nodes
        m = 2; // number of distinct clusters

    var x = d3.scale.ordinal()
            .domain(d3.range(m))
            .rangePoints([0, width], 1);

    var y = d3.scale.ordinal()
            .domain(d3.range(m))
            .rangePoints([0, height],1);

    var count = 0;
    var nodes = d3.range(n).map(function() {
            var i,j, pop;
            if (count <=99){
                pop = "femaleUn";
                i = 0;
                j = 0;
            } else if (count <=199) {
                pop = "femaleGr";
                i = 1;
                j = 0;
            } else if (count <=299) {
                pop = "maleUn";
                i = 0;
                j =1;
            } else {
                pop= "maleGr";
                i = 1;
                j = 1;
            }
            count ++;
            return {
                radius: 12,
                cx: x(i),
                cy: y(j),
                class:pop
            };
        });

    var force = d3.layout.force()
                    .nodes(nodes)
                    .size([width, height])
                    .gravity(0)
                    .charge(0)
                    .on("tick", tick)
                    .start();

    var svg = d3.select(".vis").append("svg")
                .attr("width", width)
                .attr("height", height);

    var images = svg.selectAll("image")
                    .data(nodes)
                    .enter().append("image")
                    .attr("class", function(d) { return d.class;})
                    .attr("r", function(d) { return d.radius; })
                    .attr("xlink:href", "human.png")
                    .attr("width", "22px")
                    .attr("height","22px")
                    ;

    function tick(e) {
        images
            .each(gravity(0.2 * e.alpha))
            .each(collide(0.2))
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .attr("x", function(d) {return d.x;})
            .attr("y",function(d){return d.y;});
        }

    // Move nodes toward cluster focus.
    function gravity(alpha) {
        return function(d) {
            d.y += (d.cy - d.y) * alpha;
            d.x += (d.cx - d.x) * alpha;
        };
    }
    
    // Resolve collisions between nodes.
    function collide(alpha) {
        var quadtree = d3.geom.quadtree(nodes);
        return function(d) {
            var r = d.radius + maxRadius + padding,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d.radius + quad.point.radius;
                    if (l < r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    }
    data.forEach(highlightAffected);
    svg.append("text")
        .attr("x", -50)
        .attr("y", 12)
        .style("text-anchor","middle")
        .style("fill","white")
        .text("Undergraduate")
        .transition()
        .duration(1500)
        .attr("x", width/4);
    svg.append("text")
        .attr("x", -50)
        .attr("y", 12)
        .style("text-anchor","middle")
        .style("fill","white")
        .text("Graduate")
        .transition()
        .duration(1500)
        .attr("x", width* (3/4));
    svg.append("text")
        .attr("transform","rotate(-90)")
        .attr("x", 50)
        .attr("y", 0)
        .attr("dy","1em")
        .style("text-anchor","middle")
        .style("fill","white")
        .text("Female")
        .transition()
        .duration(1500)
        .attr("x", -1*width/4);
    svg.append("text")
        .attr("transform","rotate(-90)")
        .attr("x", 50)
        .attr("y", 0)
        .attr("dy","1em")
        .style("text-anchor","middle")
        .style("fill","white")
        .text("Male")
        .transition()
        .duration(1500)
        .attr("x", -1*width *(3/4));
    $(".affected").tooltipster({
        theme: 'tooltipster-noir'
    });

}
function highlightAffected(data,index,array){
    var percentage = data.Percentage;
    var selection = d3.selectAll("."+data.Population);
    var count = 0;
    selection.each(function(d){
        if (count < percentage){
            d.icon = "humanaffected.png";
            d.class += " affected";
            if (data.Situation === "abusiveRelationship") {
                d.title = percentage+"% have been in an abusive relationship.";
            } else {
                d.title = percentage +"% have been "+ data.Situation+".";
            }
        } else {
            d.icon = "human.png";
            d.title = "";
        }
        count ++;
    }).attr("xlink:href", function(d){
        return d.icon;
    }).attr("class",function(d){ return d.class;})
      .attr("title",function(d){ return d.title;});
}
