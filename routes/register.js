// Renders the register page
module.exports = function(request,response) {
        response.render('register', {error:request.session.error});     
};