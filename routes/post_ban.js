// Ban page: ban a user
var users = require('../models/users');
var validator = require('validator');


module.exports = function(request,response) {

    var name = validator.escape(request.body.name);
    
    users.ban(name, function(success) {
        if (success) {
            response.render('ban_success');
        }
        
        else {
            request.session.error = 'Could not ban user';
            response.render('ban', {error:request.session.error});
            delete request.session.error;
        }
    });
};