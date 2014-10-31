// Registration page: try to register
var users = require('../models/users');
var validator = require('validator');


module.exports = function(request,response) {

    var name = validator.escape(request.body.username);
    var password = validator.escape(request.body.password);
    users.create(name, password, function(success) {
        
        if (success) {
            request.session.username = name;
            response.render('registration_success');
        }
        
        else {
            request.session.error = 'Username '+name+' is not available.';
            response.render('registration_fail', {error:request.session.error});
            delete request.session.error;
        }
    });
};