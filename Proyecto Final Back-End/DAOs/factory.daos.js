const productoMongo = require ('./productos.daos')
const mensajeMongo = require('./mensajes.daos')
const carritoMongo = require('./cart.daos')
const orderMongo = require('./order.daos')
const chatMongo = require('./chat.daos')

module.exports = class myConnectionFactory{
    returnDbConnection(){
        if(process.env.STORE == 'MONGO') return productoMongo.returnSingleton()
        if(process.env.STORE == 'MONGO') return mensajeMongo.returnSingleton()
        if(process.env.STORE == 'MONGO') return carritoMongo.returnSingleton()
        if(process.env.STORE == 'MONGO') return chatMongo.returnSingleton()
        if(process.env.STORE == 'MONGO') return orderMongo.returnSingleton()

    }
}