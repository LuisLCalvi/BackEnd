
const express = require("express");

const { Carrito } = require ("../api/carrito");

const routerC = express.Router();
const carrito = new Carrito();


routerC.get("/:id/productos", async (req, res) =>{
    carrito.getAllCarrito().then(listaCarritos =>{
        res.send (listaCarritos)
    });
});

routerC.post("/", async (req, res) =>{
    const carritoCreado = await carrito.agregandoCarrito();
    res.send(carritoCreado);
    
});

routerC.delete("/:id", async (req, res) =>{
   const carritoBorrado = await carrito.deleteByIdCarrito(req.params.id);
   res.send(carritoBorrado);
});

routerC.post("/:id/productos", async (req, res) =>{
   
});

routerC.delete("/:id/productos/:idPrd", async (req, res) =>{
    const productoBorrado = await carrito.deleteProd(
        req.params.idPrd,
        req.params.id
    );
    res.send(productoBorrado);
});


module.exports = { routerC };
