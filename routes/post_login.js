// Login page: try to login
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
// Gets the username and password and atempts to login
    var name = validator.escape(request.body.name);
    var password = validator.escape(request.body.password);
    
    users.retrieve(name, password, function(success, banned) {
        
        if (banned === true) {
            request.session.error = 'Banned user cannot login'
            response.render('login', {error:request.session.error});
            delete request.session.error;
        }
        
        else if (success) {
            request.session.username = name;
                response.redirect('/');
        }
        
        else {
            request.session.error = 'Wrong username or password';
            response.render('login', {error:request.session.error});
            delete request.session.error;
        }
    });
};