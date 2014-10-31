var posts = require('../models/post.js'); // Importing the functions that work with the post collections


module.exports = function(request, response) {
    var link = request.body.link; //get link input
    var descr = request.body.description; //get description input
    var user = request.session.username;
    posts.add(user, link, descr, function(callback) {
        response.redirect('/profile');
        });
};