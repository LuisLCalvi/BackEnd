const fs = require('fs')


let productos = [{
    id: 2,
    title: 'Frutilla',
    price: 100,
    img: 'https://jumboargentina.vtexassets.com/arquivos/ids/421110/Frutilla-Por-Kg-1-10917.jpg?v=636481016510630000'


},

{
    id: 3,
    title: 'Kiwi',
    price: 150,
    img: 'https://www.gastronomiavasca.net/uploads/image/file/5587/kiwi1.jpg'


},

{
    id: 1,
    title: 'Manzana',
    price: 50,
    img: 'https://st.depositphotos.com/1000955/1261/i/600/depositphotos_12616481-stock-photo-fresh-red-apple.jpg'


}];

class Contenedor{

    constructor(){
        this.productos = productos
    }

    static idContador = productos.length + 1


    async getAll() {
        try {
           let contenido = this.productos
           return await contenido
        } catch (err) {
            console.log(`Error: Hubo una falla `)
        }
    }

    async getById (){
        try{
            let productosAlmacenados = await this.getAll();
            const resultado = productosAlmacenados.find((objeto) => objeto.id == id);
            return resultado ?? null;
        } catch (err) {
            console.log(`Error: Hubo una falla `)
        }
    }

    async postProductos (productos){
        try{
            let id = Contenedor.idContador
            let productoNuevo = {...productos , id : id }
            this.productos.push(productoNuevo)
            console.log (`se ha agregado un nuevo producto con el id: ${productoNuevo.id}`)
            return productoNuevo
        }
        catch (err){
            console.log ("No se pudo agregar su producto nuevo.")
        }
    }

    async putProductos (id, productoNuevo){
        try{
            let contenido = this.productos
            contenido.forEach(producto =>{
                if(producto.id  === id){
                    producto = productoNuevo
                }
            })
            console.log(`Se ha modificado el producto con id: ${productoNuevo.id}`)
        }catch (err) {
            console.log ("No se pudo encontrar el producto con ese id.")
        }
    }

    async deleteById(id){
        try{
            let contenido = this.productos
            let productosFiltrados = contenido.filter (i => i.id != id)
            this.productos = productosFiltrados
            console.log(`producto con el siguiente id: ${id} fue eliminado`)
        } catch (err){
            console.log("Hubo un error en recuperar el producto.")
        }
    }
}

    const ContenedorProductos = new Contenedor (productos)

    
    module.exports = ContenedorProductos
    


