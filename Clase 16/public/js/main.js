
const socket = io.connect();
const {Productos} = require ("../../productos")
const {Mensajes} = require ("../../mensajes");


const productos = new Productos()
const mensajes = new Mensajes()

socket.on("mensajes", (data) =>{
    render(data);
   
});

function render(data){
    const html = data.map((elemento)=>{
        return `<div>
                <strong style= 'color: blue'>${elemento.usuario}</strong>:
                <em style= 'color: green', 'fontFamily: italic'>${elemento.texto}</em></div>
        `;
    })
    .join(" ");

    document.getElementById("messages").innerHTML = html;
}

function agregandoMensaje(e){
    const message = {
        usuario: document.getElementById('email').value,
        texto: document.getElementById('texto').value,
    }

    socket.emit("mensajes", mensajes.save(message))
    return false;
}



socket.on("getproductos", (dato) =>{
    renderizando(dato);

});

function renderizando(dato){
    const html = dato.map((elementos)=>{
        return `<div>
                <table class="  table table-dark"> 

                
                <thead > <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th></tr></thead>
                <tbody > <tr> <td>${elementos.nombre}</td> <td>${elementos.precio}</td> <td><img width="50" src=${elementos.imagen} alt="not found"></td> </tr></tbody>
                    </table>
                
               
        
        </div>
        `;
    })
    .join(" ");

    document.getElementById("product").innerHTML = html;
}

function addProductos(e){
    const product = {
       nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        imagen: document.getElementById('imagen').value,
    }

    socket.emit("getproductos", product)
}


