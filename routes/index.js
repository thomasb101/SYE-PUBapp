// Index page: home page, or login

var posts = require('../models/post');
var subscribed = require('../models/subscribers');

module.exports = function(request, response) {
	var username = request.session.username;
	subscribed.get_subscribees(username, function(subscribees) {
		var list = [];
		for (var i = 0; i<subscribees.length; i++) {
			list.push(subscribees[i].Subscribee);
		};
		posts.retrieve(function(posts) {
			response.render('blueit', {posts:posts , username:username, list:list, route:'/'});
		});
	});
};