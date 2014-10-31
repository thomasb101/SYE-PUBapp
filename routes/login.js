module.exports = function(request, response) {
        response.render('login', {error:request.session.error});
}
