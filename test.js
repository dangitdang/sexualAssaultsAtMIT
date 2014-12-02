<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Sexual Assaults at MIT</title>
        <script src="http://d3js.org/d3.v3.min.js"></script>
        <script src="js/jquery-1.11.1.min.js"></script>
    </head>
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

var width = 680, height = 800;
var svg = d3.select(".vis").append("svg")
            .attr("width", width)
            .attr("height", height);

data = assaultedData;
var getCenters = function (size) {
    var centers, map;
    centers = _.uniq(_.pluck(data, "Population")).map(function (d) { //A
      return {name: d, value: 1};
      });

    map = d3.layout.treemap().size(size).ratio(1/1); //B
    map.nodes({children: centers}); //C
    return centers; //D
};

centers = getCenters([680,800]);
console.log(centers)
