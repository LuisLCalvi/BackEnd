import mongoose from 'mongoose'
import ProductoModel from '../models/ProductoModel.js';

export default class Producto{

    constructor(){
        this.url = "mongodb+srv://LautaroC:Lautaro2022@cluster0.t0dklcq.mongodb.net/?retryWrites=true&w=majority";
        this.mongodb = mongoose.connect
    }

    async createData (prod){
    try{
        await this.mongodb(this.url);
        const newProduct = new ProductoModel(prod);
        return await newProduct.save();
    } catch(err){
        return {error: "No se pudo crear el producto"}
    }
    }

    async getById(id){
        try{
            await this.mongodb(this.url);
            return await ProductoModel.findById(id)
        }catch (err){
            return {error: "No existe el producto"}
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

    async put (id, prod){
        try{

            await this.mongodb(this.url);
            return await ProductoModel.findByIdAndUpdate(id, prod);
        }catch (err){
            return {error: "No se pudo actualizar el producto"}
        }
    }

    async borrar(id){
        try{
            await this.mongodb(this.url);
            return await ProductoModel.findByIdAndDelete(id);
        }catch (err){
            return {error: "No se pudo eliminar el producto, no existe"}
        }
    }
}