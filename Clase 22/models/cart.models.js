const mongoose = require("mongoose");


const CarritoSchema = new mongoose.Schema({
    productos: []
})



const CartModel = mongoose.model("carrito", CarritoSchema);


module.exports =  CartModel;