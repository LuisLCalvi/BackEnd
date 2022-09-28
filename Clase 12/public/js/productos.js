
const socket = io.connect();


socket.on("productos", (dato) =>{
    renderizando(dato);

});

function renderizando(dato){
    const html = dato.map((elementos)=>{
        return `<div>
                <table>
                <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th></tr>
                
                    <tr> <td>${elementos.title}</td> <td>${elementos.price}</td> <td><img width="50" src=${elementos.thumbnail} alt="not found"></td> </tr>
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








