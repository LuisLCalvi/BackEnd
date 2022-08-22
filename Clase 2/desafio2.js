
class Libro{
    constructor(libro){
        this.titulo = libro.titulo;
        this.autor = libro.autor;
    };}

    class Mascota{
        constructor(mascota){
            this.nombre = mascota.nombre;
        };}


class usuario {


    constructor (usuario) {
        this.nombre = usuario.nombre;
        this.apellido = usuario.apellido;
        this.libros = [];
        this.mascotas = [];

        if(usuario.libro){
            this.libros = [...usuario.libro];
        }
        if(usuario.mascota){
            this.mascotas = [...usuario.mascota];
        }
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(nuevaMascota){
        return this.mascotas.push(new Mascota({nombre: nuevaMascota}));

    }

    countMascotas(){
        return this.mascotas.length;

    }

    addBook(titulo, autor){
        return this.libros.push(new Libro({titulo, autor}));


    }

    getBookNames(){
        return this.libros.map(x => x.titulo);
    }
}


const lautaro = new usuario({
    nombre:"Lautaro",
    apellido: "Calvi",
    libro: [new Libro({
        titulo: "Yo antes de ti",
        autor: "Nicholas Sparks"
    })],
    mascota: [new Mascota({
        nombre: "Rene"
    })]
});


// Agregando Libro
lautaro.addBook ("Cuando te encuentre", "Nicholas Sparks")

//Agregando Mascotas
lautaro.addMascota ("Gueyla")
lautaro.addMascota ("Lola")
lautaro.addMascota ("Patricio")


//Cantidad de mascotas
console.log(`La cantidad de mascotas que tiene  ${lautaro.getFullName()} es: ${lautaro.countMascotas()}`);

//Cantidad de Libros
console.log(`Los libros que tiene  ${lautaro.getFullName()} son: ${lautaro.getBookNames()}`);



//Usuario Completo
console.log (lautaro)




