
    var rapedData = [
        {
            "Situation": "raped",
            "Population": "Female Undergrad",
            "Percentage": 5,
            "Number": 38
        },
        {
            "Situation": "raped",
            "Population": "Male Undergrad",
            "Percentage": 1,
            "Number": 5
        },
        {
            "Situation": "raped",
            "Population": "Female Grad",
            "Percentage": 1,
            "Number": 5
        },
        {
            "Situation": "raped",
            "Population": "Male Grad",
            "Percentage": 0,
            "Number": 2
        }
    ];
    var stalkedData = [{
        "Situation": "stalked",
        "Population": "Female Undergrad",
        "Percentage": 14,
        "Number": 109
    },
    {
        "Situation": "stalked",
        "Population": "Male Undergrad",
        "Percentage": 2,
        "Number": 16
    },
    {
        "Situation": "stalked",
        "Population": "Female Grad",
        "Percentage": 9,
        "Number": 58
    },
    {
        "Situation": "stalked",
        "Population": "Male Grad",
        "Percentage": 3,
        "Number": 27
    }];
    var abusiveData = [{
        "Situation": "abusiveRelationship",
        "Population": "Female Undergrad",
        "Percentage": 8,
        "Number": 67
    },
    {
        "Situation": "abusiveRelationship",
        "Population": "Male Undergrad",
        "Percentage": 4,
        "Number": 28
    },
    {
        "Situation": "abusiveRelationship",
        "Population": "Female Grad",
        "Percentage": 4,
        "Number": 26
    },
    {
        "Situation": "abusiveRelationship",
        "Population": "Male Grad",
        "Percentage": 2,
        "Number": 24
    }];
    var harassedData = [{
        "Situation": "harassed",
        "Population": "Female Undergrad",
        "Percentage": 15,
        "Number": 122
    },
    {
        "Situation": "harassed",
        "Population": "Male Undergrad",
        "Percentage": 4,
        "Number": 25
    },
    {
        "Situation": "harassed",
        "Population": "Female Grad",
        "Percentage": 7,
        "Number": 47
    },
    {
        "Situation": "harassed",
        "Population": "Male Grad",
        "Percentage": 2,
        "Number": 22
    }];
    var assaultedData =[{
        "Situation": "assaulted",
        "Population": "Female Undergrad",
        "Percentage": 10,
        "Number": 81
    },
    {
        "Situation": "assaulted",
        "Population": "Male Undergrad",
        "Percentage": 2,
        "Number": 13
    },
    {
        "Situation": "assaulted",
        "Population": "Female Grad",
        "Percentage": 3,
        "Number": 19
    },
    {
        "Situation": "assaulted",
        "Population": "Male Grad",
        "Percentage": 1,
        "Number": 6
    }];
    var w = 600,
        h = 500;
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
    function drawData(dataset){

        var BarScale = d3.scale.ordinal()
                         .domain(["Female Undergrad","Male Undergrad",
                                  "Female Grad", "Male Grad"])
                         .rangeRoundBands([0,w],0.05);
        var yScale = d3.scale.linear()
                        .domain([0,d3.max(dataset,function(d){
                            return d.Percentage;
                        })+1])
                        .range([0,h]);
        var axisScale = d3.scale.linear()
                        .domain([0,d3.max(dataset,function(d){
                            return d.Percentage;
                        })])
                        .range([h,0]);

        var xAxis = d3.svg.axis()
                          .scale(BarScale)
                          .orient("bottom");

        var yAxis = d3.svg.axis()
                          .scale(axisScale)
                          .orient("left")
                          .ticks(6)
                          .tickFormat( function(d){
                              return d +"%";
                          });
        console.log(dataset);
        console.log(d3.max(dataset,function(d){
            return d.Percentage;
        }));
        if (!d3.select("svg").empty()){
            console.log("svg is not empty");
            var svg = d3.select("svg");
            svg.selectAll("rect")
            .data(dataset)
            .transition()
            .duration(1500)
            .ease("linear")
            .attr({
                y: function(d) {
                    return h-yScale(d.Percentage)+5;
                },
                height: function(d) {
                    return yScale(d.Percentage);
                },
                fill: function(d){
                    return "rgb("+(100 + d.Percentage *10)+",50, 50)";
                }
            });
            svg.select(".axis")
            .transition()
            .duration(1000)
            .call(yAxis);
        }

        else {
            var svg = d3.select(".vis")
                    .append("svg")
                    .attr("width", w+50)
                    .attr("height",h+25);

            svg.selectAll("rect")
               .data(dataset)
               .enter()
               .append("rect")
               .transition()
               .duration(1500)
               .attr({
                   x: function(d,i){
                       return 35+ BarScale(d.Population);
                   },
                   y: function(d) {
                       return h - yScale(d.Percentage) +5;
                   },
                   width: BarScale.rangeBand(),
                   height: function(d){
                       return yScale(d.Percentage);
                   },
                   fill: function(d){
                       return "rgb("+(100 + d.Percentage *10)+",50, 50)";
                   }
               });
             svg.append("g")
                .attr("class","axis")
                .attr("transform", "translate(35,5)")
                .call(yAxis);
            svg.append("g")
                .attr("class","x axis")
                .attr("transform", "translate(35,505)")
                .call(xAxis);
           }
    }
