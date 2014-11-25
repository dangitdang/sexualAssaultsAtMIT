var w = 600,
    h = 500;
var facts= ["More than 8 out of 10 (78% of female respondents and 85% of male respondents) agree or strongly agree"+"that MIT students respect each other’s personal space.","More than 9 out of 10 respondents (91% of female respondents and 89% of male respondents) agree or"+"strongly agree that their friends would watch out for them at a party or social event if it seemed like something bad might happen.","More than 9 out of 10 respondents (91% of female respondents and 94% of male respondents) agree or strongly agree that most MIT students would respect someone who did something to prevent a sexual assault."]
function drawIntro(){
    if (!d3.select("svg").empty()){
        var svg = d3.selectAll("svg");
        svg.remove()
           .transition()
           .duration(1000);
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
function drawStudentAttitudes(data){
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
    var cfg = {
        w: 270,
        h: 270,
        maxValue: 1,
        levels: 10,
        TranslateX:0,
        TranslateY:0,
        ExtraWidthX:30,
        ExtraWidthY:30,
        color: "#ff9061",
        gender: "male"
    };
    var cfg2 = {
        w: 270,
        h: 270,
        maxValue: 1,
        levels: 10,
        TranslateX:0,
        TranslateY:0,
        ExtraWidthX:30,
        ExtraWidthY:30,
        color: "#59d8ec",
        gender: "female"
    };
    RadarChart.draw(".vis",data[0],cfg2);
    RadarChart.draw(".vis",data[1],cfg2);
    RadarChart.draw(".vis",data[2],cfg);
    RadarChart.draw(".vis",data[3],cfg);

}
