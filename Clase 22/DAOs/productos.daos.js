
const mongoose = require("mongoose");
const { P } = require("pino");
const ProductoModel = require("../models/productos.models")

require('dotenv').config()

const credencial = process.env.CREDENCIAL

 class Producto{
    constructor(){
        this.url = credencial;
        this.mongodb = mongoose.connect
        this.mongodb(this.url)
    }

    async save(prod){
        try{
            await this.mongodb(this.url)
            const result = await prod.save();
            console.log(result);
            return result;
        }catch (err){
            return err 

        }
    }

    async createData(prod){
        try{
            await this.mongodb(this.url)
            const newProduct = await this.save(new ProductoModel({
                idProducto: prod.idProducto,
                title: prod.title,
                category: prod.category,
                price: prod.price,
                description: prod.description,

                thumbnail: prod.thumbnail
            })
            );
            console.log(`newProduct ${newProduct}`)
            return await newProduct
        } catch(err){
            console.log("hubo un error")
        }
    }

    async getById(id){
        try{
            await this.mongodb(this.url)
            return await ProductoModel.findById(id);
        }catch (err){
            console.log ("Producto no existente")
        }
    }
    async getAll(){
        try{
            await this.mongodb(this.url)
            return await ProductoModel.find()
        }catch (err){
            return {error: "No se pudeden visualizar los productos, no existen"}
        }
    }
async put(id,prod){
    try{
        await this.mongodb(this.url);
        return await ProductoModel.findByIdAndUpdate(id,prod)
    }catch(err){
        console.log("Ocurrio un error")
    }
}

async delete(id){
    try{
        await this.mongodb(this.url)
        return await ProductoModel.findByIdAndDelete(id);
    }catch (error){
        console.log("ocurrio un error al querer eliminar el producto")
    }
}


static returnSingleton(){
    if(!this.instance){
        this.instance = new Producto()
    }
    return this.instance
}

}
module.exports = Producto;
