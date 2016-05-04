'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes/route.js');
var path = require('path');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, '/views/')); // where to find the views
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', swig.renderFile); // how to render html templates
swig.setDefaults({ cache: false }); //for development

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); // would be for AJAX requests

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, function(){
	console.log('listening on port 3000');
});

app.use('/', routes);