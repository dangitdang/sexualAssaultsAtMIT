var data = [{category:"Did not think the incident(s) was serious enough to officially report",value:0.72},
            {category:"Indicated it was not clear harm was intended",value:0.55},
            {category:"Did not want any action to be taken (i.e. arrests, legal action, disciplinary action)",value:0.47},
            {category:"Felt that they were at least partly at fault or it wasn’t totally the other person’s fault",value:0.44}];
function drawGraph(){
    $(".vis").html("");
    var margin = {top: 20, right: 50, bottom: 70, left: 50},
    width = 740 - margin.left - margin.right,
    height = 580 - margin.top - margin.bottom;
    var svg = d3.select(".vis")
                .append("svg")
                .attr("width",width + margin.left + margin.right)
                .attr("height",height + margin.top + margin.bottom)
                .attr("class", "reportingGraph")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var yScale = d3.scale.linear()
                    .domain([0,1])
                    .range([height,0]);
    var xScale = d3.scale.ordinal()
                    .rangeRoundBands([0,width],0.1,0.3);
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(8,"%");

    xScale.domain(data.map(function(d) {return d.category;}));
    svg.append("text")
        .attr("class", "chartTitle")
        .attr("x",740/2)
        .attr("y",0)
        .attr("text-anchor","middle")
        .text("Why are you not reporting?");

    svg.append("g")
        .attr("class","x axis")
        .attr("transform", "translate(0,"+height+")")
        .call(xAxis)
        .selectAll(".tick text")
            .call(wrap, xScale.rangeBand());
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")

        .attr("class","bar")
        .attr("x", function(d){
            return xScale(d.category);
        })
        .attr("width", function(d){
            return xScale.rangeBand();
        })
        .attr("y", function(d){
            return  height - yScale(d.value);
        })
        .attr("title", function(d){
            return (d.value *100).toFixed(0) + "%";
        })

        .attr("height", 0);
    svg.selectAll("rect")
        .data(data)
        .transition()
        .duration(1000)
        .attr("x", function(d){
            return xScale(d.category);
        })
        .attr("width", function(d){
            return xScale.rangeBand();
        })
        .attr("y", function(d){
            return yScale(d.value);
        })

        .attr("height", function(d){
            return height - yScale(d.value);
        });
    $(".bar").tooltipster({
        theme: 'tooltipster-noir',
        offsetX: 64
    });
}
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
