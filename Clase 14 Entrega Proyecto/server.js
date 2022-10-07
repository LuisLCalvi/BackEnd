
const express = require("express");
const { routerC } = require ("./routes/carrito");
const { routerP } = require ("./routes/productos")
const app = express ();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerP)
app.use("api/carritos", routerC);

const PORT = 8080;
const server = app.listen(PORT, () =>{
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));