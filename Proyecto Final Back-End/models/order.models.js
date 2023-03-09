const { mongoose, Schema} = require("mongoose");


const OrderSchema = new mongoose.Schema({
    cart: [
        {
            productos: [{
                producto: { type: Schema.Types.ObjectId, ref: 'carritos'},
                cantidad: Number
            }],
            user: { type: Schema.Types.ObjectId, ref: 'usuarios'},
            timeStamp: {type: Date, default: Date.now}
                }
    ],
    timeStamp: { type: Date, default: Date.now},
    status: { type: String, default: 'Generada'}
})


const OrderModel = mongoose.model('order', OrderSchema);

module.exports =  OrderModel;