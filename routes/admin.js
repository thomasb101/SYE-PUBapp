// Profile page: profile or redirect
var posts = require('../models/post');
module.exports = function(request,response) {
    
    var username = request.session.username;
    
    if (username) {
        response.render('blueit', {posts:posts, username:username});
    }
    
    else {
        response.redirect('/');
    }
};