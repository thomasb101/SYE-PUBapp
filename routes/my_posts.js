
// The route that retrieves all the posts made by current user
var posts = require('../models/post');
var subscribed = require('../models/subscribers');

module.exports = function(request,response) {
    
    var username = request.session.username;
    
    if (username) {
            posts.retrieve_my_posts(username, function(posts) {
		response.render('blueit', {posts:posts , username:username, list:[], route:'/profile'});
            });
    }
    else {
        response.redirect('/');
    }
};