import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    productos: [],
    timeStamp: {type: Date, required:true}
})

const CarritoModel = mongoose.model('carrito', carritoSchema);

export default CarritoModel;