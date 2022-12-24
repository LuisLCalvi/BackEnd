const express = require("express")
const session = require("express-session")
const path = require("path")
const MongoStore = require ("connect-mongo")
const config = require("../connection")
const passport = require("../config/passportConfig")
const {webAuth} = require("../auth/index")
const { faker } = require("@faker-js/faker");
const Producto = require("../DAOs/productos.daos")
const {fork} = require("child_process")
const cluster = require("cluster")
const http = require("http")
const numCPUs = require("os").cpus().length

const pino = require('pino');

const loggerError = pino('error.log')
const loggerWarn = pino('warning.log')
const loggerInfo = pino()

loggerError.level = 'error'
loggerWarn.level = 'warn'
loggerInfo.level = 'info'


const forked = fork("child.js")
const products = new Producto();

const router = express.Router();
router.use(passport.initialize());


router.use(session({
    secret: 'TOP SECRET',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cxnStr }),
    cookie: {
        maxAge: 600000
    }
}))
router.use((req,res,next) =>{
    loggerInfo.info(`Peticion entrante ------> Ruta: ${req.url}, metodo ${req.method}`)
    next()
})

router.use('*', (req,res) =>{
    loggerWarn.warn('ruta incorrecta');
    loggerInfo.warn('ruta incorrecta');
    res.send('ruta incorrecta');
})
router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/home', (req, res) => {
    const username = req.session.username
    res.render(path.join(process.cwd(), '/views/home.ejs'),{username}) 
})
router.get('/register', (req, res)=>{
    res.sendFile(path.join(process.cwd(), ('/views/partials/register.html')))

})

router.get('/userData', (req,res) =>{
    res.json({message: 'User logged in'})
})


router.get('/login', (req, res) => {
    const username = req.session.username
    if (username) {
        res.redirect('/home')
    } else {
        loggerError.error('Se ha producido un error al ingresar datos')
        loggerWarn.error('Se ha producido un error al ingresar datos')
        res.sendFile(path.join(process.cwd(), '/views/partials/login.html'))
    }
})

router.get("/login-error", (req, res) =>{
    res.sendFile(path.join(process.cwd(), '/views/partials/login-error.html'))
})

router.get('/logout', (req, res) => {
    const username = req.session.username
    if (username) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/views/logout.ejs'), {username})
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
});


router.post(
	"/register",
	passport.authenticate("register", {
		successRedirect: "/login",
		failureRedirect: "/login-error",
        failureFlash: true
	})
);

router.post('/login', 
    passport.authenticate("login",{
        successRedirect: "/home",
        failureRedirect: "/login-error",
        failureFlash: true

    }
    )
    )


router.post("/home", (req, res) => {
	const product = req.body;
	products.put(product);
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }

	res.redirect("/home");
});

router.post('/login', (req, res) => {
    console.log(req.session)
    console.log(req.body)
    

    req.session.username = req.body.username

    res.redirect('/home')
})

router.get("/api/productos-test", (req, res) => {
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }

    res.render('test.ejs', { response: response })
})

//FORK

router.get('/api/randoms', (req,res) =>{
    const random = req.query.cant || 100000000
    forked.send(random)
    forked.on('message', (msg) => {res.end(msg)})
})


//INFORMACION DE PROCESS
router.get("/info", (req, res) => {

    const info = [{pid: process.pid,
            version: process.version,
            id:process.id,
            memoria:process.memoryUsage().rss,
            sistemaOperativo:process.platform,
            carpeta:process.cwd(),
            path:process.argv[0],
            argumento:process.argv.slice(2),

            'numero De Procesadores': numCPUs
            }]
            if(info)
            res.status(200).json(info);
            else{
                loggerError.error('Se ha producido un error al ingresar datos')
        loggerWarn.error('Se ha producido un error al ingresar datos')
                res.status(404).send({ message: "No encontrado"})
            }	
    });

module.exports = router;