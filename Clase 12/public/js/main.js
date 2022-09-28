
const socket = io.connect();

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

function addMensaje(e){
    const message = {
        usuario: document.getElementById('email').value,
        texto: document.getElementById('texto').value,
    }

    socket.emit('new-mensaje', message)
    return false;
}



socket.on("productos", (dato) =>{
    renderizando(dato);

});

function renderizando(dato){
    const html = dato.map((elementos)=>{
        return `<div>
                <table class="  table table-dark"> 

                
                <thead > <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th></tr></thead>
                <tbody > <tr> <td>${elementos.title}</td> <td>${elementos.price}</td> <td><img width="50" src=${elementos.thumbnail} alt="not found"></td> </tr></tbody>
                    </table>
                
               
        
        </div>
        `;
    })
    .join(" ");

    document.getElementById("product").innerHTML = html;
}

function addProductos(e){
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
    }

    socket.emit('new-producto', product)
    return false;
}

function showTime(){
    myDate = new Date();
    hours = myDate.getHours();
    minutes = myDate.getMinutes();
    seconds = myDate.getSeconds();}


  
