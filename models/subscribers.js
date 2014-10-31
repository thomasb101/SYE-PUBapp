var mongojs = require('mongojs');


var db = mongojs('blueit', ['subscriptions']);

//method that inserts to db
// Do I need a callback here to redirect to the right page after subscribing?
module.exports.subscribe = function(subscriber, subscribee, callback) {
    db.subscriptions.findOne({Subscriber:subscriber, Subscribee:subscribee}, function(error, result) {
        if (!result) {
            db.subscriptions.insert({Subscriber:subscriber, Subscribee:subscribee}, function(error) {
                if (error) throw error; //column:what_i_wanna_insert
                callback();
            });
        }
        else {
            callback();
        }
    });
    
};



//method that retrieves matching title from db
// Do I need a callback here to redirect to the right page after unsubscribing?
module.exports.unsubscribe = function(subscriber, subscribee, callback) {
    db.subscriptions.remove({Subscriber:subscriber, Subscribee:subscribee},function(error) {
        if (error) throw error;
        callback();
    });
};


//method that extracts all the users that a user is subscribed to
module.exports.get_subscribees = function(username, callback) {
    db.subscriptions.find({Subscriber:username}, function(error, subscribees) {
        if (error) throw error;
        
        else {
            callback(subscribees);
        }
    });
};

