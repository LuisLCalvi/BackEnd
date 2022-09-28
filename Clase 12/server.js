const express = require("express");
const PORT = 8080;
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
app.get("/", (req, res) => {
	res.sendFile("index.html");
});



const mensajes = [
    {
        usuario: "Atencion al Cliente",
        texto: "Hola  muy buenos dias, contanos ¿En qué te podemos ayudar?"
    }
];

const productos = [

	{
		
		"title": "Frutilla",
		"price": 100,
		"thumbnail": "https://jumboargentina.vtexassets.com/arquivos/ids/421110/Frutilla-Por-Kg-1-10917.jpg?v=636481016510630000"
	  },
];

io.on("connection", (socket) => {
	console.log("se conecto un usuario");

	socket.emit("mensajes", mensajes);

	socket.on("new-mensaje", (data) => {

		mensajes.push(data);
		io.sockets.emit("mensajes", mensajes);
	});	

socket.emit("productos", productos);

	socket.on("new-producto", (data) =>{
		productos.push(data);
		io.sockets.emit("productos", productos)
	})

});

httpServer.listen(8080, () => console.log("servidor Levantado"));