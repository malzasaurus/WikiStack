'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var models = require('../models');
var Page = models.Page; 
var User = models.User; 
var Promise = require('sequelize').Promise;




router.get('/', function(req, res, next){
	res.redirect('/');
});

router.post('/', function(req, res, next){

	User.findOrCreate({
		where: {
			name: req.body.name,
			email: req.body.email
		}
	}).then(function(values){
		var user = values[0];
		console.log(user);
		
		return Page.create({
			title: req.body.title,
			content: req.body.content,
			status: req.body.status,
		}).then(function(page){
			return page.setAuthor(user);
		});
	}).then(function(data){
		res.redirect(data.route);
	})
	.catch(console.error);

});

router.get('/add', function(req, res, next){
	res.render('addpage');
});

router.get('/:title', function(req, res, next){
	Page.findOne({
	    where: {
	        urlTitle: req.params.title
	    },
	    include: [
	        {model: User, as: 'author'}
	    ]
	})
	.then(function (page) {
	    // page instance will have a .author property
	    // as a filled in user object ({ name, email })
	    if (page === null) {
	        res.status(404).send();
	    } else {
	        res.render('wikipage', {
	            page: page
	        });
	    }
	})
	.catch(console.error);

});

module.exports = router;