const express = require("express")
const session = require("express-session")
const path = require("path")
const MongoStore = require ("connect-mongo")
const config = require("../connection")
const passport = require("../controllers/config/passportConfig")
const {webAuth} = require("../controllers/auth/index")
const { faker } = require("@faker-js/faker");
const http = require("http")

const pino = require('pino');

const loggerError = pino('error.log')
const loggerWarn = pino('warning.log')
const loggerInfo = pino()

const Productos = require('../DAOs/productos.daos')
const Chat = require('../DAOs/chat.daos')

loggerError.level = 'error'
loggerWarn.level = 'warn'
loggerInfo.level = 'info'

const chat = new Chat()

const products = new Productos()

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

// router.use('*', (req,res) =>{
//     loggerWarn.warn('ruta incorrecta');
//     loggerInfo.warn('ruta incorrecta');
//     res.send('ruta incorrecta');
// })
router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/home', async (req, res) => {
    const username = req.session.username
    const prods = await products.getAll()

    res.render(path.join(process.cwd(), "/views/home.ejs"), { username, productos: prods, hayProducts: prods.length });
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
                res.render(path.join(process.cwd(), '/views/logout.ejs'), { username })
            } else {
                res.redirect('/login')
            }
        })
    } else {
        res.redirect('/login')
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
    ),
    function (req, res) {
        res.render("home", { username: req.body.username });
    }
    )

    router.get('/chat', async (req,res) =>{
        const chats = await chat.getAll();
        res.send(chats)
    })


router.post("/home", (req, res) => {
	const product = req.body;
	products.put(product);
    // let response = [];
    // for (let index = 0; index <= 1; index++) {
    //     response.push({
    //         title: faker.commerce.product(),
    //         price: faker.commerce.price(),
    //         thumbnail: faker.image.image()
    //     });
    // }

	res.redirect("/home");
});

router.post("/", (req, res) => {
	const producto = req.body;
	products.save(producto);
    res.json(producto);
});


// router.post('/login', (req, res) => {
//     console.log(req.session)
//     console.log(req.body)
    

//     req.session.username = req.body.username

//     res.redirect('/home')
// })

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


module.exports = router;