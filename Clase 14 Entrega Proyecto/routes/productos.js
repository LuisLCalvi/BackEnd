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

    routerP.get("/", async (req,res) =>{
        producto.getAll().then(listaProductos => {
            res.send(listaProductos);
            })
    });

    routerP.get("/:id", async (req, res) =>{
        const productoBuscado = Number(req.params.id);
        const cont = await producto.getById(productoBuscado);
        res.send(cont);
    });

    routerP.post("/", validarAdmin, async (req, res) =>{
        console.log(req.body);
        producto.save(req.body).then(productoCreado =>{
            res.send(productoCreado)
        })
    });

    routerP.put("/:id", validarAdmin, async (req, res) =>{
        const {nombre, descripcion, codigo, img, precio, stock, timeStamp} = req.body;
        const id = await producto.put(Number(req.params.id), {nombre, descripcion, codigo, img, precio, stock, timeStamp});
        res.json(id)
       
    });

    routerP.delete(":/id", validarAdmin, async (req, res) =>{
        const productoBorrado = await producto.deleteById(req.params.id);
        res.send(productoBorrado);
    });

    module.exports = { routerP };


