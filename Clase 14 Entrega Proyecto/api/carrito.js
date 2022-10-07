const fs = require("fs");

const { Productos } = require("./productos");

class Carrito{
    constructor(){
        this.producto = new Productos();
        this.carritos = [];
        this.id = 1;
    }

    async creandoCarrito (carr){
        await fs.promises.writeFile("./carrito.txt", JSON.stringify(carr, null, 2), "utf-8");
        return carr;
    }
    async getByIdCarrito(id){
        try{
            const contenido = await this.getAllCarrito();
            let carrito = contenido.find((carr) => carr.id == id);
            return carrito;
        }catch (error){
            return {error: "No existen carritos"}
        }

    }

    async getProd (id){
        const carrProd = await this.getByIdCarrito(id);
        console.log(carrProd.length);

        return carrProd.productos
    }

    async getAllCarrito(){
        try{
            const contenido = await fs.promises.readFile("./carrito.txt", " utf-8");

            return contenido.length ? JSON.parse(contenido) : {error: "No existen carritos"}
        } catch (error){
            return {error: "No existen carritos"}
        }
    }

    async agregandoCarrito (){
        try{
            const contenido = await this.getAllCarrito();
            const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
            const carr = {id: indice + 1, timeStamp: Date.now(), productos: [] };
            contenido.push(carr);
            this.creandoCarrito(contenido);

            console.log ("Se ha creado un carrito")
            return carr;
        } catch (err){
            console.log("hubo un problema")
        }
    }

    async guardarProductoCarrito (idProd, idCarrito){
        const prod = await this.producto.getById(idProd);
        const carr = await this.getByIdCarrito(idCarrito);
        console.log(carr.productos);
        carr.productos.push(prod);

        this.update(carr, idCarrito);

        return{msj: "Producto agregado al carrito"};
    }


    async update (carr, id){
        const contenido = await this.getAllCarrito();
        let index = contenido.findIndex((p) => p.id == id);
        carr.timeStamp = Date.now();

        if(index >=0){
            contenido.splice (index, 1, {...carr, id});
            this.creandoCarrito(contenido);
            return { msj: "Producto fue agregado"};
        } else{
            return {error: `Producto con id: ${carr.id} no existe`};
        }

    }

    async deleteByIdCarrito (id){
        const contenido = await this.getAllCarrito();
        let index = contenido.findIndex((carr) => carr.id == id);
        contenido.splice (index, 1);

        console.log(contenido);
        this.creandoCarrito(contenido);
        return {msj: `{ Carrito con id: ${id} fue eliminado }`};
    }

    async deleteProd (idProd, idCarrito){
        const carrito = await this.getByIdCarrito(idCarrito);
        console.log(carrito.productos);
        if(carrito.productos.lenght){
            for (var i = 0; i < carrito.productos.lenght; i++){
                let obj = carrito.productos[i];
                if (obj.id == idProd){
                    let indexProducto = carrito.productos.findIndex ((prod) => prod.id == idProd);
                    carrito.productos.splice(indexProducto, 1);
                }            
            }
            this.update(carrito, idCarrito);
            return {msj: `Producto con id: ${idProd} eliminado del carrito con id: ${idCarrito}`}
        } else{
            return {msj: "Producto no encontrado"}
        }
    }

}

module.exports = { Carrito };



const carritoN = {
    producto: "frutilla"
}
    
   



const carri = new Carrito;

async function call (){




await carri.agregandoCarrito(carritoN);  }
call();