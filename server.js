var express = require('express');
var mongoose = require ('mongoose');

var axios = require('axios');
var cheerio = require('cheerio');

var db = require ('./models');

var PORT = 3000;

var app = express();

