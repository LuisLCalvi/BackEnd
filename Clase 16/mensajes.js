const { Contenedor } = require("./contenedor")
const {optionSqlite} = require ("./DB/ecommerce");

class Mensajes {
    constructor (){
        this.bd = new Contenedor("mensajes", optionSqlite);
    }

    async getAll(){
        return await this.bd.getAll();
    }

    async save(mensaje){
        return await this.bd.save(mensaje)
    }
}

module.exports = {Mensajes};