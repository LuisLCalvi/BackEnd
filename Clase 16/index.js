const { optionsMariaDB } = require ("./mariaDB");
const { optionSqlite } = require("./DB/ecommerce")
const knexMariaDB = require ("knex")(optionsMariaDB);
const knexSqlite = require ("knex")(optionSqlite);
const express = require("express");
const PORT = 8080;
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const {Productos} = require("./productos")
const {Mensajes} = require ("./mensajes");


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);



const mensajes = new Mensajes();

const productos = new Productos();
    
app.use(express.static("./public"));

app.set("socketio", io);

io.on("connection", async (socket) =>{
    console.log ("se conecto un usuario nuevo")

socket.emit("getproductos", productos);

socket.on("producto", async (data)=>{
    await productos.save(data);
    io.sockets.emit("productos", await productos.getAll());



socket.emit("mensajes", await mensajes.getAll());
socket.on("mensaje", async (data)=>{
    const fecha = new Date();
    await mensajes.save({
        ...data,
        fecha: fecha.toLocaleString("es-AR"),
    });
    io.sockets.emit ("mensajes", await mensajes.getAll());
});

});});

httpServer.listen(8080, () => console.log("servidor Levantado"));

//Creando Tabla Productos
  
/*
knexMariaDB.schema.createTable(tablaProductos, (table)=>{
        table.increments("id"),
        table.string("nombre"),
        table.float("precio"),
        table.string("imagen"),
        table.datetime("timeStamp")
    })
    .then(()=>{
        console.log("tabla de productos creada")
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        knexMariaDB.destroy()
    });*/
//Creando Tabla Mensajes
 

/*
   knexSqlite.schema.createTable(tablaMensajes, (table)=>{
        table.increments("id"),
        table.string("email"),
        table.string("message"),
        table.datetime("fechaHora")
    })
    .then(()=>{
        console.log("tabla de mensajes creada")
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        knexSqlite.destroy()
    });  
*/