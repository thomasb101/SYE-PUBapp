// Ban page: try to unban a user
var users = require('../models/users');
var validator = require('validator');


module.exports = function(request,response) {

    var name = validator.escape(request.body.name);
    
    users.unban(name, function(success) {
        if (success) {
            response.render('unban_success');
        }
        
        else {
            request.session.error = 'Could not un-ban user';
            response.render('ban', {error:request.session.error});
            delete request.session.error;
        }
    });
};