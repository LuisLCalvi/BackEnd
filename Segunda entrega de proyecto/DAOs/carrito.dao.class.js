import Producto from "./productos.dao.class.js"
import mongoose from 'mongoose'
import CarritoModel from "../models/CarritoModel.js";


export default class Carrito{
    constructor(){
        this.url = "mongodb+srv://LautaroC:Lautaro2022@cluster0.t0dklcq.mongodb.net/?retryWrites=true&w=majority";
        this.mongodb = mongoose.connect
        this.producto = new Producto();
    }

    async crearCarrito(carr) {
		try{
			await this.mongodb(this.url);
			const newCart =  new CarritoModel(carr);
			return await newCart.save();

		}catch(err){
			return { error: "No se pudo crear el carrito" }
			
		}
	}

    async listar(id) {
		try{
			await this.mongodb(this.ulr);
			return await CarritoModel.findById(id)
        }catch(error){
            return {error: "No existen carritos para visualizar"}}
}

async listarAll(){
    try{
        await this.mongodb(this.url);
        return await CarritoModel.find();
    }catch(err){
        return {error: "No existen carritos para visualizar"}
    }
}

async borrar(id){
    try{
        await this.mongodb(this.url);
        return await CarritoModel.findByIdAndDelete(id);
    }catch (err){
        return {error: "No se pudo eliminar el carrito"}
    }
}

async borrarProd(idProd, idCarrito){
    try{
        await this.mongodb(this.url);
        const prod = await this.producto.getById(idProd);
        return await CarritoModel.findByIdAndUpdate(idCarrito, { $pull: {productos: prod}})
    }catch (err){
        return {error: "No se pudo eliminar el producto"}
    }
}

async listarProd(id){
    const carProd = await this.listar(id);
    return carProd.productos;
}


async guardarProductoEnCarrito(idProd, idCarrito){
    await this.mongodb(this.url);
    const prod = await this.producto.getById(idProd);
    return await CarritoModel.findByIdAndUpdate({_id: idCarrito }, {$push: {productos: prod}});
}






}	