'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

var User = require('./user');

var Article = db.define('article', {
		title : {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty : true
			}
		},
		content:{
			type: Sequelize.TEXT,
			allowNull: false,
		},
	},
	{
		getterMethods: {
			snippet : function(){
				if(!this.content){
					return '';
				}
				var string = '';
				var snippedChars = 23;
				for(var i = 0; i < snippedChars; i++){
					string += this.content[i];
				}
				return string + '...';
			}
		},

	}
);

Article.belongsTo(User, {as: 'author'});

Article.findByTitle = function(title){
	return Article.findOne({where: {title}});
}

Article.prototype.truncate = function(n){
	return this.content = this.content.substring(0, n);
}

module.exports = Article;
