var express = require('express');
var mongoose = require ('mongoose');
var axios = require('axios');
var cheerio = require('cheerio');
var db = require ('./models');
var logger = require('morgan');
//requiring all models and initializing express & placing axios.
var PORT = 3000;

var app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongob://localhost/unit18Populater", {useNewUrlParser: true });

//routes for scraping website 

app.get('/scape', function (req, res) {
    axios.get("https://na.leagueoflegends.com/en/game-info/").then(function(response) {

    var $ = cheerio.load(response.data);

    $("article h2").each(function(i, element) {

        var result = [];

        result.title = $(this) 
            .children('a')
            .text();
        result.link = $(this)
            .children('a')
            .attr('href');

