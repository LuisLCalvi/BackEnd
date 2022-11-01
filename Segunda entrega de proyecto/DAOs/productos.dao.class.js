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
        console.log(err)
    }
    }

    async getById(id){
        try{
            await this.mongodb(this.url);
            return await ProductoModel.findById(id)
        }catch (err){
            console.log (err)
        }
    }

    async getAll(){
        try{
            await this.mongodb(this.url)
            return await ProductoModel.find()
        }catch (err){
            console.log (err)
        }
    }

    async save(prod){

        try{}catch (err){
            console.log (err)
        }
    }

    async put (id, prod){
        try{

            await this.mongodb(this.url);
            return await ProductoModel.findByIdAndUpdate(id, prod);
        }catch (err){
            console.log (err)
        }
    }

    async borrar(id){
        try{
            await this.mongodb(this.url);
            return await ProductoModel.findByIdAndDelete(id);
        }catch (err){
            console.log (err)
        }
    }
}