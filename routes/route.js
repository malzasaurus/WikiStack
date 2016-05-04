'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

var ourObj = {};
router.get('/', function(req, res, next){
	res.render('index', ourObj);
	// res.sendFile(path.join(__dirname, '../views/'));
});


module.exports = router;