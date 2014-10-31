// Profile page: profile or redirect
var posts = require('../models/post');
var subscribed = require('../models/subscribers');

module.exports = function(request,response) {
    
    var username = request.session.username;
    // If the user is logged in then render some version of the blueit home page
    if (username) {
        // If the user is admin then render the admin options on the page too
        if (username === 'admin') {
            posts.retrieve(function(posts) {
		response.render('blueit', {posts:posts , username:username, route:'/profile'});
            });
        }
        // Otherwise render the profile page for the user
        else {
            subscribed.get_subscribees(username, function(subscribees) {
                var list = [];
                for (var i = 0; i<subscribees.length; i++) {
                        list.push(subscribees[i].Subscribee);
                };
                posts.retrieve_subscribed(list, function(posts) {
                        response.render('blueit', {posts:posts , username:username, list:list, route:'/profile'});
                });	
	    });	
        }
    }
    
    else {
        response.redirect('/');
    }
};