require('dotenv').config()
const mongoose = require("mongoose");
const OrderModel = require("../models/order.models")
const Cart = require('./cart.daos')

const credencial = process.env.CREDENCIAL

const cartClass = new Cart()

class Order{
    constructor(){
        this.url = credencial;
        this.mongodb = mongoose.connect
        this.mongodb(this.url)
        this.cart = new Cart();

    }

    async createOrder(carr){
        try {
			await this.mongodb(this.url);
			const newOrder = new OrderModel(carr);
			return await newOrder.save();

		} catch (err) {
			console.log(err);
			return { error: "No se pudo crear el carrito" }
		}
        
    }

    async addCartToOrder(idCart,idOrder){
        await this.mongodb(this.url);
        const order = await this.getById(idOrder);
        const cart = await cartClass.listar(idCart);
        if(order)
        return await OrderModel.findByIdAndUpdate({ _id: idOrder}, {$push: { carrito: cart }});
    }

    async getById(id){
        try{
            await this.mongodb(this.url)
            return await OrderModel.findById(id)
        }catch(error){
            return { error: "No existen ordenes"}
        }
    }

    async getAll(){
        try{
            await this.mongodb(this.url)
            return await OrderModel.find()
        }catch(error){
            return { error: "No existen ordenes"}
        }
    }
}




module.exports = Order;
