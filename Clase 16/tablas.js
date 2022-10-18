const  {optionsMariaDB} = require("./mariaDB")
const knex = require('knex')(optionsMariaDB);
const { optionSqlite } = require ("./DB/ecommerce")
const knexSql = require("knex")(optionSqlite)


class Tablas {


    // Tabla productos
    async prod(){
    await knex.schema.dropTableIfExists('productos').then(() => {
        knex.schema.createTable('productos', (table) => {
            table.increments('id');
            table.string('title');
            table.float('price');
            table.string('thumbnail');
        }).then(() => {
            console.log('tabla producto ha sido creada')
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            knex.destroy();
        })
    });
    }
    
    
    // Tabla Mensajes
    async mssj(){
    await knexSql.schema.dropTableIfExists('mensajes').then(() => {
        knexSql.schema.createTable('mensajes', (table)=>{
            table.increments('id');
            table.string('author');
            table.string('text');
            table.string('date');
        }).then(() => {
            console.log('tabla mensajes ha sido creada')
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            knex.destroy();
        })
    })
    }
    }
    

    module.exports = { Tablas };
