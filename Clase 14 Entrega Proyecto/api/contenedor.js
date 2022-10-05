const fs = require ("fs");

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
        this.lastId = 1;
        
        
    }

    async save(objetoAGuardar){
        try{
            let datosAlmacenados = await this.getAll();
            let datosJson = Array.from(datosAlmacenados);
            if(!datosJson){
                throw new Error("el archivo no tiene un formato valido");
            }
            objetoAGuardar.id = this.lastId;
            datosJson = [...datosJson, objetoAGuardar];

            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(datosJson, null, 2));

            this.lastId++;
            return objetoAGuardar.id;   
        } catch(error){
            throw new Error(error);
        }
    }

    async update (id, objetoAGuardar) {
        try{
            let datosAlmacenados = await this.getAll();
            let datosJson = Array.from(datosAlmacenados);

            if(!datosJson){
                throw new Error ("el archivo no tiene un formato valido")
            }

            const index = datosJson.findIndex((x) => x.id === id);

            if (index >= 0){
                datosJson.splice(index, 1 ,{... objetoAGuardar, id});
                await fs.promises.writeFile(
                    this.nombreArchivo,
                    JSON.stringify(datosJson, null, 2)
                );
                return objetoAGuardar;

            } else{
                return null
            }
        } catch (error){
            throw new Error (error);
        }
    }

    async getByID (id){
        try{
            const datosAlmacenados = await this.getAll();
            const datosJson = Array.from(datosAlmacenados);

            const resultado = datosJson.find((objeto) => objeto.id === id);

            return resultado ?? null;
        } catch (error){
            throw new Error(error);
        }
    }

    async getAll (){
        try {
            let datosAlmacenados = await fs.promises.readFile(
                this.nombreArchivo
            );
            if (!datosAlmacenados){
                return null;
            }
            return JSON.parse(datosAlmacenados);
        } catch (error){
            throw new Error (error);
        }
    }

    async deleteById (id){
        try{
            let datosAlmacenados = await this.getAll();
            let datosJson = Array.from(datosAlmacenados);

            datosJson = [...datosJson.filter((dato) => dato.id !== id)];

            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(datosJson, null, 2));

            return id;
        }catch(error) {
            throw new Error (error);
        }
    }

    async deleteAll (){
        try{
            this.lastId = 1;
            await fs.promises.writeFile(
                this.nombreArchivo,
                JSON.stringify([], null, 2)
            );
        } catch (error) {
            throw new Error (error);
         }
    }
}


module.exports = { Contenedor };