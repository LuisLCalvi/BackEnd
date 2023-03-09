const mongoose = require("mongoose");


const productoSchema = new mongoose.Schema({
    idProducto: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    qty: { type: Number, required: true },


})

const ProductoModel = mongoose.model('productos', productoSchema);

module.exports =  ProductoModel;