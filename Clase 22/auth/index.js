 function webAuth(req, res, next) {
    if (req.session?.username) {
        next()
    } else {
        res.redirect('/login')
    }
}

function apiAuth(req, res, next) {
    if (req.session?.username) {
        next()
    } else {
        res.status(401).json({ error: 'An error ocurred' })
    }
}

module.exports = {webAuth, apiAuth};