var w = 600,
    h = 500;
var facts= ["More than 8 out of 10 (78% of female respondents and 85% of male respondents) agree or strongly agree"+"that MIT students respect each other’s personal space.","More than 9 out of 10 respondents (91% of female respondents and 89% of male respondents) agree or"+"strongly agree that their friends would watch out for them at a party or social event if it seemed like something bad might happen.","More than 9 out of 10 respondents (91% of female respondents and 94% of male respondents) agree or strongly agree that most MIT students would respect someone who did something to prevent a sexual assault."]
function drawIntro(){
    if (!d3.select("svg").empty()){
        var svg = d3.select("svg");
        svg.remove()
           .transition()
           .duration(1000);
        $('<p class="facts">' +facts[0] +'</p>').appendTo(".vis").hide();
        $('<p class="facts">' +facts[1] +'</p>').appendTo(".vis").hide();
        $('<p class="facts">' +facts[2] +'</p>').appendTo(".vis").hide();
        $('.facts').fadeTo("slow",1,function(){});
    } else {
        $(".vis").html("");
        $('<p class="facts">' +facts[0] +'</p>').appendTo(".vis").hide();
        $('<p class="facts">' +facts[1] +'</p>').appendTo(".vis").hide();
        $('<p class="facts">' +facts[2] +'</p>').appendTo(".vis").hide();
        $('.facts').fadeTo("slow",1,function(){});
    }
}

function drawStudentAttitudes(dataset){

}
