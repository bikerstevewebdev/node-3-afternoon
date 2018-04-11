module.exports = {
    authenticate: (req, res, next) => {
        req.session.user = !req.session.user ? { username: '', cart: [], total: 0} : req.session.user 
        next()
    }
}