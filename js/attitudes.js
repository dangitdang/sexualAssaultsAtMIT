var w = 600,
    h = 500;
var facts= ["More than 8 out of 10 (78% of female respondents and 85% of male respondents) agree or strongly agree "+"that MIT students respect each other’s personal space.","More than 9 out of 10 respondents (91% of female respondents and 89% of male respondents) agree or "+"strongly agree that their friends would watch out for them at a party or social event if it seemed like something bad might happen.","More than 9 out of 10 respondents (91% of female respondents and 94% of male respondents) agree or strongly agree that most MIT students would respect someone who did something to prevent a sexual assault."]
function drawIntro(){
    if (!d3.select("svg").empty()){
        var svg = d3.selectAll("svg");
        svg.remove()
           .transition()
           .duration(1000);
    $(".vis").html("");
        $('<p class="facts">' +facts[0] +'<br></p>').appendTo(".vis").hide();
        $('<p class="facts">' +facts[1] +'<br></p>').appendTo(".vis").hide();
        $('<p class="facts">' +facts[2] +'</p>').appendTo(".vis").hide();
        $('.facts').fadeTo("slow",1,function(){});
    } else {
        $(".vis").html("");
        $('<p class="facts">' +facts[0] +'<br></p>').appendTo(".vis").hide();
        $('<p class="facts">' +facts[1] +'<br></p>').appendTo(".vis").hide();
        $('<p class="facts">' +facts[2] +'<br></p>').appendTo(".vis").hide();
        $('.facts').fadeTo("slow",1,function(){});
    }
}

var undergradData= [[[
                            {axis: "rs1", value:0.31},
                            {axis: "rs2",value:0.12},
                            {axis: "rs3", value:0.17},
                            {axis: "rs4", value:0.24},
                            {axis: "rs5", value:0.03},
                            {axis: "rs6", value:0.01},
                            {axis: "rs7", value:0.03},
                            {axis: "rs8", value:0.03},
                            {axis: "rs9", value:0.01}]],
                            [[{axis: "rs1", value:0.84},
                            {axis: "rs2",value:0.67},
                            {axis: "rs3", value:0.69},
                            {axis: "rs4", value:0.48},
                            {axis: "rs5", value:0.34},
                            {axis: "rs6", value:0.13},
                            {axis: "rs7", value:0.27},
                            {axis: "rs8", value:0.17},
                            {axis: "rs9", value:0.07}]],
                            [[{axis: "rs1", value:0.23},
                            {axis: "rs2",value:0.19},
                            {axis: "rs3", value:0.15},
                            {axis: "rs4", value:0.10},
                            {axis: "rs5", value:0.04},
                            {axis: "rs6", value:0.03},
                            {axis: "rs7", value:0.02},
                            {axis: "rs8", value:0.01},
                            {axis: "rs9", value:0.00}]],
                            [[{axis: "rs1", value:0.82},
                            {axis: "rs2",value:0.77},
                            {axis: "rs3", value:0.67},
                            {axis: "rs4", value:0.33},
                            {axis: "rs5", value:0.27},
                            {axis: "rs6", value:0.22},
                            {axis: "rs7", value:0.22},
                            {axis: "rs8", value:0.05},
                            {axis: "rs9", value:0.03}]]];
var gradData = [[[
                            {axis: "rs1", value:0.39},
                            {axis: "rs2",value:0.16},
                            {axis: "rs3", value:0.23},
                            {axis: "rs4", value:0.17},
                            {axis: "rs5", value:0.04},
                            {axis: "rs6", value:0.01},
                            {axis: "rs7", value:0.04},
                            {axis: "rs8", value:0.04},
                            {axis: "rs9", value:0.01}]],
                            [[{axis: "rs1", value:0.64},
                            {axis: "rs2",value:0.48},
                            {axis: "rs3", value:0.50},
                            {axis: "rs4", value:0.31},
                            {axis: "rs5", value:0.17},
                            {axis: "rs6", value:0.06},
                            {axis: "rs7", value:0.11},
                            {axis: "rs8", value:0.10},
                            {axis: "rs9", value:0.02}]],
                            [[{axis: "rs1", value:0.23},
                            {axis: "rs2",value:0.17},
                            {axis: "rs3", value:0.14},
                            {axis: "rs4", value:0.09},
                            {axis: "rs5", value:0.03},
                            {axis: "rs6", value:0.02},
                            {axis: "rs7", value:0.03},
                            {axis: "rs8", value:0.01},
                            {axis: "rs9", value:0.00}]],
                            [[{axis: "rs1", value:0.52},
                            {axis: "rs2",value:0.48},
                            {axis: "rs3", value:0.39},
                            {axis: "rs4", value:0.20},
                            {axis: "rs5", value:0.15},
                            {axis: "rs6", value:0.09},
                            {axis: "rs7", value:0.11},
                            {axis: "rs8", value:0.02},
                            {axis: "rs9", value:0.01}]]];
function drawUndergrad(){
    drawStudentAttitudes(undergradData);
}
function drawGrad(){
    drawStudentAttitudes(gradData);
}
function infoGetter(info){
    infos = {
        "rs1":"Made sexist remarks or jokes about women in your presence",
        "rs2":"Made sexist remarks or jokes about men in your presence",
        "rs3":"Made inappropriate comments about your or someone else's body, appearance or attractiveness",
        "rs4":"Suggested or implied women don't have to meet the same intellectual standards men do to get into MIT",
        "rs5":"Said crude or gross sexualthings to you, tried to get you to talk about sexual matters",
        "rs6":"E-mailed, texted, or instant messaged offensive sexual jokes, stories, or pictures to you",
        "rs7":"Told you about their sexual experiences when you did not want to hear them",
        "rs8":"Repeatedly asked you on dates, to go to dinner, or get a drink even after you've said no",
        "rs9":"Seemed to be brining you to engage in a romantic or sexual relationship with that person"
    };
    return(infos[info]);

}
function drawStudentAttitudes(data){
    $(".vis").html("");
    if (d3.selectAll("svg").size > 1){
        d3.selectAll("svg").remove();
    }
    if (!d3.select("svg").empty()){
        var svg = d3.select("svg");
        svg.remove()
           .transition()
           .duration(1000);
    }
    $(".facts").remove();
    d3.selectAll("svg").remove();
    // var vis = d3.select(".vis").append("svg")
    //             .attr("width",680)
    //             .attr("height",20)
    // vis.append("text")
    //     .attr("x",155)
    //     .attr("y",20)
    //     .style("text-anchor","middle")
    //     .style("fill","#666666")
    //     .text("Class Setting");
    // vis.append("text")
    //     .attr("x",465)
    //     .attr("y")
    var cfg = {
        w: 310,
        h: 310,
        maxValue: 1,
        levels: 10,
        ExtraWidthX:30,
        ExtraWidthY:30,
        color: "#47A7C8",
        gender: "male"
    };
    var cfg2 = {
        w: 310,
        h: 310,
        maxValue: 1,
        levels: 10,
        ExtraWidthX:30,
        ExtraWidthY:50,
        color: "#47A7C8",
        gender: "female"
    };
    RadarChart.draw(".vis",data[0],cfg2,"one");
    RadarChart.draw(".vis",data[1],cfg2,"two");
    RadarChart.draw(".vis",data[2],cfg,"three");
    RadarChart.draw(".vis",data[3],cfg,"four");

    $('circle').tooltipster({
        theme: 'tooltipster-noir'
    });
    var chart = d3.select(".one");
    chart.append("text")
            .attr("x",170)
            .attr("y",12)
            .style("text-anchor","middle")
            .style("fill","#666666")
            .text("Class Settings");
    chart.append("text")
            .attr("transform","rotate(-90)")
            .attr("x",-170)
            .attr("y",-5)
            .attr("dy","1em")
            .style("text-anchor","middle")
            .style("fill","#666666")
            .text("Female");
    d3.select(".two")
            .append("text")
            .attr("x",170)
            .attr("y",12)
            .style("text-anchor","middle")
            .style("fill","#666666")
            .text("Social Settings");
    d3.select(".three")
            .append("text")
            .attr("transform","rotate(-90)")
            .attr("x",-170)
            .attr("y",-5)
            .attr("dy","1em")
            .style("text-anchor","middle")
            .style("fill","#666666")
            .text("Male");
    console.log($('circle').length);
    d3.select("#info")
        .select(".attInfo")
        .text("The charts below documents what MIT students experienced while at MIT in class, lab or work, social settings or elsewhere at MIT. Hover over a data point to learn more!");
    d3.select("#info").classed("hidden",false);
}
