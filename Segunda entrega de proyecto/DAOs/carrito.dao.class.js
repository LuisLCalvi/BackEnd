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
			console.log(err);
			
		}
	}

    async listar(id) {
		try{
			await this.mongodb(this.ulr);
			return await CarritoModel.findById(id)
        }catch(error){
            console.log(error)}
}

async listarAll(){
    try{
        await this.mongodb(this.url);
        return await CarritoModel.find();
    }catch(err){
        console.log(err)
    }
}

async borrar(id){
    try{
        await this.mongodb(this.url);
        return await CarritoModel.findByIdAndDelete(id);
    }catch (err){
        console.log (err)
    }
}

async deleteProduct (id, prodId) {
    try{
        const carts = await this.listarAll()
        const cartIndex = carts.findIndex((e) => e.id == id)

        if (cartIndex >= 0){
            const productInCart = carts[cartIndex].productos
            const prodToDeleteIndex = productInCart.findIndex((e) => e.id == prodId)

            if (prodToDeleteIndex >= 0){
                productInCart.splice(prodToDeleteIndex, 1)
                await this.collection.updateOne(
                    {id: id},
                    {
                        $set: { productos: productInCart },


                    }
                )
                    return true
                
            }
            else { return false
            }
        

        }else { return false}
    }catch (err){
        console.log(err)
    }
}




}	