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

function validAdmin(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send("usted no tiene acceso");
	}
}


module.exports = {webAuth, apiAuth, validAdmin};