var subscribers = require('../models/subscribers.js'); // Importing the functions that work with the subscribers collection


module.exports = function(request, response) {
    var subscriber = request.session.username;
    var url = request.url;
    var index = url.lastIndexOf("/");
    var subscribee = url.substring(index+1, url.length);
    subscribers.subscribe(subscriber, subscribee, function(){
        response.redirect(request.body.route);
        });
    // I want to reload the page here I dont want to redirect it
    // Do the same for comment upvotes and downvotes
    
}