const fs = require("fs")

class Productos {
    constructor(){
        this.id = 0;
    }
    async creandoData(prod) {
		try {
			await fs.promises.writeFile("./productos.txt", JSON.stringify(prod, null, 2), "utf-8");
			return prod;
		} catch (err) {
			console.log("No se pudo agregar el archivo")
		}
	}

    async getById(id){
        try{
            const contenido = await this.getAll();
            let producto = contenido.find((prod) => prod.id == id);
            return producto || { error: "el producto no fue encontrado"};
        } catch(error){
            return {error: "El producto que usted busca NO existe"}
        }
    }

    async getAll(){
        try{
            const contenido = await fs.promises.readFile("./productos.txt", "utf-8");

            return contenido.length ? JSON.parse(contenido) : {error: "Los productos no son existentes"}
        } catch (error){
            return {error: "Los productos no son existentes"}
        }
    }

    async save(prod){
        try{
            const contenido = await this.getAll();
            const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
            prod.id = indice + 1;
            prod.timeStamp = Date.now();
            contenido.push(prod);
            this.creandoData(contenido);
            return prod;
        } catch (error){
            await this.creandoData([]);
            const contenido = await this.getAll();
            prod.id = 1;
            prod.timeStamp = Date.now();
            contenido.push(prod);
            this.creandoData(contenido);
            
            console.log ("se ha ingresado un nuevo producto")
            return prod;

            
        }
    }

    async put (id, prod){
        try{

            const contenido = await this.getAll();
            let index = contenido.findIndex((p) => p.id ===id);
            prod.timeStamp = Date.now();
            if (index >= 0){
                contenido.splice(index, 1, {...prod, id});
                this.creandoData(contenido);
                return prod;
            } else{
                return {msj: `Producto con ID: ${prod.id} no existe`};
            }

        } catch (error){
            console.log(error)
        }

    }

    async deleteById (id){
        const contenido = await this.getAll();
        let index = contenido.findIndex((prod) => prod.id ==id);
        if (index > 0){
            contenido.splice(index, 1);
            this.creandoData(contenido);
            return {msj: `El producto con ID: ${id} fue eliminado`}
        } else {
            return {msj:`El producto con ID: ${id} no fue localizado`};
        }
    }
   
}

module.exports = { Productos };


const productoN = 
    
{
    
        "nombre": "Frutilla",
        "descripcion": "frutillas grandes rojas",
        "codigo": 11223,
        "stock": 1234,
        "precio": 100,
        "img": "https://jumboargentina.vtexassets.com/arquivos/ids/421110/Frutilla-Por-Kg-1-10917.jpg?v=636481016510630000"
      
}



const prod = new Productos;

async function call (){

    prod.getById(1);



await prod.save(productoN);  }
call();