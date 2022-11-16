
const Router = require ("express")
const {webAuth} = require ("../auth/index")
const path = require("path")

const showProd = new Router();

showProd.get('/home', webAuth, (req, res) => {
    res.render(path.join(process.cwd(), '/views/home.ejs'),
        { name: req.session.name })
})

module.exports = showProd;
