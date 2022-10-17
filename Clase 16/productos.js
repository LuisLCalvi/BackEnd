const { Contenedor } = require("./contenedor")
const {optionsMariaDB} = require ("./mariaDB");

class Productos {
    constructor(){
        this.bd = new Contenedor("roductos", optionsMariaDB)
    }

    async getAll(){
        return await this.bd.getAll();
    }

    async save(producto){
        return await this.bd.save (producto);
    }
}

module.exports = { Productos };