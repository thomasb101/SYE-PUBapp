var mongojs = require('mongojs');

var db = mongojs('blueit', ['posts']);

//method that inserts to db
module.exports.add = function(username, link, description, callback) {
    db.posts.insert({Username:username, URL:link, Description:description, count:0}, function(error, success) {
        if (error) throw error;
        callback(success);
        });
};

//method that retrieves all posts
module.exports.retrieve = function(callback) {
    db.posts.find().sort({count: -1},function(error, posts) {
        if (error) throw error;

        else {
            callback(posts);
        }
    });
};
//method that retrieves posts by username x
module.exports.retrieve_my_posts = function(username, callback) {
    
    db.posts.find({Username:username}).sort({count: -1},function(error, posts) {
        if (error) throw error;

        else {
            callback(posts);
        }
    });
};


//method that retrieves matching title from db
module.exports.retrieve_subscribed = function(subscribees, callback) {

    db.posts.find({Username:{$in: subscribees}}).sort({count: -1},function(error, posts) {
        if (error) throw error;

        else {
            callback(posts);
        }
    });
};

//method to update count in db
module.exports.update = function(increment, upPost, callback){
    db.posts.update({_id : mongojs.ObjectId(upPost)},{$inc : {count : increment } }, function(error, success) {
        if (error) throw error;
        else {
            callback(success.updatedExisting);
        }
    });
};


//method that deletes post from db
module.exports.remove = function(id, callback){
    db.posts.remove({_id : mongojs.ObjectId(id)}, function(error, success) {
        if (error) throw error;
        
        callback(success.n !== 0);
    });
};


module.exports.removeAll = function(callback) {
    db.posts.remove({}, function(error) {
        if (error) throw error;
        callback();
    });
};


// Close the connection
module.exports.close = function(callback) {
    db.close(function(error) {
        if (error) throw error;
        callback();
    })
    
};