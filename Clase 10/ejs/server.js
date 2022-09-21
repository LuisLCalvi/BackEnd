const ejs = require("ejs");
const express = require("express");
const  Productos = require("./api/productos");

let productos = new Productos();

const app = express();

//--------------------------------------------
//establecemos la configuración de EJS

app.set("view engine", "ejs");
//--------------------------------------------

app.use(express.static("public"));

const router = express.Router();
app.use("/api", router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.render('formulario', productos)
})

app.post("/api/productos/guardar", (req, res) => {
	let producto = req.body;
	productos.guardar(producto);
       res.render('tabla', productos)
 

	res.redirect("/");
});
const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
