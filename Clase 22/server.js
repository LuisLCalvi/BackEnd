const express = require("express")
const prodRouter = require("./router/productos.router");
const Producto = require ('./DAOs/productos.daos');
const Message = require ('./DAOs/mensajes.daos')
const { faker } = require("@faker-js/faker");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require('dotenv').config()



const PORT = process.env.PUERTO || 8181;

const newSession = require("./router/newConnect")

const router = express.Router();
const app = express();

const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


const prod = new Producto();
const msg = new Message();
io.on("connection", async (socket) => {
    console.log('Usuario con id: ', socket.id, ' se ha conectado')

    let productos = await prod.getAll();
     let mensajes = await msg.getAll();

     socket.emit('messages', mensajes);

     socket.on("new-message", async (data) => {
        data.date = new Date().toLocaleDateString()
        msg.createData(data);

        console.log(data)
         io.sockets.emit("messages", mensajes);
     });


    
	socket.emit("productList", productos);


	socket.on("newProduct", async (data) => {
        await prod.createData(data);       

		io.sockets.emit("productList", productos)
	})
    socket.on("randomProduct",async(data) =>{
        await prod.createData(data);

        io.sockets.emit("productList", productos)
    })

})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));
app.set("socketio", io);



app.use("/", newSession);
app.use("/api/productos-test", prodRouter);


app.get("/api/productos-test", (req,res)=>{
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }

    res.render('test.ejs', {response: response})
})
router.post("/", (req, res) => {
	const producto = req.body;
	prod.createData(producto);
    console.log(`Router ${producto}`);
	res.redirect("/");
});

prodRouter.post("/", async (req, res) => {
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            id: 1,
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }
    console.log(response)
    prod.createData(response)
    res.redirect("/api/productos-test");
});








httpServer.listen(PORT, () => console.log("servidor Levantado"));
