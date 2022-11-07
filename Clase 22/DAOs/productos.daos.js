
const mongoose = require("mongoose");
const ProductoModel = require("../models/productos.models")


 class Producto{
    constructor(){
        this.url = "mongodb+srv://LautaroC:Lautaro2022@cluster0.t0dklcq.mongodb.net/?retryWrites=true&w=majority";
        this.mongodb = mongoose.connect
        this.mongodb(this.url)
    }

    async save(prod){
        try{
            await this.mongodb(this.url)
            const result = await prod.save();
            return result;
        }catch (err){
            return err 

        }
    }

    async createData(prod){
        try{
            await this.mongodb(this.url)
            const newProduct = await this.save(new ProductoModel({
                title: prod.title,
                price: prod.price,
                thumbnail: prod.thumbnail
            })
            );
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

}
module.exports = Producto;
