'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var models = require('../models');
var Page = models.Page; 
var User = models.User; 
var Promise = require('sequelize').Promise;

router.get('/', function(req,res,next){
	User.findAll()
	.then(function(users){
		res.render('users', {
			users: users
		});
	}).catch(console.error);
});

router.get('/:id', function(req,res,next){
	var user = User.findOne({
		where: {
			id: req.params.id
		}
	});
	var page = Page.findAll({
		where: {
			authorId: req.params.id
		}
	});

	var queries = [user,page];

	Promise.all(queries)
	.then(function(data){
		res.render('user', { 
			name: data[0].name,
			email: data[0].email,
			pages: data[1]
		});
	}).catch(console.error);
})


module.exports = router;