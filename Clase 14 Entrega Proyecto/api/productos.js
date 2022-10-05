const { Contenedor } = require("./contenedor");

class Productos{
    constructor(){
        this.contenedor = new Contenedor ("productos.txt");
    }

    async getById (id){
        return await this.contenedor.getByID(id);
    }

    async getAll(){
        return await this.contenedor.getAll();
    }

    async save(prod){
        const timeStamp = Date.now();
        const producto = await this.contenedor.save({
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            img: prod.img,
            precio: prod.precio,
            stock: prod.stock,
            codigo: prod.codigo,
            timeStamp,
        });
        return producto

    }

    async update(id, prod){
        const timeStamp = Date.now();
        const producto = await this.contenedor.update(id,{
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            img: prod.img,
            precio: prod.precio,
            stock: prod.stock,
            codigo: prod.codigo,
            timeStamp,
        });

        return producto;
    }

    async delete(id){
        return await this.contenedor.deleteById(id);
    }

}

module.exports = { Productos };

const productoN = {
    "nombre": "Frutilla",
    "descripcion": "las mejores de la zona",
    "precio":  100,
    "codigo": 11111,
    "stock": 3000,
    "img": "https://jumboargentina.vtexassets.com/arquivos/ids/421110/Frutilla-Por-Kg-1-10917.jpg?v=636481016510630000"
  }

const prod = new Productos;

async function call (){


await prod.save(productoN);  }
call();