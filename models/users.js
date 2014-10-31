// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('blueit', ['users']);

// Register a new user
module.exports.create = function(name, password, callback) {
    
    bcrypt.hash(password, 10, function(error,hash) {
        if (error) throw error;
        
        db.users.findAndModify({
            query: {name:name},
            update: {$setOnInsert:{password:hash, banned:false}},
            new: true,
            upsert: true
            
        }, function(error, user) {
            if (error) throw error;
            callback(user.password == hash);
        });
    });
};

// Verify login credentials
module.exports.retrieve = function(name, password, callback) {
    
    db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false, false);
        }

        else {
            if (user.banned) {
                callback(false, true);
            } else {
                bcrypt.compare(password, user.password, function(error, success) {
                    if (error) throw error;
                    
                    callback(success, false);
                });
            }
        }
    });
};

// Ban a user
module.exports.ban = function(name, callback) {
    
    db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        
        else {
            db.users.update({name:name}, {$set : {banned: true}}, function(error, success) {
                if (error) throw error;
                callback(success);
            });
        }
    });
};

// Un-ban a user
module.exports.unban = function(name, callback) {
    
    db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        
        else {
            db.users.update({name:name}, {$set : {banned: false}}, function(error, success) {
                if (error) throw error;
                callback(success);
            });
        }
    });
};

// Delete all users
module.exports.deleteAll = function(callback) {
    db.users.remove({}, function(error) {
        if (error)  {
            throw error;
        }
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