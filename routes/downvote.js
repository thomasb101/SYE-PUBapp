var posts = require('../models/post.js'); // Importing the functions that work with the post collections


module.exports = function(request, response) {
    var url= request.url;
    var index = url.lastIndexOf("/");
    var vote = -1;
    var idPost = url.substring(index+1,url.length);;

    posts.update(vote, idPost, function(success) {
        if (success) {
            response.redirect(request.body.route);
        }
        });
};