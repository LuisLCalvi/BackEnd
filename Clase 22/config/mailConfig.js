const { createTransport } = require("nodemailer")


const transporter = createTransport({
    host: 'gmail',
    port: 587,
    auth: {
        user: 'lautaropruebacoder@gmail.com',
        pass: 'clehehadmeknbfnu'
    }
});

 async function sendEmail(name){
    try {
        await transporter.sendMail({
            from: `Registros CoderHouse <${usuarios}>`,
            to: 'lautaropruebacoder@gmail.com',
            subject: 'Mail de prueba node.js',
            text: 'Te doy la bienvenida',
            html: `<head>
            <link rel="stylesheet" href="./style.css">
            </head>
       
            <div id="email___content">
            <h2>Hola ${name}</h2>
            <p>Felicidades!!</p>
            <p>Te has registrado de manera exitosa</p>
            </div>`
           })

    } catch (error) {
        console.log('Algo salio mal ', error);

    }

}

module.exports = {sendEmail}