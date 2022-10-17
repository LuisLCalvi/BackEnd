
const express = require("express");

const { Carrito } = require ("../api/carrito");

const routerC = express.Router();
const carrito = new Carrito();


routerC.get("/:id/productos", async (req, res) =>{
    carrito.listarAll().then(listaCarritos =>{
        res.send (listaCarritos)
    });
});

routerC.post("/", async (req, res) =>{
    const carritoCreado = await carrito.crearCarrito();
    res.send(carritoCreado);
    
});

routerC.delete("/:id", async (req, res) =>{
   const carritoBorrado =  await carrito.listar(req.params.id);
   res.send(carritoBorrado);
});

routerC.post("/:id/productos", async (req, res) =>{
    carrito.listar().then(listaCarritos =>{
        res.send (listaCarritos)
   
});

routerC.delete("/:id/productos/:idPrd", async (req, res) =>{
    const productoBorrado = await carrito.deleteProd(
        req.params.idPrd,
        req.params.id
    );
    res.send(productoBorrado);
});


module.exports = { routerC };
