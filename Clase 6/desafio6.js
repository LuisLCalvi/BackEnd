const express = require("express");

const fs = require('fs')


const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {console.log("servidor iniciado");});

const productos = [{
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


},

]
class Contenedor {
    async save(producto) {
        try {
            await fs.promises.writeFile(
                "./productos2.txt", JSON.stringify(producto, null, 2), "utf-8"
            );

        } catch (e) {
            console.log(e)
        }

    }

    async getAll() {

        try {
            const contenido = await fs.promises.readFile("./productos2.txt", "utf-8");
            console.log(contenido);

            return JSON.parse(contenido)
        } catch (error) {}

    }


    async getById(id) {
        const contenido = await this.getAll();

        const buscandoProducto = contenido.filter((productos) => productos.id == id);
        console.log(buscandoProducto);
    }

   

}


const contenedor = new Contenedor();
contenedor.save(productos);



app.get("/", (req, resp) => {
    
    resp.send(`<h1 style='color:green'> Bienvenido a mi servidor en express</h1>`);});

app.get("/productos", async (req, resp) => {

    const productos = await contenedor.getAll();
    resp.send( productos);


});

app.get("/productoRandom", async (req, resp) => {

const productoRandom = productos.length

resp.send(productos[(Math.floor(Math.random() * productoRandom) + 1)-1]);

});