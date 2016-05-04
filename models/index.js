var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false,
		isAlphanumeric: true,
		unique: true
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	status: {
		type: Sequelize.ENUM('open', 'closed'),
		defaultValue: 'open'
	}
}, {

	hooks: {
		beforeValidate: function(page){
			var pageurl;

			if(!page.title) {
				pageurl = Math.random().toString(36).substring(2, 7); //what about random repeats?
			} else {
				pageurl = page.title.replace(/\s/g, '_').replace(/\W/g, "");
			}
			page.urlTitle = pageurl;
		}
	},
	getterMethods : {
		route: function(){ return '/wiki/' + this.urlTitle; }
	},

});

var User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		isEmail: true,
		unique: true
	}
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
	Page: Page,
	User: User
};

