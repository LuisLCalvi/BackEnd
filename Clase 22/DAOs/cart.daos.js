const mongoose = require("mongoose");
const Producto = require ("./productos.daos")
const CartModel = require("../models/cart.models")

require('dotenv').config()

const credencial = process.env.CREDENCIAL

 class Cart{
    constructor(){
        this.url = credencial;
        this.mongodb = mongoose.connect
        this.mongodb(this.url)
        this.producto = new Producto();

    }

    async crearCarrito(carr) {
		try {
			await this.mongodb(this.url);
			const newCart = new CartModel(carr);
			return await newCart.save();

		} catch (err) {
			console.log(err);
			return { error: "No se pudo crear el carrito" }
		}
	}

    async listar(id) {
		try {
			await this.mongodb(this.ulr);
			return await CartModel.findById(id)
		} catch (error) {
			return { error: "No existen carritos" }
		}
	}

    async listarProd(id) {
		const carrProd = await this.listar(id);
		console.log(carrProd.length);
		return carrProd.productos;

	}

    async listarAll() {
		try {
			await this.mongodb(this.url);
			return await CartModel.find();
		} catch (err) {
			return { error: "No existen carritos" }
		}
	}

    async guardarProductoEnCarrito(idProd, idCarrito) {
		await this.mongodb(this.url);
		const prod = await this.producto.getById(idProd);
		return await CartModel.findByIdAndUpdate({ _id: idCarrito }, { $push: { productos: prod } });

	}

    async borrar(id) {
		try {
			await this.mongodb(this.url);
			return await CartModel.findByIdAndDelete(id);
		} catch (err) {
			return { error: "No se pudo eliminar el carrito" }
		}
	}

    async borrarProd(idProd, idCarrito) {
		try {
			await this.mongodb(this.url);
			const prod = await this.producto.getById(idProd);
			return await CartModel.findByIdAndUpdate(idCarrito, { $pull: { productos: prod } });
		} catch (err) {
			return { error: "No se pudo eliminar el producto" }
		}

	}




}
module.exports = Cart