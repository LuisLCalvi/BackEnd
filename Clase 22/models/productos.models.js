const mongoose = require("mongoose");


const productoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },


})

const ProductoModel = mongoose.model('productos', productoSchema);

module.exports =  ProductoModel;