module.exports = function(request, response) {
        response.render('ban', {error:request.session.error});
}
