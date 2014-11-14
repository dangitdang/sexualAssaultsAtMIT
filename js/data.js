
    var rapedData = [
        {
            "Situation": "raped",
            "Population": "femaleu",
            "Percentage": 5,
            "Number": 38
        },
        {
            "Situation": "raped",
            "Population": "maleu",
            "Percentage": 1,
            "Number": 5
        },
        {
            "Situation": "raped",
            "Population": "femalegrad",
            "Percentage": 1,
            "Number": 5
        },
        {
            "Situation": "raped",
            "Population": "malegrad",
            "Percentage": 0,
            "Number": 2
        }
    ];
    var stalkedData = [{
        "Situation": "stalked",
        "Population": "femaleu",
        "Percentage": 14,
        "Number": 109
    },
    {
        "Situation": "stalked",
        "Population": "maleu",
        "Percentage": 2,
        "Number": 16
    },
    {
        "Situation": "stalked",
        "Population": "femalegrad",
        "Percentage": 9,
        "Number": 58
    },
    {
        "Situation": "stalked",
        "Population": "malegrad",
        "Percentage": 3,
        "Number": 27
    }];
    var abusiveData = [{
        "Situation": "abusiveRelationship",
        "Population": "femaleu",
        "Percentage": 8,
        "Number": 67
    },
    {
        "Situation": "abusiveRelationship",
        "Population": "maleu",
        "Percentage": 4,
        "Number": 28
    },
    {
        "Situation": "abusiveRelationship",
        "Population": "femalegrad",
        "Percentage": 4,
        "Number": 26
    },
    {
        "Situation": "abusiveRelationship",
        "Population": "malegrad",
        "Percentage": 2,
        "Number": 24
    }];
    var harassedData = [{
        "Situation": "harassed",
        "Population": "femaleu",
        "Percentage": 15,
        "Number": 122
    },
    {
        "Situation": "harassed",
        "Population": "maleu",
        "Percentage": 4,
        "Number": 25
    },
    {
        "Situation": "harassed",
        "Population": "femalegrad",
        "Percentage": 7,
        "Number": 47
    },
    {
        "Situation": "harassed",
        "Population": "malegrad",
        "Percentage": 2,
        "Number": 22
    }];
    var assaultedData =[{
        "Situation": "assaulted",
        "Population": "femaleu",
        "Percentage": 10,
        "Number": 81
    },
    {
        "Situation": "assaulted",
        "Population": "maleu",
        "Percentage": 2,
        "Number": 13
    },
    {
        "Situation": "assaulted",
        "Population": "femalegrad",
        "Percentage": 3,
        "Number": 19
    },
    {
        "Situation": "assaulted",
        "Population": "malegrad",
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
                         .domain(d3.range(dataset.length))
                         .rangeRoundBands([0,w],0.05);
        var yScale = d3.scale.linear()
                        .domain([0,d3.max(dataset,function(d){
                            return d.Percentage;
                        })+1])
                        .range([0,h]);
        var axisScale = d3.scale.linear()
                        .domain([0,d3.max(dataset,function(d){
                            return d.Percentage;
                        })+1])
                        .range([h,0]);
        var yAxis = d3.svg.axis()
                          .scale(axisScale)
                          .orient("left")
                          .ticks(6);
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
                    .attr("width", w+10)
                    .attr("height",h+10);

            svg.selectAll("rect")
               .data(dataset)
               .enter()
               .append("rect")
               .transition()
               .duration(1500)
               .attr({
                   x: function(d,i){
                       return 20+ BarScale(i);
                   },
                   y: function(d) {
                       return h - yScale(d.Percentage) +5;
                   },
                   width: BarScale.rangeBand(),
                   height: function(d){
                       return yScale(d.Percentage);
                   },
                   fill: function(d){
                       return "rgb("+(100 + d.Percentage *10)+",234, 144)";
                   }
               });
             svg.append("g")
                .attr("class","axis")
                .attr("transform", "translate(20,5)")
                .call(yAxis);
           }
    }
