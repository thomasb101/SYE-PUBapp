// Route that removes a post
var posts = require('../models/post.js');
module.exports = function(request, response) {
    var url= request.url;
    var index = url.lastIndexOf("/");
    var post = url.substring(index+1,url.length);
    
    posts.remove(post, function(success) {
        if (success) {
            response.redirect(request.body.route);
        }
    }); //remove all post from user that matches title
    
}