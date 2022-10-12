const fs = require("fs");

const { Productos } = require("./productos");


const rutaCarrito = "./carritoList.txt";

class Carrito{
    constructor(){
        this.producto = new Productos();
        this.carritos = [];
        this.id = 1;
    }

    async crearCarrito(){
        try{
        const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
        this.carritos.push(carr);
        
        await fs.promises.writeFile(
            rutaCarrito,
            JSON.stringify(this.carritos, null, 2),
            "utf-8"
        )
        return carr
    } catch (e){
        console.log(e)
    }
    }

    async listarAll(){
        try {
            const contenido = await fs.promises.readFile(rutaCarrito, "utf-8");
            const carritoList = JSON.parse(contenido);
          
            console.log(carritoList);

            return carritoList;

        } catch(error){
            console.log(error);
        }
    }

    listar(id){
        let prod = this.carritos.find((carr) => carr.id == id);
        return prod || { error: "carrito no encontrado" };
    }


    guardarProductoEnCarrito(idProd, idCarrito) {
        console.log(idProd);
        const producto = this.producto.getById(idProd);
        this.carritos.forEach((carro) => {
            carro.id == idCarrito ? carro.productos.push(producto) : null;
        });
        return this.carritos;
    }

    actualizar(carr, id){
        carr.id = Number(id);
        let index = this.carritos.findIndex((carr) => carr.id == id);
        this.productos.splice(index, 1, carr);
    }

    borrar(id){
        let index = this.carritos.findIndex((carr) => carr.id = id);
        return this.carritos.splice(index, 1);
    }
}

module.exports = { Carrito };



const carritoN = [{
    productos: "melon", 
}
    
]
    
   
const carritoNw= [{
    productos: "melon", 
}
    
]


const carri = new Carrito;

async function call (){



    await carri.crearCarrito(carritoN);
    await carri.crearCarrito(carritoNw);   
    await carri.guardarProductoEnCarrito(carritoN);   

 }
call();

