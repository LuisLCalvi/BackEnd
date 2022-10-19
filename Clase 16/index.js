const express = require("express");
const {Contenedor} = require("./contenedor");
const {Mensajes} = require("./mensajes");
const {optionsMariaDB} = require("./mariaDB")
const {optionSqlite} = require ("./DB/ecommerce");
const { Tablas } = require("./tablas");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const router = express.Router()
const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


let prod = new Contenedor("productos", optionsMariaDB)
let msj = new Mensajes("mensajes", optionSqlite)

io.on("connection", async (socket)=>{
    console.log("Un nuevo usuario se ha conectado")

    let productos = await prod.getAll();
    let mensajes = await msj.getAll();



    socket.emit('messages', mensajes);

    socket.on("new.message", async (data)=>{
        data.date = new Date().toLocaleDateString()
        mensajes.push(data);
        msj.addMessage(data);

        console.log(data)
        io.sockets.emit("messages", mensajes);
    });


    socket.emit("listaProductos", productos);
    socket.on("newProduct", async (data) =>{
        await prod.addProduct(data);

        io.sockets.emit("listaProductos", productos)
    })
})


app.use(express.static("./public/public"));



app.set("socketio", io);

app.use("/", router);


router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post("/", (req, res) =>{
    const producto = req.body;
    prod.addProduct(producto);
    res.redirect("/");
});

async function comienzo (){
    const iniciando = new Tablas();

    let prod = await iniciando.prod();
    let mssj = await iniciando.mssj();
}

comienzo();


httpServer.listen(PORT, () =>console.log("servidor levantado"));