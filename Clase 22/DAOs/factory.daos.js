const productoMongo = require ('./productos.daos')
const mensajeMongo = require('./mensajes.daos')
const carritoMongo = require('./cart.daos')


module.exports = class myConnectionFactory{
    returnDbConnection(){
        if(process.env.STORE == 'MONGO') return productoMongo.returnSingleton()
        if(process.env.STORE == 'MONGO') return mensajeMongo.returnSingleton()
        if(process.env.STORE == 'MONGO') return carritoMongo.returnSingleton()

    }
}