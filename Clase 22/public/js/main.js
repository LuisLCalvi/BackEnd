const socket = io();

socket.on("messages", (data) => {
    render(data);
});

socket.on("productList", (data) => {
    renderItem(data);
})

function render(data) {
    const html = data.map((elemento) => {
        return `<div>
        <span><strong style='color:blue'>${elemento.author.email}</strong></span>
        <span style='color:brown'>${elemento.date}</span>
        <span style='font-style: italic; color:green'>
        <em>${elemento.text}</em></span>
        <img width="50" src="${mensaje.author.avatar}" alt=" ">
        </div>`;
    })
        .join(" "); 

    document.getElementById("mensajes").innerHTML = html; 
}
function addMessage(e) {
    const mensaje = {
        author: {
        email: document.getElementById('email').value,
        name: document.getElementById('name').value,
        lastename: document.getElementById('lastname').value,
        age: document.getElementById('age').value,
        nickname: document.getElementById('nickname').value,
        avatar: document.getElementById('avatar').value
    },
    text: document.getElementById('textMessage').value
}
// document.getElementsByClassName("form-control")[0].value = "";
// document.getElementsByClassName("form-control")[1].value = "";


    socket.emit("new-message", mensaje);

    return false;

}


function renderItem(data) {
    const html = data.map((elemento) => {
        let modelo = `<tr class="table-dark">
                        <td>${elemento.id}</td>
                        <td>${elemento.title}</td>
                        <td>${elemento.price}</td>
                        <td><img width=50 src='${elemento.thumbnail}' alt="imgProducto"></td>
                        </tr>`
        return modelo
    }).join("\n")
    document.getElementById("idTbody").innerHTML = html
}
function addItem() {
    const producto = {
        title: document.getElementsById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }

    socket.emit("newProduct", producto)
}

function randomItem(){
    const producto = {
        
        title: document.getElementsById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }

    socket.emit("randomProduct", producto)

}