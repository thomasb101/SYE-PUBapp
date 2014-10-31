
// Make a post more popular
var posts = require('../models/post.js'); // Importing the functions that work with the post collections

module.exports = function(request, response) {
    var url= request.url;
    var index = url.lastIndexOf("/");
    var upvote = 1;
    var upPost = url.substring(index+1,url.length);

    posts.update(upvote, upPost, function(success) {
        if (success) {
            response.redirect(request.body.route);
        }
        });
    
}