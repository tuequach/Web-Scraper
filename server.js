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
    axios.get("https://www.gamasutra.com/").then(function(response) {

    var $ = cheerio.load(response.data);

    $("article h2").each(function(i, element) {

        var result = [];

        result.title = $(this) 
            .children('a')
            .text();
        result.link = $(this)
            .children('a')
            .attr('href');

    db.Article.create(result)
        .then(function(dbArticle) {
            console.log(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    res.send("Scraping Complete!");
    });
});

app.get("/articles", function(req,res) {
        db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
    });
});

app.get("./articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
    .populate('note')
    .then (function(dbArticle) {
        res.json(dbArticle); 
    })
    .catch (function(err) {
        res.json(err);
    });
});

//creating route for saving/updating any article's associating with its certain Note
app.post('./articles/:id', function (req, res) {
    db.Note.create(req.body) 
    .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then (function(dbArticle) {
        res.json (dbArticle);
    })
    .catch (function(err) {
        res.json (err);
    });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});



