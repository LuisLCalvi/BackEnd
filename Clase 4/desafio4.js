const fs = require ('fs')


const productos =
[
    {
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
    async save (producto){
        try{
            await fs.promises.writeFile(
                "./productos.txt", JSON.stringify(producto, null, 2), "utf-8"
            );

        } catch (e) {
            console.log (e)
         }

    }
    
    async getAll (){

        try{
              const contenido = await fs.promises.readFile ("./productos.txt", "utf-8");
              console.log (contenido);

              return JSON.parse(contenido)
            }

         catch (error){}
     
    }

    async saveNew (productoNuevo){
        const contenido = await this.getAll();
        console.log (contenido)
        const indice = contenido.sort((a, b) => b.id - a.id )[0].id;
        productoNuevo.id = indice + 1;
        contenido.push(productoNuevo);
        this.save(contenido);
        }


    async getById (id){
        const contenido = await this.getAll();

        const buscandoProducto = contenido.filter((productos) => productos.id == id);
        console.log (buscandoProducto);
    }

    async deleteById (id){
        const contenido = await this.getAll();

        const eliminandoProducto = contenido.filter((item) => item.id !== id);

        if (!eliminandoProducto) throw new Error("No existe item con ese Id");

        try {

          await fs.promises.writeFile ( "./productos.txt", JSON.stringify(eliminandoProducto, null, 2));
        } catch (error) {

          throw new Error("Algo paso al borrar elemento");
        }
      }
    

    async deleteAll(){

        try {
            await fs.promises.writeFile(this.productos, null, 2);
        } catch (error) {
        }
    }

    async deleteAll() {
        await fs.promises.writeFile("./productos.txt", JSON.stringify([]));
      }
    

}


const contenedor = new Contenedor ();
contenedor.save (productos);

const productoN =
{
    title: "Banana",
    price: 10,
    img: "https://media.istockphoto.com/photos/banana-bunch-picture-id173242750?k=20&m=173242750&s=612x612&w=0&h=dgXrAP6otDeY5h6fhy-SRmW-2dFOCKx1_hNS1lLWF7Y="}


contenedor.getAll();

contenedor.saveNew (productoN);

contenedor.getById(2);

contenedor.deleteById (3);

contenedor.deleteAll();

