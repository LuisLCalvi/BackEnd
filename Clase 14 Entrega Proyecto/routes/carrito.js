
const express = require("express");
const { Carrito } = require ("../api/carrito");

const routerC = express.Router();
const carrito = new Carrito();


routerC.get("/:id/productos", async (req, res, next) =>{
    try{
        if(!Number.isNaN(req.params.id)){
            const carro = await carrito.get(Number(req.params.id));
            res.status(200).json(
                carro?.productos ?? {error: "el carrito no fue encontrado"}
            );
        } else {
            res.status(400).json({ error: "parametro incorrecto"});
        }
    }catch(error){ next(error)};
});

routerC.post("/", async (req, res, next) =>{
    try{
        const chango = await carrito.save();
        res.status(200).json(
            chango ?? {error: "no se pudo registrar el carrito"}
        );
    } catch (error) {
        next(error);
    }
});

routerC.delete("/:id", async (req, res, next) =>{
    try{
        if (!Number.isNaN(req.params.id)){
            const resultado = await carrito.delete(Number(req.params.id));
            res.status(200).json(
                resultado !== null
                ? {mensaje: `se elimino el carrito con el id: ${resultado}`}
                : { error: "carrito no encontrado"}
            );
        } else{ 
            res.status(400).json({
                error: "el parametro establecido no es un numero"
            });
        }
    } catch (error){
        next(error);
    }
});

routerC.post("/:id/productos", async (req, res, next) =>{
    try{
        if (!Number.isNaN(req.params.id)){
            const resultado = await carrito.saveProducto(
                Number(req.params.id),
                req.body
            );
            res.status(200).json(
                resultado !== null
                ?{
                    mensaje: `se agrego al carrito con el id: ${resultado.id}, el producto ${req.body.id}`
                }
                : { error: "carrito o producto no encontrado"}
            );
        } else{
            res.status(400).json({
                error: "el parametro establecido no es un numero",
            });
        }
    } catch(error){
        next(error)
    }
});

routerC.delete("/:id/productos/:id_prod", async (req, res, next) =>{
    try{
        if (!Number.isNaN(req.params.id) && !Number.isNaN(req.params.id_prod)){
            const result = await carrito.deleteProducto(
                Number(req.params.id),
                number(req.params.id_prod)
            );
            res.status(200).json(
                result !== null
                ?{
                    mensaje: `se elimino del carrito con el id: ${result.id}`
                }
                :{ error: "carrito o producto no encontrado"}
            );
        } else{
            res.status(400).json ({
                error: "el parametro enviado no es un numero",
            });
        }
    } catch (error){
        next (error)
    }
});


module.exports = { routerC };
