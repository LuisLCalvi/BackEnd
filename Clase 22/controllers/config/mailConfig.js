 const { createTransport } = require("nodemailer")


 const transporter = createTransport({
     host: 'gmail',
     port: 587,
     auth: {
         user: 'lautaropruebacoder@gmail.com',
         pass: 'clehehadmeknbfnu'
     }
 });

  async function sendEmail(email, name){
     try {
         await transporter.sendMail({
             from: `lautaropruebacoder@gmail.com>`,
             to: email,
             subject: 'Mail de prueba node.js',
             text: 'Te doy la bienvenida',
             html: `<head>
             <link rel="stylesheet" href="../public/estilos.css">
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