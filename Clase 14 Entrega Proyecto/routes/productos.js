const express = require("express");

const { Productos } = require ("../api/productos");

const routerP = express.Router();

const producto = new Productos();

function validarAdmin (req, res, next){
    if (req.query.admin){
        next();
    } else{
        res.send ("usted no tiene acceso");
    }};

    routerP.get("/", async (req,res, next) =>{
        try{
            const product = await producto.getAll();
            res.status(200).json(product);
        } catch(error){
            next(error)
        }
    });

    routerP.get("/:id", async (req, res, next) =>{
        try{
            if (!Number.isNaN(req.params.id)){
                const product = await producto.getById(
                    Number(req.params.id)
                );
                res.status(200).json(
                    product ?? {error: "producto no encontrado"}
                );
            } else{
                res.status(400).json ({ error: "parametro incorrecto"});
            }

        }catch(error){
            next(error)
        }
    });

    routerP.post("/", validarAdmin, async (req, res, next) =>{
        try{
            if (
                req.body.nombre &&
                !Number.isNaN(req.body.precio) &&
                req.body.codigo &&
                !Number.isNaN(req.body.stock)){
                    const product = await producto.save(req.body);
                    res.status(200).json(
                        product ?? {error: "no se pudo registrar el produto"}
                    );
                } else{
                    res.status(400).json({
                        error: "no se pudo registrar el producto, por favor verifique el objeto enviado",
                    });
                }
        }catch(error){
            next(error);
        }
    });

    routerP.put("/:id", validarAdmin, async (req, res, next) =>{
        try{
            if(
                req.body.nombre &&
                !Number.isNaN(req.body.precio) &&
                req.body.codigo &&
                !Number.isNaN(req.body.stock)

            ){
                let {nombre, descripcion, codigo, img, precio, stock } = req.body;

                const product = await producto.update(
                    Number(req.params.id),
                    {
                        nombre,
                        descripcion,
                        codigo,
                        img,
                        precio,
                        stock,

                    }
                );
                res.status(200).json(
                    product ?? { error: "no se pudo actualizar el producto"}
                );
            } else {
                res.status(400).json({
                    error: "no se pudo actualizar el producto, por favor verifique el objeto enviado",
                });

            }
        }catch(error){
            next(error);
        }
    });

    routerP.delete(":/id", validarAdmin, async (req, res, next) =>{
        try{
            if (!Number.isNaN(req.params.id)){
                const resultado = await producto.delete(Number(req.params.id));
                res.status(200).json (
                    resultado !== null
                    ?{ mensaje: `se elimino el producto con el id: ${resultado}`}
                    : { error: "producto no fue encontrado"}
                );
            } else {
                res.status(400).json ({
                    error: "el parametro enviado no es un numero",
                });
            }
        }catch(error){
            next(error);
        }
    });

    module.exports = { routerP };


