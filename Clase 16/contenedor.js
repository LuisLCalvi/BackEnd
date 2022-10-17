class Contenedor{
    constructor(tabla,config){
        this.knex = require ("knex")(config);
        this.tabla = tabla;
    }

    async save (objetoAGuardar){
        try{
            return await this.knex(this.tabla).insert(objetoAGuardar)
        }catch(err){
            console.log(err)
        }
    }

    async getAll(){
        try{
            let datosGuardados = await this.knex.select('*').from(this.tabla);
            return datosGuardados ?? null;
        } catch (err){
            console.log (err)
        }
    }
}

module.exports = { Contenedor}